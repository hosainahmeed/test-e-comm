import { ProductFilters } from "../types/ProductFilters";
import { SearchResult } from "../types/SearchResult";
import { scoreProduct } from "./scoreProduct";
import { rankProducts } from "./rankProducts";
import { productMatcher } from "./productMatcher";

export function searchProducts<T extends Record<string, any>>(
  products: T[],
  filters: ProductFilters,
  limit = 10,
): SearchResult<T>[] {
  const matches: SearchResult<T>[] = [];

  for (const product of products) {
    if (!productMatcher(product, filters)) {
      continue;
    }

    const scored = scoreProduct(product, filters);

    if (scored.score > 0) {
      matches.push(scored);
    }
  }

  return rankProducts(matches).slice(0, limit);
}
