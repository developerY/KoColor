import React, { useState, useEffect } from 'react';
import { ScreenType, CurrencyType, Product, RunwayLook, BagItem } from '../types';
import { ColorEditionsScreen } from './ColorEditionsScreen';
import { RunwayScreen } from './RunwayScreen';
import { ProductDetailScreen } from './ProductDetailScreen';

import { shareLink } from '../utils/router';

export type ApparelSubTab = 'editions' | 'runway' | 'trench';

interface ApparelScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currency: CurrencyType;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
  onDeconstructLook: (look: RunwayLook) => void;
  onOpenLiveStream: () => void;
  onOpenSizeGuide: () => void;
  initialTab?: ApparelSubTab;
  onTabChange?: (tab: ApparelSubTab) => void;
}

export const ApparelScreen: React.FC<ApparelScreenProps> = ({
  onNavigate,
  currency,
  onQuickView,
  onAddToWishlist,
  wishlist,
  onAddToCart,
  onDeconstructLook,
  onOpenLiveStream,
  onOpenSizeGuide,
  initialTab = 'editions',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<ApparelSubTab>(initialTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tab: ApparelSubTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApparelLink = async () => {
    const tabPath = activeTab === 'runway' ? '/apparel?tab=runway' : activeTab === 'trench' ? '/apparel?tab=trench' : '/apparel';
    const tabTitle = activeTab === 'runway' ? 'SS25 Runway' : activeTab === 'trench' ? 'Look 07 Trench Coat' : 'Color Editions';
    const result = await shareLink(tabPath, `KoColor | 02 Apparel — ${tabTitle}`);
    if (result.method === 'clipboard') {
      setToastMessage(`Copied shareable link: ${result.url}`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="bg-[#fcf8fb] min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1c1b1d] text-[#acf847] border border-[#acf847] px-5 py-3 rounded text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#acf847] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Section Broadcast & Sub-Navigation Bar */}
      <div className="sticky top-20 z-30 bg-[#1c1b1d] text-white border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#acf847] uppercase font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#acf847] animate-pulse"></span>
              02 / APPAREL ATELIER:
            </span>
            <div className="flex items-center bg-stone-900 p-1 rounded-full border border-stone-800 text-xs font-mono">
              <a
                href="/apparel?tab=editions"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleTabChange('editions');
                  }
                }}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'editions'
                    ? 'bg-[#004ac6] text-white font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                02A // Color Editions
              </a>
              <a
                href="/apparel?tab=runway"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleTabChange('runway');
                  }
                }}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'runway'
                    ? 'bg-[#acf847] text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>02B // Runway SS27</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              </a>
              <a
                href="/apparel?tab=trench"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleTabChange('trench');
                  }
                }}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'trench'
                    ? 'bg-white text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                02C // Look 07: Trench
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono text-stone-400">
            {/* Share Link Button */}
            <button
              onClick={handleShareApparelLink}
              className="bg-white/10 hover:bg-white text-white hover:text-stone-900 px-3 py-1.5 rounded border border-white/20 transition-all text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Copy shareable direct link to this apparel section"
            >
              <span className="material-symbols-outlined text-[15px] text-[#acf847]">share</span>
              <span className="font-semibold">Copy Link</span>
            </button>

            <span className="hidden lg:inline text-stone-500">•</span>
            <span className="hidden lg:inline">SF &amp; LA ATELIER ARCHIVE (2027)</span>
            {activeTab === 'runway' && (
              <button
                onClick={onOpenLiveStream}
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">play_arrow</span>
                <span>Video [0:31]</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main View Port */}
      {activeTab === 'editions' && (
        <ColorEditionsScreen
          onNavigate={(screen) => {
            if (screen === 'product-detail') {
              handleTabChange('trench');
            } else if (screen === 'runway-ss25') {
              handleTabChange('runway');
            } else {
              onNavigate(screen);
            }
          }}
          currency={currency}
          onQuickView={onQuickView}
          onAddToWishlist={onAddToWishlist}
          wishlist={wishlist}
        />
      )}

      {activeTab === 'runway' && (
        <RunwayScreen
          onNavigate={(screen) => {
            if (screen === 'product-detail') {
              handleTabChange('trench');
            } else if (screen === 'color-editions') {
              handleTabChange('editions');
            } else {
              onNavigate(screen);
            }
          }}
          currency={currency}
          onDeconstructLook={onDeconstructLook}
          onOpenLiveStream={onOpenLiveStream}
          onAddToCart={onAddToCart}
          onOpenSizeGuide={onOpenSizeGuide}
          onAddToWishlist={onAddToWishlist}
          wishlist={wishlist}
          defaultSubTab="runway"
        />
      )}

      {activeTab === 'trench' && (
        <div>
          <div className="bg-stone-900 text-stone-300 px-4 py-2 border-b border-stone-800 flex items-center justify-between font-mono text-xs">
            <button
              onClick={() => handleTabChange('runway')}
              className="cursor-pointer text-[#acf847] hover:underline flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>RETURN TO RUNWAY LOOKBOOK</span>
            </button>
            <button
              onClick={() => handleTabChange('editions')}
              className="cursor-pointer text-stone-400 hover:text-white flex items-center gap-1.5"
            >
              <span>EXPLORE ALL COLOR EDITIONS</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <ProductDetailScreen
            onNavigate={(screen) => {
              if (screen === 'color-editions') {
                handleTabChange('editions');
              } else if (screen === 'runway-ss25') {
                handleTabChange('runway');
              } else {
                onNavigate(screen);
              }
            }}
            currency={currency}
            onAddToCart={onAddToCart}
            onOpenSizeGuide={onOpenSizeGuide}
            onAddToWishlist={onAddToWishlist}
            wishlist={wishlist}
          />
        </div>
      )}
    </div>
  );
};
