// src/types/product.ts

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  benefit: string;
  tags: string[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  mrp?: number;
  discount?: number;
  premiumPrice?: number;
  
  image?: string;        // main image (already there)
  images?: string[];     // new: gallery images
};
