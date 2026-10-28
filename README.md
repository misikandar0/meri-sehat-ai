# Meri Sehat AI (میری صحت اے آئی)
> **"Understand Your Health. Know Your Next Step."**
> A comprehensive, full-stack, responsive AI health-report and prescription interpretation platform designed for Pakistan and international expansion.

---

## 🌟 Key Product Capabilities

1. **Blood Test (CBC) Analyzer:**
   - Multi-format ingestion: PDF, JPG, JPEG, PNG (validated client & server up to 10MB).
   - Step-by-step progress pipeline: Upload -> Optical Extraction -> User Confirmation -> Clinical Rules Synthesis -> Report Dashboard.
   - Manual entry fallback for handwritten or unreadable laboratory reports.
   - User confirmation interface preserving the distinction between extracted and user-corrected values.

2. **Prescription Medicine Explainer:**
   - Plain-language explanations of verified active ingredients (Augmentin, Panadol, Risek, etc.).
   - Common uses, mechanisms of action, verified side effects, and precautions.
   - Strict pharmacological guardrails: Never recommends altering doses, changing treatments, or guessing illegible medications.

3. **Clinician-Reviewed Escalation & Safety:**
   - Automatic identification of critical laboratory flags.
   - Urgent escalation banners for marked thrombocytopenia (Platelets < 50,000 / µL) and severe anemia (Hemoglobin < 7.0 g/dL) with direct Rescue 1122 calling integration.
   - Restrained, non-alarmist color palettes for routine out-of-range values.

4. **Trilingual Experience (English, Urdu, Roman Urdu):**
   - Instant language switching without reprocessing documents.
   - Right-to-Left (RTL) typography with clean Urdu font styling.
   - Strict preservation of numerical values, test names, and scientific units.

5. **Biomarker Range Visualizer & Pattern Recognition:**
   - Horizontal graphical range bar mapping the patient's value along the reference range.
   - Pattern recognition (e.g. Microcytic Anemia pattern correlating low MCV and low Hemoglobin with iron deficiency vs. Thalassemia trait in Pakistan).

6. **Longitudinal Trend & Two-Report Comparison:**
   - Side-by-side comparison of 2 confirmed reports.
   - Absolute change (delta) calculations and unit compatibility enforcement.

7. **Educational Body-System Visualizer:**
   - Anatomical systems (Hematologic, Immune, Metabolic, Cardiovascular, Hepatic, Renal) linked to laboratory markers with explicit non-diagnostic framing.

8. **Verified Pakistani Doctor Directory:**
   - Consultant haematologists, pathologists, and physicians across Karachi, Lahore, Islamabad, and Rawalpindi.
   - Factual credentials, PMDC registration badges, hospital affiliations, and transparent fees.

9. **Privacy-First Architecture:**
   - Zero-data training guarantee on identifiable health documents.
   - Local browser client storage for guest workflows. One-click privacy wipe.
   - Supabase schema migrations with strict PostgreSQL Row-Level Security (RLS).

---

## 🏗️ Technology Architecture

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript (strict type checking), Tailwind CSS v4, Lucide React icons.
- **Backend:** Next.js Server-Side Route Handlers (`/api/analyze`, `/api/prescription`, `/api/checkout`).
- **AI Service Abstraction:** Provider-independent interface supporting Google Gemini 1.5 Flash Vision, with a 100% deterministic local clinical rules engine fallback.
- **Validation:** Strict runtime schema validation using Zod.
- **Payments:** Abstract payment gateway supporting safe sandbox test-mode simulation.

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 2. Installation
```bash
git clone <repo-url>
cd "Meri Sehat AI"
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```
*(Optional: Provide `GEMINI_API_KEY` in `.env.local` for Cloud Vision OCR. The app runs fully deterministically with zero configuration if keys are omitted!)*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Running Automated Clinical Tests
```bash
npm test
```
Executes the comprehensive automated clinical suite testing file validation, range calculations, pattern detection, emergency escalations, and prescription matching.

### 6. Production Build
```bash
npm run build
npm start
```

---

## 📁 Repository Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── analyzer/page.tsx        # Blood Test Upload & Manual Entry
│   │   ├── prescription/page.tsx    # Prescription Medicine Explainer
│   │   ├── report/[id]/page.tsx     # Structured Report Results Dashboard
│   │   ├── compare/page.tsx         # Longitudinal Trend Comparison
│   │   ├── doctors/page.tsx         # Verified Pakistani Doctor Directory
│   │   ├── pricing/page.tsx         # Transparent Pricing & Plans
│   │   ├── dashboard/page.tsx       # User History & Privacy Controls
│   │   ├── admin/page.tsx           # Admin Sources & Safety Audit Logs
│   │   ├── health-library/page.tsx  # Evidence-Based Biomarker Guides
│   │   ├── clinical-safety/page.tsx # Safety Framework & Emergency Protocols
│   │   ├── privacy/page.tsx         # Privacy Notice & Zero-Training Policy
│   │   ├── terms/page.tsx           # Terms of Service
│   │   ├── medical-disclaimer/      # Explicit Non-Diagnostic Disclaimer
│   │   ├── api/                     # Server-Side Route Handlers
│   │   ├── globals.css              # Design system tokens & print styles
│   │   ├── layout.tsx               # Root Layout with LanguageProvider
│   │   └── page.tsx                 # Homepage
│   ├── components/                  # Reusable UI component library
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── BiomarkerCard.tsx
│   │   ├── BodySystemVisualizer.tsx
│   │   ├── SafetyEscalationBanner.tsx
│   │   ├── UploadDropzone.tsx
│   │   ├── ExtractedValuesConfirmModal.tsx
│   │   └── PdfDownloadButton.tsx
│   └── lib/
│       ├── ai/aiProvider.ts         # Provider-independent AI abstraction
│       ├── clinical/                # Rules engine & verified medicine DB
│       ├── i18n/                    # Multilingual engine (EN, UR, UR_Roman)
│       ├── mockData/                # Fictional demonstration sample reports
│       ├── payment/                 # Abstract payment integration
│       ├── schema/                  # Zod validation schemas
│       ├── storage/                 # Storage repository layer
│       └── types/                   # TypeScript interfaces
├── supabase/migrations/             # PostgreSQL database migrations & RLS
├── tests/                           # Automated clinical verification tests
├── CLINICAL_VALIDATION.md           # Clinical checklist & medical roadmap
├── SECURITY_PRIVACY.md              # Health data privacy & security policy
└── README.md
```

---

## ⚖️ Medical Disclaimer
Meri Sehat AI is designed solely for educational guidance and to help patients prepare for discussions with licensed physicians. It does not provide medical diagnoses, treatment instructions, or changes to medication doses. For acute medical emergencies in Pakistan, contact **Rescue 1122** immediately.
