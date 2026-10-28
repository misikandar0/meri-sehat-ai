'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import FounderModal from '@/components/FounderModal';
import {
  Activity,
  Globe,
  Menu,
  X,
  FileText,
  Pill,
  TrendingUp,
  Stethoscope,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [founderModalOpen, setFounderModalOpen] = useState(false);

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '/report/sample', label: 'Sample Demo' },
    { href: '/prescription', label: 'Prescription' },
    { href: '/compare', label: 'Trends' },
    { href: '/dashboard', label: 'History' },
  ];

  const languageOptions = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ur', label: 'Urdu', native: 'اردو' },
    { code: 'ur_roman', label: 'Roman Urdu', native: 'Roman Urdu' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* 1. Top Clinical Advisory Notice */}
      <div className="bg-[#0B1930]/95 backdrop-blur-md text-[#8FA2BD] text-[11px] py-1.5 px-4 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56E6F2] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#56E6F2]" />
            </span>
            <span className="font-medium text-[#F7FAFF]/90 truncate">
              {language === 'ur'
                ? 'تعلیمی ہیلتھ پلیٹ فارم: فوری ایمرجنسی کی صورت میں 1122 ڈائل کریں۔'
                : language === 'ur_roman'
                ? 'Educational Health Tool: Acute emergency mein foran Rescue 1122 call karein.'
                : 'Educational Clinical AI • In acute medical emergencies, contact Rescue 1122 immediately.'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] shrink-0">
            <a
              href="tel:1122"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#112240] text-[#56E6F2] border border-[#56E6F2]/30 font-semibold hover:border-[#56E6F2] transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 text-[#56E6F2]" />
              <span>Emergency: 1122</span>
            </a>
            <span className="text-white/20">•</span>
            <Link
              href="/clinical-safety"
              className="text-[#8FA2BD] hover:text-[#F7FAFF] transition-colors whitespace-nowrap"
            >
              Safety Protocols
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Floating Navigation Bar */}
      <div className="w-full bg-[#07111F]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-6">
            {/* Meri Sehat AI Brand Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#56E6F2]/50 rounded-2xl py-1 pr-2 transition-transform duration-200 hover:scale-[1.02]"
              aria-label="Meri Sehat AI Homepage"
            >
              {/* App Icon Box */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#0B1930] via-[#112240] to-[#0A182F] border border-[#56E6F2]/40 flex items-center justify-center text-[#56E6F2] shadow-[0_0_20px_rgba(86,230,242,0.18)] group-hover:border-[#56E6F2] group-hover:shadow-[0_0_25px_rgba(86,230,242,0.3)] transition-all shrink-0">
                <Activity className="w-5 h-5 stroke-[2.2] group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#56E6F2] ring-2 ring-[#07111F] shadow-[0_0_8px_#56E6F2]" />
              </div>

              {/* Brand Typography (Clean Single-Line Alignment) */}
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-[#F7FAFF] group-hover:text-[#56E6F2] transition-colors whitespace-nowrap">
                  Meri Sehat
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30 whitespace-nowrap leading-none select-none">
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Center Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink min-w-0">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/5 transition-all whitespace-nowrap shrink-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls: Founder Button, Language Selector & Primary CTA */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {/* Founder Profile Button */}
              <button
                type="button"
                onClick={() => setFounderModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1930] hover:bg-[#112240] text-[#56E6F2] hover:text-[#F7FAFF] border border-[#56E6F2]/30 hover:border-[#56E6F2] text-xs font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
                title="Meet Founder - Mian Sikandar Hayyat (Pharm.D)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#56E6F2]" />
                <span className="whitespace-nowrap">Founder</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#56E6F2]/15 text-[#56E6F2]">Pharm.D</span>
              </button>

              {/* Language Switcher */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930]/80 border border-white/10 text-xs font-semibold text-[#8FA2BD] hover:text-[#F7FAFF] hover:border-[#56E6F2]/40 transition-all whitespace-nowrap cursor-pointer"
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-[#56E6F2]" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#0B1930] border border-white/10 shadow-2xl py-1 z-50">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.code as any);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          language === opt.code
                            ? 'bg-[#56E6F2]/10 text-[#56E6F2] font-bold'
                            : 'text-[#8FA2BD] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className="text-[10px] opacity-70 font-mono">{opt.native}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Analyze CTA Button */}
              <Link
                href="/analyzer"
                className="group relative inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] font-bold text-xs shadow-lg shadow-[#56E6F2]/20 hover:shadow-[#56E6F2]/40 hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              >
                <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Analyze Report</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/analyzer"
                className="px-3.5 py-2 rounded-full bg-[#56E6F2] text-[#07111F] text-xs font-bold"
              >
                Analyze
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#0B1930] border border-white/10 text-[#8FA2BD] hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#07111F]/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3">
            <nav className="space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFounderModalOpen(true);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#56E6F2] bg-[#112240]/60 hover:bg-[#112240] border border-[#56E6F2]/20 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#56E6F2]" />
                  <span>Meet Founder (Pharm.D)</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30">
                  Mian Sikandar
                </span>
              </button>
            </nav>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8FA2BD] font-medium">Select Language:</span>
              <div className="flex gap-1.5">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code as any);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      language === opt.code
                        ? 'bg-[#56E6F2] text-[#07111F]'
                        : 'bg-[#0B1930] text-[#8FA2BD] border border-white/10'
                    }`}
                  >
                    {opt.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-[#56E6F2]/20"
              >
                <Activity className="w-4 h-4" />
                <span>Analyze My Report</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Founder Modal */}
      <FounderModal
        isOpen={founderModalOpen}
        onClose={() => setFounderModalOpen(false)}
      />
    </header>
  );
}
