import React, { useRef, useState, useEffect } from 'react';
import { ScreenType, CurrencyType, BagItem } from '../types';
import { CURRENCY_RATES } from '../data/mockData';
import { LunaSeaPage } from '../components/LunaSeaPage';
import { LunaSeaTab } from '../data/lunaseaData';

interface CosmeticsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currency: CurrencyType;
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
  defaultBrand?: 'zoenude' | 'lunasea';
  onBrandChange?: (brand: 'zoenude' | 'lunasea') => void;
  initialTab?: LunaSeaTab;
  onTabChange?: (tab: LunaSeaTab) => void;
}

interface CosmeticProduct {
  id: string;
  brand: 'zoenude' | 'lunasea';
  title: string;
  category: string;
  shade: string;
  shadeHex: string;
  price: number;
  specs: string;
  badge: string;
  image: string;
  benefits: string[];
  volume: string;
  availableShades?: { name: string; hex: string; desc?: string }[];
}

export const CosmeticsScreen: React.FC<CosmeticsScreenProps> = ({
  onNavigate,
  currency,
  onAddToCart,
  defaultBrand = 'zoenude',
  onBrandChange,
  initialTab,
  onTabChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<'zoenude' | 'lunasea'>(defaultBrand);
  const [bagToast, setBagToast] = useState<string | null>(null);

  useEffect(() => {
    if (defaultBrand && defaultBrand !== selectedBrand) {
      setSelectedBrand(defaultBrand);
    }
  }, [defaultBrand]);

  const handleBrandSelect = (brand: 'zoenude' | 'lunasea') => {
    setSelectedBrand(brand);
    onBrandChange?.(brand);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (amount: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(amount * rate).toLocaleString()}`;
  };

  // Section 1: ZoeNude (Barely-There Line)
  const zoeProducts: CosmeticProduct[] = [
    {
      id: 'zoe-prod-01',
      brand: 'zoenude',
      title: 'Luminous Shell Fluid Tint',
      category: 'Barely-There Complexion',
      shade: 'Universal Bare Glow (01-08 Adaptable)',
      shadeHex: '#e8c9b3',
      price: 52,
      specs: 'Crushed mother-of-pearl suspension in 100% sugarcane squalane with zero talc.',
      badge: 'Barely-There Hero',
      volume: '30ml / 1.0 fl oz',
      benefits: ['Second-skin breathable veil', 'Marine algae hydration', 'Non-comedogenic glow'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmtJiAJoPZnAkGZa5LeKZ2o1axOcQWZeS-VblFwrqBLPZLsCCXphHFkZrmWIpooeeY5lFGeJfnW85U43rOQjAHM-TGPFjP2Aokfkh4l9Iq8ZDgsHma6kJ0EL1OeJ6QpaX9LnNE2726X24bvmaiqIf2U_sA200NX1LCAaqP-8e5EvomTAQR0FJmyoKbZB5kKnefps764qbqJzscx6uIj1honjvTAurSHNYHT2rF20y2VllMwWth5AWu',
    },
    {
      id: 'zoe-prod-02',
      brand: 'zoenude',
      title: 'Mother-of-Pearl Nude Highlighter',
      category: 'Subtle Illumination',
      shade: 'Chroma Oyster Refraction',
      shadeHex: '#f5dfd0',
      price: 44,
      specs: 'Micro-platelet mineral reflectives that mirror coastal sunlight without glitter.',
      badge: 'Zero Particulate Glitter',
      volume: '15ml / 0.5 fl oz',
      benefits: ['Organic oyster reflectives', 'Dewy moisture lock', 'Sweat & humidity proof'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRZekCMho9xNYsUXzN6rT2JqYdqoGGVeuYgUgohv8rGMs8byOw1DeccPmsrqjyg3C_BZh6onJZ5r1iBBpRSpH8sEcZJLFbyeyr-xxvNQYzGqKtyDn4ZUeMPW2J-DI9M_0vAyb6Re-ajdunfvo6PvVpbcO-wqE54sdVJ5C9jhN0d2Ec8W-lVxGEEGLhI41zEqvRS1qCFFM_IBE-47M86HF4g6j07EA0KD7ZHmYdsBOhjRxGSbfSKBD',
    },
    {
      id: 'zoe-prod-03',
      brand: 'zoenude',
      title: 'Bare Petal Lip Cushion Dew',
      category: 'Lip Care & Whisper Tint',
      shade: 'Sun-Bleached Shell Nude',
      shadeHex: '#cb9b82',
      price: 32,
      specs: 'Sub-molecular marine collagen plumping balm infused with cold-pressed camellia.',
      badge: 'Everyday Whisper',
      volume: '12ml / 0.4 fl oz',
      benefits: ['12hr continuous lip barrier', 'Translucent petal kiss', 'Non-sticky cushion balm'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFVfl6TCsA-4DdmfNX9nf7gYQ7xAroyS1uHdZSfSNOtEynbcdgVt1Wd6hi7Q2MRGe-KWyOaG8wmApl_3r4WQPd-bUZvSqm_0UI_xPIeSw-I19GNFpt0Cjfh9fQh9jXetBNx9mmBmump7nCrTsacxbI08VOmeMXAbmPcIouS-8X9qsgUVAhkq7d-bb_G6FgQNEoZdmsScBTg1ojcrPWkelLNQxVU3vH0cL2cQlC1LI4ltaER9xTyEku',
    },
    {
      id: 'zoe-prod-04',
      brand: 'zoenude',
      title: 'Ocean Mist Setting Glaze',
      category: 'Weightless Hydrosol',
      shade: 'Clear Luminescent Hydrosol',
      shadeHex: '#d8ebe4',
      price: 38,
      specs: 'Giant sea kelp bio-ferment that locks micro-pigments with zero powdery finish.',
      badge: 'Skin Lock',
      volume: '100ml / 3.4 fl oz',
      benefits: ['Anti-pollution shielding', 'Calms facial redness', 'Micro-fine ambient dispersion'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbEGtBua86367BOLcgoufcDVg0dLZl5ADaSKpCNP0hwrAQTq9HngPHNMyTp7v1V_3eZnrakxFcBx--F1b7aJGFi7lQXxsIt7C8GFgNcSrIbMAXVMvVgdWIkDm_VlJsg3xKInO9vpnp60mn8vT6l6wulaRa1EqHdiOa6KaM1klC9dNesTJ_cPE7zUwthQ4f416XEh6-Kbm9nWVihN2oeybtLhelwuP1PZbgZMwBI5OmwTXxx39TYQo',
    },
    {
      id: 'zoe-prod-05',
      brand: 'zoenude',
      title: 'Biocompatible SPF 50+ Mineral Shield',
      category: 'Solar Protection',
      shade: 'Translucent Nude Melt',
      shadeHex: '#eed8c9',
      price: 48,
      specs: 'Non-nano zinc oxide with red marine algae extract providing broad-spectrum photoprotection.',
      badge: 'Circadian Defense',
      volume: '50ml / 1.7 fl oz',
      benefits: ['100% invisible on all skin tones', 'Reef-safe formulation', 'Zero white cast'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmtJiAJoPZnAkGZa5LeKZ2o1axOcQWZeS-VblFwrqBLPZLsCCXphHFkZrmWIpooeeY5lFGeJfnW85U43rOQjAHM-TGPFjP2Aokfkh4l9Iq8ZDgsHma6kJ0EL1OeJ6QpaX9LnNE2726X24bvmaiqIf2U_sA200NX1LCAaqP-8e5EvomTAQR0FJmyoKbZB5kKnefps764qbqJzscx6uIj1honjvTAurSHNYHT2rF20y2VllMwWth5AWu',
    },
    {
      id: 'zoe-prod-06',
      brand: 'zoenude',
      title: 'Crushed Pearl & Sea-Salt Lip Polish',
      category: 'Exfoliation',
      shade: 'Crystalline Mineral Pink',
      shadeHex: '#f3c7be',
      price: 28,
      specs: 'Organic Pacific sea-salt crystals whipped into whipped mango butter and organic camellia.',
      badge: 'Atelier Ritual',
      volume: '20g / 0.7 oz',
      benefits: ['Gentle enzymatic resurfacing', 'Restores natural lip vermilion', 'Prepares lips for cushion'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFVfl6TCsA-4DdmfNX9nf7gYQ7xAroyS1uHdZSfSNOtEynbcdgVt1Wd6hi7Q2MRGe-KWyOaG8wmApl_3r4WQPd-bUZvSqm_0UI_xPIeSw-I19GNFpt0Cjfh9fQh9jXetBNx9mmBmump7nCrTsacxbI08VOmeMXAbmPcIouS-8X9qsgUVAhkq7d-bb_G6FgQNEoZdmsScBTg1ojcrPWkelLNQxVU3vH0cL2cQlC1LI4ltaER9xTyEku',
    },
  ];

  const handleAddProduct = (prod: CosmeticProduct, customShade?: string) => {
    const finalShade = customShade || prod.shade;
    onAddToCart({
      productId: prod.id,
      title: `ZoeNude — ${prod.title}`,
      price: prod.price,
      size: prod.volume,
      color: finalShade,
      image: prod.image,
      quantity: 1,
    });
    setBagToast(`Added "${prod.title} (${finalShade.split('(')[0]})" to Bag`);
    setTimeout(() => setBagToast(null), 3200);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#fcfaf7] text-[#1c1b1d] min-h-screen">
      {/* Bag Feedback Toast */}
      {bagToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#1c1b1d] text-[#faede1] border border-[#f4a261] px-5 py-3 rounded text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#f4a261] text-base">shopping_bag</span>
          <span>{bagToast}</span>
        </div>
      )}

      {/* Top Cosmetics Navigation Bar (Strictly ZoeNude and LunaSea - No "All Cosmetics") */}
      <div className="sticky top-20 z-30 bg-[#1c1b1d] text-white border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#f4a261] uppercase font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f4a261] animate-pulse"></span>
              03 / COSMETICS:
            </span>

            {/* Exactly 2 Buttons: ZoeNude vs LunaSea (Soft Pastels) */}
            <div className="flex items-center bg-stone-900 p-1 rounded-full border border-stone-800 text-xs font-mono">
              <a
                href="/cosmetics?brand=zoenude"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleBrandSelect('zoenude');
                  }
                }}
                className={`cursor-pointer px-4 sm:px-5 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedBrand === 'zoenude'
                    ? 'bg-[#f4a261] text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="ZoeNude Barely-There Bio-Formulation (Direct Link: /cosmetics?brand=zoenude)"
              >
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                <span>ZoeNude (Barely-There)</span>
              </a>

              <a
                href="/cosmetics?brand=lunasea"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleBrandSelect('lunasea');
                  }
                }}
                className={`cursor-pointer px-4 sm:px-5 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedBrand === 'lunasea'
                    ? 'bg-gradient-to-r from-[#d8b4e2] via-[#bae6fd] to-[#fed7aa] text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="LunaSea Soft Pastels Capsule 2027 (Direct Link: /cosmetics?brand=lunasea)"
              >
                <span className="w-2 h-2 rounded-full bg-[#d8b4e2] inline-block"></span>
                <span>LunaSea (Soft Pastels)</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono text-stone-400">

            {selectedBrand === 'zoenude' ? (
              <a
                href="https://zoenude.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f4a261]/20 hover:bg-[#f4a261] hover:text-stone-950 text-[#f4a261] px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-colors flex items-center gap-1"
              >
                <span>Visit ZoeNude.com</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            ) : (
              <span className="text-purple-300 hidden md:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300"></span>
                <span>LUNASEA SOFT PASTELS CAPSULE (2027)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          BRAND 1: ZOENUDE (BARELY THERE)
          ======================================================== */}
      {selectedBrand === 'zoenude' && (
        <div className="animate-fadeIn">
          {/* ZoeNude Hero Section */}
          <section className="relative py-16 sm:py-24 border-b border-[#e8ded4] overflow-hidden bg-gradient-to-b from-[#f8f5f0] via-[#fcfaf7] to-[#f8f5f0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Narrative */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#1c1b1d] text-[#faede1] text-[10px] font-mono tracking-[0.25em] uppercase rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
                    CHILD BRAND // BARELY-THERE COSMETICS
                  </div>

                  <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#1c1b1d] leading-[1.06] tracking-tight">
                    Beauty, Without The Evidence.
                  </h1>

                  <p className="font-serif italic text-2xl text-[#8d6e5a] font-normal">
                    Zoe — Nude Cosmetics
                  </p>

                  <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                    Conceived as the minimalist, organic counterpart to KoColor's high-chroma architectural
                    world. Formulated with bio-micronized sea minerals, crushed mother-of-pearl reflectives,
                    and weightless marine hydrators. Zero talc, zero heavy fragrance, zero cake.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="https://zoenude.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer bg-[#1c1b1d] hover:bg-[#8d6e5a] text-[#faede1] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
                    >
                      <span>Visit ZoeNude.com</span>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedBrand('lunasea');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer bg-white border border-[#decbb7] hover:border-[#1c1b1d] text-[#1c1b1d] px-6 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2"
                    >
                      <span>Switch to LunaSea (Soft Pastels)</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[#e8ded4] grid grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-stone-400 block uppercase text-[10px]">FORMULA STYLE</span>
                      <span className="font-semibold text-stone-900 mt-0.5 block">Barely-There</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase text-[10px]">ORGANIC EXTRACT</span>
                      <span className="font-semibold text-stone-900 mt-0.5 block">Sea Algae &amp; Squalane</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase text-[10px]">ATELIER LOCATION</span>
                      <span className="font-semibold text-[#8d6e5a] mt-0.5 block">SF &amp; LA Labs (2027)</span>
                    </div>
                  </div>
                </div>

                {/* Right Video Showcase */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-video w-full bg-[#1c1b1d] overflow-hidden rounded-sm shadow-2xl border border-[#decbb7] group">
                    <video
                      ref={videoRef}
                      src="/assets/aistudio/Mermaid_emerging_from_seashell_20261022111320_e18bee16.mp4"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover object-center cursor-pointer"
                      onClick={togglePlay}
                    />

                    {/* Top Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#1c1b1d]/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#faede1] uppercase rounded-xs border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
                      <span>ZOE CAMPAIGN: MERMAID AT THE REEF (2027)</span>
                    </div>

                    {/* Direct Link Tag */}
                    <div className="absolute top-4 right-4 z-20">
                      <a
                        href="https://zoenude.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#faede1]/90 backdrop-blur-md text-[#1c1b1d] hover:bg-[#f4a261] hover:text-white px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold rounded-xs flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <span>ZoeNude.com</span>
                        <span className="material-symbols-outlined text-[12px]">north_east</span>
                      </a>
                    </div>

                    {/* Controls Bar */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="cursor-pointer bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                          title={isPlaying ? 'Pause' : 'Play'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isPlaying ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <button
                          onClick={toggleSound}
                          className="cursor-pointer bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isMuted ? 'volume_off' : 'volume_up'}
                          </span>
                        </button>
                        <span className="text-[10px] font-mono text-stone-300 ml-2 uppercase tracking-wider">
                          {isPlaying ? 'PLAYING • ARCHIVAL SOUNDSCAPE' : 'PAUSED'}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-[#faede1]/80 hidden sm:inline">
                        BIO-MINERAL REFRACTIVE FILM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ZoeNude 6 Formulations Catalog */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e2d6c8]">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8d6e5a] uppercase font-bold">
                  // BARELY-THERE ORGANIC FORMULATIONS (6 PIECES)
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1c1b1d] mt-2">
                  The ZoeNude Collection
                </h2>
              </div>
              <a
                href="https://zoenude.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-xs font-mono text-[#8d6e5a] hover:text-[#1c1b1d] uppercase tracking-wider font-semibold flex items-center gap-1.5 mt-4 md:mt-0 underline underline-offset-4"
              >
                <span>Full Collection at ZoeNude.com</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {zoeProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#decbb7] hover:border-[#1c1b1d] transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-[#f8f5f0] overflow-hidden border-b border-[#decbb7]">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1c1b1d] text-[#faede1] text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider">
                        {prod.badge}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 text-stone-700 text-[10px] font-mono px-2 py-0.5 border border-[#decbb7]">
                        {prod.volume}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                        <span>{prod.category}</span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                            style={{ backgroundColor: prod.shadeHex }}
                          />
                          <span className="text-stone-700 font-medium">{prod.shade.split('(')[0]}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-stone-900 group-hover:text-[#8d6e5a] transition-colors">
                        {prod.title}
                      </h3>

                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        {prod.specs}
                      </p>

                      <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-[11px] font-sans text-stone-500">
                        {prod.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#f4a261]"></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">ATELIER ACQUISITION</span>
                      <span className="text-lg font-serif font-bold text-stone-900">
                        {formatPrice(prod.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddProduct(prod)}
                      className="cursor-pointer bg-[#1c1b1d] hover:bg-[#8d6e5a] text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          BRAND 2: LUNASEA (SOFT PASTELS) - STITCH DESIGN
          ======================================================== */}
      {selectedBrand === 'lunasea' && (
        <div className="animate-fadeIn">
          <LunaSeaPage
            currency={currency}
            onAddToCart={onAddToCart}
            initialTab={initialTab}
            onTabChange={onTabChange}
            onSwitchToZoe={() => {
              setSelectedBrand('zoenude');
              onBrandChange?.('zoenude');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
};
