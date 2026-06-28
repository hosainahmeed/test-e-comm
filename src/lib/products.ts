export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
}

/**
 * SINGLE DATA ACCESS LAYER
 * Later: replace this with your own backend / DB / search API
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products;
  } catch (error) {
    console.error("getAllProducts error:", error);
    return [];
  }
}
