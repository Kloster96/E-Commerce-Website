import { Request, Response, NextFunction } from 'express';
import { galleryService } from '../services/GalleryService';

export const getSliderImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const images = await galleryService.getSliderImages();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const getGalleryImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const images = await galleryService.getGalleryImages();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const getAllGalleryImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const images = await galleryService.getAll();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const createGalleryImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const image = await galleryService.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const image = await galleryService.update(req.params.id, req.body);
    if (!image) {
      res.status(404).json({ success: false, error: 'Image not found' });
      return;
    }
    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await galleryService.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Image not found' });
      return;
    }
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleGalleryImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const image = await galleryService.toggleActive(req.params.id);
    if (!image) {
      res.status(404).json({ success: false, error: 'Image not found' });
      return;
    }
    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};
