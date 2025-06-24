"use client";
import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReactSelect from "@/components/ui/react-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users } from "lucide-react";
import ProviderCard from "@/components/provider-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, City, Provider } from "@/shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import { createUrl } from "@/lib/common";

export default function Providers() {
  const router = useRouter();
  const { content, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [offset, setOffset] = useState(0);
  const [providers, setAllProviders] = useState<Provider[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    if (searchQuery === "") setDebouncedSearchQuery("");
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: categories = [] } = useQuery({
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

  const { data, isLoading, isFetching, refetch } = useQuery<{
    data: Provider[];
    total: number
  }>({
    queryKey: ['providers', offset, debouncedSearchQuery, selectedCategory, selectedCity],
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const query = {
        offset,
        category: selectedCategory,
        city: selectedCity,
        search: debouncedSearchQuery,
      }
      const response = await fetch(createUrl('/api/providers', query));
      if (!response.ok) throw new Error('Failed to fetch providers');
      return response.json();
    }
  });

  useEffect(() => {
    if (!data || data?.data?.length === 0) return;
    setAllProviders(prev => [...prev, ...data?.data.filter(provider => !providers.find(p => p.id === provider.id))]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      const refetchData = await refetch();
      if (refetchData?.data?.data) setAllProviders(refetchData?.data?.data);
      setOffset(0);
    }
    if (providers.length === 0 && !isLoading) getData()
  }, [providers, isLoading, refetch]);

  useEffect(() => {
    if (!data) return;
    setHasMore((providers.length < data?.total && Boolean(data?.data?.length)));
  }, [providers, data]);

  useEffect(() => setAllProviders([]), [selectedCategory, selectedCity, debouncedSearchQuery]);
  useEffect(() => setOffset(0), [selectedCategory, selectedCity, debouncedSearchQuery]);

  const handleLoadMore = () => setOffset(providers.length);

  return (
    <div className="bg-gray-50 py-8 pt-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-iraq-green mr-3 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">{content.provider.title}</h1>
          </div>
          <p className="text-lg text-gray-600">
            {content.provider.subTitle}
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.provider.search}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={content.provider.search_placeholder}
                  className="pl-10 py-3 border-2 border-black-500 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value ?? "")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.provider.service_category}
              </label>
              <ReactSelect
                options={categories.map((category: Category) => ({ value: category.id, label: language === "ar" ? category.nameAr : category.name }))}
                selectedOption={selectedCategory}
                onChange={setSelectedCategory}
                placeholder={content.provider.all_services}
                noOptionsMessage={content.common.no_options}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.provider.location}
              </label>
              <ReactSelect
                options={cities.map((city: City) => ({ value: city.id, label: language === "ar" ? city.nameAr : city.name }))}
                selectedOption={selectedCity}
                onChange={setSelectedCity}
                placeholder={content.provider.all_cities}
                noOptionsMessage={content.common.no_options}
              />
            </div>

            <div className="flex items-end justify-center pb-3 font-bold">
              <div className="text-sm text-gray-600">
                <strong>{data?.total}</strong>{" "}{content.provider.provider}{data?.total !== 1 ? 's' : ''}{" "}{content.provider.available}
              </div>
            </div>
          </div>
        </Card>

        {/* Provider Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }, (_, i) => (
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
          ) : providers.length > 0 ? (
            providers.map((provider: Provider) => {
              return (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onClick={() => router.push(`/${language}/providers/${provider.id}`)}
                  onContact={() => {
                    alert(`Contact form for ${provider.name} would open in a real application`);
                  }}
                />
              );
            })
          ) : !isFetching && (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 mb-4">
                <Users className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{content.provider.no_provider_found}</h3>
              <p className="text-gray-600 mb-4">
                {content.provider.no_provider_description}
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {(hasMore && isFetching) && (
            Array.from({ length: 6 }, (_, i) => (
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
          )}
        </div>
        {hasMore && !isFetching && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition cursor-pointer"
            >
              {content.provider.load_more}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}