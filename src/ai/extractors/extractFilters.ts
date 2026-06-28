import { ProductFilters } from "../types/ProductFilters";

const STOP_WORDS = new Set([
  "i",
  "me",
  "my",
  "need",
  "want",
  "looking",
  "for",
  "find",
  "show",
  "give",
  "a",
  "an",
  "the",
  "with",
  "of",
  "to",
  "under",
  "below",
  "above",
  "between",
  "and",
]);

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function extractMaxPrice(text: string): number | undefined {
  const patterns = [
    /under\s+(\d+)/i,
    /below\s+(\d+)/i,
    /less than\s+(\d+)/i,
    /max\s+(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return Number(match[1]);
    }
  }

  return undefined;
}

function extractMinPrice(text: string): number | undefined {
  const patterns = [
    /above\s+(\d+)/i,
    /over\s+(\d+)/i,
    /more than\s+(\d+)/i,
    /min\s+(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return Number(match[1]);
    }
  }

  return undefined;
}

function extractKeywords(text: string): string[] {
  return text
    .split(/\s+/)
    .map(word => word.replace(/[^\w]/g, ""))
    .filter(Boolean)
    .filter(word => !STOP_WORDS.has(word))
    .filter(word => !/^\d+$/.test(word));
}

export function extractFilters(message: string): ProductFilters {
  const text = normalize(message);

  return {
    query: message,

    keywords: extractKeywords(text),

    minPrice: extractMinPrice(text),

    maxPrice: extractMaxPrice(text),
  };
}