"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle } from "lucide-react";
import AnimatedSection from "@/components/animated-section";
import { useLanguage } from "@/hooks/useLanguage";

const iconMap = {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  AlertCircle
} as const;

type IconName = keyof typeof iconMap;

export interface Policy {
  icon: IconName;
  title: string;
  content: Array<string>;
}

export default function Privacy() {

  const { content } = useLanguage();

  const policy: Policy[] = content.privacyPolicy.polices.map((f) => ({ ...f, icon: f.icon as IconName }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <AnimatedSection animationType="fadeIn">
        <section className="pt-30 py-20 px-4 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <AnimatedSection animationType="slideUp" delay={200}>
              <div className="flex items-center justify-center mb-6">
                <Shield className="w-16 h-16 mr-4" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  {content.privacyPolicy.title}
                </h1>
              </div>
            </AnimatedSection>
            <AnimatedSection animationType="slideUp" delay={400}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
                {content.privacyPolicy.subTitle}
              </p>
            </AnimatedSection>
            <AnimatedSection animationType="slideUp" delay={600}>
              <p className="text-lg opacity-80">
                {content.privacyPolicy.date}: January 2025
              </p>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Introduction */}
      <AnimatedSection animationType="slideUp">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.privacyPolicy.commitment.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {content.privacyPolicy.commitment.description_1}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {content.privacyPolicy.commitment.description_2}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Privacy Sections */}
      <AnimatedSection animationType="fadeIn">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {policy.map(({ icon, title, content }, index) => {
                const LucideIcon = iconMap[icon];
                return (
                  <AnimatedSection key={index} animationType="slideUp" delay={index * 100}>
                    <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-500">
                      <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <LucideIcon className="w-6 h-6" />
                          </div>
                          {title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <ul className="space-y-4">
                          {content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-gray-700 leading-relaxed">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact for Privacy */}
      <AnimatedSection animationType="slideUp">
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <CardTitle className="text-2xl text-center">{content.privacyPolicy.questions.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <p className="text-lg text-gray-600 mb-6">
                  {content.privacyPolicy.questions.subTitle}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">{content.privacyPolicy.questions["email-1"].title}</h3>
                    <p className="text-green-600 font-semibold">{content.privacyPolicy.questions["email-1"].value}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-2">{content.privacyPolicy.questions["email-2"].title}</h3>
                    <p className="text-green-600 font-semibold">{content.privacyPolicy.questions["email-2"].value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Legal Notice */}
      <AnimatedSection animationType="slideUp">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{content.privacyPolicy.legalCompliance.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.privacyPolicy.legalCompliance.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}