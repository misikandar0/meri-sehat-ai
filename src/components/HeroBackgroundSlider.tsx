'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Activity, Pill, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  label: string;
  subtitle: string;
  icon: any;
  accentColor: string;
}

const slides: Slide[] = [
  {
    id: 'lab',
    image: '/images/lab_hero.jpg',
    label: 'Clinical Diagnostic Laboratory',
    subtitle: 'Automated blood analyzers & cellular hematology',
    icon: Activity,
    accentColor: 'from-teal-600 to-emerald-600',
  },
  {
    id: 'pharmacy',
    image: '/images/pharmacy_hero.jpg',
    label: 'Modern Pharmacy Dispensary',
    subtitle: 'Prescription decoding & pharmacological safety',
    icon: Pill,
    accentColor: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'clinic',
    image: '/images/clinic_hero.jpg',
    label: 'Doctor Consultation Clinic',
    subtitle: 'Verified physician directory & appointment preparation',
    icon: Stethoscope,
    accentColor: 'from-teal-700 to-cyan-700',
  },
];

export default function HeroBackgroundSlider({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`relative w-full h-full transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* Vibrant Medical Image Overlay - Significantly reduced overlay opacity for high image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/40 to-slate-50/70" />
        
        {/* Soft edge fade for natural blending with lower section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent" />
      </div>

      {/* Interactive Transition Selector Pills */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
            {slides.map((slide, idx) => {
              const Icon = slide.icon;
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-sm shadow-teal-800/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-teal-800 hover:bg-slate-100/70'
                  }`}
                  title={slide.subtitle}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline">{slide.label}</span>
                  <span className="sm:hidden">
                    {idx === 0 ? 'Lab' : idx === 1 ? 'Pharmacy' : 'Clinic'}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content (Hero Headline, CTA Buttons, Interactive Upload Card) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
