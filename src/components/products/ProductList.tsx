"use client";

import { useProductData } from "@/contexts/product-data-context";
import ProductCard from "./ProductCard";
export default function ProductList() {
  const { products, isLoading, error } = useProductData();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        No products found
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 space-y-6!">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
