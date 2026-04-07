import mongoose, { Document, Schema } from 'mongoose';

export interface ISneaker {
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  sizes: number[];
  stock: number;
}

export interface ISneakerDocument extends ISneaker, Document {}

const sneakerSchema = new Schema<ISneakerDocument>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    brand: {
      type: String,
      required: [true, 'La marca es requerida'],
      enum: ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Reebok', 'Converse', 'Vans'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
    },
    images: {
      type: [String],
      required: [true, 'Al menos una imagen es requerida'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Debe proporcionar al menos una imagen',
      },
    },
    sizes: {
      type: [Number],
      required: [true, 'Los talles son requeridos'],
      validate: {
        validator: (arr: number[]) => arr.length > 0,
        message: 'Debe proporcionar al menos un talle',
      },
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Sneaker = mongoose.model<ISneakerDocument>('Sneaker', sneakerSchema);
