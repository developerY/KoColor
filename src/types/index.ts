export type ScreenType =
  | 'home'
  | 'apparel'
  | 'cosmetics'
  | 'tech'
  | 'about'
  | 'color-editions'
  | 'runway-ss25'
  | 'kocolor-ai'
  | 'product-detail';

export type CurrencyType = 'USD' | 'EUR' | 'JPY';

export interface Product {
  id: string;
  name: string;
  category: string;
  lookNumber: string;
  price: number;
  hue: 'cobalt' | 'lime' | 'tangerine' | 'monochrome' | 'magenta';
  hueName: string;
  hueHex: string;
  material: string;
  materialProvenance: string;
  silhouette: 'outerwear' | 'tailoring' | 'knitwear' | 'dresses';
  description: string;
  image: string;
  alt: string;
  badges?: { text: string; bgClass: string; textClass: string }[];
  sizes: string[];
  stockInfo?: string;
  colorOptions: { name: string; hex: string; borderRingClass?: string }[];
  aiModel?: string;
  aiPrompt?: string;
  aiLatentSeed?: string;
  aiWasteOptimization?: string;
  aiDrapePhysics?: string;
}

export interface RunwayLook {
  id: string;
  lookKey: string;
  lookNumber: string;
  lookBadge: string;
  subBadge: string;
  subBadgeBg: string;
  subBadgeText: string;
  category: string;
  code: string;
  title: string;
  description: string;
  estimatedPrice: number;
  image: string;
  alt: string;
  notes: string;
  aiModel?: string;
  aiPrompt?: string;
  aiLatentSeed?: string;
  aiGenerationTime?: string;
  aiWasteReduction?: string;
  components: {
    name: string;
    fabric: string;
    price: string;
  }[];
}

export interface BagItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}
