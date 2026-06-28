import { ProductFilters } from "../types/ProductFilters";
import { SearchResult } from "../types/SearchResult";

export function scoreProduct<T extends Record<string, any>>(
  product: T,
  filters: ProductFilters,
): SearchResult<T> {
  let score = 0;

  const matchedKeywords: string[] = [];

  const searchableText = [
    product.title,
    product.description,
    product.category,
    product.brand,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const keyword of filters.keywords) {
    if (searchableText.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);

      score += 20;
    }
  }

  if (
    filters.brand &&
    product.brand?.toLowerCase() === filters.brand.toLowerCase()
  ) {
    score += 30;
  }

  if (
    filters.category &&
    product.category?.toLowerCase() === filters.category.toLowerCase()
  ) {
    score += 25;
  }

  if (filters.minRating && product.rating >= filters.minRating) {
    score += 10;
  }

  return {
    product,
    score,
    matchedKeywords,
  };
}
