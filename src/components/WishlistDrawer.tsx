import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onMoveToBag: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onMoveToBag,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1d]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between z-10 border-l border-[#c3c6d7]">
        {/* Header */}
        <div className="p-6 bg-[#f6f2f5] border-b border-[#c3c6d7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd761a] text-[22px]">
              favorite
            </span>
            <h3 className="font-title-lg text-[#1c1b1d] uppercase font-bold tracking-wider">
              Saved Archives [{items.length}]
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#eae7ea] text-[#1c1b1d] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="p-6 overflow-y-auto flex-grow divide-y divide-[#f0edf0] space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center text-[#434655] space-y-3">
              <span className="material-symbols-outlined text-[48px] text-[#c3c6d7]">
                favorite_border
              </span>
              <p className="font-title-md text-[#1c1b1d]">No archival pieces saved yet</p>
              <p className="font-body-md text-xs">
                Click the heart icon on any runway look or formulation to preserve it here.
              </p>
            </div>
          ) : (
            items.map((prod) => (
              <div key={prod.id} className="pt-4 first:pt-0 flex gap-4">
                <div className="w-20 h-24 bg-[#f0edf0] overflow-hidden shrink-0 border border-[#c3c6d7]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-label-sm text-[10px] text-[#fd761a] font-bold uppercase">
                        {prod.category}
                      </span>
                      <button
                        onClick={() => onRemove(prod.id)}
                        className="text-[#737686] hover:text-[#ba1a1a] p-0.5"
                        type="button"
                        title="Remove from wishlist"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                    <h4 className="font-title-md font-bold text-[#1c1b1d] text-sm leading-tight mt-0.5">
                      {prod.name}
                    </h4>
                    <p className="font-body-md text-xs text-[#434655]">
                      ${prod.price.toLocaleString()} USD
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onMoveToBag(prod)}
                      className="w-full py-2 bg-[#1c1b1d] hover:bg-[#004ac6] text-white font-label-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-[#f6f2f5] border-t border-[#c3c6d7]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#e5e1e4] hover:bg-[#c3c6d7] text-[#1c1b1d] font-label-sm uppercase tracking-widest transition-colors"
            type="button"
          >
            Continue Exploring Collections
          </button>
        </div>
      </aside>
    </div>
  );
}
