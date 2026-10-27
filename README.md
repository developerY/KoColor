# KoColor Maison • AI Tech Fashion House

> **SF & LA** • Algorithmic Haute Couture, Generative Silhouettes, and In-Silico Bio-Cosmetics.  
> Everything built with AI.

---

## Overview

**KoColor** is an AI Tech Fashion House engineered at the intersection of generative artificial intelligence, computational fluid dynamics, and modern couture. Operating out of ateliers and neural compute labs in **San Francisco (Neural Compute)** and **Los Angeles (Parametric Atelier)**, KoColor synthesizes high-fashion silhouettes, pigment recipes, zero-waste cutting vectors, and bio-cosmetic formulations directly from latent space.

---

## Core Collections & Experiences

### 1. `01 / Prologue`
- **Generative Editorial Showcase**: Living visual catalog of AI-synthesized hero pieces (such as the *Yves Neural Trench*).
- **Architecture Live Metrics**: Real-time telemetry tracking algorithmic iterations, 0% cutting waste benchmarks, and in-silico formulations.
- **Continuous Living Runway**: Embedded high-definition runway stream paired with SF & LA presentations.

### 2. `02 / Apparel`
- **Algorithmic Runway**: 32 statuesque looks staged across brutalist architectural landmarks.
- **Chromatic Color Editions**: High-chroma saturated palettes with zero-toxicity botanical dye parameters.
- **Piece Deconstruction**: Deep inspection of garment seeds, Voronoi pattern nesting, and technical seam specifications.

### 3. `03 / Cosmetics`
A dual-label bio-cosmetic ecosystem formulated via in-silico molecular modeling:
- **ZoeNude (Barely-There)**: Weightless second-skin fluid tints, crushed mother-of-pearl mineral reflectives, and lip cushion dews in sugarcane squalane.
- **LunaSea (Marine Cellular Biotechnology)**: Cold-extracted kelp bio-ferments and bio-pearl peptides across curated capsules:
  - *Skincare*: Tidal essences and ocean cloud hydration.
  - *Lustrous Makeup*: Deep-linkable collection of pearl dew tints, ocean-glass lip peptides, and soft iridescent illuminators.
  - *Tidal Rituals*: Magnesium brine soaks and micro-kelp sculpting masks.
  - *Algae Science & INCI*: Peer-reviewed botanical active disclosures.
  - *About & Harvest*: Sustainable wild harvesting protocols in Brittany.

### 4. `04 / AI`
- **Neural Pattern Synthesizer**: Interactive prompt matrix and couture diffusion explorer.
- **Deterministic Color Matrix**: Nanometer-level spectral color matching and biological dye calibrations.

### 5. `05 / Manifesto`
- **AI Maison Governance**: Sustainable zero-waste manifesto, algorithmic pattern nesting disclosures, and atelier philosophy.

---

## Technical Highlights

- **Modern Deep-Link Routing**: Lightweight HTML5 History API router enabling direct URL sharing and copy/paste functionality for every section and sub-capsule (e.g., `/cosmetics?brand=lunasea&tab=lunar-makeup`, `/apparel?tab=runway`).
- **Real-Time Currency Conversion**: Multi-currency engine (USD, EUR, GBP, JPY, CAD, AUD, CHF) with live price calculation across all products.
- **Global Search**: Command palette keyboard listener (`⌘K` / `Ctrl+K`) for indexing looks, formulations, and archival garments.
- **Archival Shopping Bag & Wishlist**: Persistent cart and curation drawers with real-time tallying and quantity controls.
- **Responsive Video Broadcast**: Dedicated 4K video theater view and floating dock launcher (`VIDEO [0:31]`).

---

## Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Typography**: [Lucide React](https://lucide.dev/), [Google Material Symbols](https://fonts.google.com/icons), Playfair Display & JetBrains Mono
- **Animations**: [Motion](https://motion.dev/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` (version 9+ or 10+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/developerY/LunaSea.git
cd LunaSea
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Type Checking & Linting

Validate TypeScript types without emitting build artifacts:

```bash
npm run lint
```

### Production Build

Compile and bundle for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
├── public/                 # Static assets, branding, and images
├── src/
│   ├── components/         # Reusable UI components & modals
│   │   ├── Header.tsx      # Top luxury navigation & currency switcher
│   │   ├── Footer.tsx      # Atelier credits & guild newsletter
│   │   ├── LunaSeaPage.tsx # LunaSea marine bio-cosmetics experience
│   │   ├── ScreenSwitcherBar.tsx # Floating quick-nav bar & video launcher
│   │   ├── VideoStreamModal.tsx  # 4K runway broadcast player
│   │   ├── QuickViewModal.tsx    # Product quick-view modal
│   │   └── SearchModal.tsx       # ⌘K Command palette search
│   ├── data/
│   │   ├── mockData.ts     # Apparel, runway looks & currency rates
│   │   └── lunaseaData.ts  # LunaSea formulations, shades & reviews
│   ├── screens/
│   │   ├── HomeScreen.tsx          # 01 / Prologue
│   │   ├── ApparelScreen.tsx       # 02 / Apparel
│   │   ├── CosmeticsScreen.tsx     # 03 / Cosmetics (ZoeNude & LunaSea)
│   │   ├── TechScreen.tsx          # 04 / AI
│   │   └── AboutScreen.tsx         # 05 / Manifesto
│   ├── utils/
│   │   └── router.ts       # Route parser, canonical URL generator & clipboard utilities
│   ├── types.ts            # Global TypeScript interface definitions
│   ├── App.tsx             # Root application orchestrator
│   └── main.tsx            # Application entrypoint
├── package.json            # Scripts & project dependencies
└── vite.config.ts          # Vite build configuration
```

---

## License

This project is licensed under a **Source Available** license. All rights reserved by KoColor Maison. 

The source code is provided for inspection, reference, and educational evaluation only. Unauthorized reproduction, distribution, sublicensing, or commercial deployment without explicit written permission is strictly prohibited.
