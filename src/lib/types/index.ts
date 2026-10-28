export type Language = 'en' | 'ur' | 'ur_roman';

export type BiomarkerStatus =
  | 'normal'
  | 'low'
  | 'high'
  | 'critical'
  | 'verification_required'
  | 'uninterpretable';

export type BodySystem =
  | 'hematologic'
  | 'cardiovascular'
  | 'hepatic'
  | 'renal'
  | 'metabolic'
  | 'immune';

export interface MedicalSource {
  title: string;
  organization: string;
  year: number;
  url?: string;
  evidenceGrade?: 'High' | 'Moderate' | 'Observational';
}

export interface LocalizedString {
  en: string;
  ur: string;
  ur_roman: string;
}

export interface Biomarker {
  id: string;
  name: string;
  shortName: string;
  category: 'cbc' | 'metabolic' | 'lipid' | 'liver' | 'renal' | 'thyroid' | 'iron';
  value: number;
  unit: string;
  referenceRange: {
    low: number;
    high: number;
    text?: string;
  };
  status: BiomarkerStatus;
  confidence: number; // 0 to 1
  isCriticalLaboratoryFlag?: boolean;
  userConfirmed?: boolean;
  plainExplanation: LocalizedString;
  clinicalSignificance: LocalizedString;
  contextualLimitations: LocalizedString;
  associatedBodySystem: BodySystem;
  sources: MedicalSource[];
}

export interface PatternAnalysis {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  contributingBiomarkers: string[];
  possibleConsiderations: LocalizedString[];
  recommendedDoctorQuestions: LocalizedString[];
  urgency: 'routine' | 'discuss_with_doctor' | 'urgent';
}

export interface SafetyEscalation {
  id: string;
  level: 'info' | 'warning' | 'urgent';
  title: LocalizedString;
  message: LocalizedString;
  actionGuidance: LocalizedString;
  isEmergency: boolean;
}

export interface PatientContext {
  age?: number;
  sex?: 'male' | 'female' | 'other';
  isFasting?: boolean;
  pregnancyStatus?: boolean;
}

export interface HealthReport {
  id: string;
  createdAt: string;
  patientContext?: PatientContext;
  documentType: 'blood_test' | 'cbc' | 'comprehensive_panel';
  sourceFileName?: string;
  laboratoryName?: string;
  extractionConfidence: number;
  biomarkers: Biomarker[];
  patternAnalysis: PatternAnalysis[];
  safetyEscalations: SafetyEscalation[];
  generalDoctorQuestions: LocalizedString[];
  educationalDisclaimer: LocalizedString;
  status: 'draft' | 'confirmed' | 'ready';
}

export interface ExtractedPrescriptionMedicine {
  id: string;
  medicineName: string;
  brandName?: string;
  genericName: string;
  strength: string;
  dosageForm: string; // Tablet, Syrup, Capsule, etc.
  frequency: string; // e.g. "Once daily", "BD (Twice a day)"
  duration?: string;
  route: string; // Oral, Topical, etc.
  commonUses: LocalizedString;
  mechanism: LocalizedString;
  commonSideEffects: LocalizedString[];
  importantPrecautions: LocalizedString[];
  questionsForPharmacist: LocalizedString[];
  confidence: number;
  isUncertainOrIllegible?: boolean;
}

export interface PrescriptionAnalysis {
  id: string;
  createdAt: string;
  medicines: ExtractedPrescriptionMedicine[];
  overallPrecautions: LocalizedString[];
  generalQuestions: LocalizedString[];
  educationalDisclaimer: LocalizedString;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  pmdcNumber: string;
  isVerified: boolean;
  city: 'Karachi' | 'Lahore' | 'Islamabad' | 'Rawalpindi' | 'Peshawar' | 'Quetta' | 'Faisalabad' | 'Multan';
  area: string;
  hospitalOrClinic: string;
  experienceYears: number;
  languages: string[];
  consultationFee: number; // in PKR
  contactPhone: string;
  availableDays: string[];
  bio: string;
}
