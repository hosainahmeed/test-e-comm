import { detectIntent } from "../intents/detectIntent";
import { extractFilters } from "../extractors/extractFilters";
import { searchProducts } from "../search/searchProducts";
import { buildResponse } from "../responses/buildResponse";

import { getAllProducts } from "../../lib/products";

export async function processUserMessage(message: string) {
  // 1. Intent
  const intentResult = detectIntent(message);

  // 2. Filters
  const filters = extractFilters(message);

  // 3. Products
  const products = await getAllProducts();

  // 4. Search
  const results = searchProducts(products, filters, 10);

  // 5. Response
  return buildResponse({
    intent: intentResult.intent,
    searchResults: results,
    originalMessage: message,
  });
}
