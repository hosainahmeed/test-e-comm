import { ProductData } from "@/types/product.type";
import React from "react";

interface ProductCardProps {
  product: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate original price before discount for visual appeal
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
      {/* Top Image & Badges Section */}
      <div className="relative bg-gray-50 pt-[100%] overflow-hidden">
        {/* Fallback placeholder since image string is "..." */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 group-hover:scale-105 transition-transform duration-300">
          <span className="text-4xl text-pink-400 font-bold tracking-wider opacity-40">
            {product.brand}
          </span>
        </div>

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {product.discountPercentage}% OFF
        </span>

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
            product.availabilityStatus === "Low Stock"
              ? "bg-amber-100 text-amber-800 border border-amber-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          {product.availabilityStatus} ({product.stock} left)
        </span>
      </div>

      {/* Product Information Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs text-gray-500 capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center text-amber-400 mr-2 text-sm">
              ★{" "}
              <span className="text-gray-700 font-semibold ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Order Meta */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-black text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg mb-4">
            <div>
              <span className="block font-medium text-gray-400">
                Min. Order:
              </span>
              <span className="font-semibold text-gray-700">
                {product.minimumOrderQuantity} units
              </span>
            </div>
            <div>
              <span className="block font-medium text-gray-400">Shipping:</span>
              <span className="font-semibold text-gray-700">
                {product.shippingInformation}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gray-900 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 text-sm">
            Add to Bulk Order
          </button>
        </div>
      </div>
    </div>
  );
};
