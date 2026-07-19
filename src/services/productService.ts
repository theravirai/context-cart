import api from './api';
import { Product, ProductsResponse, Category } from '../types/product';

export const productService = {
  getProducts: async (limit = 20, skip = 0): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
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
