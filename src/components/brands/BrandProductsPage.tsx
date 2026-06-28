import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Award, Shield, Star } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Brand, getBrandHref } from "@/lib/brandCatalog";
import { Product } from "@/lib/productServerApi";

type SortOption = "" | "price-asc" | "price-desc" | "rating" | "title";

interface BrandProductsPageProps {
  brand: Brand;
  products: Product[];
  total: number;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export default function BrandProductsPage({
  brand,
  products,
  total,
}: BrandProductsPageProps) {
  const router = useRouter();
  const sort = (router.query.sort as SortOption) || "";
  const sortedProducts = sortProducts(products, sort);

  const handleSortChange = (value: string) => {
    router.push({
      pathname: getBrandHref(brand.slug),
      query: value ? { sort: value } : {},
    });
  };

  return (
    <div className="container mx-auto px-2 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav
        className="mb-5 flex flex-wrap items-center gap-1 text-sm text-gray-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-[#C8A96E] hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/brands" className="text-[#C8A96E] hover:underline">
          Brands
        </Link>
        <span>/</span>
        <span className="text-gray-800">{brand.name}</span>
      </nav>

      {/* Brand header */}
      <section className="mb-6 rounded-2xl bg-[#FAF8F5] px-5 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white p-3 shadow-sm md:h-28 md:w-28">
            <Image
              src={brand.image}
              alt={`${brand.name} logo`}
              width={120}
              height={60}
              className="max-h-full w-auto object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {brand.name}
              </h1>
              {brand.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  <Shield className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 md:text-base">
              {brand.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <strong>{brand.rating}</strong> rating
              </span>
              <span>
                {total} product{total !== 1 ? "s" : ""}
              </span>
              <span>{brand.country}</span>
              <span>Est. {brand.established}</span>
            </div>

            {brand.bestSeller && (
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-[#C8A96E]">
                <Award className="h-4 w-4" />
                Best seller: {brand.bestSeller}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Other brands */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/brands"
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          All Brands
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500">
          Showing {sortedProducts.length} of {total} products by {brand.name}
        </span>

        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="title">Name</option>
        </select>
      </div>

      {/* Products grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 py-16 text-center">
          <p className="text-lg text-gray-600">
            No products found for {brand.name}.
          </p>
          <Link
            href="/brands"
            className="mt-5 inline-block rounded-lg bg-[#C8A96E] px-5 py-2.5 text-sm font-semibold text-white no-underline"
          >
            Browse All Brands
          </Link>
        </div>
      )}
    </div>
  );
}
