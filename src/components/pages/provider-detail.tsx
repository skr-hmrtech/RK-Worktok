"use client";

import moment from "moment";
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Phone, Mail, Calendar, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "@/shared/schema";
import { useParams } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import UserProfile from "@/assets/images/UserProfile.png";

export default function ProviderDetail() {
  const params: { id: string } = useParams();
  const providerId = parseInt((params ?? { id: "0" }).id ?? "0");
  const { content, language } = useLanguage();

  const [imageSrc, setImageSrc] = useState<string | typeof UserProfile>(UserProfile);

  const { data: provider, isLoading: providerLoading } = useQuery<Provider>({
    queryKey: ['provider', providerId],
    queryFn: async () => {
      const response = await fetch(`/api/providers/${providerId}`);
      if (!response.ok) throw new Error('Failed to fetch provider');
      return response.json();
    },
    enabled: !!providerId,
  });

  useEffect(() => {
    if (!provider || !provider.avatar) return;

    const img = new window.Image();
    img.src = provider.avatar;

    img.onload = () => setImageSrc(provider.avatar)
    img.onerror = () => setImageSrc(UserProfile)
  }, [provider]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (providerLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <Skeleton className="h-10 w-40 mb-6" />
            <Card className="p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">

                {/* Image Skeleton */}
                <div className="flex-shrink-0 rounded-full ring-4 overflow-hidden">
                  <Skeleton className="w-32 h-32 rounded-full" />
                </div>

                {/* Right content */}
                <div className="flex-1">

                  {/* Header section */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-75" /> {/* Name */}
                      <Skeleton className="h-6 w-40" /> {/* Profession */}
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-25" /> {/* Stars */}
                        <Skeleton className="h-6 w-12" /> {/* Rating */}
                        <Skeleton className="h-6 w-16" /> {/* Reviews */}
                      </div>
                    </div>
                    <Skeleton className="h-7 w-30 rounded-md" /> {/* Verified badge */}
                  </div>

                  {/* Bio */}
                  <Skeleton className="h-25 w-full mb-6" />

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-48" />
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20 rounded-md" />
                      <Skeleton className="h-6 w-25 rounded-md" />
                      <Skeleton className="h-6 w-20 rounded-md" />
                      <Skeleton className="h-6 w-25 rounded-md" />
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </div>
                  </div>

                  {/* Contact Button */}
                  <Skeleton className="h-10 w-40 rounded-md" />
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-8 mt-10">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="border-b py-4">
                  <Skeleton className="h-5 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-[70vh] bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{content.providerDetails.notFound}</h1>
          <p className="text-gray-600 mb-6">{content.providerDetails.notFound_description}</p>
          <Link href={`/${language}/providers`}>
            <Button className="text-white bg-green-500 font-bold cursor-pointer hover:bg-green-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {content.providerDetails.back_provider}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/${language}/providers`}>
          <Button variant="ghost" className="text-white bg-green-500 font-bold cursor-pointer mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {content.providerDetails.back_provider}
          </Button>
        </Link>

        {/* Provider Profile */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0 rounded-full ring-4 ring-green-300 overflow-hidden">
              <Image
                src={imageSrc}
                alt={provider.name}
                className="w-32 h-32 object-cover"
                width={128}
                height={128}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                  <p className="text-xl text-green-500 font-semibold mb-2">{provider[language === 'en' ? 'profession' : 'professionAr']}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(provider.rating)}
                    </div>
                    <span className="ml-2 text-lg font-medium text-gray-900">
                      {provider.rating}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({provider.reviewCount} {content.providerDetails.reviews})
                    </span>
                  </div>
                </div>

                <Badge className="text-blue-500 bg-blue-100 border-2 border-blue-500 text-sm">
                  <Award className="w-4 h-4 mr-1" />
                  {content.providerDetails.verified}
                </Badge>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {provider[language === 'en' ? 'bio' : 'bioAr']}
              </p>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-iraq-green" />
                  {provider?.zone?.name || "Baghdad"}, Iraq
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-iraq-green" />
                  {provider.yearsExperience ?? 5}+ {content.providerDetails.experience}
                </div>
                {provider.phone &&
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2 text-iraq-green" />
                    {provider.phone}
                  </div>
                }
                {provider.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2 text-iraq-green" />
                    {provider.email}
                  </div>
                )}
              </div>

              {/* Specialties */}
              {provider.specialties && provider.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{content.providerDetails.specialties}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider[language === 'en' ? 'specialties' : 'specialtiesAr'].map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer"
                onClick={() => {
                  alert(`Contact form for ${provider.name} would open in a real application`);
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                {content.providerDetails.contact}
              </Button>
            </div>
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.providerDetails.customer_reviews}</h2>

          {provider?.reviews && provider?.reviews?.length > 0 ? (
            <div className="space-y-6">
              {provider.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                      <div className="flex items-center mt-1 gap-3">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{moment(review.date).format('MM/DD/YYYY')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{Boolean(review.comment) ? review.comment : "No comment"}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">{content.providerDetails.no_reviews}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}