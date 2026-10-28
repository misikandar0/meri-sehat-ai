'use client';

import React from 'react';

interface MarqueeTickerProps {
  className?: string;
}

export default function MarqueeTicker({ className = '' }: MarqueeTickerProps) {
  const items = [
    { text: 'LESS CONFUSION.', highlight: false },
    { text: 'MORE CLARITY.', highlight: true },
    { text: 'UNDERSTAND YOUR RESULTS.', highlight: false },
    { text: 'ASK BETTER QUESTIONS.', highlight: true },
    { text: 'MERI SEHAT AI.', highlight: false },
    { text: 'EVIDENCE-GRADE MEDICAL INSIGHT.', highlight: true },
    { text: 'EMPOWERED PATIENT CHOICES.', highlight: false },
  ];

  // Duplicate items for infinite loop
  const repeatedItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 border-y border-white/10 bg-[#0B1930]/40 backdrop-blur-md select-none ${className}`}
      aria-label="Scrolling Highlights"
    >
      {/* Left/Right Edge Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07111F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07111F] to-transparent z-10 pointer-events-none" />

      <div className="animate-ticker">
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-6 shrink-0"
          >
            <span
              className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-wider uppercase ${
                item.highlight
                  ? 'text-[#56E6F2] drop-shadow-[0_0_12px_rgba(86,230,242,0.35)]'
                  : 'text-[#F7FAFF]/80'
              }`}
            >
              {item.text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#9B8CFF]/50 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
