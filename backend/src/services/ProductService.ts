import { Product, IProduct, IProductDocument } from '../models/Product';

export interface GetProductsQuery {
  category?: string;
  brand?: string;
  search?: string;
  gender?: string;
  sort?: string;
  onSale?: boolean;
  featured?: boolean;
}

export interface CreateProductDTO extends Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'> {}

export class ProductService {
  async getAll(query: GetProductsQuery): Promise<IProductDocument[]> {
    const filter: Record<string, unknown> = {};
    
    if (query.category) {
      filter.category = query.category;
    }
    
    if (query.brand) {
      filter.brand = query.brand;
    }
    
    if (query.gender) {
      filter.gender = query.gender;
    }
    
    if (query.onSale) {
      filter.discount = { $gt: 0 };
    }
    
    if (query.featured) {
      filter.featured = true;
    }
    
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { brand: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }
    
    let sortOption: any = { createdAt: -1 };
    if (query.sort === 'price_asc') sortOption = { price: 1 };
    if (query.sort === 'price_desc') sortOption = { price: -1 };
    if (query.sort === 'name') sortOption = { name: 1 };
    if (query.sort === 'discount') sortOption = { discount: -1 };
    if (query.sort === 'popular') sortOption = { sales: -1 };
    if (query.sort === 'newest') sortOption = { createdAt: -1 };
    
    return Product.find(filter).sort(sortOption);
  }

  async getById(id: string): Promise<IProductDocument | null> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }
    return Product.findById(id);
  }

  async create(data: CreateProductDTO): Promise<IProductDocument> {
    const product = new Product(data);
    return product.save();
  }

  async update(id: string, data: Partial<CreateProductDTO>): Promise<IProductDocument | null> {
    return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }

  async incrementSales(id: string, quantity: number): Promise<void> {
    await Product.findByIdAndUpdate(id, { $inc: { sales: quantity } });
  }

  async getCategories(): Promise<string[]> {
    return Product.distinct('category');
  }

  async getBrands(): Promise<string[]> {
    return Product.distinct('brand');
  }

  async getStats(): Promise<any> {
    const [totalProducts, stockByCategory, productsByCategory, onSaleCount] = await Promise.all([
      Product.countDocuments(),
      Product.aggregate([
        { $group: { _id: '$category', totalStock: { $sum: '$stock' } } },
      ]),
      Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      Product.countDocuments({ discount: { $gt: 0 } }),
    ]);

    return {
      totalProducts,
      stockByCategory,
      productsByCategory,
      onSaleCount,
    };
  }
}

export const productService = new ProductService();
