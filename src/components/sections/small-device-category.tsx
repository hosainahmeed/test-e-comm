"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Mock data - replace with actual API data later
const CATEGORIES = [
  {
    _id: 1,
    name: "Hookahs",
    image: "https://cdn-icons-png.flaticon.com/512/1704/1704307.png",
    slug: "hookahs",
    productsCount: 24,
  },
  {
    _id: 2,
    name: "Shisha",
    image: "https://cdn-icons-png.flaticon.com/512/16163/16163006.png",
    slug: "shisha",
    productsCount: 18,
  },
  {
    _id: 3,
    name: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/17606/17606199.png",
    slug: "accessories",
    productsCount: 32,
  },
  {
    _id: 4,
    name: "Parts",
    image: "https://cdn-icons-png.flaticon.com/512/4879/4879886.png",
    slug: "parts",
    productsCount: 12,
  },
  {
    _id: 5,
    name: "Gifts & More",
    image: "https://cdn-icons-png.flaticon.com/512/9592/9592247.png",
    slug: "gifts-more",
    productsCount: 8,
  },
  {
    _id: 123,
    name: "Hookahs",
    image: "https://cdn-icons-png.flaticon.com/512/1704/1704307.png",
    slug: "hookahs",
    productsCount: 24,
  },
  {
    _id: 1232,
    name: "Shisha",
    image: "https://cdn-icons-png.flaticon.com/512/16163/16163006.png",
    slug: "shisha",
    productsCount: 18,
  },
  {
    _id: 123333,
    name: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/17606/17606199.png",
    slug: "accessories",
    productsCount: 32,
  },
  {
    _id: 123,
    name: "Parts",
    image: "https://cdn-icons-png.flaticon.com/512/4879/4879886.png",
    slug: "parts",
    productsCount: 12,
  },
  {
    _id: 1231235,
    name: "Gifts & More",
    image: "https://cdn-icons-png.flaticon.com/512/9592/9592247.png",
    slug: "gifts-more",
    productsCount: 8,
  },
];

export default function SmallDeviceCategory() {
  const randomColor = (index: number) => {
    const colors = ["#BA405A", "#9EA6AC", "#003988", "#CE5F01", "#9DB798"];
    return colors[index % colors.length];
  };
  return (
    <div className="mt-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-primary hover:underline text-sm flex items-center font-medium"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {CATEGORIES.map((category, index) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug}`}
            // style={{ backgroundColor: randomColor(index) }}
            className="group relative overflow-hidden rounded-lg p-2 transition-shadow flex items-center justify-center flex-col"
          >
            {/* Image Container */}
            <div className="relative w-10 aspect-square overflow-hidden ">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-center text-[8px] text-black font-semibold line-clamp-1">
              {category.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
