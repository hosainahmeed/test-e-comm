import { GetServerSideProps } from "next";
import { fetchCategories, Category } from "@/lib/categoriesServerApi";
import SmallDeviceCategory from "@/components/sections/small-device-category";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoriesPageProps {
  categories: Category[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <div className="min-h-screen bg-white py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#A937E2] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-800">Categories</span>
        </nav>

        {/* Categories Section */}
        <SmallDeviceCategory
          categories={categories}
          title="All Categories"
          viewAllHref="/categories"
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  CategoriesPageProps
> = async () => {
  const categories = await fetchCategories();

  return {
    props: {
      categories,
    },
  };
};

