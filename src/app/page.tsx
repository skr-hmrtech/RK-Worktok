"use client";

import HomePage from "@/components/pages/home";
import { useLanguage } from "@/hooks/useLanguage";
import React from "react";

type Language = 'en' | 'ar';
const LANGUAGE: Language[] = ['ar', 'en'];

export default function Home() {
  const { language, setLanguage } = useLanguage();

  React.useEffect(() => {
    const lang: Language | string = navigator?.language.slice(0, 2);
    if (LANGUAGE.includes(lang as Language) && lang !== language) setLanguage(lang as Language);
  }, [language, setLanguage]);

  return (
    <HomePage />
  );
}
