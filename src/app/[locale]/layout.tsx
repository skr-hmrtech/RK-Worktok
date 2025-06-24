"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

type Language = 'en' | 'ar';
const LANGUAGE = ['ar', 'en'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname();
  const router = useRouter();
  const { locale }: { locale: Language } = useParams();

  React.useEffect(() => {
    const isLangPath = pathname.startsWith(`/ar`) || pathname.startsWith(`/en`);
    if (!isLangPath) {
      router.push(`/${language}/${pathname}`);
      return
    }

    if (locale && !LANGUAGE.includes(locale)) {
      router.push(`/${language}`);
      return
    }

    if (LANGUAGE.includes(locale) && locale !== language) setLanguage(locale);
  }, [locale, router, language, setLanguage, pathname]);

  return (
    <React.Fragment>
      <body>
        {children}
      </body>
    </React.Fragment>
  );
}
