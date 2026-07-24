"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export interface CategoryItemData {
  id?: string | number;
  name?: string;
  label?: string;
  image?: string;
  icon?: string;
  slug: string;
  url?: string;
  productsCount?: number;
  productCount?: number;
  count?: number;
}

export const DEFAULT_CATEGORIES: CategoryItemData[] = [
  {
    id: "cat-1",
    name: "Hookahs",
    slug: "hookahs",
    icon: "🪈",
    productsCount: 24,
  },
  {
    id: "cat-2",
    name: "Shisha",
    slug: "shisha",
    icon: "🍃",
    productsCount: 18,
  },
  {
    id: "cat-3",
    name: "Accessories",
    slug: "accessories",
    icon: "🔧",
    productsCount: 32,
  },
  {
    id: "cat-4",
    name: "Parts",
    slug: "parts",
    icon: "⚙️",
    productsCount: 12,
  },
  {
    id: "cat-5",
    name: "Gifts & More",
    slug: "gifts-more",
    icon: "🎁",
    productsCount: 8,
  },
  {
    id: "cat-6",
    name: "Charcoal",
    slug: "charcoal",
    icon: "🪵",
    productsCount: 15,
  },
  {
    id: "cat-7",
    name: "Bowls",
    slug: "bowls",
    icon: "🥣",
    productsCount: 20,
  },
  {
    id: "cat-8",
    name: "Hoses",
    slug: "hoses",
    icon: "🧵",
    productsCount: 14,
  },
  {
    id: "cat-9",
    name: "Vapes",
    slug: "vapes",
    icon: "💨",
    productsCount: 28,
  },
  {
    id: "cat-10",
    name: "Clearance",
    slug: "clearance",
    icon: "🏷️",
    productsCount: 10,
  },
];

// Helper to get emoji icon for any category slug
export function getCategoryEmoji(slug: string): string {
  const iconMap: Record<string, string> = {
    hookahs: "🪈",
    shisha: "🍃",
    accessories: "🔧",
    parts: "⚙️",
    "gifts-more": "🎁",
    gifts: "🎁",
    charcoal: "🪵",
    bowls: "🥣",
    hoses: "🧵",
    vapes: "💨",
    clearance: "🏷️",
    beauty: "💄",
    fragrances: "🌸",
    furniture: "🪑",
    groceries: "🛒",
    "home-decoration": "🏠",
    "kitchen-accessories": "🍳",
    laptops: "💻",
    "mens-shirts": "👔",
    "mens-shoes": "👞",
    "mens-watches": "⌚",
    "mobile-accessories": "📱",
    motorcycle: "🏍️",
    "skin-care": "🧴",
    smartphones: "📱",
    "sports-accessories": "⚽",
    sunglasses: "🕶️",
    tablets: "📱",
    tops: "👚",
    vehicle: "🚗",
    "womens-bags": "👜",
    "womens-dresses": "👗",
    "womens-jewellery": "💍",
    "womens-shoes": "👠",
    "womens-watches": "⌚",
  };

  return iconMap[slug.toLowerCase()] || "📦";
}

// Background gradient map based on category index or slug
const CATEGORY_GRADIENTS = [
  "from-purple-500/10 to-indigo-500/5 text-purple-600 border-purple-200/50",
  "from-emerald-500/10 to-teal-500/5 text-emerald-600 border-emerald-200/50",
  "from-amber-500/10 to-orange-500/5 text-amber-600 border-amber-200/50",
  "from-blue-500/10 to-cyan-500/5 text-blue-600 border-blue-200/50",
  "from-rose-500/10 to-pink-500/5 text-rose-600 border-rose-200/50",
  "from-violet-500/10 to-purple-500/5 text-violet-600 border-violet-200/50",
  "from-fuchsia-500/10 to-pink-500/5 text-fuchsia-600 border-fuchsia-200/50",
  "from-sky-500/10 to-indigo-500/5 text-sky-600 border-sky-200/50",
  "from-orange-500/10 to-red-500/5 text-orange-600 border-orange-200/50",
  "from-teal-500/10 to-emerald-500/5 text-teal-600 border-teal-200/50",
];

interface CategoryCardProps {
  category: CategoryItemData;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const slug = category.slug || "";
  const name = category.name || category.label || slug.replace(/-/g, " ");
  const count =
    category.productsCount ?? category.productCount ?? category.count;
  const href = category.url || `/categories/${slug}`;
  const emoji = category.icon || getCategoryEmoji(slug);
  const colorStyle = CATEGORY_GRADIENTS[index % CATEGORY_GRADIENTS.length];

  return (
    <Link
      href={href}
      className="group relative flex w-[88px] shrink-0 flex-col items-center justify-between rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 text-center transition-all duration-300 hover:border-[#A937E2]/40 sm:w-auto"
    >
      {/* Icon Wrapper with Gradient Ring & Soft Shadow */}
      <div
        className={`relative mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${colorStyle} border shadow-xs transition-colors duration-300 sm:h-14 sm:w-14`}
      >
        {category.image ? (
          <div className="relative h-7 w-7 sm:h-8 sm:w-8">
            <Image
              src={category.image}
              alt={name}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
        ) : (
          <span className="text-2xl sm:text-3xl select-none">{emoji}</span>
        )}
      </div>

      {/* Title & Count */}
      <div className="w-full">
        <span className="line-clamp-1 w-full text-[11px] font-semibold text-gray-800 transition-colors group-hover:text-[#A937E2] sm:text-xs">
          {name}
        </span>
      </div>
    </Link>
  );
};

interface SmallDeviceCategoryProps {
  categories?: CategoryItemData[];
  title?: string;
  viewAllHref?: string;
}

export default function SmallDeviceCategory({
  categories,
  title = "Shop by Category",
  viewAllHref = "/categories",
}: SmallDeviceCategoryProps) {
  const categoryList =
    categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <section className="mx-auto w-full max-w-7xl px-2 sm:px-4 py-2 sm:py-4">
      {/* Section Header with Divan Dion Theme */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-[#A937E2]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl truncate">
            {title}
          </h2>
        </div>

        <Link
          href={viewAllHref}
          className="text-primary cursor-pointer text-xs sm:text-sm flex items-center font-medium border border-border px-2.5 py-1 hover:border-[#A937E2] bg-gray-100 hover:bg-gray-200 rounded-sm shrink-0 transition-colors"
        >
          View All
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
        </Link>
      </div>

      {/* Grid / Horizontal Scroll Bar */}
      <div className="no-scrollbar -mx-2 flex gap-2.5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3.5 sm:overflow-visible sm:px-0 md:grid-cols-8 lg:grid-cols-10">
        {categoryList.map((cat, idx) => (
          <CategoryCard
            key={cat.slug || cat.id || idx}
            category={cat}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
