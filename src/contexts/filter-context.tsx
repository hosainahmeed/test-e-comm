"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { useRouter } from "next/router";

export interface FiltersState {
  category: string | null;
  brand: string[];
  price: [number, number] | null; // [min, max]
  rating: number | null;
  location: string[];
  delivery: string[];
  features: string[];
  search: string;
}

interface FilterContextType {
  filters: FiltersState;
  sortBy: string;
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  toggleFilterItem: (key: "brand" | "location" | "delivery" | "features", item: string) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
  isFilterActive: boolean;
}

const defaultFilters: FiltersState = {
  category: null,
  brand: [],
  price: null,
  rating: null,
  location: [],
  delivery: [],
  features: [],
  search: "",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [sortBy, setSortByState] = useState<string>("");

  // Parse filters from URL query parameters
  useEffect(() => {
    if (!router.isReady) return;

    const {
      category,
      brand,
      price,
      rating,
      location,
      delivery,
      features,
      search,
      sortBy: urlSortBy,
    } = router.query;

    const parsedFilters: FiltersState = {
      category: (category as string) || null,
      brand: brand ? (brand as string).split(",") : [],
      price: null,
      rating: rating ? Number(rating) : null,
      location: location ? (location as string).split(",") : [],
      delivery: delivery ? (delivery as string).split(",") : [],
      features: features ? (features as string).split(",") : [],
      search: (search as string) || "",
    };

    if (price && typeof price === "string") {
      const parts = price.split("-");
      if (parts.length === 2) {
        const min = Number(parts[0]);
        const max = Number(parts[1]);
        if (!isNaN(min) && !isNaN(max)) {
          parsedFilters.price = [min, max];
        }
      }
    }

    setFilters(parsedFilters);
    setSortByState((urlSortBy as string) || "");
  }, [router.isReady, router.query.category, router.query.brand, router.query.price, router.query.rating, router.query.location, router.query.delivery, router.query.features, router.query.search, router.query.sortBy]);

  // Sync state to URL
  const syncToUrl = useCallback(
    (newFilters: FiltersState, newSortBy: string) => {
      if (!router.isReady) return;

      const query: Record<string, string> = {};

      if (newFilters.category) query.category = newFilters.category;
      if (newFilters.brand.length > 0) query.brand = newFilters.brand.join(",");
      if (newFilters.price) query.price = `${newFilters.price[0]}-${newFilters.price[1]}`;
      if (newFilters.rating !== null) query.rating = newFilters.rating.toString();
      if (newFilters.location.length > 0) query.location = newFilters.location.join(",");
      if (newFilters.delivery.length > 0) query.delivery = newFilters.delivery.join(",");
      if (newFilters.features.length > 0) query.features = newFilters.features.join(",");
      if (newFilters.search) query.search = newFilters.search;
      if (newSortBy) query.sortBy = newSortBy;

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router.isReady, router.pathname]
  );

  const setFilter = useCallback(
    <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
      setFilters((prev) => {
        const updated = { ...prev, [key]: value };
        syncToUrl(updated, sortBy);
        return updated;
      });
    },
    [syncToUrl, sortBy]
  );

  const toggleFilterItem = useCallback(
    (key: "brand" | "location" | "delivery" | "features", item: string) => {
      setFilters((prev) => {
        const items = prev[key];
        const updatedItems = items.includes(item)
          ? items.filter((i) => i !== item)
          : [...items, item];
        const updated = { ...prev, [key]: updatedItems };
        syncToUrl(updated, sortBy);
        return updated;
      });
    },
    [syncToUrl, sortBy]
  );

  const setSortBy = useCallback(
    (newSortBy: string) => {
      setSortByState(newSortBy);
      syncToUrl(filters, newSortBy);
    },
    [syncToUrl, filters]
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSortByState("");
    if (router.isReady) {
      router.push({ pathname: router.pathname }, undefined, { shallow: true });
    }
  }, [router.isReady, router.pathname]);

  const isFilterActive = useMemo(() => {
    return (
      filters.category !== null ||
      filters.brand.length > 0 ||
      filters.price !== null ||
      filters.rating !== null ||
      filters.location.length > 0 ||
      filters.delivery.length > 0 ||
      filters.features.length > 0 ||
      filters.search !== ""
    );
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        sortBy,
        setFilter,
        toggleFilterItem,
        setSortBy,
        resetFilters,
        isFilterActive,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
