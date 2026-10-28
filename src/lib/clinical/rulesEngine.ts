import { Biomarker, BiomarkerStatus, PatternAnalysis, SafetyEscalation, HealthReport, LocalizedString } from '../types';
import { BIOMARKER_DEFINITIONS } from './biomarkerData';

export interface PatientContext {
  age?: number;
  sex?: 'male' | 'female' | 'other';
  isFasting?: boolean;
  pregnancyStatus?: boolean;
}

export function evaluateBiomarkerStatus(
  value: number,
  refRange: { low: number; high: number },
  criticalThresholds?: { low?: number; high?: number },
  isLabFlaggedCritical?: boolean
): BiomarkerStatus {
  if (isLabFlaggedCritical) {
    return 'critical';
  }

  if (criticalThresholds?.low !== undefined && value <= criticalThresholds.low) {
    return 'critical';
  }
  if (criticalThresholds?.high !== undefined && value >= criticalThresholds.high) {
    return 'critical';
  }

  if (value < refRange.low) {
    return 'low';
  }
  if (value > refRange.high) {
    return 'high';
  }

  return 'normal';
}

export function processExtractedBiomarkers(
  rawList: Array<{
    id?: string;
    name: string;
    shortName: string;
    category?: 'cbc' | 'metabolic' | 'lipid' | 'liver' | 'renal' | 'thyroid' | 'iron';
    value: number;
    unit: string;
    referenceRange?: { low: number; high: number; text?: string };
    isCriticalLaboratoryFlag?: boolean;
    confidence?: number;
    userConfirmed?: boolean;
  }>,
  context?: PatientContext
): Biomarker[] {
  const isFemale = context?.sex === 'female';

  return rawList.map((item, index) => {
    // Attempt match with canonical definition
    const key = Object.keys(BIOMARKER_DEFINITIONS).find(
      (k) =>
        k.toLowerCase() === item.shortName.toLowerCase() ||
        BIOMARKER_DEFINITIONS[k].name.toLowerCase() === item.name.toLowerCase() ||
        BIOMARKER_DEFINITIONS[k].shortName.toLowerCase().includes(item.shortName.toLowerCase())
    );

    const def = key ? BIOMARKER_DEFINITIONS[key] : null;

    // Use lab provided reference range if valid, otherwise fallback to standard clinical range
    const fallbackRange = def
      ? isFemale
        ? def.defaultFemaleRange
        : def.defaultMaleRange
      : { low: 0, high: 100 };

    const refRange = {
      low: item.referenceRange?.low ?? fallbackRange.low,
      high: item.referenceRange?.high ?? fallbackRange.high,
      text: item.referenceRange?.text ?? `${fallbackRange.low} - ${fallbackRange.high} ${item.unit}`,
    };

    const criticalThresholds = def
      ? { low: def.criticalLowThreshold, high: def.criticalHighThreshold }
      : undefined;

    const status = evaluateBiomarkerStatus(
      item.value,
      refRange,
      criticalThresholds,
      item.isCriticalLaboratoryFlag
    );

    // Dynamic clinical significance
    let clinicalSig: LocalizedString;
    if (def) {
      if (status === 'low' || (status === 'critical' && item.value < refRange.low)) {
        clinicalSig = def.clinicalSignificanceLow;
      } else if (status === 'high' || (status === 'critical' && item.value > refRange.high)) {
        clinicalSig = def.clinicalSignificanceHigh;
      } else {
        clinicalSig = def.clinicalSignificanceNormal;
      }
    } else {
      clinicalSig = {
        en: `Value is ${status === 'normal' ? 'within' : status === 'low' ? 'below' : 'above'} the specified reference range.`,
        ur: `یہ قیمت مخصوص کردہ لیبارٹری کی حدود سے ${status === 'normal' ? 'اندر' : status === 'low' ? 'کم' : 'زیادہ'} ہے۔`,
        ur_roman: `Yeh value lab ki reference range se ${status === 'normal' ? 'andar' : status === 'low' ? 'kam' : 'ziada'} hai.`,
      };
    }

    return {
      id: item.id || `bm_${index}_${Date.now()}`,
      name: def ? def.name : item.name,
      shortName: def ? def.shortName : item.shortName,
      category: def ? def.category : item.category || 'cbc',
      value: item.value,
      unit: item.unit,
      referenceRange: refRange,
      status,
      confidence: item.confidence ?? 0.95,
      isCriticalLaboratoryFlag: item.isCriticalLaboratoryFlag,
      userConfirmed: item.userConfirmed ?? true,
      plainExplanation: def
        ? def.plainExplanation
        : {
            en: `${item.name} is a biological health marker measured in your blood report.`,
            ur: `${item.name} آپ کے خون کی رپورٹ میں جانچا گیا ایک طبی عنصر ہے۔`,
            ur_roman: `${item.name} aap ke blood test mein shamil ek medical marker hai.`,
          },
      clinicalSignificance: clinicalSig,
      contextualLimitations: def
        ? def.contextualLimitations
        : {
            en: 'Interpretation depends on your comprehensive health history and original lab calibration.',
            ur: 'درست تشریح آپ کی مکمل طبی تاریخ اور لیب کے معیار پر منحصر ہے۔',
            ur_roman: 'Sahi tashreeh aap ki overall health aur lab ke standard par depend karti hai.',
          },
      associatedBodySystem: def ? def.associatedBodySystem : 'hematologic',
      sources: def ? def.sources : [],
    };
  });
}

export function detectMultiMarkerPatterns(biomarkers: Biomarker[]): PatternAnalysis[] {
  const patterns: PatternAnalysis[] = [];

  const hgb = biomarkers.find((b) => b.shortName.toLowerCase().includes('hb') || b.name.toLowerCase().includes('hemoglobin'));
  const mcv = biomarkers.find((b) => b.shortName.toLowerCase().includes('mcv'));
  const wbc = biomarkers.find((b) => b.shortName.toLowerCase().includes('wbc'));
  const plt = biomarkers.find((b) => b.shortName.toLowerCase().includes('plt') || b.name.toLowerCase().includes('platelet'));
  const fbs = biomarkers.find((b) => b.shortName.toLowerCase().includes('fbs') || b.name.toLowerCase().includes('glucose'));

  // 1. Microcytic Hypochromic Anemia Pattern
  if (hgb && mcv && hgb.status === 'low' && mcv.status === 'low') {
    patterns.push({
      id: 'pattern_microcytic_anemia',
      title: {
        en: 'Microcytic Anemia Pattern (Low Hemoglobin with Smaller Red Blood Cells)',
        ur: 'مائکروسائٹک انیمیا پیٹرن (کم ہیموگلوبن اور چھوٹے سرخ خلیات)',
        ur_roman: 'Microcytic Anemia Pattern (Kam Hemoglobin aur chotay Red Cells)',
      },
      description: {
        en: 'Both your hemoglobin and red cell size (MCV) are below standard ranges. In South Asia, this classic combination is most commonly associated with Iron Deficiency Anemia or Beta-Thalassemia Trait (Minor).',
        ur: 'آپ کا ہیموگلوبن اور سرخ خلیوں کا سائز (ایم سی وی) دونوں کم ہیں۔ پاکستان میں یہ امتزاج عموماً آئرن کی کمی یا تھیلیسیمیا مائنر میں پایا جاتا ہے۔',
        ur_roman: 'Aap ka hemoglobin aur MCV dono kam hain. Pakistan mein yeh combination aam tor par Iron ki kami ya Thalassemia Minor mein dekha jata hai.',
      },
      contributingBiomarkers: [hgb.name, mcv.name],
      possibleConsiderations: [
        {
          en: 'Iron Deficiency: Often due to dietary intake, absorption issues, or blood loss.',
          ur: 'آئرن کی کمی: ناقص غذا، معدے میں جذب نہ ہونا یا خون کے ضیاع کی وجہ سے۔',
          ur_roman: 'Iron ki kami: Khorak mein kami ya khoon ke zaya hone se.',
        },
        {
          en: 'Thalassemia Trait: A harmless genetic carrier trait common in Pakistan that produces smaller red cells.',
          ur: 'تھیلیسیمیا ٹریٹ: ایک جینیاتی خصوصیت جو پاکستان میں عام ہے اور اس میں سرخ خلیات قدرتی طور پر چھوٹے ہوتے ہیں۔',
          ur_roman: 'Thalassemia Trait: Ek aam genetic trait jisme cells chotay hotay hain.',
        },
      ],
      recommendedDoctorQuestions: [
        {
          en: 'Would a Serum Ferritin test help confirm whether iron stores are depleted?',
          ur: 'کیا سیرم فیرٹین (Serum Ferritin) ٹیسٹ سے آئرن کی کمی کی تصدیق ہو سکتی ہے؟',
          ur_roman: 'Kya Serum Ferritin test se iron ki kami ki tasdeeq ho sakti hai?',
        },
        {
          en: 'Should a Hemoglobin Electrophoresis test be considered to check for Thalassemia Trait?',
          ur: 'کیا تھیلیسیمیا ٹریٹ کی جانچ کے لیے ہیموگلوبن الیکٹروفورسس ٹیسٹ کروانا چاہیے؟',
          ur_roman: 'Kya Thalassemia check karne ke liye Hemoglobin Electrophoresis test karwana chahiye?',
        },
      ],
      urgency: 'discuss_with_doctor',
    });
  }

  // 2. Macrocytic Anemia Pattern
  if (hgb && mcv && hgb.status === 'low' && mcv.status === 'high') {
    patterns.push({
      id: 'pattern_macrocytic_anemia',
      title: {
        en: 'Macrocytic Pattern (Low Hemoglobin with Enlarged Red Blood Cells)',
        ur: 'میکروسائٹک پیٹرن (کم ہیموگلوبن اور بڑے سرخ خلیات)',
        ur_roman: 'Macrocytic Pattern (Kam Hemoglobin aur baray Red Cells)',
      },
      description: {
        en: 'Low hemoglobin accompanied by high MCV suggests that red blood cells are developing larger than normal. This frequently points toward Vitamin B12 or Folate (Vitamin B9) deficiencies.',
        ur: 'کم ہیموگلوبن کے ساتھ بڑے خلیات وٹامن بی 12 یا فولک ایسڈ کی کمی کی نشاندہی کر سکتے ہیں۔',
        ur_roman: 'Kam hemoglobin aur baray cells Vitamin B12 ya Folate ki kami ki nishandahi karte hain.',
      },
      contributingBiomarkers: [hgb.name, mcv.name],
      possibleConsiderations: [
        {
          en: 'Nutritional deficiency of Vitamin B12 or Folate (common in vegetarian or restricted diets).',
          ur: 'وٹامن بی 12 یا فولک ایسڈ کی غذائی کمی۔',
          ur_roman: 'Vitamin B12 ya Folate ki ghizai kami.',
        },
      ],
      recommendedDoctorQuestions: [
        {
          en: 'Should we test Vitamin B12 and Serum Folate levels?',
          ur: 'کیا وٹامن بی 12 اور فولک ایسڈ کے ٹیسٹ کی ضرورت ہے؟',
          ur_roman: 'Kya Vitamin B12 aur Folate ke tests zaroori hain?',
        },
      ],
      urgency: 'discuss_with_doctor',
    });
  }

  // 3. Reactive Leukocytosis (Infection / Inflammation)
  if (wbc && wbc.status === 'high') {
    patterns.push({
      id: 'pattern_leukocytosis',
      title: {
        en: 'Elevated Immune Cell Activity (Leukocytosis)',
        ur: 'مدافعتی خلیات میں اضافہ (لیوکو سائٹوسس)',
        ur_roman: 'Immune Cells mein izafa (Leukocytosis)',
      },
      description: {
        en: 'Your total white blood cell count is higher than baseline. This is typically the bone marrow releasing immune cells to combat an active infection, inflammation, or physical trauma.',
        ur: 'سفید خلیوں کی تعداد زیادہ ہے۔ یہ جسم میں کسی انفیکشن یا سوزش کے خلاف مدافعت کو ظاہر کرتا ہے۔',
        ur_roman: 'White blood cells barhay huay hain jo kisi active infection ya sozish se larne ki alamat hai.',
      },
      contributingBiomarkers: [wbc.name],
      possibleConsiderations: [
        {
          en: 'Bacterial or viral response in respiratory, urinary, or gastrointestinal tract.',
          ur: 'سانس، پیشاب یا معدے کی نالی میں بیکٹیریل یا وائرل انفیکشن۔',
          ur_roman: 'Gala, urine ya pait ka infection.',
        },
        {
          en: 'Recent tissue inflammation, wound recovery, or high physiological stress.',
          ur: 'حالیہ چوٹ، ورم یا شدید جسمانی دباؤ۔',
          ur_roman: 'Sozish, zakham ya shadeed stress.',
        },
      ],
      recommendedDoctorQuestions: [
        {
          en: 'Are there any localized symptoms (fever, cough, dysuria, pain) that point to an infection source?',
          ur: 'کیا بخار، کھانسی یا جسمانی درد جیسی کوئی علامات موجود ہیں؟',
          ur_roman: 'Kya bukhar, khansi ya dard jaisi koi alamat hain?',
        },
      ],
      urgency: 'discuss_with_doctor',
    });
  }

  // 4. Elevated Blood Sugar
  if (fbs && fbs.status === 'high') {
    patterns.push({
      id: 'pattern_elevated_glucose',
      title: {
        en: 'Elevated Fasting Blood Glucose Pattern',
        ur: 'خون میں فاسٹنگ شکر کی زیادتی',
        ur_roman: 'Fasting Sugar mein izafa',
      },
      description: {
        en: 'Fasting blood glucose is above the standard non-diabetic range (< 100 mg/dL). Repeated measurements and an HbA1c test are standard to evaluate metabolic glucose regulation.',
        ur: 'نہار منہ شکر کی مقدار معمول سے زیادہ ہے۔ مستقل تشخیص کے لیے HbA1c ٹیسٹ کا مشورہ دیا جاتا ہے۔',
        ur_roman: 'Fasting blood glucose normal se upar hai. HbA1c test karwana behter hoga.',
      },
      contributingBiomarkers: [fbs.name],
      possibleConsiderations: [
        {
          en: 'Impaired fasting glucose (prediabetes) or early diabetes mellitus.',
          ur: 'پری ذیابیطس یا شوگر کی بیماری کا امکان۔',
          ur_roman: 'Prediabetes ya sugar ki bimari ka imkan.',
        },
      ],
      recommendedDoctorQuestions: [
        {
          en: 'Should we schedule an HbA1c test to assess 3-month average blood glucose?',
          ur: 'کیا پچھلے 3 ماہ کا اوسط شوگر لیول دیکھنے کے لیے HbA1c ٹیسٹ کروانا چاہیے؟',
          ur_roman: 'Kya 3 maah ka average jan-nay ke liye HbA1c test karwayein?',
        },
      ],
      urgency: 'discuss_with_doctor',
    });
  }

  return patterns;
}

export function evaluateSafetyEscalations(biomarkers: Biomarker[]): SafetyEscalation[] {
  const escalations: SafetyEscalation[] = [];

  for (const b of biomarkers) {
    // Critical Platelet count drop (< 50,000 / µL)
    if (
      (b.shortName.toLowerCase().includes('plt') || b.name.toLowerCase().includes('platelet')) &&
      b.value < 50
    ) {
      escalations.push({
        id: 'esc_crit_platelets',
        level: 'urgent',
        isEmergency: true,
        title: {
          en: 'URGENT: Marked Thrombocytopenia (Platelets < 50 x10^9/L)',
          ur: 'فوری توجہ: پلیٹلیٹس میں شدید کمی (50 سے کم)',
          ur_roman: 'URGENT: Platelets mein shadeed kami (50 se kam)',
        },
        message: {
          en: 'Your reported platelet count is markedly below the safe clotting threshold. This significantly increases spontaneous bleeding risks (gum bleeding, nosebleeds, dark stools, or red skin spots). In Pakistan, this pattern requires immediate clinical assessment, especially during Dengue season.',
          ur: 'رپورٹ شدہ پلیٹلیٹس کی تعداد محفوظ حد سے بہت کم ہے۔ اس سے خون بہنے، مسوڑھوں سے خون یا جلد پر سرخ دھبے بننے کا خطرہ ہوتا ہے۔ فوری طور پر قریبی ایمرجنسی وارڈ یا ڈاکٹر سے رجوع کریں۔',
          ur_roman: 'Report shuda platelets bohot kam hain. Bleeding ka khatra ho sakta hai. Baraye meherbani foran qareebi hospital ya emergency mein dikhayein.',
        },
        actionGuidance: {
          en: 'Visit the nearest emergency department or contact emergency services immediately (Rescue 1122 in Pakistan). Avoid aspirin or NSAIDs like ibuprofen until a physician has evaluated your blood count.',
          ur: 'فوری طور پر قریبی ہسپتال کے ایمرجنسی وارڈ تشریف لے جائیں یا ریسکیو 1122 پر رابطہ کریں۔ ڈسپرین یا بروفین جیسی ادویات سے پرہیز کریں۔',
          ur_roman: 'Foran qareebi hospital emergency jayein ya Rescue 1122 par call karein. Disprin ya Brufen lene se gurez karein.',
        },
      });
    }

    // Critical Hemoglobin drop (< 7.0 g/dL)
    if (
      (b.shortName.toLowerCase().includes('hb') || b.name.toLowerCase().includes('hemoglobin')) &&
      b.value < 7.0
    ) {
      escalations.push({
        id: 'esc_crit_anemia',
        level: 'urgent',
        isEmergency: true,
        title: {
          en: 'URGENT: Severe Anemia (Hemoglobin < 7.0 g/dL)',
          ur: 'فوری توجہ: شدید خون کی کمی (ہیموگلوبن 7.0 سے کم)',
          ur_roman: 'URGENT: Shadeed khoon ki kami (Hemoglobin 7.0 se kam)',
        },
        message: {
          en: 'Hemoglobin below 7.0 g/dL indicates severe anemia that can strain the heart and vital organs. Common symptoms include severe shortness of breath, dizziness, chest discomfort, or extreme lethargy.',
          ur: '7.0 سے کم ہیموگلوبن شدید خون کی کمی کو ظاہر کرتا ہے جو دل پر بوجھ ڈال سکتا ہے۔ سانس پھولنا اور شدید چکر اس کی علامات ہیں۔',
          ur_roman: 'Hemoglobin 7.0 se kam bohot shadeed kami hai. Dil aur aaza par bojh parta hai. Fori medical madad zaroori hai.',
        },
        actionGuidance: {
          en: 'Seek immediate clinical consultation for urgent evaluation and potential transfusion assessment.',
          ur: 'فوری طور پر ڈاکٹر یا ہسپتال سے رجوع کریں تاکہ خون کی منتقلی یا ہنگامی علاج پر غور کیا جا سکے۔',
          ur_roman: 'Fori tor par doctor ya hospital jayein taake fori elaj kiya ja sakay.',
        },
      });
    }
  }

  return escalations;
}

export function generateStructuredReport(
  rawBiomarkers: Array<{
    name: string;
    shortName: string;
    category?: 'cbc' | 'metabolic' | 'lipid' | 'liver' | 'renal' | 'thyroid' | 'iron';
    value: number;
    unit: string;
    referenceRange?: { low: number; high: number; text?: string };
    isCriticalLaboratoryFlag?: boolean;
    confidence?: number;
    userConfirmed?: boolean;
  }>,
  context?: PatientContext,
  sourceFileName?: string,
  laboratoryName?: string
): HealthReport {
  const biomarkers = processExtractedBiomarkers(rawBiomarkers, context);
  const patternAnalysis = detectMultiMarkerPatterns(biomarkers);
  const safetyEscalations = evaluateSafetyEscalations(biomarkers);

  return {
    id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    patientContext: context,
    documentType: 'cbc',
    sourceFileName: sourceFileName || 'Uploaded_Lab_Report.pdf',
    laboratoryName: laboratoryName || 'Standard Diagnostic Laboratory',
    extractionConfidence: 0.98,
    biomarkers,
    patternAnalysis,
    safetyEscalations,
    generalDoctorQuestions: [
      {
        en: 'How do these results compare with my previous baseline lab tests?',
        ur: 'یہ نتائج میرے پچھلے ٹیسٹوں کے مقابلے میں کیا ظاہر کرتے ہیں؟',
        ur_roman: 'Yeh results pichlay tests ke muqablay mein kaisay hain?',
      },
      {
        en: 'Are any follow-up confirmatory tests recommended before making dietary or lifestyle changes?',
        ur: 'خوراک یا طرز زندگی میں تبدیلی سے قبل کیا کوئی اور تصدیقی ٹیسٹ کروانا چاہیے؟',
        ur_roman: 'Diet ya lifestyle tabdeel karne se pehle kya mazeed test karwayein?',
      },
      {
        en: 'Are there any symptoms I should monitor at home that warrant immediate medical attention?',
        ur: 'گھر پر کن علامات کا خاص خیال رکھنا ضروری ہے جن پر فوری ڈاکٹر سے رجوع کیا جائے؟',
        ur_roman: 'Ghar par kin alamath ka khayal rakhna chahiye jin par foran doctor se milna ho?',
      },
    ],
    educationalDisclaimer: {
      en: 'This report is generated by Meri Sehat AI for educational and discussion preparation purposes only. It does NOT constitute a clinical diagnosis, medical opinion, or treatment instruction. Always consult a licensed physician or pathologist for medical evaluation.',
      ur: 'یہ رپورٹ میری صحت اے آئی کی جانب سے صرف تعلیمی آگاہی اور ڈاکٹر سے مشورے کی تیاری کے لیے تیار کی گئی ہے۔ یہ کسی بیماری کی حتمی تشخیص یا علاج کا متبادل نہیں ہے۔ ہمیشہ مستند ڈاکٹر سے رجوع کریں۔',
      ur_roman: 'Yeh report sirf maloomat aur doctor se behtar mashwaray ke liye hai. Yeh koi medical diagnosis ya elaj nahi hai. Hamesha certified doctor se mashwara karein.',
    },
    status: 'ready',
  };
}
