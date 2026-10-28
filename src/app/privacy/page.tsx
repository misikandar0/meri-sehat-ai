'use client';

import React from 'react';
import { Lock, Shield, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Lock className="w-3.5 h-3.5 text-teal-600" />
          <span>Data Governance & Patient Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Last revised: October 2026 • Compliant with ethical healthcare privacy principles.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed shadow-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            1. No Model Training on Your Health Documents
          </h2>
          <p>
            We strictly enforce a policy where uploaded medical laboratory reports, doctor prescriptions, and personal health values are <strong>never</strong> used to train, fine-tune, or improve public AI models.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            2. Guest-First Architecture & Private Browser Storage
          </h2>
          <p>
            When utilizing Meri Sehat as a guest, your processed health reports are stored strictly in your browser’s local client storage. They are not preserved on permanent backend database disks. You retain total authority to clear your records instantly using the &ldquo;Privacy Wipe&rdquo; button in the dashboard.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            3. Transmission Security
          </h2>
          <p>
            All network communication with Meri Sehat AI occurs over encrypted TLS/HTTPS connections. Server memory handling document optical character recognition flushes document payloads immediately following structured extraction.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            4. Third-Party Sharing Restrictions
          </h2>
          <p>
            We do not sell, rent, monetize, or trade patient health records with pharmaceutical marketers, advertisers, or insurance brokers.
          </p>
        </div>
      </div>
    </div>
  );
}
