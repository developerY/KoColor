import { useState } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, size: string) => void;
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToBag }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.sizes[0] || 'M';

  const handleAdd = () => {
    setIsAdded(true);
    onAddToBag(product, currentSize);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1d]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl h-full bg-white shadow-2xl p-8 overflow-y-auto flex flex-col justify-between z-10 border-l border-[#c3c6d7]">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0edf0]">
            <span className="font-label-sm uppercase tracking-widest text-[#004ac6] font-bold">
              PIECE SPECIFICATION
            </span>
            <button
              className="p-1 hover:bg-[#f0edf0] text-[#1c1b1d] transition-colors"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="w-full aspect-[4/3] overflow-hidden bg-[#f0edf0] shadow-sm">
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <span className="font-label-sm uppercase tracking-widest text-[#fd761a] font-bold">
              {product.hueName}
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-[#1c1b1d] leading-tight font-serif-couture uppercase">
              {product.name}
            </h2>
            <div className="font-headline-sm text-2xl text-[#1c1b1d] font-bold">
              ${product.price.toLocaleString()} USD
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-label-sm uppercase tracking-widest text-[#434655]">
              MATERIAL SPECIFICATION
            </div>
            <p className="font-body-md text-[#1c1b1d] font-semibold">
              {product.materialProvenance}
            </p>
            <p className="font-body-md text-[#434655] text-sm">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm uppercase tracking-widest text-[#434655]">
                SELECT ATELIER SIZE
              </span>
              <span className="font-label-sm text-[#004ac6] uppercase tracking-wider">
                COUTURE FIT
              </span>
            </div>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`w-14 h-11 font-label-sm uppercase tracking-wider flex items-center justify-center border border-[#c3c6d7] transition-colors ${
                    currentSize === s
                      ? 'bg-[#1c1b1d] text-white font-bold'
                      : 'bg-[#f0edf0] hover:bg-[#eae7ea] text-[#1c1b1d]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Swatch Spectrum Preview */}
          <div className="p-4 bg-[#f6f2f5] space-y-2">
            <div className="font-label-sm text-[10px] uppercase tracking-widest text-[#434655]">
              SPECTRAL CALIBRATION
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full shadow-sm"
                style={{ backgroundColor: product.hueHex }}
              />
              <span className="font-body-md text-xs text-[#1c1b1d] uppercase font-bold">
                {product.hueName} ({product.hueHex})
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#f0edf0] space-y-3 mt-6">
          <button
            onClick={handleAdd}
            className={`w-full py-4 text-white font-label-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
              isAdded ? 'bg-[#004ac6]' : 'bg-[#1c1b1d] hover:bg-[#004ac6]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAdded ? 'check' : 'shopping_bag'}
            </span>
            <span>{isAdded ? 'ADDED TO BAG' : 'ADD TO RUNWAY CART'}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#f0edf0] hover:bg-[#eae7ea] text-[#1c1b1d] font-label-sm uppercase tracking-widest transition-colors"
            type="button"
          >
            CONTINUE BROWSING CATALOG
          </button>
        </div>
      </div>
    </div>
  );
}
