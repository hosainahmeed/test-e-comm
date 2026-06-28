export interface ProductFilters {
  query?: string;

  keywords: string[];

  category?: string;

  subcategory?: string;

  brand?: string;

  minPrice?: number;

  maxPrice?: number;

  minRating?: number;

  inStock?: boolean;

  sortBy?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest";
}
