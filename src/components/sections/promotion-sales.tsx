"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { ArrowLeft, ChevronRight, Timer, Zap, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IMAGE } from "@/constant/image.index";

// Sample flash sale products data
const flashSaleProducts = [
  {
    id: 1,
    title: "Premium Hookah Set - Gold Edition",
    description: "Complete hookah set with premium accessories and gold finish",
    category: "Hookah Pipes",
    price: 299.99,
    originalPrice: 499.99,
    discountPercentage: 40,
    rating: 4.8,
    stock: 5,
    tags: ["flash-sale", "premium", "bestseller"],
    brand: "Serenity Living",
    sku: "HK-GOLD-001",
    weight: 5.5,
    dimensions: {
      width: 30,
      height: 70,
      depth: 30,
    },
    warrantyInformation: "2 years manufacturer warranty",
    shippingInformation: "Free shipping on orders over $200",
    availabilityStatus: "In stock",
    reviews: [
      {
        reviewerName: "John D.",
        reviewerEmail: "john@example.com",
        rating: 5,
        comment: "Amazing quality! The gold finish is stunning.",
        date: "2024-01-15",
      },
    ],
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      barcode: "8901234567890",
      qrCode: "8901234567890",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781463675678-Photoroom_20250302_231219.jpg",
    images: [
      "https://api.divandione.com/uploads/img/1781463675678-Photoroom_20250302_231219.jpg",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
  {
    id: 2,
    title: "Al Fakher Shisha Tobacco - Double Apple",
    description: "Premium shisha tobacco flavor, 250g pack",
    category: "Shisha Tobacco",
    price: 19.99,
    originalPrice: 34.99,
    discountPercentage: 43,
    rating: 4.6,
    stock: 15,
    tags: ["flash-sale", "popular", "tobacco"],
    brand: "Al Fakher",
    sku: "AF-DA-250",
    weight: 0.25,
    dimensions: {
      width: 8,
      height: 12,
      depth: 8,
    },
    warrantyInformation: "N/A",
    shippingInformation: "Ships within 24 hours",
    availabilityStatus: "In stock",
    reviews: [
      {
        reviewerName: "Mike R.",
        reviewerEmail: "mike@example.com",
        rating: 5,
        comment: "Best double apple flavor in the market!",
        date: "2024-02-20",
      },
    ],
    returnPolicy: "No returns on opened tobacco products",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      barcode: "8901234567891",
      qrCode: "8901234567891",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781540256121-COCONUT_US%20(1).webp",
    images: [
      "https://api.divandione.com/uploads/img/1781540256121-COCONUT_US%20(1).webp",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
  {
    id: 3,
    title: "Coconut Charcoal Cubes - 1kg",
    description: "Natural coconut shell charcoal, 72 pieces per box",
    category: "Charcoal",
    price: 14.99,
    originalPrice: 24.99,
    discountPercentage: 40,
    rating: 4.7,
    stock: 25,
    tags: ["flash-sale", "natural", "charcoal"],
    brand: "Coco Nara",
    sku: "CN-CC-1000",
    weight: 1,
    dimensions: {
      width: 15,
      height: 20,
      depth: 15,
    },
    warrantyInformation: "N/A",
    shippingInformation: "Free shipping on orders over $50",
    availabilityStatus: "In stock",
    reviews: [
      {
        reviewerName: "Sarah L.",
        reviewerEmail: "sarah@example.com",
        rating: 5,
        comment: "Burns evenly and lasts long. Highly recommend!",
        date: "2024-03-10",
      },
    ],
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-02-01",
      updatedAt: "2024-02-01",
      barcode: "8901234567892",
      qrCode: "8901234567892",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781481997575-71kp4rHCvDL._AC_SX679_.jpg",
    images: [
      "https://api.divandione.com/uploads/img/1781481997575-71kp4rHCvDL._AC_SX679_.jpg",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
  {
    id: 4,
    title: "Silicone Hookah Bowl - Black",
    description: "Heat-resistant silicone bowl with glass insert",
    category: "Accessories",
    price: 12.99,
    originalPrice: 19.99,
    discountPercentage: 35,
    rating: 4.4,
    stock: 30,
    tags: ["flash-sale", "accessories", "bowl"],
    brand: "Hookah Pro",
    sku: "HP-SB-001",
    weight: 0.15,
    dimensions: {
      width: 8,
      height: 6,
      depth: 8,
    },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships within 24 hours",
    availabilityStatus: "In stock",
    reviews: [
      {
        reviewerName: "Tom K.",
        reviewerEmail: "tom@example.com",
        rating: 4,
        comment: "Good quality, easy to clean.",
        date: "2024-02-28",
      },
    ],
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-02-15",
      updatedAt: "2024-02-15",
      barcode: "8901234567893",
      qrCode: "8901234567893",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781578994626-foyer-oblako-phunnel-mono-m-4.jpg",
    images: [
      "https://api.divandione.com/uploads/img/1781578994626-foyer-oblako-phunnel-mono-m-4.jpg",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
  {
    id: 5,
    title: "LED Hookah Base - Color Changing",
    description: "RGB LED hookah base with remote control",
    category: "Accessories",
    price: 39.99,
    originalPrice: 69.99,
    discountPercentage: 43,
    rating: 4.9,
    stock: 3,
    tags: ["flash-sale", "premium", "led"],
    brand: "Illumi-Hookah",
    sku: "IH-LED-001",
    weight: 1.2,
    dimensions: {
      width: 15,
      height: 25,
      depth: 15,
    },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Free shipping",
    availabilityStatus: "Low stock",
    reviews: [
      {
        reviewerName: "Alex P.",
        reviewerEmail: "alex@example.com",
        rating: 5,
        comment: "Looks amazing at night! Party essential.",
        date: "2024-03-15",
      },
    ],
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
      barcode: "8901234567894",
      qrCode: "8901234567894",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781461963188-Photoroom_20250302_194141-1.jpg",
    images: [
      "https://api.divandione.com/uploads/img/1781461963188-Photoroom_20250302_194141-1.jpg",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
  {
    id: 6,
    title: "Washable Hookah Hose - Silicone",
    description: "Premium silicone hose with aluminum handle",
    category: "Hoses",
    price: 24.99,
    originalPrice: 39.99,
    discountPercentage: 38,
    rating: 4.5,
    stock: 20,
    tags: ["flash-sale", "hose", "silicone"],
    brand: "Hookah Plus",
    sku: "HP-SH-001",
    weight: 0.3,
    dimensions: {
      width: 5,
      height: 150,
      depth: 5,
    },
    warrantyInformation: "3 months warranty",
    shippingInformation: "Free shipping on orders over $50",
    availabilityStatus: "In stock",
    reviews: [
      {
        reviewerName: "Chris M.",
        reviewerEmail: "chris@example.com",
        rating: 4,
        comment: "Great quality hose, doesn't ghost flavors.",
        date: "2024-03-20",
      },
    ],
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-03-10",
      updatedAt: "2024-03-10",
      barcode: "8901234567895",
      qrCode: "8901234567895",
    },
    thumbnail:
      "https://api.divandione.com/uploads/img/1781571286380-Photoroom_20250719_151119.JPEG",
    images: [
      "https://api.divandione.com/uploads/img/1781571286380-Photoroom_20250719_151119.JPEG",
    ],
    flashSaleEndTime: "2024-12-31T23:59:59",
  },
];

function PromotionSale() {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? flashSaleProducts
    : flashSaleProducts.slice(0, visibleProducts);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <Image
          src={IMAGE.downloadBanner}
          width={334}
          height={34}
          alt="promo banner"
          className="w-full h-full object-cover"
        />
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 md:w-7 md:h-7 text-red-600 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Summer Sale
              </h2>
            </div>
          </div>
          <Link
            href="/products?category=Hookah%20Flavors"
            className="text-primary hover:underline text-sm flex items-center font-medium"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid with Flash Sale Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {displayedProducts.map((product) => (
            <div key={product.id} className="relative group">
              {/* Flash Sale Badge */}
              <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" />-
                {product.discountPercentage}%
              </div>

              {/* Stock Badge */}
              {product.stock <= 5 && (
                <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  Only {product.stock} left!
                </div>
              )}

              {/* Product Card with Flash Sale Enhancements */}
              <div className="transform transition-all duration-300">
                <ProductCard product={product} />
              </div>

              {/* Progress Bar for Stock */}
              <div className="mt-2 px-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-linear-to-r from-red-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((product.stock / 50) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.stock} sold in last 24h
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && flashSaleProducts.length > visibleProducts && (
          <div className="text-center mt-6">
            <button
              onClick={handleShowAll}
              className="bg-white border-2 border-red-600 text-red-600 px-6 py-2.5 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Show More Deals ({flashSaleProducts.length - visibleProducts}{" "}
              remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromotionSale;
