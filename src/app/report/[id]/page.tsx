'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { reportStore } from '@/lib/storage/reportStore';
import { HealthReport, Biomarker } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import BiomarkerCard from '@/components/BiomarkerCard';
import BodySystemVisualizer from '@/components/BodySystemVisualizer';
import SafetyEscalationBanner from '@/components/SafetyEscalationBanner';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import {
  Activity,
  Calendar,
  Building2,
  User,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Trash2,
  Printer,
  ChevronRight,
  BookOpen,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Suspense } from 'react';

function ReportDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const { t, loc, language } = useLanguage();

  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [report, setReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'outside' | 'systems'>('all');

  useEffect(() => {
    if (reportId) {
      const found = reportStore.getReportById(reportId as string);
      setReport(found);
      setLoading(false);
    }
  }, [reportId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-[#112240] border-t-[#56E6F2] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#8FA2BD] font-medium">Loading clinical educational report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#F7FAFF]">Report Not Found</h2>
        <p className="text-xs text-[#8FA2BD]">
          The requested report may have been deleted or is unavailable in your browser storage.
        </p>
        <Link
          href="/analyzer"
          className="inline-block px-5 py-2.5 rounded-full bg-[#56E6F2] text-[#07111F] text-xs font-bold shadow-lg shadow-[#56E6F2]/20"
        >
          Analyze a New Report
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(t('report.confirmDeletion'))) {
      reportStore.deleteReport(report.id);
      router.push('/dashboard');
    }
  };

  const outsideRangeBiomarkers = report.biomarkers.filter(
    (b) => b.status === 'low' || b.status === 'high' || b.status === 'critical'
  );

  const displayedBiomarkers =
    activeTab === 'outside' ? outsideRangeBiomarkers : report.biomarkers;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 print-page">
      {/* 1. AI-Generated Educational Notice Header Banner */}
      <div className="bg-[#0B1930] border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[#56E6F2] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#56E6F2] uppercase tracking-wider">
                {t('report.aiEducationalNotice')}
              </span>
              {report.id.includes('sample') && (
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#9B8CFF]/20 text-[#9B8CFF] border border-[#9B8CFF]/40 font-mono font-bold">
                  FICTIONAL DEMO DATA
                </span>
              )}
            </div>
            <p className="text-xs text-[#8FA2BD] mt-0.5 font-mono">
              {t('report.generatedOn')}: {new Date(report.createdAt).toLocaleDateString()} • {new Date(report.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Action Controls: PDF Print, Compare, Delete */}
        <div className="flex items-center gap-2.5 shrink-0 no-print">
          <PdfDownloadButton reportTitle={`Meri_Sehat_${report.id}`} />
          <Link
            href={`/compare?primary=${report.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#112240] border border-white/10 hover:border-[#56E6F2]/40 text-[#F7FAFF] text-xs font-semibold shadow-sm transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#56E6F2]" />
            <span>{t('report.compareReport')}</span>
          </Link>
          <button
            onClick={handleDelete}
            className="p-2.5 rounded-xl text-[#8FA2BD] hover:text-red-400 hover:bg-white/5 border border-white/10 transition-colors"
            title="Delete this report permanently"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Urgent Safety Escalation (if critical findings present) */}
      <SafetyEscalationBanner escalations={report.safetyEscalations} />

      {/* 3. Report Overview Metadata Card */}
      <div className="bg-[#0B1930]/80 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[#8FA2BD] uppercase tracking-wider text-[10px] font-mono block mb-1">
              {t('report.labName')}
            </span>
            <div className="flex items-center gap-2 font-bold text-[#F7FAFF] text-sm">
              <Building2 className="w-4 h-4 text-[#56E6F2]" />
              <span>{report.laboratoryName || 'Diagnostic Center'}</span>
            </div>
          </div>

          <div>
            <span className="text-[#8FA2BD] uppercase tracking-wider text-[10px] font-mono block mb-1">
              Document Type
            </span>
            <div className="flex items-center gap-2 font-bold text-[#F7FAFF] text-sm">
              <Activity className="w-4 h-4 text-[#56E6F2]" />
              <span className="uppercase">{report.documentType}</span>
            </div>
          </div>

          <div>
            <span className="text-[#8FA2BD] uppercase tracking-wider text-[10px] font-mono block mb-1">
              {t('report.extractionQuality')}
            </span>
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t('report.highConfidence')} ({(report.extractionConfidence * 100).toFixed(0)}%)</span>
            </div>
          </div>

          <div>
            <span className="text-[#8FA2BD] uppercase tracking-wider text-[10px] font-mono block mb-1">
              Patient Context
            </span>
            <div className="flex items-center gap-2 font-bold text-[#F7FAFF] text-sm">
              <User className="w-4 h-4 text-[#9B8CFF]" />
              <span>
                {report.patientContext?.age ? `${report.patientContext.age} yrs` : 'Adult'} •{' '}
                {report.patientContext?.sex ? report.patientContext.sex.toUpperCase() : 'General'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Marker Pattern Analysis (e.g. Microcytic Anemia) */}
      {report.patternAnalysis && report.patternAnalysis.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#F7FAFF] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#56E6F2]" />
            <span>{t('report.keyFindings')}</span>
          </h2>

          <div className="space-y-4">
            {report.patternAnalysis.map((pat) => (
              <div
                key={pat.id}
                className="bg-[#0B1930] rounded-3xl border border-[#56E6F2]/30 p-6 sm:p-8 shadow-xl space-y-4 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30 inline-block mb-2">
                      Pattern Correlation
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F7FAFF]">
                      {loc(pat.title)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#8FA2BD] leading-relaxed bg-[#07111F]/80 p-4 rounded-2xl border border-white/5">
                  {loc(pat.description)}
                </p>

                {/* Possible Considerations */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F7FAFF] uppercase tracking-wider block">
                    Possible Explanations to Discuss with Clinician:
                  </span>
                  <ul className="space-y-2 text-xs text-[#8FA2BD]">
                    {pat.possibleConsiderations.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#07111F]/60 p-3 rounded-xl border border-white/5">
                        <span className="text-[#56E6F2] font-bold">•</span>
                        <span>{loc(c)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specific Questions for Doctor */}
                {pat.recommendedDoctorQuestions.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#112240]/60 border border-[#56E6F2]/20 space-y-2">
                    <span className="text-xs font-bold text-[#56E6F2] uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-[#56E6F2]" />
                      Suggested Questions for Your Healthcare Appointment:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#F7FAFF]">
                      {pat.recommendedDoctorQuestions.map((q, i) => (
                        <li key={i} className="font-medium">
                          &ldquo;{loc(q)}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. View Switcher Tabs: All Biomarkers vs Outside Reference Range vs Body Systems */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] shadow-md'
                  : 'bg-[#0B1930] text-[#8FA2BD] hover:text-[#F7FAFF] border border-white/10'
              }`}
            >
              All Biomarkers ({report.biomarkers.length})
            </button>
            <button
              onClick={() => setActiveTab('outside')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'outside'
                  ? 'bg-amber-500 text-[#07111F] shadow-md'
                  : 'bg-[#0B1930] text-amber-300 border border-amber-500/30 hover:border-amber-500'
              }`}
            >
              Outside Range ({outsideRangeBiomarkers.length})
            </button>
            <button
              onClick={() => setActiveTab('systems')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'systems'
                  ? 'bg-gradient-to-r from-[#9B8CFF] to-[#818cf8] text-[#07111F] shadow-md'
                  : 'bg-[#0B1930] text-[#8FA2BD] hover:text-[#F7FAFF] border border-white/10'
              }`}
            >
              Body Systems View
            </button>
          </div>

          <span className="text-xs text-[#8FA2BD]">
            Click any biomarker card to expand clinical citations & limitations
          </span>
        </div>

        {/* Tab Content */}
        {activeTab === 'systems' ? (
          <BodySystemVisualizer biomarkers={report.biomarkers} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedBiomarkers.map((b) => (
              <BiomarkerCard key={b.id} biomarker={b} />
            ))}
          </div>
        )}
      </div>

      {/* 6. General Questions for Doctor */}
      <div className="bg-[#0B1930]/80 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-4 backdrop-blur-xl">
        <h3 className="font-bold text-[#F7FAFF] text-base flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#56E6F2]" />
          <span>{t('report.questionsForDoctor')}</span>
        </h3>
        <p className="text-xs text-[#8FA2BD]">
          Take these questions to your doctor or pathologist to guide your consultation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {report.generalDoctorQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#07111F]/80 border border-white/5 text-xs font-medium text-[#F7FAFF] leading-relaxed"
            >
              &ldquo;{loc(q)}&rdquo;
            </div>
          ))}
        </div>
      </div>

      {/* 7. Final Medical Disclaimer Footer of Report */}
      <div className="p-5 rounded-2xl bg-[#0B1930]/50 border border-white/10 text-xs text-[#8FA2BD] space-y-2">
        <h4 className="font-bold text-[#F7FAFF] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#56E6F2]" />
          Standard Medical Disclaimer & Regulatory Notice:
        </h4>
        <p className="leading-relaxed">
          {loc(report.educationalDisclaimer)}
        </p>
      </div>
    </div>
  );
}

export default function ReportDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="w-12 h-12 border-4 border-[#112240] border-t-[#56E6F2] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#8FA2BD] font-medium">Preparing clinical report view...</p>
        </div>
      }
    >
      <ReportDetailsContent />
    </Suspense>
  );
}
