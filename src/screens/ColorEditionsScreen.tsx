import React, { useState, useMemo } from 'react';
import { ScreenType, CurrencyType, Product } from '../types';
import { COLOR_EDITIONS_PRODUCTS, CURRENCY_RATES } from '../data/mockData';

interface ColorEditionsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currency: CurrencyType;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
}

export const ColorEditionsScreen: React.FC<ColorEditionsScreenProps> = ({
  onNavigate,
  currency,
  onQuickView,
  onAddToWishlist,
  wishlist,
}) => {
  const [selectedHueFamily, setSelectedHueFamily] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('archival');
  const [wavelengthSlider, setWavelengthSlider] = useState<number>(560);

  const formatPrice = (amount: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(amount * rate).toLocaleString()}`;
  };

  const filteredProducts = useMemo(() => {
    let list = [...COLOR_EDITIONS_PRODUCTS];

    if (selectedHueFamily !== 'all') {
      list = list.filter((p) => p.hue === selectedHueFamily);
    }

    if (selectedMaterial !== 'all') {
      list = list.filter((p) => p.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    }

    if (selectedSilhouette !== 'all') {
      list = list.filter((p) => p.silhouette === selectedSilhouette);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedHueFamily, selectedMaterial, selectedSilhouette, sortBy]);

  const hueNav = [
    { id: 'all', label: 'All Frequencies (32)', count: 32 },
    { id: 'cobalt', label: 'Cobalt (440nm)', hex: '#004ac6', count: 8 },
    { id: 'lime', label: 'Citron Lime (560nm)', hex: '#acf847', count: 7 },
    { id: 'tangerine', label: 'Tangerine (610nm)', hex: '#fd761a', count: 6 },
    { id: 'monochrome', label: 'Noir Carbon', hex: '#1c1b1d', count: 7 },
    { id: 'magenta', label: 'Magenta (680nm)', hex: '#d91b5c', count: 4 },
  ];

  return (
    <div className="bg-[#fcf8fb] text-[#1c1b1d]">
      {/* Spectral Frequency Strip */}
      <div className="w-full h-2.5 bg-gradient-to-r from-[#4916a4] via-[#004ac6] via-[#acf847] via-[#fd761a] to-[#d91b5c] relative">
        <div
          className="absolute -top-1 w-3.5 h-4.5 bg-[#1c1b1d] border-2 border-white rounded-xs shadow transform -translate-x-1/2 transition-all"
          style={{
            left: `${((wavelengthSlider - 410) / (720 - 410)) * 100}%`,
          }}
          title={`Active frequency: ${wavelengthSlider}nm`}
        />
      </div>

      {/* Hero Header */}
      <section className="pt-16 pb-12 border-b border-[#e5e1e4] bg-[#fcf8fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
                // THE PIGMENT REPOSITORY • SS27 — SF &amp; LA, CA
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 mt-2 tracking-tight">
                The Spectrum Archive
              </h1>
              <p className="font-sans text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
                6 curated archival silhouettes mapped against specific nanometer frequencies. Every
                tone is formulated without petroleum dyes using pure biological and mineral
                precipitation in San Francisco and Los Angeles, CA.
              </p>
            </div>

            <div className="bg-white p-4 border border-[#e5e1e4] rounded-sm flex items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">LAB STATUS</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Extraction
                </span>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <span className="text-[10px] text-stone-400 block uppercase">CURRENT BAND</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{wavelengthSlider} nm</span>
              </div>
            </div>
          </div>

          {/* Hue Filter Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-10 pb-2">
            {hueNav.map((hue) => {
              const active = selectedHueFamily === hue.id;
              return (
                <button
                  key={hue.id}
                  onClick={() => setSelectedHueFamily(hue.id)}
                  className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                    active
                      ? 'bg-[#1c1b1d] text-white border-[#1c1b1d] shadow-sm font-semibold'
                      : 'bg-white text-stone-700 border-[#e5e1e4] hover:border-stone-900'
                  }`}
                >
                  {hue.hex && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: hue.hex }}
                    />
                  )}
                  <span>{hue.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Controls & Filters Bar */}
      <section className="sticky top-20 z-30 bg-[#fcf8fb]/95 backdrop-blur-md border-b border-[#e5e1e4] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Wavelength Frequency Slider */}
            <div className="md:col-span-5 flex items-center gap-3 bg-white px-3 py-2 border border-[#e5e1e4] rounded-sm">
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase whitespace-nowrap">
                SPECTRAL: {wavelengthSlider}nm
              </span>
              <input
                type="range"
                min="410"
                max="720"
                step="5"
                value={wavelengthSlider}
                onChange={(e) => setWavelengthSlider(Number(e.target.value))}
                className="w-full accent-[#004ac6] cursor-pointer"
              />
              <span className="text-[10px] font-mono text-stone-400">720nm</span>
            </div>

            {/* Dropdown Filters */}
            <div className="md:col-span-7 flex flex-wrap items-center justify-end gap-3 text-xs font-mono">
              {/* Silhouette Dropdown */}
              <select
                value={selectedSilhouette}
                onChange={(e) => setSelectedSilhouette(e.target.value)}
                className="bg-white border border-[#e5e1e4] px-3 py-2 uppercase tracking-wider text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="all">ALL SILHOUETTES</option>
                <option value="outerwear">OUTERWEAR</option>
                <option value="dresses">DRESSES & GOWNS</option>
                <option value="tailoring">TAILORING & SUITING</option>
                <option value="knitwear">KNITWEAR</option>
              </select>

              {/* Material Dropdown */}
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-white border border-[#e5e1e4] px-3 py-2 uppercase tracking-wider text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="all">ALL MATERIALS</option>
                <option value="silk">MULBERRY RAW SILK</option>
                <option value="cashmere">PLATEAU CASHMERE</option>
                <option value="scuba">TECHNICAL SCUBA WOOL</option>
                <option value="gabardine">VENETIAN GABARDINE</option>
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#e5e1e4] px-3 py-2 uppercase tracking-wider text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="archival">SORT: ARCHIVAL ORDER</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="name">ALPHABETICAL</option>
              </select>

              {(selectedHueFamily !== 'all' ||
                selectedMaterial !== 'all' ||
                selectedSilhouette !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedHueFamily('all');
                    setSelectedMaterial('all');
                    setSelectedSilhouette('all');
                  }}
                  className="cursor-pointer text-[10px] text-red-600 hover:underline uppercase tracking-wider px-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Archive Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-stone-200 p-8">
            <span className="material-symbols-outlined text-4xl text-stone-400">tune</span>
            <h3 className="font-serif text-2xl mt-2 text-stone-900">No Editions Matching Filter</h3>
            <p className="text-stone-500 font-mono text-xs mt-2">
              Try resetting your material or silhouette criteria to view archival stock.
            </p>
            <button
              onClick={() => {
                setSelectedHueFamily('all');
                setSelectedMaterial('all');
                setSelectedSilhouette('all');
              }}
              className="mt-6 cursor-pointer bg-[#1c1b1d] text-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-[#e5e1e4] hover:border-stone-900 transition-all duration-300 flex flex-col hover:shadow-2xl"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.badges?.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider font-semibold ${b.bgClass} ${b.textClass}`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist(product);
                      }}
                      className={`cursor-pointer absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted
                          ? 'bg-[#fd761a] text-white'
                          : 'bg-white/80 hover:bg-white text-stone-800'
                      }`}
                      title={isWishlisted ? 'Saved in Wishlist' : 'Save to Archival Wishlist'}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {isWishlisted ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    {/* Quick View Drawer Trigger */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="cursor-pointer flex-1 bg-white hover:bg-[#acf847] text-stone-950 py-2.5 text-[11px] font-mono uppercase tracking-widest font-bold transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>Quick View & Bag</span>
                      </button>
                      <button
                        onClick={() => onNavigate('product-detail')}
                        className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider transition-colors"
                        title="View Full PDP"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Hue & Provenance Header */}
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: product.hueHex }}
                          />
                          <span className="text-stone-600 font-semibold">{product.hueName}</span>
                        </div>
                        <span className="text-stone-400">{product.category}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onNavigate('product-detail')}
                        className="font-serif text-xl font-normal text-stone-900 group-hover:text-[#004ac6] transition-colors cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Material info */}
                      <p className="text-xs text-stone-500 font-sans mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Swatches and Pricing */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      {/* Swatches */}
                      <div className="flex items-center gap-1.5">
                        {product.colorOptions.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className={`w-3.5 h-3.5 rounded-full border border-stone-300 ${
                              c.borderRingClass || ''
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-stone-900">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Atelier Lab Report & Zero-Discharge Guarantee Block */}
      <section className="bg-stone-900 text-white py-20 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#acf847] uppercase font-bold">
                // ZERO DISCHARGE PROTOCOL • 2027
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                SF &amp; LA, CA Biological Dye Certification
              </h2>
              <p className="text-stone-400 text-sm font-sans leading-relaxed">
                Unlike industrial fast fashion, our color formulations never release petroleum
                effluents into waterways. Our mineral precipitates are harvested using closed-loop
                distillation in San Francisco and Los Angeles, CA, returning 99.2% purified water
                back to California coastal watersheds.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                <div className="border border-stone-800 p-4 bg-stone-950">
                  <span className="text-stone-500 text-[10px] block uppercase">
                    WATER PURITY RETURN
                  </span>
                  <span className="text-2xl font-bold text-[#acf847] mt-1 block">99.2%</span>
                  <span className="text-stone-400 text-[10px]">Closed-loop recycling</span>
                </div>
                <div className="border border-stone-800 p-4 bg-stone-950">
                  <span className="text-stone-500 text-[10px] block uppercase">
                    HEAVY METAL TRACE
                  </span>
                  <span className="text-2xl font-bold text-white mt-1 block">0.00%</span>
                  <span className="text-stone-400 text-[10px]">100% Bio-mineral base</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-stone-950 border border-stone-800 p-8 rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs font-mono">
                <span className="text-stone-400 uppercase">SPECTRAL LAB REPORT #4802</span>
                <span className="text-[#acf847] uppercase">VERIFIED CERTIFICATE</span>
              </div>

              {/* Spectral Bars */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-stone-400 mb-1">
                    <span>COBALT SATURATION INDEX</span>
                    <span className="text-[#004ac6] font-bold">99.8%</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#004ac6] h-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-400 mb-1">
                    <span>CITRON RETINAL LUMINANCE</span>
                    <span className="text-[#acf847] font-bold">97.4%</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#acf847] h-full" style={{ width: '97.4%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-400 mb-1">
                    <span>SOLAR TANGERINE REFLECTION</span>
                    <span className="text-[#fd761a] font-bold">96.1%</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#fd761a] h-full" style={{ width: '96.1%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => onNavigate('runway-ss25')}
                  className="cursor-pointer text-xs font-mono text-[#acf847] hover:underline uppercase tracking-wider"
                >
                  See How Colors Move on the Runway &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
