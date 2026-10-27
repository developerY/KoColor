import React, { useState } from 'react';
import { ScreenType, CurrencyType, Product, BagItem, RunwayLook } from '../types';
import { COLOR_CAPSULES, HOME_NEW_ARRIVALS, CURRENCY_RATES, RUNWAY_LOOKS, COLOR_EDITIONS_PRODUCTS } from '../data/mockData';
import { ZoeCosmeticsSection } from '../components/ZoeCosmeticsSection';

interface HomeScreenProps {
  onNavigate: (
    screen: ScreenType,
    options?: { brand?: 'zoenude' | 'lunasea'; apparelTab?: 'editions' | 'runway' | 'trench' }
  ) => void;
  currency: CurrencyType;
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
  onQuickView: (product: Product) => void;
  onDeconstructLook: (look: RunwayLook) => void;
  onOpenZoePortal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  currency,
  onAddToCart,
  onQuickView,
  onDeconstructLook,
  onOpenZoePortal,
}) => {
  const [activeSpectralIndex, setActiveSpectralIndex] = useState(0);

  const formatPrice = (amount: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(amount * rate).toLocaleString()}`;
  };

  const spectralManifesto = [
    {
      hue: 'Yves Cobalt Blue',
      wavelength: '445 nm',
      hex: '#004ac6',
      accent: 'text-[#004ac6]',
      bg: 'bg-[#004ac6]',
      philosophy:
        'A saturated void that rejects natural sky reflections. Our Yves Cobalt is synthesized with bio-mineral salts to create an infinite depth that absorbs ambient shadow.',
      fabric: '480gsm Bonded Scuba Wool & Raw Cashmere',
      provenance: 'San Francisco Mineral Extraction Laboratory N° 04',
      chromaScore: '99.8% Spectral Purity',
    },
    {
      hue: 'Sunburst Tangerine',
      wavelength: '612 nm',
      hex: '#fd761a',
      accent: 'text-[#fd761a]',
      bg: 'bg-[#fd761a]',
      philosophy:
        'Thermal radiance engineered through high-temperature vat immersion. Capturing kinetic solar energy without degrading structural silk tensile strength.',
      fabric: 'Heavyweight Mulberry Silk & Technical Poplin',
      provenance: 'Los Angeles Botanical Artisans Guild, CA',
      chromaScore: '98.6% Spectral Purity',
    },
    {
      hue: 'Acid Citron Chartreuse',
      wavelength: '555 nm',
      hex: '#acf847',
      accent: 'text-[#3a5f00]',
      bg: 'bg-[#acf847]',
      philosophy:
        'The optical peak of human retinal sensitivity. Engineered with bio-fermented chlorophyll extracts to produce an arresting bioluminescent presence under flash photography.',
      fabric: 'Venetian Double Gabardine & Crêpe de Chine',
      provenance: 'SF & LA Zero-Toxicity Botanical Vats, CA',
      chromaScore: '99.4% Spectral Purity',
    },
    {
      hue: 'Obsidian Noir',
      wavelength: 'Absorptive Void',
      hex: '#1c1b1d',
      accent: 'text-[#1c1b1d]',
      bg: 'bg-[#1c1b1d]',
      philosophy:
        'The structural anchor of every chromatic symphony. Triple-dyed carbon black that provides zero optical glare, amplifying the vibrational tension of surrounding colors.',
      fabric: 'Ultra-Dense Technical Wool',
      provenance: 'California Charcoal Craft Studio (SF & LA)',
      chromaScore: '99.9% Light Absorption',
    },
  ];

  const currentSpectrum = spectralManifesto[activeSpectralIndex];

  return (
    <div className="bg-[#fcf8fb] text-[#1c1b1d]">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#e5e1e4]">
        {/* Background Visual Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFmsDbyw8rVR_kGIYw0SkjfDckrFXkwfSQO7QQ4UdNvSrnyhFCIMO7cnolKNKbfp0da79QMb36ZXNq20YEefY0Eizgqg_qR7LWFRwpyYN2i9jJj6eUj3IDIrTuNpNKEgqk-L9e5bXXb7He817JXeGFCkfpo6XbmqlCsV4SXBIfbVjZYd3_mPTj_4q1H01belT2B6cdvpKafm-FOUggyjh8MFwvzcdFWYuFiYOxMppgyBV8kLTVWP-Z"
            alt="Editorial avant-garde model in oversized electric Klein hyper-cobalt cashmere trench"
            className="w-full h-full object-cover object-center lg:object-top filter brightness-[0.92] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1d]/90 via-[#1c1b1d]/40 to-transparent lg:bg-gradient-to-r lg:from-[#1c1b1d]/95 lg:via-[#1c1b1d]/60 lg:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1 bg-[#1c1b1d]/90 backdrop-blur-md border border-[#acf847]/40 rounded-full text-xs font-mono tracking-[0.25em] text-[#acf847] uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#acf847] animate-pulse"></span>
              <span>100% AI TECH FASHION HOUSE • SS27</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.04]">
              Haute Couture Born From Latent Space.
            </h1>

            <p className="font-sans text-stone-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              At Maison KoColor, <strong className="text-white font-medium">everything is built with AI</strong>.
              From generative diffusion silhouettes and zero-waste parametric seam vectors,
              to in-silico bioactive cosmetics (ZoeNude &amp; LunaSea) and nanometer pigment synthesis in San Francisco &amp; Los Angeles.
            </p>

            {/* AI Architecture Live Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-1 border-y border-white/15 font-mono text-[11px]">
              <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xs border border-white/10">
                <span className="text-[#acf847] block font-bold text-sm sm:text-base">100%</span>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider mt-0.5">AI Synthesized</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xs border border-white/10">
                <span className="text-white block font-bold text-sm sm:text-base">12.4M</span>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider mt-0.5">Latent Iterations</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xs border border-white/10">
                <span className="text-[#acf847] block font-bold text-sm sm:text-base">0.00%</span>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider mt-0.5">Cutting Waste</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xs border border-white/10">
                <span className="text-white block font-bold text-sm sm:text-base">In-Silico</span>
                <span className="text-stone-400 block text-[9px] uppercase tracking-wider mt-0.5">Bio-Cosmetics</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onNavigate('apparel')}
                className="cursor-pointer bg-[#acf847] hover:bg-[#9de437] text-[#102000] px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Explore AI Apparel</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('tech')}
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-7 py-3.5 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Launch AI Atelier</span>
              </button>
              <button
                onClick={() => {
                  const look1 = RUNWAY_LOOKS.find((l) => l.lookNumber === '01') || RUNWAY_LOOKS[0];
                  onDeconstructLook(look1);
                }}
                className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>AI Prompt Matrix</span>
                <span className="material-symbols-outlined text-sm">tune</span>
              </button>
            </div>
          </div>

          {/* Floating Hero Trench Callout Card */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-12 lg:right-8 bg-[#1c1b1d]/85 backdrop-blur-md border border-white/15 p-5 rounded-sm max-w-sm shadow-2xl">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#acf847] uppercase mb-2">
              <span>AI SYNTHESIZED HERO PIECE</span>
              <span className="bg-[#004ac6] text-white px-1.5 py-0.5 rounded-xs">SEED #98240192</span>
            </div>
            <h4 className="font-serif text-xl font-medium text-white">Yves Neural Trench #01</h4>
            <p className="text-xs text-stone-400 mt-1 font-mono">
              FashionDiffusion-v4.9 • 100% Zero-Loss Voronoi Nesting
            </p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-800">
              <span className="font-mono text-base font-bold text-white">
                {formatPrice(1280)}
              </span>
              <button
                onClick={() => onNavigate('product-detail')}
                className="cursor-pointer text-[11px] font-mono text-[#acf847] hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <span>Deconstruct Piece</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Quotes Marquee Ticker */}
      <div className="bg-[#1c1b1d] border-b border-stone-800 py-3.5 overflow-hidden select-none">
        <div className="flex items-center gap-12 whitespace-nowrap animate-[marquee_35s_linear_infinite] text-xs font-mono uppercase tracking-widest text-stone-300">
          <span className="flex items-center gap-3">
            <span className="text-[#acf847]">★ VOGUE TECH:</span>
            <span>"KOCOLOR REINVENTS BRUTALIST COUTURE: 100% OF PATTERNS, DRAPES &amp; COSMETICS GENERATED WITH AI."</span>
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-3">
            <span className="text-[#fd761a]">★ DAZED DIGITAL:</span>
            <span>"ZERO CUTTING WASTE. ZERO APPROXIMATE DYE LOTS. THE WORLD'S TRUE AI FASHION HOUSE HAS ARRIVED."</span>
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-3">
            <span className="text-[#004ac6]">★ BOF ARCHITECTURE:</span>
            <span>"FROM LATENT SPACE TENSORS TO SF ROBOTIC LOOMS: HOW KOCOLOR PROVES AI IS LUXURY."</span>
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-3">
            <span className="text-[#acf847]">★ WIRED FASHION:</span>
            <span>"PARAMETRIC VORONOI NESTING MEETS IN-SILICO BIOACTIVE COSMETICS. PURE CODE AS FABRIC."</span>
          </span>
        </div>
      </div>

      {/* ========================================================
          HOW EVERYTHING IS BUILT WITH AI // THE 4-PILLAR NEURAL PIPELINE
          ======================================================== */}
      <section className="py-24 bg-[#141315] text-[#fcf8fb] border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2b2a2d_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-stone-800 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#acf847] animate-ping" />
                // 100% GENERATIVE INFRASTRUCTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
                How Everything Is Built With AI.
              </h2>
              <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed font-light">
                We eliminated speculative manual sketching, toxic petroleum dye vats, and standard 15% fabric cutting waste.
                Every silhouette, structural seam coordinate, chromatic photon bath, and bioactive cosmetic formula is engineered through our proprietary generative AI pipeline.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('tech')}
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Launch Interactive Synthesizer</span>
                <span className="material-symbols-outlined text-sm">tune</span>
              </button>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 01 */}
            <div className="bg-stone-900/80 border border-stone-800 hover:border-[#004ac6] transition-all p-6 rounded-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#004ac6] font-bold tracking-widest uppercase">PILLAR // 01</span>
                  <span className="text-stone-500 text-[10px] bg-stone-950 px-2 py-0.5 border border-stone-800">DIFFUSION</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#004ac6] transition-colors">
                  Latent Space 3D Silhouette Drafting
                </h3>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  Diffusion neural networks trained on 400 years of archival couture drapes simulate zero-gravity fabric physics in real-time, generating monolithic structural silhouettes impossible with manual pencil drafts.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-stone-400">
                  <span>MODEL:</span>
                  <span className="text-white font-semibold">FashionDiffusion-v4.9</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>PHYSICS SOLVER:</span>
                  <span className="text-[#acf847]">Euler-Lagrange Viscoelastic</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>SPEED:</span>
                  <span className="text-stone-300">420ms Latent Step</span>
                </div>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-stone-900/80 border border-stone-800 hover:border-[#acf847] transition-all p-6 rounded-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#acf847] font-bold tracking-widest uppercase">PILLAR // 02</span>
                  <span className="text-stone-500 text-[10px] bg-stone-950 px-2 py-0.5 border border-stone-800">VORONOI</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#acf847] transition-colors">
                  Parametric Zero-Waste Pattern Engineering
                </h3>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  Algorithmic Voronoi decomposition translates 3D volumetric surfaces into 2D interlocking polygon cutting paths. By computing optimal mathematical nesting, we reduce fabric cutting loss to exactly 0.00%.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-stone-400">
                  <span>YIELD EFFICIENCY:</span>
                  <span className="text-[#acf847] font-bold">100.00% Zero-Loss</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>ROBOTIC LOOMS:</span>
                  <span className="text-white font-semibold">LA &amp; SF CNC Laser</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>SEAM MAPPING:</span>
                  <span className="text-stone-300">64 Interlocking Polygon Nodes</span>
                </div>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-stone-900/80 border border-stone-800 hover:border-[#fd761a] transition-all p-6 rounded-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#fd761a] font-bold tracking-widest uppercase">PILLAR // 03</span>
                  <span className="text-stone-500 text-[10px] bg-stone-950 px-2 py-0.5 border border-stone-800">CHROMA</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#fd761a] transition-colors">
                  Algorithmic Nanometer Chroma Synthesis
                </h3>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  Color is calculated mathematically at the nanometer photon level. In-silico molecular enzyme simulations formulate exact light-absorbing bio-minerals, creating Yves Cobalt (440nm) and Solar Amber (610nm) without chemical runoff.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-stone-400">
                  <span>SPECTRAL PURITY:</span>
                  <span className="text-[#fd761a] font-bold">99.8% Precision</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>BIO-MINERAL IMMERSION:</span>
                  <span className="text-white font-semibold">SF Bay Lab Closed-Loop</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>PETROLEUM RUNOFF:</span>
                  <span className="text-[#acf847]">0.00% Zero-Discharge</span>
                </div>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-stone-900/80 border border-stone-800 hover:border-[#f4a261] transition-all p-6 rounded-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#f4a261] font-bold tracking-widest uppercase">PILLAR // 04</span>
                  <span className="text-stone-500 text-[10px] bg-stone-950 px-2 py-0.5 border border-stone-800">BIO-INFORMATICS</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#f4a261] transition-colors">
                  In-Silico Bio-Cosmetics (ZoeNude &amp; LunaSea)
                </h3>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  Both ZoeNude and LunaSea are generated via computational biology algorithms. Cellular lipid modeling simulates how micro-micronized sea algae, oyster minerals, and kelp peptides merge with human skin with zero powdery mask.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-stone-400">
                  <span>COMPUTED BRANDS:</span>
                  <span className="text-[#f4a261] font-semibold">ZoeNude + LunaSea</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>BIOCOMPATIBILITY:</span>
                  <span className="text-[#acf847] font-bold">100% Non-Comedogenic</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>PIGMENT CARRIER:</span>
                  <span className="text-stone-300">Sugarcane Squalane Algae</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Curated Color Stories Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e5e1e4] pb-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
              // SPECTRAL FREQUENCIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 mt-2">
              Curated Color Stories
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-stone-500 tracking-wider max-w-xs mt-3 md:mt-0">
            Four radical chromatic expressions developed over 18 months of bio-mineral synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLOR_CAPSULES.map((capsule, idx) => (
            <div
              key={capsule.code}
              onClick={() => onNavigate('color-editions')}
              className="group cursor-pointer bg-white border border-[#e5e1e4] hover:border-stone-900 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={capsule.image}
                  alt={capsule.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#1c1b1d]/80 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase">
                  {capsule.code}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-900 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase font-semibold">
                  {capsule.count}
                </div>
              </div>

              {/* Capsule Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {capsule.swatches.map((hex, sIdx) => (
                      <span
                        key={sIdx}
                        className="w-3.5 h-3.5 rounded-full border border-stone-200"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-stone-950 group-hover:text-[#004ac6] transition-colors">
                    {capsule.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 font-sans line-clamp-2 leading-relaxed">
                    {capsule.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-stone-900 font-semibold group-hover:text-[#004ac6]">
                  <span>Explore Capsule</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrival Editions Section */}
      <section className="py-20 bg-stone-100 border-y border-[#e5e1e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#fd761a] uppercase font-bold">
                // ATELIER RUNWAY COMMISSIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 mt-2">
                New Arrival Editions
              </h2>
            </div>
            <button
              onClick={() => onNavigate('color-editions')}
              className="cursor-pointer text-xs font-mono uppercase tracking-[0.2em] text-stone-900 hover:text-[#004ac6] flex items-center gap-2 mt-4 md:mt-0 font-semibold"
            >
              <span>View Full Repository (32)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_NEW_ARRIVALS.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-stone-200 hover:border-stone-900 transition-all duration-300 flex flex-col"
              >
                {/* Visual */}
                <div className="relative aspect-[3/4] bg-stone-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider font-semibold ${item.badgeBg}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-stone-600 bg-white/90 px-1.5 py-0.5">
                    {item.look}
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => {
                        const product = COLOR_EDITIONS_PRODUCTS.find((p) => p.name.includes('Coat') || p.id === 'prod-01') || COLOR_EDITIONS_PRODUCTS[0];
                        onQuickView(product);
                      }}
                      className="cursor-pointer flex-1 bg-white hover:bg-[#acf847] text-stone-950 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart({
                          productId: item.id,
                          title: item.title,
                          price: item.price,
                          size: 'M',
                          color: item.fabric,
                          image: item.image,
                          quantity: 1,
                        });
                      }}
                      className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white p-2 transition-colors flex items-center justify-center"
                      title="Add M to Bag"
                    >
                      <span className="material-symbols-outlined text-sm">add_shopping_bag</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      {item.colors.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-3 h-3 rounded-full border border-stone-200"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <h4
                      onClick={() => onNavigate('product-detail')}
                      className="font-serif text-lg font-medium text-stone-900 group-hover:text-[#004ac6] transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-1">{item.fabric}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-stone-900">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => onNavigate('product-detail')}
                      className="cursor-pointer text-[10px] text-stone-500 hover:text-stone-950 uppercase tracking-widest font-semibold"
                    >
                      Details &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chromatic Manifesto Volume VII Interactive SVG Wheel Section */}
      <section className="py-24 bg-[#1c1b1d] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
              // LABORATOIRE D'OPTIQUE APPLIQUÉE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-extralight text-white">
              Chromatic Manifesto Volume VII
            </h2>
            <p className="text-stone-400 text-sm font-sans">
              Click any chromatic arc to recalibrate the atelier spectral readout and inspect the
              molecular dye provenance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Interactive Spectral Donut Graphic */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  {/* Segment 0: Cobalt (0 - 90 deg) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#004ac6"
                    strokeWidth={activeSpectralIndex === 0 ? '26' : '18'}
                    strokeDasharray="109.95 330"
                    strokeDashoffset="0"
                    onClick={() => setActiveSpectralIndex(0)}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                  />
                  {/* Segment 1: Tangerine (90 - 180 deg) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#fd761a"
                    strokeWidth={activeSpectralIndex === 1 ? '26' : '18'}
                    strokeDasharray="109.95 330"
                    strokeDashoffset="-110"
                    onClick={() => setActiveSpectralIndex(1)}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                  />
                  {/* Segment 2: Citron (180 - 270 deg) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#acf847"
                    strokeWidth={activeSpectralIndex === 2 ? '26' : '18'}
                    strokeDasharray="109.95 330"
                    strokeDashoffset="-220"
                    onClick={() => setActiveSpectralIndex(2)}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                  />
                  {/* Segment 3: Noir (270 - 360 deg) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#737686"
                    strokeWidth={activeSpectralIndex === 3 ? '26' : '18'}
                    strokeDasharray="109.95 330"
                    strokeDashoffset="-330"
                    onClick={() => setActiveSpectralIndex(3)}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                  />
                </svg>

                {/* Center Core HUD */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                    CHROMA
                  </span>
                  <span
                    className="font-serif text-2xl font-bold tracking-tight"
                    style={{ color: currentSpectrum.hex === '#1c1b1d' ? '#ffffff' : currentSpectrum.hex }}
                  >
                    {currentSpectrum.wavelength}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 mt-1 uppercase">
                    {currentSpectrum.hex}
                  </span>
                </div>
              </div>

              {/* Arc Selector Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-sm">
                {spectralManifesto.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSpectralIndex(idx)}
                    className={`cursor-pointer py-2 px-1 text-center rounded text-[10px] font-mono tracking-wider uppercase border transition-all ${
                      activeSpectralIndex === idx
                        ? 'border-white bg-white/10 text-white font-bold'
                        : 'border-stone-800 text-stone-400 hover:border-stone-600'
                    }`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1.5"
                      style={{ backgroundColor: item.hex }}
                    ></span>
                    Arc 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Technical Spec & Philosophical Reading */}
            <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 p-8 sm:p-10 rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#acf847] uppercase">
                    SPECTRAL SIGNATURE 0{activeSpectralIndex + 1}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    {currentSpectrum.hue}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">
                    OPTICAL FREQUENCY
                  </span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: currentSpectrum.hex === '#1c1b1d' ? '#acf847' : currentSpectrum.hex }}
                  >
                    {currentSpectrum.wavelength}
                  </span>
                </div>
              </div>

              {/* Philosophical Body */}
              <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed italic border-l-2 pl-4 border-stone-700">
                "{currentSpectrum.philosophy}"
              </p>

              {/* Atelier Technical Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs font-mono">
                <div className="bg-stone-950 p-4 border border-stone-800/80">
                  <span className="text-[10px] text-stone-500 block uppercase">
                    MATERIAL BINDING
                  </span>
                  <span className="text-stone-200 mt-1 block font-medium">
                    {currentSpectrum.fabric}
                  </span>
                </div>
                <div className="bg-stone-950 p-4 border border-stone-800/80">
                  <span className="text-[10px] text-stone-500 block uppercase">
                    LABORATORY PROVENANCE
                  </span>
                  <span className="text-stone-200 mt-1 block font-medium">
                    {currentSpectrum.provenance}
                  </span>
                </div>
                <div className="bg-stone-950 p-4 border border-stone-800/80 sm:col-span-2 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 uppercase">
                    SPECTRAL PURITY METRIC
                  </span>
                  <span className="text-[#acf847] font-bold">{currentSpectrum.chromaScore}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('color-editions')}
                  className="cursor-pointer bg-white hover:bg-[#acf847] text-stone-950 px-6 py-3 text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center gap-2"
                >
                  <span>Filter Repository by This Hue</span>
                  <span className="material-symbols-outlined text-sm">filter_alt</span>
                </button>
                <button
                  onClick={() => onNavigate('runway-ss25')}
                  className="cursor-pointer text-xs font-mono text-stone-400 hover:text-white uppercase tracking-wider transition-colors"
                >
                  View on Runway &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AT THE BOTTOM OF THE HOME PAGE: Zoe - Nude Cosmetics Video & Link */}
      <ZoeCosmeticsSection onOpenBrandPortal={onOpenZoePortal} variant="home" />

      {/* VERY BOTTOM OF THE HOME PAGE: YouTube Infinite Runway Motion Reel */}
      <section className="bg-[#1c1b1d] text-[#fcf8fb] py-20 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#004ac6] text-white text-[10px] font-mono tracking-widest uppercase rounded-xs mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#acf847] animate-ping" />
                <span>LIVE CINEMATIC REEL // PERPETUAL BROADCAST</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
                The Living Runway Installation
              </h3>
            </div>
            <div className="text-stone-400 font-mono text-xs flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#acf847]">
                <span className="material-symbols-outlined text-sm">all_inclusive</span>
                <span>Infinite Loop Active</span>
              </span>
              <span>•</span>
              <span className="text-stone-400">SF &amp; LA, CA 2027</span>
            </div>
          </div>

          {/* 16:9 Responsive Video Viewport */}
          <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl border border-stone-800 rounded-xs">
            <iframe
              className="w-full h-full border-0 absolute inset-0"
              src="https://www.youtube.com/embed/W7gTx8q0e7A?autoplay=1&mute=1&loop=1&playlist=W7gTx8q0e7A&playsinline=1&rel=0&modestbranding=1"
              title="KoColor Living Runway Installation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-stone-500 uppercase tracking-wider gap-2">
            <span>KOCOLOR MAISON CONTINUOUS VISUAL STREAM // AUTO-START &amp; LOOP FOREVER</span>
            <span className="text-stone-400">HD BROADCAST FEED • PAIRED WITH SF &amp; LA 2027 RUNWAY</span>
          </div>
        </div>
      </section>
    </div>
  );
};
