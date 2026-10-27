import React, { useState } from 'react';
import { ScreenType, CurrencyType, BagItem, Product } from '../types';
import { PRODUCT_DETAIL_TRENCH, CURRENCY_RATES } from '../data/mockData';

interface ProductDetailScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currency: CurrencyType;
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
  onOpenSizeGuide: () => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  onNavigate,
  currency,
  onAddToCart,
  onOpenSizeGuide,
  onAddToWishlist,
  wishlist,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DETAIL_TRENCH.colors[0].name);
  const [selectedSize, setSelectedSize] = useState('M');
  const [openAccordion, setOpenAccordion] = useState<string | null>('craft');
  const [isAddedToast, setIsAddedToast] = useState(false);

  const formatPrice = (amount: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(amount * rate).toLocaleString()}`;
  };

  const handleAddTrench = () => {
    onAddToCart({
      productId: 'prod-trench-01',
      title: PRODUCT_DETAIL_TRENCH.title,
      price: PRODUCT_DETAIL_TRENCH.price,
      size: selectedSize,
      color: selectedColor,
      image: PRODUCT_DETAIL_TRENCH.gallery[activeImageIndex].src,
      quantity: 1,
    });

    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 3000);
  };

  const handleAddCompleteEnsemble = () => {
    // Add Trench
    onAddToCart({
      productId: 'prod-trench-01',
      title: PRODUCT_DETAIL_TRENCH.title,
      price: PRODUCT_DETAIL_TRENCH.price,
      size: selectedSize,
      color: selectedColor,
      image: PRODUCT_DETAIL_TRENCH.gallery[0].src,
      quantity: 1,
    });

    // Add Bundle items
    PRODUCT_DETAIL_TRENCH.silhouetteBundle.forEach((item: { title: string; price: number; image: string }, idx: number) => {
      onAddToCart({
        productId: `bundle-item-${idx}`,
        title: item.title,
        price: item.price,
        size: 'M',
        color: 'Runway Edition',
        image: item.image,
        quantity: 1,
      });
    });

    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 3500);
  };

  const mockProductForWishlist: Product = {
    id: 'prod-trench-01',
    name: PRODUCT_DETAIL_TRENCH.title,
    category: 'OUTERWEAR / RUNWAY LOOK 07',
    lookNumber: '07',
    price: PRODUCT_DETAIL_TRENCH.price,
    hue: 'cobalt',
    hueName: 'YVES COBALT',
    hueHex: '#004ac6',
    material: 'scuba',
    materialProvenance: 'Como Double-Bonded Technical Scuba Wool',
    silhouette: 'outerwear',
    description: PRODUCT_DETAIL_TRENCH.description,
    image: PRODUCT_DETAIL_TRENCH.gallery[0].src,
    alt: PRODUCT_DETAIL_TRENCH.gallery[0].alt,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colorOptions: PRODUCT_DETAIL_TRENCH.colors.map((c: { name: string; hex: string }) => ({ name: c.name, hex: c.hex })),
  };

  const isWishlisted = wishlist.some((item) => item.id === mockProductForWishlist.id);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-[#fcf8fb] text-[#1c1b1d] min-h-screen">
      {/* Toast Notification */}
      {isAddedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#1c1b1d] text-white px-5 py-3.5 border border-[#acf847] shadow-2xl flex items-center gap-3 font-mono text-xs animate-bounce">
          <span className="material-symbols-outlined text-[#acf847] text-lg">check_circle</span>
          <span>PIECE COMMUNICATED TO YOUR ATELIER BAG</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-stone-500 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('runway-ss25')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            SF &amp; LA, CA SS27
          </button>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Runway Look 07</span>
          <span>/</span>
          <span className="text-[#004ac6] font-semibold">Chromatic Scuba Trench</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Multi-Angle Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Angle Thumbnails */}
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
              {PRODUCT_DETAIL_TRENCH.gallery.map((img: { label: string; src: string; alt: string }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`cursor-pointer w-20 h-28 relative border-2 transition-all overflow-hidden shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#004ac6] shadow-md scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute bottom-1 inset-x-1 bg-black/70 text-white text-[8px] font-mono uppercase tracking-wider text-center py-0.5">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Large Active Viewport */}
            <div className="flex-1 relative aspect-[3/4] bg-stone-100 border border-[#e5e1e4] overflow-hidden group">
              <img
                src={PRODUCT_DETAIL_TRENCH.gallery[activeImageIndex].src}
                alt={PRODUCT_DETAIL_TRENCH.gallery[activeImageIndex].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Angle watermark */}
              <div className="absolute top-4 left-4 bg-[#1c1b1d]/85 text-[#acf847] px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase">
                ANGLE // {PRODUCT_DETAIL_TRENCH.gallery[activeImageIndex].label}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-stone-800 px-3 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm">zoom_in</span>
                <span>High Chroma Optical Zoom</span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Specs, Sizing & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                <span className="text-[#004ac6] font-bold">SF &amp; LA, CA RUNWAY LOOK 07 (2027)</span>
                <span className="bg-[#fd761a]/15 text-[#9d4300] px-2 py-0.5 rounded text-[10px] font-semibold">
                  Low Archival Allocation
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal leading-tight">
                {PRODUCT_DETAIL_TRENCH.title}
              </h1>

              {/* Price & Klarna */}
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-mono text-3xl font-bold text-stone-950">
                  {formatPrice(PRODUCT_DETAIL_TRENCH.price)}
                </span>
                <span className="text-stone-500 font-mono text-xs">TAX & DUTIES INCLUDED</span>
              </div>
              <p className="text-stone-500 font-mono text-xs mt-1">
                Or 4 interest-free installments of{' '}
                <span className="text-stone-800 font-semibold">
                  {formatPrice(PRODUCT_DETAIL_TRENCH.price / 4)}
                </span>{' '}
                with Klarna / Afterpay.
              </p>
            </div>

            <p className="text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-200 pt-4">
              {PRODUCT_DETAIL_TRENCH.description}
            </p>

            {/* Color Swatch Selection */}
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-500 uppercase">SELECTED CHROMATIC HUE:</span>
                <span className="text-stone-950 font-bold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                {PRODUCT_DETAIL_TRENCH.colors.map((c: { name: string; hex: string }) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`cursor-pointer w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === c.name
                        ? 'border-stone-900 ring-2 ring-offset-2 ring-stone-900 scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-stone-500 uppercase">SIZE (SF &amp; LA, CA STANDARDS):</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="cursor-pointer text-[#004ac6] hover:underline uppercase tracking-wider text-[11px] flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">straighten</span>
                  <span>Dimensional Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {PRODUCT_DETAIL_TRENCH.sizes.map((s: { code: string; available?: boolean; lowStock?: boolean }) => (
                  <button
                    key={s.code}
                    onClick={() => setSelectedSize(s.code)}
                    className={`cursor-pointer py-3 text-center border font-mono text-xs uppercase tracking-wider transition-all relative ${
                      selectedSize === s.code
                        ? 'border-[#1c1b1d] bg-[#1c1b1d] text-white font-bold shadow-sm'
                        : 'border-[#e5e1e4] bg-white text-stone-800 hover:border-stone-900'
                    }`}
                  >
                    <span>{s.code}</span>
                    {s.lowStock && (
                      <span className="absolute -top-2 right-1 bg-[#fd761a] text-white text-[8px] px-1 font-mono uppercase rounded-xs">
                        Only 2
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddTrench}
                className="cursor-pointer w-full bg-[#1c1b1d] hover:bg-[#004ac6] text-white py-4 px-6 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span>
                <span>Add {PRODUCT_DETAIL_TRENCH.title} To Bag</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => onAddToWishlist(mockProductForWishlist)}
                  className={`cursor-pointer flex-1 py-3 px-4 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted
                      ? 'border-[#fd761a] bg-[#fd761a]/10 text-[#fd761a] font-bold'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add To Wishlist'}</span>
                </button>

                <button
                  onClick={() => onNavigate('runway-ss25')}
                  className="cursor-pointer py-3 px-4 border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5"
                  title="View on SF & LA, CA 2027 Runway"
                >
                  <span className="material-symbols-outlined text-sm">theater_comedy</span>
                  <span>Runway</span>
                </button>
              </div>
            </div>

            {/* 4 Value Props */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-[11px] font-mono text-stone-600">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#004ac6]">
                  local_shipping
                </span>
                <span>Complimentary Express Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#acf847]">science</span>
                <span>SF &amp; LA Mineral Dyeing Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#fd761a]">sync</span>
                <span>14-Day Archival Exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-stone-800">handyman</span>
                <span>Lifetime Seam Restoration</span>
              </div>
            </div>

            {/* Interactive Accordions */}
            <div className="border-t border-stone-200 pt-4 divide-y divide-stone-200 text-xs">
              {/* Accordion 1 */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full flex justify-between items-center text-left font-mono uppercase tracking-wider font-semibold text-stone-900"
                >
                  <span>Material & Craftsmanship</span>
                  <span className="material-symbols-outlined text-sm">
                    {openAccordion === 'craft' ? 'remove' : 'add'}
                  </span>
                </button>
                {openAccordion === 'craft' && (
                  <div className="pt-3 text-stone-600 space-y-2 font-sans leading-relaxed">
                    <p>
                      Crafted from 480gsm double-bonded technical scuba wool sourced from Northern
                      California. The fabric undergoes a cold-cure calendering process in our SF &amp; LA, CA laboratories to impart extreme
                      wind resistance while maintaining liquid kinetic drape.
                    </p>
                    <ul className="list-disc pl-5 font-mono text-[11px] space-y-1 text-stone-500">
                      <li>Shell: 85% Merino Wool, 15% Technical Elastomeric Polymer</li>
                      <li>Bonding: Breathable zero-petroleum hydrophilic membrane</li>
                      <li>Hardware: Hand-brushed raw titanium double-shank snaps</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex justify-between items-center text-left font-mono uppercase tracking-wider font-semibold text-stone-900"
                >
                  <span>Silhouette Architecture & Fit</span>
                  <span className="material-symbols-outlined text-sm">
                    {openAccordion === 'fit' ? 'remove' : 'add'}
                  </span>
                </button>
                {openAccordion === 'fit' && (
                  <div className="pt-3 text-stone-600 space-y-2 font-sans leading-relaxed">
                    <p>
                      Engineered with an exaggerated architectural drop-shoulder and monolithic stand
                      collar. Designed to be worn loose or cinched using the internal magnetic
                      harness. Fits true to runway proportions; for a closer tailored fit, select one
                      size down.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex justify-between items-center text-left font-mono uppercase tracking-wider font-semibold text-stone-900"
                >
                  <span>Spectral Care & Preservation</span>
                  <span className="material-symbols-outlined text-sm">
                    {openAccordion === 'care' ? 'remove' : 'add'}
                  </span>
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-3 text-stone-600 space-y-2 font-sans leading-relaxed">
                    <p>
                      To preserve the pure optical frequency of the Yves Cobalt pigment, dry clean
                      only with eco-fluorocarbon solvents. Store inside the included breathable
                      cotton-gauze archival garment bag away from direct ultraviolet radiation.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4 */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex justify-between items-center text-left font-mono uppercase tracking-wider font-semibold text-stone-900"
                >
                  <span>Atelier Shipping & Delivery</span>
                  <span className="material-symbols-outlined text-sm">
                    {openAccordion === 'delivery' ? 'remove' : 'add'}
                  </span>
                </button>
                {openAccordion === 'delivery' && (
                  <div className="pt-3 text-stone-600 space-y-2 font-sans leading-relaxed">
                    <p>
                      Dispatched from our San Francisco &amp; Los Angeles, CA ateliers via carbon-neutral express
                      courier within 24 hours. Includes custom embossed cedar archival hanger and
                      numbered 2027 certificate of authenticity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete The Runway Silhouette Ensemble Card */}
      <section className="bg-stone-900 text-white py-20 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
                // ATELIER RUNWAY STYLING • 2027
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-2">
                Complete The Runway Silhouette
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2">
                As styled by creative director Lucile Bernard for the SF &amp; LA, CA SS27 runway
                presentation.
              </p>
            </div>

            <div className="mt-6 md:mt-0 bg-stone-950 p-4 border border-stone-800 flex items-center gap-6">
              <div>
                <span className="text-[10px] font-mono text-stone-500 uppercase block">
                  ENSEMBLE TOTAL (4 PIECES)
                </span>
                <span className="text-xl font-bold font-mono text-white mt-0.5 block">
                  {formatPrice(2810)}
                </span>
              </div>
              <button
                onClick={handleAddCompleteEnsemble}
                className="cursor-pointer bg-[#acf847] hover:bg-[#9de437] text-stone-950 px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md"
              >
                Add Complete Ensemble (-10%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCT_DETAIL_TRENCH.silhouetteBundle.map((item: { title: string; category: string; specs: string; price: number; image: string; tag: string }, idx: number) => (
              <div
                key={idx}
                className="bg-stone-950 border border-stone-800 p-5 flex flex-col justify-between group hover:border-[#004ac6] transition-colors"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#1c1b1d]/90 text-[#acf847] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-stone-500 uppercase block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-light text-white mt-1 group-hover:text-[#acf847] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-400 font-sans mt-1.5 line-clamp-2">
                    {item.specs}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white">{formatPrice(item.price)}</span>
                  <button
                    onClick={() => {
                      onAddToCart({
                        productId: `bundle-item-${idx}`,
                        title: item.title,
                        price: item.price,
                        size: 'M',
                        color: 'Runway Edition',
                        image: item.image,
                        quantity: 1,
                      });
                      setIsAddedToast(true);
                      setTimeout(() => setIsAddedToast(false), 3000);
                    }}
                    className="cursor-pointer text-[10px] uppercase tracking-wider text-[#acf847] hover:underline"
                  >
                    + Add Piece
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
