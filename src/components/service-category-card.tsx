import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Category } from "@/shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";

interface ServiceCategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export default function ServiceCategoryCard({ category, onClick }: ServiceCategoryCardProps) {
  const { language, content } = useLanguage();

  return (
    <Card
      className="group service-card p-6 text-center cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden relative h-full"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
          <Image src={category.image} alt={category.name} width={80} height={80} className="w-20 h-20 duration-300 rounded-2xl object-cover" />
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-gray-800 transition-colors w-full truncate">
          {category[language === 'ar' ? 'nameAr' : 'name']}
        </h3>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-green-700 transition-colors text-xs">
            {category.providerCount}+ {content.popularServices.experts}
          </Badge>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </Card>
  );
}
