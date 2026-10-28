'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Award,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  Pill,
  Sparkles,
  FileCheck2,
  Stethoscope,
} from 'lucide-react';
import Card3DTilt from '@/components/Card3DTilt';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FounderModal({ isOpen, onClose }: FounderModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#07111F]/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full rounded-3xl bg-[#0B1930] border border-[#56E6F2]/30 shadow-[0_0_60px_rgba(86,230,242,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: 1200 }}
      >
        {/* Top Gradient Ambient Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#56E6F2] via-[#38bdf8] to-[#9B8CFF]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-2xl bg-[#07111F]/80 text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Header Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
            {/* Founder Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-[#56E6F2]/40 shadow-xl shadow-[#56E6F2]/15 relative">
                <Image
                  src="/founder-mian-sikandar-hayyat.jpg"
                  alt="Mian Sikandar Hayyat - Founder of Meri Sehat AI"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-[#07111F] border border-[#56E6F2]/50 text-[#56E6F2] shadow-md">
                <Pill className="w-4 h-4" />
              </div>
            </div>

            {/* Title & Core Credentials */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[10px] font-mono font-bold text-[#56E6F2]">
                <Sparkles className="w-3 h-3" />
                <span>FOUNDER & CLINICAL LEAD</span>
              </div>
              <h3 className="text-2xl font-black text-[#F7FAFF] tracking-tight">
                Mian Sikandar Hayyat
              </h3>
              <p className="text-xs font-semibold text-[#56E6F2] flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#56E6F2]" />
                <span>Doctor of Pharmacy (Pharm.D) Graduate</span>
              </p>
              <p className="text-xs text-[#8FA2BD]">
                Faculty of Pharmaceutical Sciences, University of Central Punjab (UCP), Lahore
              </p>

              {/* LinkedIn Button */}
              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/in/mian-sikandar-hayyat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold shadow-md shadow-[#0077b5]/25 transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Academic & Pharmacy Credentials Grid */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-[#F7FAFF] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#56E6F2]" />
              <span>Pharmacy Qualifications & Core Competencies</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1">
                <span className="font-bold text-[#56E6F2] block">
                  Doctor of Pharmacy (Pharm.D)
                </span>
                <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                  Rigorous professional training in clinical pharmacotherapy, pharmaceutical chemistry, clinical pathology, and patient counseling from UCP.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1">
                <span className="font-bold text-[#9B8CFF] block">
                  Pharmacological Literacy & Safety
                </span>
                <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                  Specialized in analyzing drug mechanisms, drug-drug interactions, food contraindications, and dosing schedules in plain language.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1">
                <span className="font-bold text-[#56E6F2] block">
                  Diagnostic Reference Calibration
                </span>
                <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                  Expertise in clinical laboratory thresholds (hematology, lipid panels, liver function, renal function) and age/sex physiological variations.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1">
                <span className="font-bold text-[#9B8CFF] block">
                  Published Clinical Health Research
                </span>
                <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                  Co-author of peer-reviewed clinical epidemiological studies indexed on ORCID and ResearchGate focused on public healthcare and therapeutics.
                </p>
              </div>
            </div>
          </div>

          {/* The Founder's Mission Statement */}
          <div className="p-4 rounded-2xl bg-[#112240]/50 border border-[#56E6F2]/30 space-y-1.5">
            <h4 className="text-xs font-bold text-[#F7FAFF] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#56E6F2]" />
              <span>Founder&apos;s Clinical Philosophy:</span>
            </h4>
            <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
              &ldquo;As a pharmacy graduate, I witnessed how confusing prescriptions and laboratory reports are for patients in Pakistan. Meri Sehat AI was built with strict pharmacological guardrails to ensure every patient can clearly understand their tests, ask the right questions, and avoid medication mistakes without replacing their doctor.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
