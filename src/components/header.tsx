
"use client"

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { content, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    if (!pathname.includes(`/${language}`)) {
      router.replace(`/${language === "en" ? "ar" : "en"}${pathname}`);
      return;
    }

    router.replace(`${pathname}`.replace(`/${language}`, `/${language === "en" ? "ar" : "en"}`));
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#4caf50] to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold">WorkTok</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href={`/${language}`} className="text-sm font-bold hover:text-[#4caf50] transition-colors">
              {content.header.navigation.home}
            </Link>
            <Link href={`/${language}/services`} className="text-sm font-bold hover:text-[#4caf50] transition-colors">
              {content.header.navigation.categories}
            </Link>
            <Link href={`/${language}/providers`} className="text-sm font-bold hover:text-[#4caf50] transition-colors">
              {content.header.navigation.providers}
            </Link>
            <Link href={`/${language}/about`} className="text-sm font-bold hover:text-[#4caf50] transition-colors">
              {content.header.navigation.about}
            </Link>
            <Link href={`/${language}/contact`} className="text-sm font-bold hover:text-[#4caf50] transition-colors">
              {content.header.navigation.contact}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="font-bold text-md cursor-pointer text-[#4caf50] hover:bg-[#4caf50] hover:text-white border-2 p-2" size="sm" onClick={toggleLanguage}>
              <span role="img" className="mr-2 text-2xl">{language === 'en' ? '🇮🇶' : '🇺🇸'}</span>
              {language === 'en' ? 'العربية' : 'English'}
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href={`/${language}`}
                    className="text-lg font-bold hover:text-[#4caf50] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {content.header.navigation.home}
                  </Link>
                  <Link
                    href={`/${language}/services`}
                    className="text-lg font-bold hover:text-[#4caf50] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {content.header.navigation.categories}
                  </Link>
                  <Link
                    href={`/${language}/providers`}
                    className="text-lg font-bold hover:text-[#4caf50] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {content.header.navigation.providers}
                  </Link>
                  <Link
                    href={`/${language}/about`}
                    className="text-lg font-bold hover:text-[#4caf50] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {content.header.navigation.about}
                  </Link>
                  <Link
                    href={`/${language}/contact`}
                    className="text-lg font-bold hover:text-[#4caf50] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {content.header.navigation.contact}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
