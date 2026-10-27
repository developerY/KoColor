import React from 'react';
import { ScreenType } from '../types';
import { ZoeCosmeticsSection } from '../components/ZoeCosmeticsSection';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenZoePortal: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onOpenZoePortal,
}) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1c1b1d]">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-stone-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Maison KoColor</span>
          <span>/</span>
          <span className="text-[#004ac6] font-semibold">About Atelier</span>
        </nav>
      </div>

      {/* Hero Editorial Section */}
      <section className="relative py-16 sm:py-24 border-b border-[#e5e1e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#1c1b1d] text-white text-[10px] font-mono tracking-[0.25em] uppercase rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#acf847]"></span>
                HAUTE COUTURE ARCHITECTURE • 2027 RELEASE
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 leading-[1.08] tracking-tight">
                Where Brutalist Sculpture Meets Pure Nanometer Chroma.
              </h1>

              <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                KoColor was founded on a singular conviction: that color is not decorative surface
                treatment, but load-bearing architectural matter. Sourced from high-plateau cashmere,
                organic Como silks, and double-bonded technical scuba wool, each garment is conceived
                as a monolithic spatial sculpture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-200 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">ORIGIN</span>
                  <span className="text-stone-900 font-bold mt-1 block">Paris &amp; California</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">RUNWAY ARCHIVE</span>
                  <span className="text-stone-900 font-bold mt-1 block">Spring/Summer 2027</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">EXPANSION</span>
                  <span className="text-[#004ac6] font-bold mt-1 block">SF &amp; LA, CA 2027</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden shadow-2xl border border-stone-300">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcyIaDNe3V30QbDkRhzA5dB0pdPok-Eqouw_wiwA0azxOZslTsqJ6bOHzBf6pqCyRDSXUws7CDBTzA2vUYiKfDKVgpfwIoM5LYpCjEMOdGtPyb39q9-Jy4cA4Im4KRTR1NDCk05eil5Qnh43Hir2_FNbpurJin5HDzXelBehiWWvIP5jppaE1C4OO5Kx0GK6DN9u8vYglvFoRo3hee418gmT-kiYBPCNoonQOXW47bZCeLqfOcEQZC"
                  alt="Pattern master draping luxury structured coat in atelier"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3 text-white text-[11px] font-mono">
                  <span>ATELIER PATTERN ARCHITECTURE // 64 INTERLOCKING GEOMETRIES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Locations Section (SF & LA, CA + Paris) */}
      <section className="py-20 bg-stone-100 border-b border-[#e5e1e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
              // ATELIER HUBS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">
              Our Laboratories &amp; Showrooms
            </h2>
            <p className="text-stone-600 text-sm font-sans mt-2">
              Ahead of our monumental 2027 release in California, KoColor operates three specialized
              hubs dedicated to biological dye precipitation and architectural pattern drafting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* San Francisco */}
            <div className="bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-stone-900 transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    CALIFORNIA HEADQUARTERS
                  </span>
                  <h3 className="font-serif text-xl font-normal text-stone-900 mt-1">
                    San Francisco Bio-Mineral Lab
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Mission Bay bio-mineral immersion and spectral purification testing facility.
                  Closed-loop water recycling ensuring zero synthetic toxins enter the bay.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                <span>ESTABLISHED FOR 2027 RELEASE</span>
              </div>
            </div>

            {/* Los Angeles */}
            <div className="bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-stone-900 transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#fd761a]/10 text-[#fd761a] flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    TAILORING ARCHITECTURE
                  </span>
                  <h3 className="font-serif text-xl font-normal text-stone-900 mt-1">
                    Los Angeles Arts District Loft
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Industrial cantilevered studio dedicated to sculptural draping, heavy shears,
                  and bespoke client fittings across Southern California.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                <span>PRIVATE CLIENT SHOWROOM</span>
              </div>
            </div>

            {/* Paris */}
            <div className="bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-stone-900 transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#acf847]/20 text-[#3a5f00] flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    FOUNDING MAISON
                  </span>
                  <h3 className="font-serif text-xl font-normal text-stone-900 mt-1">
                    Paris Founding Archive
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  8 Rue Vivienne, Paris 2e. Housing the permanent heritage runway collection,
                  original copper pleating molds, and couture master archives.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                <span>HERITAGE COMMISSIONS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Craftsmanship Manifesto */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5e1e4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold bg-[#1c1b1d] px-2.5 py-1 text-white">
              // ENVIRONMENTAL ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
              Zero-Toxicity Biological Extraction
            </h2>
            <p className="text-stone-600 text-sm font-sans leading-relaxed">
              Every garment in our repository is dyed using non-petroleum bio-minerals harvested from
              botanical and marine sources. By removing petrochemical binders, our fabrics retain
              natural thermoregulation while ensuring 100% skin biocompatibility.
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onNavigate('color-editions')}
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                Inspect Color Repository
              </button>
              <button
                onClick={() => onNavigate('runway-ss25')}
                className="cursor-pointer border border-stone-300 hover:border-stone-900 text-stone-900 px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                View Runway Looks
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-white p-6 border border-stone-200">
              <span className="text-stone-400 uppercase text-[10px] block">WATER PURITY</span>
              <span className="text-3xl font-serif text-[#004ac6] font-bold mt-2 block">99.2%</span>
              <p className="text-stone-500 text-[11px] mt-1 font-sans">
                Closed-loop distillation in SF &amp; LA labs.
              </p>
            </div>
            <div className="bg-white p-6 border border-stone-200">
              <span className="text-stone-400 uppercase text-[10px] block">HEAVY METALS</span>
              <span className="text-3xl font-serif text-[#acf847] font-bold mt-2 block">0.00%</span>
              <p className="text-stone-500 text-[11px] mt-1 font-sans">
                Pure biological mineral precipitates only.
              </p>
            </div>
            <div className="bg-white p-6 border border-stone-200">
              <span className="text-stone-400 uppercase text-[10px] block">ALL-WEATHER FABRIC</span>
              <span className="text-3xl font-serif text-[#fd761a] font-bold mt-2 block">480gsm</span>
              <p className="text-stone-500 text-[11px] mt-1 font-sans">
                Double-bonded technical scuba wool.
              </p>
            </div>
            <div className="bg-white p-6 border border-stone-200">
              <span className="text-stone-400 uppercase text-[10px] block">RELEASE SCHEDULE</span>
              <span className="text-3xl font-serif text-stone-900 font-bold mt-2 block">2027</span>
              <p className="text-stone-500 text-[11px] mt-1 font-sans">
                San Francisco &amp; Los Angeles, CA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AT THE BOTTOM OF THE ABOUT PAGE: Zoe - Nude Cosmetics Video & Link */}
      <ZoeCosmeticsSection onOpenBrandPortal={onOpenZoePortal} variant="about" />
    </div>
  );
};
