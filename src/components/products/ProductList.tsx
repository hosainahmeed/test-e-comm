"use client";

import { useProductData } from "@/contexts/product-data-context";
import { useFilters } from "@/contexts/filter-context";
import ProductCard from "./ProductCard";
import { Sparkles, ShoppingBag } from "lucide-react";

export default function ProductList() {
  const { filteredProducts, isLoading, error } = useProductData();
  const { resetFilters } = useFilters();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 border-4 border-[#a937e2] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500 dark:text-zinc-400">
          Loading catalog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50/50 dark:bg-red-950/10 p-6 text-center text-red-600 dark:text-red-400 my-10 max-w-lg mx-auto">
        <p className="font-semibold text-sm">Error Loading Products</p>
        <p className="text-xs mt-1 opacity-80">{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-250 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/10 p-12 text-center my-10 max-w-xl mx-auto flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-850 rounded-2xl flex items-center justify-center text-gray-400 dark:text-zinc-500">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No products found
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
            We couldn't find any products matching your current search or active filters. Try clearing some selections.
          </p>
        </div>
        <button
          onClick={resetFilters}
          className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
