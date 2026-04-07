import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GalleryImage } from './models/GalleryImage';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sneaker-vault';

const sliderImages = [
  {
    type: 'slider' as const,
    url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200',
    title: 'HASTA 50% OFF',
    subtitle: 'En toda la colección',
    description: 'Las mejores marcas: Nike, Adidas, Jordan, y más a precios increíbles.',
    badge: 'LIMITADO',
    order: 1,
    active: true,
  },
  {
    type: 'slider' as const,
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    title: 'NUEVA COLECCIÓN',
    subtitle: 'Otoño/Invierno 2026',
    description: 'Camperas, buzos y pantalones nuevos. Renová tu guardarropa.',
    badge: 'NUEVO',
    order: 2,
    active: true,
  },
  {
    type: 'slider' as const,
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
    title: '2x1 EN REMERAS',
    subtitle: 'Solo por tiempo limitado',
    description: 'Llevá 2 remeras de cualquier marca y pagá solo 1. ¡No te lo pierdas!',
    badge: 'OFERTA',
    order: 3,
    active: true,
  },
  {
    type: 'slider' as const,
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
    title: 'ESTILO URBANO',
    subtitle: 'Lo que todos eligen',
    description: 'Los productos más populares de nuestra tienda. Elegidos por vos.',
    badge: 'TOP',
    order: 4,
    active: true,
  },
];

const galleryColumn1 = [
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400', order: 1, active: true },
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', order: 2, active: true },
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', order: 3, active: true },
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', order: 4, active: true },
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', order: 5, active: true },
  { type: 'gallery' as const, column: 1, url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', order: 6, active: true },
];

const galleryColumn2 = [
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', order: 1, active: true },
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', order: 2, active: true },
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400', order: 3, active: true },
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', order: 4, active: true },
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400', order: 5, active: true },
  { type: 'gallery' as const, column: 2, url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400', order: 6, active: true },
];

const galleryColumn3 = [
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', order: 1, active: true },
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', order: 2, active: true },
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', order: 3, active: true },
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400', order: 4, active: true },
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', order: 5, active: true },
  { type: 'gallery' as const, column: 3, url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', order: 6, active: true },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await GalleryImage.deleteMany({});
    console.log('🗑️  Existing gallery images deleted');

    await GalleryImage.insertMany([...sliderImages, ...galleryColumn1, ...galleryColumn2, ...galleryColumn3]);
    
    const sliderCount = await GalleryImage.countDocuments({ type: 'slider' });
    const galleryCount = await GalleryImage.countDocuments({ type: 'gallery' });
    
    console.log(`✅ Seeded ${sliderCount} slider images and ${galleryCount} gallery images`);

    await mongoose.disconnect();
    console.log('\n✅ Gallery seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
    process.exit(1);
  }
};

seedDatabase();
