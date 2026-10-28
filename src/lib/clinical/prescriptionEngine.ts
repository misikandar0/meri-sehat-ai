import { ExtractedPrescriptionMedicine, PrescriptionAnalysis, LocalizedString } from '../types';
import { VERIFIED_MEDICINES } from './prescriptionData';

export function matchAndExplainMedicine(raw: {
  medicineName: string;
  brandName?: string;
  genericName?: string;
  strength: string;
  dosageForm: string;
  frequency: string;
  duration?: string;
  route?: string;
}): ExtractedPrescriptionMedicine {
  const searchTerm = (raw.brandName || raw.medicineName || raw.genericName || '').toLowerCase().trim();

  // Find verified match
  const foundKey = Object.keys(VERIFIED_MEDICINES).find((key) => {
    const item = VERIFIED_MEDICINES[key];
    return (
      key.includes(searchTerm) ||
      searchTerm.includes(key) ||
      item.genericName.toLowerCase().includes(searchTerm) ||
      item.brandNamesInPakistan.some((b) => b.toLowerCase().includes(searchTerm) || searchTerm.includes(b.toLowerCase()))
    );
  });

  const verified = foundKey ? VERIFIED_MEDICINES[foundKey] : null;

  return {
    id: `rx_med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    medicineName: raw.medicineName,
    brandName: raw.brandName || (verified ? verified.brandNamesInPakistan[0] : raw.medicineName),
    genericName: raw.genericName || (verified ? verified.genericName : 'Active Pharmaceutical Ingredient'),
    strength: raw.strength,
    dosageForm: raw.dosageForm,
    frequency: raw.frequency,
    duration: raw.duration || 'As directed by your physician',
    route: raw.route || 'Oral',
    confidence: verified ? 0.96 : 0.82,
    isUncertainOrIllegible: !verified && searchTerm.length < 3,
    commonUses: verified
      ? verified.commonUses
      : {
          en: `Commonly prescribed by licensed doctors for conditions evaluated during clinical consultation.`,
          ur: `مستند ڈاکٹر کے مشورے کے مطابق مخصوص علامات کے علاج کے لیے تجویز کی جاتی ہے۔`,
          ur_roman: `Doctor ke mashwaray ke mutabiq makhsoos bimari ke liye di jati hai.`,
        },
    mechanism: verified
      ? verified.mechanism
      : {
          en: `Acts systematically or locally according to its pharmacological class to manage target symptoms.`,
          ur: `اپنے فارماکولوجیکل طریقہ کار کے تحت بیماری کی علامات کو کنٹرول کرنے میں مدد دیتی ہے۔`,
          ur_roman: `Apne medical function ke zariye bimari ke asraat ko kam karti hai.`,
        },
    commonSideEffects: verified
      ? verified.commonSideEffects
      : [
          {
            en: 'Mild gastrointestinal discomfort, headache, or dizziness may occur. Check package insert for details.',
            ur: 'ہلکا پیٹ درد یا چکر آ سکتے ہیں۔ دوا کے ہمراہ معلوماتی پرچہ دیکھیں۔',
            ur_roman: 'Halka pait dard ya chakkar aa sakte hain. Dawai ke sath diya gaya leaflet parhein.',
          },
        ],
    importantPrecautions: verified
      ? verified.importantPrecautions
      : [
          {
            en: 'Take exactly as prescribed by your doctor. Do not stop early or exceed recommended frequency.',
            ur: 'ڈاکٹر کی بتائی گئی مقدار اور وقت کے مطابق لیں۔ خود سے دوا بند یا زائد نہ کریں۔',
            ur_roman: 'Doctor ki batayi hui miqdaar ke mutabiq lein. Apni marzi se band ya double na karein.',
          },
        ],
    questionsForPharmacist: verified
      ? verified.questionsForPharmacist
      : [
          {
            en: 'Should this medicine be taken before or after meals?',
            ur: 'کیا یہ دوا کھانے سے پہلے لینی ہے یا کھانے کے بعد؟',
            ur_roman: 'Kya yeh dawai khanay se pehle leni hai ya baad mein?',
          },
          {
            en: 'What should I do if I accidentally miss a dose?',
            ur: 'اگر کوئی خوراک چھوٹ جائے تو کیا کرنا چاہیے؟',
            ur_roman: 'Agar koi dose miss ho jaye to kya karein?',
          },
        ],
  };
}

export function generatePrescriptionAnalysis(
  rawMedicines: Array<{
    medicineName: string;
    brandName?: string;
    genericName?: string;
    strength: string;
    dosageForm: string;
    frequency: string;
    duration?: string;
    route?: string;
  }>
): PrescriptionAnalysis {
  const medicines = rawMedicines.map((m) => matchAndExplainMedicine(m));

  return {
    id: `rx_ana_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    medicines,
    overallPrecautions: [
      {
        en: 'Never alter or stop a prescribed medication without first consulting your doctor or pharmacist.',
        ur: 'ڈاکٹر یا فارماسسٹ کے مشورے کے بغیر کبھی بھی دوا بند یا تبدیل نہ کریں۔',
        ur_roman: 'Doctor ke mashwaray ke baghair kabhi dawai band ya change na karein.',
      },
      {
        en: 'Store all medicines in a cool, dry place away from direct heat, sunlight, and out of reach of children.',
        ur: 'تمام ادویات کو دھوپ اور گرمی سے دور اور بچوں کی پہنچ سے محفوظ رکھیں۔',
        ur_roman: 'Dawai ko dhoop aur garmi se bacha kar bachon ki pohanch se door rakhein.',
      },
    ],
    generalQuestions: [
      {
        en: 'For how many days should this treatment course be maintained?',
        ur: 'یہ کورس کتنے دن جاری رکھنا ہے؟',
        ur_roman: 'Yeh course kitnay din jari rakhna hai?',
      },
      {
        en: 'Are there specific foods, beverages (e.g. dairy, caffeine), or activities to avoid?',
        ur: 'کیا کسی خاص کھانے، مشروب یا دودھ کی مصنوعات سے پرہیز ضروری ہے؟',
        ur_roman: 'Kya kisi khorak ya chai/doodh se parhez zaroori hai?',
      },
    ],
    educationalDisclaimer: {
      en: 'This information is prepared by Meri Sehat AI for educational purposes only. It does NOT substitute for a clinical consultation or dispensing advice from a registered pharmacist. If medicine writing on the prescription is illegible, please verify directly with your pharmacy before consumption.',
      ur: 'یہ معلومات صرف تعلیمی آگاہی کے لیے فراہم کی گئی ہیں۔ اگر نسخے پر لکھا نام صاف نظر نہ آئے تو استعمال سے قبل اپنے قریبی فارماسسٹ سے لازمی تصدیق کریں۔',
      ur_roman: 'Yeh maloomat sirf samajhne ke liye hain. Agar prescription samajh na aaye to pharmacy walay se zaroor confirm karein.',
    },
  };
}
