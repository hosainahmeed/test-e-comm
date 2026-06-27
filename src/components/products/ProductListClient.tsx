"use client";

import { ProductDataProvider } from "@/contexts/product-data-context";
import ProductList from "@/components/products/ProductList";
import { ProductsResponse } from "@/lib/productServerApi";

export default function ProductListClient({
  initialData,
}: {
  initialData: ProductsResponse;
}) {
  return (
    <ProductDataProvider initialData={initialData}>
      <ProductList />
    </ProductDataProvider>
  );
}
