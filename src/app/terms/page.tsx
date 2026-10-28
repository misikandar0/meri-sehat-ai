'use client';

import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
          <FileText className="w-3.5 h-3.5 text-slate-600" />
          <span>Terms & User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Effective Date: October 2026 • Please read carefully before using Meri Sehat AI.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed shadow-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            1. Nature of the Service
          </h2>
          <p>
            Meri Sehat AI provides educational information designed to help users understand medical laboratory vocabulary, standard biological reference ranges, and prescription terms. It is not a licensed medical clinic, hospital, diagnostic laboratory, or pharmacy.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            2. No Doctor-Patient Relationship
          </h2>
          <p>
            Use of this website does not establish a doctor-patient relationship. You agree not to rely on Meri Sehat AI for emergency medical decisions, self-diagnosis, or self-prescribed medication dosage alterations.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            3. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable Pakistani and international laws, Meri Sehat AI, its developers, and clinical advisors shall not be liable for any health decisions made without independent clinical consultation with a licensed physician.
          </p>
        </div>
      </div>
    </div>
  );
}
