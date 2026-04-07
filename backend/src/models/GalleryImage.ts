import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage {
  type: 'slider' | 'gallery';
  column?: number;
  url: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  link?: string;
  order: number;
  active: boolean;
}

export interface IGalleryImageDocument extends IGalleryImage, Document {}

const galleryImageSchema = new Schema<IGalleryImageDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: ['slider', 'gallery'],
      index: true,
    },
    column: {
      type: Number,
      min: 1,
      max: 3,
    },
    url: {
      type: String,
      required: true,
    },
    title: String,
    subtitle: String,
    description: String,
    badge: String,
    link: String,
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryImage = mongoose.model<IGalleryImageDocument>('GalleryImage', galleryImageSchema);
