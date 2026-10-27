import { useState, useEffect } from 'react';

interface VideoStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoStreamModal({ isOpen, onClose }: VideoStreamModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(44);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1d]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#fcf8fb] overflow-hidden shadow-2xl relative border border-[#c3c6d7]">
        {/* Header bar */}
        <div className="p-4 bg-[#313032] text-[#f3f0f2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fd761a] animate-pulse" />
            <span className="font-label-sm uppercase tracking-widest text-[#acf847] font-bold text-xs">
              SS27 Broadcast Master — SF &amp; LA, CA (18:42)
            </span>
          </div>
          <button
            className="p-1 hover:bg-white/10 text-[#f3f0f2] transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Video simulation viewport */}
        <div className="relative w-full aspect-video bg-[#1c1b1d] flex items-center justify-center overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkA1HtqG7GSfbhP3UBAxcD1-dSNV0M4hAWBw-MwHwOuftO9yvTVeizfGX-fI3W_vHzilXjSW9L0DLOJLx-cluAteBrF1lbbYF2ucvmIWn847hiI2XoahzkgL0nxgZ3KdiwayGekAEZcP5H3_aC1lOydDaSezSDqFB3bqCbY44Jp55OE3U1K-AKcBFuIrn4VMvUlbEQ0gFLYwsapJvgozW1-2EAkQZLaW6Z4SWz2oAQ19mw0alJ1EEZ"
            alt="Cinematic still frame of the live 2027 runway broadcast in SF & LA, CA showing intense lights reflecting on the black wet-look catwalk runway."
            className="w-full h-full object-cover opacity-90"
          />

          {/* Controls overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-[#1c1b1d] via-transparent to-[#1c1b1d]/40">
            <div className="flex justify-between items-center text-white font-label-sm text-xs">
              <span>LIVE MASTER STREAM: 08:14 / 18:42</span>
              <span className="bg-[#004ac6] px-2 py-0.5 text-white font-bold">
                4K UHD 60FPS • MULTI-CAM CHROMA
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="w-20 h-20 rounded-full bg-[#004ac6]/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                onClick={() => setIsPlaying(!isPlaying)}
                type="button"
              >
                <span className="material-symbols-outlined text-[40px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Video Progress bar */}
            <div className="space-y-2">
              <div
                className="w-full bg-white/30 h-1.5 cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress((clickX / rect.width) * 100);
                }}
              >
                <div
                  className="bg-[#004ac6] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-white/80 font-label-sm text-xs uppercase tracking-wider">
                <span>Segment 02: The Acid Citron Monoliths</span>
                <span>Next: Finale Walk (16:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
