export interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand?: string;
  discountPercentage?: number;
  rating?: number;
  thumbnail?: string;
  images?: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
