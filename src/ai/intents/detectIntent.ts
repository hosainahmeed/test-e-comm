import { INTENT_RULES } from "./intentRules";
import { IntentResult, IntentType } from "../types/Intent";

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

export function detectIntent(message: string): IntentResult {
  const text = normalize(message);

  let bestIntent = IntentType.UNKNOWN;
  let bestScore = 0;
  let matchedKeywords: string[] = [];

  for (const rule of INTENT_RULES) {
    const matches = rule.keywords.filter((keyword) => text.includes(keyword));

    if (matches.length > bestScore) {
      bestScore = matches.length;
      bestIntent = rule.intent;
      matchedKeywords = matches;
    }
  }

  if (bestScore === 0) {
    return {
      intent: IntentType.UNKNOWN,
      confidence: 0,
      matchedKeywords: [],
    };
  }

  return {
    intent: bestIntent,
    confidence: Math.min(bestScore / 3, 1),
    matchedKeywords,
  };
}
