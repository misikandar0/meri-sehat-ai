'use client';

import React, { useState } from 'react';
import { BodySystem, Biomarker } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Heart, Activity, Shield, Droplets, Zap, Sparkles, Info } from 'lucide-react';

interface BodySystemVisualizerProps {
  biomarkers: Biomarker[];
}

export default function BodySystemVisualizer({ biomarkers }: BodySystemVisualizerProps) {
  const { language } = useLanguage();
  const [activeSystem, setActiveSystem] = useState<BodySystem>('hematologic');

  const systemDefinitions: Record<
    BodySystem,
    {
      label: { en: string; ur: string; ur_roman: string };
      icon: any;
      description: { en: string; ur: string; ur_roman: string };
      color: string;
      activeBg: string;
    }
  > = {
    hematologic: {
      label: { en: 'Blood & Oxygen Transport', ur: 'خون اور آکسیجن کا نظام', ur_roman: 'Khoon & Oxygen Transport' },
      icon: Droplets,
      description: {
        en: 'Red blood cells, hemoglobin, and platelets circulate throughout the cardiovascular network, transporting vital oxygen and facilitating clotting.',
        ur: 'سرخ خلیات، ہیموگلوبن اور پلیٹلیٹس خون کی نالیوں میں گردش کر کے آکسیجن پہنچاتے ہیں اور خون کو جماتے ہیں۔',
        ur_roman: 'Red cells, hemoglobin aur platelets poore jism mein oxygen pohanchate hain.',
      },
      color: 'text-rose-400',
      activeBg: 'bg-rose-500/20 border-rose-500/50 text-rose-200',
    },
    immune: {
      label: { en: 'Immune & Lymphatic Defense', ur: 'مدافعتی نظام اور سفید خلیات', ur_roman: 'Immune & Defense System' },
      icon: Shield,
      description: {
        en: 'White blood cells patrol tissues, lymph nodes, and circulation to detect and neutralize microbial invaders.',
        ur: 'سفید خلیات جسم کے دفاعی نظام کا حصہ ہیں جو جراثیموں اور انفیکشن سے لڑتے ہیں۔',
        ur_roman: 'White blood cells germs aur bimariyon se hifazat karte hain.',
      },
      color: 'text-blue-400',
      activeBg: 'bg-blue-500/20 border-blue-500/50 text-blue-200',
    },
    metabolic: {
      label: { en: 'Endocrine & Metabolic Glucose', ur: 'شوگر اور میٹابولک نظام', ur_roman: 'Metabolic & Sugar System' },
      icon: Zap,
      description: {
        en: 'Regulates energy storage and glucose utilization through pancreatic insulin secretion and cellular uptake.',
        ur: 'لبلبے اور انسولین کے ذریعے خون میں گلوکوز (شوگر) اور توانائی کو کنٹرول کرتا ہے۔',
        ur_roman: 'Glucose aur energy balance ko regulate karta hai.',
      },
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/20 border-amber-500/50 text-amber-200',
    },
    cardiovascular: {
      label: { en: 'Cardiovascular & Vascular Wall', ur: 'دل اور شریانیں', ur_roman: 'Dil aur Sharyanein' },
      icon: Heart,
      description: {
        en: 'The heart pumps oxygenated blood through vascular highways. Markers reflect hemodynamic demand and vessel health.',
        ur: 'دل پورے جسم میں خون پمپ کرتا ہے۔ ٹیسٹ کے نتائج دل کے کام اور خون کی روانی کو ظاہر کرتے ہیں۔',
        ur_roman: 'Dil khoon pump karta hai aur blood pressure balance rehta hai.',
      },
      color: 'text-red-400',
      activeBg: 'bg-red-500/20 border-red-500/50 text-red-200',
    },
    hepatic: {
      label: { en: 'Hepatic & Liver Filtration', ur: 'جگر اور فلٹریشن', ur_roman: 'Jigar & Filtration' },
      icon: Activity,
      description: {
        en: 'Synthesizes essential clotting factors, processes medications, and balances iron storage protein.',
        ur: 'جگر پروٹین اور خون جمانے والے مادے بناتا ہے اور ادویات کو پروسیس کرتا ہے۔',
        ur_roman: 'Jigar zaroori proteins banata hai aur medicines ko process karta hai.',
      },
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200',
    },
    renal: {
      label: { en: 'Renal & Kidney Fluid Balance', ur: 'گردے اور پیشاب کا نظام', ur_roman: 'Gurday & Fluid Balance' },
      icon: Sparkles,
      description: {
        en: 'Filters metabolic waste, regulates electrolyte equilibrium, and secretes erythropoietin to stimulate red cell creation.',
        ur: 'گردے خون کو صاف کرتے ہیں اور سرخ خلیات بنانے کے لیے اہم ہارمون جاری کرتے ہیں۔',
        ur_roman: 'Gurday khoon ko saaf karte hain aur namkiyaat ka tawazun rakhte hain.',
      },
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/20 border-purple-500/50 text-purple-200',
    },
  };

  // Biomarkers mapped to this system
  const linkedBiomarkers = biomarkers.filter((b) => b.associatedBodySystem === activeSystem);

  return (
    <div className="bg-[#0B1930]/80 rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Title & Strict Non-Diagnostic Medical Notice */}
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[#56E6F2]">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#F7FAFF] text-lg">
              {language === 'ur'
                ? 'تعلیمی جسمانی نظام کا تعارف'
                : 'Educational Body-System Visualizer'}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#112240] text-[#8FA2BD] border border-white/10">
            EDUCATIONAL CORRELATION • NOT ANATOMICAL DIAGNOSIS
          </span>
        </div>

        {/* Regulatory Safeguard Notice */}
        <div className="mt-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Disclaimer:</strong> Highlighting an organ or body system does <em>not</em> imply that organ is damaged or diseased. Blood markers circulate universally throughout the entire body; this interactive visualizer simply demonstrates the physiological roles biological markers fulfill.
          </p>
        </div>
      </div>

      {/* Interactive System Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {(Object.keys(systemDefinitions) as BodySystem[]).map((sysKey) => {
          const sys = systemDefinitions[sysKey];
          const Icon = sys.icon;
          const isSelected = activeSystem === sysKey;

          return (
            <button
              key={sysKey}
              onClick={() => setActiveSystem(sysKey)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? sys.activeBg + ' shadow-lg ring-1 ring-[#56E6F2]/40'
                  : 'bg-[#07111F]/60 border-white/10 text-[#8FA2BD] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${sys.color}`} />
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#56E6F2]" />}
              </div>
              <span className="text-xs font-bold leading-snug">
                {sys.label[language] || sys.label.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active System Details Box */}
      <div className="bg-[#07111F]/80 rounded-2xl p-6 border border-white/5 space-y-4">
        <div>
          <h4 className="font-bold text-[#F7FAFF] text-base mb-1">
            {systemDefinitions[activeSystem].label[language] || systemDefinitions[activeSystem].label.en}
          </h4>
          <p className="text-xs text-[#8FA2BD] leading-relaxed">
            {systemDefinitions[activeSystem].description[language] || systemDefinitions[activeSystem].description.en}
          </p>
        </div>

        {/* Associated Biomarkers in this Report */}
        <div>
          <span className="text-xs font-bold text-[#56E6F2] uppercase tracking-wider block mb-2.5">
            Related Biomarkers in This Report ({linkedBiomarkers.length}):
          </span>

          {linkedBiomarkers.length === 0 ? (
            <p className="text-xs text-[#8FA2BD] italic bg-[#0B1930] p-4 rounded-xl border border-white/5">
              No biomarkers directly categorized under this system in the currently evaluated panel.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {linkedBiomarkers.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#0B1930] p-3.5 rounded-xl border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-xs text-[#F7FAFF] block">
                      {b.name} ({b.shortName})
                    </span>
                    <span className="text-[10px] text-[#8FA2BD] font-mono">
                      Ref: {b.referenceRange.low} - {b.referenceRange.high} {b.unit}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xs text-[#F7FAFF] block font-mono">
                      {b.value} {b.unit}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        b.status === 'normal'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : b.status === 'critical'
                          ? 'bg-red-500/20 text-red-300 font-bold'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
