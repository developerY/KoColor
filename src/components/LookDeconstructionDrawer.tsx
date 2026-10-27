import { useState } from 'react';
import { RunwayLook } from '../types';

interface LookDeconstructionDrawerProps {
  look: RunwayLook | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (look: RunwayLook, size: string) => void;
}

export default function LookDeconstructionDrawer({
  look,
  isOpen,
  onClose,
  onReserve,
}: LookDeconstructionDrawerProps) {
  const [selectedSize, setSelectedSize] = useState('FR 38 / US 4');
  const [isReserved, setIsReserved] = useState(false);

  if (!isOpen || !look) return null;

  const handleReserve = () => {
    setIsReserved(true);
    onReserve(look, selectedSize);
    setTimeout(() => {
      setIsReserved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1d]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto flex flex-col justify-between z-10 border-l border-[#c3c6d7]">
        {/* Drawer Header */}
        <div className="p-6 bg-[#f0edf0] flex items-center justify-between border-b border-[#c3c6d7]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#1c1b1d] text-white font-label-sm uppercase font-bold">
              {look.lookBadge}
            </span>
            <h4 className="font-title-lg text-[#1c1b1d] font-bold">
              Look Deconstruction
            </h4>
          </div>
          <button
            className="p-2 hover:bg-[#eae7ea] text-[#1c1b1d] transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-grow">
          {/* Look Visual Detail Image */}
          <div className="w-full aspect-[16/10] bg-[#f0edf0] relative overflow-hidden shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG91QVJiMp8t4R4Rfml0ARqypNOeNnTm1v_mdZPpvlejyUnXDRfffjxPxl9NfeFBgh-vp8rOt9ynSY_WrjHddYhbTBY_Ydf3hvmSKyVs_XNos_917XHMElsgwIuHtwmZfb8e9chC7nVxY4rAx-SVFkb4EA17dBo5eLrd11JgEz3agAEdAtsxsyzCz4DBs7yfGQFMj_-hiSyboR0wWmEFK1LCGZ3zTXiVTpIES7q_flzPwmw64E_j8t"
              alt="Macro close-up detail shot of the garment construction, luxury textiles, meticulous hand-stitched French seams."
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <span className="font-label-sm uppercase tracking-widest text-[#004ac6] font-bold">
              {look.code} • {look.category}
            </span>
            <h3 className="font-headline-md text-2xl text-[#1c1b1d] font-serif-couture uppercase leading-tight">
              {look.title}
            </h3>
            <p className="font-body-md text-[#434655] text-sm">
              {look.description}
            </p>
          </div>

          {/* Garment Component Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f0edf0] pb-2">
              <span className="font-label-sm uppercase tracking-widest text-[#004ac6] font-bold">
                Components in Ensemble
              </span>
              <span className="font-label-sm text-[#434655]">
                {look.components.length} Items Total
              </span>
            </div>
            <div className="space-y-2.5">
              {look.components.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#f6f2f5] flex items-center justify-between border border-[#c3c6d7]/40"
                >
                  <div className="pr-4">
                    <p className="font-title-md font-bold text-[#1c1b1d] text-sm">
                      {item.name}
                    </p>
                    <p className="font-body-md text-[#434655] text-xs">
                      {item.fabric}
                    </p>
                  </div>
                  <span className="font-label-lg font-bold text-[#1c1b1d] shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier & Backstage Notes */}
          <div className="p-5 bg-[#eae7ea] space-y-2 border-l-2 border-[#004ac6]">
            <div className="flex items-center gap-2 text-[#1c1b1d]">
              <span className="material-symbols-outlined text-[18px] text-[#004ac6]">
                science
              </span>
              <h5 className="font-label-lg uppercase tracking-wider text-xs">
                Atelier Pattern Master Notes
              </h5>
            </div>
            <p className="font-body-md text-[#434655] text-xs italic leading-relaxed">
              "{look.notes}"
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="font-label-sm uppercase tracking-wider text-[#1c1b1d] font-bold block">
              Runway Sizing (Couture Fit)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['FR 36 / US 2', 'FR 38 / US 4', 'FR 40 / US 6', 'FR 42 / US 8'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 font-label-sm uppercase text-xs font-bold transition-colors border border-[#c3c6d7] ${
                    selectedSize === size
                      ? 'bg-[#004ac6] text-white'
                      : 'bg-[#fcf8fb] hover:bg-[#eae7ea] text-[#1c1b1d]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-white shadow-lg space-y-3 border-t border-[#f0edf0]">
          <div className="flex items-center justify-between text-[#1c1b1d]">
            <span className="font-label-sm uppercase tracking-widest text-[#434655]">
              Full Ensemble Pre-Order Total
            </span>
            <span className="font-headline-sm text-2xl font-bold">
              ${look.estimatedPrice.toLocaleString()} USD
            </span>
          </div>
          <button
            onClick={handleReserve}
            className={`w-full py-4 text-white font-label-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
              isReserved ? 'bg-[#3a5f00]' : 'bg-[#004ac6] hover:bg-[#1c1b1d]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isReserved ? 'check_circle' : 'shopping_bag'}
            </span>
            <span>
              {isReserved ? 'ALLOCATION SECURED' : 'SECURE RUNWAY ALLOCATION'}
            </span>
          </button>
          <p className="text-center font-label-sm text-[10px] text-[#434655] uppercase">
            2027 Pre-order window closes at midnight PST (SF &amp; LA, CA). 30% deposit required upon verification.
          </p>
        </div>
      </aside>
    </div>
  );
}
