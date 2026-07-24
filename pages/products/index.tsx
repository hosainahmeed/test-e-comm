import { GetServerSideProps } from "next";
import { useState } from "react";
import { FilterProvider } from "@/contexts/filter-context";
import { ProductDataProvider } from "@/contexts/product-data-context";
import ProductList from "@/components/products/ProductList";
import ProductFilters from "@/components/products/ProductFilters";
import ProductTopFilter from "@/components/products/ProductTopFilter";
import { fetchAllProducts, ProductsResponse } from "@/lib/productServerApi";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";

import { useEffect } from "react";
import { useFilters } from "@/contexts/filter-context";
import { useProductData } from "@/contexts/product-data-context";

interface ProductsPageProps {
  initialData: ProductsResponse;
}

function MobileFilterDrawer({ onClose }: { onClose: () => void }) {
  const { filteredProducts } = useProductData();
  const { resetFilters, isFilterActive } = useFilters();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] md:hidden transition-opacity duration-300 flex justify-end"
      onClick={onClose}
    >
      {/* Drawer Container */}
      <div
        className="w-[88%] max-w-[360px] h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-gray-900 dark:text-white">Filter Products</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-[#a937e2]/20 text-[#a937e2] font-semibold">
              {filteredProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <ProductFilters isMobileDrawer={true} />
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-4 border-t border-gray-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0 flex items-center gap-2.5">
          {isFilterActive && (
            <button
              onClick={resetFilters}
              className="flex-1 py-3 px-3 rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-center"
            >
              Reset
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-[2] py-3 px-4 rounded-2xl bg-[#a937e2] hover:bg-[#9328cd] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer text-center"
          >
            Show {filteredProducts.length} Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage({ initialData }: ProductsPageProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <FilterProvider>
      <ProductDataProvider initialData={initialData}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#a937e2] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800 dark:text-zinc-300 font-semibold">Products</span>
          </nav>

          {/* Page Layout grid */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            {/* Sticky Sidebar on Desktop */}
            <aside className="hidden md:block w-[280px] lg:w-[300px] shrink-0 sticky top-[90px]">
              <ProductFilters />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full">
              <ProductTopFilter onMobileToggle={() => setIsMobileFiltersOpen(true)} />
              <ProductList />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFiltersOpen && (
          <MobileFilterDrawer onClose={() => setIsMobileFiltersOpen(false)} />
        )}
      </ProductDataProvider>
    </FilterProvider>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (
  context,
) => {
  const { search, category, sortBy, limit } = context.query;

  // Fetch 100 products initially to allow comprehensive and responsive client-side filtering/sorting
  const data = await fetchAllProducts({
    search: search as string,
    category: category as string,
    sortBy: sortBy as "price" | "rating" | "title",
    limit: limit ? Number(limit) : 100,
  });

  return {
    props: {
      initialData: data,
    },
  };
};
