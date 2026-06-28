import { ProductFilters } from "./ProductFilters";

export interface SuggestedAction {
  type: string;

  label: string;

  payload?: unknown;
}

export interface AIResponse<TProduct = unknown> {
  message: string;

  products: TProduct[];

  filters?: ProductFilters;

  suggestions: string[];

  actions: SuggestedAction[];
}
