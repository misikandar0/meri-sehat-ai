import { LocalizedString, MedicalSource, BodySystem } from '../types';

export interface BiomarkerDefinition {
  shortName: string;
  name: string;
  category: 'cbc' | 'metabolic' | 'lipid' | 'liver' | 'renal' | 'thyroid' | 'iron';
  standardUnit: string;
  defaultMaleRange: { low: number; high: number };
  defaultFemaleRange: { low: number; high: number };
  criticalLowThreshold?: number;
  criticalHighThreshold?: number;
  associatedBodySystem: BodySystem;
  plainExplanation: LocalizedString;
  clinicalSignificanceLow: LocalizedString;
  clinicalSignificanceHigh: LocalizedString;
  clinicalSignificanceNormal: LocalizedString;
  contextualLimitations: LocalizedString;
  sources: MedicalSource[];
}

export const BIOMARKER_DEFINITIONS: Record<string, BiomarkerDefinition> = {
  hgb: {
    shortName: 'Hb / HGB',
    name: 'Hemoglobin',
    category: 'cbc',
    standardUnit: 'g/dL',
    defaultMaleRange: { low: 13.5, high: 17.5 },
    defaultFemaleRange: { low: 12.0, high: 15.5 },
    criticalLowThreshold: 7.0,
    criticalHighThreshold: 20.0,
    associatedBodySystem: 'hematologic',
    plainExplanation: {
      en: 'Hemoglobin is an iron-rich protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
      ur: 'ہیموگلوبن سرخ خون کے خلیوں میں موجود آئرن والی پروٹین ہے جو پھیپھڑوں سے آکسیجن پورے جسم تک پہنچاتی ہے۔',
      ur_roman: 'Hemoglobin red blood cells mein maujood protein hai jo lungs se oxygen poore jism tak pohanchati hai.',
    },
    clinicalSignificanceLow: {
      en: 'Lower hemoglobin can cause fatigue, shortness of breath, and pallor. It indicates anemia, which may arise from iron deficiency, nutritional factors, blood loss, or hemoglobin variants like Thalassemia trait.',
      ur: 'ہیموگلوبن میں کمی تھکاوٹ، سانس پھولنے اور کمزوری کا باعث بن سکتی ہے۔ یہ خون کی کمی (انیمیا) کی طرف اشارہ کرتی ہے جس کی مختلف وجوہات ہو سکتی ہیں۔',
      ur_roman: 'Kam hemoglobin se thakawat, saans phoolna aur kamzori ho sakti hai. Yeh anemia ki alamat ho sakti hai jis ki mukhtalif wajoohath hoti hain.',
    },
    clinicalSignificanceHigh: {
      en: 'Elevated hemoglobin can be a normal compensatory response to dehydration, living at high altitudes, or smoking, but can occasionally suggest bone marrow overproduction.',
      ur: 'زیادہ ہیموگلوبن جسم میں پانی کی کمی، اونچے پہاڑی علاقوں میں رہائش یا تمباکو نوشی کی وجہ سے ہو سکتا ہے۔',
      ur_roman: 'Ziada hemoglobin dehyration, unche ilaqon mein rehnay ya smoking ki waja se ho sakta hai.',
    },
    clinicalSignificanceNormal: {
      en: 'Your hemoglobin level is within the standard reference range, suggesting adequate oxygen-carrying capacity in the bloodstream at this time.',
      ur: 'ہیموگلوبن کی مقدار عام حدود کے اندر ہے، جو خون میں آکسیجن پہنچانے کی تسلی بخش صلاحیت ظاہر کرتی ہے۔',
      ur_roman: 'Hemoglobin ki miqdaar normal range ke andar hai, jo ke acchi alamat hai.',
    },
    contextualLimitations: {
      en: 'Hemoglobin values vary with hydration status, pregnancy (due to blood dilution), altitude, smoking habits, and ethnic variations.',
      ur: 'پانی کی کمی، حمل، تمباکو نوشی اور جغرافیائی ماحول ہیموگلوبن کی مقدار پر اثر انداز ہو سکتے ہیں۔',
      ur_roman: 'Dehydration, pregnancy aur smoking ke asraat hemoglobin ki reading ko mutasir kar sakte hain.',
    },
    sources: [
      {
        title: 'Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity',
        organization: 'World Health Organization (WHO)',
        year: 2021,
        url: 'https://www.who.int/publications/i/item/WHO-NMH-NHD-MNM-11.1',
        evidenceGrade: 'High',
      },
      {
        title: 'Guidelines on the Management of Iron Deficiency in Adults',
        organization: 'British Society of Haematology',
        year: 2021,
        evidenceGrade: 'High',
      },
    ],
  },

  rbc: {
    shortName: 'RBC',
    name: 'Red Blood Cell Count',
    category: 'cbc',
    standardUnit: 'x10^12/L',
    defaultMaleRange: { low: 4.3, high: 5.9 },
    defaultFemaleRange: { low: 3.8, high: 5.2 },
    associatedBodySystem: 'hematologic',
    plainExplanation: {
      en: 'The number of red blood cells in a given volume of blood, responsible for delivering oxygen to all tissues.',
      ur: 'خون میں سرخ خلیوں کی تعداد جو تمام اعضاء کو آکسیجن مہیا کرنے کے ذمہ دار ہیں۔',
      ur_roman: 'Khoon mein red cells ki tadad jo jism ke aaza ko oxygen pohanchati hai.',
    },
    clinicalSignificanceLow: {
      en: 'A reduced red blood cell count usually accompanies low hemoglobin, suggesting anemia or diminished red cell synthesis.',
      ur: 'سرخ خلیوں کی کمی عام طور پر ہیموگلوبن میں کمی کے ساتھ ہوتی ہے اور خون کی کمی کو ظاہر کرتی ہے۔',
      ur_roman: 'RBC ki kami aam tor par anemia ki nishandahi karti hai.',
    },
    clinicalSignificanceHigh: {
      en: 'High RBC count (erythrocytosis) may result from dehydration, lung conditions, or elevated altitude.',
      ur: 'سرخ خلیوں کی زیادتی پانی کی کمی یا پھیپھڑوں کے مسائل میں دیکھی جا سکتی ہے۔',
      ur_roman: 'Ziada RBC count pani ki kami ya saans ke masail ki wajah se ho sakta hai.',
    },
    clinicalSignificanceNormal: {
      en: 'The red cell count is within expected physiological parameters.',
      ur: 'سرخ خلیوں کی تعداد بالکل معمول کے مطابق ہے۔',
      ur_roman: 'RBC count normal range mein hai.',
    },
    contextualLimitations: {
      en: 'RBC counts must be interpreted together with MCV, MCH, and Hemoglobin to understand red cell morphology.',
      ur: 'سرخ خلیوں کی مکمل معلومات کے لیے ایم سی وی اور ہیموگلوبن کو ملا کر دیکھنا ضروری ہے۔',
      ur_roman: 'Mukammal tasveer ke liye MCV aur Hemoglobin ko sath dekhna zaroori hai.',
    },
    sources: [
      {
        title: 'Clinical Hematology Reference Manual',
        organization: 'Pakistan Society of Haematology',
        year: 2022,
        evidenceGrade: 'High',
      },
    ],
  },

  mcv: {
    shortName: 'MCV',
    name: 'Mean Corpuscular Volume',
    category: 'cbc',
    standardUnit: 'fL',
    defaultMaleRange: { low: 80.0, high: 100.0 },
    defaultFemaleRange: { low: 80.0, high: 100.0 },
    criticalLowThreshold: 65.0,
    criticalHighThreshold: 115.0,
    associatedBodySystem: 'hematologic',
    plainExplanation: {
      en: 'MCV measures the average physical size of your red blood cells. It helps categorize different types of anemia.',
      ur: 'ایم سی وی سرخ خون کے خلیوں کے اوسط سائز کی پیمائش کرتا ہے جس سے انیمیا کی قسم معلوم کرنے میں مدد ملتی ہے۔',
      ur_roman: 'MCV red blood cells ke average size ko naapta hai, jo anemia ki type samajhne mein madad deta hai.',
    },
    clinicalSignificanceLow: {
      en: 'Low MCV (microcytosis) means red blood cells are smaller than normal. The two most common causes in Pakistan are iron deficiency and Thalassemia minor (trait). Ferritin and Hemoglobin Electrophoresis help distinguish between them.',
      ur: 'چھوٹے سائز کے سرخ خلیات (مائکروسائٹوسس)۔ پاکستان میں اس کی عام وجوہات میں آئرن کی کمی اور تھیلیسیمیا مائنر شامل ہیں۔ درست تشخیص کے لیے فیرٹین یا الیکٹروفورسس ٹیسٹ مفید ہوتے ہیں۔',
      ur_roman: 'Chhotay size ke red cells (microcytosis). Pakistan mein iski common wajoohath iron ki kami aur Thalassemia minor hain. Dr se Ferritin test ka mashwara karein.',
    },
    clinicalSignificanceHigh: {
      en: 'High MCV (macrocytosis) indicates enlarged red blood cells, frequently related to Vitamin B12 or folate deficiency, liver function, or certain medications.',
      ur: 'بڑے سائز کے سرخ خلیات وٹامن بی 12 یا فولک ایسڈ کی کمی، یا جگر کی کارکردگی کی عکاسی کر سکتے ہیں۔',
      ur_roman: 'Baray size ke red cells Vitamin B12 ya folate ki kami ki taraf ishara kar sakte hain.',
    },
    clinicalSignificanceNormal: {
      en: 'Red blood cell size is normal (normocytic).',
      ur: 'سرخ خلیوں کا سائز نارمل ہے۔',
      ur_roman: 'Red blood cells ka size normal hai.',
    },
    contextualLimitations: {
      en: 'A normal MCV does not exclude early mixed nutritional deficiencies (such as combined iron and B12 deficiency).',
      ur: 'نارمل ایم سی وی بیک وقت وٹامن اور آئرن کی مشترکہ کمی کو مکمل مسترد نہیں کرتا۔',
      ur_roman: 'Normal MCV ke sath bhi dono iron aur B12 ki kami ek sath ho sakti hai.',
    },
    sources: [
      {
        title: 'British Committee for Standards in Haematology: Investigation of microcytosis',
        organization: 'British Journal of Haematology',
        year: 2020,
        evidenceGrade: 'High',
      },
    ],
  },

  wbc: {
    shortName: 'WBC',
    name: 'White Blood Cell Count',
    category: 'cbc',
    standardUnit: 'x10^9/L',
    defaultMaleRange: { low: 4.0, high: 11.0 },
    defaultFemaleRange: { low: 4.0, high: 11.0 },
    criticalLowThreshold: 2.0,
    criticalHighThreshold: 25.0,
    associatedBodySystem: 'immune',
    plainExplanation: {
      en: 'White blood cells are the frontline defenders of your immune system, fighting bacterial, viral, and fungal infections.',
      ur: 'سفید خلیات مدافعتی نظام کے محافظ ہیں جو مختلف انفیکشنز اور جراثیموں کے خلاف لڑتے ہیں۔',
      ur_roman: 'White blood cells immune system ke muhafiz hain jo bimariyon aur infection se lartay hain.',
    },
    clinicalSignificanceLow: {
      en: 'Low WBC (leukopenia) means reduced immune cell count, which can occur during acute viral infections (like Dengue, Typhoid), autoimmune conditions, or medication effects.',
      ur: 'سفید خلیوں میں کمی (لیوکوپینیا) وائرل انفیکشنز (جیسے ڈینگی یا ٹائیفائیڈ) یا مخصوص ادویات کے دوران ہو سکتی ہے۔',
      ur_roman: 'WBC ki kami viral infections (jaise Dengue ya Typhoid) ya medicines ke asar se ho sakti hai.',
    },
    clinicalSignificanceHigh: {
      en: 'High WBC (leukocytosis) most commonly reflects the body responding to infection, tissue inflammation, physical stress, or allergic reactions.',
      ur: 'سفید خلیوں میں اضافہ عام طور پر جسم میں کسی انفیکشن، ورم یا سوزش کے خلاف قدرتی ردعمل کو ظاہر کرتا ہے۔',
      ur_roman: 'Ziada WBC count aam tor par kisi infection ya sozish ke khilaf jism ka rad-e-amal hota hai.',
    },
    clinicalSignificanceNormal: {
      en: 'White blood cell count is within expected baseline limits.',
      ur: 'سفید خلیوں کی تعداد معمول کے مطابق ہے۔',
      ur_roman: 'White blood cells ki tadad bilkul normal hai.',
    },
    contextualLimitations: {
      en: 'WBC count can transiently rise after vigorous exercise, psychological stress, or corticosteroid usage.',
      ur: 'ورزش، شدید ذہنی دباؤ اور اسٹیرائڈز سے عارضی طور پر سفید خلیات بڑھ سکتے ہیں۔',
      ur_roman: 'Warzish aur stress se WBC عارضی tor par barh sakte hain.',
    },
    sources: [
      {
        title: 'Diagnostic approach to leukocytosis and leukopenia',
        organization: 'American Academy of Family Physicians',
        year: 2021,
        evidenceGrade: 'High',
      },
    ],
  },

  plt: {
    shortName: 'PLT',
    name: 'Platelet Count',
    category: 'cbc',
    standardUnit: 'x10^9/L',
    defaultMaleRange: { low: 150.0, high: 450.0 },
    defaultFemaleRange: { low: 150.0, high: 450.0 },
    criticalLowThreshold: 50.0,
    criticalHighThreshold: 800.0,
    associatedBodySystem: 'hematologic',
    plainExplanation: {
      en: 'Platelets are tiny cell fragments essential for blood clotting and stopping bleeding when blood vessels are injured.',
      ur: 'پلیٹلیٹس خون کو جمانے اور کسی بھی چوٹ کی صورت میں خون بہنے سے روکنے میں مددگار خلیاتی ذرات ہیں۔',
      ur_roman: 'Platelets khoon ko jamane aur bleeding roknay ke liye zaroori hotay hain.',
    },
    clinicalSignificanceLow: {
      en: 'Low platelets (thrombocytopenia) can cause easy bruising or bleeding. In Pakistan, acute drops are frequently observed in Dengue fever, viral infections, or immune reactions. Values below 50 warrant urgent clinical review.',
      ur: 'پلیٹلیٹس کی کمی نکسیر یا جلد پر نیلے نشانات کا سبب بن سکتی ہے۔ پاکستان میں ڈینگی وائرس کے دوران ان میں تیزی سے کمی دیکھی جاتی ہے۔ 50 سے کم مقدار میں فوری ہسپتال رجوع ضروری ہے۔',
      ur_roman: 'Kam platelets se jism par neel ya bleeding ho sakti hai. Dengue fever mein platelets tezi se girte hain. 50 se kam honay par fori doctor ko dikhayein.',
    },
    clinicalSignificanceHigh: {
      en: 'Elevated platelets (thrombocytosis) often represent a reactive response to iron deficiency, recent surgery, or ongoing inflammation.',
      ur: 'پلیٹلیٹس کی زیادتی آئرن کی کمی یا کسی سوزش کے ردعمل میں ہو سکتی ہے۔',
      ur_roman: 'Ziada platelets iron ki kami ya purani sozish ke natijay mein barh sakte hain.',
    },
    clinicalSignificanceNormal: {
      en: 'Platelet count is in the safe clotting range.',
      ur: 'پلیٹلیٹس کی تعداد بالکل محفوظ حد میں ہے۔',
      ur_roman: 'Platelets ki tadad normal range mein hai.',
    },
    contextualLimitations: {
      en: 'Laboratory clumping of platelets in EDTA collection tubes can produce artificially low readings (pseudothrombocytopenia). A peripheral smear check confirms true counts.',
      ur: 'لیبارٹری کی ٹیسٹ ٹیوب میں پلیٹلیٹس کا آپس میں چپکنا کبھی کبھار جھوٹی کم ریڈنگ دے سکتا ہے۔ بلڈ سمیر سے تصدیق کی جاتی ہے۔',
      ur_roman: 'Khoon ki tube mein platelets chipakne se ghalat kam reading aa sakti hai jise blood smear se verify kiya jata hai.',
    },
    sources: [
      {
        title: 'National Guidelines for Dengue Management',
        organization: 'Ministry of National Health Services, Pakistan',
        year: 2022,
        evidenceGrade: 'High',
      },
      {
        title: 'Investigation and management of thrombocytopenia in adults',
        organization: 'British Journal of Haematology',
        year: 2021,
        evidenceGrade: 'High',
      },
    ],
  },

  fbs: {
    shortName: 'FBS',
    name: 'Fasting Blood Glucose',
    category: 'metabolic',
    standardUnit: 'mg/dL',
    defaultMaleRange: { low: 70.0, high: 99.0 },
    defaultFemaleRange: { low: 70.0, high: 99.0 },
    criticalLowThreshold: 55.0,
    criticalHighThreshold: 300.0,
    associatedBodySystem: 'metabolic',
    plainExplanation: {
      en: 'Measures the amount of sugar (glucose) in your bloodstream after an overnight fast of at least 8 to 10 hours.',
      ur: 'رات بھر 8 سے 10 گھنٹے بھوکا رہنے کے بعد خون میں شکر (گلوکوز) کی مقدار کی پیمائش کرتا ہے۔',
      ur_roman: 'Raat bhar 8-10 ghantay faaqay ke baad khoon mein sugar ki miqdaar naapta hai.',
    },
    clinicalSignificanceLow: {
      en: 'Low fasting sugar (hypoglycemia) can cause sweating, trembling, dizziness, and confusion. It requires immediate intake of fast-acting glucose.',
      ur: 'شکر کی کمی (ہائپوگلائسیمیا) پسینہ آنے، کپکپاہٹ اور چکر کا باعث بنتی ہے اور فوری میٹھی چیز کھانے کی ضرورت ہوتی ہے۔',
      ur_roman: 'Kam sugar se paseena, kapkapahat aur chakkar aate hain. Foran meethi cheez lena zaroori hota hai.',
    },
    clinicalSignificanceHigh: {
      en: 'Fasting glucose between 100-125 mg/dL indicates prediabetes; 126 mg/dL or higher on two separate tests suggests diabetes mellitus. Discuss diet, lifestyle, and HbA1c testing with your physician.',
      ur: '100 سے 125 پری ذیابیطس اور 126 یا زائد شوگر کی بیماری کی نشاندہی کر سکتی ہے۔ تصدیق کے لیے HbA1c ٹیسٹ مفید ہوتا ہے۔',
      ur_roman: '100-125 pre-diabetes aur 126 se upar sugar ki bimari ho sakti hai. Dr se HbA1c test ka mashwara karein.',
    },
    clinicalSignificanceNormal: {
      en: 'Fasting glucose is within the healthy, non-diabetic range.',
      ur: 'خون میں شوگر کی مقدار بالکل نارمل اور محفوظ حد میں ہے۔',
      ur_roman: 'Fasting sugar ki reading normal range mein hai.',
    },
    contextualLimitations: {
      en: 'Accurate results require a true 8-12 hour fast with only plain water permitted. Stress, illness, and certain medicines can elevate glucose.',
      ur: 'صحیح نتیجے کے لیے کم از کم 8 سے 12 گھنٹے کا فاقہ ضروری ہے۔ ذہنی دباؤ اور ادویات سے شوگر عارضی طور پر بڑھ سکتی ہے۔',
      ur_roman: 'Sahi result ke liye 8-12 ghantay ka roza/faqa zaroori hai. Bemari aur stress se sugar barh sakti hai.',
    },
    sources: [
      {
        title: 'Standards of Care in Diabetes',
        organization: 'American Diabetes Association (ADA)',
        year: 2024,
        evidenceGrade: 'High',
      },
    ],
  },
};
