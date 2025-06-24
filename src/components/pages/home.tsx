"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactSelect from "@/components/ui/react-select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Clock, Award, Star, MapPin, MessageCircle, ChevronDown, Download, CheckCircle, Search, Users } from "lucide-react";
import Link from "next/link";
import ServiceCategoryCard from "@/components/service-category-card";
import ProviderCard from "@/components/provider-card";
import AnimatedSection from "@/components/animated-section";
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from "@/components/typing-text";
import ScrollToTop from "@/components/scroll-to-top";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Category, City, Provider } from "@/shared/schema";
import { useRouter } from "next/navigation";
import HomeBG1 from "@/assets/images/Home-BG-1.jpeg";
import HomeBG2 from "@/assets/images/Home-BG-2.jpeg";
import HomeBG3 from "@/assets/images/Home-BG-3.jpeg";
import { formatNumberByLocal } from "@/lib/common";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap = {
  Shield,
  Clock,
  Award,
} as const;

type IconName = keyof typeof iconMap;

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
  delay: number;
}

export default function Home() {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for contacting us! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: ""
    });
  };

  const { content, language } = useLanguage();
  const features: Feature[] = content.whyChoose.features.map((f) => ({ ...f, icon: f.icon as IconName }));

  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    }
  });

  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await fetch('/api/cities');
      if (!response.ok) throw new Error('Failed to fetch cities');
      return response.json();
    }
  });

  const { data: providers = [], isLoading: providerLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const response = await fetch('/api/providers');
      if (!response.ok) throw new Error('Failed to fetch providers');
      return response.json().then((data: { data: Provider[] }) => (data?.data || []));
    }
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{
    verifiedProviders: number;
    completedServices: number;
    averageRating: number;
    cities: number;
  }>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  // Background images for hero section
  const backgroundImages = [HomeBG1, HomeBG2, HomeBG3];

  // Background image slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleSearch = () => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams();
      if (selectedCategory) searchParams.set("category", selectedCategory.toString());
      if (selectedCity) searchParams.set("city", selectedCity.toString());

      router.push(`/${language}/services${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />

      {/* Hero Section */}
      <AnimatedSection animationType="fadeIn">
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background Images Slider */}
          <div className="absolute inset-0 z-0">
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
              >
                <Image
                  src={image}
                  alt={`Background ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

          {/* Content */}
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-30">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  {/* First: Large Static Heading */}
                  <AnimatedSection animationType="slideLeft" delay={200}>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight text-center lg:text-left">
                      {content.hero.title}
                    </h1>
                  </AnimatedSection>

                  {/* Second: X-Large Typing Text */}
                  <AnimatedSection animationType="slideLeft" delay={400}>
                    <div className="mb-8 text-center lg:text-left">
                      <div className="text-3xl md:text-3xl lg:text-4xl font-bold mb-4">
                        <TypingText
                          texts={content.hero.typingTexts}
                          speed={120}
                          deleteSpeed={60}
                          delay={2000}
                          className="bg-gradient-to-r from-[#4caf50] via-blue-400 to-purple-400 bg-clip-text text-transparent"
                        />
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Third: Medium Paragraph for Platform */}
                  <AnimatedSection animationType="slideLeft" delay={600}>
                    <p className="text-lg md:text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed max-w-4xl text-center lg:text-left">
                      {content.hero.subtitle}
                    </p>
                  </AnimatedSection>
                  <AnimatedSection animationType="slideLeft" delay={600}>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {content.hero.verified_professionals}
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {content.hero.quick_response}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm">
                        <Award className="w-4 h-4 mr-2" />
                        {content.hero.quality_assured}
                      </Badge>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Search Card */}
                <AnimatedSection animationType="slideRight" delay={800}>
                  <Card className="p-8 shadow-2xl bg-white/95 backdrop-blur-lg border-0 hover:shadow-3xl transition-all duration-500">
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {content.hero.form.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {content.hero.form.subTitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {content.hero.form.service_type}
                        </label>
                        <ReactSelect
                          options={categories.map((city: Category) => ({ value: city.id, label: language === "ar" ? city.nameAr : city.name }))}
                          selectedOption={selectedCategory}
                          onChange={setSelectedCategory}
                          placeholder={content.hero.form.service_search}
                          noOptionsMessage={content.common.no_options}
                          isSearchIcon
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {content.hero.form.location}
                        </label>
                        <ReactSelect
                          options={cities.map((city: City) => ({ value: city.id, label: language === "ar" ? city.nameAr : city.name }))}
                          selectedOption={selectedCity}
                          onChange={setSelectedCity}
                          placeholder={content.hero.form.location_search}
                          noOptionsMessage={content.common.no_options}
                        />
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        onClick={handleSearch}
                      >
                        <Search className="w-5 h-5 mr-2" />
                        {content.hero.form.search_service}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection animationType="slideUp">
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {
                statsLoading ? (
                  Array(4).fill(null).map((_, index) => (
                    <AnimatedSection key={index} animationType="scale" delay={index * 100}>
                      <Card className="bg-white p-2 rounded-2xl text-center hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Skeleton className="w-8 h-8 rounded-full" />
                          </div>
                          <div className="mb-4">
                            <Skeleton className="h-8 w-1/2 mx-auto" />
                          </div>
                          <div>
                            <Skeleton className="h-5 w-3/4 mx-auto" />
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))) : (
                  [
                    { value: `${formatNumberByLocal(stats?.verifiedProviders ?? 0)}+`, label: content.stats.verified_professionals, color: 'text-blue-600', bg: 'bg-blue-100', delay: 0 },
                    { value: `${formatNumberByLocal(stats?.completedServices ?? 0).toLocaleString()}+`, label: content.stats.service_completed, color: 'text-green-600', bg: 'bg-green-100', delay: 100 },
                    { value: `${formatNumberByLocal(stats?.averageRating ?? 0)}/5`, label: content.stats.average_rating, color: 'text-yellow-600', bg: 'bg-yellow-100', delay: 200 },
                    { value: `${formatNumberByLocal(stats?.cities ?? 0)}+`, label: content.stats.cities_covered, color: 'text-purple-600', bg: 'bg-purple-100', delay: 300 }
                  ].map((stat, index) => (
                    <AnimatedSection key={index} animationType="scale" delay={stat.delay}>
                      <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                        <div className={`w-16 h-16 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <div className={`text-2xl font-bold ${stat.color}`}>
                            {index === 0 ? <Users className="w-8 h-8" /> :
                              index === 1 ? <CheckCircle className="w-8 h-8" /> :
                                index === 2 ? <Star className="w-8 h-8" /> :
                                  <MapPin className="w-8 h-8" />}
                          </div>
                        </div>
                        <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                        <div className="text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </AnimatedSection>
                  ))
                )
              }
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Service Categories */}
      <AnimatedSection animationType="fadeIn">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animationType="slideUp">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {content.popularServices.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {content.popularServices.subTitle}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {
                categoryLoading
                  ? Array(4).fill(null).map((_, index) => (
                    <AnimatedSection key={index} animationType="slideUp" delay={index * 50}>
                      <div className="group hover:scale-105 transition-all duration-300 p-4 border rounded-lg shadow-md">
                        <Skeleton className="h-20 w-20 mx-auto mb-5 rounded-2xl" />
                        <Skeleton className="h-6 w-1/2 mx-auto mb-3" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-1/3" />
                          <Skeleton className="h-5 w-5" />
                        </div>
                      </div>
                    </AnimatedSection>
                  ))
                  : categories.slice(0, 4).map((category: Category, index: number) => (
                    <AnimatedSection key={category.id} animationType="slideUp" delay={index * 50}>
                      <div className="group hover:scale-105 transition-all duration-300">
                        <ServiceCategoryCard
                          category={category}
                          onClick={() => router.push(`/${language}/services?category=${category.id}`)}
                        />
                      </div>
                    </AnimatedSection>
                  ))}
            </div>

            <AnimatedSection animationType="slideUp" delay={500}>
              <div className="text-center mt-12">
                <Link href={`/${language}/services`}>
                  <Button variant="outline" size="lg" className="hover:scale-105 transition-all bg-white cursor-pointer duration-300 px-8 py-4 text-lg rounded-full border-2 border-green-600 text-green-600 hover:bg-green-50">
                    {content.popularServices.view_all}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Providers */}
      <AnimatedSection animationType="fadeIn">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animationType="slideUp">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {content.topProviders.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {content.topProviders.subtitle}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {
                providerLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <Skeleton className="w-20 h-20 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-16 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </Card>
                  ))
                  : providers.slice(0, 3).map((provider: Provider, index: number) => {
                    return (
                      <AnimatedSection key={provider.id} animationType="slideUp" delay={index * 150}>
                        <div className="group hover:scale-[1.02] transition-all duration-300">
                          <ProviderCard
                            provider={provider}
                            onClick={() => router.push(`/${language}/providers/${provider.id}`)}
                            onContact={() => {
                              alert(`Contact form for ${provider.name} would open in a real application`);
                            }}
                          />
                        </div>
                      </AnimatedSection>
                    );
                  })}
            </div>

            <AnimatedSection animationType="slideUp" delay={450}>
              <div className="text-center mt-12">
                <Link href={`/${language}/providers`}>
                  <Button variant="outline" size="lg" className="hover:scale-105 transition-all bg-white cursor-pointer text-gray-900 duration-300 px-8 py-4 text-lg rounded-full border-2">
                    {content.topProviders.view_all}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection animationType="fadeIn">
        <section className="py-20 bg-gradient-to-br from-[#4caf50] via-[#008a85] to-[#2e7d32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animationType="slideUp">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {content.whyChoose.title}
                </h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  {content.whyChoose.subTitle}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map(({ icon, title, description, delay }, index) => {
                const LucideIcon = iconMap[icon];
                return (
                  <AnimatedSection key={index} animationType="slideUp" delay={delay}>
                    <Card className="text-center p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 h-full">
                      <CardHeader>
                        <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                          <LucideIcon className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white mb-4">{title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg text-white/90 leading-relaxed">
                          {description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* At Your Doorstep Section */}
      <AnimatedSection animationType="fadeIn">
        <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <AnimatedSection animationType="slideUp">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {language === 'ar' ? 'خدمات في متناول يدك' : 'At Your Doorstep'}
                </h2>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={200}>
                <div className="text-2xl md:text-3xl text-green-600 font-semibold h-16 flex items-center justify-center">
                  <TypingText
                    texts={language === 'ar' ? [
                      'خدمات تنظيف عالية الجودة',
                      'إصلاحات سريعة وموثوقة',
                      'خدمات صيانة احترافية',
                      'حلول منزلية شاملة',
                      'فنيون معتمدون ومدربون'
                    ] : [
                      'Quality cleaning services delivered',
                      'Fast and reliable repairs at home',
                      'Professional maintenance solutions',
                      'Complete home service solutions',
                      'Certified and trained technicians'
                    ]}
                    speed={80}
                    deleteSpeed={40}
                    delay={1500}
                    className="text-green-600 font-bold"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={400}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
                  {language === 'ar'
                    ? 'نحن نقدم خدمات عالية الجودة مباشرة إلى منزلك. من التنظيف إلى الإصلاحات، نحن هنا لخدمتك.'
                    : 'We bring high-quality services directly to your home. From cleaning to repairs, we are here to serve you.'
                  }
                </p>
              </AnimatedSection>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: language === 'ar' ? 'خدمة سريعة' : 'Quick Service',
                  description: language === 'ar' ? 'استجابة سريعة خلال ساعات' : 'Fast response within hours',
                  icon: '⚡',
                  delay: 0
                },
                {
                  title: language === 'ar' ? 'جودة مضمونة' : 'Quality Assured',
                  description: language === 'ar' ? 'ضمان على جميع الخدمات' : 'Guarantee on all services',
                  icon: '✅',
                  delay: 150
                },
                {
                  title: language === 'ar' ? 'أسعار منافسة' : 'Competitive Prices',
                  description: language === 'ar' ? 'أفضل الأسعار في السوق' : 'Best prices in the market',
                  icon: '💰',
                  delay: 300
                }
              ].map((feature, index) => (
                <AnimatedSection key={index} animationType="slideUp" delay={feature.delay}>
                  <Card className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-green-500">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Have a Question Section */}
      <AnimatedSection animationType="slideUp">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#4caf50] to-green-600 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                {content.inquiry.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.inquiry.subtitle}
              </p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-2xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {content.inquiry.form.name} *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={content.inquiry.form.namePlaceholder}
                        className="w-full bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 focus:border-[#4caf50] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {content.inquiry.form.email} *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={content.inquiry.form.emailPlaceholder}
                        className="w-full bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 focus:border-[#4caf50] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {content.inquiry.form.mobile} *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={content.inquiry.form.mobilePlaceholder}
                        className="w-full bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 focus:border-[#4caf50] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {content.inquiry.form.subject} *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={content.inquiry.form.subjectPlaceholder}
                        className="w-full bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 focus:border-[#4caf50] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {content.inquiry.form.message} *
                    </label>
                    <Textarea
                      placeholder={content.inquiry.form.messagePlaceholder}
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 focus:border-[#4caf50] transition-colors resize-none"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-[#4caf50] to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      {content.inquiry.form.submit}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Download Our Apps Section */}
      <AnimatedSection animationType="slideUp" delay={200}>
        <section id="download" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {content.appDownload.title}
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {content.appDownload.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm text-center p-8">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{content.appDownload.customerApp.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{content.appDownload.customerApp.description}</p>
                  <div className="flex flex-col sm:flex-row gap-15 justify-center">
                    <Link href={"https://play.google.com/store/apps/details?id=org.worktok.customer"} target="_blank">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" width={100} height={100} alt="Google Play" className="scale-150 cursor-pointer" />
                    </Link>
                    <Link href={"https://apps.apple.com/us/app/worktok-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%8A%D8%AA-%D8%A7%D9%84%D8%B9%D8%B1%D8%A7%D9%82%D9%8A/id1659994661"} target="_blank">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" width={100} height={100} alt="App Store" className="scale-150 cursor-pointer" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm text-center p-8">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{content.appDownload.providerApp.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{content.appDownload.providerApp.description}</p>
                  <div className="flex flex-col sm:flex-row gap-15 justify-center">
                    <Link href={"https://play.google.com/store/apps/details?id=org.worktok.provider"} target="_blank">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" width={100} height={100} alt="Google Play" className="scale-150 cursor-pointer" />
                    </Link>
                    <Link href={"https://apps.apple.com/us/app/worktok-%D9%84%D9%84%D8%AD%D8%B1%D9%81%D9%8A%D9%8A%D9%86/id1662766442"} target="_blank">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" width={100} height={100} alt="App Store" className="scale-150 cursor-pointer" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection animationType="slideUp">
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                {content.faq.title}
              </h2>
              <p className="text-xl text-gray-600">{content.faq.subtitle}</p>
            </div>

            <div className="space-y-4">
              {(showAllFAQs ? content.faq.questions : content.faq.questions.slice(0, 5)).map((faq, index) => (
                <Card key={index} className="shadow-lg borderer-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[#4caf50] transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedFAQ === index && (
                        <motion.div
                          key="faq-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.01 }}
                          className="overflow-hidden px-6 py-6 text-gray-600 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAllFAQs(!showAllFAQs)}
                variant="outline"
                className="border-[#4caf50] text-[#4caf50] bg-white font-bold cursor-pointer hover:bg-[#4caf50] hover:text-white px-8 py-3 rounded-full"
              >
                {showAllFAQs ? content.faq.lessButton : content.faq.moreButton}
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection animationType="slideUp">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animationType="scale" delay={200}>
              <div className="bg-gradient-to-r from-[#4caf50] via-[#008a85] to-[#2e7d32] rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {content.joinUs.title}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  {content.joinUs.subTitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/${language}/services`}>
                    <Button size="lg" className="cursor-pointer bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      {content.joinUs.browse_services}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href={`/${language}/providers`}>
                    <Button variant="outline" size="lg" className="cursor-pointer border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105">
                      {content.joinUs.find_professionals}
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}