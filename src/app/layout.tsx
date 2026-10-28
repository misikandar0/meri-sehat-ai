import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background3DMatrix from '@/components/Background3DMatrix';
import ScrollHUD from '@/components/ScrollHUD';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meri Sehat AI — Understand Your Health. Know Your Next Step.',
  description:
    'Turn complex medical reports and prescriptions into clear, cautious, plain-language explanations. Founded by a Doctor of Pharmacy (Pharm.D) graduate, powered by ethical clinical AI with verified reference ranges and doctor-prepared questions.',
  keywords: [
    'Meri Sehat AI',
    'medical report plain language',
    'blood test analyzer',
    'cbc test explanation',
    'prescription explainer',
    'biomarker interpretation',
    'health literacy pakistan',
  ],
  authors: [{ name: 'Meri Sehat AI Healthcare Technology' }],
  metadataBase: new URL('https://merisehat.ai'),
  openGraph: {
    title: 'Meri Sehat AI — Understand Your Health. Know Your Next Step.',
    description:
      'Turn complex medical reports into clear explanations, understand your results, and discover the right questions to ask your doctor.',
    type: 'website',
    locale: 'en_PK',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="min-h-full flex flex-col bg-[#07111F] text-[#F7FAFF] font-sans antialiased selection:bg-[#56E6F2]/30 selection:text-[#56E6F2] relative">
        {/* Page-Wide 3D Perspective Background Mesh (Waves & Constellation while page moves) */}
        <Background3DMatrix />

        <LanguageProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />

          {/* Real-time 3D Scroll Depth Gyro HUD */}
          <ScrollHUD />
        </LanguageProvider>
      </body>
    </html>
  );
}
