import { Request, Response, NextFunction } from 'express';
import { productService, GetProductsQuery, CreateProductDTO } from '../services/ProductService';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const getProducts = async (
  req: Request<unknown, unknown, unknown, GetProductsQuery>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, brand, search, gender, sort } = req.query;
    const products = await productService.getAll({ category, brand, search, gender, sort });
    
    res.json({
      success: true,
      data: products,
      message: products.length > 0 ? 'Products retrieved successfully' : 'No products found',
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request<unknown, unknown, CreateProductDTO>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, unknown, CreateProductDTO>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.update(id, req.body);
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await productService.delete(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await productService.getCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getBrands = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const brands = await productService.getBrands();
    res.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await productService.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
