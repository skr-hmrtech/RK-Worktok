export type Category = {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  image: string;
  providerCount: number;
};

export type City = {
  id: number;
  name: string;
  nameAr: string;
};

export type Provider = {
  id: number;
  name: string;
  avatar: string;
  profession: string;
  professionAr: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  bio: string;
  bioAr: string;
  yearsExperience: number;
  phone: string;
  email?: string;
  zone?: {
    id: number;
    name: string;
  };
  specialties: string[];
  specialtiesAr: string[];
  reviews?: Review[];
};

export type FormData = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceType: string;
  cityId: number;
  description: string;
};

export type Review = {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
};
