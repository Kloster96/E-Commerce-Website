import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  sizes: string[];
  stockBySize: Record<string, number>;
  gender?: 'hombre' | 'mujer' | 'unisex';
  colors?: {
    name: string;
    images: string[];
  }[];
  sales: number;
  featured: boolean;
}

export interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      enum: ['sneakers', 'remeras', 'pantalones', 'camperas', 'buzos', 'musculosas', 'accesorios'],
      index: true,
    },
    brand: {
      type: String,
      required: [true, 'La marca es requerida'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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
      type: [String],
      required: [true, 'Los talles son requeridos'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Debe proporcionar al menos un talle',
      },
    },
    stockBySize: {
      type: Object,
      default: {},
    },
    gender: {
      type: String,
      enum: ['hombre', 'mujer', 'unisex'],
      default: 'unisex',
    },
    colors: {
      type: [{
        name: { type: String, required: true },
        images: { type: [String], required: true }
      }],
      default: [],
    },
    sales: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual para obtener el stock total
productSchema.virtual('stock').get(function() {
  if (!this.stockBySize) return 0;
  return Object.values(this.stockBySize).reduce((sum: number, qty: number) => sum + (qty || 0), 0);
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export const Product = mongoose.model<IProductDocument>('Product', productSchema);
