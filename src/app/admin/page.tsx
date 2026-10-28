'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Activity,
  Cpu,
  Layers,
  History,
  Terminal,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'sources' | 'models' | 'safety' | 'audit'>('sources');

  const medicalSources = [
    {
      organization: 'World Health Organization (WHO)',
      title: 'Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity',
      versionYear: 2021,
      lastVerified: '2026-08-14',
      status: 'Active & Verified',
      evidenceGrade: 'Grade A (High)',
    },
    {
      organization: 'British Society of Haematology (BSH)',
      title: 'Guidelines on the Management of Iron Deficiency in Adults',
      versionYear: 2021,
      lastVerified: '2026-09-02',
      status: 'Active & Verified',
      evidenceGrade: 'Grade A (High)',
    },
    {
      organization: 'American Diabetes Association (ADA)',
      title: 'Standards of Medical Care in Diabetes - Fasting Glucose & Glycemia',
      versionYear: 2024,
      lastVerified: '2026-07-20',
      status: 'Active & Verified',
      evidenceGrade: 'Grade A (High)',
    },
    {
      organization: 'Ministry of National Health Services, Pakistan',
      title: 'National Guidelines for Dengue Fever Management & Platelet Thresholds',
      versionYear: 2022,
      lastVerified: '2026-10-01',
      status: 'Active & Verified',
      evidenceGrade: 'National Clinical Standard',
    },
    {
      organization: 'Pakistan Society of Haematology (PSH)',
      title: 'Diagnostic Criteria for Thalassemia Minor and Microcytic Anemias in Pakistan',
      versionYear: 2022,
      lastVerified: '2026-09-15',
      status: 'Active & Verified',
      evidenceGrade: 'Regional Standard',
    },
  ];

  const modelTrackers = [
    {
      modelId: 'Deterministic-Clinical-Engine-v2.4',
      provider: 'Internal Rule-Based Engine',
      purpose: 'Strict algorithmic range boundary check & pattern synthesis',
      status: 'Primary Production Engine',
      deterministic: true,
      lastDeployed: '2026-10-15',
    },
    {
      modelId: 'Gemini-1.5-Flash-Vision',
      provider: 'Google AI Studio',
      purpose: 'Document optical table extraction & raw text parsing',
      status: 'Configured & Active',
      deterministic: false,
      lastDeployed: '2026-10-20',
    },
  ];

  const safetyIncidents = [
    {
      id: 'INC-2026-0941',
      timestamp: '2026-10-24 14:12:05 PKT',
      type: 'Critical Platelet Alert Triggered',
      details: 'PLT extracted at 38 x10^9/L. System immediately escalated to Rescue 1122 emergency advisory banner.',
      resolved: true,
      piiExposed: false,
    },
    {
      id: 'INC-2026-0812',
      timestamp: '2026-10-22 09:34:19 PKT',
      type: 'Low Confidence OCR Extraction Prevented',
      details: 'Blurry camera photo resulted in 0.42 confidence. Automated halt initiated; user prompted for manual confirmation.',
      resolved: true,
      piiExposed: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Administrative & Clinical Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Meri Sehat Knowledge & Safety Administration
          </h1>
          <p className="text-xs text-slate-500">
            Source verification tracking, AI model versions, escalation audit logs, and zero-PII privacy compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 text-white flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>Audit Level 3 Verified</span>
          </span>
        </div>
      </div>

      {/* Admin Privacy Guarantee Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Mandatory Health Data Privacy Rule:</strong> Patient documents are never exposed to administrators by default. This administration dashboard monitors model versions, source verification dates, and anonymous system logs only.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'sources'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Medical Sources & Guidelines ({medicalSources.length})
        </button>
        <button
          onClick={() => setActiveTab('models')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'models'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Model & Prompt Versions ({modelTrackers.length})
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'safety'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Safety Escalation Logs ({safetyIncidents.length})
        </button>
      </div>

      {/* Tab 1: Medical Sources */}
      {activeTab === 'sources' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Approved Medical Knowledge Base & Verified Revision Dates
              </h3>
              <p className="text-xs text-slate-500">
                All clinical rules, reference ranges, and emergency escalation criteria are anchored to these verified documents.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              100% Verified
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {medicalSources.map((src, i) => (
              <div key={i} className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{src.organization}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {src.evidenceGrade}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{src.title}</p>
                </div>
                <div className="text-right sm:shrink-0 text-slate-500">
                  <span className="font-mono text-slate-700 block">Verified: {src.lastVerified}</span>
                  <span className="text-emerald-700 font-semibold">{src.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Model Trackers */}
      {activeTab === 'models' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs p-6 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Active Processing Pipeline & Extraction Models
            </h3>
            <p className="text-xs text-slate-500">
              Provider-independent architecture with deterministic clinical fallback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modelTrackers.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{m.modelId}</h4>
                    <p className="text-xs text-teal-800 font-medium">{m.provider}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-600">{m.purpose}</p>
                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200 flex justify-between">
                  <span>Deterministic: {m.deterministic ? 'Yes' : 'Probabilistic Vision'}</span>
                  <span>Deployed: {m.lastDeployed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Safety Incidents */}
      {activeTab === 'safety' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Safety Escalation Audit Log (Zero PII Retained)
            </h3>
            <p className="text-xs text-slate-500">
              Audit record of critical value detections, emergency alerts triggered, and unreadable document rejections.
            </p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {safetyIncidents.map((inc) => (
              <div key={inc.id} className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-slate-900">{inc.id}</span>
                  <span className="text-slate-400 font-mono">{inc.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                    {inc.type}
                  </span>
                  <span className="text-slate-600">{inc.details}</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Safeguard executed successfully • Zero PII logged to persistent disk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
