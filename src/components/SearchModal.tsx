import { useState, useEffect } from 'react';
import { COLOR_EDITIONS_PRODUCTS, RUNWAY_LOOKS } from '../data/mockData';
import { Product, RunwayLook, ScreenType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectLook: (look: RunwayLook) => void;
  onNavigate: (screen: ScreenType) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectLook,
  onNavigate,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = COLOR_EDITIONS_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.hueName.toLowerCase().includes(query.toLowerCase()) ||
      p.materialProvenance.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLooks = RUNWAY_LOOKS.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.category.toLowerCase().includes(query.toLowerCase()) ||
      l.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1d]/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white text-[#1c1b1d] w-full max-w-2xl shadow-2xl border border-[#c3c6d7] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#f6f2f5] border-b border-[#c3c6d7] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by pigment (Cobalt, Citron, Amber), silhouette, or look..."
            autoFocus
            className="w-full bg-transparent font-title-md text-[#1c1b1d] placeholder:text-[#434655]/60 focus:outline-none"
          />
          <kbd className="font-label-sm text-[10px] px-2 py-1 bg-white border border-[#c3c6d7] text-[#434655]">
            ESC
          </kbd>
        </div>

        {/* Quick Collections Filter */}
        <div className="px-4 py-2.5 bg-[#f0edf0] border-b border-[#c3c6d7] flex items-center gap-2 overflow-x-auto text-xs font-label-sm">
          <span className="text-[#434655] uppercase tracking-wider mr-2">Quick:</span>
          <button
            onClick={() => {
              onNavigate('apparel');
              onClose();
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#004ac6] hover:text-white uppercase transition-colors font-medium whitespace-nowrap"
          >
            02 / Apparel
          </button>
          <button
            onClick={() => {
              onNavigate('cosmetics');
              onClose();
            }}
            className="px-2.5 py-1 bg-[#1c1b1d] text-[#faede1] hover:bg-[#f4a261] hover:text-stone-950 uppercase transition-colors whitespace-nowrap font-medium flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4a261]"></span>
            <span>03 / ZoeNude</span>
          </button>
          <button
            onClick={() => {
              onNavigate('cosmetics');
              onClose();
            }}
            className="px-2.5 py-1 bg-purple-100 text-purple-950 hover:bg-purple-200 uppercase transition-colors whitespace-nowrap font-medium flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d8b4e2]"></span>
            <span>LunaSea (Pastels)</span>
          </button>
          <button
            onClick={() => {
              onNavigate('tech');
              onClose();
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#004ac6] hover:text-white uppercase transition-colors text-[#004ac6] font-semibold whitespace-nowrap"
          >
            04 / Tech
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              onClose();
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#004ac6] hover:text-white uppercase transition-colors whitespace-nowrap"
          >
            05 / About
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="font-label-sm uppercase tracking-widest text-[#004ac6] pb-2 font-bold text-xs">
                Archival Garments ({filteredProducts.length})
              </div>
              <div className="divide-y divide-[#f0edf0]">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="py-3 px-2 hover:bg-[#f6f2f5] flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-[#f0edf0] overflow-hidden shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-label-sm text-[10px] uppercase text-[#fd761a] font-bold">
                          {prod.category}
                        </span>
                        <h4 className="font-title-md text-[#1c1b1d] group-hover:text-[#004ac6] transition-colors">
                          {prod.name}
                        </h4>
                        <span className="font-body-md text-xs text-[#434655]">
                          {prod.materialProvenance}
                        </span>
                      </div>
                    </div>
                    <span className="font-title-md font-bold text-[#1c1b1d]">
                      ${prod.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Runway Looks */}
          {filteredLooks.length > 0 && (
            <div>
              <div className="font-label-sm uppercase tracking-widest text-[#9d4300] pb-2 font-bold text-xs">
                Runway SS27 Looks ({filteredLooks.length})
              </div>
              <div className="divide-y divide-[#f0edf0]">
                {filteredLooks.map((look) => (
                  <div
                    key={look.id}
                    onClick={() => {
                      onSelectLook(look);
                      onClose();
                    }}
                    className="py-3 px-2 hover:bg-[#f6f2f5] flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-[#f0edf0] overflow-hidden shrink-0">
                        <img
                          src={look.image}
                          alt={look.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-label-sm text-[10px] uppercase text-[#004ac6] font-bold">
                          {look.code} • {look.category}
                        </span>
                        <h4 className="font-title-md text-[#1c1b1d] group-hover:text-[#004ac6] transition-colors">
                          {look.title}
                        </h4>
                        <span className="font-body-md text-xs text-[#434655] line-clamp-1">
                          {look.description}
                        </span>
                      </div>
                    </div>
                    <span className="font-title-md font-bold text-[#1c1b1d]">
                      ${look.estimatedPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredLooks.length === 0 && (
            <div className="py-12 text-center text-[#434655]">
              <span className="material-symbols-outlined text-[36px] text-[#737686] mb-2">
                search_off
              </span>
              <p className="font-title-md text-[#1c1b1d]">No archival items match "{query}"</p>
              <p className="font-body-md text-xs mt-1">
                Try searching for 'Cobalt', 'Silk', 'Trench', or 'Dress'.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
