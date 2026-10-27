import React, { useState, useEffect } from 'react';
import { ScreenType, CurrencyType, RunwayLook } from '../types';
import { RUNWAY_LOOKS, CURRENCY_RATES, DOCUMENTARY_CHAPTERS } from '../data/mockData';

import { ProductDetailScreen } from './ProductDetailScreen';

interface RunwayScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currency: CurrencyType;
  onDeconstructLook: (look: RunwayLook) => void;
  onOpenLiveStream: () => void;
  onAddToCart?: (item: any) => void;
  onOpenSizeGuide?: () => void;
  onAddToWishlist?: (product: any) => void;
  wishlist?: any[];
  defaultSubTab?: 'runway' | 'trench';
}

export const RunwayScreen: React.FC<RunwayScreenProps> = ({
  onNavigate,
  currency,
  onDeconstructLook,
  onOpenLiveStream,
  onAddToCart,
  onOpenSizeGuide,
  onAddToWishlist,
  wishlist = [],
  defaultSubTab = 'runway',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'runway' | 'trench'>(defaultSubTab);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'outerwear' | 'dresses' | 'tailoring'>('all');
  const [isVipRegistered, setIsVipRegistered] = useState(false);
  const [vipFormData, setVipFormData] = useState({
    fullName: '',
    email: '',
    preferredLook: 'Look 07 // Yves Cobalt Scuba Trench',
    clientTier: 'Private Collector',
  });

  // Countdown timer state for VIP reservation
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 16,
    minutes: 28,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (amount: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(amount * rate).toLocaleString()}`;
  };

  const filteredLooks = RUNWAY_LOOKS.filter((look) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'outerwear') return look.category.toLowerCase().includes('outerwear') || look.title.toLowerCase().includes('trench');
    if (selectedFilter === 'dresses') return look.category.toLowerCase().includes('dress') || look.category.toLowerCase().includes('column');
    if (selectedFilter === 'tailoring') return look.category.toLowerCase().includes('bolero') || look.category.toLowerCase().includes('tuxedo') || look.category.toLowerCase().includes('tunic');
    return true;
  });

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vipFormData.fullName && vipFormData.email) {
      setIsVipRegistered(true);
      setTimeout(() => {
        setIsVipRegistered(false);
        setVipFormData({
          fullName: '',
          email: '',
          preferredLook: 'Look 07 // Yves Cobalt Scuba Trench',
          clientTier: 'Private Collector',
        });
      }, 7000);
    }
  };

  const scrollToVip = () => {
    const el = document.getElementById('vip-registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#1c1b1d] text-[#fcf8fb] min-h-screen">
      {/* Broadcast Ribbon */}
      <div className="bg-[#004ac6] text-white px-4 py-2 text-xs font-mono tracking-widest uppercase flex items-center justify-between border-b border-blue-400/20">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <span className="font-bold">LIVE ARCHIVE BROADCAST</span>
          <span className="text-blue-300">•</span>
          <span>SAN FRANCISCO &amp; LOS ANGELES, CA // SS27 RUNWAY SHOWCASE</span>
          <span className="text-blue-300 hidden md:inline">•</span>
          <span className="hidden md:inline">RUN OF SHOW: 32 STATUESQUE CHROMATIC LOOKS (2027)</span>
        </div>
        <button
          onClick={onOpenLiveStream}
          className="cursor-pointer bg-white text-[#004ac6] px-3 py-0.5 rounded-xs font-bold text-[10px] hover:bg-stone-100 transition-colors uppercase whitespace-nowrap ml-4 shrink-0"
        >
          Watch Stream [18:42]
        </button>
      </div>

      {/* Sub-Navigation for Screen 03: Runway & Trench */}
      <div className="bg-stone-900 border-b border-stone-800 sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between py-2.5 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#acf847] font-bold">
              SCREEN 03 / SECTIONS:
            </span>
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-full border border-stone-800 text-xs font-mono">
              <button
                onClick={() => {
                  setActiveSubTab('runway');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`cursor-pointer px-4 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'runway'
                    ? 'bg-[#004ac6] text-white font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>03A // Run of Show (32 Looks)</span>
              </button>
              <button
                onClick={() => {
                  setActiveSubTab('trench');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`cursor-pointer px-4 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeSubTab === 'trench'
                    ? 'bg-[#acf847] text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>03B // Look 07: Scuba Trench (PDP)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-stone-400">
            <span>LOOK 07 SCUBA TRENCH ARCHITECTURE HOUSED UNDER RUNWAY</span>
          </div>
        </div>
      </div>

      {activeSubTab === 'trench' ? (
        <div className="bg-[#fcf8fb] text-[#1c1b1d] min-h-screen">
          <div className="bg-stone-950 text-white px-4 py-2 border-b border-stone-800 flex items-center justify-between font-mono text-xs">
            <button
              onClick={() => {
                setActiveSubTab('runway');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer text-[#acf847] hover:underline flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>RETURN TO RUN OF SHOW (LOOKBOOK)</span>
            </button>
            <span className="text-stone-400 hidden sm:inline">
              RUNWAY SS27 LOOK 07 // DETAILED SPECIFICATIONS &amp; ACQUISITION
            </span>
          </div>
          <ProductDetailScreen
            onNavigate={onNavigate}
            currency={currency}
            onAddToCart={onAddToCart || (() => {})}
            onOpenSizeGuide={onOpenSizeGuide || (() => {})}
            onAddToWishlist={onAddToWishlist || (() => {})}
            wishlist={wishlist}
          />
        </div>
      ) : (
        <>
          {/* Runway Hero Presentation */}
          <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx_sOEsGAOw8VLSFywygFkFYajdog0z8I1Lft9LAvxmaHNjq0lFEhmlRNOoZQGkO35fNq2papifjng4-hSBFWWQKQLjY5srv3REARnHckD_Csw2U5LYJmlDdh7wvbdcOdLp3oBQUIlCUIh-4BGTgRS_tHmN8Vb4Nk9CHFB-FE-NKG7og90K6hvbPhpoGbJ9QnqcTtTm9H4qEMA4wv9THUxBy1W6OUBXWnGD9edQ3zPd58DKLIedBbj"
            alt="SF & LA, CA Runway SS27 Master Presentation"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1d] via-[#1c1b1d]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#acf847]/15 border border-[#acf847]/40 rounded-full text-xs font-mono tracking-[0.25em] text-[#acf847] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#acf847]"></span>
              SF &amp; LA, CA FASHION WEEK SPRING/SUMMER 2027
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-extralight tracking-tight text-white leading-none">
              The Run of Show: SF &amp; LA, CA
            </h1>

            <p className="font-sans text-stone-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Staged across iconic brutalist architectural landmarks in San Francisco and Los Angeles, CA. A monumental 2027 procession of sculptural neoprene, fluid silks, and laser-precise tailoring.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenLiveStream}
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-xl hover:scale-102"
              >
                <span className="material-symbols-outlined text-lg">play_circle</span>
                <span>Watch Stream [18:42]</span>
              </button>

              <button
                onClick={scrollToVip}
                className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>Priority Pre-Order</span>
                <span className="material-symbols-outlined text-sm">schedule</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Runway Technical Spec Sheet Strip */}
      <section className="bg-stone-950 border-b border-stone-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-stone-500 uppercase block text-[10px]">VENUE ARCHITECTURE</span>
              <span className="text-white font-semibold mt-1 block">SF &amp; LA, CA Brutalist Pavilions</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase block text-[10px]">SOUNDTRACK DIRECTION</span>
              <span className="text-white font-semibold mt-1 block">Original Score by Arca (2027)</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase block text-[10px]">LIGHTING FREQUENCY</span>
              <span className="text-[#acf847] font-semibold mt-1 block">4,000K High-CRI Xenon</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase block text-[10px]">CREATIVE DIRECTION</span>
              <span className="text-white font-semibold mt-1 block">Lucile Bernard • SF &amp; LA Atelier</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Run of Show Lookbook Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-800 pb-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
              // RUN OF SHOW ARCHIVE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-white mt-2">
              The 6 Key Runway Ensembles
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`cursor-pointer px-3 py-1.5 rounded-full uppercase tracking-wider border transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-white text-stone-950 border-white font-bold'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              All Looks (6)
            </button>
            <button
              onClick={() => setSelectedFilter('outerwear')}
              className={`cursor-pointer px-3 py-1.5 rounded-full uppercase tracking-wider border transition-colors ${
                selectedFilter === 'outerwear'
                  ? 'bg-white text-stone-950 border-white font-bold'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              Outerwear
            </button>
            <button
              onClick={() => setSelectedFilter('dresses')}
              className={`cursor-pointer px-3 py-1.5 rounded-full uppercase tracking-wider border transition-colors ${
                selectedFilter === 'dresses'
                  ? 'bg-white text-stone-950 border-white font-bold'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              Gowns
            </button>
            <button
              onClick={() => setSelectedFilter('tailoring')}
              className={`cursor-pointer px-3 py-1.5 rounded-full uppercase tracking-wider border transition-colors ${
                selectedFilter === 'tailoring'
                  ? 'bg-white text-stone-950 border-white font-bold'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              Tailoring
            </button>
          </div>
        </div>

        {/* Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLooks.map((look) => (
            <div
              key={look.id}
              className="group bg-stone-900/90 border border-stone-800 hover:border-stone-500 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Runway Photography */}
              <div className="relative aspect-[3/4] bg-stone-950 overflow-hidden">
                <img
                  src={look.image}
                  alt={look.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 tracking-wider font-bold bg-[#1c1b1d] text-white">
                    {look.lookBadge}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider font-semibold ${look.subBadgeBg} ${look.subBadgeText}`}
                  >
                    {look.subBadge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono bg-black/70 text-stone-300 px-2 py-0.5">
                  {look.code}
                </div>

                {/* Quick Deconstruct Button Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <button
                    onClick={() => onDeconstructLook(look)}
                    className="cursor-pointer flex-1 bg-white hover:bg-[#acf847] text-stone-950 py-2.5 text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">tune</span>
                    <span>Deconstruct Look</span>
                  </button>
                  {look.lookNumber === '07' && (
                    <button
                      onClick={() => {
                        setActiveSubTab('trench');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white p-2.5 text-xs font-mono flex items-center gap-1"
                      title="Inspect Look 07 Scuba Trench Architecture"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Look Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-400 mb-1.5">
                    <span>{look.category}</span>
                    <span>{look.components.length} COMPONENTS</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#acf847] transition-colors">
                    {look.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-2 line-clamp-2">
                    {look.description}
                  </p>
                </div>

                {/* Pricing & Deconstruct Link */}
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">
                      ESTIMATED COMMISSION
                    </span>
                    <span className="font-bold text-white mt-0.5 block">
                      {formatPrice(look.estimatedPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeconstructLook(look)}
                    className="cursor-pointer text-xs font-mono text-[#acf847] hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect</span>
                    <span className="material-symbols-outlined text-sm">tune</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Backstage & Atelier Documentary Diary */}
      <section className="py-24 bg-stone-950 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#fd761a] uppercase font-bold">
              // ATELIER PROCESS ARCHIVE • 2027
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">
              Backstage & Atelier Diary
            </h2>
            <p className="text-stone-400 text-sm font-sans mt-3">
              Documenting the craft, mineral dyeing, and architectural construction behind the SS27
              San Francisco &amp; Los Angeles, CA presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DOCUMENTARY_CHAPTERS.map((doc, idx) => (
              <div
                key={idx}
                className="bg-stone-900 border border-stone-800 p-6 flex flex-col justify-between group hover:border-[#acf847] transition-colors"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden mb-6">
                    <img
                      src={doc.image}
                      alt={doc.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-black/80 text-[#acf847] px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest">
                      {doc.chapter}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400 uppercase block">
                    {doc.location}
                  </span>
                  <h3 className="font-serif text-xl font-light text-white mt-2 group-hover:text-[#acf847] transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-sans mt-3 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-500 text-[10px] uppercase">{doc.statLabel}:</span>
                  <span className="text-[#acf847] font-semibold">{doc.statValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Priority Pre-Order Registration Form with Countdown */}
      <section id="vip-registration" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#004ac6]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
              // PRIVATE ATELIER ALLOCATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              VIP Priority Pre-Order
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-sans">
              Runway editions are produced in strictly limited runs of 18 numbered units per look.
              Register to receive direct private checkout access before general release.
            </p>
          </div>

          {/* Real-time Countdown Timer Bar */}
          <div className="max-w-md mx-auto mb-10 p-4 bg-stone-950 border border-stone-800 rounded-sm text-center">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">
              PRIORITY WINDOW CLOSING IN:
            </span>
            <div className="grid grid-cols-4 gap-2 font-mono text-white">
              <div className="bg-stone-900 py-2 border border-stone-800">
                <span className="text-xl sm:text-2xl font-bold text-[#acf847]">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 block uppercase">DAYS</span>
              </div>
              <div className="bg-stone-900 py-2 border border-stone-800">
                <span className="text-xl sm:text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 block uppercase">HOURS</span>
              </div>
              <div className="bg-stone-900 py-2 border border-stone-800">
                <span className="text-xl sm:text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 block uppercase">MINS</span>
              </div>
              <div className="bg-stone-900 py-2 border border-stone-800">
                <span className="text-xl sm:text-2xl font-bold text-[#fd761a]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 block uppercase">SECS</span>
              </div>
            </div>
          </div>

          {isVipRegistered ? (
            <div className="p-8 bg-[#acf847]/10 border border-[#acf847] text-center space-y-3 font-mono">
              <span className="material-symbols-outlined text-4xl text-[#acf847]">verified_user</span>
              <h3 className="font-serif text-2xl text-white">Priority Reservation Confirmed</h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Thank you, {vipFormData.fullName}. Your confidential invitation code and runway
                allocation token have been encrypted and dispatched to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVipSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    FULL NAME (AS REGISTERED)
                  </label>
                  <input
                    type="text"
                    required
                    value={vipFormData.fullName}
                    onChange={(e) => setVipFormData({ ...vipFormData, fullName: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-xs font-mono text-white placeholder-stone-600 focus:outline-none focus:border-[#acf847]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    PRIVATE CLIENT EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={vipFormData.email}
                    onChange={(e) => setVipFormData({ ...vipFormData, email: e.target.value })}
                    placeholder="client@archivedomain.com"
                    className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-xs font-mono text-white placeholder-stone-600 focus:outline-none focus:border-[#acf847]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    REQUESTED RUNWAY LOOK
                  </label>
                  <select
                    value={vipFormData.preferredLook}
                    onChange={(e) => setVipFormData({ ...vipFormData, preferredLook: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-xs font-mono text-white uppercase focus:outline-none focus:border-[#acf847] cursor-pointer"
                  >
                    {RUNWAY_LOOKS.map((look) => (
                      <option key={look.id} value={`${look.code} // ${look.title}`}>
                        {look.code} — {look.title} ({formatPrice(look.estimatedPrice)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    CLIENT STATUS TIER
                  </label>
                  <select
                    value={vipFormData.clientTier}
                    onChange={(e) => setVipFormData({ ...vipFormData, clientTier: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-xs font-mono text-white uppercase focus:outline-none focus:border-[#acf847] cursor-pointer"
                  >
                    <option value="Private Collector">Private Collector / Guild Member</option>
                    <option value="Haute Couture Client">Haute Couture Client</option>
                    <option value="Press / Editorial">Accredited Fashion Press</option>
                    <option value="Museum Curator">Institutional / Museum Archive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-[#acf847] hover:bg-[#9de437] text-stone-950 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] transition-all shadow-xl hover:scale-[1.01]"
              >
                Submit Confidential Pre-Order Request
              </button>

              <p className="text-[10px] font-mono text-stone-500 text-center uppercase tracking-wider">
                ALLOCATIONS SUBJECT TO ATELIER CAPACITY • NO AUTOMATED RE-SELL BOTS PERMITTED
              </p>
            </form>
          )}
        </div>
      </section>
        </>
      )}
    </div>
  );
};
