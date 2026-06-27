export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  image: string;
  description: string;
  productCount: number;
  rating: number;
  featured: boolean;
  trending: boolean;
  verified: boolean;
  categories: string[];
  country: string;
  established: number;
  bestSeller: string;
  discount: number;
  searchTerms: string[];
  keywords: string[];
}

export const BRAND_CATALOG: Brand[] = [
  {
    id: 1,
    name: "Al Fakher",
    slug: "al-fakher",
    logo: "https://smokkkin.in/wp-content/uploads/2018/04/Al-Fakher-Logo.png",
    image: "https://smokkkin.in/wp-content/uploads/2018/04/Al-Fakher-Logo.png",
    description: "World's leading shisha tobacco manufacturer",
    productCount: 145,
    rating: 4.8,
    featured: true,
    trending: true,
    verified: true,
    categories: ["Shisha Tobacco", "Accessories"],
    country: "UAE",
    established: 1999,
    bestSeller: "Double Apple Flavor",
    discount: 15,
    searchTerms: ["al fakher", "fakher", "double apple", "shisha"],
    keywords: ["al fakher", "fakher", "double apple", "tobacco", "shisha"],
  },
  {
    id: 2,
    name: "Starbuzz",
    slug: "starbuzz",
    logo: "https://www.shishagoods.co.uk/wp-content/uploads/2023/02/image-17-687x400.png",
    image:
      "https://d111ai8eht49ae.cloudfront.net/logo_image_67bd1e130d7dab834e94e94f8ecbd415.png",
    description: "Premium American hookah tobacco brand",
    productCount: 98,
    rating: 4.7,
    featured: true,
    trending: false,
    verified: true,
    categories: ["Shisha Tobacco", "Hookah Pipes"],
    country: "USA",
    established: 2005,
    bestSeller: "Blue Mist",
    discount: 10,
    searchTerms: ["starbuzz", "blue mist", "shisha"],
    keywords: ["starbuzz", "blue mist", "tobacco", "shisha"],
  },
  {
    id: 3,
    name: "KM Hookah",
    slug: "km-hookah",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGiIaZE2IG9xUeM6tVO3AiEGqdy16xHG6j4Lh_9n-xbUR9LaD8E5tq6vZ&s=10",
    image:
      "https://khalilmamoon.com/cdn/shop/t/10/assets/logo.png?v=60991916144139236371583882917",
    description: "Traditional Egyptian hookah craftsmanship",
    productCount: 67,
    rating: 4.9,
    featured: true,
    trending: true,
    verified: true,
    categories: ["Hookah Pipes", "Accessories"],
    country: "Egypt",
    established: 1980,
    bestSeller: "KM Classic",
    discount: 20,
    searchTerms: ["khalil mamoon", "km hookah", "hookah", "egyptian"],
    keywords: ["khalil", "mamoon", "km", "hookah", "egyptian"],
  },
  {
    id: 4,
    name: "Coco Nara",
    slug: "coco-nara",
    logo: "/uploads/brands/coco-nara-logo.png",
    image:
      "https://thesmokefather.com/cdn/shop/products/CocoNaraCoals60Pieces5_800x.png?v=1608885931",
    description: "Natural coconut charcoal specialists",
    productCount: 34,
    rating: 4.6,
    featured: false,
    trending: true,
    verified: true,
    categories: ["Charcoal", "Accessories"],
    country: "Indonesia",
    established: 2010,
    bestSeller: "Flat Charcoal 72pc",
    discount: 0,
    searchTerms: ["coco nara", "coconut charcoal", "charcoal"],
    keywords: ["coco", "nara", "coconut", "charcoal", "coal"],
  },
  {
    id: 5,
    name: "Amy Deluxe",
    slug: "amy-deluxe",
    logo: "/uploads/brands/amy-deluxe-logo.png",
    image:
      "https://fair-smoke.com/cdn/shop/collections/Design_ohne_Titel_58.png?v=1733770155",
    description: "German engineering meets hookah design",
    productCount: 89,
    rating: 4.7,
    featured: true,
    trending: false,
    verified: true,
    categories: ["Hookah Pipes", "Glass Hookahs"],
    country: "Germany",
    established: 2008,
    bestSeller: "Amy Deluxe SS09",
    discount: 25,
    searchTerms: ["amy deluxe", "hookah", "glass hookah"],
    keywords: ["amy", "deluxe", "hookah", "glass"],
  },
  {
    id: 6,
    name: "Fumari",
    slug: "fumari",
    logo: "/uploads/brands/fumari-logo.png",
    image:
      "https://files.elfsight.com/storage/eafe4a4d-3436-495d-b748-5bdce62d911d/6ce432d8-9857-4758-89f2-e011468183d6/Master-Logo-Color-age.png",
    description: "Premium flavored shisha from California",
    productCount: 56,
    rating: 4.5,
    featured: false,
    trending: false,
    verified: true,
    categories: ["Shisha Tobacco"],
    country: "USA",
    established: 1997,
    bestSeller: "White Gummi Bear",
    discount: 5,
    searchTerms: ["fumari", "gummi bear", "shisha", "flavor"],
    keywords: ["fumari", "gummi", "shisha", "tobacco", "flavor"],
  },
];

export function getBrandHref(slug: string): string {
  return `/brands/${slug}`;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRAND_CATALOG.find((brand) => brand.slug === slug);
}
