import type { Product } from "../types/product";

// Single pack main images (cards)
import ragiDelight from "@/assets/products/ragi-delight.png";
import jowarClassic from "@/assets/products/jowar-classic.png";
import bajraPower from "@/assets/products/bajra-power.png";
import multiMilletHarmony from "@/assets/products/multi-millet-harmony.png";
import foxtailBalance from "@/assets/products/foxtail-balance.png";
import littleMilletJoy from "@/assets/products/little-millet-joy.png";

// Single pack extra gallery images
import ragi1 from "@/assets/products/ragi-1.png";
import ragi2 from "@/assets/products/ragi-2.png";
import ragi3 from "@/assets/products/ragi-3.png";
import ragi4 from "@/assets/products/ragi-4.png";

import jowar1 from "@/assets/products/jowar-1.png";
import jowar2 from "@/assets/products/jowar-2.png";
import jowar3 from "@/assets/products/jowar-3.png";
import jowar4 from "@/assets/products/jowar-4.png";

import bajra1 from "@/assets/products/bajra-1.png";
import bajra2 from "@/assets/products/bajra-2.png";
import bajra3 from "@/assets/products/bajra-3.png";
import bajra4 from "@/assets/products/bajra-4.png";

import multi1 from "@/assets/products/multi-1.png";
import multi2 from "@/assets/products/multi-2.png";
import multi3 from "@/assets/products/multi-3.png";
import multi4 from "@/assets/products/multi-4.png";

import foxtail1 from "@/assets/products/foxtail-1.png";
import foxtail2 from "@/assets/products/foxtail-2.png";
import foxtail3 from "@/assets/products/foxtail-3.png";
import foxtail4 from "@/assets/products/foxtail-4.png";

import little1 from "@/assets/products/little-1.png";
import little2 from "@/assets/products/little-2.png";
import little3 from "@/assets/products/little-3.png";
import little4 from "@/assets/products/little-4.png";

// Combo pack main images
import kidsStrengthComboImg from "@/assets/combos/kids-strength.png";
import digestiveCareComboImg from "@/assets/combos/digestive-care.png";
import familyValueComboImg from "@/assets/combos/family-value.png";
import sugarBalanceComboImg from "@/assets/combos/sugar-balance.png";
import heartEnergyComboImg from "@/assets/combos/heart-energy.png";

// Combo gallery images (create these files as needed)
import kidsStrength1 from "@/assets/combos/kids-strength-1.png";
import kidsStrength2 from "@/assets/combos/kids-strength-2.png";
import kidsStrength3 from "@/assets/combos/kids-strength-3.png";
import kidsStrength4 from "@/assets/combos/kids-strength-4.png";

import digestive1 from "@/assets/combos/digestive-1.png";
import digestive2 from "@/assets/combos/digestive-2.png";
import digestive3 from "@/assets/combos/digestive-3.png";
import digestive4 from "@/assets/combos/digestive-4.png";

import family1 from "@/assets/combos/family-1.png";
import family2 from "@/assets/combos/family-2.png";
import family3 from "@/assets/combos/family-3.png";
import family4 from "@/assets/combos/family-4.png";

import sugar1 from "@/assets/combos/sugar-1.png";
import sugar2 from "@/assets/combos/sugar-2.png";
import sugar3 from "@/assets/combos/sugar-3.png";
import sugar4 from "@/assets/combos/sugar-4.png";

import heart1 from "@/assets/combos/heart-1.png";
import heart2 from "@/assets/combos/heart-2.png";
import heart3 from "@/assets/combos/heart-3.png";
import heart4 from "@/assets/combos/heart-4.png";

// ---------- Single products ----------

export const products: Product[] = [
  {
    id: 1,
    name: "Bone",
    subtitle: "Finger Millet Cookies",
    price: 249,
    rating: 4.9,
    reviews: 128,
    benefit: "Iron & Calcium Rich",
    description:
      "Perfect for growing children and adults seeking bone health support.",
    tags: ["Kids Favorite", "High Calcium"],
    ingredients: [
      "Organic Ragi (Finger Millet) Flour",
      "Jaggery",
      "Desi Ghee",
      "Almonds",
      "Cardamom",
      "Rock Salt",
    ],
    nutrition: [
      { label: "Calories", value: "120 kcal" },
      { label: "Protein", value: "3g" },
      { label: "Fibre", value: "4g" },
      { label: "Iron", value: "15% DV" },
      { label: "Calcium", value: "20% DV" },
    ],
    mrp: 299,
    discount: 17,
    premiumPrice: 239,
    image: ragiDelight,
    images: [ragi1, ragi2, ragi3, ragi4],
  },
  {
    id: 2,
    name: "Heart",
    subtitle: "Sorghum Millet Cookies",
    price: 229,
    rating: 4.8,
    reviews: 96,
    benefit: "Heart Friendly",
    description:
      "Low GI, high fibre cookies ideal for maintaining steady energy levels.",
    tags: ["Low GI", "High Fibre"],
    ingredients: [
      "Organic Jowar (Sorghum) Flour",
      "Coconut Sugar",
      "Cold-Pressed Coconut Oil",
      "Cashews",
      "Cinnamon",
      "Pink Salt",
    ],
    nutrition: [
      { label: "Calories", value: "115 kcal" },
      { label: "Protein", value: "2.5g" },
      { label: "Fibre", value: "5g" },
      { label: "Carbs", value: "18g" },
      { label: "Sugar", value: "6g" },
    ],
    mrp: 279,
    discount: 18,
    premiumPrice: 219,
    image: jowarClassic,
    images: [jowar1, jowar2, jowar3, jowar4],
  },
  {
    id: 3,
    name: "Gut",
    subtitle: "Pearl Millet Cookies",
    price: 259,
    rating: 4.7,
    reviews: 84,
    benefit: "Gut Health",
    description:
      "Traditional bajra goodness for digestive balance and sustained energy.",
    tags: ["Digestive Health", "Energy Boost"],
    ingredients: [
      "Organic Bajra (Pearl Millet) Flour",
      "Date Syrup",
      "Desi Ghee",
      "Walnuts",
      "Fennel Seeds",
      "Black Salt",
    ],
    nutrition: [
      { label: "Calories", value: "125 kcal" },
      { label: "Protein", value: "3.5g" },
      { label: "Fibre", value: "6g" },
      { label: "Iron", value: "12% DV" },
      { label: "Magnesium", value: "18% DV" },
    ],
    mrp: 309,
    discount: 16,
    premiumPrice: 245,
    image: bajraPower,
    images: [bajra1, bajra2, bajra3, bajra4],
  },
  {
    id: 4,
    name: "Heart",
    subtitle: "5-Grain Blend Cookies",
    price: 299,
    rating: 4.9,
    reviews: 156,
    benefit: "Complete Nutrition",
    description:
      "A harmonious blend of five ancient millets for comprehensive daily nutrition.",
    tags: ["Bestseller", "All Ages"],
    ingredients: [
      "Ragi, Jowar, Bajra, Foxtail, Little Millet Flour Blend",
      "Jaggery",
      "Desi Ghee",
      "Mixed Dry Fruits",
      "Vanilla",
      "Rock Salt",
    ],
    nutrition: [
      { label: "Calories", value: "130 kcal" },
      { label: "Protein", value: "4g" },
      { label: "Fibre", value: "5.5g" },
      { label: "Iron", value: "18% DV" },
      { label: "B Vitamins", value: "20% DV" },
    ],
    mrp: 349,
    discount: 14,
    premiumPrice: 279,
    image: multiMilletHarmony,
    images: [multi1, multi2, multi3, multi4],
  },
  {
    id: 5,
    name: "Pocs",
    subtitle: "Kangni Millet Cookies",
    price: 269,
    rating: 4.8,
    reviews: 72,
    benefit: "Blood Sugar Support",
    description:
      "Specifically crafted to support balanced blood sugar levels naturally.",
    tags: ["Diabetic Friendly", "Low Sugar"],
    ingredients: [
      "Organic Foxtail Millet Flour",
      "Stevia & Dates",
      "Cold-Pressed Sesame Oil",
      "Pistachios",
      "Turmeric",
      "Himalayan Salt",
    ],
    nutrition: [
      { label: "Calories", value: "105 kcal" },
      { label: "Protein", value: "3g" },
      { label: "Fibre", value: "4.5g" },
      { label: "Sugar", value: "3g" },
      { label: "GI Index", value: "Low" },
    ],
    mrp: 319,
    discount: 16,
    premiumPrice: 259,
    image: foxtailBalance,
    images: [foxtail1, foxtail2, foxtail3, foxtail4],
  },
  {
    id: 6,
    name: "Little Millet Joy",
    subtitle: "Kutki Millet Cookies",
    price: 239,
    rating: 4.6,
    reviews: 64,
    benefit: "Weight Management",
    description:
      "Light yet satisfying cookies perfect for mindful eating.",
    tags: ["Light", "Satisfying"],
    ingredients: [
      "Organic Little Millet Flour",
      "Monk Fruit Sweetener",
      "Desi Ghee",
      "Pumpkin Seeds",
      "Ginger",
      "Sea Salt",
    ],
    nutrition: [
      { label: "Calories", value: "95 kcal" },
      { label: "Protein", value: "2.5g" },
      { label: "Fibre", value: "5g" },
      { label: "Fat", value: "4g" },
      { label: "Carbs", value: "14g" },
    ],
    mrp: 289,
    discount: 17,
    premiumPrice: 229,
    image: littleMilletJoy,
    images: [little1, little2, little3, little4],
  },
];

// ---------- Combo products ----------

export const comboPacks: Product[] = [
  {
    ...products[1],
    id: 101,
    name: "Kids Strength Combo",
    subtitle: "Ragi Delight + Jowar Classic",
    price: 449,
    mrp: 528,
    discount: 15,
    premiumPrice: 429,
    image: kidsStrengthComboImg,
    images: [kidsStrength1, kidsStrength2, kidsStrength3, kidsStrength4],
  },
  {
    ...products[2],
    id: 102,
    name: "Digestive Care Combo",
    subtitle: "Bajra Power + Little Millet Joy",
    price: 479,
    mrp: 498,
    discount: 4,
    premiumPrice: 459,
    image: digestiveCareComboImg,
    images: [digestive1, digestive2, digestive3, digestive4],
  },
  {
    ...products[3],
    id: 103,
    name: "Family Value Pack",
    subtitle: "Multi‑Millet Harmony x 2",
    price: 569,
    mrp: 598,
    discount: 5,
    premiumPrice: 549,
    image: familyValueComboImg,
    images: [family1, family2, family3, family4],
  },
  {
    ...products[4],
    id: 104,
    name: "Sugar Balance Combo",
    subtitle: "Foxtail Balance x 2",
    price: 509,
    mrp: 538,
    discount: 5,
    premiumPrice: 489,
    image: sugarBalanceComboImg,
    images: [sugar1, sugar2, sugar3, sugar4],
  },
  {
    ...products[5],
    id: 105,
    name: "Heart & Energy Combo",
    subtitle: "Jowar Classic + Bajra Power",
    price: 469,
    mrp: 488,
    discount: 4,
    premiumPrice: 449,
    image: heartEnergyComboImg,
    images: [heart1, heart2, heart3, heart4],
  },
];


export const allProducts: Product[] = [...products, ...comboPacks];
