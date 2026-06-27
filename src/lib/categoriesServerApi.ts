// Add this interface and function to your existing productServerApi.ts

import { ProductsResponse } from "./productServerApi"

export interface Category {
  slug: string
  name: string
  url: string
}

// Fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://dummyjson.com/products/categories')
    if (!res.ok) throw new Error('Failed to fetch categories')
    return await res.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch products by category slug
export async function fetchProductsByCategory(categorySlug: string): Promise<ProductsResponse> {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${categorySlug}`)
    if (!res.ok) throw new Error('Failed to fetch category products')
    return await res.json()
  } catch (error) {
    console.error('Error fetching category products:', error)
    return { products: [], total: 0, skip: 0, limit: 0 }
  }
}