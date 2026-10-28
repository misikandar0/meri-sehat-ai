'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LocalizedString } from '../types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  loc: (obj: LocalizedString | undefined) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('meri_sehat_lang') as Language;
      if (saved && (saved === 'en' || saved === 'ur' || saved === 'ur_roman')) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('meri_sehat_lang', lang);
    } catch {
      // ignore
    }
  };

  const isRtl = language === 'ur';

  // Update HTML dir and lang attributes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = language === 'ur' ? 'ur' : 'en';
    }
  }, [isRtl, language]);

  // Nested translation retriever helper
  const t = (path: string): string => {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let curr: any = translations[language] || translations['en'];
    for (const key of keys) {
      if (curr && typeof curr === 'object' && key in curr) {
        curr = curr[key];
      } else {
        return path;
      }
    }
    return typeof curr === 'string' ? curr : path;
  };

  const loc = (obj: LocalizedString | undefined): string => {
    if (!obj) return '';
    return obj[language] || obj['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loc, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
