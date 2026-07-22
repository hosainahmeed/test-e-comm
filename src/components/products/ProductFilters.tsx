"use client";

import { useState, useEffect } from "react";
import { useFilters } from "@/contexts/filter-context";
import { useProductData } from "@/contexts/product-data-context";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  MapPin,
  Truck,
  Tag,
  RotateCcw,
  Sliders,
} from "lucide-react";

export default function ProductFilters() {
  const { filters, setFilter, toggleFilterItem, resetFilters, isFilterActive } =
    useFilters();
  const {
    uniqueBrands,
    uniqueCategories,
    filterCounts,
    minMaxPrices,
  } = useProductData();

  // Local state for expandable sections
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: true,
    rating: true,
    location: false,
    delivery: false,
    features: false,
  });

  // Toggle section helper
  const toggleSection = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Search filter for brands
  const [brandSearch, setBrandSearch] = useState("");

  // Local state for Price Range Inputs (so we don't sync query on every single keystroke)
  const [localMinPrice, setLocalMinPrice] = useState("");
  const [localMaxPrice, setLocalMaxPrice] = useState("");

  // Sync local inputs with context filters
  useEffect(() => {
    if (filters.price) {
      setLocalMinPrice(filters.price[0].toString());
      setLocalMaxPrice(filters.price[1].toString());
    } else {
      setLocalMinPrice("");
      setLocalMaxPrice("");
    }
  }, [filters.price]);

  const handlePriceApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const min = localMinPrice !== "" ? Number(localMinPrice) : minMaxPrices.min;
    const max = localMaxPrice !== "" ? Number(localMaxPrice) : minMaxPrices.max;
    if (!isNaN(min) && !isNaN(max)) {
      setFilter("price", [min, max]);
    }
  };

  const handlePriceReset = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setFilter("price", null);
  };

  // Pre-configured quick price ranges
  const quickPriceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 to $50", min: 25, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: Math.max(1000, minMaxPrices.max) },
  ];

  // Config-driven filter list
  const FILTERS_CONFIG = [
    { id: "category", title: "Categories", icon: Tag },
    { id: "brand", title: "Brands", icon: Search },
    { id: "price", title: "Price Range", icon: Sliders },
    { id: "rating", title: "Ratings", icon: Star },
    { id: "location", title: "Location", icon: MapPin },
    { id: "delivery", title: "Delivery Options", icon: Truck },
    { id: "features", title: "Additional Features", icon: Tag },
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-5 md:p-6 shadow-sm sticky top-[90px]">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Filters
        </h3>
        {isFilterActive && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 divide-y divide-gray-100 dark:divide-zinc-800">
        {/* 1. Category Section */}
        <div className="pt-4 first:pt-0">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#a937e2]" />
              Categories
            </span>
            {expanded.category ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.category && (
            <div className="mt-3 flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 no-scrollbar md:scrollbar-thin">
              <button
                onClick={() => setFilter("category", null)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  !filters.category
                    ? "bg-[#a937e2]/10 text-[#a937e2] font-semibold"
                    : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                All Products
              </button>
              {uniqueCategories.map((cat) => {
                const count = filterCounts.category[cat] || 0;
                const isSelected = filters.category?.toLowerCase() === cat.toLowerCase();
                const isDisabled = count === 0 && !isSelected;

                return (
                  <button
                    key={cat}
                    disabled={isDisabled}
                    onClick={() => setFilter("category", isSelected ? null : cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#a937e2] text-white font-semibold shadow-sm"
                        : isDisabled
                        ? "text-gray-300 dark:text-zinc-600 cursor-not-allowed"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-950 dark:hover:text-white"
                    }`}
                  >
                    <span className="capitalize">{cat.replace("-", " ")}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Brand Section */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#a937e2]" />
              Brands
            </span>
            {expanded.brand ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.brand && (
            <div className="mt-3">
              {/* Search Inside Brand */}
              {uniqueBrands.length > 5 && (
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30 focus:outline-none focus:border-[#a937e2] transition-colors"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 no-scrollbar md:scrollbar-thin">
                {uniqueBrands
                  .filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
                  .map((brand) => {
                    const count = filterCounts.brand[brand] || 0;
                    const isChecked = filters.brand.includes(brand);
                    const isDisabled = count === 0 && !isChecked;

                    return (
                      <label
                        key={brand}
                        className={`flex items-center justify-between gap-2 text-xs py-1 cursor-pointer transition-opacity ${
                          isDisabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            disabled={isDisabled}
                            checked={isChecked}
                            onChange={() => toggleFilterItem("brand", brand)}
                            className="rounded border-gray-300 dark:border-zinc-700 text-[#a937e2] focus:ring-[#a937e2] w-4 h-4 cursor-pointer"
                          />
                          <span className="font-medium text-gray-700 dark:text-zinc-300">
                            {brand}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">({count})</span>
                      </label>
                    );
                  })}
                {uniqueBrands.filter((b) =>
                  b.toLowerCase().includes(brandSearch.toLowerCase())
                ).length === 0 && (
                  <p className="text-[11px] text-gray-400 text-center py-2">No brands found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. Price Section */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#a937e2]" />
              Price Range
            </span>
            {expanded.price ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.price && (
            <div className="mt-3">
              {/* Quick selections */}
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {quickPriceRanges.map((range) => {
                  const isSelected =
                    filters.price &&
                    filters.price[0] === range.min &&
                    filters.price[1] === range.max;
                  return (
                    <button
                      key={range.label}
                      type="button"
                      onClick={() => setFilter("price", [range.min, range.max])}
                      className={`px-2 py-1.5 text-[10px] font-semibold rounded-xl text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#a937e2] text-white"
                          : "bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              {/* Min/Max Inputs */}
              <form onSubmit={handlePriceApply} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-2 text-[10px] text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    placeholder={minMaxPrices.min.toString()}
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 text-xs rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-850 focus:outline-none focus:border-[#a937e2] font-semibold text-gray-700 dark:text-zinc-300"
                  />
                </div>
                <span className="text-gray-400 text-xs">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-2 text-[10px] text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    placeholder={minMaxPrices.max.toString()}
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 text-xs rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-850 focus:outline-none focus:border-[#a937e2] font-semibold text-gray-700 dark:text-zinc-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gray-900 dark:bg-zinc-800 text-white hover:bg-black dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Go
                </button>
              </form>
              {filters.price && (
                <button
                  type="button"
                  onClick={handlePriceReset}
                  className="text-[10px] text-rose-500 font-bold mt-2 hover:underline cursor-pointer block"
                >
                  Clear Price Filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* 4. Rating Section */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("rating")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#a937e2]" />
              Ratings
            </span>
            {expanded.rating ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.rating && (
            <div className="mt-3 flex flex-col gap-1.5">
              {[4, 3, 2, 1].map((stars) => {
                const count = filterCounts.rating[stars] || 0;
                const isSelected = filters.rating === stars;
                const isDisabled = count === 0 && !isSelected;

                return (
                  <button
                    key={stars}
                    disabled={isDisabled}
                    onClick={() => setFilter("rating", isSelected ? null : stars)}
                    className={`w-full text-left px-2 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#a937e2]/10 text-[#a937e2] font-semibold"
                        : isDisabled
                        ? "opacity-35 cursor-not-allowed"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < stars
                              ? "fill-amber-400 stroke-amber-400"
                              : "stroke-gray-300 dark:stroke-zinc-700"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-[11px] font-medium">& Up</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Location Section */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("location")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#a937e2]" />
              Location
            </span>
            {expanded.location ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.location && (
            <div className="mt-3 flex flex-col gap-2">
              {["Dhaka Warehouse", "Chittagong Warehouse", "Overseas (China)"].map((loc) => {
                const count = filterCounts.location[loc] || 0;
                const isChecked = filters.location.includes(loc);
                const isDisabled = count === 0 && !isChecked;

                return (
                  <label
                    key={loc}
                    className={`flex items-center justify-between gap-2 text-xs cursor-pointer transition-opacity ${
                      isDisabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={isChecked}
                        onChange={() => toggleFilterItem("location", loc)}
                        className="rounded border-gray-300 dark:border-zinc-700 text-[#a937e2] focus:ring-[#a937e2] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium text-gray-700 dark:text-zinc-300">{loc}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Delivery Options */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("delivery")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#a937e2]" />
              Delivery Options
            </span>
            {expanded.delivery ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.delivery && (
            <div className="mt-3 flex flex-col gap-2">
              {[
                { value: "freeShipping", label: "Free Shipping" },
                { value: "expressDelivery", label: "Express Delivery" },
                { value: "cashOnDelivery", label: "Cash on Delivery" },
              ].map((opt) => {
                const count = filterCounts.delivery[opt.value] || 0;
                const isChecked = filters.delivery.includes(opt.value);
                const isDisabled = count === 0 && !isChecked;

                return (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-between gap-2 text-xs cursor-pointer transition-opacity ${
                      isDisabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={isChecked}
                        onChange={() => toggleFilterItem("delivery", opt.value)}
                        className="rounded border-gray-300 dark:border-zinc-700 text-[#a937e2] focus:ring-[#a937e2] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium text-gray-700 dark:text-zinc-300">
                        {opt.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 7. Features Section */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("features")}
            className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-800 dark:text-zinc-200 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#a937e2]" />
              Additional Features
            </span>
            {expanded.features ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expanded.features && (
            <div className="mt-3 flex flex-col gap-2">
              {[
                { value: "inStock", label: "In Stock Only" },
                { value: "discounted", label: "On Sale" },
              ].map((feat) => {
                const count = filterCounts.features[feat.value] || 0;
                const isChecked = filters.features.includes(feat.value);
                const isDisabled = count === 0 && !isChecked;

                return (
                  <label
                    key={feat.value}
                    className={`flex items-center justify-between gap-2 text-xs cursor-pointer transition-opacity ${
                      isDisabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={isChecked}
                        onChange={() => toggleFilterItem("features", feat.value)}
                        className="rounded border-gray-300 dark:border-zinc-700 text-[#a937e2] focus:ring-[#a937e2] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium text-gray-700 dark:text-zinc-300 font-semibold">
                        {feat.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}