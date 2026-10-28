'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Check, AlertCircle, Edit2, ShieldCheck, X } from 'lucide-react';

export interface EditableBiomarkerItem {
  name: string;
  shortName: string;
  category: 'cbc' | 'metabolic' | 'lipid' | 'liver' | 'renal' | 'thyroid' | 'iron';
  value: number;
  unit: string;
  referenceRange: { low: number; high: number; text?: string };
  confidence: number;
  isCriticalLaboratoryFlag?: boolean;
  userConfirmed: boolean;
}

interface ExtractedValuesConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  extractedItems: EditableBiomarkerItem[];
  onConfirmAndGenerate: (confirmedItems: EditableBiomarkerItem[]) => void;
  isLoadingReport: boolean;
}

export default function ExtractedValuesConfirmModal({
  isOpen,
  onClose,
  extractedItems,
  onConfirmAndGenerate,
  isLoadingReport,
}: ExtractedValuesConfirmModalProps) {
  const { language } = useLanguage();
  const [items, setItems] = useState<EditableBiomarkerItem[]>(extractedItems);
  const [explicitConsent, setExplicitConsent] = useState(false);

  // Sync state if incoming extracted items change
  React.useEffect(() => {
    setItems(extractedItems);
  }, [extractedItems]);

  if (!isOpen) return null;

  const handleValueChange = (index: number, val: number) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      value: val,
      userConfirmed: true,
    };
    setItems(updated);
  };

  const handleToggleLabCritical = (index: number) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      isCriticalLaboratoryFlag: !updated[index].isCriticalLaboratoryFlag,
      userConfirmed: true,
    };
    setItems(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07111F]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B1930] rounded-3xl max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#112240]/60 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#56E6F2] animate-ping" />
              <h2 className="text-lg font-bold text-[#F7FAFF]">
                {language === 'ur'
                  ? 'رپورٹ کے اعداد و شمار کی تصدیق کریں'
                  : 'Step 2: Confirm Extracted Biomarkers'}
              </h2>
            </div>
            <p className="text-xs text-[#8FA2BD] mt-1">
              Please verify that all numbers, units, and laboratory flags match your original printed document. You can edit any value below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Biomarkers Table / Form */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#07111F]/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#112240] text-[#8FA2BD] font-semibold border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">Biomarker</th>
                  <th className="py-2.5 px-3">Extracted Result</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Lab Reference</th>
                  <th className="py-2.5 px-3 text-center">Lab Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#F7FAFF] block">{item.name}</span>
                      <span className="text-[11px] text-[#8FA2BD]">{item.shortName}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="any"
                          value={item.value}
                          onChange={(e) => handleValueChange(idx, parseFloat(e.target.value) || 0)}
                          className="w-24 px-2.5 py-1.5 rounded-xl border border-white/20 bg-[#07111F] font-bold text-[#F7FAFF] text-sm focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
                        />
                        <Edit2 className="w-3 h-3 text-[#8FA2BD]" />
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#8FA2BD]">{item.unit}</td>
                    <td className="py-3 px-3 text-[#8FA2BD]">
                      {item.referenceRange.low} - {item.referenceRange.high}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleLabCritical(idx)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          item.isCriticalLaboratoryFlag
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : 'bg-white/5 text-[#8FA2BD] border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {item.isCriticalLaboratoryFlag ? 'Flagged (!)' : 'Normal'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Explicit Patient Consent Checkbox */}
          <div className="p-4 rounded-2xl bg-[#112240]/40 border border-[#56E6F2]/30 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={explicitConsent}
                onChange={(e) => setExplicitConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#56E6F2] focus:ring-[#56E6F2] bg-[#07111F] border-white/20"
              />
              <span className="text-xs text-[#8FA2BD] leading-relaxed">
                <strong className="text-[#F7FAFF]">Explicit Consent for AI Health Document Processing:</strong> I confirm that I have reviewed these extracted values against my physical document. I understand that Meri Sehat AI produces educational interpretations and does not diagnose disease or replace consultation with a licensed physician.
              </span>
            </label>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-[#112240]/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl border border-white/20 text-[#8FA2BD] hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancel & Re-upload
          </button>

          <button
            type="button"
            disabled={!explicitConsent || isLoadingReport}
            onClick={() => onConfirmAndGenerate(items)}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] shadow-lg shadow-[#56E6F2]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            {isLoadingReport ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#07111F]/30 border-t-[#07111F] rounded-full animate-spin" />
                <span>Synthesizing Educational Report...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Values & Generate Explanation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
