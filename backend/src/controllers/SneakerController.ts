import { Request, Response, NextFunction } from 'express';
import { sneakerService, GetSneakersQuery, CreateSneakerDTO } from '../services';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const getSneakers = async (
  req: Request<unknown, unknown, unknown, GetSneakersQuery>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { brand, search } = req.query;
    const sneakers = await sneakerService.getAll({ brand, search });
    
    res.json({
      success: true,
      data: sneakers,
      message: sneakers.length > 0 ? 'Sneakers retrieved successfully' : 'No sneakers found',
    });
  } catch (error) {
    next(error);
  }
};

export const getSneakerById = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const sneaker = await sneakerService.getById(id);
    
    if (!sneaker) {
      res.status(404).json({
        success: false,
        error: 'Sneaker not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: sneaker,
    });
  } catch (error) {
    next(error);
  }
};

export const createSneaker = async (
  req: Request<unknown, unknown, CreateSneakerDTO>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const sneaker = await sneakerService.create(req.body);
    
    res.status(201).json({
      success: true,
      data: sneaker,
      message: 'Sneaker created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateSneaker = async (
  req: Request<{ id: string }, unknown, CreateSneakerDTO>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const sneaker = await sneakerService.update(id, req.body);
    
    if (!sneaker) {
      res.status(404).json({
        success: false,
        error: 'Sneaker not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: sneaker,
      message: 'Sneaker updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSneaker = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await sneakerService.delete(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Sneaker not found',
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Sneaker deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
