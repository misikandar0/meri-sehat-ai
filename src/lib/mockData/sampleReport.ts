import { HealthReport } from '../types';
import { generateStructuredReport } from '../clinical/rulesEngine';

/**
 * High-quality fictional sample report for demonstration.
 * Clearly labeled as fictional educational data.
 */
export const FICTIONAL_SAMPLE_REPORT: HealthReport = generateStructuredReport(
  [
    {
      name: 'Hemoglobin',
      shortName: 'Hb',
      category: 'cbc',
      value: 10.2,
      unit: 'g/dL',
      referenceRange: { low: 12.0, high: 15.5, text: '12.0 - 15.5 g/dL' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Red Blood Cell Count',
      shortName: 'RBC',
      category: 'cbc',
      value: 4.9,
      unit: 'x10^12/L',
      referenceRange: { low: 3.8, high: 5.2, text: '3.8 - 5.2 x10^12/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Mean Corpuscular Volume',
      shortName: 'MCV',
      category: 'cbc',
      value: 71.8,
      unit: 'fL',
      referenceRange: { low: 80.0, high: 100.0, text: '80.0 - 100.0 fL' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'White Blood Cell Count',
      shortName: 'WBC',
      category: 'cbc',
      value: 6.8,
      unit: 'x10^9/L',
      referenceRange: { low: 4.0, high: 11.0, text: '4.0 - 11.0 x10^9/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Platelet Count',
      shortName: 'PLT',
      category: 'cbc',
      value: 260,
      unit: 'x10^9/L',
      referenceRange: { low: 150.0, high: 450.0, text: '150 - 450 x10^9/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Fasting Blood Glucose',
      shortName: 'FBS',
      category: 'metabolic',
      value: 94,
      unit: 'mg/dL',
      referenceRange: { low: 70.0, high: 99.0, text: '70 - 99 mg/dL' },
      confidence: 1.0,
      userConfirmed: true,
    },
  ],
  {
    age: 28,
    sex: 'female',
    isFasting: true,
  },
  'Fictional_Sample_CBC_Demonstration.pdf',
  'Demonstration Diagnostic Lab (Fictional)'
);

// Second historical report for comparison testing
export const FICTIONAL_HISTORICAL_REPORT: HealthReport = generateStructuredReport(
  [
    {
      name: 'Hemoglobin',
      shortName: 'Hb',
      category: 'cbc',
      value: 9.6, // Was lower in the past
      unit: 'g/dL',
      referenceRange: { low: 12.0, high: 15.5, text: '12.0 - 15.5 g/dL' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Red Blood Cell Count',
      shortName: 'RBC',
      category: 'cbc',
      value: 4.6,
      unit: 'x10^12/L',
      referenceRange: { low: 3.8, high: 5.2, text: '3.8 - 5.2 x10^12/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Mean Corpuscular Volume',
      shortName: 'MCV',
      category: 'cbc',
      value: 69.4,
      unit: 'fL',
      referenceRange: { low: 80.0, high: 100.0, text: '80.0 - 100.0 fL' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'White Blood Cell Count',
      shortName: 'WBC',
      category: 'cbc',
      value: 7.1,
      unit: 'x10^9/L',
      referenceRange: { low: 4.0, high: 11.0, text: '4.0 - 11.0 x10^9/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Platelet Count',
      shortName: 'PLT',
      category: 'cbc',
      value: 245,
      unit: 'x10^9/L',
      referenceRange: { low: 150.0, high: 450.0, text: '150 - 450 x10^9/L' },
      confidence: 1.0,
      userConfirmed: true,
    },
    {
      name: 'Fasting Blood Glucose',
      shortName: 'FBS',
      category: 'metabolic',
      value: 91,
      unit: 'mg/dL',
      referenceRange: { low: 70.0, high: 99.0, text: '70 - 99 mg/dL' },
      confidence: 1.0,
      userConfirmed: true,
    },
  ],
  {
    age: 28,
    sex: 'female',
    isFasting: true,
  },
  'Baseline_CBC_6_Months_Ago.pdf',
  'Demonstration Diagnostic Lab (Fictional)'
);

// Adjust IDs so they can be loaded reliably
FICTIONAL_SAMPLE_REPORT.id = 'sample-demo-report';
FICTIONAL_HISTORICAL_REPORT.id = 'sample-historical-report';
FICTIONAL_HISTORICAL_REPORT.createdAt = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(); // 6 months ago
