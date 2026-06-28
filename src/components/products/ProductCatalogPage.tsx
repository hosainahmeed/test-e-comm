import Link from "next/link";
import { useRouter } from "next/router";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/lib/productServerApi";
import {
  CatalogCategory,
  CatalogSubcategory,
  getCategoryHref,
  getSubcategoryHref,
} from "@/lib/productCatalog";

type SortOption = "" | "price-asc" | "price-desc" | "rating" | "title";

interface ProductCatalogPageProps {
  products: Product[];
  total: number;
  category: CatalogCategory;
  subcategory?: CatalogSubcategory;
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

export default function ProductCatalogPage({
  products,
  total,
  category,
  subcategory,
}: ProductCatalogPageProps) {
  const router = useRouter();
  const sort = (router.query.sort as SortOption) || "";
  const sortedProducts = sortProducts(products, sort);
  const pageTitle = subcategory?.label ?? category.label;

  const handleSortChange = (value: string) => {
    const pathname = subcategory
      ? getSubcategoryHref(category.slug, subcategory.slug)
      : getCategoryHref(category.slug);

    router.push({
      pathname,
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
        <Link href="/products" className="text-[#C8A96E] hover:underline">
          Products
        </Link>
        <span>/</span>
        {subcategory ? (
          <>
            <Link
              href={getCategoryHref(category.slug)}
              className="text-[#C8A96E] hover:underline"
            >
              {category.label}
            </Link>
            <span>/</span>
            <span className="text-gray-800">{subcategory.label}</span>
          </>
        ) : (
          <span className="text-gray-800">{category.label}</span>
        )}
      </nav>

      {/* Header */}
      <section className="mb-6 rounded-2xl bg-[#FAF8F5] px-5 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 text-3xl">{category.icon}</div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-600 md:text-base">
              {total} product{total !== 1 ? "s" : ""} available
              {subcategory ? ` in ${category.label}` : ""}
            </p>
          </div>

          {!subcategory && (
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-semibold text-[#C8A96E] hover:underline"
            >
              View all products →
            </Link>
          )}
        </div>
      </section>

      {/* Subcategory pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={getCategoryHref(category.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !subcategory
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All {category.label}
        </Link>
        {category.subcategories.map((item) => (
          <Link
            key={item.slug}
            href={getSubcategoryHref(category.slug, item.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              subcategory?.slug === item.slug
                ? "bg-[#C8A96E] text-white!"
                : "bg-gray-100 text-gray-700 hover:bg-[#C8A96E]"
            }`}
          >
            {item.label}
            {item.badge ? (
              <span className="ml-1.5 rounded bg-[#C8A96E] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                {item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500">
          Showing {sortedProducts.length} of {total} products
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
            No products found in this {subcategory ? "subcategory" : "category"}
            .
          </p>
          <Link
            href={getCategoryHref(category.slug)}
            className="mt-5 inline-block rounded-lg bg-[#C8A96E] px-5 py-2.5 text-sm font-semibold text-white no-underline"
          >
            Browse {category.label}
          </Link>
        </div>
      )}
    </div>
  );
}
