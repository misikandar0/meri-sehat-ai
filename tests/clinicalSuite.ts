/**
 * Automated Clinical & Architectural Verification Suite for Meri Sehat AI
 */

import assert from 'node:assert';
import { SupportedMimeTypes, MAX_FILE_SIZE_BYTES } from '../src/lib/schema';
import {
  evaluateBiomarkerStatus,
  detectMultiMarkerPatterns,
  evaluateSafetyEscalations,
  processExtractedBiomarkers,
} from '../src/lib/clinical/rulesEngine';
import { matchAndExplainMedicine } from '../src/lib/clinical/prescriptionEngine';

console.log('🧪 Starting Meri Sehat AI Automated Verification Suite...\n');

// 1. Test File Validation Limits
console.log('Test 1: Validating Supported MIME types and File Size constraints');
assert.ok(SupportedMimeTypes.includes('application/pdf'), 'PDF should be supported');
assert.ok(SupportedMimeTypes.includes('image/jpeg'), 'JPEG should be supported');
assert.ok(SupportedMimeTypes.includes('image/png'), 'PNG should be supported');
assert.strictEqual(MAX_FILE_SIZE_BYTES, 10 * 1024 * 1024, 'Max file size must be 10MB');
console.log('✅ File validation constants verified.');

// 2. Test Biomarker Reference Range & Threshold Evaluation
console.log('\nTest 2: Biomarker Reference Range & Threshold Evaluation');
const normalVal = evaluateBiomarkerStatus(13.5, { low: 12.0, high: 15.5 });
assert.strictEqual(normalVal, 'normal', '13.5 should be normal for female 12.0-15.5');

const lowVal = evaluateBiomarkerStatus(9.5, { low: 12.0, high: 15.5 });
assert.strictEqual(lowVal, 'low', '9.5 should be low for 12.0-15.5');

const highVal = evaluateBiomarkerStatus(17.8, { low: 12.0, high: 15.5 });
assert.strictEqual(highVal, 'high', '17.8 should be high for 12.0-15.5');

const criticalVal = evaluateBiomarkerStatus(35, { low: 150, high: 450 }, { low: 50 });
assert.strictEqual(criticalVal, 'critical', 'Platelets 35 should trigger critical threshold');
console.log('✅ Range evaluation & critical thresholds verified.');

// 3. Test Clinical Pattern Recognition (Microcytic Anemia)
console.log('\nTest 3: Multi-Marker Pattern Recognition');
const processed = processExtractedBiomarkers([
  { name: 'Hemoglobin', shortName: 'Hb', value: 9.8, unit: 'g/dL', referenceRange: { low: 12.0, high: 15.5 } },
  { name: 'Mean Corpuscular Volume', shortName: 'MCV', value: 71.0, unit: 'fL', referenceRange: { low: 80.0, high: 100.0 } },
]);

const patterns = detectMultiMarkerPatterns(processed);
assert.ok(patterns.length > 0, 'Should detect at least 1 pattern');
assert.strictEqual(patterns[0].id, 'pattern_microcytic_anemia', 'Should identify microcytic anemia pattern');
assert.ok(patterns[0].description.en.includes('Iron Deficiency'), 'Should explain iron deficiency possibility');
console.log('✅ Microcytic anemia pattern detected with educational context.');

// 4. Test Safety Escalation (Thrombocytopenia < 50k)
console.log('\nTest 4: Emergency Escalation Safeguards');
const criticalReportBiomarkers = processExtractedBiomarkers([
  { name: 'Platelet Count', shortName: 'PLT', value: 38, unit: 'x10^9/L', referenceRange: { low: 150, high: 450 } },
]);
const escalations = evaluateSafetyEscalations(criticalReportBiomarkers);
assert.ok(escalations.length > 0, 'Must trigger safety escalation for platelets 38');
assert.strictEqual(escalations[0].isEmergency, true, 'Must flag as emergency');
assert.ok(escalations[0].actionGuidance.en.includes('1122'), 'Must advise calling Rescue 1122');
console.log('✅ Emergency escalation protocol verified with Rescue 1122 instructions.');

// 5. Test Prescription Matching & Clinical Guardrails
console.log('\nTest 5: Prescription Explainer & Guardrail Integrity');
const med = matchAndExplainMedicine({
  medicineName: 'Augmentin 625mg',
  strength: '625 mg',
  dosageForm: 'Tablet',
  frequency: '1 tablet twice daily',
});
assert.strictEqual(med.genericName, 'Amoxicillin / Clavulanic Acid', 'Generic should match');
assert.ok(med.commonUses.en.length > 10, 'Should have verified plain language common uses');
assert.ok(med.questionsForPharmacist.length > 0, 'Should provide pharmacist questions');
console.log('✅ Prescription explainer verified.');

console.log('\n🎉 ALL 5 TEST SUITES PASSED CLEANLY (100% SUCCESS)!\n');
