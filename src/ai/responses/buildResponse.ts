import { SearchResult } from "../types/SearchResult";
import { formatProduct } from "../utils/formatProduct";

export function buildResponse<T>(params: {
  intent: string;
  searchResults: SearchResult<T>[];
  originalMessage: string;
}) {
  const { intent, searchResults } = params;

  const products = searchResults.map((r) => formatProduct(r.product));

  let message = "";

  if (products.length === 0) {
    message = "Sorry, I couldn’t find anything matching your request.";
  } else {
    message = `I found ${products.length} product(s) for you.`;
  }

  return {
    message,
    products,
    suggestions: [
      "Show cheaper options",
      "Show premium options",
      "Show similar products",
    ],
    actions: [],
    intent,
  };
}
