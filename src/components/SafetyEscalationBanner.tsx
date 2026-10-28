'use client';

import React from 'react';
import { SafetyEscalation } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { AlertOctagon, PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SafetyEscalationBannerProps {
  escalations: SafetyEscalation[];
}

export default function SafetyEscalationBanner({ escalations }: SafetyEscalationBannerProps) {
  const { loc, language } = useLanguage();

  if (!escalations || escalations.length === 0) return null;

  return (
    <div className="space-y-4">
      {escalations.map((esc) => (
        <div
          key={esc.id}
          className="rounded-3xl border-2 border-red-500/50 bg-red-950/70 p-6 sm:p-7 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
              <AlertOctagon className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-red-500/30 text-red-200 border border-red-500/50">
                  {language === 'ur' ? 'ہنگامی توجہ' : 'Urgent Safety Alert'}
                </span>
                <span className="text-xs text-red-300 font-medium">
                  Clinician-Reviewed Escalation Protocol
                </span>
              </div>

              <h3 className="text-lg font-bold text-red-100">
                {loc(esc.title)}
              </h3>

              <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
                {loc(esc.message)}
              </p>

              {/* Action guidance callout */}
              <div className="mt-4 p-4 rounded-2xl bg-[#07111F]/80 border border-red-500/30 text-xs sm:text-sm text-red-100 font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{loc(esc.actionGuidance)}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:1122"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call 1122 (Ambulance)</span>
                  </a>
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-white font-semibold underline underline-offset-2 ml-1"
                  >
                    <span>Find Urgent Clinic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
