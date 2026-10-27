import React, { useState } from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (
    screen: ScreenType,
    options?: { brand?: 'zoenude' | 'lunasea'; apparelTab?: 'editions' | 'runway' | 'trench' }
  ) => void;
  onOpenZoePortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenZoePortal }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#1c1b1d] text-[#fcf8fb] pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / Guild Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#acf847] uppercase">
              // AI TECH FASHION HOUSE • 100% GENERATED WITH AI
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Join The Algorithmic Guild
            </h3>
            <p className="text-stone-400 text-sm max-w-md font-sans leading-relaxed">
              Every garment, silhouette, nanometer chroma bath, and bio-cosmetic formula is built with AI.
              Receive private invitations to confidential generative drops, neural pattern weights, and limited-edition 2027 runway pre-orders.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {isSubscribed ? (
              <div className="p-4 bg-[#acf847]/10 border border-[#acf847]/40 rounded text-[#acf847] text-sm font-mono flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>INVITATION ENROLLED: WELCOME TO THE ALGORITHMIC GUILD.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR WORK OR PRIVATE EMAIL..."
                    className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-xs font-mono uppercase tracking-wider text-white placeholder-stone-500 focus:outline-none focus:border-[#acf847] transition-colors"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#fcf8fb] hover:bg-[#acf847] text-[#1c1b1d] px-8 py-3 text-xs font-mono font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
                  >
                    Enroll
                  </button>
                </div>
                <p className="text-[10px] text-stone-500 font-mono tracking-wider">
                  ALL GARMENTS SYNTHESIZED WITH NEURAL DRAFTING // ZERO PHYSICAL TEXTILE WASTE.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-stone-800 text-xs">
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-[#004ac6] uppercase mb-4 font-bold">
              02 // AI Apparel
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-sans">
              <li>
                <a
                  href="/apparel"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('apparel', { apparelTab: 'editions' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  02A / AI Color Editions
                </a>
              </li>
              <li>
                <a
                  href="/apparel?tab=runway"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('apparel', { apparelTab: 'runway' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  02B / Generative Runway (32 Looks)
                </a>
              </li>
              <li>
                <a
                  href="/apparel?tab=trench"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('apparel', { apparelTab: 'trench' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  02C / Look 07: Neural Scuba Trench
                </a>
              </li>
              <li>
                <span className="text-stone-500 text-[11px]">Diffusion-v4.9 • Zero-Waste Voronoi</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-[#fd761a] uppercase mb-4 font-bold">
              03 // AI Cosmetics
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-sans">
              <li>
                <a
                  href="/cosmetics?brand=zoenude"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('cosmetics', { brand: 'zoenude' });
                    }
                  }}
                  className="text-[#f4a261] hover:text-white transition-colors cursor-pointer text-left font-semibold flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
                  <span>ZoeNude: In-Silico Molecular Tints</span>
                </a>
              </li>
              <li>
                <a
                  href="/cosmetics?brand=lunasea"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('cosmetics', { brand: 'lunasea' });
                    }
                  }}
                  className="text-purple-300 hover:text-white transition-colors cursor-pointer text-left font-semibold flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8b4e2]"></span>
                  <span>LunaSea: Algorithmic Marine Pastels</span>
                </a>
              </li>
              <li>
                <span className="text-stone-500">Bio-Generative Algae Enzyme Folding</span>
              </li>
              <li>
                <span className="text-stone-500">Nanometer Refraction Mapping</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-[#acf847] uppercase mb-4 font-bold">
              04 // Tech Engine
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-sans">
              <li>
                <a
                  href="/tech"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('tech');
                    }
                  }}
                  className="hover:text-[#acf847] text-stone-300 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#acf847]"></span>
                  <span>Interactive AI Couture Synthesizer</span>
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.zoewave.probase.kocolor&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-stone-300 flex items-center gap-1"
                >
                  <span>KoColor Mobile App on Google Play</span>
                  <span className="material-symbols-outlined text-[11px]">north_east</span>
                </a>
              </li>
              <li>
                <span className="text-stone-300">Deterministic Color Matrix</span>
              </li>
              <li>
                <span className="text-stone-300">Environmental Telemetry Engine</span>
              </li>
              <li>
                <span className="text-stone-300">Algorithmic Rotation Health Score</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-stone-300 uppercase mb-4 font-bold">
              05 // AI Maison Governance
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-sans">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onNavigate('about');
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  The AI Maison Manifesto
                </a>
              </li>
              <li>
                <span className="text-stone-300">100% Algorithmic Pattern Nesting</span>
              </li>
              <li>
                <span className="text-stone-300">Zero Fabric Waste Guarantee</span>
              </li>
              <li>
                <span className="text-stone-300">Neural Compute Lab (SF)</span>
              </li>
              <li>
                <span className="text-stone-300">Parametric Pattern Lab (LA)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Decorative KOCOLOR Watermark */}
        <div className="py-10 text-center select-none overflow-hidden">
          <p className="font-serif text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-stone-900 uppercase opacity-60">
            KOCOLOR AI
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 tracking-wider pt-4 gap-4">
          <p>© 2027 KOCOLOR AI TECH FASHION HOUSE • EVERYTHING BUILT WITH ARTIFICIAL INTELLIGENCE • SF &amp; LA, CA</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors">SAN FRANCISCO (NEURAL COMPUTE)</span>
            <span>•</span>
            <span className="hover:text-stone-300 transition-colors">LOS ANGELES (PARAMETRIC ATELIER)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
