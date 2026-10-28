import { LocalizedString } from '../types';

export interface VerifiedMedicineInfo {
  genericName: string;
  brandNamesInPakistan: string[];
  therapeuticClass: string;
  commonUses: LocalizedString;
  mechanism: LocalizedString;
  commonSideEffects: LocalizedString[];
  importantPrecautions: LocalizedString[];
  questionsForPharmacist: LocalizedString[];
}

export const VERIFIED_MEDICINES: Record<string, VerifiedMedicineInfo> = {
  paracetamol: {
    genericName: 'Paracetamol (Acetaminophen)',
    brandNamesInPakistan: ['Panadol', 'Calpol', 'Disprol', 'Febrol'],
    therapeuticClass: 'Analgesic & Antipyretic',
    commonUses: {
      en: 'Commonly used to relieve mild to moderate pain (such as headaches, muscle aches, or toothaches) and to reduce elevated body temperature (fever).',
      ur: 'عام طور پر ہلکے سے درمیانے درجے کے درد (سر درد، جسمانی درد) کو کم کرنے اور بخار کو اتارنے کے لیے استعمال کی جاتی ہے۔',
      ur_roman: 'Halkay dard (sar dard, jism dard) aur bukhar ko kam karne ke liye aam tor par istemal hoti hai.',
    },
    mechanism: {
      en: 'It acts primarily on the central nervous system to block chemical messengers (prostaglandins) that transmit pain signals and regulate the hypothalamic body temperature set-point.',
      ur: 'یہ دماغ میں ان کیمیائی سگنلز کو روکتی ہے جو درد کے پیغامات پہنچاتے ہیں اور جسم کے درجہ حرارت کو کنٹرول کرتی ہے۔',
      ur_roman: 'Yeh dimagh mein dard ke signals ko rokti hai aur body temperature ko normal par lati hai.',
    },
    commonSideEffects: [
      {
        en: 'Generally well-tolerated at recommended therapeutic doses. Mild nausea or stomach upset can occasionally occur.',
        ur: 'مقررہ مقدار میں عام طور پر محفوظ ہے۔ کبھی کبھار ہلکی متلی ہو سکتی ہے۔',
        ur_roman: 'Sahi dose mein aam tor par safe hai. Kabhi kabhar halki matli ho sakti hai.',
      },
    ],
    importantPrecautions: [
      {
        en: 'Do not exceed 4,000 mg (4 grams) in 24 hours. Check other over-the-counter flu/cough medicines to ensure you are not doubling up on paracetamol, as excess doses cause severe liver damage.',
        ur: '24 گھنٹوں میں 4 گرام (8 گولیاں) سے زیادہ نہ لیں۔ دوسری ادویات چیک کریں تاکہ غیر ارادی طور پر زائد مقدار جگر کو نقصان نہ پہنچائے۔',
        ur_roman: '24 ghante mein 4000mg se ziada na lein taake jigar (liver) ko nuqsan na pohnchay.',
      },
    ],
    questionsForPharmacist: [
      {
        en: 'Can I take this medication with or without food?',
        ur: 'کیا یہ دوا کھانے کے ساتھ لینی چاہیے یا خالی پیٹ؟',
        ur_roman: 'Kya yeh dawai khanay ke sath leni hai ya khali pait?',
      },
      {
        en: 'Are any of my other ongoing medications interacting with this?',
        ur: 'کیا میری دوسری چلنے والی ادویات کے ساتھ اس کا کوئی باہمی اثر ہے؟',
        ur_roman: 'Kya meri doosri medicines ke sath iska koi interaction hai?',
      },
    ],
  },

  amoxicillin: {
    genericName: 'Amoxicillin / Clavulanic Acid',
    brandNamesInPakistan: ['Augmentin', 'Curam', 'Amoxi-Clav', 'Moxclav'],
    therapeuticClass: 'Broad-Spectrum Antibiotic',
    commonUses: {
      en: 'Prescribed to treat specific bacterial infections, including respiratory tract infections, ear/sinus infections, dental abscesses, and urinary tract infections.',
      ur: 'مخصوص بیکٹیریل انفیکشنز جیسے گلے، کان، سینے، دانت یا پیشاب کی نالی کے جراثیم کے علاج کے لیے تجویز کی جاتی ہے۔',
      ur_roman: 'Gala, kaan, seenay aur urine ke bacterial infections ke khatmay ke liye di jati hai.',
    },
    mechanism: {
      en: 'It stops bacteria from building their protective cell walls, causing bacterial death. Clavulanic acid helps prevent resistant bacterial enzymes from deactivating amoxicillin.',
      ur: 'یہ بیکٹیریا کی حفاظتی دیوار بننے سے روک کر جراثیموں کو ختم کرتی ہے۔',
      ur_roman: 'Yeh bacteria ki growth ko rokti hai aur unhein khatam karti hai.',
    },
    commonSideEffects: [
      {
        en: 'Mild loose stools or diarrhea, abdominal discomfort, and nausea.',
        ur: 'پیٹ میں مروڑ، متلی یا ہلکے دست۔',
        ur_roman: 'Pait kharab hona, halkay dast ya matli.',
      },
    ],
    importantPrecautions: [
      {
        en: 'Must complete the exact prescribed course even if symptoms resolve earlier. Inform the doctor if you have ever had a penicillin allergy or rash.',
        ur: 'طبیعت بہتر ہونے کے باوجود ڈاکٹر کی بتائی گئی مکمل مدت تک دوا جاری رکھیں۔ اگر پینسلین سے الرجی ہو تو فوراً مطلع کریں۔',
        ur_roman: 'Doctor ka bataya hua course mukammal karein. Agar penicillin allergy ho to foran batayein.',
      },
    ],
    questionsForPharmacist: [
      {
        en: 'Should I take this at the start of a meal to reduce digestive upset?',
        ur: 'کیا پیٹ کی خرابی سے بچنے کے لیے اسے کھانے کے شروع میں لینا بہتر ہے؟',
        ur_roman: 'Kya pait ki kharabi se bachne ke liye khanay ke shuru mein lein?',
      },
    ],
  },

  omeprazole: {
    genericName: 'Omeprazole',
    brandNamesInPakistan: ['Risek', 'Omega', 'Omez', 'Risek Insta'],
    therapeuticClass: 'Proton Pump Inhibitor (PPI)',
    commonUses: {
      en: 'Used to decrease excessive stomach acid production, treating heartburn, acid reflux (GERD), and stomach or duodenal ulcers.',
      ur: 'معدے میں زائد تیزابیت کو کم کرنے، جلن، گیس اور معدے کے السر کے علاج کے لیے استعمال ہوتی ہے۔',
      ur_roman: 'Maiday ki tezabiyat (acidity), jalan aur ulcer ko theek karne ke liye di jati hai.',
    },
    mechanism: {
      en: 'Selectively blocks the proton pump enzymes (H+/K+ ATPase) in the gastric lining, significantly curbing gastric acid secretion.',
      ur: 'یہ معدے کی دیواروں میں تیزاب پیدا کرنے والے نظام کو عارضی طور پر سست کرتی ہے۔',
      ur_roman: 'Maiday mein acid banane walay pumps ko block kar ke jalan kam karti hai.',
    },
    commonSideEffects: [
      {
        en: 'Headache, mild abdominal fullness, constipation, or transient diarrhea.',
        ur: 'ہلکا سر درد، پیٹ میں بھاری پن یا قبض۔',
        ur_roman: 'Halka sar dard ya pait mein bharipan.',
      },
    ],
    importantPrecautions: [
      {
        en: 'Usually recommended 30 to 60 minutes before breakfast on an empty stomach for maximum absorption and efficacy.',
        ur: 'بہترین اثر کے لیے صبح ناشتے سے 30 سے 60 منٹ پہلے نہار منہ لینا مفید سمجھا جاتا ہے۔',
        ur_roman: 'Behtar asar ke liye subah nashtay se aadha ghanta pehle khali pait lein.',
      },
    ],
    questionsForPharmacist: [
      {
        en: 'How many days should I continue this medication?',
        ur: 'یہ دوا کتنے دن جاری رکھنی ہے؟',
        ur_roman: 'Yeh dawai kitnay din tak jari rakhni hai?',
      },
    ],
  },

  metformin: {
    genericName: 'Metformin Hydrochloride',
    brandNamesInPakistan: ['Glucophage', 'Neodipar', 'Getformin'],
    therapeuticClass: 'Biguanide Antidiabetic Agent',
    commonUses: {
      en: 'First-line prescription for managing high blood sugar in Type 2 Diabetes Mellitus, and frequently used in Polycystic Ovary Syndrome (PCOS).',
      ur: 'شوگر (ذیابیطس ٹائپ 2) کے علاج اور خواتین میں پی سی او ایس (PCOS) کے لیے سب سے عام تجویز کی جانے والی دوا۔',
      ur_roman: 'Type 2 Diabetes aur khawateen mein PCOS ke liye aam tor par use hoti hai.',
    },
    mechanism: {
      en: 'Reduces the amount of glucose produced by the liver and increases the sensitivity of your muscle tissues to insulin.',
      ur: 'جگر میں زائد گلوکوز بننے کی رفتار کم کرتی ہے اور انسولین کے اثر کو بہتر بناتی ہے۔',
      ur_roman: 'Jigar mein ziada glucose banne ko rokti hai aur insulin ka asar barhati hai.',
    },
    commonSideEffects: [
      {
        en: 'Bloating, metallic taste, nausea, loose stools, especially during initial days.',
        ur: 'منہ کا ذائقہ کڑوا ہونا، اپھارہ یا ہلکے دست (خصوصاً شروع کے چند دنوں میں)۔',
        ur_roman: 'Shuruati dinon mein gas, pait kharab ya matli.',
      },
    ],
    importantPrecautions: [
      {
        en: 'Take with or immediately after a meal to minimize gastrointestinal discomfort. Never modify your prescribed dose without your doctor.',
        ur: 'معدے کی تکلیف سے بچنے کے لیے کھانے کے دوران یا فوراً بعد لیں۔ ڈاکٹر کے مشورے کے بغیر مقدار تبدیل نہ کریں۔',
        ur_roman: 'Khanay ke sath ya foran baad lein taake pait par bura asar na paray.',
      },
    ],
    questionsForPharmacist: [
      {
        en: 'What symptoms should alert me to low blood sugar if combined with other therapies?',
        ur: 'شوگر بہت زیادہ گرنے کی صورت میں کن علامات کا خیال رکھنا چاہیے؟',
        ur_roman: 'Low sugar ki soorat mein kin alamath par dhyan dena zaroori hai?',
      },
    ],
  },
};
