'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import UploadDropzone from '@/components/UploadDropzone';
import ExtractedValuesConfirmModal, { EditableBiomarkerItem } from '@/components/ExtractedValuesConfirmModal';
import { reportStore } from '@/lib/storage/reportStore';
import { Activity, Shield, Info, PlusCircle, CheckCircle2, ArrowRight, Sparkles, Lock } from 'lucide-react';

export default function AnalyzerPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('Extracting document...');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [extractedItems, setExtractedItems] = useState<EditableBiomarkerItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual entry state
  const [manualAge, setManualAge] = useState<number>(28);
  const [manualSex, setManualSex] = useState<'male' | 'female'>('female');
  const [manualHb, setManualHb] = useState<number>(10.4);
  const [manualMcv, setManualMcv] = useState<number>(72.0);
  const [manualWbc, setManualWbc] = useState<number>(7.2);
  const [manualPlt, setManualPlt] = useState<number>(230);
  const [manualFbs, setManualFbs] = useState<number>(95);
  const [manualConsent, setManualConsent] = useState(false);

  const handleFileUploaded = async (fileData: { name: string; size: number; mimeType: string; base64?: string }) => {
    setIsProcessing(true);
    setProcessingStage('Scanning document structure & optical recognition...');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileData.name,
          mimeType: fileData.mimeType,
          fileBase64: fileData.base64,
        }),
      });

      const data = await res.json();
      if (data.success && data.extractedData) {
        setExtractedItems(
          data.extractedData.map((d: any) => ({
            ...d,
            userConfirmed: false,
          }))
        );
        setShowConfirmModal(true);
      } else {
        alert(data.error || 'Document extraction could not identify valid laboratory markers.');
      }
    } catch {
      alert('Network error connecting to extraction API. Loading sample demonstration.');
      router.push('/report/sample');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmAndGenerate = async (items: EditableBiomarkerItem[]) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          biomarkers: items,
          sourceFileName: 'Uploaded_Laboratory_Report.pdf',
          laboratoryName: 'Diagnostic Center',
          explicitConsentGiven: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        reportStore.saveReport(data.report);
        router.push(`/report/${data.report.id}`);
      } else {
        alert('Could not synthesize final report.');
      }
    } catch {
      alert('Error finalizing report.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualConsent) {
      alert('Please confirm explicit consent before generating interpretation.');
      return;
    }

    setIsGenerating(true);
    try {
      const items: EditableBiomarkerItem[] = [
        {
          name: 'Hemoglobin',
          shortName: 'Hb',
          category: 'cbc',
          value: manualHb,
          unit: 'g/dL',
          referenceRange: manualSex === 'female' ? { low: 12.0, high: 15.5 } : { low: 13.5, high: 17.5 },
          confidence: 1.0,
          userConfirmed: true,
        },
        {
          name: 'Mean Corpuscular Volume',
          shortName: 'MCV',
          category: 'cbc',
          value: manualMcv,
          unit: 'fL',
          referenceRange: { low: 80.0, high: 100.0 },
          confidence: 1.0,
          userConfirmed: true,
        },
        {
          name: 'White Blood Cell Count',
          shortName: 'WBC',
          category: 'cbc',
          value: manualWbc,
          unit: 'x10^9/L',
          referenceRange: { low: 4.0, high: 11.0 },
          confidence: 1.0,
          userConfirmed: true,
        },
        {
          name: 'Platelet Count',
          shortName: 'PLT',
          category: 'cbc',
          value: manualPlt,
          unit: 'x10^9/L',
          referenceRange: { low: 150.0, high: 450.0 },
          confidence: 1.0,
          userConfirmed: true,
        },
        {
          name: 'Fasting Blood Glucose',
          shortName: 'FBS',
          category: 'metabolic',
          value: manualFbs,
          unit: 'mg/dL',
          referenceRange: { low: 70.0, high: 99.0 },
          confidence: 1.0,
          userConfirmed: true,
        },
      ];

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientContext: {
            age: manualAge,
            sex: manualSex,
            isFasting: true,
          },
          biomarkers: items,
          sourceFileName: 'Manual_Biomarker_Entry',
          laboratoryName: 'Manual Entry Verification',
          explicitConsentGiven: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        reportStore.saveReport(data.report);
        router.push(`/report/${data.report.id}`);
      }
    } catch {
      alert('Error analyzing manual values.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1930] text-[#56E6F2] text-xs font-mono border border-[#56E6F2]/30 shadow-sm">
          <Activity className="w-3.5 h-3.5 text-[#56E6F2]" />
          <span>STAGE 1: DOCUMENT UPLOAD & EXTRACTION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight">
          Blood Test (CBC) Decoder
        </h1>
        <p className="text-xs sm:text-sm text-[#8FA2BD] max-w-xl mx-auto leading-relaxed">
          Upload your Complete Blood Count or metabolic lab report. Our system extracts individual biomarkers, checks units, and explains findings in plain language.
        </p>
      </div>

      {/* Tabs: Document Upload vs Manual Entry */}
      <div className="flex justify-center">
        <div className="bg-[#0B1930] p-1.5 rounded-2xl flex items-center text-xs font-semibold text-[#8FA2BD] border border-white/10">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] font-bold shadow-md'
                : 'hover:text-[#F7FAFF]'
            }`}
          >
            Upload File (PDF / Image)
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] font-bold shadow-md'
                : 'hover:text-[#F7FAFF]'
            }`}
          >
            Manual Value Entry
          </button>
        </div>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'upload' ? (
        <div className="rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#0B1930]/80 backdrop-blur-2xl shadow-2xl space-y-6">
          <UploadDropzone
            onFileProcessed={handleFileUploaded}
            onUseSampleDemo={() => router.push('/report/sample')}
            isProcessing={isProcessing}
            processingStage={processingStage}
            documentTypeLabel="Laboratory Test (PDF, JPG, PNG)"
          />

          {/* Educational Note */}
          <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 text-xs text-[#8FA2BD] space-y-1">
            <h4 className="font-bold text-[#F7FAFF] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#56E6F2]" />
              <span>Privacy & Verification Promise:</span>
            </h4>
            <p className="leading-relaxed">
              We never fabricate results or assume diagnostic conclusions. Every extracted number will be presented to you in Step 2 for manual review and confirmation before the plain-language report is generated.
            </p>
          </div>
        </div>
      ) : (
        /* Manual Entry Fallback */
        <form
          onSubmit={handleManualSubmit}
          className="rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#0B1930]/80 backdrop-blur-2xl shadow-2xl space-y-6"
        >
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-bold text-[#F7FAFF] text-base">
              Enter Laboratory Values Manually
            </h3>
            <p className="text-xs text-[#8FA2BD] mt-0.5">
              Ideal if your report is handwritten, blurry, or if you prefer typing individual test values.
            </p>
          </div>

          {/* Patient Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Patient Age (Years)
              </label>
              <input
                type="number"
                value={manualAge}
                onChange={(e) => setManualAge(parseInt(e.target.value) || 25)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Biological Sex (for reference range calibration)
              </label>
              <select
                value={manualSex}
                onChange={(e) => setManualSex(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              >
                <option value="female">Female (Typical Hb: 12.0 - 15.5 g/dL)</option>
                <option value="male">Male (Typical Hb: 13.5 - 17.5 g/dL)</option>
              </select>
            </div>
          </div>

          {/* CBC Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Hemoglobin (Hb / HGB) [g/dL]
              </label>
              <input
                type="number"
                step="0.1"
                value={manualHb}
                onChange={(e) => setManualHb(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Mean Corpuscular Volume (MCV) [fL]
              </label>
              <input
                type="number"
                step="0.1"
                value={manualMcv}
                onChange={(e) => setManualMcv(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                White Blood Cell Count (WBC / TLC) [x10^9/L]
              </label>
              <input
                type="number"
                step="0.1"
                value={manualWbc}
                onChange={(e) => setManualWbc(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Platelet Count (PLT) [x10^9/L]
              </label>
              <input
                type="number"
                value={manualPlt}
                onChange={(e) => setManualPlt(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#8FA2BD] mb-1">
                Fasting Blood Glucose (Optional) [mg/dL]
              </label>
              <input
                type="number"
                value={manualFbs}
                onChange={(e) => setManualFbs(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-[#07111F] text-sm text-[#F7FAFF] focus:ring-2 focus:ring-[#56E6F2] focus:outline-none"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="p-4 rounded-2xl bg-[#112240]/40 border border-[#56E6F2]/30 text-xs">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={manualConsent}
                onChange={(e) => setManualConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#56E6F2] focus:ring-[#56E6F2] bg-[#07111F] border-white/20"
              />
              <span className="text-[#8FA2BD] leading-relaxed">
                <strong className="text-[#F7FAFF]">Explicit Clinical Consent:</strong> I understand that this analysis provides educational explanations only and does not diagnose disease or replace professional physician consultation.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!manualConsent || isGenerating}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#56E6F2] via-[#38bdf8] to-[#9B8CFF] text-[#07111F] font-extrabold text-sm shadow-[0_0_30px_rgba(86,230,242,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <span>Synthesizing Plain-Language Report...</span>
            ) : (
              <>
                <span>Analyze These Values</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Confirmation Modal */}
      <ExtractedValuesConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        extractedItems={extractedItems}
        onConfirmAndGenerate={handleConfirmAndGenerate}
        isLoadingReport={isGenerating}
      />
    </div>
  );
}
