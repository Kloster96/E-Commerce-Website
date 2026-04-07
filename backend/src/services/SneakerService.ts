import { Sneaker, ISneaker, ISneakerDocument } from '../models';

export interface GetSneakersQuery {
  brand?: string;
  search?: string;
}

export interface CreateSneakerDTO extends Omit<ISneaker, '_id' | 'createdAt' | 'updatedAt'> {}

export class SneakerService {
  async getAll(query: GetSneakersQuery): Promise<ISneakerDocument[]> {
    const filter: Record<string, unknown> = {};
    
    if (query.brand) {
      filter.brand = query.brand;
    }
    
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { brand: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }
    
    return Sneaker.find(filter).sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<ISneakerDocument | null> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    return Sneaker.findById(id);
  }

  async create(data: CreateSneakerDTO): Promise<ISneakerDocument> {
    const sneaker = new Sneaker(data);
    return sneaker.save();
  }

  async update(id: string, data: Partial<CreateSneakerDTO>): Promise<ISneakerDocument | null> {
    return Sneaker.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Sneaker.findByIdAndDelete(id);
    return result !== null;
  }
}

export const sneakerService = new SneakerService();
