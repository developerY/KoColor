import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Waves,
  ShieldCheck,
  Leaf,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Plus,
  Star,
  StarHalf,
  ChevronLeft,
  ChevronRight,
  Compass,
  Check,
  Eye,
  TestTubes,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Search,
  BookOpen,
  Droplet,
  Layers,
  Sparkle,
  X,
  ChevronsRight,
} from 'lucide-react';
import { CurrencyType, BagItem } from '../types';
import { CURRENCY_RATES } from '../data/mockData';
import {
  LUNASEA_LOGO_URL,
  LUNASEA_PRODUCTS,
  LUNASEA_REVIEWS,
  LunaSeaProduct,
  LunaSeaShade,
  LunaSeaReview,
  LunaSeaTab,
} from '../data/lunaseaData';

interface LunaSeaPageProps {
  currency: CurrencyType;
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
  onSwitchToZoe?: () => void;
  initialTab?: LunaSeaTab;
  onTabChange?: (tab: LunaSeaTab) => void;
}

export const LunaSeaPage: React.FC<LunaSeaPageProps> = ({
  currency,
  onAddToCart,
  onSwitchToZoe,
  initialTab = 'home',
  onTabChange,
}) => {
  // Navigation within LunaSea brand with URL sync support
  const [activeTab, setActiveTab] = useState<LunaSeaTab>(initialTab);

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSelect = (tab: LunaSeaTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency Formatter
  const formatPrice = (usdPrice: number): string => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(usdPrice * rate).toLocaleString()}`;
  };

  // State
  const [selectedProductModal, setSelectedProductModal] = useState<LunaSeaProduct | null>(null);
  const [modalSelectedShade, setModalSelectedShade] = useState<LunaSeaShade | undefined>(undefined);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['pearl-veil-dew-drops']);
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle?: string } | null>(null);

  // Selected shades for grid cards
  const [selectedShades, setSelectedShades] = useState<Record<string, LunaSeaShade>>({});

  // Clinical matrix metrics state
  const [activeMetricTab, setActiveMetricTab] = useState<'28days' | '56days'>('28days');

  // Diagnostic Quiz State
  const [quizSkinType, setQuizSkinType] = useState('Combination & Tidal');
  const [quizFinish, setQuizFinish] = useState('Glass Dew (Hydra-Gloss)');

  // Virtual Swatch Studio State
  const makeupProducts = LUNASEA_PRODUCTS.filter((p) => p.category === 'lunar-makeup');
  const [swatchProduct, setSwatchProduct] = useState<LunaSeaProduct>(
    makeupProducts.find((p) => p.id === 'pearl-veil-dew-drops') || makeupProducts[0]
  );
  const [swatchShade, setSwatchShade] = useState<LunaSeaShade>(
    swatchProduct?.shades ? swatchProduct.shades[1] : { id: 'default', name: 'Default', hex: '#f1dbc3' }
  );

  // Tidal Rituals Timer & Audio
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState<'3min' | '5min' | '10min'>('3min');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<LunaSeaReview[]>(LUNASEA_REVIEWS);
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4'>('all');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewProduct, setNewReviewProduct] = useState(LUNASEA_PRODUCTS[0].name);

  // INCI Glossary Search
  const [ingredientSearch, setIngredientSearch] = useState('');

  // Toast trigger
  const triggerToast = (title: string, subtitle?: string) => {
    setToastMessage({ title, subtitle });
    setTimeout(() => setToastMessage(null), 3600);
  };

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add to Bag handler
  const handleAddProductToBag = (
    product: LunaSeaProduct,
    chosenShade?: LunaSeaShade,
    quantity: number = 1
  ) => {
    const finalShade = chosenShade || (product.shades ? product.shades[0] : undefined);
    const shadeName = finalShade ? ` (${finalShade.name})` : '';

    onAddToCart({
      productId: product.id,
      title: `LunaSea — ${product.name}`,
      price: product.price,
      size: product.volume,
      color: finalShade ? finalShade.name : 'Standard Formulation',
      image: product.image,
      quantity,
    });

    triggerToast('Added to Cart', `${product.name}${shadeName} • ${formatPrice(product.price * quantity)}`);
  };

  // Open detail modal
  const openProductModal = (product: LunaSeaProduct) => {
    setSelectedProductModal(product);
    setModalSelectedShade(product.shades ? product.shades[0] : undefined);
    setModalQuantity(1);
  };

  // Audio Toggle for Ocean Surf
  const toggleOceanAudio = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.22;

        // LFO for gentle tidal wave swells
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.15; // 6-7 second wave cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.18;

        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        lfo.start();
        setIsAudioPlaying(true);
      } catch {
        // Fallback gracefully
        setIsAudioPlaying(false);
      }
    }
  };

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Spotlight formulation
  const spotlightProduct = LUNASEA_PRODUCTS[0]; // Moonlit Nectar Serum
  const bestSellers = LUNASEA_PRODUCTS.slice(0, 4);

  // Clinical metrics data
  const metricsData = {
    '28days': [
      { label: 'Deep Epidermal Hydration Retention', value: 94.2, display: '+94.2%', color: 'bg-[#8FAEA8]' },
      { label: 'Transepidermal Barrier Restoration', value: 88.6, display: '+88.6%', color: 'bg-[#27484B]' },
      { label: 'Micro-Circulation Radiance Index', value: 81.4, display: '+81.4%', color: 'bg-[#E0BFC8]' },
      { label: 'Cellular ATP Mitochondrial Rebound', value: 76.9, display: '+76.9%', color: 'bg-[#8FAEA8]' },
    ],
    '56days': [
      { label: 'Deep Epidermal Hydration Retention', value: 98.7, display: '+98.7%', color: 'bg-[#8FAEA8]' },
      { label: 'Transepidermal Barrier Restoration', value: 94.1, display: '+94.1%', color: 'bg-[#27484B]' },
      { label: 'Micro-Circulation Radiance Index', value: 89.2, display: '+89.2%', color: 'bg-[#E0BFC8]' },
      { label: 'Cellular ATP Mitochondrial Rebound', value: 84.5, display: '+84.5%', color: 'bg-[#8FAEA8]' },
    ],
  };

  // Diagnostic Quiz Logic
  const quizMatches: Record<string, { title: string; desc: string; price: number; productIds: string[] }> = {
    'Dry & Dehydrated': {
      title: 'Opal Wave Cream + Moonlit Nectar Serum',
      desc: 'Infuses deep sea kelp lipids to restore cellular matrix and retain weightless water-locking barrier.',
      price: 142,
      productIds: ['opal-wave-cream', 'moonlit-nectar-serum'],
    },
    'Combination & Tidal': {
      title: 'Tidal Infusion Duo (Serum + Cloud Cream)',
      desc: 'Calibrates natural sebum, locks in multi-weight coastal hydration, and finishes with a glassy sea sheen.',
      price: 134,
      productIds: ['moonlit-nectar-serum', 'opal-wave-cream'],
    },
    'Sensitive Barrier': {
      title: 'Celeste Midnight Mask + Bio-Pearl Mist',
      desc: 'Calms reactive capillaries with cold-pressed kelp bio-ferments and restorative oceanic minerals.',
      price: 114,
      productIds: ['celeste-midnight-mask', 'bio-pearl-infusion-mist'],
    },
    'Dull & Fatigued': {
      title: 'Pearl Veil Dew Drops + Moonlit Nectar Serum',
      desc: 'Awakens radiance through micronized mother-of-pearl bio-peptides and active marine glycogen.',
      price: 124,
      productIds: ['pearl-veil-dew-drops', 'moonlit-nectar-serum'],
    },
  };

  const currentQuizResult = quizMatches[quizSkinType] || quizMatches['Combination & Tidal'];
  const recommendedDuoProducts = currentQuizResult.productIds
    .map((id) => LUNASEA_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as LunaSeaProduct[];

  // INCI Glossary Items
  const ingredientGlossary = [
    {
      inci: 'Laminaria Digitata (Oarweed Kelp) Bio-Ferment',
      origin: 'Brittany UNESCO Biosphere',
      function: 'Deep epidermal moisture retention, natural glycosaminoglycans',
      products: 'Moonlit Nectar Algae Serum, Opal Wave Cream',
    },
    {
      inci: 'Hydrolyzed Akoya Conchiolin (Sea Pearl Peptides)',
      origin: 'Upcycled Akoya Saltwater Pearls',
      function: 'High-refractive optical radiance, stimulates cellular turnover',
      products: 'Pearl Veil Dew Drops, Lustrous Compact Illuminator',
    },
    {
      inci: 'Salicornia Herbacea (Coastal Glasswort) Wax',
      origin: 'Atlantic Maritime Marshes',
      function: 'Increases aquaporin-8 water channels, prevents transepidermal loss',
      products: 'Tidal Glow Bio-Ferment Lip Oil',
    },
    {
      inci: 'Marine Glycogen & Phytoplankton ATP',
      origin: 'North Atlantic Deep Drift',
      function: 'Recharges fatigued mitochondria, protects against blue-light oxidation',
      products: 'Moonlit Nectar Algae Serum, Celeste Midnight Mask',
    },
    {
      inci: 'Bisabolol & Blue Sea Tansy Extract',
      origin: 'Coastal Maritime Meadows',
      function: 'Calms nocturnal micro-inflammation and soothes capillary redness',
      products: 'Celeste Midnight Overnight Mask',
    },
    {
      inci: 'Non-Nano Zinc Oxide (14.2%) & Sea Fennel',
      origin: 'Natural Coastal Earth Minerals',
      function: 'Reef-safe broad spectrum mineral shield against UVA and UVB rays',
      products: 'Pearl Veil Tinted Dew Drops',
    },
  ];

  const filteredIngredients = ingredientGlossary.filter(
    (item) =>
      item.inci.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
      item.function.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
      item.products.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F8F6F1] text-[#27484B] font-sans antialiased min-h-screen selection:bg-[#E0BFC8]/50 selection:text-[#27484B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#27484B] text-[#F8F6F1] px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-right-4 duration-300">
          <div className="w-7 h-7 rounded-full bg-[#8FAEA8] text-[#27484B] flex items-center justify-center font-bold text-xs">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-xs tracking-wider uppercase">{toastMessage.title}</div>
            {toastMessage.subtitle && <div className="text-[11px] text-[#8FAEA8] font-light">{toastMessage.subtitle}</div>}
          </div>
        </div>
      )}

      {/* Top Brand Banner / Switcher Bar */}
      <div className="bg-[#27484B] text-[#F8F6F1] px-4 md:px-8 py-2.5 border-b border-white/10 text-xs font-mono">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8FAEA8] animate-pulse"></span>
            <span className="tracking-widest uppercase font-semibold text-[11px] text-[#8FAEA8]">
              LunaSea Coastal Marine Biotechnology
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/70 text-[11px]">
              Cold-Extracted Kelp & Bio-Pearl Peptides
            </span>
          </div>

          {onSwitchToZoe && (
            <button
              onClick={onSwitchToZoe}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#E0BFC8] hover:text-[#27484B] transition-all text-[11px] uppercase tracking-wider text-white"
            >
              <span>Switch to ZoeNude (Barely-There)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main LunaSea Header Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F6F1]/90 backdrop-blur-md border-b border-[#27484B]/10 px-4 md:px-8 lg:px-12 py-3.5">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <a
            href="/cosmetics?brand=lunasea"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabSelect('home');
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={LUNASEA_LOGO_URL}
              alt="LunaSea"
              className="h-10 w-auto object-contain rounded-lg shadow-xs transition-transform group-hover:scale-105"
            />
            <div>
              <div className="font-serif text-2xl tracking-tight font-medium text-[#27484B] leading-none">
                LunaSea
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-[#8FAEA8] font-medium font-mono mt-0.5">
                Marine Cellular Science
              </div>
            </div>
          </a>

          {/* Navigation Tabs with True Browser URL Integration */}
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {[
              { id: 'home', label: 'Overview', path: '/cosmetics?brand=lunasea' },
              { id: 'skincare', label: 'Skincare', path: '/cosmetics?brand=lunasea&tab=skincare' },
              { id: 'lunar-makeup', label: 'Lustrous Makeup', path: '/cosmetics?brand=lunasea&tab=lunar-makeup' },
              { id: 'tidal-rituals', label: 'Tidal Rituals', path: '/cosmetics?brand=lunasea&tab=tidal-rituals' },
              { id: 'algae-science', label: 'Algae Science & INCI', path: '/cosmetics?brand=lunasea&tab=algae-science' },
              { id: 'about-us', label: 'About & Harvest', path: '/cosmetics?brand=lunasea&tab=about-us' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={tab.path}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    handleTabSelect(tab.id as LunaSeaTab);
                  }
                }}
                className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#27484B] text-[#F8F6F1] shadow-sm'
                    : 'text-[#27484B]/70 hover:text-[#27484B] hover:bg-white/60'
                }`}
                title={`LunaSea — ${tab.label}`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Currency Display + Diagnostic Quiz Shortcut */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => {
                handleTabSelect('home');
                const quizElem = document.getElementById('tidal-quiz');
                if (quizElem) {
                  quizElem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden lg:inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#27484B] font-medium hover:text-[#8FAEA8] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#8FAEA8]" />
              <span>Skin Diagnostic Quiz</span>
            </button>
            <div className="hidden lg:block h-4 w-px bg-[#27484B]/15" />
            <span className="text-[11px] font-mono text-[#8FAEA8] tracking-widest uppercase">
              {currency} (LIVE)
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          TAB 1: HOME / OVERVIEW
          ========================================================================= */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="relative px-4 md:px-8 lg:px-12 py-12 md:py-20 overflow-hidden bg-gradient-to-b from-[#CCD6EB]/20 via-[#F8F6F1] to-[#F8F6F1]">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#CCD6EB] text-[#27484B] text-[11px] font-mono tracking-widest uppercase shadow-xs">
                  <Waves className="w-3.5 h-3.5 text-[#8FAEA8]" />
                  <span>Harvest 2027 • Cold-Extracted Marine Bio-Ferment</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#27484B] font-normal leading-[1.15] tracking-tight">
                  Marine Biotechnology.
                  <span className="italic block font-light text-[#8FAEA8]">
                    Luminous Cellular Vitality.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#27484B]/80 font-light leading-relaxed max-w-xl">
                  Bio-fermented marine algae, crushed sea pearl peptides, and restorative coastal botanicals crafted for radiant, weightless cellular vitality.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const bestElem = document.getElementById('bestsellers');
                      if (bestElem) bestElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="cursor-pointer inline-flex items-center gap-2 bg-[#27484B] text-[#F8F6F1] text-xs uppercase tracking-wider font-semibold px-7 py-3 rounded-full hover:bg-[#1a3234] transition-all hover:scale-[1.02] shadow-md"
                  >
                    <span>Explore New Arrivals</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleTabSelect('algae-science')}
                    className="cursor-pointer inline-flex items-center gap-2 bg-white/70 text-[#27484B] text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full hover:bg-white transition-all border border-[#27484B]/15"
                  >
                    <Sparkles className="w-4 h-4 text-[#8FAEA8]" />
                    <span>Discover the Science</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-6 text-[11px] text-[#27484B]/70 font-mono">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8FAEA8]" />
                    <span className="uppercase tracking-wider">Clinical Efficacy</span>
                  </div>
                  <div className="h-3 w-px bg-[#27484B]/20 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-[#8FAEA8]" />
                    <span className="uppercase tracking-wider">Cold-Extracted Kelp</span>
                  </div>
                  <div className="h-3 w-px bg-[#27484B]/20 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-[#8FAEA8]" />
                    <span className="uppercase tracking-wider">Infinitely Recyclable</span>
                  </div>
                </div>
              </div>

              {/* Right Spotlight Formulation Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative bg-gradient-to-br from-white via-white/80 to-[#CCD6EB]/20 p-6 sm:p-7 rounded-3xl shadow-xl border border-white/80 overflow-hidden">
                  {/* Subtle Glow Spheres */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E0BFC8]/30 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#8FAEA8]/20 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FAEA8]/20 text-[#27484B] font-mono text-[10px] uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3 h-3 text-[#27484B]" />
                      Spotlight Formulation
                    </span>
                    <span className="font-mono text-[10px] text-[#27484B]/60 uppercase tracking-widest">
                      Ritual 01 / AM • PM
                    </span>
                  </div>

                  {/* Product Visual */}
                  <div
                    onClick={() => openProductModal(spotlightProduct)}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EBE7DF] mb-5 flex items-center justify-center cursor-pointer group shadow-inner"
                  >
                    <img
                      src={spotlightProduct.image}
                      alt={spotlightProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Status Bar */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between shadow-xs border border-white/60">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#8FAEA8] animate-pulse" />
                        <span className="font-mono text-[10px] text-[#27484B] uppercase font-bold tracking-wider">
                          In High Demand
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#27484B]/70 tracking-wide">
                        {spotlightProduct.batchInfo}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-baseline justify-between">
                      <h3
                        onClick={() => openProductModal(spotlightProduct)}
                        className="font-serif text-xl sm:text-2xl text-[#27484B] font-medium hover:text-[#8FAEA8] transition-colors cursor-pointer"
                      >
                        {spotlightProduct.name}
                      </h3>
                      <span className="font-serif text-xl sm:text-2xl text-[#27484B] font-light">
                        {formatPrice(spotlightProduct.price)}
                      </span>
                    </div>

                    <p className="text-xs text-[#27484B]/70 leading-relaxed line-clamp-2">
                      {spotlightProduct.description}
                    </p>

                    {/* Clinical Benefit Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-[#8FAEA8]/20 text-[#27484B] font-mono text-[10px] font-medium">
                        +94% Barrier Hydration
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#E0BFC8]/30 text-[#27484B] font-mono text-[10px] font-medium">
                        Deep-Sea Peptides
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/70 text-[#27484B] font-mono text-[10px] font-medium">
                        Refillable Opal Glass
                      </span>
                    </div>

                    {/* Quick Add Action */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleAddProductToBag(spotlightProduct)}
                        className="cursor-pointer flex-1 bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-3 px-4 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                      >
                        <ChevronsRight className="w-4 h-4 text-[#8FAEA8]" />
                        <span>Add to Bag • {formatPrice(spotlightProduct.price)}</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(spotlightProduct.id)}
                        className={`cursor-pointer w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                          wishlistIds.includes(spotlightProduct.id)
                            ? 'bg-[#E0BFC8] text-[#27484B]'
                            : 'bg-white/80 text-[#27484B] hover:bg-white'
                        }`}
                        aria-label="Save to favorites"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlistIds.includes(spotlightProduct.id) ? 'fill-[#27484B]' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Harmonious Categories Section */}
          <section className="w-full bg-[#EFECE6]/50 py-16 px-4 md:px-8 lg:px-12 border-y border-[#27484B]/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
                <div>
                  <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-1 font-semibold">
                    Curated Tidal Archives
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#27484B] font-normal">
                    Harmonious Categories
                  </h2>
                </div>
                <p className="text-sm text-[#27484B]/70 max-w-md leading-relaxed font-light">
                  Explore sensory textures engineered between ocean depth pressures and restorative celestial cycles.
                </p>
              </div>

              {/* 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 'skincare' as LunaSeaTab,
                    number: 'Collection 01',
                    title: 'Lunar Skincare',
                    description: 'Bio-ferment serums, cellular tidal essences, and weightless ocean cloud creams.',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh98HyE1NGbUlYqkAIVZRODIpWkpUuREZccpaxwr-WId-ZPRgkT4P_8KUjRDRC9TROkCJTsezCtftsmcjvFqt7ZypZbpl9uNWy_hxXclaG2_w3uvE2XUMZt1W1Z_cjSE41EuzN-v8YnM1XW_w2aj4nCp_z-TwDQt3n6o8awKbYSP7l9cfAXSzdh5cGxLqmbmnQlYt2m9pph6XIiXIBTtbNupjX-8t-OBPPxOPBkW9ZvvZGnofwMFrd',
                    count: '4 Formulations',
                    cta: 'Explore Essences',
                  },
                  {
                    id: 'lunar-makeup' as LunaSeaTab,
                    number: 'Collection 02',
                    title: 'Lustrous Tidal Makeup',
                    description: 'Pearl dew skin tints, ocean-glass lip peptides, and soft iridescent illuminators.',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmaq2EhKO7Ejsv6WBMpSx75BUiD_YwlSc_SXrOoyXPeA80JqqQFneJUc1PjdMr_hs6omRyOm22B4ATGdccbZmuTeTB2JHHIcu3efNK2ZvbUVwJ6bXvaZ00IYyQap-lR4fsJLe1cIHZj8OL_R4wbhE-NJf_NfB8HgaeT4BR1w1QX93UOqai8W5lxQmXL5WsqRe2hDkHKyK6idagZd0wS400nKx5QgGORFtPPX2gATFzhHWuTelm07k8',
                    count: '3 Formulations',
                    cta: 'Explore Tints',
                  },
                  {
                    id: 'tidal-rituals' as LunaSeaTab,
                    number: 'Collection 03',
                    title: 'Deep Sea Rituals',
                    description: 'Magnesium brine soaks, micro-kelp sculpting masks, and carved celadon tidal stones.',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHWmr4JP3jBvsGVv_hpMaBqC3sWRtkLh51Z0cWSiLfa35DC1ClsUX6T74pK8mHPkQ76GY0dcWwxTHdAydxT4X5SOPjLq-ggGuoMyw6_jQOgRKimTMhPZ8BplFM74XrvuVUVHKbmOlaMr0jIZ7MHBqAyXo1AxlhFvzUqiBI2AFxRTp9pFZb0cfsi8m7pLzwpMlb5lQWnUjIIWTDfGHz9wvRi-MBD6eZ8H-4IOlOPiwzoihTSF6xW9sn',
                    count: 'Ritual Accents',
                    cta: 'Explore Rituals',
                  },
                ].map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      handleTabSelect(cat.id);
                    }}
                    className="cursor-pointer group relative rounded-3xl overflow-hidden bg-white/70 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 border border-white/80 hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-[#8FAEA8]">
                          {cat.number}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#27484B] shadow-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-serif text-2xl text-[#27484B] font-medium">{cat.title}</h3>
                      <p className="text-xs text-[#27484B]/70 font-light leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE7DF] shadow-inner">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="mt-5 pt-2 flex items-center justify-between border-t border-[#27484B]/10">
                      <span className="font-mono text-[10px] text-[#27484B]/60 uppercase tracking-wider">
                        {cat.count}
                      </span>
                      <span className="font-mono text-xs text-[#27484B] underline underline-offset-4 tracking-wider uppercase font-semibold group-hover:text-[#8FAEA8] transition-colors">
                        {cat.cta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Revered Best Sellers Section */}
          <section className="w-full py-16 px-4 md:px-8 lg:px-12" id="bestsellers">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
                <div>
                  <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-1 font-semibold">
                    Master Formulations
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#27484B] font-normal">
                    Revered Best Sellers
                  </h2>
                </div>
                <div className="text-xs font-mono text-[#27484B]/60 mt-3 sm:mt-0">
                  Showing 4 of {LUNASEA_PRODUCTS.length} Iconic Formulations
                </div>
              </div>

              {/* 4 Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.map((prod) => {
                  const chosenShade = selectedShades[prod.id] || (prod.shades ? prod.shades[0] : undefined);
                  const isFav = wishlistIds.includes(prod.id);

                  return (
                    <div
                      key={prod.id}
                      className="bg-white/80 rounded-3xl p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 border border-white group"
                    >
                      <div>
                        {/* Image */}
                        <div
                          onClick={() => openProductModal(prod)}
                          className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EBE7DF] mb-4 cursor-pointer"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {prod.tag && (
                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] text-[#27484B] uppercase font-semibold tracking-wider shadow-xs">
                              {prod.tag}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(prod.id);
                            }}
                            className="cursor-pointer absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#27484B] hover:text-[#8FAEA8] flex items-center justify-center transition-colors shadow-xs"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#E0BFC8] text-[#E0BFC8]' : ''}`} />
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-[#8FAEA8]">
                            <Star className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                            <Star className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                            <Star className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                            <Star className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                            <Star className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                          </div>
                          <span className="font-mono text-[10px] text-[#27484B]/60 ml-1">
                            {prod.rating} ({prod.reviewCount})
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3
                          onClick={() => openProductModal(prod)}
                          className="font-serif text-lg text-[#27484B] mb-1.5 hover:text-[#8FAEA8] transition-colors cursor-pointer leading-snug font-medium line-clamp-1"
                        >
                          {prod.name}
                        </h3>
                        <p className="text-xs text-[#27484B]/70 line-clamp-2 mb-4 leading-relaxed font-light">
                          {prod.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-2 border-t border-[#27484B]/10">
                        {/* Shades */}
                        {prod.shades && prod.shades.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center gap-1.5">
                              {prod.shades.slice(0, 5).map((sh) => (
                                <button
                                  key={sh.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedShades((prev) => ({ ...prev, [prod.id]: sh }));
                                  }}
                                  title={sh.name}
                                  style={{ backgroundColor: sh.hex }}
                                  className={`w-4 h-4 rounded-full shadow-xs cursor-pointer hover:scale-110 transition-transform ${
                                    chosenShade?.id === sh.id ? 'ring-2 ring-[#27484B] scale-110' : 'ring-1 ring-black/10'
                                  }`}
                                />
                              ))}
                              {prod.shades.length > 5 && (
                                <span className="font-mono text-[10px] text-[#27484B]/50 ml-1">
                                  +{prod.shades.length - 5}
                                </span>
                              )}
                            </div>
                            {chosenShade && (
                              <span className="text-[10px] text-[#27484B]/70 font-mono mt-1 block truncate">
                                {chosenShade.name}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span className="font-serif text-lg font-medium text-[#27484B]">
                            {formatPrice(prod.price)}
                          </span>
                          <span className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-wider font-semibold">
                            {prod.volume}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddProductToBag(prod, chosenShade)}
                          className="cursor-pointer w-full bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] font-mono text-xs uppercase tracking-wider py-2.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Science Matrix Section */}
          <section className="w-full bg-[#EFECE6]/40 py-16 px-4 md:px-8 lg:px-12 border-y border-[#27484B]/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left: Study & Clinical Bars */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-1 font-semibold">
                      Haute Marine Biotechnology
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#27484B] font-normal leading-tight">
                      Uncompromising Cellular Rigor
                    </h2>
                  </div>
                  <p className="text-sm text-[#27484B]/70 leading-relaxed font-light">
                    We isolate bioactive marine molecules through cold enzymatic extraction—preserving natural polyphenol potencies without synthetic thermal degradation.
                  </p>

                  <div className="p-6 bg-white rounded-3xl shadow-xs border border-white">
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#27484B]/10">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#27484B] font-semibold block">
                          Clinical Bio-Response
                        </span>
                        <span className="font-mono text-[10px] text-[#8FAEA8]">
                          Double-Blind Study • N=120 Volunteers
                        </span>
                      </div>
                      <div className="flex gap-1 bg-[#F8F6F1] rounded-lg p-1 text-[10px] font-mono">
                        <button
                          onClick={() => setActiveMetricTab('28days')}
                          className={`cursor-pointer px-2.5 py-1 rounded-md transition-all ${
                            activeMetricTab === '28days'
                              ? 'bg-[#27484B] text-[#F8F6F1] font-semibold'
                              : 'text-[#27484B]/60 hover:text-[#27484B]'
                          }`}
                        >
                          28 Days
                        </button>
                        <button
                          onClick={() => setActiveMetricTab('56days')}
                          className={`cursor-pointer px-2.5 py-1 rounded-md transition-all ${
                            activeMetricTab === '56days'
                              ? 'bg-[#27484B] text-[#F8F6F1] font-semibold'
                              : 'text-[#27484B]/60 hover:text-[#27484B]'
                          }`}
                        >
                          56 Days
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {metricsData[activeMetricTab].map((m) => (
                        <div key={m.label}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#27484B]/80 font-light">{m.label}</span>
                            <span className="font-mono font-bold text-[#27484B]">{m.display}</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#EBE7DF] overflow-hidden">
                            <div
                              className={`h-full ${m.color} rounded-full transition-all duration-700 ease-out`}
                              style={{ width: `${m.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#27484B]/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#27484B]/60">
                        Third-Party Dermatologist Tested
                      </span>
                      <button
                        onClick={() => handleTabSelect('algae-science')}
                        className="cursor-pointer text-xs font-mono text-[#27484B] font-semibold flex items-center gap-1 hover:text-[#8FAEA8] transition-colors"
                      >
                        <span>Full Study Archive</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: 4 Pillars */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      pillar: 'Pillar 01',
                      title: 'Sustainable Hand-Harvested Kelp',
                      desc: 'Ethically gathered by certified divers from the pristine deep waters of the Brittany and Hebrides coasts during peak lunar tides.',
                      icon: <Waves className="w-5 h-5 text-[#8FAEA8]" />,
                    },
                    {
                      pillar: 'Pillar 02',
                      title: 'Upcycled Sea Pearl Peptides',
                      desc: 'Repurposed Akoya mother-of-pearl crystalline conchiolin peptides deliver luminous light-diffusing optical radiance without microplastics.',
                      icon: <Sparkles className="w-5 h-5 text-[#E0BFC8]" />,
                    },
                    {
                      pillar: 'Pillar 03',
                      title: '100% Waterless Cold Press',
                      desc: 'Formulas are formulated on a pure marine cellular juice base rather than tap water, supercharging concentration and bioavailability.',
                      icon: <TestTubes className="w-5 h-5 text-[#8FAEA8]" />,
                    },
                    {
                      pillar: 'Pillar 04',
                      title: 'Infinitely Recyclable Vessels',
                      desc: 'Custom frosted opal glass jars and biodegradable ocean-bound plastic lids engineered for lifetime refilling via our return vessel program.',
                      icon: <Leaf className="w-5 h-5 text-[#27484B]" />,
                    },
                  ].map((p) => (
                    <div
                      key={p.pillar}
                      className="bg-white p-6 rounded-3xl shadow-xs border border-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-full bg-[#F8F6F1] flex items-center justify-center mb-4 shadow-xs">
                          {p.icon}
                        </div>
                        <span className="font-mono text-[10px] text-[#27484B]/50 uppercase tracking-wider font-semibold">
                          {p.pillar}
                        </span>
                        <h3 className="font-serif text-xl text-[#27484B] mt-1 mb-2 font-medium">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#27484B]/70 leading-relaxed font-light">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Tidal Prescription Quiz */}
          <section className="w-full py-16 px-4 md:px-8 lg:px-12" id="tidal-quiz">
            <div className="max-w-[1440px] mx-auto">
              <div className="bg-gradient-to-br from-[#27484B] via-[#213f41] to-[#1a3234] text-[#F8F6F1] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#8FAEA8]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Quiz Controls */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#8FAEA8] text-[11px] font-mono tracking-widest uppercase">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Interactive Skin Diagnostic</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                      Find Your Tidal Formulation Ritual
                    </h2>

                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      Select your cutaneous profile and preferred finish to calibrate an authentic two-step marine regimen.
                    </p>

                    {/* Step 1: Skin Type */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8FAEA8] mb-2 font-semibold">
                        01. Select Cutaneous State
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Dry & Dehydrated',
                          'Combination & Tidal',
                          'Sensitive Barrier',
                          'Dull & Fatigued',
                        ].map((type) => (
                          <button
                            key={type}
                            onClick={() => setQuizSkinType(type)}
                            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-xs font-mono text-left transition-all border ${
                              quizSkinType === type
                                ? 'bg-white text-[#27484B] border-white font-semibold shadow-md'
                                : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Desired Finish */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8FAEA8] mb-2 font-semibold">
                        02. Desired Optical Finish
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Glass Dew (Hydra-Gloss)', 'Satin Pearl (Soft Refraction)', 'Velvet Mist (Demi-Matte)'].map(
                          (fin) => (
                            <button
                              key={fin}
                              onClick={() => setQuizFinish(fin)}
                              className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                                quizFinish === fin
                                  ? 'bg-[#8FAEA8] text-[#27484B] border-[#8FAEA8] font-bold shadow-xs'
                                  : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                              }`}
                            >
                              {fin}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Prescribed Ritual Duo */}
                  <div className="lg:col-span-6 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20">
                    <span className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                      Prescribed Duo Formulation
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium mb-2">
                      {currentQuizResult.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed font-light mb-6">
                      {currentQuizResult.desc}
                    </p>

                    {/* Duo Products Preview */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {recommendedDuoProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => openProductModal(p)}
                          className="bg-white/10 p-3 rounded-2xl border border-white/15 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-colors"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="overflow-hidden">
                            <div className="text-xs font-serif text-white font-medium truncate">{p.name}</div>
                            <div className="text-[10px] font-mono text-[#8FAEA8]">{formatPrice(p.price)}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-white/60 block">Duo Investment</span>
                        <span className="font-serif text-2xl text-white font-normal">
                          {formatPrice(currentQuizResult.price)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          recommendedDuoProducts.forEach((p) => handleAddProductToBag(p));
                          triggerToast('Prescribed Ritual Added', `${currentQuizResult.title} added to bag`);
                        }}
                        className="cursor-pointer bg-[#8FAEA8] hover:bg-[#a1bfb9] text-[#27484B] px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-[#27484B]" />
                        <span>Add Bespoke Ritual</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Press and Reviews Section */}
          <section className="w-full bg-[#EFECE6]/40 py-16 px-4 md:px-8 lg:px-12 border-t border-[#27484B]/10">
            <div className="max-w-[1440px] mx-auto">
              {/* Press Quotes */}
              <div className="mb-14 text-center max-w-3xl mx-auto">
                <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-3 font-semibold">
                  Global Critical Acclaim
                </span>
                <blockquote className="font-serif text-2xl sm:text-3xl text-[#27484B] font-light italic leading-snug">
                  "LunaSea represents the rare triumph where maritime biotechnology meets exquisite sensorial luxury. The barrier resilience is immediately palpable."
                </blockquote>
                <div className="font-mono text-xs uppercase tracking-widest text-[#27484B]/60 mt-3 font-semibold">
                  — Vogue International Beauty Awards
                </div>
              </div>

              {/* Reviews Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-[#27484B]/10">
                <div>
                  <h3 className="font-serif text-2xl text-[#27484B] font-normal">Verified Atelier Reviews</h3>
                  <p className="text-xs text-[#27484B]/70 font-mono mt-1">
                    4.9 / 5.0 Average rating across 1,180+ verified patrons
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`cursor-pointer px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      reviewFilter === 'all'
                        ? 'bg-[#27484B] text-[#F8F6F1] font-bold'
                        : 'bg-white text-[#27484B]/70 hover:bg-white/80'
                    }`}
                  >
                    All ({reviewsList.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('5')}
                    className={`cursor-pointer px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      reviewFilter === '5'
                        ? 'bg-[#27484B] text-[#F8F6F1] font-bold'
                        : 'bg-white text-[#27484B]/70 hover:bg-white/80'
                    }`}
                  >
                    5-Star Only
                  </button>
                  <button
                    onClick={() => setIsWritingReview(true)}
                    className="cursor-pointer px-4 py-1 rounded-full text-xs font-mono bg-[#8FAEA8] text-[#27484B] font-bold hover:bg-[#a1bfb9] transition-all ml-2"
                  >
                    + Write Review
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviewsList
                  .filter((r) => (reviewFilter === '5' ? r.rating === 5 : true))
                  .map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-6 rounded-3xl shadow-xs border border-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[#8FAEA8] mb-3">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#8FAEA8]" />
                          ))}
                        </div>
                        <h4 className="font-serif text-base text-[#27484B] font-medium mb-1.5 leading-snug">
                          "{rev.title}"
                        </h4>
                        <p className="text-xs text-[#27484B]/70 leading-relaxed font-light mb-4">
                          {rev.comment}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#27484B]/10 flex items-center justify-between text-[11px] font-mono text-[#27484B]/60">
                        <div>
                          <span className="font-semibold text-[#27484B] block">{rev.author}</span>
                          <span className="text-[10px]">{rev.location}</span>
                        </div>
                        <span className="text-[10px] text-[#8FAEA8]">{rev.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LUNAR SKINCARE
          ========================================================================= */}
      {activeTab === 'skincare' && (
        <div className="py-12 px-4 md:px-8 lg:px-12 animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                Collection 01 • Cellular Architecture
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#27484B] font-normal mb-3">
                Lunar Skincare
              </h1>
              <p className="text-sm text-[#27484B]/70 font-light leading-relaxed">
                Formulas engineered on cold-extracted marine juices and ocean glycogen to emulate the natural osmotic equilibrium of deep marine life.
              </p>
            </div>

            {/* Skincare Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {LUNASEA_PRODUCTS.filter((p) => p.category === 'skincare').map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-white flex flex-col justify-between group"
                >
                  <div>
                    <div
                      onClick={() => openProductModal(prod)}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE7DF] mb-5 cursor-pointer shadow-inner"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prod.tag && (
                        <span className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full font-mono text-[10px] text-[#27484B] uppercase font-bold tracking-wider shadow-xs">
                          {prod.tag}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prod.id);
                        }}
                        className="cursor-pointer absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#27484B] hover:text-[#8FAEA8] flex items-center justify-center shadow-xs"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlistIds.includes(prod.id) ? 'fill-[#E0BFC8] text-[#E0BFC8]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3
                        onClick={() => openProductModal(prod)}
                        className="font-serif text-xl text-[#27484B] font-medium hover:text-[#8FAEA8] transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                      <span className="font-serif text-xl font-light text-[#27484B]">
                        {formatPrice(prod.price)}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-wider mb-2 font-semibold">
                      {prod.subtitle}
                    </div>

                    <p className="text-xs text-[#27484B]/70 leading-relaxed font-light mb-4">
                      {prod.extendedDescription}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-[#27484B]/10">
                      {prod.benefits.slice(0, 3).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#27484B]/80 font-mono">
                          <Check className="w-3 h-3 text-[#8FAEA8] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#27484B]/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => openProductModal(prod)}
                      className="cursor-pointer flex-1 bg-white hover:bg-[#F8F6F1] text-[#27484B] border border-[#27484B]/20 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all"
                    >
                      Formula Specs
                    </button>
                    <button
                      onClick={() => handleAddProductToBag(prod)}
                      className="cursor-pointer flex-1 bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: LUSTROUS TIDAL MAKEUP (WITH INTERACTIVE SHADE STUDIO)
          ========================================================================= */}
      {activeTab === 'lunar-makeup' && (
        <div className="py-12 px-4 md:px-8 lg:px-12 animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                Collection 02 • Optical Radiance
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#27484B] font-normal mb-3">
                Lustrous Tidal Makeup
              </h1>
              <p className="text-sm text-[#27484B]/70 font-light leading-relaxed">
                Breathable, skin-first tinting formulations charged with crushed pearl conchiolin, ocean-marsh salicornia, and non-nano mineral defense.
              </p>
            </div>

            {/* Interactive Shade Studio Feature */}
            <div className="mb-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#27484B]/10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Preview */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#EBE7DF] shadow-inner">
                    <img
                      src={swatchProduct.image}
                      alt={swatchProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/80 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: swatchShade.hex }}
                          />
                          <div>
                            <span className="text-[11px] font-mono text-[#27484B] font-bold block">
                              {swatchShade.name}
                            </span>
                            <span className="text-[9px] font-mono text-[#8FAEA8] uppercase tracking-wider">
                              Optical Hex {swatchShade.hex}
                            </span>
                          </div>
                        </div>
                        <span className="font-serif text-sm font-semibold text-[#27484B]">
                          {formatPrice(swatchProduct.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swatch Controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest font-semibold block mb-1">
                      Interactive Atelier Studio
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#27484B] font-medium">
                      Simulate Ocean Reflective Pigments
                    </h2>
                    <p className="text-xs sm:text-sm text-[#27484B]/70 font-light mt-1">
                      Switch between formulation formulas and audition genuine marine nacre tones.
                    </p>
                  </div>

                  {/* Formulation Selector */}
                  <div>
                    <label className="text-xs font-mono text-[#27484B] uppercase tracking-wider block mb-2 font-semibold">
                      Select Formulation:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {makeupProducts.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSwatchProduct(p);
                            if (p.shades && p.shades.length > 0) {
                              setSwatchShade(p.shades[0]);
                            }
                          }}
                          className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                            swatchProduct.id === p.id
                              ? 'bg-[#27484B] text-[#F8F6F1] border-[#27484B] font-bold'
                              : 'bg-[#F8F6F1] border-[#27484B]/15 text-[#27484B]/70 hover:bg-white'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shade Swatches */}
                  {swatchProduct.shades && swatchProduct.shades.length > 0 && (
                    <div>
                      <label className="text-xs font-mono text-[#27484B] uppercase tracking-wider block mb-2 font-semibold">
                        Select Shade Swatch:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {swatchProduct.shades.map((sh) => (
                          <button
                            key={sh.id}
                            onClick={() => setSwatchShade(sh)}
                            className={`cursor-pointer p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                              swatchShade.id === sh.id
                                ? 'bg-[#27484B]/5 border-[#27484B] ring-1 ring-[#27484B]'
                                : 'bg-[#F8F6F1] border-[#27484B]/10 hover:border-[#27484B]/30'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                              style={{ backgroundColor: sh.hex }}
                            />
                            <span className="text-[11px] font-mono text-[#27484B] truncate font-medium">
                              {sh.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Active Swatch */}
                  <div className="pt-4 border-t border-[#27484B]/10 flex items-center gap-3">
                    <button
                      onClick={() => handleAddProductToBag(swatchProduct, swatchShade)}
                      className="cursor-pointer flex-1 bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#8FAEA8]" />
                      <span>Add Chosen Formulation & Shade • {formatPrice(swatchProduct.price)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Makeup Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {makeupProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-white flex flex-col justify-between group"
                >
                  <div>
                    <div
                      onClick={() => openProductModal(prod)}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE7DF] mb-5 cursor-pointer shadow-inner"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prod.tag && (
                        <span className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full font-mono text-[10px] text-[#27484B] uppercase font-bold tracking-wider shadow-xs">
                          {prod.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3
                        onClick={() => openProductModal(prod)}
                        className="font-serif text-xl text-[#27484B] font-medium hover:text-[#8FAEA8] transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                      <span className="font-serif text-xl font-light text-[#27484B]">
                        {formatPrice(prod.price)}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-wider mb-2 font-semibold">
                      {prod.subtitle}
                    </div>

                    <p className="text-xs text-[#27484B]/70 leading-relaxed font-light mb-4">
                      {prod.description}
                    </p>

                    {/* Shade palette preview */}
                    {prod.shades && (
                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-[#27484B]/60 uppercase tracking-wider block mb-1.5">
                          {prod.shades.length} Optical Marine Shades
                        </span>
                        <div className="flex items-center gap-1.5">
                          {prod.shades.map((s) => (
                            <span
                              key={s.id}
                              style={{ backgroundColor: s.hex }}
                              className="w-4 h-4 rounded-full border border-black/10"
                              title={s.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#27484B]/10 flex items-center gap-2">
                    <button
                      onClick={() => openProductModal(prod)}
                      className="cursor-pointer flex-1 bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
                    >
                      Choose Shade & Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: TIDAL RITUALS (WITH REAL WEB AUDIO SURF & CELADON TIMER)
          ========================================================================= */}
      {activeTab === 'tidal-rituals' && (
        <div className="py-12 px-4 md:px-8 lg:px-12 animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto space-y-12">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                Collection 03 • Sensory Hydro-Therapy
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#27484B] font-normal mb-3">
                Tidal Rituals & Celadon Sculpting
              </h1>
              <p className="text-sm text-[#27484B]/70 font-light leading-relaxed">
                Acupressure meridian release, cold-retaining jade, and ambient ocean acoustic resonance.
              </p>
            </div>

            {/* Interactive Celadon Stone Acupressure Studio */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#27484B]/10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Product & Audio Ambient */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE7DF] mb-4">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHWmr4JP3jBvsGVv_hpMaBqC3sWRtkLh51Z0cWSiLfa35DC1ClsUX6T74pK8mHPkQ76GY0dcWwxTHdAydxT4X5SOPjLq-ggGuoMyw6_jQOgRKimTMhPZ8BplFM74XrvuVUVHKbmOlaMr0jIZ7MHBqAyXo1AxlhFvzUqiBI2AFxRTp9pFZb0cfsi8m7pLzwpMlb5lQWnUjIIWTDfGHz9wvRi-MBD6eZ8H-4IOlOPiwzoihTSF6xW9sn"
                      alt="Celadon Stone"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ocean Audio Player Control */}
                  <div className="p-4 bg-[#F8F6F1] rounded-2xl border border-[#27484B]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8FAEA8]/20 flex items-center justify-center text-[#27484B]">
                        {isAudioPlaying ? (
                          <Volume2 className="w-4 h-4 animate-pulse text-[#27484B]" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-[#27484B]/60" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-[#27484B]">
                          Celtic Tidal Wave Soundscape
                        </div>
                        <div className="text-[10px] font-mono text-[#8FAEA8]">
                          {isAudioPlaying ? 'Playing Live Pink Ocean Waves' : 'Synthesized Ambient Audio'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={toggleOceanAudio}
                      className="cursor-pointer px-4 py-2 rounded-full bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                    >
                      {isAudioPlaying ? 'Mute' : 'Play Ocean'}
                    </button>
                  </div>
                </div>

                {/* Right: Timer & Acupressure Guide */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest font-semibold block mb-1">
                      Guided Lymphatic Drainage
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#27484B] font-medium">
                      Celadon Stone Meridian Ritual
                    </h2>
                    <p className="text-xs sm:text-sm text-[#27484B]/70 font-light mt-1">
                      Natural sea-jade holds sub-ambient cold to de-puff eyelids, sculpt jawlines, and promote micro-circulation.
                    </p>
                  </div>

                  {/* Timer Display */}
                  <div className="p-6 bg-[#27484B] text-[#F8F6F1] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8FAEA8] block">
                        Active Acupressure Timer
                      </span>
                      <div className="font-mono text-3xl font-bold tracking-wider">
                        {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                        {String(timerSeconds % 60).padStart(2, '0')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="cursor-pointer px-5 py-2.5 rounded-full bg-[#8FAEA8] hover:bg-[#a1bfb9] text-[#27484B] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                      >
                        {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{timerRunning ? 'Pause' : 'Start'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSeconds(timerPreset === '3min' ? 180 : timerPreset === '5min' ? 300 : 600);
                        }}
                        className="cursor-pointer p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                        title="Reset Timer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 3 Step Protocol */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { step: '01. Glaze', text: 'Apply 3 drops of Moonlit Nectar Serum across clean face and neck.' },
                      { step: '02. Sculpt', text: 'Glide curved crest along jawline up toward ear lobe with medium pressure.' },
                      { step: '03. Drain', text: 'Use flat scalloped edge gently downwards along lateral neck to collarbone.' },
                    ].map((s) => (
                      <div key={s.step} className="p-3 bg-[#F8F6F1] rounded-xl border border-[#27484B]/10">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#8FAEA8] block mb-1">
                          {s.step}
                        </span>
                        <p className="text-[11px] text-[#27484B]/80 font-light leading-snug">{s.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add stone to bag */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const stone = LUNASEA_PRODUCTS.find((p) => p.id === 'lunar-sculpting-stone');
                        if (stone) handleAddProductToBag(stone);
                      }}
                      className="cursor-pointer w-full bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#8FAEA8]" />
                      <span>Order Hand-Carved Celadon Sculpting Stone • {formatPrice(38)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: ALGAE SCIENCE & INCI GLOSSARY
          ========================================================================= */}
      {activeTab === 'algae-science' && (
        <div className="py-12 px-4 md:px-8 lg:px-12 animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto space-y-12">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                Scientific Dossier & Bio-Fermentation
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#27484B] font-normal mb-3">
                Living Algae Science
              </h1>
              <p className="text-sm text-[#27484B]/70 font-light leading-relaxed">
                From low-moon tidal diving to 21-day microbial fermentation, discover the biotechnology powering LunaSea.
              </p>
            </div>

            {/* 4 Extraction Phases */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  phase: 'Phase 01',
                  title: 'Tidal Low-Moon Harvesting',
                  loc: 'Brittany & Hebrides Sanctuaries',
                  desc: 'Certified scientific divers hand-cut living Laminaria Digitata during peak lunar spring tides when polyphenol density reaches its seasonal crest.',
                  stat: 'Zero floor scraping • 100% regrowth',
                },
                {
                  phase: 'Phase 02',
                  title: 'Sub-Zero Enzymatic Cold Press',
                  loc: 'Zero Thermal Degradation',
                  desc: 'Harvested kelp is processed within 4 hours using cryogenic pressure. Unlike boiled industrial extracts, cold enzymatic pressing preserves heat-sensitive amino chains.',
                  stat: '4°C processing threshold • 0% denatured',
                },
                {
                  phase: 'Phase 03',
                  title: 'Living Bio-Fermentation Matrix',
                  loc: 'Microbial Symbiosis with Marine Glycogen',
                  desc: 'Kelp juices ferment alongside deep oceanic phytoplankton cultures for 21 days, breaking down giant molecules into micro-bio-available peptides.',
                  stat: '21-day lunar cycle ferment • 99.4% uptake',
                },
                {
                  phase: 'Phase 04',
                  title: 'Waterless Cellular Base',
                  loc: 'Pure Living Mineral Electrolytes',
                  desc: 'Instead of filling formulas with inert tap or deionized water, LunaSea bases consist entirely of active living kelp cellular water loaded with trace minerals.',
                  stat: '0% filler water • 100% active liquid',
                },
              ].map((p) => (
                <div
                  key={p.phase}
                  className="bg-white p-6 rounded-3xl shadow-xs border border-white flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#8FAEA8] block mb-1">
                      {p.phase}
                    </span>
                    <h3 className="font-serif text-lg text-[#27484B] font-medium mb-1">{p.title}</h3>
                    <div className="font-mono text-[10px] text-[#27484B]/60 uppercase tracking-wide mb-3">
                      {p.loc}
                    </div>
                    <p className="text-xs text-[#27484B]/70 leading-relaxed font-light mb-4">{p.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#27484B]/10 font-mono text-[10px] text-[#8FAEA8] font-semibold">
                    {p.stat}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive INCI Ingredient Glossary */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#27484B]/10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest font-semibold block mb-1">
                    Transparent INCI Matrix
                  </span>
                  <h2 className="font-serif text-2xl text-[#27484B] font-medium">
                    Active Coastal Bio-Ingredient Index
                  </h2>
                </div>

                <div className="relative min-w-[280px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#27484B]/40" />
                  <input
                    type="text"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    placeholder="Search INCI, origin, or benefit..."
                    className="w-full bg-[#F8F6F1] text-xs font-mono pl-9 pr-4 py-2.5 rounded-full border border-[#27484B]/15 focus:outline-none focus:border-[#27484B]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#27484B]/15 text-[#8FAEA8] uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 font-semibold">INCI Active Name</th>
                      <th className="py-3 px-4 font-semibold">Geographic Origin</th>
                      <th className="py-3 px-4 font-semibold">Cutaneous Role</th>
                      <th className="py-3 px-4 font-semibold">Formulations Infused</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27484B]/5">
                    {filteredIngredients.map((item, i) => (
                      <tr key={i} className="hover:bg-[#F8F6F1]/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-[#27484B]">{item.inci}</td>
                        <td className="py-3 px-4 text-[#27484B]/70">{item.origin}</td>
                        <td className="py-3 px-4 text-[#27484B]/80 font-sans text-xs">{item.function}</td>
                        <td className="py-3 px-4 text-[#8FAEA8] font-sans text-xs">{item.products}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: ABOUT & HARVEST
          ========================================================================= */}
      {activeTab === 'about-us' && (
        <div className="py-12 px-4 md:px-8 lg:px-12 animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest block mb-2 font-semibold">
                Our Genesis & Ethical Marine Pact
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#27484B] font-normal mb-3">
                Born in Brittany Tides
              </h1>
              <p className="text-sm text-[#27484B]/70 font-light leading-relaxed">
                Founded by marine biotechnologists and botanical dermatologists dedicated to harnessing ocean resilience without disrupting aquatic ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-12 rounded-3xl border border-[#27484B]/10 shadow-sm">
              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-[11px] text-[#8FAEA8] uppercase tracking-widest font-semibold block">
                  The Sustainable Harvest Manifesto
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#27484B] font-medium leading-tight">
                  Regenerative Oceans. Zero Ocean Floor Scraping.
                </h2>
                <p className="text-xs sm:text-sm text-[#27484B]/80 leading-relaxed font-light">
                  Industrial kelp harvesting frequently relies on heavy trawlers that tear kelp holdfasts directly from the ocean floor, destroying fragile marine habitats. LunaSea works exclusively with certified artisan free-divers who prune only the upper fronds above the meristem, ensuring complete regenerative regrowth within 60 days.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#27484B]/10">
                    <span className="font-bold text-[#27484B] block text-sm">1% for the Oceans</span>
                    <span className="text-[#27484B]/70">Annual revenue committed directly to Brittany reef restoration.</span>
                  </div>
                  <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#27484B]/10">
                    <span className="font-bold text-[#27484B] block text-sm">Opal Glass Refill</span>
                    <span className="text-[#27484B]/70">Send back 3 empty vessels to receive a complimentary formulation refill.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBE7DF] shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAnXYUVXH-y9zP7DAgILLPe6BpGl2MtKAx__4yIyh5fmtU-OJIkRwIYYx5EsryXQHijganGZx1LzkHdSwwDFk4t75tIqh4Dw9Fe393k4YlEeSCRWX_mttvKzORbhTnh-8Jg_ee0SvE-yKOZJUDyU6qqRkdieX-e7GMSVfS3k3XGVOptSeOi4wZwgWSW1cLWtOO9qLLred9MQys5hm5licg8tLsrr6IUNSatGNUAUPfu70tWr44LIrf"
                    alt="Harvesting Kelp"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRODUCT DETAIL MODAL
          ========================================================================= */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-[#F8F6F1] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white max-h-[90vh] flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProductModal(null)}
              className="cursor-pointer absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#27484B] flex items-center justify-center shadow-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Image Column */}
            <div className="md:w-1/2 relative bg-[#EBE7DF] aspect-square md:aspect-auto">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-[#27484B] tracking-wider font-semibold shadow-xs">
                {selectedProductModal.batchInfo || 'Batch #L-894 Fresh Harvest'}
              </div>
            </div>

            {/* Right Details Column */}
            <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-4">
              <div>
                <span className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-widest font-semibold block mb-1">
                  {selectedProductModal.category.replace('-', ' ')}
                </span>
                <h3 className="font-serif text-2xl text-[#27484B] font-medium leading-snug">
                  {selectedProductModal.name}
                </h3>
                <div className="flex items-center justify-between my-2">
                  <span className="font-serif text-2xl text-[#27484B] font-normal">
                    {formatPrice(selectedProductModal.price)}
                  </span>
                  <span className="font-mono text-xs text-[#8FAEA8] uppercase">
                    {selectedProductModal.volume}
                  </span>
                </div>

                <p className="text-xs text-[#27484B]/80 leading-relaxed font-light my-3">
                  {selectedProductModal.extendedDescription || selectedProductModal.description}
                </p>

                {/* Shades if available */}
                {selectedProductModal.shades && selectedProductModal.shades.length > 0 && (
                  <div className="my-3">
                    <label className="text-xs font-mono text-[#27484B] uppercase tracking-wider block mb-1.5 font-semibold">
                      Select Shade: {modalSelectedShade?.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProductModal.shades.map((sh) => (
                        <button
                          key={sh.id}
                          onClick={() => setModalSelectedShade(sh)}
                          title={sh.name}
                          style={{ backgroundColor: sh.hex }}
                          className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform ${
                            modalSelectedShade?.id === sh.id ? 'ring-2 ring-[#27484B] scale-110' : 'ring-1 ring-black/15'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Actives */}
                {selectedProductModal.keyActives && (
                  <div className="space-y-1.5 pt-3 border-t border-[#27484B]/10">
                    <span className="text-[10px] font-mono text-[#8FAEA8] uppercase tracking-wider block font-semibold">
                      Marine Bio-Actives:
                    </span>
                    {selectedProductModal.keyActives.map((a, i) => (
                      <div key={i} className="text-[11px] font-mono text-[#27484B]/80">
                        <span className="font-semibold text-[#27484B]">• {a.name}</span> ({a.origin}):{' '}
                        <span className="font-light">{a.role}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add to bag footer */}
              <div className="pt-4 border-t border-[#27484B]/10 flex items-center gap-3">
                <div className="flex items-center border border-[#27484B]/20 rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="cursor-pointer px-2 text-sm font-bold text-[#27484B]"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs px-2 font-semibold">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="cursor-pointer px-2 text-sm font-bold text-[#27484B]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddProductToBag(selectedProductModal, modalSelectedShade, modalQuantity);
                    setSelectedProductModal(null);
                  }}
                  className="cursor-pointer flex-1 bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
                >
                  Add to Bag • {formatPrice(selectedProductModal.price * modalQuantity)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          WRITE REVIEW MODAL
          ========================================================================= */}
      {isWritingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white relative space-y-4 font-sans">
            <button
              onClick={() => setIsWritingReview(false)}
              className="cursor-pointer absolute top-4 right-4 text-[#27484B]/60 hover:text-[#27484B]"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-mono text-[10px] text-[#8FAEA8] uppercase tracking-widest font-semibold block mb-1">
                Atelier Feedback
              </span>
              <h3 className="font-serif text-2xl text-[#27484B] font-medium">Submit Your Experience</h3>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#27484B] block mb-1 font-semibold">
                Your Name & Location
              </label>
              <input
                type="text"
                placeholder="e.g. Vivienne L., Zurich"
                value={newReviewAuthor}
                onChange={(e) => setNewReviewAuthor(e.target.value)}
                className="w-full bg-[#F8F6F1] text-xs font-mono p-3 rounded-xl border border-[#27484B]/15 focus:outline-none focus:border-[#27484B]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#27484B] block mb-1 font-semibold">
                Formulation Evaluated
              </label>
              <select
                value={newReviewProduct}
                onChange={(e) => setNewReviewProduct(e.target.value)}
                className="w-full bg-[#F8F6F1] text-xs font-mono p-3 rounded-xl border border-[#27484B]/15 focus:outline-none focus:border-[#27484B]"
              >
                {LUNASEA_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#27484B] block mb-1 font-semibold">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNewReviewRating(num)}
                    className="cursor-pointer text-[#8FAEA8]"
                  >
                    <Star
                      className={`w-6 h-6 ${num <= newReviewRating ? 'fill-[#8FAEA8]' : 'text-stone-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#27484B] block mb-1 font-semibold">
                Your Commentary
              </label>
              <textarea
                rows={3}
                placeholder="Describe texture, hydration, scent, and sensory results..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full bg-[#F8F6F1] text-xs font-mono p-3 rounded-xl border border-[#27484B]/15 focus:outline-none focus:border-[#27484B]"
              />
            </div>

            <button
              onClick={() => {
                if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
                const newRev: LunaSeaReview = {
                  id: `r-${Date.now()}`,
                  author: newReviewAuthor.split(',')[0] || 'Atelier Patron',
                  location: newReviewAuthor.split(',')[1] || 'Global',
                  rating: newReviewRating,
                  date: 'Just now',
                  title: 'Sensory Transformation',
                  comment: newReviewComment,
                  verified: true,
                  productName: newReviewProduct,
                };
                setReviewsList([newRev, ...reviewsList]);
                setIsWritingReview(false);
                setNewReviewAuthor('');
                setNewReviewComment('');
                triggerToast('Review Submitted', 'Thank you for documenting your ritual');
              }}
              className="cursor-pointer w-full bg-[#27484B] hover:bg-[#1a3234] text-[#F8F6F1] py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
            >
              Post Verification Review
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#27484B] text-[#F8F6F1] py-12 px-4 md:px-8 lg:px-12 border-t border-white/10 mt-16 font-mono text-xs">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={LUNASEA_LOGO_URL}
              alt="LunaSea"
              className="h-8 w-auto object-contain rounded"
            />
            <div>
              <span className="font-serif text-lg tracking-tight font-medium text-white block">LunaSea</span>
              <span className="text-[10px] text-[#8FAEA8]">Marine Biotechnology & Bio-Pearl Peptides</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#8FAEA8]">
            <a
              href="/cosmetics?brand=lunasea&tab=skincare"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleTabSelect('skincare');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Skincare
            </a>
            <a
              href="/cosmetics?brand=lunasea&tab=lunar-makeup"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleTabSelect('lunar-makeup');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Lustrous Makeup
            </a>
            <a
              href="/cosmetics?brand=lunasea&tab=tidal-rituals"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleTabSelect('tidal-rituals');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tidal Rituals
            </a>
            <a
              href="/cosmetics?brand=lunasea&tab=algae-science"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleTabSelect('algae-science');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Algae Science
            </a>
            <a
              href="/cosmetics?brand=lunasea&tab=about-us"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleTabSelect('about-us');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Brittany Harvest
            </a>
          </div>

          <div className="text-[10px] text-white/40">
            © 2027 LunaSea Marine Cosmetics • Brittany UNESCO Biosphere
          </div>
        </div>
      </footer>
    </div>
  );
};
