"use client";

import { useFilters } from "@/contexts/filter-context";
import { useProductData } from "@/contexts/product-data-context";
import { X, SlidersHorizontal, ArrowDownAZ } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

interface ProductTopFilterProps {
  onMobileToggle?: () => void;
}

export default function ProductTopFilter({ onMobileToggle }: ProductTopFilterProps) {
  const { filters, sortBy, setSortBy, setFilter, resetFilters, isFilterActive } = useFilters();
  const { products, filteredProducts } = useProductData();

  // Scroll detection for floating mobile bar
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      // Show floating bar when scrolled past top section (200px)
      if (window.scrollY > 200) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Count active filters for mobile drawer badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    count += filters.brand.length;
    if (filters.price) count++;
    if (filters.rating !== null) count++;
    count += filters.location.length;
    count += filters.delivery.length;
    count += filters.features.length;
    if (filters.search) count++;
    return count;
  }, [filters]);

  // Construct active filter badges
  const activeBadges = useMemo(() => {
    const badges: Array<{ label: string; onClear: () => void }> = [];

    if (filters.search) {
      badges.push({
        label: `Search: "${filters.search}"`,
        onClear: () => setFilter("search", ""),
      });
    }

    if (filters.category) {
      badges.push({
        label: `Category: ${filters.category.replace("-", " ")}`,
        onClear: () => setFilter("category", null),
      });
    }

    filters.brand.forEach((b) => {
      badges.push({
        label: `Brand: ${b}`,
        onClear: () => setFilter("brand", filters.brand.filter((x) => x !== b)),
      });
    });

    if (filters.price) {
      badges.push({
        label: `Price: $${filters.price[0]}-$${filters.price[1]}`,
        onClear: () => setFilter("price", null),
      });
    }

    if (filters.rating !== null) {
      badges.push({
        label: `Rating: ${filters.rating}★ & Up`,
        onClear: () => setFilter("rating", null),
      });
    }

    filters.location.forEach((loc) => {
      badges.push({
        label: `Location: ${loc}`,
        onClear: () => setFilter("location", filters.location.filter((x) => x !== loc)),
      });
    });

    filters.delivery.forEach((opt) => {
      const labelMap: Record<string, string> = {
        freeShipping: "Free Shipping",
        expressDelivery: "Express Delivery",
        cashOnDelivery: "Cash on Delivery",
      };
      badges.push({
        label: labelMap[opt] || opt,
        onClear: () => setFilter("delivery", filters.delivery.filter((x) => x !== opt)),
      });
    });

    filters.features.forEach((feat) => {
      const labelMap: Record<string, string> = {
        inStock: "In Stock Only",
        discounted: "On Sale",
      };
      badges.push({
        label: labelMap[feat] || feat,
        onClear: () => setFilter("features", filters.features.filter((x) => x !== feat)),
      });
    });

    return badges;
  }, [filters, setFilter]);

  return (
    <>
      {/* Standard Inline Top Bar (Non-sticky, clean in layout flow) */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Top row with Title, Count, and Sort options */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button (Inline) */}
            <button
              onClick={onMobileToggle}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#a937e2]" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-[#a937e2] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 rounded-2xl shadow-sm">
              <ArrowDownAZ className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-gray-700 dark:text-zinc-300 focus:outline-none border-none bg-transparent cursor-pointer pr-4"
              >
                <option value="">Sort by: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest discount</option>
                <option value="title">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {isFilterActive && activeBadges.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 bg-gray-50/50 dark:bg-zinc-900/40 p-3 rounded-2xl border border-dashed border-gray-100 dark:border-zinc-800">
            <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            <div className="flex flex-wrap gap-1.5 flex-1 items-center">
              {activeBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-[#a937e2]/10 dark:bg-[#a937e2]/20 border border-[#a937e2]/20 px-2.5 py-1 rounded-xl text-[11px] font-medium text-[#a937e2] capitalize"
                >
                  {badge.label}
                  <button
                    onClick={badge.onClear}
                    className="hover:bg-[#a937e2]/20 rounded-full p-0.5 transition-colors cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}

              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-600 ml-2 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modern Floating Bottom Glassmorphic Filter Pill (Mobile Only) */}
      <div
        className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          showFloatingBar
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 bg-gray-900/90 dark:bg-zinc-900/90 text-white backdrop-blur-xl px-5 py-2.5 rounded-full shadow-2xl border border-white/20 dark:border-zinc-700/50">
          {/* Mobile Filter Button */}
          <button
            onClick={onMobileToggle}
            className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#a937e2] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#a937e2]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-[#a937e2] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-white/20 dark:bg-zinc-700" />

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <ArrowDownAZ className="w-4 h-4 text-[#a937e2] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none border-none cursor-pointer pr-1"
            >
              <option value="" className="text-gray-900 bg-white">Sort: Relevance</option>
              <option value="price-asc" className="text-gray-900 bg-white">Price: Low to High</option>
              <option value="price-desc" className="text-gray-900 bg-white">Price: High to Low</option>
              <option value="rating" className="text-gray-900 bg-white">Top Rated</option>
              <option value="discount" className="text-gray-900 bg-white">Biggest discount</option>
              <option value="title" className="text-gray-900 bg-white">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}