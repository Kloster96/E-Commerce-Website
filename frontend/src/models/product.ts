export interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  sizes: string[];
  stockBySize?: Record<string, number>;
  gender?: string;
  colors?: {
    name: string;
    images: string[];
  }[];
  sales: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper para obtener stock total desde stockBySize
export const getTotalStock = (product: Product): number => {
  if (!product.stockBySize) return 0;
  return Object.values(product.stockBySize).reduce((sum, qty) => sum + (qty || 0), 0);
};

// Helper para ordenar talles correctamente (numéricos y después letras)
export const sortSizes = (sizes: string[]): string[] => {
  return [...sizes].sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    // Ambos son números
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    // Ordenar alfabéticamente si no son números
    return a.localeCompare(b);
  });
};

export interface ProductFilters {
  category?: string;
  brand?: string;
  gender?: string;
  search?: string;
  sort?: string;
  onSale?: boolean;
  featured?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const getDiscountedPrice = (product: Product): number => {
  if (product.discount > 0) {
    return Math.round(product.price * (1 - product.discount / 100));
  }
  return product.price;
};

export const formatDiscount = (discount: number): string => {
  return `-${discount}%`;
};
