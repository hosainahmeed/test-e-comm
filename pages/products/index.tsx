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

interface ProductsPageProps {
  initialData: ProductsResponse;
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

        {/* Collapsible Slide-over Mobile Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] md:hidden transition-opacity duration-300 flex justify-end"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            {/* Drawer Container */}
            <div
              className="w-[85%] max-w-[340px] h-full bg-white dark:bg-zinc-900 p-5 overflow-y-auto shadow-2xl flex flex-col gap-4 animate-in slide-in-from-right duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-150 dark:border-zinc-800 pb-3">
                <span className="font-bold text-gray-900 dark:text-white">Filters</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                <ProductFilters />
              </div>
            </div>
          </div>
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
