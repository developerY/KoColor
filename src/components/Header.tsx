import React from 'react';
import { ScreenType, CurrencyType, BagItem, Product } from '../types';
import { CURRENCY_RATES } from '../data/mockData';
import { LunaSeaTab } from '../data/lunaseaData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (
    screen: ScreenType,
    options?: {
      brand?: 'zoenude' | 'lunasea';
      cosmeticsTab?: LunaSeaTab;
      apparelTab?: 'editions' | 'runway' | 'trench';
      replace?: boolean;
    }
  ) => void;
  currency: CurrencyType;
  onCurrencyChange: (c: CurrencyType) => void;
  bagItems: BagItem[];
  wishlist: Product[];
  onOpenBag: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  cosmeticsBrand?: 'zoenude' | 'lunasea';
  cosmeticsTab?: LunaSeaTab;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  currency,
  onCurrencyChange,
  bagItems,
  wishlist,
  onOpenBag,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const totalBagCount = bagItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#fcf8fb]/95 backdrop-blur-md border-b border-[#e5e1e4] transition-all">

      {/* Top Announcement Bar */}
      <div className="bg-[#1c1b1d] text-[#fcf8fb] px-4 py-1.5 text-[11px] tracking-widest uppercase flex items-center justify-between font-mono">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-[#acf847] animate-pulse"></span>
          <span className="font-semibold text-[#acf847]">AI TECH FASHION HOUSE</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-300">100% GENERATIVE ALGORITHMIC ARCHITECTURE</span>
          <span className="text-stone-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-stone-300">ALL SILHOUETTES, PATTERNS &amp; BIO-COSMETICS SYNTHESIZED WITH AI</span>
          <span className="text-stone-500 hidden md:inline">•</span>
          <span className="hidden md:inline text-stone-400">ZERO CUTTING WASTE</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-stone-400">
          <span className="text-[#acf847] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#acf847]"></span>
            <span>NEURAL ATELIER: SF &amp; LA</span>
          </span>
        </div>
      </div>

      {/* Main Navigation Bar with Semantic Modern Anchor Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[12px] uppercase tracking-[0.2em] font-medium text-stone-800">
          <a
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onNavigate('home');
              }
            }}
            className={`cursor-pointer transition-colors hover:text-[#004ac6] py-2 relative ${
              currentScreen === 'home' ? 'text-[#004ac6] font-semibold' : ''
            }`}
            title="Prologue (Home)"
          >
            01 / Prologue
            {currentScreen === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004ac6]"></span>
            )}
          </a>

          <a
            href="/apparel"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onNavigate('apparel');
              }
            }}
            className={`cursor-pointer transition-colors hover:text-[#004ac6] py-2 relative ${
              currentScreen === 'apparel' ||
              currentScreen === 'color-editions' ||
              currentScreen === 'runway-ss25' ||
              currentScreen === 'product-detail'
                ? 'text-[#004ac6] font-semibold'
                : ''
            }`}
            title="AI Apparel Atelier"
          >
            02 / Apparel
            {(currentScreen === 'apparel' ||
              currentScreen === 'color-editions' ||
              currentScreen === 'runway-ss25' ||
              currentScreen === 'product-detail') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004ac6]"></span>
            )}
          </a>

          <a
            href="/cosmetics"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onNavigate('cosmetics');
              }
            }}
            className={`cursor-pointer transition-colors hover:text-[#004ac6] py-2 relative flex items-center gap-1.5 ${
              currentScreen === 'cosmetics' ? 'text-[#004ac6] font-semibold' : ''
            }`}
            title="Bio-Cosmetics: ZoeNude & LunaSea (Shareable Link)"
          >
            <span>03 / Cosmetics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
            {currentScreen === 'cosmetics' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004ac6]"></span>
            )}
          </a>

          <a
            href="/tech"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onNavigate('tech');
              }
            }}
            className={`cursor-pointer transition-colors hover:text-[#004ac6] py-2 relative flex items-center gap-1.5 ${
              currentScreen === 'tech' || currentScreen === 'kocolor-ai'
                ? 'text-[#004ac6] font-semibold'
                : ''
            }`}
            title="AI Engine & Neural Architecture"
          >
            <span>04 / AI</span>
            {(currentScreen === 'tech' || currentScreen === 'kocolor-ai') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004ac6]"></span>
            )}
          </a>

          <a
            href="/about"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onNavigate('about');
              }
            }}
            className={`cursor-pointer transition-colors hover:text-[#004ac6] py-2 relative ${
              currentScreen === 'about' ? 'text-[#004ac6] font-semibold' : ''
            }`}
            title="Manifesto & Atelier Philosophy"
          >
            05 / Manifesto
            {currentScreen === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004ac6]"></span>
            )}
          </a>
        </nav>

        {/* Center Brand Identity */}
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          className="cursor-pointer text-center group flex flex-col items-center"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1b1d] group-hover:text-[#004ac6] transition-colors">
              KOCOLOR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-mono font-semibold -mt-1">
            SF &amp; LA
          </span>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 text-stone-700 hover:text-stone-950 transition-colors p-1 text-xs font-mono uppercase"
            title="Search Archive (⌘K)"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="hidden sm:inline bg-stone-200/80 text-stone-600 px-1.5 py-0.5 rounded text-[10px] tracking-wider">
              ⌘K
            </span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyType)}
              className="appearance-none bg-transparent text-xs font-mono tracking-wider uppercase text-stone-800 pr-5 py-1 focus:outline-none cursor-pointer border-b border-transparent hover:border-stone-400"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c} className="bg-white text-stone-900">
                  {c} ({CURRENCY_RATES[c].symbol})
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-0 top-1.5 text-[14px] text-stone-500">
              arrow_drop_down
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            title="Archival Wishlist"
          >
            <span className="material-symbols-outlined text-[21px]">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fd761a] text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenBag}
            className="relative flex items-center gap-2 p-1.5 bg-[#1c1b1d] text-[#fcf8fb] hover:bg-[#004ac6] transition-colors rounded-sm cursor-pointer shadow-sm"
            title="View Bag"
          >
            <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
            <span className="text-[11px] font-mono tracking-wider font-semibold pr-1">
              {totalBagCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
