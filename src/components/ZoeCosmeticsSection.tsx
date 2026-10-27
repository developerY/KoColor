import React, { useRef, useState } from 'react';

interface ZoeCosmeticsSectionProps {
  onOpenBrandPortal?: () => void;
  variant?: 'home' | 'about';
}

export const ZoeCosmeticsSection: React.FC<ZoeCosmeticsSectionProps> = ({
  onOpenBrandPortal,
  variant = 'home',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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
    <section className="relative bg-[#f8f5f0] text-[#1c1b1d] py-24 border-t border-[#e8ded4] overflow-hidden">
      {/* Subtle organic seashell gradient backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#faede1]/70 via-[#f4e2d3]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#ece1d3]/80 via-[#f9f3ec]/40 to-transparent rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e2d6c8]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#1c1b1d] text-[#faede1] text-[10px] font-mono tracking-[0.25em] uppercase rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261] animate-pulse"></span>
              CHILD BRAND UNDER KOCOLOR MAISON • 2027 RELEASE
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1c1b1d] tracking-tight leading-[1.08]">
              Zoe — Nude Cosmetics
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#8d6e5a] tracking-wide font-normal">
              "Beauty, Without The Evidence"
            </p>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Conceived as the minimalist, organic counterpart to KoColor's high-chroma architectural
              world. A barely-there cosmetics line formulated with bio-micronized sea minerals,
              pure mother-of-pearl reflectives, and weightless marine hydrators.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBrandPortal}
                className="cursor-pointer bg-[#1c1b1d] hover:bg-[#8d6e5a] text-white px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all hover:shadow-lg flex items-center gap-2"
              >
                <span>Explore Zoe — Nude Cosmetics</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <a
                href="https://zoenude.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-xs font-mono text-[#8d6e5a] hover:text-[#1c1b1d] uppercase tracking-wider underline underline-offset-4 font-semibold flex items-center gap-1"
              >
                <span>ZoeNude.com</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Video & Brand Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12">
          {/* Main Video Viewport */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-video w-full bg-[#1c1b1d] overflow-hidden rounded-xs shadow-2xl border border-[#decbb7]/80">
              <video
                ref={videoRef}
                src="/assets/aistudio/Mermaid_emerging_from_seashell_20261022111320_e18bee16.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center cursor-pointer"
                onClick={togglePlay}
              />

              {/* Top Video Watermark */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#1c1b1d]/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#faede1] uppercase rounded-xs border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
                ZOENUDE // SEASHELL CAMPAIGN FILM
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2 bg-[#1c1b1d]/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white">
                  <button
                    onClick={togglePlay}
                    className="cursor-pointer hover:text-[#f4a261] transition-colors flex items-center gap-1 text-xs font-mono uppercase"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                    <span className="text-[10px] tracking-wider">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </button>

                  <span className="text-stone-500 text-xs">|</span>

                  <button
                    onClick={toggleSound}
                    className="cursor-pointer hover:text-[#f4a261] transition-colors flex items-center gap-1 text-xs font-mono uppercase"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                    <span className="text-[10px] tracking-wider">{isMuted ? 'UNMUTE' : 'MUTED'}</span>
                  </button>
                </div>

                <button
                  onClick={onOpenBrandPortal}
                  className="cursor-pointer bg-white/90 hover:bg-white text-[#1c1b1d] px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-1"
                >
                  <span>Launch Portal</span>
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </button>
              </div>
            </div>
            <p className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mt-2.5 flex items-center justify-between">
              <span>FILMED ON THE CALIFORNIA COAST // 2027 CAMPAIGN</span>
              <span>4K CINEMATIC RELEASE</span>
            </p>
          </div>

          {/* Right: The Philosophy of Barely-There */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-l-2 border-[#8d6e5a] pl-5 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#8d6e5a] uppercase font-bold">
                // THE FORMULATION STANDARD
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-900 leading-snug">
                Skin First. Pigment Second. Imperceptible Always.
              </h3>
            </div>

            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
              Traditional makeup creates a mask. Zoe — Nude Cosmetics harnesses light diffusion
              derived from microscopic calcium-carbonate platelets inside ethical mollusk shells,
              refracting ambient light to soften texture while remaining invisible to the touch.
            </p>

            {/* 4 Brand Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-white/80 p-3.5 border border-[#e2d6c8] space-y-1">
                <span className="text-[10px] text-[#8d6e5a] block uppercase font-bold">01 // Weight</span>
                <span className="font-semibold text-stone-900 block text-xs">Zero-Weight Veil</span>
                <span className="text-[10px] text-stone-500">Breathable 24hr skin matrix</span>
              </div>
              <div className="bg-white/80 p-3.5 border border-[#e2d6c8] space-y-1">
                <span className="text-[10px] text-[#8d6e5a] block uppercase font-bold">02 // Base</span>
                <span className="font-semibold text-stone-900 block text-xs">Ocean Squalane</span>
                <span className="text-[10px] text-stone-500">Kelp bio-ferment hydration</span>
              </div>
              <div className="bg-white/80 p-3.5 border border-[#e2d6c8] space-y-1">
                <span className="text-[10px] text-[#8d6e5a] block uppercase font-bold">03 // Glow</span>
                <span className="font-semibold text-stone-900 block text-xs">Mother-of-Pearl</span>
                <span className="text-[10px] text-stone-500">Non-glitter micro-refraction</span>
              </div>
              <div className="bg-white/80 p-3.5 border border-[#e2d6c8] space-y-1">
                <span className="text-[10px] text-[#8d6e5a] block uppercase font-bold">04 // Clean</span>
                <span className="font-semibold text-stone-900 block text-xs">100% Non-Toxic</span>
                <span className="text-[10px] text-stone-500">SF &amp; LA laboratory tested</span>
              </div>
            </div>

            {/* Link Box */}
            <div className="p-4 bg-gradient-to-r from-[#1c1b1d] to-[#2d2926] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xs shadow-md">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#f4a261] uppercase block">
                  EXCLUSIVE ALLOCATION
                </span>
                <span className="font-serif text-lg font-light">
                  Reserve The 2027 Debut Kit
                </span>
              </div>
              <button
                onClick={onOpenBrandPortal}
                className="cursor-pointer bg-[#faede1] hover:bg-[#f4a261] text-[#1c1b1d] px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all whitespace-nowrap self-start sm:self-auto"
              >
                View Collection (4)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
