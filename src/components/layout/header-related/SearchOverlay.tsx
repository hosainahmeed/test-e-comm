import { getHeaderCategories } from "@/lib/productCatalog";
import { Search, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchSuggestion {
  label: string;
  category: string;
  href: string;
}
const CATEGORIES = getHeaderCategories();

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    label: "Al Fakher Double Apple",
    category: "Shisha",
    href: "/products/shisha/double-apple",
  },
  {
    label: "Khalil Mamoon Hookah",
    category: "Hookahs",
    href: "/products/hookahs/premium",
  },
  {
    label: "Kaloud Lotus Heat Management",
    category: "Accessories",
    href: "/products/accessories/heat-management",
  },
  {
    label: "Starbuzz Blue Mist",
    category: "Shisha",
    href: "/products/shisha/starbuzz",
  },
  {
    label: "Mini Travel Hookah",
    category: "Hookahs",
    href: "/products/hookahs/mini-travel",
  },
  {
    label: "Silicone Hose",
    category: "Accessories",
    href: "/products/accessories/hoses",
  },
  {
    label: "Coconut Charcoal",
    category: "Accessories",
    href: "/products/accessories/charcoal",
  },
  {
    label: "Fumari Ambrosia",
    category: "Shisha",
    href: "/products/shisha/fruity",
  },
];

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Prevent background scrolling when overlay is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const filtered =
    query.length > 0
      ? SEARCH_SUGGESTIONS.filter(
          (s) =>
            s.label.toLowerCase().includes(query.toLowerCase()) &&
            (selectedCategory === "All" || s.category === selectedCategory),
        )
      : SEARCH_SUGGESTIONS.slice(0, 5);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex flex-col items-center justify-start pt-12 sm:pt-20 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200 border border-gray-100 dark:border-zinc-800 flex flex-col max-h-[85vh] my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Row */}
        <div className="flex items-center gap-2 sm:gap-3 p-3.5 sm:p-4 border-b border-gray-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          {/* Category Filter Dropdown */}
          <div className="relative shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none border-none bg-gray-100/80 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs font-bold py-2 pl-3 pr-7 rounded-xl cursor-pointer outline-none max-w-[90px] sm:max-w-none truncate"
            >
              <option value="All">All</option>
              {CATEGORIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Divider */}
          <div className="w-[1px] h-5 bg-gray-200 dark:bg-zinc-800 shrink-0" />

          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search products..."
            className="flex-1 min-w-0 border-none outline-none text-sm sm:text-base font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors shrink-0 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggestions / Results */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 no-scrollbar">
          <div className="px-3 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-gray-400 dark:text-zinc-500 uppercase">
            {query ? "Results" : "Popular searches"}
          </div>
          
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-1 mt-1">
              {filtered.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl hover:bg-purple-50/70 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-[#a937e2] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200 group-hover:text-[#a937e2] truncate">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#a937e2] bg-purple-100/70 dark:bg-[#a937e2]/20 px-2 py-0.5 rounded-lg shrink-0">
                    {s.category}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400 text-xs sm:text-sm">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 px-4 border-t border-gray-150 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 shrink-0 flex items-center justify-between text-[11px] text-gray-400 dark:text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              Press <kbd className="bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-600 dark:text-zinc-300">Esc</kbd> to close
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              Press <kbd className="bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-600 dark:text-zinc-300">Enter</kbd> to search all
            </span>
            <span className="sm:hidden text-[10px]">
              Tap any item to jump to product
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[#a937e2]">
            {filtered.length} matches
          </span>
        </div>
      </div>
    </div>
  );
}
