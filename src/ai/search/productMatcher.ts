import { ProductFilters } from "../types/ProductFilters";

export function productMatcher<T extends Record<string, any>>(
  product: T,
  filters: ProductFilters,
): boolean {
  const price = Number(product.price ?? 0);

  if (filters.minPrice !== undefined && price < filters.minPrice) {
    return false;
  }

  if (filters.maxPrice !== undefined && price > filters.maxPrice) {
    return false;
  }

  return true;
}
