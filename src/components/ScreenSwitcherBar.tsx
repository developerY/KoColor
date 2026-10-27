import React from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenLiveStream?: () => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenLiveStream,
}) => {
  const screens: { id: ScreenType; label: string; num: string; badge?: string }[] = [
    { id: 'home', num: '01', label: 'Prologue' },
    { id: 'apparel', num: '02', label: 'Apparel' },
    { id: 'cosmetics', num: '03', label: 'Cosmetics' },
    { id: 'tech', num: '04', label: 'Tech' },
    { id: 'about', num: '05', label: 'About' },
  ];

  const isScreenActive = (id: ScreenType) => {
    if (id === currentScreen) return true;
    if (id === 'apparel' && (currentScreen === 'color-editions' || currentScreen === 'runway-ss25' || currentScreen === 'product-detail')) {
      return true;
    }
    if (id === 'tech' && currentScreen === 'kocolor-ai') {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="bg-[#1c1b1d]/90 backdrop-blur-xl border border-white/20 p-1.5 rounded-full shadow-2xl flex items-center gap-1">
        <div className="hidden sm:flex items-center px-3 text-[10px] font-mono tracking-widest text-[#acf847] uppercase border-r border-stone-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#acf847] mr-2 animate-ping"></span>
          SCREENS
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {screens.map((s) => {
            const isActive = isScreenActive(s.id);
            const path = s.id === 'home' ? '/' : `/${s.id}`;
            return (
              <a
                key={s.id}
                href={path}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onSelectScreen(s.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#1c1b1d] font-bold shadow-md scale-105'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-[#004ac6]' : 'text-stone-500'}`}>
                  {s.num}
                </span>
                <span>{s.label}</span>
                {s.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                )}
              </a>
            );
          })}
        </div>

        {onOpenLiveStream && (
          <button
            onClick={onOpenLiveStream}
            className="cursor-pointer ml-1 hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#004ac6] hover:bg-[#003896] text-white text-[11px] font-mono tracking-wider transition-colors"
            title="Watch SF & LA, CA SS27 Livestream"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            <span>STREAM [18:42]</span>
          </button>
        )}
      </div>
    </div>
  );
};
