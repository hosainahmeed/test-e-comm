export interface CatalogSubcategory {
  slug: string;
  label: string;
  badge?: string;
  keywords: string[];
  searchTerms?: string[];
}

export interface CatalogCategory {
  slug: string;
  label: string;
  icon: string;
  keywords: string[];
  searchTerms: string[];
  fallbackCategories: string[];
  subcategories: CatalogSubcategory[];
}

export const PRODUCT_CATALOG: CatalogCategory[] = [
  {
    slug: "hookahs",
    label: "Hookahs",
    icon: "🪈",
    keywords: ["hookah", "shisha", "pipe", "vase", "stem", "hose"],
    searchTerms: ["hookah", "vase", "decoration"],
    fallbackCategories: ["furniture", "home-decoration"],
    subcategories: [
      {
        slug: "complete-sets",
        label: "Complete Sets",
        badge: "Popular",
        keywords: ["set", "complete", "kit", "bundle"],
        searchTerms: ["set", "complete kit"],
      },
      {
        slug: "single-hose",
        label: "Single Hose",
        keywords: ["single", "hose", "one"],
        searchTerms: ["hose"],
      },
      {
        slug: "multi-hose",
        label: "Multi Hose",
        keywords: ["multi", "dual", "hose", "multiple"],
        searchTerms: ["dual hose"],
      },
      {
        slug: "mini-travel",
        label: "Mini & Travel",
        keywords: ["mini", "travel", "portable", "compact", "small"],
        searchTerms: ["mini", "portable"],
      },
      {
        slug: "premium",
        label: "Premium & Luxury",
        keywords: ["premium", "luxury", "gold", "deluxe", "pro"],
        searchTerms: ["premium", "luxury"],
      },
      {
        slug: "traditional",
        label: "Traditional",
        keywords: ["traditional", "classic", "handmade", "artisan"],
        searchTerms: ["traditional", "classic"],
      },
    ],
  },
  {
    slug: "shisha",
    label: "Shisha",
    icon: "🍃",
    keywords: ["shisha", "tobacco", "flavor", "flavour", "molasses", "smoke"],
    searchTerms: ["fragrance", "scent", "flavor"],
    fallbackCategories: ["groceries", "fragrances"],
    subcategories: [
      {
        slug: "fruity",
        label: "Fruity Flavors",
        badge: "New",
        keywords: ["fruit", "fruity", "berry", "mango", "apple", "grape"],
        searchTerms: ["fruit", "berry"],
      },
      {
        slug: "mint",
        label: "Mint & Menthol",
        keywords: ["mint", "menthol", "cool", "ice"],
        searchTerms: ["mint", "menthol"],
      },
      {
        slug: "floral",
        label: "Floral & Exotic",
        keywords: ["floral", "flower", "exotic", "rose", "jasmine"],
        searchTerms: ["floral", "flower"],
      },
      {
        slug: "double-apple",
        label: "Double Apple",
        keywords: ["apple", "double apple", "anise"],
        searchTerms: ["apple"],
      },
      {
        slug: "al-fakher",
        label: "Brand: Al Fakher",
        keywords: ["al fakher", "fakher"],
        searchTerms: ["premium"],
      },
      {
        slug: "starbuzz",
        label: "Brand: Starbuzz",
        keywords: ["starbuzz", "blue mist"],
        searchTerms: ["blue"],
      },
    ],
  },
  {
    slug: "accessories",
    label: "Accessories",
    icon: "🔧",
    keywords: ["accessory", "bowl", "hose", "mouthpiece", "charcoal", "heat"],
    searchTerms: ["accessories", "bowl", "kitchen"],
    fallbackCategories: ["kitchen-accessories", "mobile-accessories", "sports-accessories"],
    subcategories: [
      {
        slug: "bowls",
        label: "Bowls",
        keywords: ["bowl", "phunnel", "clay", "ceramic"],
        searchTerms: ["bowl"],
      },
      {
        slug: "hoses",
        label: "Hoses",
        keywords: ["hose", "silicone", "tube", "pipe"],
        searchTerms: ["hose"],
      },
      {
        slug: "mouthpieces",
        label: "Mouthpieces",
        keywords: ["mouthpiece", "tip", "mouth"],
        searchTerms: ["tip"],
      },
      {
        slug: "heat-management",
        label: "Heat Management",
        badge: "Hot",
        keywords: ["heat", "lotus", "kaloud", "management", "coal"],
        searchTerms: ["heat"],
      },
      {
        slug: "charcoal",
        label: "Charcoal",
        keywords: ["charcoal", "coal", "coconut", "natural"],
        searchTerms: ["coal"],
      },
      {
        slug: "cleaning",
        label: "Cleaning Supplies",
        keywords: ["clean", "brush", "wash", "maintenance"],
        searchTerms: ["clean", "brush"],
      },
    ],
  },
  {
    slug: "parts",
    label: "Parts",
    icon: "⚙️",
    keywords: ["part", "stem", "base", "grommet", "valve", "tray", "shaft"],
    searchTerms: ["parts", "motor", "vehicle"],
    fallbackCategories: ["vehicle", "motorcycle"],
    subcategories: [
      {
        slug: "stems",
        label: "Stems & Shafts",
        keywords: ["stem", "shaft", "pipe"],
        searchTerms: ["stem"],
      },
      {
        slug: "bases",
        label: "Bases & Vases",
        keywords: ["base", "vase", "glass", "jar"],
        searchTerms: ["vase", "glass"],
      },
      {
        slug: "grommets",
        label: "Grommets & Seals",
        keywords: ["grommet", "seal", "ring", "rubber"],
        searchTerms: ["seal", "ring"],
      },
      {
        slug: "valves",
        label: "Valves & Purge",
        keywords: ["valve", "purge", "ball bearing"],
        searchTerms: ["valve"],
      },
      {
        slug: "tray-top",
        label: "Tray & Top",
        keywords: ["tray", "top", "ash", "plate"],
        searchTerms: ["tray", "plate"],
      },
    ],
  },
  {
    slug: "gifts",
    label: "Gifts & More",
    icon: "🎁",
    keywords: ["gift", "kit", "starter", "merch", "card", "bundle"],
    searchTerms: ["gift", "bag", "jewellery"],
    fallbackCategories: ["womens-bags", "womens-jewellery"],
    subcategories: [
      {
        slug: "gift-cards",
        label: "Gift Cards",
        badge: "New",
        keywords: ["gift card", "voucher", "credit"],
        searchTerms: ["gift"],
      },
      {
        slug: "gift-sets",
        label: "Gift Sets",
        keywords: ["gift set", "bundle", "box", "collection"],
        searchTerms: ["gift set", "bundle"],
      },
      {
        slug: "merch",
        label: "Branded Merch",
        keywords: ["merch", "brand", "logo", "shirt", "cap"],
        searchTerms: ["shirt", "brand"],
      },
      {
        slug: "starter-kits",
        label: "Starter Kits",
        keywords: ["starter", "beginner", "kit", "essentials"],
        searchTerms: ["starter kit", "essentials"],
      },
    ],
  },
];

export function getCategoryHref(slug: string): string {
  return `/products/${slug}`;
}

export function getSubcategoryHref(
  categorySlug: string,
  subcategorySlug: string,
): string {
  return `/products/${categorySlug}/${subcategorySlug}`;
}

export function getCatalogCategory(slug: string): CatalogCategory | undefined {
  return PRODUCT_CATALOG.find((category) => category.slug === slug);
}

export function getCatalogSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): CatalogSubcategory | undefined {
  return getCatalogCategory(categorySlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug,
  );
}

export function slugToLabel(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** Header-compatible shape derived from the shared catalog */
export function getHeaderCategories() {
  return PRODUCT_CATALOG.map((category) => ({
    label: category.label,
    href: getCategoryHref(category.slug),
    icon: category.icon,
    subcategories: category.subcategories.map((subcategory) => ({
      label: subcategory.label,
      href: getSubcategoryHref(category.slug, subcategory.slug),
      badge: subcategory.badge,
    })),
  }));
}
