"use client"

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-13 w-13 rounded-full 
          bg-gradient-to-br from-[#4caf50] via-[#008a85] to-[#2e7d32] 
          text-white shadow-xl hover:shadow-2xl 
          transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronUp className="scale-200" />
      </Button>
    </div>
  );
}
