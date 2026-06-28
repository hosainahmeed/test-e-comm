export enum IntentType {
  GREETING = "GREETING",

  SEARCH_PRODUCT = "SEARCH_PRODUCT",
  SEARCH_CATEGORY = "SEARCH_CATEGORY",
  SEARCH_BRAND = "SEARCH_BRAND",

  COMPARE_PRODUCTS = "COMPARE_PRODUCTS",
  RECOMMEND_PRODUCTS = "RECOMMEND_PRODUCTS",
  RELATED_PRODUCTS = "RELATED_PRODUCTS",

  PRICE_QUERY = "PRICE_QUERY",
  PRODUCT_DETAILS = "PRODUCT_DETAILS",

  ORDER_STATUS = "ORDER_STATUS",
  SHIPPING_INFO = "SHIPPING_INFO",
  RETURN_POLICY = "RETURN_POLICY",

  THANK_YOU = "THANK_YOU",

  UNKNOWN = "UNKNOWN",
}

export interface IntentRule {
  intent: IntentType;

  keywords: string[];

  examples?: string[];
}

export interface IntentResult {
  intent: IntentType;

  confidence: number;

  matchedKeywords: string[];
}