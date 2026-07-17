// import blackFront from "@/assets/black-front.jpg";
// import blackBack from "@/assets/black-back.jpg";
// import blackModel from "@/assets/black-model.jpg";
// import whiteFront from "@/assets/white-front.jpg";
// import whiteBack from "@/assets/white-back.jpg";
// import whiteModel from "@/assets/white-model.jpg";
// import related1 from "@/assets/related-1.jpg";
// import related2 from "@/assets/related-2.jpg";
// import related3 from "@/assets/related-3.jpg";
// import related4 from "@/assets/related-4.jpg";

export type AttributeValue = {
  slug?: string;
  label: string;
  hex?: string;
  imageGroup?: string;
};

export type Attribute = {
  name: string;
  slug: string;
  type: "color" | "text" | string;
  filterable?: boolean;
  values: AttributeValue[];
};

export type Variant = {
  id: string;
  sku: string;
  imageGroup?: string;
  price: { mrp: number; selling: number; currency: string };
  inventory: { stock: number; available: boolean };
  attributes: Record<string, string>;
};

export type ImageGroup = {
  id: string;
  label: string;
  color?: string;
  images: string[];
};

export type RelatedProduct = {
  id: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  mrp?: number;
  rating: number;
  badge?: string;
};

export type ProductData = {
  product: {
    _id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    brand: { id: string; name: string };
    category: { id: string; name: string };
    subCategory: { id: string; name: string };
    collections: string[];
    tags: string[];
    gender?: string;
    countryOfOrigin?: string;
    material?: string;
    fit?: string;
    status: string;
    highlights?: string[];
    specifications?: Array<{ label: string; value: string }>;
    faq?: Array<{ q: string; a: string }>;
  };
  media: { thumbnail: string; imageGroups: ImageGroup[] };
  attributes: Attribute[];
  variants: Variant[];
  reviewSummary: {
    average: number;
    totalReviews: number;
    distribution: Record<string, number>;
    latest?: Array<{
      id: string;
      name: string;
      rating: number;
      title: string;
      body: string;
      date: string;
      images?: string[];
      verified?: boolean;
    }>;
  };
  marketing: {
    badges: string[];
    flashSale?: { enabled: boolean; endsAt: string };
  };
  analytics: { views: number; sold: number; wishlist: number };
  shipping: {
    freeShipping: boolean;
    estimatedDelivery: string;
    cashOnDelivery: boolean;
    location?: string;
  };
  returnPolicy: { days: number; exchange: boolean; refund?: string };
  relatedProducts: RelatedProduct[];
  recommendations: RelatedProduct[];
  recentlyViewed: RelatedProduct[];
};

export const productData: ProductData = {
  product: {
    _id: "prd_001",
    slug: "premium-oversized-cotton-tshirt",
    title: "Premium Oversized Cotton T-Shirt",
    shortDescription:
      "Premium heavyweight oversized t-shirt made from 100% combed cotton.",
    description:
      "Designed for everyday comfort with a modern oversized fit. Made from breathable premium cotton that stays soft after multiple washes. Reinforced seams, ribbed crew neck, and pre-shrunk fabric ensure a long-lasting drape and shape retention.",
    brand: { id: "brand001", name: "Urban Wear" },
    category: { id: "cat001", name: "Men" },
    subCategory: { id: "sub001", name: "T-Shirts" },
    collections: ["Summer Collection", "New Arrival"],
    tags: ["Oversized", "Streetwear", "Cotton"],
    gender: "MEN",
    countryOfOrigin: "Bangladesh",
    material: "100% Combed Cotton",
    fit: "Oversized",
    status: "ACTIVE",
    highlights: [
      "240 GSM heavyweight combed cotton",
      "Pre-shrunk, garment-washed for soft hand-feel",
      "Reinforced shoulder taping & double-needle hems",
      "Drop-shoulder oversized silhouette",
      "Ribbed crew neck holds shape wash after wash",
    ],
    specifications: [
      { label: "Material", value: "100% Combed Cotton" },
      { label: "Weight", value: "240 GSM" },
      { label: "Fit", value: "Oversized" },
      { label: "Neck", value: "Crew" },
      { label: "Sleeve", value: "Short, Drop-shoulder" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
      { label: "Country of Origin", value: "Bangladesh" },
      { label: "SKU Prefix", value: "TS" },
    ],
    faq: [
      {
        q: "Does this t-shirt shrink after washing?",
        a: "The fabric is pre-shrunk and garment-washed. Expect less than 3% shrinkage when washed cold and tumble-dried low.",
      },
      {
        q: "How does the oversized fit run?",
        a: "It runs true to the oversized silhouette. If you prefer a regular fit, size down one.",
      },
      {
        q: "Is cash on delivery available?",
        a: "Yes, COD is available across all serviceable locations with no extra charge.",
      },
      {
        q: "Can I exchange the size after delivery?",
        a: "Yes, free size exchange is available within 7 days of delivery.",
      },
    ],
  },
  media: {
    thumbnail:
      "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
    imageGroups: [
      {
        id: "black",
        label: "Black",
        color: "#111111",
        images: [
          "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
          "https://api.divandione.com/uploads/img/1781470955909-9060-3414_1.webp",
          "https://api.divandione.com/uploads/img/1781470977702-9060-3413_1.webp",
        ],
      },
      {
        id: "white",
        label: "White",
        color: "#F4F1EA",
        images: [
          "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
          "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
          "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
        ],
      },
    ],
  },
  attributes: [
    {
      name: "Color",
      slug: "color",
      type: "color",
      filterable: true,
      values: [
        { slug: "black", label: "Black", hex: "#111111", imageGroup: "black" },
        { slug: "white", label: "Ivory", hex: "#F4F1EA", imageGroup: "white" },
      ],
    },
    {
      name: "Size",
      slug: "size",
      type: "text",
      filterable: true,
      values: [
        { slug: "s", label: "S" },
        { slug: "m", label: "M" },
        { slug: "l", label: "L" },
        { slug: "xl", label: "XL" },
        { slug: "xxl", label: "XXL" },
      ],
    },
  ],
  variants: [
    {
      id: "v1",
      sku: "TS-BLK-S",
      imageGroup: "black",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 20, available: true },
      attributes: { color: "black", size: "s" },
    },
    {
      id: "v2",
      sku: "TS-BLK-M",
      imageGroup: "black",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 12, available: true },
      attributes: { color: "black", size: "m" },
    },
    {
      id: "v3",
      sku: "TS-BLK-L",
      imageGroup: "black",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 4, available: true },
      attributes: { color: "black", size: "l" },
    },
    {
      id: "v4",
      sku: "TS-BLK-XL",
      imageGroup: "black",
      price: { mrp: 1100, selling: 899, currency: "BDT" },
      inventory: { stock: 0, available: false },
      attributes: { color: "black", size: "xl" },
    },
    {
      id: "v5",
      sku: "TS-BLK-XXL",
      imageGroup: "black",
      price: { mrp: 1100, selling: 899, currency: "BDT" },
      inventory: { stock: 6, available: true },
      attributes: { color: "black", size: "xxl" },
    },
    {
      id: "v6",
      sku: "TS-WHT-S",
      imageGroup: "white",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 9, available: true },
      attributes: { color: "white", size: "s" },
    },
    {
      id: "v7",
      sku: "TS-WHT-M",
      imageGroup: "white",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 15, available: true },
      attributes: { color: "white", size: "m" },
    },
    {
      id: "v8",
      sku: "TS-WHT-L",
      imageGroup: "white",
      price: { mrp: 1050, selling: 850, currency: "BDT" },
      inventory: { stock: 0, available: false },
      attributes: { color: "white", size: "l" },
    },
    {
      id: "v9",
      sku: "TS-WHT-XL",
      imageGroup: "white",
      price: { mrp: 1100, selling: 899, currency: "BDT" },
      inventory: { stock: 7, available: true },
      attributes: { color: "white", size: "xl" },
    },
    {
      id: "v10",
      sku: "TS-WHT-XXL",
      imageGroup: "white",
      price: { mrp: 1100, selling: 899, currency: "BDT" },
      inventory: { stock: 3, available: true },
      attributes: { color: "white", size: "xxl" },
    },
  ],
  reviewSummary: {
    average: 4.8,
    totalReviews: 248,
    distribution: { "5": 180, "4": 48, "3": 15, "2": 3, "1": 2 },
    latest: [
      {
        id: "r1",
        name: "Aarav S.",
        rating: 5,
        title: "Worth every taka",
        body: "The fabric is thick, soft, and the oversized cut is perfect. Washed three times — no shrinkage, no fading.",
        date: "2026-06-12",
        verified: true,
      },
      {
        id: "r2",
        name: "Nadia R.",
        rating: 5,
        title: "Premium feel",
        body: "Honestly better than tees I've bought for double the price. Stitching is clean and the drop-shoulder sits beautifully.",
        date: "2026-05-28",
        verified: true,
      },
      {
        id: "r3",
        name: "Imran K.",
        rating: 4,
        title: "Great tee, runs big",
        body: "Quality is excellent. Sized down to M from my usual L and it fits exactly how I wanted.",
        date: "2026-05-14",
        verified: true,
      },
    ],
  },
  marketing: {
    badges: ["Best Seller", "Trending", "Flash Sale"],
    flashSale: {
      enabled: true,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    },
  },
  analytics: { views: 24000, sold: 1500, wishlist: 900 },
  shipping: {
    freeShipping: true,
    estimatedDelivery: "2–4 Days",
    cashOnDelivery: true,
    location: "Dhaka, Bangladesh",
  },
  returnPolicy: {
    days: 7,
    exchange: true,
    refund:
      "Full refund to original payment method within 5 business days of pickup.",
  },
  relatedProducts: [
    {
      id: "rp1",
      title: "Essential Cotton Tee — 3 Pack",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 2200,
      mrp: 2700,
      rating: 4.7,
      badge: "Bundle",
    },
    {
      id: "rp2",
      title: "Heavyweight Fleece Hoodie",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 2450,
      mrp: 2950,
      rating: 4.6,
    },
    {
      id: "rp3",
      title: "Tapered Jogger Pants",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 1850,
      mrp: 2200,
      rating: 4.5,
    },
    {
      id: "rp4",
      title: "Low-Top Court Sneakers",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 3450,
      mrp: 3900,
      rating: 4.8,
      badge: "New",
    },
  ],
  recommendations: [
    {
      id: "rc1",
      title: "Boxy Crew Tee — Ivory",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 950,
      mrp: 1150,
      rating: 4.6,
      badge: "Trending",
    },
    {
      id: "rc2",
      title: "Cropped Pullover Hoodie",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 2150,
      mrp: 2600,
      rating: 4.4,
    },
    {
      id: "rc3",
      title: "Relaxed Sweatpants",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 1650,
      rating: 4.5,
    },
    {
      id: "rc4",
      title: "Minimal Leather Sneakers",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 3950,
      mrp: 4500,
      rating: 4.9,
      badge: "Best Seller",
    },
  ],
  recentlyViewed: [
    {
      id: "rv1",
      title: "Oversized Graphic Tee",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 1050,
      rating: 4.3,
    },
    {
      id: "rv2",
      title: "Classic Crew Tee",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 750,
      mrp: 950,
      rating: 4.6,
    },
    {
      id: "rv3",
      title: "Court Sneakers — Cream",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 3450,
      rating: 4.7,
    },
    {
      id: "rv4",
      title: "Slim Jogger",
      brand: "Urban Wear",
      image:
        "https://api.divandione.com/uploads/img/1781470929990-9060-3415_1.webp",
      price: 1750,
      rating: 4.4,
    },
  ],
};
