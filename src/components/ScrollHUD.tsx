'use client';

import React, { useEffect, useState } from 'react';
import { Compass, Activity, ArrowUp, ChevronUp } from 'lucide-react';

export default function ScrollHUD() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO MATRIX');

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const totalH = document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(100, Math.max(0, Math.round((currentY / totalH) * 100)));

      setScrollY(Math.round(currentY));
      setScrollProgress(progress);

      // Detect active section
      if (currentY < 650) {
        setActiveSection('HERO MATRIX');
      } else if (currentY < 1400) {
        setActiveSection('PROBLEM SCOPE');
      } else if (currentY < 2300) {
        setActiveSection('HOW IT WORKS');
      } else if (currentY < 3200) {
        setActiveSection('CLINICAL SAMPLES');
      } else if (currentY < 4200) {
        setActiveSection('FEATURES BENTO');
      } else {
        setActiveSection('SAFETY PLEDGE');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only show once user starts moving down the page
  if (scrollY < 120) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 p-2 rounded-2xl bg-[#07111F]/85 backdrop-blur-2xl border border-white/10 shadow-2xl select-none animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
      style={{ perspective: 800 }}
    >
      {/* 3D Gyro Indicator */}
      <div
        style={{
          transform: `rotateX(${(scrollY * 0.05) % 360}deg) rotateY(${((scrollY * 0.08) % 360) - 180}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s linear',
        }}
        className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#112240] to-[#0B1930] border border-[#56E6F2]/40 flex items-center justify-center text-[#56E6F2] shadow-md shadow-[#56E6F2]/20"
        title="3D Spatial Gyroscope"
      >
        <Compass className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Coordinate & Depth Telemetry */}
      <div className="flex flex-col pr-2 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-[#56E6F2] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#56E6F2] animate-pulse" />
          <span>{activeSection}</span>
        </div>
        <div className="text-[#8FA2BD] flex items-center gap-2 mt-0.5">
          <span>Z-DEPTH: +{scrollY}px</span>
          <span className="text-white/20">•</span>
          <span className="text-[#9B8CFF] font-bold">{scrollProgress}%</span>
        </div>
      </div>

      {/* Quick Scroll To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="p-2 rounded-xl bg-[#112240] hover:bg-[#56E6F2] hover:text-[#07111F] text-[#8FA2BD] transition-all cursor-pointer border border-white/5"
        aria-label="Scroll back to top"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
    </div>
  );
}
