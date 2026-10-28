'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { reportStore } from '@/lib/storage/reportStore';
import { HealthReport, PrescriptionAnalysis } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  User,
  FileText,
  Pill,
  Trash2,
  TrendingUp,
  Shield,
  Lock,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [prescriptions, setPrescriptions] = useState<PrescriptionAnalysis[]>([]);

  useEffect(() => {
    setReports(reportStore.getAllReports());
    setPrescriptions(reportStore.getAllPrescriptions());
  }, []);

  const handleDeleteReport = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this report?')) {
      reportStore.deleteReport(id);
      setReports(reportStore.getAllReports());
    }
  };

  const handleClearAllData = () => {
    if (
      window.confirm(
        'Privacy Reset: This will permanently delete all saved reports and local browser health records. Proceed?'
      )
    ) {
      reportStore.clearAllReports();
      setReports([]);
      setPrescriptions([]);
      alert('All local health data cleared successfully.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Guest Privacy Session Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Patient Health Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Securely manage your educational health reports, compare historical tests, or delete records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/analyzer"
            className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            Analyze New Report
          </Link>
          <button
            onClick={handleClearAllData}
            className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Privacy Wipe (Clear All)</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Box */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Zero Cloud Retention in Guest Mode:</strong> Your health records are stored in your private browser memory. No third-party AI provider logs your personal health documents, and you can delete them anytime.
        </p>
      </div>

      {/* Saved Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Saved Lab Reports ({reports.length})</span>
          </h2>
          {reports.length >= 2 && (
            <Link
              href="/compare"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Compare Recent Tests</span>
            </Link>
          )}
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-xs text-slate-500">No reports saved yet.</p>
            <Link
              href="/report/sample"
              className="inline-block px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
            >
              Load Sample Report Demo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((r) => {
              const abnormalCount = r.biomarkers.filter((b) => b.status !== 'normal').length;
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                          {r.documentType.toUpperCase()}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {r.sourceFileName || 'Laboratory Report'}
                        </h3>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {r.biomarkers.length} Biomarkers
                      </span>
                      {abnormalCount > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {abnormalCount} Outside Range
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          All In Range
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/report/${r.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
                    >
                      <span>View Educational Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteReport(r.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Prescriptions Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Pill className="w-4 h-4 text-teal-600" />
          <span>Prescription Explanations ({prescriptions.length})</span>
        </h2>

        {prescriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
            No prescriptions analyzed yet. Visit the{' '}
            <Link href="/prescription" className="text-teal-700 font-semibold underline">
              Prescription Explainer
            </Link>{' '}
            to learn about medicines.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {rx.medicines.length} Medicines Evaluated
                  </span>
                  <span>{new Date(rx.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1">
                  {rx.medicines.map((m) => (
                    <div key={m.id} className="text-xs font-medium text-slate-800">
                      • {m.brandName || m.medicineName} ({m.genericName})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
