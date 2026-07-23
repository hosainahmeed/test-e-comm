"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, TrendingUp, Shield } from "lucide-react";
import { BRAND_CATALOG } from "@/lib/brandCatalog";

function PopularBrands() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2 px-1">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
              Popular Brands
            </h2>
          </div>
          <Link
            href="/brands"
            className="text-primary hover:underline text-xs sm:text-sm flex items-center font-medium border border-border px-2 py-1 hover:border-red-400 bg-gray-200 rounded-sm shrink-0"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
          {BRAND_CATALOG.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group relative"
            >
              <div className="bg-white transition-all duration-300 overflow-hidden border border-gray-200 rounded-xl md:rounded-2xl">
                {/* Brand Logo Container */}
                <div className="relative p-3 sm:p-4 md:p-5 bg-linear-to-br from-gray-50 to-gray-100 transition-all duration-300">
                  {/* Verification Badge */}
                  {brand.verified && (
                    <div
                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-blue-600 text-white p-0.5 sm:p-1 rounded-full"
                      title="Verified Brand"
                    >
                      <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  )}

                  {/* Trending Badge */}
                  {brand.trending && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-orange-500 text-white text-[9px] sm:text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-medium">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Trending</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {brand.discount > 0 && (
                    <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-red-600 text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full">
                      Up to {brand.discount}% OFF
                    </div>
                  )}

                  {/* Brand Logo */}
                  <div className="flex items-center justify-center h-14 sm:h-18 md:h-22">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={60}
                      className="max-h-full w-auto object-contain filter transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=${brand.name}`;
                      }}
                    />
                  </div>
                </div>

                {/* Brand Info */}
                <div className="p-2.5 sm:p-3 md:p-4">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2 line-clamp-1">
                    {brand.description}
                  </p>

                  {/* Rating & Products */}
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{brand.rating}</span>
                    </div>
                    <span className="truncate">{brand.productCount} Prods</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularBrands;
