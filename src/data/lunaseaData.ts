export type LunaSeaTab =
  | 'home'
  | 'skincare'
  | 'lunar-makeup'
  | 'tidal-rituals'
  | 'algae-science'
  | 'about-us';

export interface LunaSeaShade {
  id: string;
  name: string;
  hex: string;
}

export interface LunaSeaKeyActive {
  name: string;
  origin: string;
  role: string;
}

export interface LunaSeaProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'skincare' | 'lunar-makeup' | 'tidal-rituals';
  tag?: string;
  tagColor?: string;
  price: number;
  volume: string;
  rating: number;
  reviewCount: number;
  description: string;
  extendedDescription: string;
  image: string;
  secondaryImage?: string;
  benefits: string[];
  keyActives: LunaSeaKeyActive[];
  usage: string;
  shades?: LunaSeaShade[];
  batchInfo?: string;
  inDemand?: boolean;
}

export interface LunaSeaReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export const LUNASEA_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBu2yHEblDSDJcmQi_CYeqN9g_Mr-WlgcYBWJ3wvjORPeTA9DFaGb7Wh_EnMYfacZzyf-d0G7V3o6ON1v_ugs_zpn1C_M5hG7BQIXtUUSBfjATw_WNZcA3LukPnW35sJA3pkQ7824ItwQgnDoAwdiYv-d5Uif6ji7KL7H-9GNzUl8nCBvJ7k2O-Tn9qv-NyyLyhxy52iICkLOSPXfI9Fhnwnaj0HLVar-mHyQGTnPz4iNkX6YfMMv0a';

export const LUNASEA_PRODUCTS: LunaSeaProduct[] = [
  {
    id: 'moonlit-nectar-serum',
    name: 'Moonlit Nectar Algae Serum',
    subtitle: 'Cellular Renewal & Barrier Restorative Concentrate',
    category: 'skincare',
    tag: 'Spotlight Formulation',
    tagColor: 'bg-[#8FAEA8]/20 text-[#27484B]',
    price: 78,
    volume: '30ml / 1.0 fl.oz',
    rating: 4.95,
    reviewCount: 428,
    description: 'Deep ocean phytoplankton, crushed south-sea pearl micro-crystals, and marine glycogen.',
    extendedDescription:
      'Harvested during peak lunar low tides in the pristine coastal fjords of Brittany, this weightless bio-ferment serum supercharges cellular ATP energy. Infused with micro-filtered red algae polysaccharide complexes, it re-teaches dry and fatigued skin to retain moisture across seven epidermal layers without silicone or heavy lipids.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAnXYUVXH-y9zP7DAgILLPe6BpGl2MtKAx__4yIyh5fmtU-OJIkRwIYYx5EsryXQHijganGZx1LzkHdSwwDFk4t75tIqh4Dw9Fe393k4YlEeSCRWX_mttvKzORbhTnh-8Jg_ee0SvE-yKOZJUDyU6qqRkdieX-e7GMSVfS3k3XGVOptSeOi4wZwgWSW1cLWtOO9qLLred9MQys5hm5licg8tLsrr6IUNSatGNUAUPfu70tWr44LIrf',
    benefits: [
      '+94% Barrier Hydration in 14 Days',
      'Bio-Identical Marine Glycogen Energy',
      'Cold-Extracted Bio-Fermented Algae',
      'Refillable Heavyweight Opal Vessel',
    ],
    keyActives: [
      {
        name: 'Red Sea Kelp Bio-Ferment (62%)',
        origin: 'Hebrides Tidal Sanctuary',
        role: 'Replenishes trace marine electrolytes and amino acids.',
      },
      {
        name: 'Crushed South Sea Pearl Peptides',
        origin: 'Akoya Sustainable Pearls',
        role: 'Imparts sheer lunar refraction and boosts micro-circulation.',
      },
      {
        name: 'Marine Phytoplankton ATP',
        origin: 'Deep North Atlantic',
        role: 'Cellular energizer that reverses environmental oxidative stress.',
      },
    ],
    usage:
      'Dispense 3–4 drops onto fingertips and gently press into damp face and neck following misting. Inhale the subtle coastal ozone aroma. Use morning and night.',
    batchInfo: 'Batch #L-894 Fresh Harvest',
    inDemand: true,
  },
  {
    id: 'opal-wave-cream',
    name: 'Opal Wave Multi-Peptide Cream',
    subtitle: 'Deep Hydration & Cellular Matrix Plumping',
    category: 'skincare',
    tag: 'Bestseller',
    tagColor: 'bg-[#CCD6EB]/30 text-[#27484B]',
    price: 64,
    volume: '50ml / 1.7 fl.oz',
    rating: 4.9,
    reviewCount: 340,
    description: 'Deep cellular hydration extracted from Brittany red sea kelp and bio-active marine squalane.',
    extendedDescription:
      'A silky, weightless cloud emulsion engineered to emulate the osmotic equilibrium of deep marine life. Cold enzymatic extraction preserves volatile marine polyphenols and ocean glycogen, delivering all-day cutaneous cushion with a soft-focus translucent finish.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnDaiMJ4LcKKxRCWWPUHXbnGdni3cPY7rwqo7OT3IoVns5l6k0EnxJj5Z8rP6s0AD10h_1eOAGhrHPzGysvGzKc7pKO-wfKUkxkCU-jYodvZ1m8wiKDlfyHw6paSaSORwh00uWABdKHlk-WAZKh5rRTjaFVO7Rsq7tW4VLtoh0SqfCM663hBK3C9U1sGifvzn36fNXLLtpTxM0ULoEfllDYrKV7kcBF3N6EGDUwPR0oQfkrtg5Is90',
    benefits: [
      '+88.1% Cutaneous Elasticity',
      'Velvety Ocean Cloud Texture',
      '100% Waterless Bio-Juice Base',
      'Non-Comedogenic Marine Squalane',
    ],
    keyActives: [
      {
        name: 'Brittany Red Algae Extracts',
        origin: 'Brittany Emerald Coast',
        role: 'High molecular weight marine hyaluronate.',
      },
      {
        name: 'Olive-Derived Plant Squalane',
        origin: 'Mediterranean Certified Bio',
        role: 'Locks in hydration without greasy residue.',
      },
      {
        name: 'Triple Marine Peptides',
        origin: 'Deep ocean bio-synthesis',
        role: 'Firms fine expression lines and rebuilds barrier.',
      },
    ],
    usage:
      'Warm a pea-sized amount between palms and smooth gently from center of face outward. Perfect under mineral SPF or as an overnight cushion.',
    batchInfo: 'Batch #W-412 Lunar Press',
  },
  {
    id: 'pearl-veil-dew-drops',
    name: 'Pearl Veil Tinted Dew Drops',
    subtitle: 'Mineral Broad-Spectrum Barrier Defense SPF 30',
    category: 'lunar-makeup',
    tag: 'SPF 30 Mineral',
    tagColor: 'bg-[#E0BFC8]/30 text-[#27484B]',
    price: 46,
    volume: '30ml / 1.0 fl.oz',
    rating: 4.8,
    reviewCount: 210,
    description: 'Ultra-sheer lunar tint infused with crushed nacre pearls and zinc broad spectrum barrier defense.',
    extendedDescription:
      'Part skincare treatment, part ethereal veil. This clean mineral SPF 30 uses non-nano zinc oxide infused into sea kelp serum base with crushed Akoya nacre. It melts into the skin for a dewy, candlelit luster that breathes freely without settling into pores or leaving white cast.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlkVoNyhNKzR8lMqgfxKD46xcjYYnhxI70tBhyuCOtjuG5H9scyV4GNJs40WEGLFj0eh6F7e8HIT905W1RSpRs0Os6lg6TP66rQGlofbsHxg_XQqjbD2FIFI_T5eosSd2RIZFmcj4A17lWPeP3NpdPj5etzR398qmGVJD_RcuOQMN2QXNRqedfn1HechX9AfL4dqmtGc4taqL0Lx3AfnnXrILrGqPcOgec7IN1Qn5HAMwTLE-K4sgE',
    benefits: [
      'SPF 30 Broad Spectrum Non-Nano Zinc',
      'Weightless Glass Skin Sheen',
      'Blue Light & Urban Pollution Shield',
      'Flexible Self-Adjusting Ocean Pigments',
    ],
    shades: [
      { id: 'alabaster', name: 'Alabaster Pearl (Fair Neutral)', hex: '#faecd8' },
      { id: 'seashell', name: 'Seashell Dew (Light Warm)', hex: '#f1dbc3' },
      { id: 'sandbar', name: 'Sandbar Luster (Medium Golden)', hex: '#dfc0a2' },
      { id: 'driftwood', name: 'Driftwood Bronze (Tan Olive)', hex: '#be9777' },
      { id: 'reef-amber', name: 'Reef Amber (Deep Rich)', hex: '#8b6147' },
      { id: 'abyssal-stone', name: 'Abyssal Cocoa (Very Deep Warm)', hex: '#5c3e2e' },
    ],
    keyActives: [
      {
        name: 'Akoya Nacre Micronized Pearls',
        origin: 'Sustainable Pearl Farms',
        role: 'Diffuses ambient light for optical line-smoothing.',
      },
      {
        name: 'Non-Nano Zinc Oxide (14.2%)',
        origin: 'Clean Mineral Earth',
        role: 'Pure, reef-safe broad UVA/UVB defense.',
      },
      {
        name: 'Sea Fennel Stem Cells',
        origin: 'Atlantic Tide Pools',
        role: 'Soothes inflammation and inhibits sun damage.',
      },
    ],
    usage:
      'Shake bottle well. Dispense 2–3 drops onto fingers or a dense blending sponge and blend across face from high points outward for radiant coverage.',
    batchInfo: 'Batch #PV-703 Summer Solstice',
  },
  {
    id: 'tidal-glow-lip-oil',
    name: 'Tidal Glow Bio-Ferment Lip Oil',
    subtitle: 'Glass Cushion Lip Peptide & Salicornia Treatment',
    category: 'lunar-makeup',
    tag: 'New Release',
    tagColor: 'bg-[#E0BFC8]/30 text-[#27484B]',
    price: 28,
    volume: '7ml / Glass Wand',
    rating: 5.0,
    reviewCount: 92,
    description: 'Infused with coastal salicornia, oceanic botanical oils, and micro hyaluronic spheres.',
    extendedDescription:
      'A high-shine, non-sticky lip treatment engineered with coastal marsh salicornia extracts and bio-fermented sea berry oils. Features a custom cooled glass wand applicator designed to massage lips while delivering plumping marine collagen precursors.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnp0Q5iuh_OwbLhp1BiHOSG2-dAHSqzjdMSGYmZ27r2rPnPiq1YiA27REPQTT3bQOxt02pnFmAwa0uVvziuECNpwhx7uHEJyoGYbU9bEOlC7VVIJXuHJ-vn8qbxggXrKjU9Sv5L7tKSVJliCzMMlM-eu2rr6mbLyEikTIL2rKWdLyZlrDPWi87wNv520MmLQZxSeJkdVbpUQnT2PpNsAqe8jpHi3KsOCacPwoG9oqKVLIjjJN1ClN9',
    benefits: [
      'Zero Tackiness Cushion Jelly Texture',
      'Hydrates Lips for up to 10 Hours',
      'Bio-Active Plumping Peptides',
      'Refillable Opal Glass Wand Vessel',
    ],
    shades: [
      { id: 'clear-tide', name: 'Clear Tide (Glass Dew)', hex: '#e9f5f3' },
      { id: 'pink-kelp', name: 'Pink Kelp (Soft Rose)', hex: '#f0b7c3' },
      { id: 'lunar-shimmer', name: 'Lunar Shimmer (Pearl Gold)', hex: '#f7edd2' },
      { id: 'berry-brine', name: 'Berry Brine (Deep Plum)', hex: '#994f6c' },
    ],
    keyActives: [
      {
        name: 'Coastal Salicornia Extract',
        origin: 'Atlantic Marshlands',
        role: 'Boosts natural lip moisture channels by 58%.',
      },
      {
        name: 'Marine Collagen Precursors',
        origin: 'Cold Atlantic Kelp',
        role: 'Fills lip vertical micro-creases for a soft cushion look.',
      },
      {
        name: 'Sea Buckthorn Bio-Ferment',
        origin: 'Baltic Dunes',
        role: 'Deep omega-7 antioxidant nourishment.',
      },
    ],
    usage:
      'Glide the cooled glass wand tip directly over bare lips, or layer over lip contour pencil for a glassy marine reflection.',
    batchInfo: 'Batch #TG-118 High Tide',
  },
  {
    id: 'celeste-midnight-mask',
    name: 'Celeste Marine Midnight Mask',
    subtitle: 'Nocturnal Circadian Barrier Repair & Cellular Reset',
    category: 'skincare',
    tag: 'Nocturnal Ritual',
    tagColor: 'bg-[#CCD6EB]/40 text-[#27484B]',
    price: 72,
    volume: '60ml / 2.0 fl.oz',
    rating: 4.96,
    reviewCount: 188,
    description: 'Deep sea chrono-peptides, blue sea tansy, and magnesium brine for intense nocturnal repair.',
    extendedDescription:
      'A rich yet rapidly absorbing indigo gel-balm that synchronizes with the skin circadian rhythm. Blue sea tansy and deep-water extremophile peptides neutralize daytime oxidative stress and reset collagen degradation, allowing you to wake up to bouncy, dew-soaked vitality.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzqXdyZYQaFuQGCbAhWNMuDAO0QSiEyAbUdXWEOCFyVrhKpvhdMNoFurUT91rYii8E5wEMUc1E7pu_m2YkbrPnCtjK6b_qOyVGurMPzJQOvodi-uZp9zFeNDwe3qrSnbjw77E-UmG1mhhItdtdvU0TWC0FOqzXwqhKcmo7Iut6Fgu6fWXKXJHB4-QQB0HEWMLmUy4MEXZhFKGJYF3B4lxSvx_4ohxHq0F2iPVUR41jBst3qSe-s-Cp',
    benefits: [
      '+92.7% Luminosity & Tone Uniformity',
      'Nocturnal Circadian Synchronization',
      'Pillow-Proof Protective Cocoon',
      'Infused with Rare Indigo Marine Bio-Actives',
    ],
    keyActives: [
      {
        name: 'Deep Sea Chrono-Peptide',
        origin: 'Hydrothermal Vent Extremophiles',
        role: 'Accelerates overnight DNA barrier repair enzymes.',
      },
      {
        name: 'Blue Sea Tansy & Bisabolol',
        origin: 'Coastal Maritime Meadows',
        role: 'Subdues nocturnal redness and reactive irritation.',
      },
      {
        name: 'Magnesium Sea Brine Complex',
        origin: 'Celtic Sea Crystalline Salterns',
        role: 'Relaxes facial tension and supports cellular osmosis.',
      },
    ],
    usage:
      'As final ritual step before sleep, smooth a generous layer over face and neck. Let absorb for 3 minutes before resting. Cleanse with cool water in morning.',
    batchInfo: 'Batch #CM-551 Midnight Solstice',
  },
  {
    id: 'lunar-sculpting-stone',
    name: 'Celadon Tidal Sculpting Stone',
    subtitle: 'Carved Authentic Celadon Jade Acupressure Tool',
    category: 'tidal-rituals',
    tag: 'Artisan Crafted',
    tagColor: 'bg-[#8FAEA8]/20 text-[#27484B]',
    price: 38,
    volume: 'Solid Hand-Polished Jade',
    rating: 4.98,
    reviewCount: 142,
    description: 'Magnesium brine soaks, micro-kelp sculpting masks, and carved celadon tidal stones.',
    extendedDescription:
      'Custom-carved from genuine celadon sea-jade, each sculpting tool features five precision edges mirroring ocean tide movements: scalloped edge for lymphatic drainage, curved crest for cheekbones, and rounded node for acupressure tension release.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHWmr4JP3jBvsGVv_hpMaBqC3sWRtkLh51Z0cWSiLfa35DC1ClsUX6T74pK8mHPkQ76GY0dcWwxTHdAydxT4X5SOPjLq-ggGuoMyw6_jQOgRKimTMhPZ8BplFM74XrvuVUVHKbmOlaMr0jIZ7MHBqAyXo1AxlhFvzUqiBI2AFxRTp9pFZb0cfsi8m7pLzwpMlb5lQWnUjIIWTDfGHz9wvRi-MBD6eZ8H-4IOlOPiwzoihTSF6xW9sn',
    benefits: [
      'Sculpts Jawline & Lifts Cheek Contours',
      'Promotes Lymphatic Detoxification',
      'Cools on Contact to De-Puff Morning Eyes',
      'Accompanied by Organic Linen Tidal Pouch',
    ],
    keyActives: [
      {
        name: '100% Celadon Sea-Jade',
        origin: 'Sustainable Coastal Quarries',
        role: 'Retains cold temperatures naturally without refrigeration.',
      },
      {
        name: 'Ergonomic 5-Edge Wave Arc',
        origin: 'Acupressure Science',
        role: 'Engineered specifically for delicate facial topography.',
      },
    ],
    usage:
      'Pair with 3 drops of Moonlit Nectar Serum. Glide upward and outward from chin to ears, cheekbones to temples, and gently down neck.',
    batchInfo: 'Hand-Carved Limited Guild Batch',
  },
  {
    id: 'bio-pearl-infusion-mist',
    name: 'Bio-Pearl Marine Cellular Mist',
    subtitle: 'Waterless Sea-Algae Osmotic Refresh',
    category: 'skincare',
    tag: 'Spring Harvest',
    tagColor: 'bg-[#CCD6EB]/30 text-[#27484B]',
    price: 42,
    volume: '100ml / 3.4 fl.oz',
    rating: 4.87,
    reviewCount: 164,
    description: 'Pure living marine cellular water with micro-pearl suspensions to awaken and balance skin pH.',
    extendedDescription:
      'Unlike ordinary facial mists containing tap water, this formula uses 100% bio-cellular water cold-distilled from organic kelp fronds. Micro-misted to deliver bio-available minerals and amino acids before serums.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh98HyE1NGbUlYqkAIVZRODIpWkpUuREZccpaxwr-WId-ZPRgkT4P_8KUjRDRC9TROkCJTsezCtftsmcjvFqt7ZypZbpl9uNWy_hxXclaG2_w3uvE2XUMZt1W1Z_cjSE41EuzN-v8YnM1XW_w2aj4nCp_z-TwDQt3n6o8awKbYSP7l9cfAXSzdh5cGxLqmbmnQlYt2m9pph6XIiXIBTtbNupjX-8t-OBPPxOPBkW9ZvvZGnofwMFrd',
    benefits: [
      '100% Waterless Marine Base',
      'Optimizes Absorption of Subsequent Serums',
      'Subtle Coastal Botanical Fragrance',
      'TSA-Compliant Frosted Mist Bottle',
    ],
    keyActives: [
      {
        name: 'Distilled Kelp Cellular Juice',
        origin: 'Brittany UNESCO Biosphere',
        role: 'Living marine water saturated with natural trace ions.',
      },
      {
        name: 'Crushed Akoya Nacre Peptides',
        origin: 'Ethical Pearl Harvest',
        role: 'Gentle radiance booster.',
      },
    ],
    usage:
      'Mist generously over freshly cleansed skin morning, evening, or whenever hydration is needed throughout travel.',
    batchInfo: 'Batch #M-224 Spring Tide',
  },
  {
    id: 'lustrous-pearl-highlighter',
    name: 'Lustrous Nacre Compact Illuminator',
    subtitle: 'Bespoke Crushed Pearl Skin Glaze',
    category: 'lunar-makeup',
    tag: 'Award Winner',
    tagColor: 'bg-[#E0BFC8]/40 text-[#27484B]',
    price: 48,
    volume: '9g / Opal Mirrored Compact',
    rating: 4.93,
    reviewCount: 118,
    description: 'Crushed oyster pearl highlighter compact delivering soft-focus celestial radiance without glitter.',
    extendedDescription:
      'Hand-baked on terracotta tiles in small batches, this ultra-fine highlighting powder mirrors the soft sheen of moonlight reflecting off calm seawater. Melts into skin seamlessly with zero chalky fallout.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmaq2EhKO7Ejsv6WBMpSx75BUiD_YwlSc_SXrOoyXPeA80JqqQFneJUc1PjdMr_hs6omRyOm22B4ATGdccbZmuTeTB2JHHIcu3efNK2ZvbUVwJ6bXvaZ00IYyQap-lR4fsJLe1cIHZj8OL_R4wbhE-NJf_NfB8HgaeT4BR1w1QX93UOqai8W5lxQmXL5WsqRe2hDkHKyK6idagZd0wS400nKx5QgGORFtPPX2gATFzhHWuTelm07k8',
    benefits: [
      'Zero Visible Glitter Particles',
      'Infused with Sea-Pearl Conchiolin',
      'Cream-to-Silk Translucent Formula',
      'Heavyweight Opal Compact with Magnetic Latch',
    ],
    shades: [
      { id: 'celestial-opal', name: 'Celestial Opal (Soft Champagne)', hex: '#fdf6ea' },
      { id: 'rose-tide', name: 'Rose Tide (Prismatic Blush)', hex: '#fae2e5' },
      { id: 'lunar-bronze', name: 'Lunar Bronze (Golden Sunlight)', hex: '#e8c99e' },
    ],
    keyActives: [
      {
        name: 'Natural Nacre Conchiolin',
        origin: 'Sustainable Sea Harvest',
        role: 'High refractive index that catches ambient rays.',
      },
      {
        name: 'Organic Red Algae Lipids',
        origin: 'North Atlantic Reefs',
        role: 'Prevents dry powdery appearance on cheeks.',
      },
    ],
    usage:
      'Sweep across tops of cheekbones, bridge of nose, brow arches, and collarbones with fingertips or a fluffy fan brush.',
    batchInfo: 'Batch #LC-883 Harvest Archive',
  },
];

export const LUNASEA_REVIEWS: LunaSeaReview[] = [
  {
    id: 'r1',
    author: 'Elena A.',
    location: 'London',
    rating: 5,
    date: '2 days ago',
    title: 'Transformed my winter dryness',
    comment:
      'The Opal Wave cream feels like cool ocean water melting into skin without grease. I wake up with radiant, supple plumpness. Will never use standard creams again.',
    verified: true,
    productName: 'Opal Wave Multi-Peptide Cream',
  },
  {
    id: 'r2',
    author: 'Marcella R.',
    location: 'St. Barth',
    rating: 5,
    date: '1 week ago',
    title: 'The lip oil of dreams',
    comment:
      'I own dozens of prestige lip products, but Tidal Glow is uniquely cushiony. The gentle marine micro-spheres hydrate for hours without a speck of stickiness.',
    verified: true,
    productName: 'Tidal Glow Bio-Ferment Lip Oil',
  },
  {
    id: 'r3',
    author: 'Siddhartha K.',
    location: 'Vancouver',
    rating: 5,
    date: '2 weeks ago',
    title: 'Flawless, subtle pearl sheen',
    comment:
      'Dew Drops gives skin that post-seaside vacation luminescence without looking glittery or artificial. Clean ingredients that truly heal and calm sensitive skin.',
    verified: true,
    productName: 'Pearl Veil Tinted Dew Drops',
  },
  {
    id: 'r4',
    author: 'Camille D.',
    location: 'Paris',
    rating: 5,
    date: '3 weeks ago',
    title: 'Haute biotechnology at its zenith',
    comment:
      'The Moonlit Nectar serum has replaced three steps in my evening ritual. My cutaneous barrier has never looked more resilient or dewy. The frosted opal vessel is a work of art.',
    verified: true,
    productName: 'Moonlit Nectar Algae Serum',
  },
];
