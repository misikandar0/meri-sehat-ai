'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Activity, Shield, PhoneCall, HeartHandshake, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#07111F] text-[#8FA2BD] border-t border-white/10 text-sm relative z-20">
      {/* 1. Clinical Responsibility Disclaimer Banner */}
      <div className="bg-[#0B1930]/80 border-b border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-xs leading-relaxed text-[#8FA2BD]">
          <div className="p-2.5 rounded-xl bg-[#112240] border border-[#56E6F2]/30 text-[#56E6F2] shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#F7FAFF] uppercase tracking-wider text-[11px] mb-1 flex items-center gap-2">
              <span>{language === 'ur' ? 'اہم طبی وضاحت اور حفاظتی رہنمائی' : 'Important Clinical & Educational Safety Notice'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#56E6F2]" />
            </p>
            <p className="text-[12px] leading-relaxed">
              {t('footer.disclaimer')}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2.5 bg-[#07111F] px-4 py-2.5 rounded-xl border border-white/10 text-xs">
            <PhoneCall className="w-4 h-4 text-[#56E6F2]" />
            <span className="font-bold text-[#F7FAFF]">Emergency: Rescue 1122</span>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B1930] to-[#112240] border border-[#56E6F2]/40 flex items-center justify-center text-[#56E6F2] shadow-md shadow-[#56E6F2]/10">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#F7FAFF]">Meri Sehat</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30">
                  AI
                </span>
              </div>
            </div>
            <p className="text-xs text-[#8FA2BD] leading-relaxed max-w-sm">
              Empowering patients across Pakistan to decode their laboratory blood tests and prescriptions through transparent, cautious, plain-language clinical explanations.
            </p>
            <div className="text-[11px] text-[#8FA2BD]/80 font-mono space-y-1">
              <p>• Patient-first privacy with client-side report control</p>
              <p>• Standard Reference Ranges with PMDC guidelines</p>
              <p>• Multilingual: English, اردو, and Roman Urdu</p>
            </div>
          </div>

          {/* Clinical Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7FAFF]">
              Clinical Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/analyzer" className="hover:text-[#56E6F2] transition-colors flex items-center gap-1">
                  <span>Blood Test (CBC) Decoder</span>
                </Link>
              </li>
              <li>
                <Link href="/prescription" className="hover:text-[#56E6F2] transition-colors">
                  Prescription Explainer
                </Link>
              </li>
              <li>
                <Link href="/report/sample" className="hover:text-[#56E6F2] transition-colors">
                  Fictional Sample Report
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#56E6F2] transition-colors">
                  Two-Report Trend Tracker
                </Link>
              </li>
              <li>
                <Link href="/health-library" className="hover:text-[#56E6F2] transition-colors">
                  Biomarker Educational Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Healthcare Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7FAFF]">
              Doctor Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/doctors?city=Karachi" className="hover:text-[#56E6F2] transition-colors">
                  Verified Doctors in Karachi
                </Link>
              </li>
              <li>
                <Link href="/doctors?city=Lahore" className="hover:text-[#56E6F2] transition-colors">
                  Verified Doctors in Lahore
                </Link>
              </li>
              <li>
                <Link href="/doctors?city=Islamabad" className="hover:text-[#56E6F2] transition-colors">
                  Verified Doctors in Islamabad
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-[#56E6F2] transition-colors">
                  Browse All Specialists
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#56E6F2] transition-colors">
                  Transparent Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7FAFF]">
              Safety & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/clinical-safety" className="hover:text-[#56E6F2] transition-colors">
                  Clinical Safety Protocols
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#56E6F2] transition-colors">
                  Privacy & Data Retention
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#56E6F2] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/medical-disclaimer" className="hover:text-[#56E6F2] transition-colors">
                  Medical Disclaimers
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mian-sikandar-hayyat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#56E6F2] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Founder: Mian Sikandar (Pharm.D)</span>
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#56E6F2] transition-colors">
                  My Reports History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA2BD]/70">
          <p>© 2026 Meri Sehat AI Healthcare Technology. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#56E6F2]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Educational Clinical AI</span>
            </span>
            <span>•</span>
            <span className="text-[#8FA2BD]">Non-Diagnostic Patient Empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
