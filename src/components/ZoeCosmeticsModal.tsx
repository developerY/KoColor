import React, { useRef, useState } from 'react';
import { BagItem } from '../types';

interface ZoeCosmeticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<BagItem, 'id'>) => void;
}

export const ZoeCosmeticsModal: React.FC<ZoeCosmeticsModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const products = [
    {
      id: 'zoe-prod-01',
      title: 'Luminous Shell Fluid Tint',
      shade: 'Universal Bare Glow (01-08 Adaptable)',
      price: 52,
      specs: 'Crushed mother-of-pearl suspension in 100% sugarcane squalane.',
      badge: 'Hero Formulation',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmtJiAJoPZnAkGZa5LeKZ2o1axOcQWZeS-VblFwrqBLPZLsCCXphHFkZrmWIpooeeY5lFGeJfnW85U43rOQjAHM-TGPFjP2Aokfkh4l9Iq8ZDgsHma6kJ0EL1OeJ6QpaX9LnNE2726X24bvmaiqIf2U_sA200NX1LCAaqP-8e5EvomTAQR0FJmyoKbZB5kKnefps764qbqJzscx6uIj1honjvTAurSHNYHT2rF20y2VllMwWth5AWu',
    },
    {
      id: 'zoe-prod-02',
      title: 'Mother-of-Pearl Nude Highlighter',
      shade: 'Chroma Oyster Refraction',
      price: 44,
      specs: 'Non-glitter micro-platelet illumination designed to catch coastal sunlight.',
      badge: 'Barely-There Glow',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRZekCMho9xNYsUXzN6rT2JqYdqoGGVeuYgUgohv8rGMs8byOw1DeccPmsrqjyg3C_BZh6onJZ5r1iBBpRSpH8sEcZJLFbyeyr-xxvNQYzGqKtyDn4ZUeMPW2J-DI9M_0vAyb6Re-ajdunfvo6PvVpbcO-wqE54sdVJ5C9jhN0d2Ec8W-lVxGEEGLhI41zEqvRS1qCFFM_IBE-47M86HF4g6j07EA0KD7ZHmYdsBOhjRxGSbfSKBD',
    },
    {
      id: 'zoe-prod-03',
      title: 'Bare Petal Lip Cushion Dew',
      shade: 'Sun-Bleached Shell Nude',
      price: 32,
      specs: 'Sub-molecular marine collagen plumping balm with organic jojoba esters.',
      badge: 'Daily Essential',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFVfl6TCsA-4DdmfNX9nf7gYQ7xAroyS1uHdZSfSNOtEynbcdgVt1Wd6hi7Q2MRGe-KWyOaG8wmApl_3r4WQPd-bUZvSqm_0UI_xPIeSw-I19GNFpt0Cjfh9fQh9jXetBNx9mmBmump7nCrTsacxbI08VOmeMXAbmPcIouS-8X9qsgUVAhkq7d-bb_G6FgQNEoZdmsScBTg1ojcrPWkelLNQxVU3vH0cL2cQlC1LI4ltaER9xTyEku',
    },
    {
      id: 'zoe-prod-04',
      title: 'Ocean Mist Setting Glaze',
      shade: 'Clear Luminescent Hydrosol',
      price: 38,
      specs: 'Giant sea kelp bio-ferment that locks micro-pigments without powdery finish.',
      badge: 'Skin Lock',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbEGtBua86367BOLcgoufcDVg0dLZl5ADaSKpCNP0hwrAQTq9HngPHNMyTp7v1V_3eZnrakxFcBx--F1b7aJGFi7lQXxsIt7C8GFgNcSrIbMAXVMvVgdWIkDm_VlJsg3xKInO9vpnp60mn8vT6l6wulaRa1EqHdiOa6KaM1klC9dNesTJ_cPE7zUwthQ4f416XEh6-Kbm9nWVihN2oeybtLhelwuP1PZbgZMwBI5OmwTXxx39TYQo',
    },
  ];

  const handleAdd = (item: (typeof products)[0]) => {
    onAddToCart({
      productId: item.id,
      title: `Zoe Nude — ${item.title}`,
      price: item.price,
      size: 'Standard 30ml',
      color: item.shade,
      image: item.image,
      quantity: 1,
    });
    setToastMessage(`Added "${item.title}" to your Atelier Bag`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1c1b1d]/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1c1b1d] text-[#faede1] border border-[#f4a261] px-5 py-3 rounded text-xs font-mono shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-[#f4a261] text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Modal Dialog */}
      <div className="bg-[#fcf8fb] text-[#1c1b1d] max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl border border-[#decbb7] relative flex flex-col">
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-30 bg-[#f8f5f0]/95 backdrop-blur-md px-6 py-4 border-b border-[#e2d6c8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f4a261] animate-pulse" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#1c1b1d]">
                ZOENUDE COSMETICS
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#8d6e5a] block uppercase -mt-0.5">
                CHILD BRAND UNDER KOCOLOR MAISON • SF &amp; LA, CA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://zoenude.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#8d6e5a] text-[#8d6e5a] hover:bg-[#8d6e5a] hover:text-white transition-colors text-[10px] font-mono uppercase tracking-wider rounded-xs"
            >
              <span>ZoeNude.com</span>
              <span className="material-symbols-outlined text-xs">arrow_outward</span>
            </a>
            <button
              onClick={onClose}
              className="cursor-pointer p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 rounded-full transition-colors"
              title="Close Portal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Hero Video Banner in Modal */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-[#1c1b1d] overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/aistudio/Mermaid_emerging_from_seashell_20261022111320_e18bee16.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1d] via-[#1c1b1d]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#faede1] uppercase">
                THE SEASHELL CAMPAIGN FILM
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                Beauty, Without The Evidence.
              </h3>
            </div>
            <a
              href="https://zoenude.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#faede1] hover:bg-[#f4a261] text-[#1c1b1d] px-5 py-2 text-xs font-mono uppercase font-bold tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto shadow-md"
            >
              <span>Visit ZoeNude.com</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Modal Body / Products */}
        <div className="p-6 sm:p-8 space-y-10">
          {/* Brand Manifesto Overview */}
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8d6e5a] uppercase font-bold">
              // THE BARELY-THERE COSMETICS MANIFESTO
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#1c1b1d]">
              Formulated to whisper, never to shout.
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
              Engineered in our San Francisco and Los Angeles laboratories as a direct dialogue with
              KoColor's architectural fashion. While KoColor cloaks the body in monumental saturated
              sculptures, Zoe — Nude Cosmetics strips beauty back to the primal, translucent glow of
              water-kissed bare skin.
            </p>
          </div>

          {/* 4 Debut Formulations Grid */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e2d6c8] mb-6">
              <span className="text-[11px] font-mono tracking-widest text-[#1c1b1d] uppercase font-bold">
                04 DEBUT CHROMATIC-NUDE FORMULATIONS • 2027 RELEASE
              </span>
              <span className="text-[10px] font-mono text-stone-500 uppercase">
                SHIPPING FROM SF &amp; LA ATELIERS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#decbb7] p-4 flex flex-col justify-between group hover:border-[#1c1b1d] hover:shadow-xl transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-square overflow-hidden bg-[#f8f5f0]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#1c1b1d] text-[#faede1] px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-[#8d6e5a] uppercase block">
                        {item.shade}
                      </span>
                      <h5 className="font-serif text-base font-normal text-stone-900 mt-0.5">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-stone-500 font-sans mt-1 leading-snug">
                        {item.specs}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      ${item.price} USD
                    </span>
                    <button
                      onClick={() => handleAdd(item)}
                      className="cursor-pointer bg-[#1c1b1d] hover:bg-[#8d6e5a] text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">add_shopping_bag</span>
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note & link */}
          <div className="p-6 bg-[#f8f5f0] border border-[#e2d6c8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-stone-900 font-bold block">
                Zoe — Nude Cosmetics is a registered child trademark of KoColor Maison Paris / SF &amp; LA.
              </span>
              <span className="text-stone-500 text-[11px]">
                Pre-orders scheduled to dispatch concurrently with the Spring/Summer 2027 runway release.
              </span>
            </div>
            <a
              href="https://zoenude.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1c1b1d] text-white px-5 py-2.5 hover:bg-[#8d6e5a] transition-colors uppercase tracking-wider font-bold whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>Visit ZoeNude.com</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
