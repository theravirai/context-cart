import api from './api';
import type { Product, ProductsResponse, Category, ProductInput } from '../types/product';

export const productService = {
  getProducts: async (
    limit = 20,
    skip = 0,
    sortBy?: string,
    order?: 'asc' | 'desc',
    category?: string,
    search?: string
  ): Promise<ProductsResponse> => {
    // Normalize legacy sort field names
    const normalizedSortBy = sortBy === 'meta.createdAt' ? 'createdAt' : sortBy;

    let url = `/products?limit=${limit}&skip=${skip}`;
    if (normalizedSortBy) url += `&sortBy=${encodeURIComponent(normalizedSortBy)}`;
    if (order) url += `&order=${order}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const response = await api.get<ProductsResponse>(url);
    return response.data;
  },

  getProductById: async (id: number | string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/products/categories');
    return response.data;
  },

  getProductsByCategory: async (category: string, limit = 50, skip = 0): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(
      `/products?category=${encodeURIComponent(category)}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(
      `/products?search=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  createProduct: async (productData: ProductInput): Promise<{ message: string; product: Product }> => {
    const response = await api.post<{ message: string; product: Product }>('/products', productData);
    return response.data;
  },

  updateProduct: async (
    id: number | string,
    productData: Partial<ProductInput>
  ): Promise<{ message: string; product: Product }> => {
    const response = await api.put<{ message: string; product: Product }>(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: number | string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/products/${id}`);
    return response.data;
  },
};
