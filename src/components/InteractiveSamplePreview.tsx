'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card3DTilt from '@/components/Card3DTilt';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Info,
  Maximize2,
} from 'lucide-react';

interface SampleBiomarker {
  id: string;
  name: string;
  shortName: string;
  value: number;
  unit: string;
  referenceRange: { low: number; high: number; text: string };
  status: 'low' | 'normal' | 'high';
  plainExplanation: string;
  doctorQuestion: string;
  bodyRole: string;
}

export default function InteractiveSamplePreview() {
  const [expandedId, setExpandedId] = useState<string>('hb');

  const sampleData: SampleBiomarker[] = [
    {
      id: 'hb',
      name: 'Hemoglobin',
      shortName: 'Hb',
      value: 10.2,
      unit: 'g/dL',
      referenceRange: { low: 12.0, high: 15.5, text: '12.0 - 15.5 g/dL' },
      status: 'low',
      bodyRole: 'Oxygen Transport Protein',
      plainExplanation:
        'Slightly below standard female reference range. Hemoglobin is the protein in red blood cells that carries oxygen throughout your body. Lower levels commonly associate with iron deficiency, blood loss, or nutritional factors.',
      doctorQuestion:
        'Does my lower hemoglobin warrant a serum ferritin test or dietary iron supplementation?',
    },
    {
      id: 'mcv',
      name: 'Mean Corpuscular Volume',
      shortName: 'MCV',
      value: 71.8,
      unit: 'fL',
      referenceRange: { low: 80.0, high: 100.0, text: '80.0 - 100.0 fL' },
      status: 'low',
      bodyRole: 'Red Cell Physical Size',
      plainExplanation:
        'Below standard reference range. MCV reflects the average physical size of your red blood cells. A value under 80 indicates microcytosis (smaller cells), commonly linked to iron deficiency or beta-thalassemia minor trait.',
      doctorQuestion:
        'Could this microcytic pattern be iron deficiency or a thalassemia minor trait common in South Asia?',
    },
    {
      id: 'rbc',
      name: 'Red Blood Cell Count',
      shortName: 'RBC',
      value: 4.9,
      unit: 'x10¹²/L',
      referenceRange: { low: 3.8, high: 5.2, text: '3.8 - 5.2 x10¹²/L' },
      status: 'normal',
      bodyRole: 'Total Circulating Erythrocytes',
      plainExplanation:
        'Within standard limits. Your bone marrow produces adequate total numbers of red blood cells to support cellular oxygen distribution.',
      doctorQuestion:
        'Total red cell count looks preserved; how does this correlate with my hemoglobin concentration?',
    },
    {
      id: 'wbc',
      name: 'White Blood Cell Count',
      shortName: 'WBC',
      value: 6.8,
      unit: 'x10⁹/L',
      referenceRange: { low: 4.0, high: 11.0, text: '4.0 - 11.0 x10⁹/L' },
      status: 'normal',
      bodyRole: 'Infection Defense & Surveillance',
      plainExplanation:
        'Within standard healthy limits. White blood cells are your primary immune defense. A normal count indicates no acute bacterial leukocytosis or viral bone marrow suppression.',
      doctorQuestion:
        'Are there any specific leukocyte differential subgroups I should review?',
    },
    {
      id: 'plt',
      name: 'Platelet Count',
      shortName: 'PLT',
      value: 260,
      unit: 'x10⁹/L',
      referenceRange: { low: 150.0, high: 450.0, text: '150 - 450 x10⁹/L' },
      status: 'normal',
      bodyRole: 'Coagulation & Clot Formation',
      plainExplanation:
        'Healthy coagulation level. Platelets stop bleeding by clumping and clotting blood vessel injuries. Particularly reassuring during seasonal viral and dengue screening.',
      doctorQuestion:
        'Platelets appear robust; no risk of acute thrombocytopenia.',
    },
    {
      id: 'fbs',
      name: 'Fasting Blood Glucose',
      shortName: 'FBS',
      value: 94,
      unit: 'mg/dL',
      referenceRange: { low: 70.0, high: 99.0, text: '70 - 99 mg/dL' },
      status: 'normal',
      bodyRole: 'Metabolic Energy Regulation',
      plainExplanation:
        'Within optimal non-diabetic fasting range. Reflects balanced overnight glucose regulation without evidence of impaired fasting glycemia.',
      doctorQuestion:
        'Fasting glucose is optimal; does my family history warrant an occasional HbA1c check?',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header with Fictional Demonstration Badge */}
      <Card3DTilt depth={5} scrollTiltIntensity={0.08}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B1930]/90 border border-white/10 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 flex items-center justify-center text-[#56E6F2]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#F7FAFF]">
                  Interactive Patient Dashboard Preview
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#9B8CFF]/20 text-[#9B8CFF] border border-[#9B8CFF]/40 font-bold">
                  FICTIONAL DATA
                </span>
              </div>
              <p className="text-xs text-[#8FA2BD]">
                Demonstrating transparent biomarker parsing, reference range visualizers, and plain explanations.
              </p>
            </div>
          </div>

          <Link
            href="/report/sample"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] text-xs font-bold transition-all shrink-0 hover:scale-105 shadow-md shadow-[#56E6F2]/20"
          >
            <span>Open Full Report Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card3DTilt>

      {/* Clinical Pattern Recognition Insight Banner */}
      <Card3DTilt depth={6} scrollTiltIntensity={0.1}>
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0B1930] via-[#112240] to-[#0B1930] border border-[#56E6F2]/30 flex items-start sm:items-center gap-4 shadow-xl backdrop-blur-xl">
          <div className="p-2.5 rounded-2xl bg-[#56E6F2]/20 text-[#56E6F2] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#F7FAFF] text-sm">
                Detected Pattern: Microcytic Indicator (Low Hb + Low MCV)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                Discuss with Doctor
              </span>
            </div>
            <p className="text-[#8FA2BD] mt-1 leading-relaxed">
              Meri Sehat AI evaluates biomarkers in concert, not in isolation. When Hemoglobin and MCV are both lower than standard reference limits, our engine suggests exploring iron deficiency or thalassemia trait rather than jumping to alarming conclusions.
            </p>
          </div>
        </div>
      </Card3DTilt>

      {/* Interactive Biomarker Cards Grid with 3D Tilt Transitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sampleData.map((marker) => {
          const isExpanded = expandedId === marker.id;
          const isLow = marker.status === 'low';

          // Calculate percentage position along reference range
          const minRange = marker.referenceRange.low * 0.7;
          const maxRange = marker.referenceRange.high * 1.3;
          const percent = Math.max(
            5,
            Math.min(95, ((marker.value - minRange) / (maxRange - minRange)) * 100)
          );

          return (
            <Card3DTilt
              key={marker.id}
              depth={9}
              scrollTiltIntensity={0.15}
              className="h-full"
            >
              <div
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedId(isExpanded ? '' : marker.id);
                  }
                }}
                onClick={() => setExpandedId(isExpanded ? '' : marker.id)}
                className={`rounded-3xl p-6 border text-left transition-all cursor-pointer backdrop-blur-xl h-full flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#56E6F2] ${
                  isExpanded
                    ? 'bg-[#0B1930] border-[#56E6F2] shadow-[0_0_40px_rgba(86,230,242,0.18)] ring-1 ring-[#56E6F2]/40'
                    : 'bg-[#0B1930]/70 border-white/10 hover:border-[#56E6F2]/40 hover:bg-[#0B1930]/90 shadow-xl'
                }`}
              >
                <div>
                  {/* Header: Name & Status Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-base text-[#F7FAFF]">
                          {marker.name}
                        </span>
                        <span className="text-[10px] text-[#8FA2BD] font-mono">
                          ({marker.shortName})
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8FA2BD]">
                        {marker.bodyRole}
                      </span>
                    </div>

                    {isLow ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                        <TrendingDown className="w-3 h-3" />
                        <span>Below Range</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Within Range</span>
                      </span>
                    )}
                  </div>

                  {/* Value and Unit with 3D Z-Depth Pop */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#F7FAFF] drop-shadow-sm">
                      {marker.value}
                    </span>
                    <span className="text-xs text-[#8FA2BD] font-mono font-medium">
                      {marker.unit}
                    </span>
                  </div>

                  {/* Graphical Reference Range Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[10px] text-[#8FA2BD] font-mono">
                      <span>Ref: {marker.referenceRange.text}</span>
                      <span>{isLow ? 'Lower than average' : 'Optimal'}</span>
                    </div>
                    <div className="relative w-full h-2 rounded-full bg-[#07111F] overflow-hidden border border-white/5">
                      {/* Normal Range Window */}
                      <div className="absolute inset-y-0 left-[25%] right-[25%] bg-[#56E6F2]/25 rounded-full" />
                      {/* Current Value Marker Pin */}
                      <div
                        style={{ left: `${percent}%` }}
                        className={`absolute top-0 bottom-0 w-2.5 -translate-x-1/2 rounded-full shadow-sm transition-all ${
                          isLow ? 'bg-amber-400 shadow-amber-400' : 'bg-[#56E6F2] shadow-[#56E6F2]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Plain-Language Explanation */}
                  <div className="text-xs text-[#8FA2BD] leading-relaxed border-t border-white/5 pt-3">
                    <p>{marker.plainExplanation}</p>
                  </div>

                  {/* Expanded Doctor Questions */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#56E6F2]">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Doctor Discussion Question:</span>
                      </div>
                      <p className="text-[11px] text-[#F7FAFF] bg-[#07111F]/90 p-3 rounded-2xl border border-white/10 leading-snug">
                        &ldquo;{marker.doctorQuestion}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Expand/Collapse Toggle Cue */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#56E6F2] font-mono font-bold">
                  <span>{isExpanded ? 'Condense matrix' : '3D Inspect Questions'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>
    </div>
  );
}
