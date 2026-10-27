import React from 'react';

interface VideoStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoStreamModal({ isOpen, onClose }: VideoStreamModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1c1b1d]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[#1c1b1d] overflow-hidden shadow-2xl relative border border-white/20 rounded-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-4 py-3 bg-[#242325] text-[#f3f0f2] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#acf847] animate-pulse" />
            <span className="font-mono uppercase tracking-widest text-[#acf847] font-bold text-xs">
              SS27 Broadcast Master — SF &amp; LA, CA
            </span>
          </div>
          <button
            className="p-1 hover:bg-white/10 text-white rounded transition-colors cursor-pointer flex items-center justify-center"
            onClick={onClose}
            type="button"
            title="Close video"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Real YouTube Video Player Viewport */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/arO5AMz_Y50?autoplay=1&rel=0&playsinline=1"
            title="KoColor Video Master"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#1c1b1d] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#acf847] font-semibold text-[11px]">4K UHD 60FPS</span>
            <span className="text-stone-600">•</span>
            <span className="text-[11px] text-stone-300">MULTI-CAM CHROMA BROADCAST</span>
          </div>
          <div className="text-[10px] text-stone-400 font-mono tracking-wider uppercase">
            SF &amp; LA Atelier Runway Presentation
          </div>
        </div>
      </div>
    </div>
  );
}
