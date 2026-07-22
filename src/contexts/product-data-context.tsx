"use client";

import { Product, ProductsResponse } from "@/lib/productServerApi";
import { useFilters } from "./filter-context";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

export interface ProductExtraInfo {
  location: string;
  freeShipping: boolean;
  expressDelivery: boolean;
  cashOnDelivery: boolean;
}

export function getProductExtraInfo(product: Product): ProductExtraInfo {
  const id = product.id;
  const isEven = id % 2 === 0;
  const isMod3 = id % 3 === 0;
  const isMod5 = id % 5 === 0;

  const shipsFast =
    product.shippingInformation?.toLowerCase().includes("overnight") ||
    product.shippingInformation?.toLowerCase().includes("1-2") ||
    product.shippingInformation?.toLowerCase().includes("24 hours");

  const freeShipping = product.price > 50 || isEven;
  const expressDelivery = !!(shipsFast || isMod3);
  const cashOnDelivery = !isMod5;

  let location = "Dhaka Warehouse";
  if (id % 3 === 0) {
    location = "Overseas (China)";
  } else if (id % 3 === 2) {
    location = "Chittagong Warehouse";
  }

  return {
    location,
    freeShipping,
    expressDelivery,
    cashOnDelivery,
  };
}

interface FilterCounts {
  category: Record<string, number>;
  brand: Record<string, number>;
  rating: Record<number, number>;
  location: Record<string, number>;
  delivery: Record<string, number>;
  features: Record<string, number>;
}

interface ProductDataContextType {
  products: Product[];
  filteredProducts: Product[];
  filterCounts: FilterCounts;
  uniqueBrands: string[];
  uniqueCategories: string[];
  minMaxPrices: { min: number; max: number };
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
  const { filters, sortBy } = useFilters();
  const [productData, setProductDataState] = useState<ProductsResponse>(
    initialData || { products: [], total: 0, skip: 0, limit: 0 },
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setProductData = useCallback((data: ProductsResponse) => {
    setProductDataState(data);
  }, []);

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

  // Derived properties from total catalog
  const uniqueBrands = useMemo(() => {
    return [...new Set(productData.products.map((p) => p.brand).filter(Boolean))].sort();
  }, [productData.products]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(productData.products.map((p) => p.category).filter(Boolean))].sort();
  }, [productData.products]);

  const minMaxPrices = useMemo(() => {
    if (productData.products.length === 0) return { min: 0, max: 1000 };
    const prices = productData.products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [productData.products]);

  // Filter Pipeline (Deterministic steps, Sorting applied LAST)
  const filteredProducts = useMemo(() => {
    let result = [...productData.products];

    // 1. Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      );
    }

    // 2. Category filter
    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase(),
      );
    }

    // 3. Brand filter
    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    // 4. Price filter
    if (filters.price) {
      const [min, max] = filters.price;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // 5. Rating filter
    if (filters.rating !== null) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // 6. Location filter
    if (filters.location.length > 0) {
      result = result.filter((p) => {
        const extra = getProductExtraInfo(p);
        return filters.location.includes(extra.location);
      });
    }

    // 7. Delivery options filter
    if (filters.delivery.length > 0) {
      result = result.filter((p) => {
        const extra = getProductExtraInfo(p);
        if (filters.delivery.includes("freeShipping") && !extra.freeShipping) return false;
        if (filters.delivery.includes("expressDelivery") && !extra.expressDelivery) return false;
        if (filters.delivery.includes("cashOnDelivery") && !extra.cashOnDelivery) return false;
        return true;
      });
    }

    // 8. Features filter
    if (filters.features.length > 0) {
      result = result.filter((p) => {
        if (filters.features.includes("inStock") && p.stock <= 0) return false;
        if (filters.features.includes("discounted") && p.discountPercentage <= 0) return false;
        return true;
      });
    }

    // 9. Sorting (Applied LAST)
    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "discount":
          result.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
        case "title":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }

    return result;
  }, [productData.products, filters, sortBy]);

  // Compute dynamic option counts matching Daraz style (excluding current filter group itself)
  const filterCounts = useMemo(() => {
    const runPipelineExcluding = (excludeKey?: string) => {
      return productData.products.filter((p) => {
        // Search
        if (excludeKey !== "search" && filters.search) {
          const searchLower = filters.search.toLowerCase();
          const match =
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.brand?.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower);
          if (!match) return false;
        }

        // Category
        if (excludeKey !== "category" && filters.category) {
          if (p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
        }

        // Brand
        if (excludeKey !== "brand" && filters.brand.length > 0) {
          if (!filters.brand.includes(p.brand)) return false;
        }

        // Price
        if (excludeKey !== "price" && filters.price) {
          const [min, max] = filters.price;
          if (p.price < min || p.price > max) return false;
        }

        // Rating
        if (excludeKey !== "rating" && filters.rating !== null) {
          if (p.rating < filters.rating) return false;
        }

        const extra = getProductExtraInfo(p);

        // Location
        if (excludeKey !== "location" && filters.location.length > 0) {
          if (!filters.location.includes(extra.location)) return false;
        }

        // Delivery
        if (excludeKey !== "delivery" && filters.delivery.length > 0) {
          if (filters.delivery.includes("freeShipping") && !extra.freeShipping) return false;
          if (filters.delivery.includes("expressDelivery") && !extra.expressDelivery) return false;
          if (filters.delivery.includes("cashOnDelivery") && !extra.cashOnDelivery) return false;
        }

        // Features
        if (excludeKey !== "features" && filters.features.length > 0) {
          if (filters.features.includes("inStock") && p.stock <= 0) return false;
          if (filters.features.includes("discounted") && p.discountPercentage <= 0) return false;
        }

        return true;
      });
    };

    // Calculate Category counts
    const categorySet = runPipelineExcluding("category");
    const categoryCounts: Record<string, number> = {};
    categorySet.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    // Calculate Brand counts
    const brandSet = runPipelineExcluding("brand");
    const brandCounts: Record<string, number> = {};
    brandSet.forEach((p) => {
      if (p.brand) {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      }
    });

    // Calculate Rating counts
    const ratingSet = runPipelineExcluding("rating");
    const ratingCounts = {
      4: ratingSet.filter((p) => p.rating >= 4).length,
      3: ratingSet.filter((p) => p.rating >= 3).length,
      2: ratingSet.filter((p) => p.rating >= 2).length,
      1: ratingSet.filter((p) => p.rating >= 1).length,
    };

    // Calculate Location counts
    const locationSet = runPipelineExcluding("location");
    const locationCounts: Record<string, number> = {
      "Dhaka Warehouse": 0,
      "Chittagong Warehouse": 0,
      "Overseas (China)": 0,
    };
    locationSet.forEach((p) => {
      const extra = getProductExtraInfo(p);
      locationCounts[extra.location] = (locationCounts[extra.location] || 0) + 1;
    });

    // Calculate Delivery counts
    const deliverySet = runPipelineExcluding("delivery");
    const deliveryCounts = {
      freeShipping: deliverySet.filter((p) => getProductExtraInfo(p).freeShipping).length,
      expressDelivery: deliverySet.filter((p) => getProductExtraInfo(p).expressDelivery).length,
      cashOnDelivery: deliverySet.filter((p) => getProductExtraInfo(p).cashOnDelivery).length,
    };

    // Calculate Features counts
    const featuresSet = runPipelineExcluding("features");
    const featuresCounts = {
      inStock: featuresSet.filter((p) => p.stock > 0).length,
      discounted: featuresSet.filter((p) => p.discountPercentage > 0).length,
    };

    return {
      category: categoryCounts,
      brand: brandCounts,
      rating: ratingCounts,
      location: locationCounts,
      delivery: deliveryCounts,
      features: featuresCounts,
    };
  }, [productData.products, filters]);

  return (
    <ProductDataContext.Provider
      value={{
        products: productData.products,
        filteredProducts,
        filterCounts,
        uniqueBrands,
        uniqueCategories,
        minMaxPrices,
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
