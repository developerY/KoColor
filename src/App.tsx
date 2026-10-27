/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenType, CurrencyType, BagItem, Product, RunwayLook } from './types';
import { COLOR_EDITIONS_PRODUCTS } from './data/mockData';
import { parseRoute, getRoutePath, getRouteTitle, RouteState } from './utils/router';
import { LunaSeaTab } from './data/lunaseaData';

// Layout & Global Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';

// Overlays & Modals
import QuickViewModal from './components/QuickViewModal';
import LookDeconstructionDrawer from './components/LookDeconstructionDrawer';
import SearchModal from './components/SearchModal';
import BagDrawer from './components/BagDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SizeGuideModal from './components/SizeGuideModal';
import VideoStreamModal from './components/VideoStreamModal';
import { ZoeCosmeticsModal } from './components/ZoeCosmeticsModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { ApparelScreen } from './screens/ApparelScreen';
import { CosmeticsScreen } from './screens/CosmeticsScreen';
import { TechScreen } from './screens/TechScreen';
import { AboutScreen } from './screens/AboutScreen';

export default function App() {
  // Initialize routes from browser URL (supports /cosmetics, /lunasea, /apparel, etc.)
  const initialRoute = parseRoute();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(initialRoute.screen);
  const [cosmeticsBrand, setCosmeticsBrand] = useState<'zoenude' | 'lunasea'>(initialRoute.brand || 'zoenude');
  const [cosmeticsTab, setCosmeticsTab] = useState<LunaSeaTab>(initialRoute.cosmeticsTab || 'home');
  const [apparelTab, setApparelTab] = useState<'editions' | 'runway' | 'trench'>(initialRoute.apparelTab || 'editions');
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  // Archival Shopping Bag State
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: 'bag-init-1',
      productId: 'prod-trench-01',
      title: 'Chromatic Scuba Trench Coat',
      price: 1280,
      size: 'M',
      color: 'Yves Cobalt Blue',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBx_sOEsGAOw8VLSFywygFkFYajdog0z8I1Lft9LAvxmaHNjq0lFEhmlRNOoZQGkO35fNq2papifjng4-hSBFWWQKQLjY5srv3REARnHckD_Csw2U5LYJmlDdh7wvbdcOdLp3oBQUIlCUIh-4BGTgRS_tHmN8Vb4Nk9CHFB-FE-NKG7og90K6hvbPhpoGbJ9QnqcTtTm9H4qEMA4wv9THUxBy1W6OUBXWnGD9edQ3zPd58DKLIedBbj',
      quantity: 1,
    },
  ]);

  // Wishlist State (starts with 2 archival selections)
  const [wishlist, setWishlist] = useState<Product[]>([
    COLOR_EDITIONS_PRODUCTS[0],
    COLOR_EDITIONS_PRODUCTS[1],
  ]);

  // Modal / Drawer States
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVideoStreamOpen, setIsVideoStreamOpen] = useState(false);
  const [isZoeModalOpen, setIsZoeModalOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [activeDeconstructLook, setActiveDeconstructLook] = useState<RunwayLook | null>(null);

  /**
   * Unified Navigation & URL Synchronization Handler
   * Updates React state, syncs the browser address bar with pushState/replaceState,
   * updates the document title, and scrolls cleanly to the top.
   */
  const handleNavigate = (
    screen: ScreenType,
    options?: {
      brand?: 'zoenude' | 'lunasea';
      cosmeticsTab?: LunaSeaTab;
      apparelTab?: 'editions' | 'runway' | 'trench';
      replace?: boolean;
    }
  ) => {
    setCurrentScreen(screen);
    const targetBrand = options?.brand !== undefined ? options.brand : (screen === 'cosmetics' ? cosmeticsBrand : undefined);
    const targetCosmeticsTab =
      options?.cosmeticsTab !== undefined
        ? options.cosmeticsTab
        : (screen === 'cosmetics' && targetBrand === 'lunasea' ? cosmeticsTab : undefined);
    const targetApparelTab = options?.apparelTab !== undefined ? options.apparelTab : (screen === 'apparel' ? apparelTab : undefined);

    if (options?.brand) setCosmeticsBrand(options.brand);
    if (options?.cosmeticsTab) setCosmeticsTab(options.cosmeticsTab);
    if (options?.apparelTab) setApparelTab(options.apparelTab);

    const routeState: RouteState = {
      screen,
      brand: targetBrand,
      cosmeticsTab: targetCosmeticsTab,
      apparelTab: targetApparelTab,
    };

    const targetPath = getRoutePath(routeState);
    const targetTitle = getRouteTitle(routeState);

    try {
      if (options?.replace) {
        window.history.replaceState(routeState, '', targetPath);
      } else {
        window.history.pushState(routeState, '', targetPath);
      }
    } catch {
      // In restricted frames, state update still functions safely
    }

    document.title = targetTitle;
    if (!options?.replace) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Browser Back/Forward navigation listener
  useEffect(() => {
    document.title = getRouteTitle(initialRoute);

    const handlePopState = () => {
      const route = parseRoute();
      setCurrentScreen(route.screen);
      if (route.brand) setCosmeticsBrand(route.brand);
      if (route.cosmeticsTab) setCosmeticsTab(route.cosmeticsTab);
      if (route.apparelTab) setApparelTab(route.apparelTab);
      document.title = getRouteTitle(route);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Keyboard listener for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (newItem: Omit<BagItem, 'id'>) => {
    setBagItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.size === newItem.size &&
          i.color === newItem.color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity || 1;
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const handleRemoveBagItem = (id: string) => {
    setBagItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleMoveWishlistToBag = (product: Product) => {
    handleAddToCart({
      productId: product.id,
      title: product.name,
      price: product.price,
      size: product.sizes[0] || 'M',
      color: product.colorOptions[0]?.name || product.hueName,
      image: product.image,
      quantity: 1,
    });
    handleRemoveWishlist(product.id);
  };

  // Quick View add handler
  const handleQuickViewAdd = (product: Product, size: string) => {
    handleAddToCart({
      productId: product.id,
      title: product.name,
      price: product.price,
      size,
      color: product.colorOptions[0]?.name || product.hueName,
      image: product.image,
      quantity: 1,
    });
  };

  // Look Reserve handler
  const handleLookReserve = (look: RunwayLook, size: string) => {
    handleAddToCart({
      productId: look.id,
      title: `${look.code} — ${look.title}`,
      price: look.estimatedPrice,
      size,
      color: look.lookBadge,
      image: look.image,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] font-sans antialiased selection:bg-[#acf847] selection:text-[#102000]">
      {/* Top Header with Shareable Links & Direct URL push */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        bagItems={bagItems}
        wishlist={wishlist}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cosmeticsBrand={cosmeticsBrand}
        cosmeticsTab={cosmeticsTab}
      />

      {/* Main Screen Renderer */}
      <main className="pb-16">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            currency={currency}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setActiveQuickViewProduct(p)}
            onDeconstructLook={(look) => setActiveDeconstructLook(look)}
            onOpenZoePortal={() => handleNavigate('cosmetics', { brand: 'zoenude' })}
          />
        )}

        {(currentScreen === 'apparel' ||
          currentScreen === 'color-editions' ||
          currentScreen === 'runway-ss25' ||
          currentScreen === 'product-detail') && (
          <ApparelScreen
            onNavigate={handleNavigate}
            currency={currency}
            onQuickView={(p) => setActiveQuickViewProduct(p)}
            onAddToWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onDeconstructLook={(look) => setActiveDeconstructLook(look)}
            onOpenLiveStream={() => setIsVideoStreamOpen(true)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            initialTab={
              currentScreen === 'runway-ss25'
                ? 'runway'
                : currentScreen === 'product-detail'
                ? 'trench'
                : apparelTab
            }
            onTabChange={(tab) => handleNavigate('apparel', { apparelTab: tab, replace: true })}
          />
        )}

        {currentScreen === 'cosmetics' && (
          <CosmeticsScreen
            onNavigate={handleNavigate}
            currency={currency}
            onAddToCart={handleAddToCart}
            defaultBrand={cosmeticsBrand}
            onBrandChange={(brand) => {
              setCosmeticsBrand(brand);
              handleNavigate('cosmetics', {
                brand,
                cosmeticsTab: brand === 'lunasea' ? cosmeticsTab : undefined,
                replace: false,
              });
            }}
            initialTab={cosmeticsTab}
            onTabChange={(tab) => {
              setCosmeticsTab(tab);
              handleNavigate('cosmetics', {
                brand: 'lunasea',
                cosmeticsTab: tab,
                replace: false,
              });
            }}
          />
        )}

        {(currentScreen === 'tech' || currentScreen === 'kocolor-ai') && (
          <TechScreen
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenZoePortal={() => handleNavigate('cosmetics', { brand: 'zoenude' })}
          />
        )}
      </main>

      {/* Global High Fashion Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenZoePortal={() => handleNavigate('cosmetics', { brand: 'zoenude' })}
      />

      {/* Floating Reviewer Screen Switcher Dock */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => handleNavigate(screen)}
        onOpenLiveStream={() => setIsVideoStreamOpen(true)}
      />

      {/* Modals & Slide-Over Drawers */}
      <QuickViewModal
        product={activeQuickViewProduct}
        isOpen={Boolean(activeQuickViewProduct)}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToBag={handleQuickViewAdd}
      />

      <LookDeconstructionDrawer
        look={activeDeconstructLook}
        isOpen={Boolean(activeDeconstructLook)}
        onClose={() => setActiveDeconstructLook(null)}
        onReserve={handleLookReserve}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setActiveQuickViewProduct(p);
          setIsSearchOpen(false);
        }}
        onSelectLook={(l) => {
          setActiveDeconstructLook(l);
          setIsSearchOpen(false);
        }}
        onNavigate={(screen) => {
          handleNavigate(screen);
          setIsSearchOpen(false);
        }}
      />

      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveBagItem}
        currency={currency}
        onCheckout={() => {
          alert('Archival checkout initiated. Connecting to secure payment portal...');
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={handleRemoveWishlist}
        onMoveToBag={handleMoveWishlistToBag}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <VideoStreamModal
        isOpen={isVideoStreamOpen}
        onClose={() => setIsVideoStreamOpen(false)}
      />

      {/* Zoe — Nude Cosmetics Brand Immersion Modal */}
      <ZoeCosmeticsModal
        isOpen={isZoeModalOpen}
        onClose={() => setIsZoeModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
