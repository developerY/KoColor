import { BagItem, CurrencyType } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currency: CurrencyType;
  onCheckout: () => void;
}

export default function BagDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onCheckout,
}: BagDrawerProps) {
  if (!isOpen) return null;

  const currentCurrency = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalConverted = Math.round(subtotalUSD * currentCurrency.rate);

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
            <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
              shopping_bag
            </span>
            <h3 className="font-title-lg text-[#1c1b1d] uppercase font-bold tracking-wider">
              Runway Bag [{items.reduce((acc, it) => acc + it.quantity, 0)}]
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

        {/* Free Shipping Progress bar */}
        <div className="p-4 bg-[#f0edf0] border-b border-[#c3c6d7] space-y-1.5 text-xs">
          <div className="flex justify-between font-label-sm text-[#434655]">
            <span>Complimentary Global Express</span>
            <span className="text-[#3a5f00] font-bold">QUALIFIED</span>
          </div>
          <div className="w-full bg-[#e5e1e4] h-1.5 overflow-hidden">
            <div className="bg-[#004ac6] h-full w-full" />
          </div>
        </div>

        {/* Item List */}
        <div className="p-6 overflow-y-auto flex-grow divide-y divide-[#f0edf0] space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center text-[#434655] space-y-3">
              <span className="material-symbols-outlined text-[48px] text-[#c3c6d7]">
                shopping_bag
              </span>
              <p className="font-title-md text-[#1c1b1d]">Your Runway Bag is currently empty</p>
              <p className="font-body-md text-xs">
                Explore our SS27 collection pieces and reserve limited edition formulations.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                <div className="w-20 h-24 bg-[#f0edf0] overflow-hidden shrink-0 border border-[#c3c6d7]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-title-md font-bold text-[#1c1b1d] text-sm leading-tight">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#737686] hover:text-[#ba1a1a] p-0.5"
                        type="button"
                        title="Remove piece"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <div className="font-label-sm text-[11px] text-[#434655] mt-1 space-x-2">
                      <span>SIZE: {item.size}</span>
                      <span>•</span>
                      <span>COLOR: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#c3c6d7]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#f0edf0] text-sm font-bold text-[#1c1b1d]"
                        type="button"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-label-sm text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#f0edf0] text-sm font-bold text-[#1c1b1d]"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-title-md font-bold text-[#1c1b1d]">
                      {currentCurrency.symbol}
                      {Math.round(item.price * currentCurrency.rate * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-[#f6f2f5] border-t border-[#c3c6d7] space-y-4">
            <div className="space-y-2 text-xs font-label-sm">
              <div className="flex justify-between text-[#434655]">
                <span>SUBTOTAL</span>
                <span className="font-bold text-[#1c1b1d]">
                  {currentCurrency.symbol}
                  {subtotalConverted.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#434655]">
                <span>ESTIMATED IMPORT DUTIES &amp; VAT</span>
                <span className="text-[#3a5f00] font-bold">INCLUDED</span>
              </div>
              <div className="flex justify-between text-[#434655]">
                <span>GLOBAL INSURED COURIER</span>
                <span className="text-[#3a5f00] font-bold">COMPLIMENTARY</span>
              </div>
              <div className="pt-2 border-t border-[#c3c6d7] flex justify-between text-[#1c1b1d] font-title-lg text-base font-bold">
                <span>TOTAL</span>
                <span>
                  {currentCurrency.symbol}
                  {subtotalConverted.toLocaleString()} {currency}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-4 bg-[#004ac6] hover:bg-[#1c1b1d] text-white font-label-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span>SECURE RUNWAY CHECKOUT</span>
            </button>
            <p className="text-center font-label-sm text-[10px] text-[#434655]">
              Insured courier delivery dispatched from San Francisco &amp; Los Angeles, CA Ateliers.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
