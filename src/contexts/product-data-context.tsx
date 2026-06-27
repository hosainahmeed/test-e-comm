"use client";

import { Product, ProductsResponse } from "@/lib/productServerApi";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ProductDataContextType {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  setProductData: (data: ProductsResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getCategories: () => string[];
}

const ProductDataContext = createContext<ProductDataContextType | undefined>(
  undefined,
);

export function ProductDataProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: ProductsResponse;
}) {
  const [productData, setProductData] = useState<ProductsResponse>(
    initialData || { products: [], total: 0, skip: 0, limit: 0 },
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductById = useCallback(
    (id: number) => {
      return productData.products.find((p) => p.id === id);
    },
    [productData.products],
  );

  const getProductsByCategory = useCallback(
    (category: string) => {
      return productData.products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    },
    [productData.products],
  );

  const getCategories = useCallback(() => {
    return [...new Set(productData.products.map((p) => p.category))];
  }, [productData.products]);

  return (
    <ProductDataContext.Provider
      value={{
        products: productData.products,
        total: productData.total,
        isLoading,
        error,
        setProductData,
        setLoading,
        setError,
        getProductById,
        getProductsByCategory,
        getCategories,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
}

export function useProductData() {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error("useProductData must be used within ProductDataProvider");
  }
  return context;
}
