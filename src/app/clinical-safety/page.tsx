'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertOctagon, PhoneCall, CheckCircle2, Lock, Stethoscope } from 'lucide-react';

export default function ClinicalSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold border border-red-200">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>Patient Safety & Clinical Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
          Clinical Safety Framework & Emergency Escalation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Meri Sehat AI operates under strict healthcare guardrails to protect patients, prevent harmful delays in urgent medical intervention, and eliminate misleading diagnostic claims.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed shadow-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            1. Emergency Escalation Triggers
          </h2>
          <p>
            When a patient’s laboratory report displays values meeting clinician-reviewed critical thresholds, Meri Sehat AI immediately suppresses ordinary speculative interpretations and displays an unmetered, high-priority emergency advisory.
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
            <li>
              <strong>Marked Thrombocytopenia (Platelets &lt; 50,000 / µL):</strong> During South Asian viral epidemics (such as Dengue fever), rapid platelet drops signify spontaneous bleeding risk. Immediate hospital triage instructions are provided.
            </li>
            <li>
              <strong>Severe Symptomatic Anemia (Hemoglobin &lt; 7.0 g/dL):</strong> Significant risk of hemodynamic instability and tissue hypoxia; warrants immediate clinical evaluation for transfusion requirements.
            </li>
            <li>
              <strong>Critical Laboratory Flags Reported by Provider:</strong> Any biomarker explicitly marked with a critical flag by the original laboratory is preserved and surfaced as an urgent physician discussion priority.
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-2">
          <h3 className="font-bold flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-red-600" />
            Emergency Services in Pakistan:
          </h3>
          <p>
            If you or a loved one are experiencing chest pain, acute shortness of breath, sudden weakness, severe abdominal pain, or abnormal bleeding, do not wait for AI analysis. Call <strong>Rescue 1122</strong> or proceed to the nearest emergency department immediately.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            2. Pharmacological & Prescription Safeguards
          </h2>
          <p>
            Meri Sehat AI strictly obeys the following clinical rules regarding prescriptions:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
            <li>
              <strong>No Dose Modification:</strong> We never recommend altering, tapering, stopping, or substituting prescribed medications.
            </li>
            <li>
              <strong>No Speculative Diagnosis:</strong> We never infer a doctor&rsquo;s clinical diagnosis solely from a prescribed drug.
            </li>
            <li>
              <strong>Illegible Verification Requirement:</strong> If handwriting or dosing instructions are ambiguous, we mandate checking with the dispensing pharmacist.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-600" />
            3. Zero Data Training on Personal Records
          </h2>
          <p>
            Health documents are highly sensitive. Meri Sehat AI strictly prohibits using identifiable patient documents or health uploads for machine learning model training without explicit, separate, informed consent.
          </p>
        </div>
      </div>
    </div>
  );
}
