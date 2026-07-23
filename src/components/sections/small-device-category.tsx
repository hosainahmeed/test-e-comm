"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface CategoryItemData {
  id: string | number;
  name: string;
  image: string;
  slug: string;
  productsCount: number;
}

export const CATEGORIES: CategoryItemData[] = [
  {
    id: "cat-1",
    name: "Hookahs",
    image: "https://cdn-icons-png.flaticon.com/512/1704/1704307.png",
    slug: "hookahs",
    productsCount: 24,
  },
  {
    id: "cat-2",
    name: "Shisha",
    image: "https://cdn-icons-png.flaticon.com/512/16163/16163006.png",
    slug: "shisha",
    productsCount: 18,
  },
  {
    id: "cat-3",
    name: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/17606/17606199.png",
    slug: "accessories",
    productsCount: 32,
  },
  {
    id: "cat-4",
    name: "Parts",
    image: "https://cdn-icons-png.flaticon.com/512/4879/4879886.png",
    slug: "parts",
    productsCount: 12,
  },
  {
    id: "cat-5",
    name: "Gifts & More",
    image: "https://cdn-icons-png.flaticon.com/512/9592/9592247.png",
    slug: "gifts-more",
    productsCount: 8,
  },
  {
    id: "cat-6",
    name: "Charcoal",
    image: "https://cdn-icons-png.flaticon.com/512/1704/1704307.png",
    slug: "charcoal",
    productsCount: 15,
  },
  {
    id: "cat-7",
    name: "Bowls",
    image: "https://cdn-icons-png.flaticon.com/512/16163/16163006.png",
    slug: "bowls",
    productsCount: 20,
  },
  {
    id: "cat-8",
    name: "Hoses",
    image: "https://cdn-icons-png.flaticon.com/512/17606/17606199.png",
    slug: "hoses",
    productsCount: 14,
  },
  {
    id: "cat-9",
    name: "Vapes",
    image: "https://cdn-icons-png.flaticon.com/512/4879/4879886.png",
    slug: "vapes",
    productsCount: 28,
  },
  {
    id: "cat-10",
    name: "Clearance",
    image: "https://cdn-icons-png.flaticon.com/512/9592/9592247.png",
    slug: "clearance",
    productsCount: 10,
  },
];

interface CategoryCardProps {
  category: CategoryItemData;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex w-[78px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#F0EDE8] bg-white p-2.5 text-center transition-colors duration-150 hover:border-gray-300 hover:bg-[#FAF8F5] sm:w-auto"
    >
      {/* Minimal Icon Container */}
      <div className="relative mb-1.5 grid h-11 w-11 place-items-center rounded-full bg-[#F6F4F0] sm:h-12 sm:w-12">
        <div className="relative h-6 w-6 sm:h-7 sm:w-7">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="28px"
            className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Category Name & Product Count */}
      <span className="line-clamp-1 w-full text-center text-[11px] font-medium text-gray-800 transition-colors group-hover:text-black sm:text-xs">
        {category.name}
      </span>
      <span className="text-[10px] text-gray-400">
        {category.productsCount} items
      </span>
    </Link>
  );
};

export default function SmallDeviceCategory() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-3">
      {/* Minimal Header */}
      <div className="mb-3 flex items-center justify-between px-0.5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
          Shop by Category
        </h2>
        <Link
          href="/categories"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-500 hover:text-black transition-colors"
        >
          View All
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Responsive layout: Mobile swipe scroll (<640px), 5-col on tablet (640px+), 10-col on desktop (1024px+) */}
      <div className="no-scrollbar -mx-3 flex gap-2.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 md:grid-cols-10">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
