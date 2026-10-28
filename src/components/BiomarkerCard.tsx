'use client';

import React, { useState } from 'react';
import { Biomarker } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Info, BookOpen } from 'lucide-react';

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

export default function BiomarkerCard({ biomarker }: BiomarkerCardProps) {
  const { t, loc, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Status visual attributes with restrained, non-alarmist colors
  const statusConfig = {
    normal: {
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      label: t('statusLabels.normal'),
      dotColor: 'bg-emerald-400',
      barColor: 'bg-emerald-400',
    },
    low: {
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      label: t('statusLabels.low'),
      dotColor: 'bg-amber-400',
      barColor: 'bg-amber-400',
    },
    high: {
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      label: t('statusLabels.high'),
      dotColor: 'bg-amber-400',
      barColor: 'bg-amber-400',
    },
    critical: {
      badgeBg: 'bg-red-500/20 border-red-500/40 text-red-300 font-semibold',
      label: t('statusLabels.critical'),
      dotColor: 'bg-red-500',
      barColor: 'bg-red-500',
    },
    verification_required: {
      badgeBg: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
      label: t('statusLabels.verification_required'),
      dotColor: 'bg-indigo-400',
      barColor: 'bg-indigo-400',
    },
    uninterpretable: {
      badgeBg: 'bg-white/10 border-white/20 text-[#8FA2BD]',
      label: t('statusLabels.uninterpretable'),
      dotColor: 'bg-slate-500',
      barColor: 'bg-slate-500',
    },
  }[biomarker.status] || {
    badgeBg: 'bg-white/10 border-white/20 text-[#8FA2BD]',
    label: biomarker.status,
    dotColor: 'bg-slate-500',
    barColor: 'bg-slate-500',
  };

  // Graphical Reference Range Visualizer Math
  const minRange = biomarker.referenceRange.low * 0.7;
  const maxRange = biomarker.referenceRange.high * 1.3;
  const totalSpan = maxRange - minRange || 1;

  // Percentage positions
  const lowRefPct = Math.max(0, Math.min(100, ((biomarker.referenceRange.low - minRange) / totalSpan) * 100));
  const highRefPct = Math.max(0, Math.min(100, ((biomarker.referenceRange.high - minRange) / totalSpan) * 100));
  const valuePct = Math.max(2, Math.min(98, ((biomarker.value - minRange) / totalSpan) * 100));

  return (
    <div className="bg-[#0B1930]/80 rounded-2xl border border-white/10 shadow-lg hover:border-[#56E6F2]/40 transition-all overflow-hidden backdrop-blur-xl">
      {/* Primary Card Header */}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Biomarker Identifier */}
          <div className="flex items-start gap-3">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${statusConfig.dotColor}`} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#F7FAFF] text-base">
                  {biomarker.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#112240] text-[#8FA2BD] font-mono">
                  {biomarker.shortName}
                </span>
                {biomarker.isCriticalLaboratoryFlag && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Lab Critical Flag
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8FA2BD] mt-0.5">
                Category: <span className="uppercase font-medium text-[#56E6F2]">{biomarker.category}</span>
                {biomarker.userConfirmed && ' • Confirmed by user'}
              </p>
            </div>
          </div>

          {/* Numeric Result & Status Badge */}
          <div className="flex items-center sm:items-end justify-between sm:justify-start sm:flex-col gap-2">
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black font-mono text-[#F7FAFF] tracking-tight">
                {biomarker.value}
              </span>
              <span className="text-xs text-[#8FA2BD] ml-1 font-mono">
                {biomarker.unit}
              </span>
            </div>
            <div
              className={`text-xs px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${statusConfig.badgeBg}`}
            >
              <span>{statusConfig.label}</span>
            </div>
          </div>
        </div>

        {/* Graphical Range Visualizer */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center text-xs text-[#8FA2BD] mb-1.5 font-mono">
            <span>Ref: {biomarker.referenceRange.low} - {biomarker.referenceRange.high} {biomarker.unit}</span>
            <span className="text-[#56E6F2] text-[11px]">
              Extracted: {biomarker.value} {biomarker.unit}
            </span>
          </div>

          <div className="relative h-2.5 bg-[#07111F] rounded-full overflow-hidden border border-white/5">
            {/* Safe Reference Zone */}
            <div
              className="absolute top-0 bottom-0 bg-[#56E6F2]/20 border-x border-[#56E6F2]/40"
              style={{
                left: `${lowRefPct}%`,
                width: `${Math.max(2, highRefPct - lowRefPct)}%`,
              }}
            />

            {/* Patient Value Marker */}
            <div
              className={`absolute top-0 bottom-0 w-2.5 rounded-full -ml-1 ${statusConfig.barColor} ring-2 ring-[#0B1930] shadow-md`}
              style={{ left: `${valuePct}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#8FA2BD]/70 mt-1 font-mono">
            <span>Lower</span>
            <span className="text-[#56E6F2] font-medium">Standard Reference Range</span>
            <span>Higher</span>
          </div>
        </div>

        {/* Plain Language Summary */}
        <p className="mt-4 text-xs text-[#8FA2BD] leading-relaxed bg-[#07111F]/70 p-3.5 rounded-xl border border-white/5">
          {loc(biomarker.plainExplanation)}
        </p>

        {/* Toggle Detailed Clinical Context Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#56E6F2] hover:text-[#56E6F2]/80 transition-colors focus:outline-none cursor-pointer"
        >
          {expanded ? (
            <>
              <span>Hide Clinical Context</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Clinical Significance & Sources</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Clinical Depth Drawer */}
      {expanded && (
        <div className="bg-[#07111F]/90 border-t border-white/10 p-5 space-y-4 text-xs">
          {/* Possible Clinical Significance */}
          <div>
            <h4 className="font-bold text-[#F7FAFF] mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#56E6F2]" />
              Possible Explanations (Not a Diagnosis):
            </h4>
            <p className="text-[#8FA2BD] leading-relaxed">
              {loc(biomarker.clinicalSignificance)}
            </p>
          </div>

          {/* Contextual Limitations */}
          <div>
            <h4 className="font-bold text-[#F7FAFF] mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Important Limitations to Consider:
            </h4>
            <p className="text-[#8FA2BD] leading-relaxed">
              {loc(biomarker.contextualLimitations)}
            </p>
          </div>

          {/* Medical References */}
          {biomarker.sources && biomarker.sources.length > 0 && (
            <div className="pt-2 border-t border-white/5">
              <h4 className="font-bold text-[#8FA2BD] mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#56E6F2]" />
                Verified Reference Sources:
              </h4>
              <ul className="space-y-1">
                {biomarker.sources.map((src, i) => (
                  <li key={i} className="text-[11px] text-[#8FA2BD]/80 flex items-start gap-1">
                    <span>•</span>
                    <span>
                      <strong className="text-[#F7FAFF]">{src.organization}</strong> ({src.year}) — &ldquo;{src.title}&rdquo;
                      {src.evidenceGrade && ` [Evidence Grade: ${src.evidenceGrade}]`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
