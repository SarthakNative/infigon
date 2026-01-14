import { Product } from "@/types/product";


const API_BASE = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, {
    cache: 'force-cache',
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error(`Product ${id} not found: ${res.statusText}`);
  }
  
  return res.json();
}

// Helper to get unique categories
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/categories`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}