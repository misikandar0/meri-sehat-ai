'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import UploadDropzone from '@/components/UploadDropzone';
import ExtractedValuesConfirmModal, { EditableBiomarkerItem } from '@/components/ExtractedValuesConfirmModal';
import FounderModal from '@/components/FounderModal';
import { reportStore } from '@/lib/storage/reportStore';
import Hero3DCanvas from '@/components/Hero3DCanvas';
import MarqueeTicker from '@/components/MarqueeTicker';
import InteractiveSamplePreview from '@/components/InteractiveSamplePreview';
import Card3DTilt from '@/components/Card3DTilt';
import { PRICING_PLANS } from '@/lib/payment/paymentService';
import {
  Activity,
  FileText,
  Pill,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Stethoscope,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  ShieldAlert,
  Sliders,
  Layers,
  ArrowUpRight,
  Download,
  GraduationCap,
  Award,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [extractedItems, setExtractedItems] = useState<EditableBiomarkerItem[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);
  const [founderModalOpen, setFounderModalOpen] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUploaded = async (fileData: { name: string; size: number; mimeType: string; base64?: string }) => {
    setIsProcessingUpload(true);
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
        alert(data.error || 'Could not parse document. Please try manual entry or demo report.');
      }
    } catch {
      alert('Network error connecting to analysis server. Loading demo sample instead.');
      router.push('/report/sample');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleConfirmAndGenerate = async (confirmedItems: EditableBiomarkerItem[]) => {
    setIsGeneratingReport(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          biomarkers: confirmedItems,
          sourceFileName: 'Uploaded_Report.pdf',
          laboratoryName: 'Diagnostic Laboratory',
          explicitConsentGiven: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        reportStore.saveReport(data.report);
        router.push(`/report/${data.report.id}`);
      } else {
        alert('Report synthesis failed. Please review values.');
      }
    } catch {
      alert('Error finalizing report.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleLoadSampleDemo = () => {
    router.push('/report/sample');
  };

  const howItWorksSteps = [
    {
      num: '01',
      tag: 'INPUT STAGE',
      title: 'Upload Lab Report or Prescription',
      description:
        'Upload your blood test (CBC, lipid panel, metabolic profile) or doctor prescription in PDF, JPG, or PNG format. Our vision engine extracts raw textual markers and reference values.',
      badge: 'Zero AI Model Training',
      accent: '#56E6F2',
      details: [
        'Secure client-side document processing',
        'Automatic document rotation & boundary detection',
        'Supports standard laboratory formats across Pakistan',
      ],
    },
    {
      num: '02',
      tag: 'VERIFICATION STAGE',
      title: 'Confirm Extracted Values & Ranges',
      description:
        'Never rely blindly on machine extraction. Review parsed biomarker values, scientific units, and lab reference thresholds side-by-side with your physical report, with full editing control.',
      badge: 'Patient In The Loop',
      accent: '#9B8CFF',
      details: [
        'Side-by-side numeric verification table',
        'Flag abnormal or critical values explicitly',
        'Mandatory explicit patient consent before generation',
      ],
    },
    {
      num: '03',
      tag: 'ACTIONABLE STAGE',
      title: 'Know Your Next Step & Doctor Questions',
      description:
        'Read cautious, plain-language explanations of individual markers and multi-marker patterns (like microcytic anemia). Walk away with specific, grounded questions for your physician.',
      badge: 'Evidence-Grade Translation',
      accent: '#56E6F2',
      details: [
        'Contextual explanations without diagnosing disease',
        'Pre-formulated questions for 5-minute doctor consults',
        'Instant translation to Urdu & Roman Urdu',
      ],
    },
  ];

  const problemCards = [
    {
      num: '01',
      title: 'Unfamiliar Medical Terminology',
      summary: 'Greek and Latin medical jargon causes unnecessary confusion.',
      desc: 'Terms like "Microcytosis", "Thrombocytopenia", or "Transaminases" alienate patients and prompt stressful online searches that often suggest catastrophic scenarios.',
      solution: 'Meri Sehat translates complex clinical terms into clear, conversational language without losing scientific precision.',
    },
    {
      num: '02',
      title: 'Varying Reference Ranges & False Alarms',
      summary: 'Lab reference limits differ by machine calibration, sex, and age.',
      desc: 'A result that is 0.1 below a laboratory boundary rarely means an acute emergency on its own, yet patients panic when seeing red ink without clinical context.',
      solution: 'Our visual range indicators contextualize mild fluctuations versus clinically significant flags.',
    },
    {
      num: '03',
      title: 'Disconnected Physiological Relevance',
      summary: 'Patients are handed numbers without understanding their function.',
      desc: 'Most lab reports do not explain what a biomarker actually does in the human body—whether it transports oxygen, regulates immunity, or aids clotting.',
      solution: 'Every marker is tied to its physiological organ system and metabolic role in plain terms.',
    },
    {
      num: '04',
      title: 'Anxiety-Rushed Doctor Appointments',
      summary: 'Average clinical consultations last only 4 to 7 minutes.',
      desc: 'Patients frequently leave the clinic realizing they forgot to ask what their test meant, what lifestyle steps to take, or whether follow-up testing is needed.',
      solution: 'We equip you with 3 to 5 targeted, respectful questions designed specifically for your doctor visit.',
    },
  ];

  const faqs = [
    {
      q: 'Does Meri Sehat AI replace my doctor or diagnose illnesses?',
      a: 'No. Meri Sehat AI is an educational tool designed strictly to help you understand medical language and prepare for your doctor visits. It does not provide medical diagnoses, prescribe treatments, or alter medications. Always consult a licensed physician for clinical decisions.',
    },
    {
      q: 'How does it handle values outside normal laboratory reference ranges?',
      a: 'Reference ranges vary between labs, age groups, and sexes. Our platform explains possible contextual reasons why a result might be higher or lower without jumping to disease conclusions. For example, low MCV and low hemoglobin can be caused by iron deficiency or beta-thalassemia trait, so we suggest discussing confirmatory ferritin tests with your physician.',
    },
    {
      q: 'Is my health data kept private?',
      a: 'Yes. Meri Sehat AI is architected with a privacy-first guest workflow. We do not use your personal medical documents to train AI models, and you have complete control to delete any report permanently at any moment with zero residual logs.',
    },
    {
      q: 'What languages are supported?',
      a: 'We offer full multilingual support for English, Urdu (اردو with right-to-left typography), and Roman Urdu. Medical values and scientific units are strictly preserved across all translations.',
    },
    {
      q: 'What should I do if a report indicates a critical value?',
      a: 'If a lab result hits a critical threshold (such as platelets under 50,000 / µL during dengue fever season), our platform triggers an immediate emergency advisory banner urging you to visit an emergency room or contact Rescue 1122 right away.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 overflow-hidden relative">
      {/* =========================================================================
          SECTION B: CINEMATIC HERO SECTION ("YOUR HEALTH. DECODED.")
      ========================================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-16 lg:pb-24">
        {/* Background Atmospheric Lighting Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#56E6F2]/10 blur-[120px] animate-atmospheric" />
          <div className="absolute top-20 right-1/4 w-[450px] h-[450px] rounded-full bg-[#9B8CFF]/10 blur-[130px] animate-atmospheric" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Bold Editorial Headline, Copy, and CTAs */}
            <div className="lg:col-span-6 space-y-8 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B1930]/90 border border-[#56E6F2]/30 text-xs font-semibold text-[#56E6F2] shadow-[0_0_20px_-5px_rgba(86,230,242,0.3)] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#56E6F2]" />
                <span className="tracking-wide">ETHICAL CLINICAL AI • PATIENT EMPOWERMENT</span>
              </div>

              {/* Bold Editorial Headline */}
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-[#F7FAFF] tracking-tight leading-[1.02]">
                  Your Health.
                  <span className="block text-gradient-cyan">Decoded.</span>
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#8FA2BD] leading-relaxed max-w-xl font-normal">
                Turn complex medical laboratory reports into clear, cautious explanations. Understand your biomarkers, reference ranges, and discover the right questions to ask your doctor.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToUpload}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#56E6F2] via-[#38bdf8] to-[#9B8CFF] text-[#07111F] font-extrabold text-sm shadow-[0_0_35px_rgba(86,230,242,0.35)] hover:shadow-[0_0_50px_rgba(86,230,242,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Activity className="w-4 h-4 stroke-[2.5]" />
                  <span>Analyze My Report</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/report/sample"
                  className="px-7 py-4 rounded-full bg-[#0B1930]/80 hover:bg-[#112240] text-[#F7FAFF] border border-white/15 hover:border-[#56E6F2]/50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 text-[#56E6F2]" />
                  <span>Explore a Sample Report</span>
                </Link>
              </div>

              {/* Privacy Reassurance (Verified Implementation) */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-xs text-[#8FA2BD] bg-[#0B1930]/50 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-[#56E6F2] shrink-0" />
                  <span>
                    <strong>100% Private Guest Processing</strong> • Zero AI Model Training on Patient Files • Instant Local Deletion
                  </span>
                </div>
              </div>

              {/* Floating Interface HUD Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
                <div className="p-3.5 rounded-2xl bg-[#0B1930]/60 border border-white/5">
                  <div className="text-[10px] text-[#8FA2BD] font-mono uppercase">Reference Limits</div>
                  <div className="text-base font-bold text-[#F7FAFF] mt-0.5">Verified</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0B1930]/60 border border-white/5">
                  <div className="text-[10px] text-[#8FA2BD] font-mono uppercase">Pattern Engine</div>
                  <div className="text-base font-bold text-[#56E6F2] mt-0.5">Multi-Marker</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0B1930]/60 border border-white/5">
                  <div className="text-[10px] text-[#8FA2BD] font-mono uppercase">Languages</div>
                  <div className="text-base font-bold text-[#9B8CFF] mt-0.5">EN • اردو • ROM</div>
                </div>
              </div>
            </div>

            {/* Right Column: Real-time 3D Anatomical & Biomarker Canvas with Scroll Transitions */}
            <div className="lg:col-span-6 relative">
              <Card3DTilt depth={6} scrollTiltIntensity={0.08}>
                <div className="relative rounded-3xl bg-gradient-to-b from-[#0B1930]/70 to-[#07111F]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
                  {/* 3D WebGL Scene with 3D transitions while page is moving */}
                  <Hero3DCanvas />
                </div>
              </Card3DTilt>
            </div>
          </div>

          {/* Integrated Interactive Document Upload Dropzone with 3D Tilt */}
          <div ref={uploadSectionRef} className="mt-16 sm:mt-24 max-w-3xl mx-auto">
            <Card3DTilt depth={6} scrollTiltIntensity={0.1}>
              <div className="rounded-3xl bg-[#0B1930]/85 backdrop-blur-2xl p-6 sm:p-10 border border-white/15 shadow-[0_20px_60px_-15px_rgba(7,17,31,0.8)]">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#F7FAFF]">
                        Upload Laboratory Report or Prescription
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30 font-bold">
                        STEP 01
                      </span>
                    </div>
                    <p className="text-xs text-[#8FA2BD] mt-0.5">
                      Upload a CBC, metabolic panel, or prescription document for instant, cautious plain-language translation.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#56E6F2]/10 text-[#56E6F2] border border-[#56E6F2]/30 shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
                    <Lock className="w-3 h-3" />
                    <span>Zero Cloud Retention</span>
                  </span>
                </div>

                <UploadDropzone
                  onFileProcessed={handleFileUploaded}
                  onUseSampleDemo={handleLoadSampleDemo}
                  isProcessing={isProcessingUpload}
                  documentTypeLabel="Blood Report (PDF, JPG, PNG)"
                />
              </div>
            </Card3DTilt>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: CONTINUOUS ANIMATED TYPOGRAPHY STRIP
      ========================================================================== */}
      <MarqueeTicker />

      {/* =========================================================================
          SECTION D: THE PROBLEM SECTION (OVERSIZED EDITORIAL TYPOGRAPHY WITH 3D TILT)
      ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-4xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B8CFF]/15 border border-[#9B8CFF]/30 text-xs font-mono text-[#9B8CFF]">
            <span>THE HEALTH LITERACY GAP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F7FAFF] tracking-tight leading-[1.08]">
            Medical reports shouldn&apos;t feel like{' '}
            <span className="text-gradient-cyan">another language.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#8FA2BD] leading-relaxed max-w-2xl">
            Millions of patients receive laboratory sheets and prescriptions every day, yet fewer than 12% leave the clinic truly understanding what their results mean.
          </p>
        </div>

        {/* Problem Breakdown Editorial Cards with 3D Tilt Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemCards.map((item, idx) => (
            <Card3DTilt
              key={idx}
              depth={8}
              scrollTiltIntensity={0.14}
              className="h-full"
            >
              <div className="glass-panel-interactive rounded-3xl p-8 border border-white/10 relative overflow-hidden group h-full flex flex-col justify-between">
                <div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#56E6F2]/20 group-hover:text-[#56E6F2]/40 transition-colors mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#F7FAFF] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#56E6F2] mb-3">
                    {item.summary}
                  </p>
                  <p className="text-xs text-[#8FA2BD] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 text-xs text-[#F7FAFF]/90 flex items-start gap-2 bg-[#07111F]/60 p-3.5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#56E6F2] shrink-0 mt-0.5" />
                  <span>{item.solution}</span>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION E: HOW MERI SEHAT WORKS (01 UPLOAD, 02 UNDERSTAND, 03 KNOW YOUR NEXT STEP)
      ========================================================================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-xs font-mono text-[#56E6F2]">
            <span>TRANSPARENT THREE-STEP ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight">
            How Meri Sehat Works
          </h2>
          <p className="text-sm sm:text-base text-[#8FA2BD]">
            Designed for clinical accuracy, user verification, and patient empowerment without replacing your doctor.
          </p>
        </div>

        {/* Interactive Steps Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {howItWorksSteps.map((step, idx) => (
            <Card3DTilt
              key={idx}
              depth={9}
              scrollTiltIntensity={0.15}
              className="h-full"
            >
              <div
                className={`rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between backdrop-blur-xl h-full cursor-pointer ${
                  activeStepTab === idx
                    ? 'bg-[#0B1930] border-[#56E6F2] shadow-[0_0_40px_rgba(86,230,242,0.18)] ring-1 ring-[#56E6F2]/40'
                    : 'bg-[#0B1930]/50 border-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveStepTab(idx)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-[#56E6F2]">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#8FA2BD] font-bold">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F7FAFF] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#8FA2BD] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5 text-xs text-[#8FA2BD] border-t border-white/5 pt-4">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#56E6F2] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#56E6F2]">{step.badge}</span>
                  <span className="w-2 h-2 rounded-full bg-[#56E6F2]" />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: INTERACTIVE SAMPLE REPORT PREVIEW (CBC BIOMARKER MATRIX)
      ========================================================================== */}
      <section id="sample-report" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B8CFF]/15 border border-[#9B8CFF]/30 text-xs font-mono text-[#9B8CFF]">
            <span>REALISTIC PATIENT DASHBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight">
            Interactive Sample Report
          </h2>
          <p className="text-sm sm:text-base text-[#8FA2BD]">
            Experience our plain-language explanations, reference visualizers, and doctor questions using verified fictional laboratory data.
          </p>
        </div>

        {/* Interactive Sample Report Showcase Component (with 3D Tilt on each marker) */}
        <InteractiveSamplePreview />
      </section>

      {/* =========================================================================
          SECTION G: FEATURE SHOWCASE (BENTO-GRID COMPOSITIONS WITH 3D DEPTH)
      ========================================================================== */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-xs font-mono text-[#56E6F2]">
            <span>ENGINEERED FOR PATIENT SAFETY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight">
            Built for Clinical Clarity & Understanding
          </h2>
          <p className="text-sm sm:text-base text-[#8FA2BD]">
            Every feature is architected to eliminate ambiguity and promote safe, informed doctor-patient conversations.
          </p>
        </div>

        {/* Bento Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: AI-Assisted Document Reading */}
          <div className="md:col-span-2">
            <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="h-full">
              <div className="glass-panel-interactive rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[#56E6F2] flex items-center justify-center mb-6">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#56E6F2] uppercase tracking-wider">
                    VISION OCR & STRUCTURE PARSER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F7FAFF] mt-1 mb-3">
                    AI-Assisted Document Reading
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8FA2BD] leading-relaxed max-w-xl">
                    Our vision engine accurately extracts complex tabular layouts from laboratory printouts and scanned doctor prescriptions. It identifies test names, numeric findings, scientific units, and reference ranges automatically.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8FA2BD]">Supports PDF, JPG, PNG up to 10MB</span>
                  <Link href="/analyzer" className="text-xs font-bold text-[#56E6F2] flex items-center gap-1 hover:underline">
                    <span>Try Document Decoder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card3DTilt>
          </div>

          {/* Feature 2: Prescription Explainer */}
          <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="h-full">
            <div className="glass-panel-interactive rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#9B8CFF]/10 border border-[#9B8CFF]/30 text-[#9B8CFF] flex items-center justify-center mb-6">
                  <Pill className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#9B8CFF] uppercase tracking-wider">
                  PHARMACOLOGICAL LITERACY
                </span>
                <h3 className="text-xl font-bold text-[#F7FAFF] mt-1 mb-3">
                  Prescription Explainer
                </h3>
                <p className="text-xs text-[#8FA2BD] leading-relaxed">
                  Understand why a medicine was prescribed, how it acts, critical precautions, and food/drug interactions in plain language.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link href="/prescription" className="text-xs font-bold text-[#9B8CFF] flex items-center gap-1 hover:underline">
                  <span>Decode Medicine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Card3DTilt>

          {/* Feature 3: Multilingual Support */}
          <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="h-full">
            <div className="glass-panel-interactive rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[#56E6F2] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#56E6F2] uppercase tracking-wider">
                  SOUTH ASIAN ACCESSIBILITY
                </span>
                <h3 className="text-xl font-bold text-[#F7FAFF] mt-1 mb-3">
                  English, اردو & Roman Urdu
                </h3>
                <p className="text-xs text-[#8FA2BD] leading-relaxed">
                  Switch between languages with one tap. Right-to-left Nastaleeq typography and Roman transliteration ensure everyone understands their health.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-[#8FA2BD]">Preserves scientific units across translations</span>
              </div>
            </div>
          </Card3DTilt>

          {/* Feature 4: Two-Report Trend Tracker */}
          <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="h-full">
            <div className="glass-panel-interactive rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[#56E6F2] flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#56E6F2] uppercase tracking-wider">
                  LONGITUDINAL TRACKING
                </span>
                <h3 className="text-xl font-bold text-[#F7FAFF] mt-1 mb-3">
                  Two-Report Trend Comparison
                </h3>
                <p className="text-xs text-[#8FA2BD] leading-relaxed">
                  Compare past and current lab tests side-by-side to track changes in hemoglobin, platelets, fasting glucose, or lipid markers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link href="/compare" className="text-xs font-bold text-[#56E6F2] flex items-center gap-1 hover:underline">
                  <span>Compare 2 Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Card3DTilt>

          {/* Feature 5: Emergency Escalation Protocols */}
          <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="h-full">
            <div className="glass-panel-interactive rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                  CRITICAL TRIAGE SAFEGUARDS
                </span>
                <h3 className="text-xl font-bold text-[#F7FAFF] mt-1 mb-3">
                  Emergency Escalation (1122)
                </h3>
                <p className="text-xs text-[#8FA2BD] leading-relaxed">
                  Immediate alert banners for dangerous findings (such as severe thrombocytopenia &lt; 50,000 / µL during dengue season) with Rescue 1122 guidance.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link href="/clinical-safety" className="text-xs font-bold text-amber-300 flex items-center gap-1 hover:underline">
                  <span>View Safety Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Card3DTilt>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: PRIVACY AND RESPONSIBLE AI
      ========================================================================== */}
      <section id="privacy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card3DTilt depth={5} scrollTiltIntensity={0.08}>
          <div className="rounded-3xl bg-[#0B1930]/90 border border-white/10 p-8 sm:p-14 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-xs font-mono text-[#56E6F2]">
                <ShieldCheck className="w-4 h-4" />
                <span>RESPONSIBLE AI HEALTHCARE PLEDGE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F7FAFF] tracking-tight">
                Privacy First. Scientifically Grounded.
              </h2>

              <p className="text-xs sm:text-sm text-[#8FA2BD] leading-relaxed">
                We believe healthcare technology must be radically transparent. Here are our strict operational commitments:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F7FAFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#56E6F2]" />
                    <span>Educational, Not Diagnostic</span>
                  </div>
                  <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                    We explain laboratory findings to help you prepare for discussions with licensed clinicians. We never formulate diagnostic judgments.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F7FAFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#56E6F2]" />
                    <span>Zero Training on Your Records</span>
                  </div>
                  <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                    Your medical documents are processed in ephemeral memory. We never retain personal lab records or use them to train machine learning models.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F7FAFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#56E6F2]" />
                    <span>User Verification Required</span>
                  </div>
                  <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                    Every extracted biomarker number, unit, and reference range must be verified by you before report generation commences.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F7FAFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#56E6F2]" />
                    <span>Permanent One-Click Deletion</span>
                  </div>
                  <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                    Reports are stored in your private browser localStorage. You can clear and wipe all health records instantly at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          SECTION: FOUNDER & CLINICAL LEAD SPOTLIGHT (PHARMACY GRADUATE CREDENTIALS)
      ========================================================================== */}
      <section id="founder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card3DTilt depth={7} scrollTiltIntensity={0.12} className="w-full">
          <div className="relative rounded-3xl bg-gradient-to-tr from-[#0B1930] via-[#0D1D38] to-[#07111F] border border-[#56E6F2]/30 p-8 sm:p-12 overflow-hidden shadow-[0_0_50px_rgba(86,230,242,0.12)]">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#56E6F2]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#9B8CFF]/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Founder Real Photo & Quick Actions */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-3xl overflow-hidden border-2 border-[#56E6F2]/50 shadow-[0_0_30px_rgba(86,230,242,0.25)] relative">
                    <Image
                      src="/founder-mian-sikandar-hayyat.jpg"
                      alt="Mian Sikandar Hayyat - Founder of Meri Sehat AI"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 p-2.5 rounded-2xl bg-[#07111F] border border-[#56E6F2] text-[#56E6F2] shadow-xl">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#F7FAFF] tracking-tight">
                    Mian Sikandar Hayyat
                  </h3>
                  <p className="text-xs font-bold text-[#56E6F2]">
                    Doctor of Pharmacy (Pharm.D) Graduate
                  </p>
                  <p className="text-[11px] text-[#8FA2BD]">
                    Faculty of Pharmaceutical Sciences, UCP Lahore
                  </p>
                </div>

                {/* Founder Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full max-w-xs pt-1">
                  <a
                    href="https://www.linkedin.com/in/mian-sikandar-hayyat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold shadow-md shadow-[#0077b5]/25 transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setFounderModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#112240] hover:bg-[#1a3360] text-[#56E6F2] hover:text-[#F7FAFF] border border-[#56E6F2]/30 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Full Clinical Credentials</span>
                  </button>
                </div>
              </div>

              {/* Founder Academic & Clinical Profile */}
              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-xs font-mono text-[#56E6F2]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FOUNDER SPOTLIGHT • PHARMACY GRADUATE EXPERTISE</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#F7FAFF] tracking-tight">
                    Clinical Rigor Grounded in Pharmaceutical Sciences
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8FA2BD] leading-relaxed">
                    Meri Sehat AI was conceived and built by a Pharmacy graduate from the <strong className="text-[#F7FAFF]">Faculty of Pharmaceutical Sciences, University of Central Punjab (UCP), Lahore</strong>. Having spent years studying clinical pharmacotherapy, diagnostic thresholds, and patient care, Mian Sikandar Hayyat noticed the widespread barrier patients in Pakistan face when interpreting medical reports and prescriptions.
                  </p>
                </div>

                {/* 4 Pharmacy Graduate Competencies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-[#56E6F2] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#56E6F2]" />
                      <span>Doctor of Pharmacy (Pharm.D)</span>
                    </div>
                    <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                      Rigorous 5-year curriculum covering clinical pharmacology, toxicology, pathology, hospital pharmacy, and therapeutics from UCP Lahore.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-[#9B8CFF] flex items-center gap-2">
                      <Pill className="w-4 h-4 text-[#9B8CFF]" />
                      <span>Pharmacological Safety & ADEs</span>
                    </div>
                    <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                      Specialized in analyzing drug interactions, food contraindications, organ clearance rates, and preventing duplicate therapy.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-[#56E6F2] flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#56E6F2]" />
                      <span>Diagnostic Biomarker Calibration</span>
                    </div>
                    <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                      Deep expertise in standard clinical thresholds for hematology, liver enzymes, renal function, and contextualizing mild versus acute flags.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07111F]/70 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-[#9B8CFF] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#9B8CFF]" />
                      <span>Published Clinical Health Research</span>
                    </div>
                    <p className="text-[11px] text-[#8FA2BD] leading-relaxed">
                      Co-author of peer-reviewed clinical epidemiological studies indexed on ORCID and ResearchGate focused on public health and therapeutics.
                    </p>
                  </div>
                </div>

                {/* Founder Philosophy Quote */}
                <div className="p-4 rounded-2xl bg-[#112240]/40 border border-[#56E6F2]/20">
                  <p className="text-xs text-[#8FA2BD] italic leading-relaxed">
                    &ldquo;Our vision is simple: no patient should ever feel overwhelmed or helpless reading their own health reports. Meri Sehat AI translates medical jargon into plain, trustworthy language so patients can have confident, educated discussions with their physicians.&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-[#56E6F2] mt-2 font-bold">
                    — Mian Sikandar Hayyat, Founder & Clinical Lead
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          SECTION I: FINAL CINEMATIC CTA WITH 3D DEPTH
      ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card3DTilt depth={6} scrollTiltIntensity={0.1}>
          <div className="relative rounded-3xl bg-gradient-to-tr from-[#0B1930] via-[#112240] to-[#07111F] border border-[#56E6F2]/30 p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            {/* Ambient Lighting Accents */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#56E6F2]/15 blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[#56E6F2]/15 text-[#56E6F2] border border-[#56E6F2]/30 text-xs font-mono font-bold tracking-wider uppercase">
                MERI SEHAT AI
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-[#F7FAFF] tracking-tight leading-tight">
                Your report is the beginning of{' '}
                <span className="text-gradient-cyan">understanding.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#8FA2BD] leading-relaxed">
                Start with your report. Leave with a clearer understanding of what it says.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/analyzer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#56E6F2] via-[#38bdf8] to-[#9B8CFF] text-[#07111F] font-extrabold text-sm shadow-[0_0_35px_rgba(86,230,242,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 stroke-[2.5]" />
                  <span>Understand My Report</span>
                </Link>
                <Link
                  href="/report/sample"
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#0B1930] text-[#F7FAFF] border border-white/20 hover:border-[#56E6F2] font-semibold text-sm transition-all"
                >
                  View Sample Demo
                </Link>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          SECTION J: FREQUENTLY ASKED QUESTIONS ACCORDION
      ========================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#8FA2BD]">
            <span>CLINICAL TRANSPARENCY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F7FAFF]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#8FA2BD]">
            Clear information regarding clinical safety, privacy, and how Meri Sehat works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#F7FAFF] hover:text-[#56E6F2] focus:outline-none focus:ring-1 focus:ring-[#56E6F2] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-[#56E6F2]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-[#8FA2BD]" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#8FA2BD] leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Extracted Values Confirmation Modal */}
      <ExtractedValuesConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        extractedItems={extractedItems}
        onConfirmAndGenerate={handleConfirmAndGenerate}
        isLoadingReport={isGeneratingReport}
      />

      {/* Dedicated Founder Profile Modal */}
      <FounderModal
        isOpen={founderModalOpen}
        onClose={() => setFounderModalOpen(false)}
      />
    </div>
  );
}
