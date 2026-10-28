'use client';

import React, { useRef, useState, useEffect } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // max tilt degrees on mouse (default: 8)
  scrollTiltIntensity?: number; // scroll velocity tilt factor (default: 0.15)
  glare?: boolean;
}

export default function Card3DTilt({
  children,
  className = '',
  depth = 8,
  scrollTiltIntensity = 0.12,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [scrollPitch, setScrollPitch] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Scroll-driven 3D pitch calculation while page is moving
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!cardRef.current) {
            ticking = false;
            return;
          }
          const rect = cardRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Distance from viewport center normalized (-1 to 1)
          const centerDelta = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
          // Apply subtle 3D pitch while moving through the viewport
          const clamped = Math.max(-1, Math.min(1, centerDelta));
          const calculatedPitch = clamped * depth * scrollTiltIntensity;
          setScrollPitch(calculatedPitch);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [depth, scrollTiltIntensity]);

  // 2. Mouse-driven 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * depth;
    const rY = ((x - centerX) / centerX) * depth;

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Combine scroll pitch and mouse rotation
  const finalRotateX = isHovered ? rotateX : -scrollPitch;
  const finalRotateY = isHovered ? rotateY : 0;

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative will-change-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${finalRotateX.toFixed(2)}deg) rotateY(${finalRotateY.toFixed(2)}deg) translateZ(${
            isHovered ? 12 : 0
          }px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.15s cubic-bezier(0.2, 0, 0.3, 1)'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {/* Dynamic Specular Glare Reflection */}
        {glare && (
          <div
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(86, 230, 242, ${glarePos.opacity}), transparent 60%)`,
              opacity: glarePos.opacity,
              transition: 'opacity 0.3s ease',
            }}
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
          />
        )}
      </div>
    </div>
  );
}
