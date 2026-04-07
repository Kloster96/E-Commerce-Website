import { Sneaker, SneakerFilters, ApiResponse } from '@/models';
import { sneakersAdapter, sneakerAdapter } from '@/adapters';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class SneakerService {
  async getAll(filters?: SneakerFilters & { search?: string }): Promise<Sneaker[]> {
    const params = new URLSearchParams();
    
    if (filters?.brand) {
      params.append('brand', filters.brand);
    }
    
    if (filters?.search) {
      params.append('search', filters.search);
    }
    
    const url = `${API_URL}/api/sneakers${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sneakers');
    }
    
    const data = await response.json();
    return sneakersAdapter(data);
  }

  async getById(id: string): Promise<Sneaker> {
    const response = await fetch(`${API_URL}/api/sneakers/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sneaker');
    }
    
    const data = await response.json();
    return sneakerAdapter(data);
  }
}

export const sneakerService = new SneakerService();
