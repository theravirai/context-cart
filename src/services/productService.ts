import api from './api';
import type { Product, ProductsResponse, Category } from '../types/product';

export const productService = {
  getProducts: async (limit = 20, skip = 0, sortBy?: string, order?: 'asc' | 'desc'): Promise<ProductsResponse> => {
    let url = `/products?limit=${limit}&skip=${skip}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (order) url += `&order=${order}`;
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
  
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/products/category/${category}`);
    return response.data;
  },
  
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/products/search?q=${query}`);
    return response.data;
  }
};
