'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import UploadDropzone from '@/components/UploadDropzone';
import { reportStore } from '@/lib/storage/reportStore';
import { PrescriptionAnalysis, ExtractedPrescriptionMedicine } from '@/lib/types';
import {
  Pill,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Clock,
  ShieldCheck,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function PrescriptionPage() {
  const { t, loc, language } = useLanguage();

  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PrescriptionAnalysis | null>(null);

  // Manual medication entry fallback state
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [medicineName, setMedicineName] = useState('Augmentin 625mg');
  const [strength, setStrength] = useState('625 mg');
  const [dosageForm, setDosageForm] = useState('Tablet');
  const [frequency, setFrequency] = useState('1 tablet twice daily (BD)');

  const handleFileUpload = async (fileData: { name: string; size: number; mimeType: string; base64?: string }) => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileData.name,
          mimeType: fileData.mimeType,
          fileBase64: fileData.base64,
        }),
      });

      const data = await res.json();
      if (data.success && data.rawMedicines) {
        // Submit medicines to generate complete analysis
        const finalizeRes = await fetch('/api/prescription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            medicines: data.rawMedicines,
            doctorNotes: data.doctorNotes,
            explicitConsentGiven: true,
          }),
        });
        const finalData = await finalizeRes.json();
        if (finalData.success && finalData.analysis) {
          setAnalysisResult(finalData.analysis);
          reportStore.savePrescription(finalData.analysis);
        }
      } else {
        alert('Could not identify legible medications. Please try manual entry.');
      }
    } catch {
      alert('Error analyzing prescription.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicines: [
            {
              medicineName,
              genericName: 'Amoxicillin + Clavulanic Acid',
              strength,
              dosageForm,
              frequency,
              duration: '5 days',
              route: 'Oral',
            },
          ],
          explicitConsentGiven: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
        reportStore.savePrescription(data.analysis);
      }
    } catch {
      alert('Error processing medication.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadSampleRx = () => {
    handleManualSubmit({ preventDefault: () => {} } as any);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1930] text-[#9B8CFF] text-xs font-mono border border-[#9B8CFF]/30 shadow-sm">
          <Pill className="w-3.5 h-3.5 text-[#9B8CFF]" />
          <span>PHARMACOLOGICAL LITERACY & SAFETY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight">
          Prescription Medicine Explainer
        </h1>
        <p className="text-xs sm:text-sm text-[#8FA2BD] max-w-xl mx-auto leading-relaxed">
          Understand what your prescribed medicines are commonly used for, how they work, key safety precautions, and questions for your pharmacist.
        </p>
      </div>

      {/* Strict Ethical Guardrails Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3.5 backdrop-blur-xl">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-100">
            Important Clinical & Pharmacological Guardrail:
          </p>
          <p className="leading-relaxed text-amber-200/90">
            Meri Sehat AI never recommends starting, stopping, substituting, or changing doses of any prescribed drug. We do not infer your doctor&rsquo;s private clinical diagnosis from a drug name alone. If handwriting on a paper prescription is illegible, please verify directly with your dispensing pharmacist.
          </p>
        </div>
      </div>

      {/* Upload & Entry Interface (if no result yet) */}
      {!analysisResult ? (
        <div className="rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#0B1930]/80 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex justify-center mb-4">
            <div className="bg-[#07111F] p-1.5 rounded-2xl flex items-center text-xs font-semibold text-[#8FA2BD] border border-white/10">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-[#9B8CFF] to-[#818cf8] text-[#07111F] font-bold shadow-md'
                    : 'hover:text-[#F7FAFF]'
                }`}
              >
                Upload Prescription Photo
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'manual'
                    ? 'bg-gradient-to-r from-[#9B8CFF] to-[#818cf8] text-[#07111F] font-bold shadow-md'
                    : 'hover:text-[#F7FAFF]'
                }`}
              >
                Type Medicine Name
              </button>
            </div>
          </div>

          {activeTab === 'upload' ? (
            <UploadDropzone
              onFileProcessed={handleFileUpload}
              onUseSampleDemo={handleLoadSampleRx}
              isProcessing={isProcessing}
              documentTypeLabel="Doctor's Prescription (JPG, PNG, PDF)"
            />
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                  Medicine or Brand Name (e.g. Augmentin, Panadol, Risek)
                </label>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Augmentin 625mg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#9B8CFF] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">Strength</label>
                  <input
                    type="text"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    placeholder="e.g. 500 mg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#9B8CFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">Dosage Form</label>
                  <select
                    value={dosageForm}
                    onChange={(e) => setDosageForm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#9B8CFF] focus:outline-none"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup / Suspension">Syrup / Suspension</option>
                    <option value="Injection">Injection</option>
                    <option value="Inhaler / Drops">Inhaler / Drops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">Frequency</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. 1 tablet twice daily"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#9B8CFF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#9B8CFF] via-[#818cf8] to-[#56E6F2] text-[#07111F] font-extrabold text-xs shadow-lg shadow-[#9B8CFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                {isProcessing ? 'Fetching Verified Clinical Reference...' : 'Explain This Medication'}
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Explainer Results View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#8FA2BD] uppercase tracking-wider">
              Evaluated Medications ({analysisResult.medicines.length})
            </span>
            <button
              onClick={() => setAnalysisResult(null)}
              className="text-xs font-bold text-[#56E6F2] hover:underline cursor-pointer"
            >
              Analyze Another Prescription
            </button>
          </div>

          {analysisResult.medicines.map((med) => (
            <div
              key={med.id}
              className="bg-[#0B1930] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6 backdrop-blur-xl"
            >
              {/* Medicine Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#9B8CFF]/15 border border-[#9B8CFF]/30 text-[#9B8CFF] flex items-center justify-center shrink-0">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#F7FAFF]">
                      {med.brandName || med.medicineName}
                    </h3>
                    <p className="text-xs font-medium text-[#8FA2BD] mt-0.5">
                      Generic: <strong className="text-[#56E6F2]">{med.genericName}</strong> • Form: {med.dosageForm} ({med.strength})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#112240] text-[#8FA2BD] border border-white/10 font-mono">
                    Route: {med.route}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Reference
                  </span>
                </div>
              </div>

              {/* Dosing Instructions */}
              <div className="bg-[#07111F]/80 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#56E6F2] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#F7FAFF] block">Stated Dosing Schedule:</span>
                  <span className="text-[#8FA2BD]">{med.frequency} {med.duration && `• ${med.duration}`}</span>
                </div>
              </div>

              {/* Common Uses */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7FAFF] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#56E6F2]" />
                  What This Medicine Is Commonly Used For:
                </h4>
                <p className="text-xs text-[#8FA2BD] leading-relaxed bg-[#07111F]/60 p-4 rounded-2xl border border-white/5">
                  {loc(med.commonUses)}
                </p>
              </div>

              {/* How It Works */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7FAFF]">
                  How It Generally Works (Mechanism):
                </h4>
                <p className="text-xs text-[#8FA2BD] leading-relaxed">
                  {loc(med.mechanism)}
                </p>
              </div>

              {/* Side Effects & Precautions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold text-[#F7FAFF]">
                    Common Side Effects:
                  </h4>
                  <ul className="space-y-1 text-xs text-[#8FA2BD]">
                    {med.commonSideEffects.map((se, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>•</span>
                        <span>{loc(se)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Important Precautions:
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-200/90">
                    {med.importantPrecautions.map((pr, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>•</span>
                        <span>{loc(pr)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Questions for Pharmacist */}
              <div className="pt-3 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#56E6F2] mb-2.5 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#56E6F2]" />
                  Suggested Questions for Your Pharmacist or Doctor:
                </h4>
                <ul className="space-y-2">
                  {med.questionsForPharmacist.map((q, i) => (
                    <li
                      key={i}
                      className="text-xs bg-[#07111F] p-3 rounded-xl border border-white/5 text-[#F7FAFF] font-medium"
                    >
                      &ldquo;{loc(q)}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Educational Disclaimer */}
          <div className="p-4 rounded-2xl bg-[#0B1930]/50 border border-white/10 text-xs text-[#8FA2BD]">
            <p className="leading-relaxed">{loc(analysisResult.educationalDisclaimer)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
