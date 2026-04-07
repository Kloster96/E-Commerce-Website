import { GalleryImage, IGalleryImage, IGalleryImageDocument } from '../models/GalleryImage';

export class GalleryService {
  async getSliderImages(): Promise<IGalleryImageDocument[]> {
    return GalleryImage.find({ type: 'slider', active: true }).sort({ order: 1 });
  }

  async getGalleryImages(): Promise<IGalleryImageDocument[]> {
    return GalleryImage.find({ type: 'gallery', active: true }).sort({ column: 1, order: 1 });
  }

  async getAll(): Promise<IGalleryImageDocument[]> {
    return GalleryImage.find().sort({ type: 1, column: 1, order: 1 });
  }

  async create(data: Partial<IGalleryImage>): Promise<IGalleryImageDocument> {
    const image = new GalleryImage(data);
    return image.save();
  }

  async update(id: string, data: Partial<IGalleryImage>): Promise<IGalleryImageDocument | null> {
    return GalleryImage.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await GalleryImage.findByIdAndDelete(id);
    return result !== null;
  }

  async toggleActive(id: string): Promise<IGalleryImageDocument | null> {
    const image = await GalleryImage.findById(id);
    if (!image) return null;
    image.active = !image.active;
    return image.save();
  }
}

export const galleryService = new GalleryService();
