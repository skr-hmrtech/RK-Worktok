'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Award, Clock, CheckCircle, Star, Heart, Globe } from "lucide-react";
import AnimatedSection from "@/components/animated-section";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import AboutUsImage from "@/assets/images/AboutUs.jpeg";
import CEOImage from "@/assets/images/CEO.jpeg";
import { useQuery } from "@tanstack/react-query";
import { formatNumberByLocal } from "@/lib/common";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
    const { content } = useLanguage();

    const { data: statsApi, isLoading } = useQuery<{
        verifiedCustomers: number;
        verifiedProviders: number;
        categories: number;
    }>({
        queryKey: ["stats"],
        queryFn: async () => {
            const response = await fetch('/api/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            return response.json();
        }
    });

    const stats = [
        { icon: Users, value: `${formatNumberByLocal(statsApi?.verifiedCustomers ?? 0)}+`, label: content.aboutUs.stats.happy_customers, color: "text-blue-600", bg: "bg-blue-100" },
        { icon: Shield, value: `${formatNumberByLocal(statsApi?.verifiedProviders ?? 0)}+`, label: content.aboutUs.stats.verified_professionals, color: "text-green-600", bg: "bg-green-100" },
        { icon: Award, value: `${formatNumberByLocal(statsApi?.categories ?? 0)}+`, label: content.aboutUs.stats.service_categories, color: "text-purple-600", bg: "bg-purple-100" },
        { icon: Clock, value: "24/7", label: content.aboutUs.stats.customer_support, color: "text-orange-600", bg: "bg-orange-100" }
    ];

    const values = [
        {
            icon: CheckCircle,
            title: content.aboutUs.ourValue.quality.title,
            description: content.aboutUs.ourValue.quality.description,
            color: "text-green-600"
        },
        {
            icon: Star,
            title: content.aboutUs.ourValue.customer_satisfaction.title,
            description: content.aboutUs.ourValue.customer_satisfaction.description,
            color: "text-yellow-600"
        },
        {
            icon: Heart,
            title: content.aboutUs.ourValue.trust.title,
            description: content.aboutUs.ourValue.trust.description,
            color: "text-red-600"
        },
        {
            icon: Globe,
            title: content.aboutUs.ourValue.community.title,
            description: content.aboutUs.ourValue.community.description,
            color: "text-blue-600"
        }
    ];

    const team = [
        {
            name: "Basheer Al kafaf",
            position: "Chief Executive Officer",
            image: CEOImage,
            description: "10+ years in tech leadership"
        },
        {
            name: "Basheer Al kafaf",
            position: "Head of Operations",
            image: CEOImage,
            description: "Expert in service excellence"
        },
        {
            name: "Basheer Al kafaf",
            position: "Technology Director",
            image: CEOImage,
            description: "15+ years in platform development"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Hero Section */}
            <AnimatedSection animationType="fadeIn">
                <section className="pt-30 py-20 px-4 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative max-w-6xl mx-auto text-center">
                        <AnimatedSection animationType="slideUp" delay={200}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                {content.aboutUs.title}
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection animationType="slideUp" delay={400}>
                            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
                                {content.aboutUs.subTitle}
                            </p>
                        </AnimatedSection>
                        <AnimatedSection animationType="scale" delay={600}>
                            <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 text-lg">
                                {content.aboutUs.badge}
                            </Badge>
                        </AnimatedSection>
                    </div>
                </section>
            </AnimatedSection>

            {/* Stats Section */}
            <AnimatedSection animationType="slideUp">
                <section className="py-16 -mt-10 relative z-10">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {
                                isLoading ? (
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <AnimatedSection key={index} animationType="scale" delay={index * 100}>
                                            <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                                                <CardContent className="p-6">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Skeleton className="w-8 h-8 rounded-full" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <Skeleton className="h-6 w-1/2 mx-auto" />
                                                    </div>
                                                    <div>
                                                        <Skeleton className="h-4 w-3/4 mx-auto" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </AnimatedSection>
                                    ))
                                ) : stats.map(({ icon: Icon, value, label, color, bg }, index) => (
                                    <AnimatedSection key={index} animationType="scale" delay={index * 100}>
                                        <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                                            <CardContent className="p-6">
                                                <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                    <Icon className={`w-8 h-8 ${color}`} />
                                                </div>
                                                <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
                                                <div className="text-gray-600 font-medium">{label}</div>
                                            </CardContent>
                                        </Card>
                                    </AnimatedSection>
                                ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Our Story */}
            <AnimatedSection animationType="fadeIn">
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection animationType="slideLeft">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                        {content.aboutUs.ourStory.title}
                                    </h2>
                                    {
                                        content.aboutUs.ourStory.items.map((item, index) => (
                                            <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">{item}</p>
                                        ))
                                    }
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animationType="slideRight" delay={200}>
                                <div className="relative">
                                    <Image
                                        src={AboutUsImage}
                                        alt="Our team"
                                        className="rounded-2xl shadow-2xl"
                                        width={800}
                                        height={600}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl"></div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Our Values */}
            <AnimatedSection animationType="fadeIn">
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection animationType="slideUp">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                    {content.aboutUs.ourValue.title}
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    {content.aboutUs.ourValue.subTitle}
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map(({ icon: Icon, title, description, color }, index) => (
                                <AnimatedSection key={index} animationType="slideUp" delay={index * 150}>
                                    <Card className="text-center h-full hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                                        <CardHeader>
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Icon className={`w-8 h-8 ${color}`} />
                                            </div>
                                            <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 leading-relaxed">{description}</p>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Leadership Team */}
            <AnimatedSection animationType="fadeIn">
                <section className="py-20 px-4 hidden">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection animationType="slideUp">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                    {content.aboutUs.leaderTeam.title}
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    {content.aboutUs.leaderTeam.subTitle}
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <AnimatedSection key={index} animationType="slideUp" delay={index * 200}>
                                    <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                                        <div className="relative">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-64 object-cover"
                                                width={800}
                                                height={600}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                                            <p className="text-green-600 font-semibold mb-3">{member.position}</p>
                                            <p className="text-gray-600">{member.description}</p>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Mission Statement */}
            <AnimatedSection animationType="slideUp">
                <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {content.aboutUs.ourMission.title}
                        </h2>
                        <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                            {content.aboutUs.ourMission.subTitle}
                        </p>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
}