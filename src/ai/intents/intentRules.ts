import { IntentRule, IntentType } from "../types/Intent";

export const INTENT_RULES: IntentRule[] = [
  {
    intent: IntentType.GREETING,
    keywords: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ],
  },

  {
    intent: IntentType.SEARCH_PRODUCT,
    keywords: [
      "find",
      "search",
      "looking",
      "need",
      "want",
      "buy",
      "show",
    ],
  },

  {
    intent: IntentType.SEARCH_CATEGORY,
    keywords: [
      "category",
      "categories",
    ],
  },

  {
    intent: IntentType.SEARCH_BRAND,
    keywords: [
      "brand",
    ],
  },

  {
    intent: IntentType.COMPARE_PRODUCTS,
    keywords: [
      "compare",
      "comparison",
      "difference",
      "vs",
      "versus",
    ],
  },

  {
    intent: IntentType.RECOMMEND_PRODUCTS,
    keywords: [
      "recommend",
      "suggest",
      "best",
      "top",
    ],
  },

  {
    intent: IntentType.RELATED_PRODUCTS,
    keywords: [
      "similar",
      "related",
      "alternative",
    ],
  },

  {
    intent: IntentType.PRICE_QUERY,
    keywords: [
      "price",
      "cost",
      "cheap",
      "expensive",
      "under",
      "below",
      "above",
    ],
  },

  {
    intent: IntentType.PRODUCT_DETAILS,
    keywords: [
      "details",
      "feature",
      "features",
      "spec",
      "specification",
    ],
  },

  {
    intent: IntentType.ORDER_STATUS,
    keywords: [
      "track",
      "tracking",
      "order",
      "shipment",
    ],
  },

  {
    intent: IntentType.SHIPPING_INFO,
    keywords: [
      "shipping",
      "delivery",
      "shipping charge",
      "delivery charge",
    ],
  },

  {
    intent: IntentType.RETURN_POLICY,
    keywords: [
      "return",
      "refund",
      "exchange",
      "replace",
    ],
  },

  {
    intent: IntentType.THANK_YOU,
    keywords: [
      "thanks",
      "thank you",
    ],
  },
];