import { Sneaker, ApiResponse } from '@/models';

export interface SneakerDTO {
  _id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  sizes: number[];
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export const sneakerAdapter = (data: unknown): Sneaker => {
  const response = data as ApiResponse<SneakerDTO[] | SneakerDTO>;
  
  if (Array.isArray(response.data)) {
    return transformSneaker(response.data[0]);
  }
  
  if (response.data && !Array.isArray(response.data)) {
    return transformSneaker(response.data);
  }
  
  throw new Error('Invalid sneaker data');
};

export const sneakersAdapter = (data: unknown): Sneaker[] => {
  const response = data as ApiResponse<SneakerDTO[]>;
  
  if (!response.data || !Array.isArray(response.data)) {
    return [];
  }
  
  return response.data.map(transformSneaker);
};

const transformSneaker = (sneaker: SneakerDTO): Sneaker => ({
  _id: sneaker._id,
  name: sneaker.name,
  brand: sneaker.brand,
  price: sneaker.price,
  description: sneaker.description,
  images: sneaker.images,
  sizes: sneaker.sizes,
  stock: sneaker.stock,
  createdAt: sneaker.createdAt || new Date().toISOString(),
  updatedAt: sneaker.updatedAt || new Date().toISOString(),
});

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
};
