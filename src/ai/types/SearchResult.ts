export interface SearchResult<TProduct> {
  product: TProduct;

  score: number;

  matchedKeywords: string[];
}