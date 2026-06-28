import { SearchResult } from "../types/SearchResult";

export function rankProducts<T>(
  products: SearchResult<T>[],
): SearchResult<T>[] {
  return [...products].sort((a, b) => b.score - a.score);
}
