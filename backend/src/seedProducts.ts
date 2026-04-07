import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product, IProduct } from './models/Product';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sneaker-vault';

// URLs de imágenes verificadas por categoría
const IMAGES = {
  sneakers: {
    nike: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
    ],
    newbalance: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    ],
  },
  remeras: {
    nike: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    puma: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    reebok: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
  },
  pantalones: {
    nike: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    ],
    levis: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    ],
    puma: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    ],
  },
  camperas: {
    nike: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    thenorthface: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    levis: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
  },
  buzos: {
    nike: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    puma: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
    reebok: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    ],
  },
  musculosas: {
    nike: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    ],
    puma: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    ],
  },
  accesorios: {
    newera: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800',
      'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800',
    ],
    nike: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
    ],
  },
};

const productsData: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>[] = [
  // SNEAKERS
  {
    name: 'Air Max 90',
    category: 'sneakers',
    brand: 'Nike',
    price: 149999,
    discount: 20,
    description: 'Las icónicas Air Max 90 mantienen su diseño clásico con la amortiguación Air visible.',
    images: IMAGES.sneakers.nike,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 25,
    gender: 'unisex',
    color: 'Blanco/Negro',
    sales: 120,
    featured: true,
  },
  {
    name: 'Air Force 1 Low',
    category: 'sneakers',
    brand: 'Nike',
    price: 159999,
    discount: 0,
    description: 'El clásico de Nike que nunca pasa de moda. Diseño limpio y versátil.',
    images: [...IMAGES.sneakers.nike].reverse(),
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 30,
    gender: 'unisex',
    color: 'Blanco',
  },
  {
    name: 'Dunk Low',
    category: 'sneakers',
    brand: 'Nike',
    price: 159999,
    discount: 30,
    description: 'Las Nike Dunk Low combinan herencia deportiva con estilo urbano.',
    images: IMAGES.sneakers.nike,
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 22,
    gender: 'unisex',
    color: 'Negro/Blanco',
    sales: 95,
    featured: true,
  },
  {
    name: 'Ultraboost 22',
    category: 'sneakers',
    brand: 'Adidas',
    price: 179999,
    discount: 15,
    description: 'Las Ultraboost 22 ofrecen la mejor tecnología de amortiguación de Adidas.',
    images: IMAGES.sneakers.adidas,
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 18,
    gender: 'unisex',
    color: 'Negro',
    sales: 78,
  },
  {
    name: 'Forum Low',
    category: 'sneakers',
    brand: 'Adidas',
    price: 109999,
    discount: 25,
    description: 'Las Adidas Forum Low trae de vuelta el legado de los 80s con un diseño limpio.',
    images: [...IMAGES.sneakers.adidas].reverse(),
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 20,
    gender: 'unisex',
    color: 'Blanco',
    sales: 65,
  },
  {
    name: '574 Classic',
    category: 'sneakers',
    brand: 'New Balance',
    price: 89999,
    discount: 10,
    description: 'Las New Balance 574 son el epítome del confort casual.',
    images: IMAGES.sneakers.newbalance,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    stock: 30,
    gender: 'unisex',
    color: 'Gris',
  },
  // REMERAS
  {
    name: 'Remera Dri-FIT',
    category: 'remeras',
    brand: 'Nike',
    price: 34999,
    discount: 40,
    description: 'Remera deportiva con tecnología Dri-FIT que absorbe la humedad. Perfecta para entrenamientos.',
    images: IMAGES.remeras.nike,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    gender: 'unisex',
    color: 'Negro',
    sales: 200,
    featured: true,
  },
  {
    name: 'Remera Essentials',
    category: 'remeras',
    brand: 'Adidas',
    price: 29999,
    discount: 35,
    description: 'Remera clásica de algodón con logo bordado. Comodidad en cada uso.',
    images: IMAGES.remeras.adidas,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    gender: 'unisex',
    color: 'Blanco',
    sales: 150,
  },
  {
    name: 'Remera Oversize',
    category: 'remeras',
    brand: 'Puma',
    price: 24999,
    discount: 25,
    description: 'Remera oversize con diseño moderno. Corte holgado para un estilo urbano.',
    images: IMAGES.remeras.puma,
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 35,
    gender: 'unisex',
    color: 'Negro',
    sales: 85,
  },
  {
    name: 'Remera Classic Logo',
    category: 'remeras',
    brand: 'Reebok',
    price: 22999,
    discount: 15,
    description: 'Remera clásica con logo retro. Algodón 100% suave.',
    images: IMAGES.remeras.reebok,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    gender: 'unisex',
    color: 'Gris',
    sales: 110,
  },
  // PANTALONES
  {
    name: 'Pantalón Jogger Training',
    category: 'pantalones',
    brand: 'Nike',
    price: 54999,
    discount: 20,
    description: 'Pantalón jogger para entrenamiento con tecnología Dri-FIT. Elástico y cómodo.',
    images: IMAGES.pantalones.nike,
    sizes: ['28', '30', '32', '34', '36', '38'],
    stock: 28,
    gender: 'hombre',
    color: 'Negro',
    sales: 65,
  },
  {
    name: 'Pantalón Tiro',
    category: 'pantalones',
    brand: 'Adidas',
    price: 49999,
    discount: 25,
    description: 'Pantalón clásico de training con rayas laterales. Diseño icónico.',
    images: IMAGES.pantalones.adidas,
    sizes: ['28', '30', '32', '34', '36'],
    stock: 35,
    gender: 'hombre',
    color: 'Negro/Blanco',
    sales: 90,
  },
  {
    name: 'Jean Slim',
    category: 'pantalones',
    brand: 'Levi\'s',
    price: 64999,
    discount: 15,
    description: 'Jean slim fit clásico. El corte perfecto para cualquier ocasión.',
    images: IMAGES.pantalones.levis,
    sizes: ['28', '30', '32', '34', '36', '38'],
    stock: 40,
    gender: 'unisex',
    color: 'Jean',
    sales: 120,
  },
  {
    name: 'Jogger Essentials',
    category: 'pantalones',
    brand: 'Puma',
    price: 42999,
    discount: 10,
    description: 'Jogger cómodo para uso diario. Tejido suave y elástico.',
    images: IMAGES.pantalones.puma,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    gender: 'unisex',
    color: 'Gris',
    sales: 55,
  },
  // CAMPERAS
  {
    name: 'Campera Windrunner',
    category: 'camperas',
    brand: 'Nike',
    price: 129999,
    discount: 0,
    description: 'Campera rompevientos con diseño clásico de Nike. Ligera y resistente.',
    images: IMAGES.camperas.nike,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
    gender: 'hombre',
    color: 'Negro',
    sales: 45,
  },
  {
    name: 'Campera Track Top',
    category: 'camperas',
    brand: 'Adidas',
    price: 99999,
    discount: 10,
    description: 'Campera de tracksuit clásica con rayas laterales. Retro y moderna.',
    images: IMAGES.camperas.adidas,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    gender: 'unisex',
    color: 'Negro/Blanco',
    sales: 55,
  },
  {
    name: 'Campera Puffer',
    category: 'camperas',
    brand: 'The North Face',
    price: 189999,
    discount: 5,
    description: 'Campera puffer con relleno sintético. Máxima abrigo y estilo.',
    images: IMAGES.camperas.thenorthface,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    gender: 'unisex',
    color: 'Negro',
    sales: 30,
  },
  {
    name: 'Campera Denim',
    category: 'camperas',
    brand: 'Levi\'s',
    price: 119999,
    discount: 0,
    description: 'Campera de jean clásica. Un básico que nunca pasa de moda.',
    images: IMAGES.camperas.levis,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    gender: 'unisex',
    color: 'Jean',
    sales: 40,
  },
  // BUZOS
  {
    name: 'Buzo Hoodie Essential',
    category: 'buzos',
    brand: 'Nike',
    price: 69999,
    discount: 15,
    description: 'Buzo con capucha de algodón cepillado. Comodidad premium.',
    images: IMAGES.buzos.nike,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 35,
    gender: 'unisex',
    color: 'Negro',
    sales: 75,
  },
  {
    name: 'Buzo Trefoil',
    category: 'buzos',
    brand: 'Adidas',
    price: 64999,
    discount: 20,
    description: 'Buzo clásico con logo Trefoil. Diseño atemporal.',
    images: IMAGES.buzos.adidas,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    gender: 'unisex',
    color: 'Gris',
    sales: 85,
  },
  {
    name: 'Buzo Oversize',
    category: 'buzos',
    brand: 'Puma',
    price: 59999,
    discount: 10,
    description: 'Buzo oversize con corte moderno. Tendencia y comodidad.',
    images: IMAGES.buzos.puma,
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 28,
    gender: 'unisex',
    color: 'Beige',
    sales: 50,
  },
  {
    name: 'Buzo Classic Fleece',
    category: 'buzos',
    brand: 'Reebok',
    price: 54999,
    discount: 0,
    description: 'Buzo de fleece suave. Perfecto para días frescos.',
    images: IMAGES.buzos.reebok,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 32,
    gender: 'unisex',
    color: 'Gris claro',
    sales: 45,
  },
  // MUSCULOSAS
  {
    name: 'Musculosa Dri-FIT',
    category: 'musculosas',
    brand: 'Nike',
    price: 24999,
    discount: 30,
    description: 'Musculosa deportiva con tecnología Dri-FIT. Ideal para entrenamientos intensos.',
    images: IMAGES.musculosas.nike,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    gender: 'hombre',
    color: 'Negro',
    sales: 90,
  },
  {
    name: 'Musculosa Training',
    category: 'musculosas',
    brand: 'Adidas',
    price: 22999,
    discount: 25,
    description: 'Musculosa para training con diseño deportivo. Transpirable.',
    images: IMAGES.musculosas.adidas,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 38,
    gender: 'hombre',
    color: 'Gris',
    sales: 70,
  },
  {
    name: 'Musculosa Essential',
    category: 'musculosas',
    brand: 'Puma',
    price: 19999,
    discount: 20,
    description: 'Musculosa básica de algodón. Cómoda para el día a día.',
    images: IMAGES.musculosas.puma,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    gender: 'hombre',
    color: 'Blanco',
    sales: 110,
  },
  // ACCESORIOS
  {
    name: 'Gorra Classic 9FIFTY',
    category: 'accesorios',
    brand: 'New Era',
    price: 34999,
    discount: 15,
    description: 'Gorra snapback oficial. Diseño clásico con logo bordado.',
    images: IMAGES.accesorios.newera,
    sizes: ['Única'],
    stock: 60,
    gender: 'unisex',
    color: 'Negro',
    sales: 80,
  },
  {
    name: 'Medias Training (3 pack)',
    category: 'accesorios',
    brand: 'Nike',
    price: 14999,
    discount: 0,
    description: 'Pack de 3 pares de medias deportivas. Comodidad y soporte.',
    images: IMAGES.accesorios.nike,
    sizes: ['S (35-38)', 'M (39-42)', 'L (43-46)'],
    stock: 80,
    gender: 'unisex',
    color: 'Negro',
    sales: 150,
  },
  {
    name: 'Bolso Gym',
    category: 'accesorios',
    brand: 'Adidas',
    price: 44999,
    discount: 10,
    description: 'Bolso deportivo con compartimento principal amplio. Ideal para el gimnasio.',
    images: IMAGES.accesorios.adidas,
    sizes: ['Única'],
    stock: 25,
    gender: 'unisex',
    color: 'Negro',
    sales: 35,
  },
  {
    name: 'Mochila Swoosh',
    category: 'accesorios',
    brand: 'Nike',
    price: 54999,
    discount: 5,
    description: 'Mochila con logo Swoosh. Múltiples compartimentos.',
    images: [...IMAGES.accesorios.nike].reverse(),
    sizes: ['Única'],
    stock: 30,
    gender: 'unisex',
    color: 'Negro',
    sales: 40,
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Existing products deleted');

    const createdProducts = await Product.insertMany(productsData);
    console.log(`✅ Seeded ${createdProducts.length} products successfully`);

    // Agrupar por categoría
    const byCategory = createdProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n📦 Products by category:');
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });

    // Verificar imágenes
    const withMultipleImages = createdProducts.filter(p => p.images.length >= 2);
    console.log(`\n🖼️  Products with 2+ images: ${withMultipleImages.length}/${createdProducts.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
