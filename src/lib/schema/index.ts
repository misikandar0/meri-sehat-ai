import { z } from 'zod';

export const SupportedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
] as const;

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const FileUploadSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileSize: z
    .number()
    .max(MAX_FILE_SIZE_BYTES, 'File size must be under 10MB'),
  mimeType: z.enum(SupportedMimeTypes, {
    message: 'Unsupported format. Please upload PDF, JPG, or PNG files.',
  }),
});

export const LocalizedStringSchema = z.object({
  en: z.string(),
  ur: z.string(),
  ur_roman: z.string(),
});

export const MedicalSourceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  year: z.number(),
  url: z.string().url().optional(),
  evidenceGrade: z.enum(['High', 'Moderate', 'Observational']).optional(),
});

export const BiomarkerInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  shortName: z.string(),
  category: z.enum(['cbc', 'metabolic', 'lipid', 'liver', 'renal', 'thyroid', 'iron']),
  value: z.number(),
  unit: z.string().min(1),
  referenceRange: z.object({
    low: z.number(),
    high: z.number(),
    text: z.string().optional(),
  }),
  isCriticalLaboratoryFlag: z.boolean().optional(),
  confidence: z.number().min(0).max(1).default(0.95),
  userConfirmed: z.boolean().default(true),
});

export const ReportSubmissionSchema = z.object({
  patientContext: z.object({
    age: z.number().min(0).max(125).optional(),
    sex: z.enum(['male', 'female', 'other']).optional(),
    isFasting: z.boolean().optional(),
    pregnancyStatus: z.boolean().optional(),
  }).optional(),
  laboratoryName: z.string().max(100).optional(),
  sourceFileName: z.string().optional(),
  biomarkers: z.array(BiomarkerInputSchema).min(1, 'At least one biomarker is required for interpretation'),
  explicitConsentGiven: z.literal(true, {
    message: 'You must provide consent to process health report data for educational purposes',
  }),
});

export const PrescriptionInputSchema = z.object({
  medicineName: z.string().min(1, 'Medicine name is required'),
  brandName: z.string().optional(),
  genericName: z.string().min(1, 'Generic name is required'),
  strength: z.string().min(1, 'Strength is required'),
  dosageForm: z.string().min(1, 'Dosage form is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  duration: z.string().optional(),
  route: z.string().default('Oral'),
});

export const PrescriptionSubmissionSchema = z.object({
  medicines: z.array(PrescriptionInputSchema).min(1, 'At least one prescription item is required'),
  doctorNotes: z.string().max(1000).optional(),
  explicitConsentGiven: z.literal(true, {
    message: 'Explicit consent required',
  }),
});
