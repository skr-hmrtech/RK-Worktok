"use client";
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, HeadphonesIcon } from "lucide-react";
import AnimatedSection from "@/components/animated-section";
import { useLanguage } from "@/hooks/useLanguage";

export default function Contact() {

    const { content } = useLanguage();

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

    const contactInfo = [
        {
            icon: Phone,
            title: content.contactUs.info.phone.title,
            value: content.contactUs.info.phone.value,
            description: content.contactUs.info.phone.description,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            icon: Mail,
            title: content.contactUs.info.email.title,
            value: content.contactUs.info.email.value,
            description: content.contactUs.info.email.description,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            icon: MapPin,
            title: content.contactUs.info.address.title,
            value: content.contactUs.info.address.value,
            description: content.contactUs.info.address.description,
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            icon: Clock,
            title: content.contactUs.info.workingHours.title,
            value: content.contactUs.info.workingHours.value,
            description: content.contactUs.info.workingHours.description,
            color: "text-orange-600",
            bg: "bg-orange-100"
        }
    ];

    const handleMapClick = () => {
        window.open(
            'https://www.google.com/maps/place/Baghdad,+Baghdad+Governorate,+Iraq/@33.3134517,44.2907462,12.3z/data=!4m6!3m5!1s0x15577f67a0a74193:0x9deda9d2a3b16f2c!8m2!3d33.315241!4d44.3660671!16zL20vMDFmcW0?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D',
            '_blank'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Hero Section */}
            <AnimatedSection animationType="fadeIn">
                <section className="pt-30 py-20 px-4 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative max-w-6xl mx-auto text-center">
                        <AnimatedSection animationType="slideUp" delay={200}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                {content.contactUs.title}
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection animationType="slideUp" delay={400}>
                            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
                                {content.contactUs.subTitle}
                            </p>
                        </AnimatedSection>
                    </div>
                </section>
            </AnimatedSection>

            {/* Contact Info Cards */}
            <AnimatedSection animationType="slideUp">
                <section className="py-16 -mt-10 relative z-10">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactInfo.map(({ icon: Icon, title, value, description, color, bg }, index) => (
                                <AnimatedSection key={index} animationType="scale" delay={index * 100}>
                                    <Card className="text-center hover:shadow-xl transition-all duration-500 border-0 shadow-lg h-full">
                                        <CardContent className="p-6">
                                            <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                <Icon className={`w-8 h-8 ${color}`} />
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                                            <p className={`font-semibold ${color} mb-2`}>{value}</p>
                                            <p className="text-sm text-gray-600">{description}</p>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Contact Form & Map */}
            <AnimatedSection animationType="fadeIn">
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <AnimatedSection animationType="slideLeft">
                                <Card className="shadow-2xl border-0">
                                    <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg">
                                        <CardTitle className="flex items-center gap-3 text-2xl">
                                            <MessageCircle className="w-6 h-6" />
                                            {content.contactUs.form.sendMessage}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {content.contactUs.form.fullName} *
                                                    </label>
                                                    <Input
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="py-3 border-2 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-green-300 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                                        placeholder={content.contactUs.form.namePlaceholder}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {content.contactUs.form.email} *
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="py-3 border-2 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-green-300 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                                        placeholder={content.contactUs.form.emailPlaceholder}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {content.contactUs.form.mobile} *
                                                    </label>
                                                    <Input
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="py-3 border-2 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-green-300 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                                        placeholder={content.contactUs.form.mobilePlaceholder}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {content.contactUs.form.subject} *
                                                    </label>
                                                    <Input
                                                        required
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                        className="py-3 border-2 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-green-300 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                                        placeholder={content.contactUs.form.subjectPlaceholder}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    {content.contactUs.form.message} *
                                                </label>
                                                <Textarea
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="py-3 border-2 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-green-300 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                                    placeholder={content.contactUs.form.messagePlaceholder}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                            >
                                                {content.contactUs.form.submit}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            {/* Map & Additional Info */}
                            <AnimatedSection animationType="slideRight" delay={200}>
                                <div className="space-y-8">
                                    <Card className="shadow-2xl border-0 overflow-hidden group relative cursor-pointer">
                                        {/* Embedded Google Map */}
                                        <div className="h-64 relative group-hover:opacity-100" onClick={handleMapClick}>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86502.49995894845!2d44.290746240267225!3d33.31345172983364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2sBaghdad%2C%20Baghdad%20Governorate%2C%20Iraq!5e0!3m2!1sen!2sin!4v1749886228515!5m2!1sen!2sin"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="absolute inset-0 z-0"
                                            ></iframe>

                                            {/* Overlay content (optional) */}
                                            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                                <div className="text-center">
                                                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{content.contactUs.map.title}</h3>
                                                    <p className="text-gray-600">{content.contactUs.map.address}</p>
                                                    <p className="text-gray-600">{content.contactUs.map.subAddress}</p>
                                                    <p className="mt-2 text-green-700 font-semibold">{content.contactUs.map.clickOn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Quick Support */}
                                    <Card className="shadow-2xl border-0">
                                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                                            <CardTitle className="flex items-center gap-3">
                                                <HeadphonesIcon className="w-6 h-6" />
                                                {content.contactUs.quickSupport.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <p className="text-gray-600 mb-6">
                                                {content.contactUs.quickSupport.subTitle}
                                            </p>
                                            <div className="space-y-3">
                                                <Button
                                                    className="w-full bg-green-600 font-bold cursor-pointer hover:bg-green-700 text-white"
                                                    onClick={() => window.open('tel:+9647856075950')}
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {content.contactUs.quickSupport.phone}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            {/* Response Time */}
            <AnimatedSection animationType="slideUp">
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            {content.contactUs.responseType.title}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{content.contactUs.responseType.chat.title}</h3>
                                <p className="text-gray-600">{content.contactUs.responseType.chat.description}</p>
                            </div>
                            <div className="p-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{content.contactUs.responseType.mail.title}</h3>
                                <p className="text-gray-600">{content.contactUs.responseType.mail.description}</p>
                            </div>
                            <div className="p-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{content.contactUs.responseType.phone.title}</h3>
                                <p className="text-gray-600">{content.contactUs.responseType.phone.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
}