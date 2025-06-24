"use client";

import NotFound from "@/components/pages/not-found";
import { useLanguage } from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";
import React from "react";

type Language = 'en' | 'ar';
const LANGUAGE: Language[] = ['ar', 'en'];

export default function NotFoundPage() {
    const { language, setLanguage } = useLanguage();
    const pathName = usePathname();

    React.useEffect(() => {
        const lang: Language | string = navigator?.language.slice(0, 2);
        if (LANGUAGE.find(item => pathName.startsWith(`/${item}`)) && lang !== language) setLanguage(lang as Language);
        if (LANGUAGE.includes(lang as Language) && lang !== language) setLanguage(lang as Language);
    }, [language, setLanguage, pathName]);

    return <NotFound />
}
