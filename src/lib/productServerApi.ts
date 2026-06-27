// Types based on DummyJSON API response
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "rating" | "title";
  order?: "asc" | "desc";
  limit?: number;
  skip?: number;
  search?: string;
}

const API_BASE_URL = "https://dummyjson.com";

// Fetch all products with filters
export async function fetchAllProducts(
  filters?: ProductFilters,
): Promise<ProductsResponse> {
  try {
    let url = `${API_BASE_URL}/products`;

    // Handle search
    if (filters?.search) {
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(filters.search)}`;
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.skip) params.append("skip", filters.skip.toString());
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.order) params.append("order", filters.order);

    const queryString = params.toString();
    const fullUrl = `${url}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    // Apply client-side filters (for category, price range)
    let filteredProducts = data.products as Product[];

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === filters.category?.toLowerCase(),
      );
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= filters.minPrice!,
      );
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= filters.maxPrice!,
      );
    }

    return {
      products: filteredProducts,
      total: filteredProducts.length,
      skip: filters?.skip || 0,
      limit: filters?.limit || filteredProducts.length,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

// Fetch single product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(
  category: string,
): Promise<ProductsResponse> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
    );
    if (!res.ok) throw new Error("Failed to fetch category products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching category products:", error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

// Search products
export async function searchProducts(query: string): Promise<ProductsResponse> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error("Failed to search products");
    return await res.json();
  } catch (error) {
    console.error("Error searching products:", error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}
