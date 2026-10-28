'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { reportStore } from '@/lib/storage/reportStore';
import { HealthReport, Biomarker } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Activity,
  Info,
  CheckCircle2,
} from 'lucide-react';

export default function CompareReportsPage() {
  const { t, language } = useLanguage();
  const [allReports, setAllReports] = useState<HealthReport[]>([]);
  const [prevReportId, setPrevReportId] = useState<string>('sample-historical-report');
  const [currReportId, setCurrReportId] = useState<string>('sample-demo-report');

  useEffect(() => {
    const list = reportStore.getAllReports();
    setAllReports(list);
    if (list.length >= 2) {
      setPrevReportId(list[1].id);
      setCurrReportId(list[0].id);
    }
  }, []);

  const prevReport = allReports.find((r) => r.id === prevReportId);
  const currReport = allReports.find((r) => r.id === currReportId);

  // Compare matching biomarkers
  const comparisonRows = (currReport?.biomarkers || []).map((currBm) => {
    const prevBm = prevReport?.biomarkers.find(
      (b) =>
        b.shortName.toLowerCase() === currBm.shortName.toLowerCase() ||
        b.name.toLowerCase() === currBm.name.toLowerCase()
    );

    const isCompatible = prevBm ? prevBm.unit === currBm.unit : false;
    const diff = prevBm && isCompatible ? currBm.value - prevBm.value : null;

    let trendType: 'up' | 'down' | 'neutral' = 'neutral';
    if (diff !== null) {
      if (Math.abs(diff) < 0.05) trendType = 'neutral';
      else if (diff > 0) trendType = 'up';
      else trendType = 'down';
    }

    return {
      currBm,
      prevBm,
      diff,
      trendType,
      isCompatible,
    };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
          <span>Biomarker Longitudinal Tracking</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
          Compare Two Confirmed Laboratory Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Inspect how your hemoglobin, platelets, and other values have changed over time. Only tests with identical units and validated standard markers are compared.
        </p>
      </div>

      {/* Selectors for 2 Reports */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Previous Report Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Baseline / Earlier Report:
            </label>
            <select
              value={prevReportId}
              onChange={(e) => setPrevReportId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              {allReports.map((r) => (
                <option key={r.id} value={r.id}>
                  {new Date(r.createdAt).toLocaleDateString()} — {r.sourceFileName || 'Report'} ({r.biomarkers.length} tests)
                </option>
              ))}
            </select>
            {prevReport && (
              <p className="text-[11px] text-slate-500 mt-1">
                Recorded on: {new Date(prevReport.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Current Report Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Recent / Current Report:
            </label>
            <select
              value={currReportId}
              onChange={(e) => setCurrReportId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              {allReports.map((r) => (
                <option key={r.id} value={r.id}>
                  {new Date(r.createdAt).toLocaleDateString()} — {r.sourceFileName || 'Report'} ({r.biomarkers.length} tests)
                </option>
              ))}
            </select>
            {currReport && (
              <p className="text-[11px] text-slate-500 mt-1">
                Recorded on: {new Date(currReport.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Biomarker</th>
                <th className="py-3 px-4 text-center">Reference Range</th>
                <th className="py-3 px-4 text-right">
                  Previous ({prevReport ? new Date(prevReport.createdAt).toLocaleDateString() : 'Baseline'})
                </th>
                <th className="py-3 px-4 text-right">
                  Current ({currReport ? new Date(currReport.createdAt).toLocaleDateString() : 'Recent'})
                </th>
                <th className="py-3 px-4 text-center">Absolute Change</th>
                <th className="py-3 px-4 text-center">Trend Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, index) => {
                const { currBm, prevBm, diff, trendType, isCompatible } = row;

                return (
                  <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{currBm.name}</span>
                      <span className="text-[11px] text-slate-500">{currBm.shortName}</span>
                    </td>

                    {/* Reference Range */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-600">
                      {currBm.referenceRange.low} - {currBm.referenceRange.high} {currBm.unit}
                    </td>

                    {/* Previous Value */}
                    <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                      {prevBm ? (
                        <span>
                          {prevBm.value} {prevBm.unit}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not tested</span>
                      )}
                    </td>

                    {/* Current Value */}
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      <span>
                        {currBm.value} {currBm.unit}
                      </span>
                    </td>

                    {/* Delta / Absolute Change */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {diff !== null ? (
                        <span
                          className={`font-bold ${
                            diff > 0 ? 'text-teal-700' : diff < 0 ? 'text-amber-700' : 'text-slate-500'
                          }`}
                        >
                          {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)} {currBm.unit}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Trend Icon & Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {trendType === 'up' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Increased</span>
                        </span>
                      )}
                      {trendType === 'down' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>Decreased</span>
                        </span>
                      )}
                      {trendType === 'neutral' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                          <Minus className="w-3.5 h-3.5" />
                          <span>Unchanged</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Clinical Limitations Box */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
        <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          Important Clinical Trend Limitations:
        </h4>
        <p className="leading-relaxed">
          A biological trend alone does not prove treatment success, disease recovery, or disease progression. Laboratory equipment calibration differences, hydration levels, collection timing, and fasting state all cause natural physiological fluctuations. Always present historical trends to your physician for holistic context.
        </p>
      </div>
    </div>
  );
}
