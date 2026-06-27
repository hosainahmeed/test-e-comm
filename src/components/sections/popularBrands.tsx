"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, TrendingUp, Shield } from "lucide-react";
import { BRAND_CATALOG } from "@/lib/brandCatalog";

function PopularBrands() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-center sm:text-left">
            <div className="flex gap-3 justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Popular Brands
              </h2>
            </div>
          </div>
          <Link
            href="/brands"
            className="text-primary hover:underline text-sm flex items-center font-medium"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {BRAND_CATALOG.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group relative"
            >
              <div className="bg-white transition-all duration-300 overflow-hidden border border-gray-200 rounded-xl md:rounded-3xl ">
                {/* Brand Logo Container */}
                <div className="relative p-6 bg-linear-to-br from-gray-50 to-gray-100 transition-all duration-300">
                  {/* Verification Badge */}
                  {brand.verified && (
                    <div
                      className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full"
                      title="Verified Brand"
                    >
                      <Shield className="w-3 h-3" />
                    </div>
                  )}

                  {/* Trending Badge */}
                  {brand.trending && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {brand.discount > 0 && (
                    <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Up to {brand.discount}% OFF
                    </div>
                  )}

                  {/* Brand Logo */}
                  <div className="flex items-center justify-center h-20 md:h-24">
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
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {brand.description}
                  </p>

                  {/* Rating & Products */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{brand.rating}</span>
                    </div>
                    <span>{brand.productCount} Products</span>
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
