"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import contentEn from '@/data/content-en.json';
import contentAr from '@/data/content-ar.json';

type Language = 'en' | 'ar';
type Content = typeof contentEn;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: Content;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const content = language === 'ar' ? contentAr : contentEn;
  const isRTL = language === 'ar';

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}