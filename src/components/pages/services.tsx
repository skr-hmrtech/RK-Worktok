"use client";
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import ReactSelect from "@/components/ui/react-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, ArrowRight, Grid, List } from "lucide-react";
import ProviderCard from "@/components/provider-card";
import ServiceCategoryCard from "@/components/service-category-card";
import AnimatedSection from "@/components/animated-section";
import { useLanguage } from "@/hooks/useLanguage";
import { Category, City, Provider } from "@/shared/schema";
import { useRouter } from "next/navigation";
import { createUrl } from "@/lib/common";

export default function Services() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showCategories, setShowCategories] = useState(true);

    const [offset, setOffset] = useState(0);
    const [providers, setAllProviders] = useState<Provider[]>([]);
    const [hasMore, setHasMore] = useState(false);

    const { content, language } = useLanguage();

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
        if (searchQuery === "") setDebouncedSearchQuery("");
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Get URL parameters
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window?.location?.search ?? "");
            const search = urlParams.get("search");
            const category = urlParams.get("category");
            const city = urlParams.get("city");

            if (search) setSearchQuery(search);
            if (category && parseInt(category)) {
                setSelectedCategory(parseInt(category));
                setShowCategories(false);
            }
            if (city && parseInt(city)) setSelectedCity(parseInt(city));
        }
    }, []);

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

    const handleSearch = () => {
        setShowCategories(false);
    };

    const handleCategorySelect = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        setShowCategories(false);
    };

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mobile-padding">

                {/* Header */}
                <AnimatedSection animationType="slideUp">
                    <div className="text-center mb-12">
                        <h1 className="responsive-text-4xl font-bold mb-4 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] bg-clip-text text-transparent mobile-text-center">
                            {showCategories ? content.services.title_1 : content.services.title_2}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {showCategories
                                ? content.services.subtitle_1
                                : content.services.subtitle_2
                            }
                        </p>
                    </div>
                </AnimatedSection>

                {/* Search and Filters */}
                <AnimatedSection animationType="slideUp" delay={200}>
                    <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-lg">
                        <CardHeader className="bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Filter className="w-5 h-5" />
                                </div>
                                {content.services.search_and_filter}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <Input
                                        placeholder={content.services.search_placeholder}
                                        className="pl-10 py-3 border-2 border-black-500 cursor-pointer bg-white text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:border-green-500 transition-colors"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <ReactSelect
                                    options={categories.map((category: Category) => ({ value: category.id, label: language === "ar" ? category.nameAr : category.name }))}
                                    selectedOption={selectedCategory}
                                    onChange={handleCategorySelect}
                                    placeholder={content.services.all_categories}
                                    noOptionsMessage={content.common.no_options}
                                />

                                <ReactSelect
                                    options={cities.map((city: City) => ({ value: city.id, label: language === "ar" ? city.nameAr : city.name }))}
                                    selectedOption={selectedCity}
                                    onChange={setSelectedCity}
                                    placeholder={content.services.all_cities}
                                    noOptionsMessage={content.common.no_options}
                                />

                                <Button
                                    onClick={handleSearch}
                                    className="py-3 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-300 mobile-full-width"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    {content.services.search_button}
                                </Button>
                            </div>

                            {!showCategories && (
                                <div className="mt-4 flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowCategories(true);
                                            setSelectedCategory(null);
                                            setSearchQuery("");
                                        }}
                                        className="bg-white cursor-pointer text-green-600 border-green-600 hover:bg-blue-50"
                                    >
                                        {content.services.browse_categories}
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-900">{content.services.view}:</span>
                                        <Button
                                            variant={viewMode !== 'grid' ? 'default' : 'outline'}
                                            size="sm"
                                            className={`${viewMode !== 'grid' ? 'text-gray-900' : 'bg-green-700 text-white'} border-2 border-green-700 cursor-pointer`}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={viewMode !== 'list' ? 'default' : 'outline'}
                                            size="sm"
                                            className={`${viewMode !== 'list' ? 'text-gray-900' : 'bg-green-700 text-white'} border-2 border-green-700 cursor-pointer`}
                                            onClick={() => setViewMode('list')}
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </AnimatedSection>

                {/* Service Categories */}
                {showCategories && (
                    <AnimatedSection animationType="fadeIn" delay={400}>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.services.main_title}</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {
                                categoryLoading ? (
                                    Array.from({ length: 10 }).map((_, index) => (
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
                                ) : categories.map((category: Category, index: number) => (
                                    <AnimatedSection key={category.id} animationType="slideUp" delay={index * 50}>
                                        <div className="group hover:scale-105 transition-all duration-300">
                                            <ServiceCategoryCard
                                                category={category}
                                                onClick={() => handleCategorySelect(category.id)}
                                            />
                                        </div>
                                    </AnimatedSection>
                                ))}
                        </div>
                    </AnimatedSection>
                )}

                {/* Service Providers */}
                {!showCategories && (
                    <AnimatedSection animationType="fadeIn" delay={600}>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {data?.total}{" "}{content.services.provider}{data?.total !== 1 ? 's' : ''}{" "}{content.services.found}
                                </h2>
                                {selectedCategory && (
                                    <p className="text-gray-600 mt-1">
                                        {content.services.in} {categories.find((c: Category) => c.id === selectedCategory)?.[language === 'ar' ? 'nameAr' : 'name']}
                                    </p>
                                )}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                {Array.from({ length: 6 }).map((_, i) => (
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
                                ))}
                            </div>
                        ) : providers.length > 0 ? (
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                {providers.map((provider: Provider, index: number) => {
                                    return (
                                        <AnimatedSection key={provider.id} animationType="slideUp" delay={index * 100}>
                                            <div className="group hover:scale-105 transition-all duration-300">
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
                        ) : !isFetching && (
                            <AnimatedSection animationType="fadeIn">
                                <div className="text-center py-20">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.services.no_provider_found}</h3>
                                        <p className="text-gray-600 text-lg mb-8">
                                            {content.services.no_provider_description}
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedCity(null);
                                                setSelectedCategory(null);
                                                setShowCategories(true);
                                            }}
                                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-700 hover:to-green-700 cursor-pointer"
                                        >
                                            {content.services.browse_categories}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </AnimatedSection>
                        )}
                    </AnimatedSection>
                )}

                {/* Load More */}
                {
                    !showCategories && (
                        <>
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} mt-6`}>
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
                        </>
                    )
                }

                {/* Call to Action */}
                {!showCategories && providers.length > 0 && (
                    <AnimatedSection animationType="slideUp" delay={800}>
                        <div className="mt-16 text-center">
                            <Card className="bg-gradient-to-r from-[#4caf50] via-[#008a85] to-[#2e7d32] text-white border-0 shadow-2xl">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold mb-4">{content.services.callAction.title}</h3>
                                    <p className="text-lg mb-6 opacity-90">
                                        {content.services.callAction.description}
                                    </p>
                                    <Button size="lg" className="bg-white text-gray-900 cursor-pointer font-bold hover:bg-gray-100 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                        {content.services.callAction.action}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
}