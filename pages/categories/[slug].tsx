import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchProductsByCategory, Product } from "@/lib/productServerApi";
import ProductCard from "@/components/products/ProductCard";

interface CategoryPageProps {
  products: Product[];
  categoryName: string;
  total: number;
}

export default function CategoryPage({
  products,
  categoryName,
  total,
}: CategoryPageProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (router.isFallback) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2">
      {/* Breadcrumb */}
      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#6b7280" }}>
        <Link href="/" style={{ color: "#3b82f6", textDecoration: "none" }}>
          Home
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <Link
          href="/categories"
          style={{ color: "#3b82f6", textDecoration: "none" }}
        >
          Categories
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "#374151" }}>{categoryName}</span>
      </div>

      {/* Category Header */}
      {/* <section
        style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "12px",
          color: "white",
          marginBottom: "40px",
        }}
      >
        <div style={{ fontSize: "50px", marginBottom: "15px" }}>
          {getCategoryIcon(slug as string)}
        </div>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            textTransform: "capitalize",
          }}
        >
          {categoryName}
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>
          {total} product{total !== 1 ? "s" : ""} available
        </p>
      </section> */}

      {/* Filters & Sorting Bar */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Showing {products.length} of {total} products
          </span>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <select
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
            onChange={(e) => {
              router.push({
                pathname: `/category/${slug}`,
                query: { sort: e.target.value },
              });
            }}
          >
            <option value="">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="title">Name</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 space-y-6!">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p style={{ fontSize: "18px", color: "#6b7280" }}>
            No products found in this category.
          </p>
          <Link
            href="/categories"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Browse All Categories
          </Link>
        </div>
      )}
    </div>
  );
}

// Helper function (same as in categories page)
function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    beauty: "💄",
    fragrances: "🌸",
    furniture: "🪑",
    groceries: "🛒",
    "home-decoration": "🏠",
    "kitchen-accessories": "🍳",
    laptops: "💻",
    "mens-shirts": "👔",
    "mens-shoes": "👞",
    "mens-watches": "⌚",
    "mobile-accessories": "📱",
    motorcycle: "🏍️",
    "skin-care": "🧴",
    smartphones: "📱",
    "sports-accessories": "⚽",
    sunglasses: "🕶️",
    tablets: "📱",
    tops: "👚",
    vehicle: "🚗",
    "womens-bags": "👜",
    "womens-dresses": "👗",
    "womens-jewellery": "💍",
    "womens-shoes": "👠",
    "womens-watches": "⌚",
  };

  return iconMap[slug] || "📦";
}

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context,
) => {
  const { slug } = context.params as { slug: string };
  const { sort } = context.query;

  try {
    const data = await fetchProductsByCategory(slug);
    let products = data.products;

    // Apply sorting if specified
    if (sort) {
      switch (sort) {
        case "price-asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products.sort((a, b) => b.rating - a.rating);
          break;
        case "title":
          products.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    return {
      props: {
        products,
        categoryName: slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        total: data.total,
      },
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      notFound: true,
    };
  }
};
