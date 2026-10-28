'use client';

import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Maximize2,
  Heart,
  Droplets,
  Sparkles,
  Info,
  ShieldCheck,
  Split,
  Compass,
} from 'lucide-react';

interface AnatomyPreset {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  highlights: string[];
}

const ANATOMY_PRESETS: AnatomyPreset[] = [
  {
    id: 'muscular',
    name: 'Muscular System (MSD Manuals)',
    category: 'Full Body Musculoskeletal',
    url: 'https://human.biodigital.com/widget/?be=2PcB&background.colors=0,0,0,1,0,0,0,1&initial.hand-hint=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&ui-info=true&uaid=3YfOR',
    description:
      'Official BioDigital medical 3D model. Click any muscle to dissect and dissociate layers, revealing deep skeletal framework and connective tissue.',
    highlights: ['Interactive Muscle Dissection', 'Deep Skeletal Foundation', '360° Rotational Orbit'],
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular & Vascular Network',
    category: 'Circulatory & Blood Flow',
    url: 'https://human.biodigital.com/widget/?be=2PcB&background.colors=0,0,0,1,0,0,0,1&initial.hand-hint=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&ui-info=true&uaid=3YfOR',
    description:
      'Explore coronary circulation, aortic branching, and vascular transport of hemoglobin, platelets, and oxygen throughout the body.',
    highlights: ['Cardiac Rhythms & Output', 'Arterial & Venous Branching', 'Hematologic Biomarkers'],
  },
];

export default function Hero3DCanvas() {
  const [selectedPreset, setSelectedPreset] = useState<string>('muscular');
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentPreset =
    ANATOMY_PRESETS.find((p) => p.id === selectedPreset) || ANATOMY_PRESETS[0];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`relative w-full select-none overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen bg-[#07111F]'
          : 'h-[580px] sm:h-[640px] lg:h-[700px] rounded-3xl bg-[#07111F]'
      }`}
      aria-label="Clinical 3D Human Anatomy Model - Muscular and Skeletal Systems"
    >
      {/* Top Cybernetic Glassmorphic Control Bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-3 sm:p-4 bg-gradient-to-b from-[#07111F]/95 via-[#07111F]/80 to-transparent backdrop-blur-md flex items-center justify-between gap-3 border-b border-white/10">
        {/* Model Identifier & Medical Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0B1930] to-[#112240] border border-[#56E6F2]/40 flex items-center justify-center text-[#56E6F2] shadow-md shadow-[#56E6F2]/15 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm text-[#F7FAFF] truncate">
                Clinical Anatomy 3D
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30 shrink-0">
                BioDigital Engine
              </span>
            </div>
            <p className="text-[10px] text-[#8FA2BD] truncate hidden sm:block">
              Interactive Muscular & Skeletal Systems • Click to Dissociate / Dissect
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#0B1930] hover:bg-[#112240] text-[#56E6F2] hover:text-white border border-[#56E6F2]/30 transition-all cursor-pointer shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'View in Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading Shimmer Spinner */}
      {!isIframeLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07111F]/90 backdrop-blur-xl space-y-3 pointer-events-none">
          <div className="relative w-14 h-14">
            <div className="w-full h-full rounded-full border-2 border-t-[#56E6F2] border-r-transparent border-b-[#9B8CFF] border-l-transparent animate-spin" />
            <Activity className="w-6 h-6 text-[#56E6F2] absolute inset-0 m-auto" />
          </div>
          <p className="text-xs font-mono font-bold text-[#F7FAFF] tracking-wide">
            Initializing Clinical 3D Human Model...
          </p>
          <p className="text-[10px] text-[#8FA2BD]">
            Connecting to BioDigital Medical Anatomy Server
          </p>
        </div>
      )}

      {/* Interactive 3D BioDigital Human Iframe (Exact MSD Manuals Model) */}
      <iframe
        key={currentPreset.id}
        src={currentPreset.url}
        title={currentPreset.name}
        className="w-full h-full border-0 transition-opacity duration-700"
        style={{
          opacity: isIframeLoaded ? 1 : 0,
          background: '#000000',
        }}
        onLoad={() => setIsIframeLoaded(true)}
        loading="lazy"
        allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
        sandbox="allow-modals allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
      />

      {/* Bottom Interactive Tool Guide Banner */}
      <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#07111F]/90 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-2.5 text-xs text-[#8FA2BD]">
          <span className="p-1.5 rounded-lg bg-[#56E6F2]/10 text-[#56E6F2]">
            <Split className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] leading-tight">
            <strong className="text-[#F7FAFF]">How to Dissociate:</strong> Click the{' '}
            <strong className="text-[#56E6F2]">Dissect tool (scalpel icon)</strong> in the 3D model tools, then click any muscle to peel layers and reveal bones!
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[10px] text-[#8FA2BD] font-mono">
          <span className="inline-flex items-center gap-1 text-[#56E6F2]">
            <Compass className="w-3 h-3" />
            <span>360° Rotate</span>
          </span>
          <span>•</span>
          <span>Zoom in/out</span>
          <span>•</span>
          <span>Medical Grade</span>
        </div>
      </div>
    </div>
  );
}
