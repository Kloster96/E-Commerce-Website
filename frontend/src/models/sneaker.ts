export interface Sneaker {
  _id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  sizes: number[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface SneakerFilters {
  brand?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
