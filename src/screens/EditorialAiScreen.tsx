import React, { useState } from 'react';
import { ScreenType } from '../types';

interface EditorialAiScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const EditorialAiScreen: React.FC<EditorialAiScreenProps> = ({ onNavigate }) => {
  // Interactive weather simulation state for Hero
  const [weatherCondition, setWeatherCondition] = useState<'mild' | 'warm' | 'cool'>('mild');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isSimulatingAudit, setIsSimulatingAudit] = useState(false);

  // Interactive AI Couture Synthesizer State
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customPromptText, setCustomPromptText] = useState('');
  const [diffusionSteps, setDiffusionSteps] = useState(65);
  const [chromaWavelength, setChromaWavelength] = useState(445);
  const [drapeTension, setDrapeTension] = useState(0.85);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(100);
  const [tensorLog, setTensorLog] = useState('STATUS: Tensor weights locked (Seed #8492019). Euler-Lagrange relaxation 100% converged.');
  const [lastSynthesizedAt, setLastSynthesizedAt] = useState('2027.04.18 // SF-GPU-CLUSTER-09');

  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.zoewave.probase.kocolor&hl=en';

  const aiPrompts = [
    {
      title: 'Monolithic Scuba Trench',
      prompt: 'Oversized brutalist double-breasted coat in electric Klein hyper-cobalt scuba wool, monolithic drapery, razor shoulders, SF runway 2027',
      model: 'FashionDiffusion-v4.9 Couture Engine',
      category: 'Outerwear / Look 01',
      seed: '#98240192',
      waste: '100% Zero-Loss Voronoi Nesting',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFmsDbyw8rVR_kGIYw0SkjfDckrFXkwfSQO7QQ4UdNvSrnyhFCIMO7cnolKNKbfp0da79QMb36ZXNq20YEefY0Eizgqg_qR7LWFRwpyYN2i9jJj6eUj3IDIrTuNpNKEgqk-L9e5bXXb7He817JXeGFCkfpo6XbmqlCsV4SXBIfbVjZYd3_mPTj_4q1H01belT2B6cdvpKafm-FOUggyjh8MFwvzcdFWYuFiYOxMppgyBV8kLTVWP-Z',
      wavelength: '445 nm',
      fabric: '480gsm Bonded Scuba Wool',
    },
    {
      title: 'Acid Citron Bias Gown',
      prompt: 'Fluid yet architectural column gown in bioluminescent acid citron green, seamless algorithmic bias spiral cut',
      model: 'Neural-Drape v3.2 Silk Solver',
      category: 'Dresses / Look 14',
      seed: '#43190821',
      waste: '99.8% Zero-Waste Continuous Spiral',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbEGtBua86367BOLcgoufcDVg0dLZl5ADaSKpCNP0hwrAQTq9HngPHNMyTp7v1V_3eZnrakxFcBx--F1b7aJGFi7lQXxsIt7C8GFgNcSrIbMAXVMvVgdWIkDm_VlJsg3xKInO9vpnp60mn8vT6l6wulaRa1EqHdiOa6KaM1klC9dNesTJ_cPE7zUwthQ4f416XEh6-Kbm9nWVihN2oeybtLhelwuP1PZbgZMwBI5OmwTXxx39TYQo',
      wavelength: '555 nm',
      fabric: 'SF Atelier Raw Mulberry Silk',
    },
    {
      title: 'Solar Tangerine Moto',
      prompt: 'Cropped architectural boxy leather moto jacket in radiant solar tangerine amber, robotic laser seam etching',
      model: 'Parametric-Cuir Engine v2.1',
      category: 'Outerwear / Look 07',
      seed: '#77291034',
      waste: '100% Algorithmic Hide Surface Utilization',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmtJiAJoPZnAkGZa5LeKZ2o1axOcQWZeS-VblFwrqBLPZLsCCXphHFkZrmWIpooeeY5lFGeJfnW85U43rOQjAHM-TGPFjP2Aokfkh4l9Iq8ZDgsHma6kJ0EL1OeJ6QpaX9LnNE2726X24bvmaiqIf2U_sA200NX1LCAaqP-8e5EvomTAQR0FJmyoKbZB5kKnefps764qbqJzscx6uIj1honjvTAurSHNYHT2rF20y2VllMwWth5AWu',
      wavelength: '612 nm',
      fabric: 'LA Atelier Full-Grain Calfskin',
    },
    {
      title: 'LunaSea Marine Tint',
      prompt: 'In-silico cosmetic synthesis: crushed mother-of-pearl reflectives, giant sea kelp peptides, bare second skin veil',
      model: 'Bio-Lipid In-Silico Solver v5.0',
      category: 'Cosmetics / LunaSea & Zoe',
      seed: '#11892043',
      waste: '100% Biocompatible Zero Toxins',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFVfl6TCsA-4DdmfNX9nf7gYQ7xAroyS1uHdZSfSNOtEynbcdgVt1Wd6hi7Q2MRGe-KWyOaG8wmApl_3r4WQPd-bUZvSqm_0UI_xPIeSw-I19GNFpt0Cjfh9fQh9jXetBNx9mmBmump7nCrTsacxbI08VOmeMXAbmPcIouS-8X9qsgUVAhkq7d-bb_G6FgQNEoZdmsScBTg1ojcrPWkelLNQxVU3vH0cL2cQlC1LI4ltaER9xTyEku',
      wavelength: 'Sub-molecular Marine Light',
      fabric: 'Sugarcane Squalane & Sea Algae',
    },
  ];

  const currentSynthesizedPiece = aiPrompts[selectedPromptIndex];

  const handleRunAiSynthesis = () => {
    setIsSynthesizing(true);
    setSynthesisProgress(15);
    setTensorLog('INITIALIZING: Loading FashionDiffusion-v4.9 checkpoint into SF cluster GPU memory...');

    setTimeout(() => {
      setSynthesisProgress(45);
      setTensorLog('STEP 30/65: Sampling latent manifold... Euler-Lagrange viscoelastic relaxation running...');
    }, 400);

    setTimeout(() => {
      setSynthesisProgress(78);
      setTensorLog('STEP 55/65: Computing Voronoi planar decomposition... 64 interlocking seam nodes mapped...');
    }, 800);

    setTimeout(() => {
      setSynthesisProgress(100);
      setIsSynthesizing(false);
      setTensorLog(`SYNTHESIS COMPLETE: Seed #${Math.floor(10000000 + Math.random() * 90000000)} locked. 0.00% waste cutting path transmitted to robotic looms.`);
      setLastSynthesizedAt(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' // SF-GPU-01');
    }, 1200);
  };

  const weatherPresets = {
    mild: { temp: '68°F (20°C)', uv: '5.8 Moderate', humidity: '54%', wind: '9 mph WSW', context: 'OPTIMAL_LINEN_PERMITTED' },
    warm: { temp: '79°F (26°C)', uv: '8.4 High', humidity: '42%', wind: '6 mph S', context: 'OUTERWEAR_LOCKED_SPF50' },
    cool: { temp: '54°F (12°C)', uv: '3.1 Low', humidity: '68%', wind: '14 mph NW', context: 'OUTERWEAR_PERMITTED_COOL' },
  };

  const currentPreset = weatherPresets[weatherCondition];

  const handleRunAudit = () => {
    setIsSimulatingAudit(true);
    setTimeout(() => {
      setIsSimulatingAudit(false);
    }, 800);
  };

  const faqs = [
    {
      q: 'What makes KoColor an AI Tech Fashion House?',
      a: 'Unlike traditional fashion brands that use AI merely for moodboards or marketing, at Maison KoColor, everything is built with AI. We generate 3D silhouettes via custom diffusion models, compute 0.00% zero-waste pattern cut paths using Voronoi algorithms, engineer nanometer photon wavelengths in-silico, and formulate all cosmetics (ZoeNude and LunaSea) using bio-informatics.',
    },
    {
      q: 'How does the Voronoi Pattern Solver eliminate fabric cutting waste?',
      a: 'Standard couture drafting produces 12% to 18% discarded textile scrap. Our algorithmic Voronoi nesting engine computes interlocking polygonal tiles that cover 100.00% of the woven textile roll surface. The coordinates are exported directly to our robotic CNC lasers in San Francisco and Los Angeles.',
    },
    {
      q: 'How are ZoeNude and LunaSea cosmetics formulated with AI?',
      a: 'Every cosmetic product is conceived through in-silico molecular modeling. Our algorithms simulate the refractive index of mother-of-pearl and giant sea kelp lipids, optimizing cellular skin absorption without talc, synthetic dyes, or pore-clogging waxes.',
    },
    {
      q: 'Do I have to photograph my entire closet before using KoColor mobile app?',
      a: 'No. KoColor comes pre-wired with access to Verified Starter Packs—curated, ready-to-use vaults covering outerwear, essentials, lip lounges, and grooming rituals. You can simulate styles, test color harmonies, and explore the engine the second you open the app, adding your own garments at your own pace.',
    },
  ];

  return (
    <div className="bg-[#fcf8fb] text-[#1c1b1d] min-h-screen">
      {/* Top Banner Tag */}
      <div className="bg-[#1c1b1d] text-white px-4 py-2 text-[11px] font-mono tracking-widest uppercase flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#acf847] animate-ping"></span>
          <span className="text-[#acf847] font-bold">KOCOLOR AI TECH FASHION HOUSE</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-300">EVERYTHING IS BUILT WITH ARTIFICIAL INTELLIGENCE</span>
          <span className="text-stone-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-stone-400">LATENT DRAFTING &amp; BIO-INFORMATICS</span>
        </div>
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-3 py-0.5 rounded-xs font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 ml-4 shrink-0 transition-colors"
        >
          <span className="material-symbols-outlined text-xs">android</span>
          <span>Google Play</span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-[#e5e1e4] overflow-hidden bg-gradient-to-b from-[#fcf8fb] via-[#f7f3f6] to-[#fcf8fb]">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e1e4_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6 mb-16">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#1c1b1d] text-white text-[10px] font-mono tracking-[0.25em] uppercase rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acf847]"></span>
              AI ATELIER CORE // ARCHITECTURE VERSION 2027.4
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#1c1b1d] leading-[1.04] tracking-tight">
              We Are An AI Tech Fashion House.
            </h1>

            <p className="font-sans text-stone-600 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              <strong className="text-stone-900 font-normal">Everything in our Maison is built with AI.</strong> We replaced manual sketches with diffusion drape tensors, eliminated fabric waste with algorithmic Voronoi nesting, and formulated bioactive cosmetics in-silico.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#interactive-synthesizer"
                className="cursor-pointer bg-[#004ac6] hover:bg-[#003896] text-white px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all hover:shadow-xl hover:scale-[1.02] flex items-center gap-2.5 shadow-md"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>Test Interactive AI Synthesizer</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>

              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 font-semibold shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">android</span>
                <span>Download App on Google Play</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>

          {/* ========================================================
              INTERACTIVE AI SYNTHESIZER TOOL
              ======================================================== */}
          <div id="interactive-synthesizer" className="mt-8 mb-16 bg-[#141315] text-[#fcf8fb] border border-stone-800 p-6 sm:p-10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-stone-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#acf847] uppercase font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#acf847] animate-pulse"></span>
                  <span>AI ATELIER STUDIO // LIVE NEURAL COUTURE ENGINE</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-light text-white">
                  Synthesize a Garment or Cosmetic Formula
                </h2>
              </div>
              <div className="text-right font-mono text-[11px] text-stone-400">
                <span className="block text-stone-500 uppercase">COMPUTE CLUSTER</span>
                <span className="text-stone-300 font-semibold">{lastSynthesizedAt}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: AI Parameters & Prompts */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-stone-400 uppercase mb-2">
                    SELECT NEURAL PRESET PROMPT:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {aiPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPromptIndex(idx)}
                        className={`cursor-pointer p-3 text-left border rounded-xs font-mono text-xs transition-all ${
                          selectedPromptIndex === idx
                            ? 'border-[#004ac6] bg-[#004ac6]/20 text-white font-bold'
                            : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <span className="block text-[10px] text-[#acf847] uppercase tracking-wider">{p.category}</span>
                        <span className="mt-0.5 block truncate text-stone-200">{p.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-950 p-4 border border-stone-800/80 rounded-xs space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase block">
                    ACTIVE GENERATION PROMPT:
                  </span>
                  <p className="font-sans text-xs text-stone-300 italic leading-relaxed">
                    "{currentSynthesizedPiece.prompt}"
                  </p>
                </div>

                {/* Sliders */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-stone-400 uppercase">DIFFUSION STEPS:</span>
                      <span className="text-[#acf847] font-bold">{diffusionSteps} STEPS</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={diffusionSteps}
                      onChange={(e) => setDiffusionSteps(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#acf847]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-stone-400 uppercase">CHROMA WAVELENGTH:</span>
                      <span className="text-blue-400 font-bold">{chromaWavelength} NM</span>
                    </div>
                    <input
                      type="range"
                      min="420"
                      max="680"
                      value={chromaWavelength}
                      onChange={(e) => setChromaWavelength(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#004ac6]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-stone-400 uppercase">DRAPE TENSION FACTOR:</span>
                      <span className="text-[#fd761a] font-bold">{drapeTension.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={drapeTension}
                      onChange={(e) => setDrapeTension(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#fd761a]"
                    />
                  </div>
                </div>

                {/* Synthesis Trigger Button */}
                <button
                  onClick={handleRunAiSynthesis}
                  disabled={isSynthesizing}
                  className={`w-full py-4 px-6 rounded-xs font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                    isSynthesizing
                      ? 'bg-stone-800 text-stone-500 cursor-wait'
                      : 'bg-[#acf847] hover:bg-[#9de437] text-stone-950 hover:scale-[1.01]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isSynthesizing ? 'autorenew' : 'bolt'}
                  </span>
                  <span>{isSynthesizing ? 'Synthesizing Latent Tensors...' : 'Run Neural AI Synthesis'}</span>
                </button>
              </div>

              {/* Right Column: Synthesis Results & Live Telemetry Output */}
              <div className="lg:col-span-7 bg-stone-950 border border-stone-800 p-6 rounded-xs space-y-6">
                {/* Progress Bar & Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400 uppercase flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSynthesizing ? 'bg-[#acf847] animate-ping' : 'bg-[#004ac6]'}`} />
                      <span>{isSynthesizing ? 'TENSOR COMPUTATION IN PROGRESS' : 'AI SYNTHESIS READY'}</span>
                    </span>
                    <span className="text-[#acf847] font-bold">{synthesisProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#004ac6] via-[#acf847] to-[#fd761a] transition-all duration-300"
                      style={{ width: `${synthesisProgress}%` }}
                    />
                  </div>
                  <div className="p-2.5 bg-stone-900 border border-stone-800 text-[10px] font-mono text-stone-400 truncate">
                    {tensorLog}
                  </div>
                </div>

                {/* Synthesized Output Display */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                  {/* Generated Visual */}
                  <div className="sm:col-span-5 relative aspect-[3/4] bg-stone-900 rounded-xs overflow-hidden border border-stone-800 group">
                    <img
                      src={currentSynthesizedPiece.image}
                      alt={currentSynthesizedPiece.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-[#1c1b1d]/90 px-2 py-0.5 text-[9px] font-mono text-[#acf847] uppercase border border-white/10">
                      AI GENERATED
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md p-2 text-[10px] font-mono text-white text-center border border-white/10">
                      SEED: {currentSynthesizedPiece.seed}
                    </div>
                  </div>

                  {/* Metadata Matrix */}
                  <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-400">
                        <span>{currentSynthesizedPiece.category}</span>
                        <span className="text-[#acf847] font-semibold">{currentSynthesizedPiece.wavelength}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-white">
                        {currentSynthesizedPiece.title}
                      </h3>
                      <div className="space-y-2 text-xs font-mono text-stone-300">
                        <div className="flex justify-between border-b border-stone-800 pb-1.5">
                          <span className="text-stone-500 uppercase">MODEL ENGINE:</span>
                          <span className="text-white font-medium">{currentSynthesizedPiece.model}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-800 pb-1.5">
                          <span className="text-stone-500 uppercase">FABRIC / CARRIER:</span>
                          <span className="text-stone-200">{currentSynthesizedPiece.fabric}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-800 pb-1.5">
                          <span className="text-stone-500 uppercase">WASTE EFFICIENCY:</span>
                          <span className="text-[#acf847] font-bold">{currentSynthesizedPiece.waste}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-800 pb-1.5">
                          <span className="text-stone-500 uppercase">CUT COORDINATES:</span>
                          <span className="text-stone-300">CNC Laser Ready (SF &amp; LA)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (currentSynthesizedPiece.category.includes('Cosmetics')) {
                            onNavigate('cosmetics');
                          } else {
                            onNavigate('apparel');
                          }
                        }}
                        className="cursor-pointer bg-white hover:bg-[#acf847] text-stone-950 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>View In Collection</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                      <span className="text-[10px] font-mono text-stone-500 uppercase">
                        100% AI BUILT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Direction: Split-Screen Interactive Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Left Column: Raw Environmental Telemetry & Wardrobe DNA */}
            <div className="lg:col-span-6 bg-white border border-[#decbb7] p-6 sm:p-8 rounded-sm shadow-xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#004ac6] font-bold">
                      [01] ENVIRONMENTAL &amp; PROFILE TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase bg-stone-100 px-2 py-0.5">
                    LIVE SENSOR FEED
                  </span>
                </div>

                {/* Weather simulator tabs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-stone-500 uppercase">SIMULATE LOCAL METRICS:</span>
                    <span className="text-stone-900 font-bold uppercase">{weatherCondition}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['mild', 'warm', 'cool'] as const).map((cond) => (
                      <button
                        key={cond}
                        onClick={() => setWeatherCondition(cond)}
                        className={`cursor-pointer py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                          weatherCondition === cond
                            ? 'bg-[#1c1b1d] text-white border-[#1c1b1d] font-bold'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sensor Metrics Readout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="bg-[#fcf8fb] p-3 border border-stone-200/80">
                    <span className="text-[9px] text-stone-500 block uppercase">LOCAL TEMP</span>
                    <span className="text-base font-bold text-stone-950 mt-1 block">
                      {currentPreset.temp}
                    </span>
                  </div>
                  <div className="bg-[#fcf8fb] p-3 border border-stone-200/80">
                    <span className="text-[9px] text-stone-500 block uppercase">UV INDEX</span>
                    <span className="text-base font-bold text-[#fd761a] mt-1 block">
                      {currentPreset.uv}
                    </span>
                  </div>
                  <div className="bg-[#fcf8fb] p-3 border border-stone-200/80">
                    <span className="text-[9px] text-stone-500 block uppercase">HUMIDITY</span>
                    <span className="text-base font-bold text-stone-950 mt-1 block">
                      {currentPreset.humidity}
                    </span>
                  </div>
                  <div className="bg-[#fcf8fb] p-3 border border-stone-200/80">
                    <span className="text-[9px] text-stone-500 block uppercase">WIND SPEED</span>
                    <span className="text-base font-bold text-stone-950 mt-1 block">
                      {currentPreset.wind}
                    </span>
                  </div>
                </div>

                {/* User Wardrobe DNA Card */}
                <div className="bg-[#1c1b1d] text-white p-5 rounded-xs space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#acf847] uppercase">
                    <span>USER APPEARANCE &amp; WARDROBE DNA</span>
                    <span>PROFILE #741</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-stone-400 block uppercase">BIAS</span>
                      <span className="text-white font-bold mt-0.5 block">Warm-Biased</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 block uppercase">PALETTE DEPTH</span>
                      <span className="text-white font-bold mt-0.5 block">Medium Depth</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 block uppercase">CONTRAST TIER</span>
                      <span className="text-[#acf847] font-bold mt-0.5 block">High Contrast</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 text-[11px] font-mono flex items-center justify-between text-stone-300">
                    <span>ROTATION HEALTH: 88 / 100</span>
                    <span className="text-[#acf847]">42 VAULT ITEMS INDEXED</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>PIPELINE LATENCY: &lt; 60 MILLISECONDS</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  READY TO SYNTHESIZE
                </span>
              </div>
            </div>

            {/* Right Column: Finalized Cohesive Ensemble & Fashionista Score */}
            <div className="lg:col-span-6 bg-white border border-[#decbb7] p-6 sm:p-8 rounded-sm shadow-xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#acf847]"></span>
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
                      [02] SYNTHESIZED EDITORIAL ENSEMBLE
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-[#acf847]/20 border border-[#acf847] px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#102000] font-bold">
                    <span>SCORE: 96.8 / 100</span>
                    <span className="material-symbols-outlined text-xs">verified</span>
                  </div>
                </div>

                {/* Ensemble Preview Cards */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {/* Top */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] text-[#004ac6] uppercase font-bold block">TOP // LINEN BUTTON-DOWN</span>
                    <h4 className="font-serif text-sm font-medium text-stone-900 mt-1">Universal Khaki</h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">European Flax • 190gsm</p>
                    <span className="text-[9px] text-stone-400 mt-2 block">Compatibility: 0.98</span>
                  </div>

                  {/* Bottom */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] text-[#004ac6] uppercase font-bold block">BOTTOM // CULOTTES</span>
                    <h4 className="font-serif text-sm font-medium text-stone-900 mt-1">Melodious Ivory</h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">100% Belgian Linen • Fluid</p>
                    <span className="text-[9px] text-stone-400 mt-2 block">Compatibility: 0.96</span>
                  </div>

                  {/* Footwear */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] text-[#fd761a] uppercase font-bold block">ANCHOR // ANKLE BOOTS</span>
                    <h4 className="font-serif text-sm font-medium text-stone-900 mt-1">Camel Suede</h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">Wood Block Heel • Weatherproof</p>
                    <span className="text-[9px] text-stone-400 mt-2 block">Anchor Weight: 4.0 / 4.0</span>
                  </div>

                  {/* Cosmetics Palette */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] text-[#8d6e5a] uppercase font-bold block">BEAUTY // 4-STEP PALETTE</span>
                    <h4 className="font-serif text-sm font-medium text-stone-900 mt-1">Starlight Glow + Lip</h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">Warm Mineral Nude Palette</p>
                    <span className="text-[9px] text-stone-400 mt-2 block">Tone Match: 0.933</span>
                  </div>
                </div>

                {/* Fashionista Evaluation Card */}
                <div className="p-4 bg-[#fcf8fb] border border-stone-200 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-[10px] uppercase text-stone-500">
                    <span>FASHIONISTA MULTI-VECTOR AUDIT</span>
                    <span className="text-emerald-700 font-bold">STATUS: APPROVED</span>
                  </div>

                  {/* Score Bars */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>COLOR HARMONY</span>
                        <span className="font-bold text-[#004ac6]">98.0 / 100</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#004ac6] h-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>SILHOUETTE PROPORTION</span>
                        <span className="font-bold text-[#fd761a]">95.0 / 100</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#fd761a] h-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>CONTRAST &amp; DEPTH MATCH</span>
                        <span className="font-bold text-[#3a5f00]">97.4 / 100</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#3a5f00] h-full" style={{ width: '97.4%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-500">VERIFIED EDITORIAL AI SCORE</span>
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-xs font-mono text-[#004ac6] hover:underline uppercase tracking-wider font-bold flex items-center gap-1"
                >
                  <span>Experience in App</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The KoColor Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5e1e4]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
            // THE KOCOLOR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 leading-tight">
            Stop Guessing. Start Synthesizing.
          </h2>
          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed">
            Most styling apps rely on basic randomizers or ungrounded AI that hallucinates outfits
            unsuitable for the weather outside. KoColor is built differently.
          </p>
          <div className="p-8 bg-stone-100 border-l-4 border-[#004ac6] text-left text-sm sm:text-base font-sans text-stone-800 leading-relaxed italic shadow-sm">
            "Engineered from the ground up using a <strong className="font-bold text-stone-950 not-italic">Deterministic-First Pipeline</strong>,
            KoColor never asks AI to guess what works. Instead, our local mathematical engine prunes
            your wardrobe based on real-time weather, occasion, garment freshness, and chromatic
            harmony <em className="italic">before</em> a single AI token is ever used. Generative AI
            is then strictly tasked with the final creative mile: weaving your highest-scoring
            candidates into an editorial look with a clear, transparent rationale."
          </div>
        </div>
      </section>

      {/* How the Engine Works: The 60-Millisecond Pipeline */}
      <section id="engine-architecture" className="py-24 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
              // PIPELINE ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              How the Engine Works: The 60-Millisecond Pipeline
            </h2>
            <p className="text-stone-400 text-sm font-sans">
              From atmospheric sensor telemetry to mathematically scored editorial recommendations
              in the blink of an eye.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-stone-950 border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-[#acf847] transition-colors">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#acf847] uppercase block">
                  STEP 01 // 12ms
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  Environmental &amp; Circadian Telemetry
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Before you open your closet, KoColor evaluates hyper-local atmospheric temperature,
                  humidity, wind, and hourly UV index forecasts.
                </p>
                <ul className="text-[11px] font-mono text-stone-300 space-y-1.5 pt-2 border-t border-stone-800/80">
                  <li>• <strong className="text-white">Thermal Enforcement:</strong> Locks or unlocks outerwear permissions.</li>
                  <li>• <strong className="text-white">Circadian Defense:</strong> Aligns SPF, prep, and hydration with UV telemetry.</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-950 border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-[#004ac6] transition-colors">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#004ac6] uppercase block">
                  STEP 02 // 24ms
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  Anchor Establishment &amp; Deterministic Pruning
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Establishes a high-priority Context Anchor based on freshness and thermal context,
                  evaluating candidate items against mathematical algorithms.
                </p>
                <ul className="text-[11px] font-mono text-stone-300 space-y-1.5 pt-2 border-t border-stone-800/80">
                  <li>• <strong className="text-white">Rotation Health (0–100):</strong> Prevents wardrobe fatigue.</li>
                  <li>• <strong className="text-white">Mathematical Scoring:</strong> Ranks items 0.00 to 1.00 on chroma &amp; depth.</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-950 border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-[#fd761a] transition-colors">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#fd761a] uppercase block">
                  STEP 03 // 14ms
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  Harmonic AI Synthesis
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Once candidates are mathematically isolated, generative AI synthesizes the final
                  editorial composition with full cosmetic alignment.
                </p>
                <ul className="text-[11px] font-mono text-stone-300 space-y-1.5 pt-2 border-t border-stone-800/80">
                  <li>• <strong className="text-white">Full Wardrobe Rig:</strong> Top, Bottom, Shoes, Outerwear.</li>
                  <li>• <strong className="text-white">Cosmetics Blueprint:</strong> Eye, Cheek, Lip, Prep, and Nail synergy.</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-stone-950 border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-[#acf847] transition-colors">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#acf847] uppercase block">
                  STEP 04 // 10ms
                </span>
                <h3 className="font-serif text-xl font-normal text-white">
                  The Fashionista Audit
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Every recommendation must pass an on-device grading audit across three strict
                  stylistic vectors before reaching your screen.
                </p>
                <ul className="text-[11px] font-mono text-stone-300 space-y-1.5 pt-2 border-t border-stone-800/80">
                  <li>• <strong className="text-white">Color Harmony:</strong> Hex undertone alignment.</li>
                  <li>• <strong className="text-white">Silhouette &amp; Depth:</strong> Structural proportion validation.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Matrix */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5e1e4]">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
            // SPECIFICATION MATRIX
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
            Core Platform Capabilities
          </h2>
          <p className="text-stone-600 text-sm font-sans">
            Engineered as a robust relational style operating system combining apparel, grooming,
            and appearance telemetry.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-stone-200 bg-white shadow-sm text-xs font-sans">
            <thead className="bg-[#1c1b1d] text-white font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 border-r border-stone-800 w-1/4">Feature</th>
                <th className="p-4 border-r border-stone-800 w-1/2">What It Does</th>
                <th className="p-4 w-1/4">Why It Matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-mono font-bold text-stone-900 border-r border-stone-100">
                  Unified Style &amp; Beauty Vaults
                </td>
                <td className="p-4 text-stone-700 leading-relaxed border-r border-stone-100">
                  Manages apparel alongside grooming, skincare prep, fragrance, lip, eye, cheek, and nail inventories in one relational database.
                </td>
                <td className="p-4 text-stone-600 font-mono text-[11px]">
                  Your clothes and cosmetics don't exist in silos. KoColor ensures your lip stain and nail lacquer harmonize with your sweater's weave.
                </td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-mono font-bold text-stone-900 border-r border-stone-100">
                  Appearance Telemetry
                </td>
                <td className="p-4 text-stone-700 leading-relaxed border-r border-stone-100">
                  Profiles your personal color metrics across Temperature, Depth, and Contrast.
                </td>
                <td className="p-4 text-stone-600 font-mono text-[11px]">
                  Prevents your wardrobe from washing you out by biasing selections toward your natural undertones.
                </td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-mono font-bold text-stone-900 border-r border-stone-100">
                  Cryptographic Starter Packs
                </td>
                <td className="p-4 text-stone-700 leading-relaxed border-r border-stone-100">
                  Instant, edge-cached <code className="bg-stone-100 px-1 py-0.5 rounded text-[10px]">.kpkg</code> capsule collections (<em>The Outerwear Vault</em>, <em>The Lip Lounge</em>, <em>Grooming Rituals</em>, <em>Biological Hygiene</em>).
                </td>
                <td className="p-4 text-stone-600 font-mono text-[11px]">
                  Test the engine immediately or build a wishlist using cryptographically signed, ultra-fast capsule libraries.
                </td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-mono font-bold text-stone-900 border-r border-stone-100">
                  The KoColor Audit Trail
                </td>
                <td className="p-4 text-stone-700 leading-relaxed border-r border-stone-100">
                  A transparent, expandable diagnostic receipt attached to every generated outfit.
                </td>
                <td className="p-4 text-stone-600 font-mono text-[11px]">
                  See the exact math behind why an item was chosen, its compatibility score, and the AI's material rationale.
                </td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-mono font-bold text-stone-900 border-r border-stone-100">
                  Offline-First "Local Architect"
                </td>
                <td className="p-4 text-stone-700 leading-relaxed border-r border-stone-100">
                  Multi-tier cloud AI failover backed by an on-device deterministic fallback engine.
                </td>
                <td className="p-4 text-stone-600 font-mono text-[11px]">
                  Whether you are in a subway tunnel or on a flight, KoColor generates approved, mathematically sound outfits with zero latency.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature Spotlight: Inside the Vaults */}
      <section className="py-24 bg-stone-100 border-b border-[#e5e1e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#fd761a] uppercase font-bold">
              // VAULT ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
              Inside the Vaults
            </h2>
            <p className="text-stone-600 text-sm font-sans">
              Indexing high-precision physical attributes across both textile garments and cosmetic
              skincare formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Apparel Intelligence */}
            <div className="bg-white border border-stone-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#004ac6] text-3xl">checkroom</span>
                <div>
                  <h3 className="font-serif text-2xl font-light text-stone-900">Apparel Intelligence</h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">FABRIC, COLOR &amp; THERMAL METRICS</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                From 100% cotton gabardine trench coats to mulberry silk blouses, KoColor tracks more
                than just photos. Our compact manifest system indexes material composition, hex color
                codes, thermal weight, and contrast profiles.
              </p>

              <div className="p-4 bg-stone-50 border border-stone-200 text-xs font-mono space-y-2">
                <span className="text-[#004ac6] font-bold block uppercase text-[10px]">
                  WARDROBE DNA METRICS
                </span>
                <p className="text-stone-700 font-sans">
                  Instantly see if your closet is <em>Neutral-led</em>, <em>Warm-biased</em>, or <em>High-Chroma</em>,
                  and discover the exact <strong>Anchor Versatility Target</strong> (how many compatible
                  looks a single item can unlock).
                </p>
              </div>
            </div>

            {/* Cosmetics, Grooming & Prep */}
            <div className="bg-white border border-stone-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8d6e5a] text-3xl">spa</span>
                <div>
                  <h3 className="font-serif text-2xl font-light text-stone-900">Cosmetics, Grooming &amp; Prep</h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">BEAUTY AS A FIRST-CLASS CITIZEN</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Beauty is treated as a first-class citizen in the styling equation. KoColor categorizes
                and scores your daily products by finish (Satin, Matte, High-Shine), undertone, and
                functional role:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-stone-50 border border-stone-200">
                  <strong className="text-stone-950 font-bold">• Color Cosmetics:</strong> Precision matching across Eye, Cheek, Lip, and Nail roles.
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200">
                  <strong className="text-stone-950 font-bold">• Prep &amp; Complexion:</strong> Cleansers, vitamin C serums, peptide eye creams, primers, and foundations.
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200">
                  <strong className="text-stone-950 font-bold">• Grooming &amp; Hygiene:</strong> Conditioning beard oils, post-shave recovery balms, botanical bars, and signature fragrances.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Intelligence: The Audit Trail Terminal Component */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold bg-[#1c1b1d] px-3 py-1 text-white">
            // TRANSPARENT INTELLIGENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
            The KoColor Audit Trail
          </h2>
          <p className="text-stone-600 text-sm font-sans">
            Every outfit generation generates a verifiable diagnostic receipt showing the exact
            math, compatibility scoring, and material rationale.
          </p>
        </div>

        {/* Retro-modern Terminal Card */}
        <div className="bg-[#1c1b1d] text-stone-200 rounded-sm border border-stone-700 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="bg-stone-900 px-4 py-3 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-stone-400 text-[11px] uppercase tracking-wider">
                KOCOLOR-ENGINE // DIAGNOSTIC_RECEIPT_V2.log
              </span>
            </div>
            <button
              onClick={handleRunAudit}
              className="cursor-pointer text-[10px] uppercase tracking-wider text-[#acf847] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">refresh</span>
              <span>{isSimulatingAudit ? 'Recalculating...' : 'Run Simulation'}</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div className={`p-6 sm:p-8 space-y-6 text-stone-300 leading-relaxed ${isSimulatingAudit ? 'opacity-50 transition-opacity' : 'opacity-100'}`}>
            {/* Header */}
            <div className="border-b border-stone-800 pb-3 text-stone-400">
              <span className="text-[#acf847] font-bold">&gt;&gt; KOCOLOR AUDIT TRAIL</span>
              <span className="block text-[11px] text-stone-500 mt-0.5">TIMESTAMP: 2027-04-18T08:14:22Z • LATENCY: 48ms • CLOUD_AI: SYNTHESIZED</span>
            </div>

            {/* Step 1 */}
            <div className="space-y-1">
              <div className="text-[#004ac6] font-bold">[1] COMPOSITION POLICY</div>
              <p>• <strong className="text-white">Required:</strong> TOP + BOTTOM + SHOES</p>
              <p>• <strong className="text-white">Outerwear:</strong> OPTIONAL_IF_ENVIRONMENTALLY_REQUIRED (Reason: Thermal context = COOL, UV = MODERATE)</p>
            </div>

            {/* Step 2 */}
            <div className="space-y-1 border-t border-stone-800/80 pt-4">
              <div className="text-[#fd761a] font-bold">[2] ANCHOR ESTABLISHMENT</div>
              <p>• <strong className="text-white">Selected Anchor:</strong> Camel Ankle Boots (100% Suede, Wood Block Heel)</p>
              <p>• <strong className="text-white">Priority:</strong> 4.00 / 4.00 — <em>Highest context, freshness, and thermal compatibility score.</em></p>
            </div>

            {/* Step 3 */}
            <div className="space-y-1 border-t border-stone-800/80 pt-4">
              <div className="text-[#acf847] font-bold">[3] MATHEMATICAL SCORING (TOP CANDIDATES)</div>
              <p>• <span className="text-white">Melodious Ivory Culottes (100% Linen):</span> <span className="text-[#acf847] font-bold">0.98 / 1.00</span> Compatibility</p>
              <p>• <span className="text-white">Universal Khaki Button-Down (European Flax):</span> <span className="text-[#acf847] font-bold">0.92 / 1.00</span> Compatibility</p>
              <p>• <span className="text-white">Earth Volume Mascara:</span> <span className="text-[#acf847] font-bold">0.933 / 1.000</span> Relational Temperature Match</p>
              <p>• <span className="text-white">Starlight Liquid Glow:</span> <span className="text-[#acf847] font-bold">0.933 / 1.000</span> Relational Temperature Match</p>
            </div>

            {/* Step 4 */}
            <div className="space-y-1 border-t border-stone-800/80 pt-4">
              <div className="text-blue-400 font-bold">[4] AI AESTHETIC RATIONALE</div>
              <p className="italic text-stone-200 bg-stone-900/80 p-3 border-l-2 border-blue-400">
                "The combination of the European flax khaki button-down and ivory linen culottes creates a sophisticated, neutral-toned base aligned with medium depth telemetry. The camel suede boots provide a warm, grounded anchor, while the selected cosmetics maintain a muted, balanced aesthetic that complements the natural textures."
              </p>
            </div>

            {/* Step 5 */}
            <div className="space-y-1 border-t border-stone-800/80 pt-4">
              <div className="text-emerald-400 font-bold">[5] FASHIONISTA EVALUATION</div>
              <p>• <strong className="text-white">Color Harmony:</strong> 98.0 / 100</p>
              <p>• <strong className="text-white">Silhouette:</strong> 75.0 / 100</p>
              <p>• <strong className="text-white">Contrast &amp; Depth:</strong> 80.0 / 100</p>
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-between mt-2">
                <span>FINAL SCORE: 85.4 / 100</span>
                <span>STATUS: APPROVED ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Speed. Engineered for Privacy. */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
              // SECURITY &amp; SPEED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
              Built for Speed. Engineered for Privacy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">encrypted</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900">Local-First Storage</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Your personal wardrobe inventory, wear history, and appearance telemetry live locally
                on your device. No unwanted cloud scraping of your private photos.
              </p>
            </div>

            <div className="bg-white p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#fd761a]/10 text-[#fd761a] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">shield</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900">Zero-Knowledge Cloud Routing</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                When cloud AI synthesis is invoked, KoColor communicates via anonymous authentication
                tokens and hardware-verified Play Integrity checks. We never sell your style data.
              </p>
            </div>

            <div className="bg-white p-6 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#acf847]/20 text-[#3a5f00] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">bolt</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900">Sub-Second Edge Delivery</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Powered by Zstandard (<code>zstd</code>) binary compression and <code>ed25519</code> cryptographic
                signature verification, style packs download in milliseconds and verify locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#004ac6] uppercase font-bold">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-[#004ac6] transition-colors pr-4">
                  {faq.q}
                </span>
                <span className="material-symbols-outlined text-stone-500 text-lg shrink-0">
                  {activeFaq === idx ? 'remove' : 'add'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="pt-3 text-stone-600 text-sm font-sans leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 bg-[#1c1b1d] text-white text-center border-t border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#004ac6]/20 via-transparent to-[#fd761a]/20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#acf847] uppercase font-bold">
            // ELEVATE YOUR DAILY LOOK
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Ready to Upgrade Your Daily Ritual?
          </h2>

          <p className="font-sans text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Experience the intersection of deterministic color science and generative styling.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer bg-[#acf847] hover:bg-[#9de437] text-stone-950 px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:scale-[1.02] inline-flex items-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined text-base">android</span>
              <span>Download KoColor on Google Play</span>
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>

            <button
              onClick={() => onNavigate('runway-ss25')}
              className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <span>Explore Runway &amp; Trench</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-stone-500 tracking-wider pt-6 uppercase">
            © 2027 ZoeWave / KoColor Atelier Engineering. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};
