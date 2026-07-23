"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../products/ProductCard";
import {
  Clock,
  Eye,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  X,
  Trash2,
  History,
} from "lucide-react";

interface RecentlyViewedProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  viewedAt: string;
}

function RecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [clearingAll, setClearingAll] = useState(false);

  // Simulated recently viewed products data
  useEffect(() => {
    const mockRecentlyViewed: RecentlyViewedProduct[] = [
      {
        id: 1,
        title: "Premium Hookah Set - Gold Edition",
        description: "Complete hookah set with premium accessories",
        price: 299.99,
        discountPercentage: 40,
        rating: 4.8,
        stock: 5,
        brand: "Serenity Living",
        category: "Hookah Pipes",
        thumbnail:
          "https://rukmini1.flixcart.com/image/1500/1500/xif0q/hookah/j/k/h/hookah-2-serenity-living-original-imahjfz3zjepyq32.jpeg?q=70",
        viewedAt: "2 minutes ago",
      },
      {
        id: 2,
        title: "Al Fakher Shisha Tobacco - Double Apple",
        description: "Premium shisha tobacco flavor, 250g pack",
        price: 19.99,
        discountPercentage: 43,
        rating: 4.6,
        stock: 15,
        brand: "Al Fakher",
        category: "Shisha Tobacco",
        thumbnail:
          "https://api.divandione.com/uploads/img/1781460667686-Photoroom_20250308_165910.jpg",
        viewedAt: "15 minutes ago",
      },
      {
        id: 3,
        title: "Coconut Charcoal Cubes - 1kg",
        description: "Natural coconut shell charcoal, 72 pieces",
        price: 14.99,
        discountPercentage: 40,
        rating: 4.7,
        stock: 25,
        brand: "Coco Nara",
        category: "Charcoal",
        thumbnail:
          "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
        viewedAt: "1 hour ago",
      },
      {
        id: 4,
        title: "LED Hookah Base - Color Changing",
        description: "RGB LED hookah base with remote control",
        price: 39.99,
        discountPercentage: 43,
        rating: 4.9,
        stock: 3,
        brand: "Illumi-Hookah",
        category: "Accessories",
        thumbnail:
          "https://api.divandione.com/uploads/img/1781494216354-PEACH_US.webp",
        viewedAt: "3 hours ago",
      },
      {
        id: 5,
        title: "Silicone Hookah Bowl - Black",
        description: "Heat-resistant silicone bowl with glass insert",
        price: 12.99,
        discountPercentage: 35,
        rating: 4.4,
        stock: 30,
        brand: "Hookah Pro",
        category: "Accessories",
        thumbnail:
          "https://api.divandione.com/uploads/img/1781561848972-0200-0585_17053bf5-9e08-4103-9899-de61a0d2b9aa.webp",
        viewedAt: "5 hours ago",
      },
      {
        id: 6,
        title: "Washable Hookah Hose - Silicone",
        description: "Premium silicone hose with aluminum handle",
        price: 24.99,
        discountPercentage: 38,
        rating: 4.5,
        stock: 20,
        brand: "Hookah Plus",
        category: "Hoses",
        thumbnail:
          "https://api.divandione.com/uploads/img/1781561930335-0200-2014_c2bdccae-533e-4530-a127-60d1f432f8c9.webp",
        viewedAt: "Yesterday",
      },
    ];

    setTimeout(() => {
      setRecentlyViewed(mockRecentlyViewed);
      setLoading(false);
    }, 500);
  }, []);

  const handleClearAll = () => {
    setClearingAll(true);
    setTimeout(() => {
      setRecentlyViewed([]);
      setClearingAll(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-gray-400 animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-3 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
              Recently Viewed
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleClearAll}
              className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
            </button>
            <Link
              href="/recently-viewed"
              className="text-primary hover:underline text-xs sm:text-sm flex items-center font-medium border border-border px-2 py-1 hover:border-red-400 bg-gray-200 rounded-sm shrink-0"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>

        {/* Standard Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {recentlyViewed.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>

        {/* Empty State After Clearing */}
        {clearingAll && (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Clearing history...</p>
          </div>
        )}

        {/* Summary Footer */}
        {recentlyViewed.length > 6 && (
          <div className="mt-6 text-center">
            <Link
              href="/recently-viewed"
              className="inline-flex items-center gap-2 text-blue-600 font-medium border border-blue-200 bg-blue-50 px-6 py-2.5 rounded-lg"
            >
              <Eye className="w-4 h-4" />
              View All {recentlyViewed.length} Recently Viewed Items
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentlyViewed;
