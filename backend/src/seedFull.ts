import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sneaker-vault';

// Imágenes para sneakers Nike - Air Max
const AIR_MAX_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
  ],
  rojo: [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
  ],
};

// Imágenes para Nike Dunk
const DUNK_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
  ],
  verde: [
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
  ],
};

// Imágenes para Adidas
const ADIDAS_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
  ],
  gris: [
    'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
  ],
  verde: [
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
  ],
};

// Imágenes para New Balance
const NB_IMAGES = {
  gris: [
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
  ],
  negro: [
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
  ],
};

// Imágenes para remeras Nike
const REMERA_NIKE_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  ],
  gris: [
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  ],
};

// Imágenes para remeras Adidas
const REMERA_ADIDAS_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
  ],
  verde: [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
  ],
};

// Imágenes para pantalones
const PANTALON_NIKE_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
  ],
  gris: [
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
  ],
};

// Imágenes para Levi's
const LEVIS_IMAGES = {
  azul: [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800',
  ],
  negro: [
    'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
  ],
};

// Imágenes para buzos
const BUZO_NIKE_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
  ],
  gris: [
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
  ],
  verde: [
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  ],
};

// Imágenes para buzos Adidas
const BUZO_ADIDAS_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  ],
  blanco: [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
  ],
  gris: [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  ],
};

// Imágenes para camperas
const CAMPERA_NIKE_IMAGES = {
  negro: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
  ],
  azul: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
  ],
  verde: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
  ],
};

// Productos con colores y stock por talle
const productsData = [
  // ========== SNEAKERS ==========
  {
    name: 'Air Max 90',
    category: 'sneakers',
    brand: 'Nike',
    price: 149999,
    discount: 20,
    description: 'Las icónicas Air Max 90 mantienen su diseño clásico con la amortiguación Air visible. Comodidad legendary para el día a día.',
    images: AIR_MAX_IMAGES.negro,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stockBySize: { '38': 3, '39': 5, '40': 8, '41': 10, '42': 7, '43': 4, '44': 2, '45': 1 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: AIR_MAX_IMAGES.negro },
      { name: 'Blanco', images: AIR_MAX_IMAGES.blanco },
      { name: 'Rojo', images: AIR_MAX_IMAGES.rojo },
      { name: 'Azul', images: AIR_MAX_IMAGES.azul },
    ],
    sales: 120,
    featured: true,
  },
  {
    name: 'Dunk Low',
    category: 'sneakers',
    brand: 'Nike',
    price: 159999,
    discount: 10,
    description: 'Las Nike Dunk Low combinan herencia deportiva con estilo urbano. Un clásico que nunca pasa de moda.',
    images: DUNK_IMAGES.negro,
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stockBySize: { '38': 4, '39': 6, '40': 9, '41': 8, '42': 5, '43': 3, '44': 2 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: DUNK_IMAGES.negro },
      { name: 'Verde', images: DUNK_IMAGES.verde },
      { name: 'Blanco', images: DUNK_IMAGES.blanco },
    ],
    sales: 85,
    featured: true,
  },
  {
    name: 'Air Force 1 Low',
    category: 'sneakers',
    brand: 'Nike',
    price: 159999,
    discount: 0,
    description: 'El clásico de Nike que nunca pasa de moda. Diseño limpio y versatilidad para cualquier outfit.',
    images: AIR_MAX_IMAGES.blanco,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stockBySize: { '38': 5, '39': 8, '40': 12, '41': 15, '42': 10, '43': 6, '44': 4, '45': 2 },
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: AIR_MAX_IMAGES.blanco },
      { name: 'Negro', images: AIR_MAX_IMAGES.negro },
    ],
    sales: 200,
  },
  {
    name: 'Ultraboost 22',
    category: 'sneakers',
    brand: 'Adidas',
    price: 179999,
    discount: 15,
    description: 'Las Ultraboost 22 ofrecen la mejor tecnología de amortiguación de Adidas. Ideales para running y uso diario.',
    images: ADIDAS_IMAGES.negro,
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stockBySize: { '38': 2, '39': 4, '40': 6, '41': 8, '42': 5, '43': 3, '44': 1 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: ADIDAS_IMAGES.negro },
      { name: 'Blanco', images: ADIDAS_IMAGES.blanco },
      { name: 'Gris', images: ADIDAS_IMAGES.gris },
    ],
    sales: 78,
  },
  {
    name: 'Forum Low',
    category: 'sneakers',
    brand: 'Adidas',
    price: 109999,
    discount: 25,
    description: 'Las Adidas Forum Low trae de vuelta el legado de los 80s con un diseño limpio y moderno.',
    images: ADIDAS_IMAGES.blanco,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stockBySize: { '38': 3, '39': 5, '40': 7, '41': 9, '42': 6, '43': 4, '44': 2, '45': 1 },
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: ADIDAS_IMAGES.blanco },
      { name: 'Negro', images: ADIDAS_IMAGES.negro },
      { name: 'Verde', images: ADIDAS_IMAGES.verde },
    ],
    sales: 65,
  },
  {
    name: '574 Classic',
    category: 'sneakers',
    brand: 'New Balance',
    price: 89999,
    discount: 10,
    description: 'Las New Balance 574 son el epítome del confort casual. Tecnología de amortiguación superior.',
    images: NB_IMAGES.gris,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    stockBySize: { '38': 4, '39': 6, '40': 8, '41': 10, '42': 8, '43': 5, '44': 3, '45': 2, '46': 1 },
    gender: 'unisex',
    colors: [
      { name: 'Gris', images: NB_IMAGES.gris },
      { name: 'Negro', images: NB_IMAGES.negro },
      { name: 'Azul', images: NB_IMAGES.azul },
    ],
    sales: 55,
  },
  {
    name: 'Ultraboost Light',
    category: 'sneakers',
    brand: 'Adidas',
    price: 199999,
    discount: 0,
    description: 'La nueva generación de Ultraboost con tecnología Light. Más ligera, más reactiva.',
    images: ADIDAS_IMAGES.blanco,
    sizes: ['39', '40', '41', '42', '43', '44'],
    stockBySize: { '39': 3, '40': 5, '41': 7, '42': 4, '43': 2, '44': 1 },
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: ADIDAS_IMAGES.blanco },
      { name: 'Negro', images: ADIDAS_IMAGES.negro },
    ],
    featured: true,
    sales: 40,
  },

  // ========== REMERAS ==========
  {
    name: 'Remera Dri-FIT Sport',
    category: 'remeras',
    brand: 'Nike',
    price: 34999,
    discount: 30,
    description: 'Remera deportiva con tecnología Dri-FIT que absorbe la humedad. Perfecta para entrenamientos intensos.',
    images: REMERA_NIKE_IMAGES.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 15, 'M': 20, 'L': 25, 'XL': 15, 'XXL': 10 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: REMERA_NIKE_IMAGES.negro },
      { name: 'Blanco', images: REMERA_NIKE_IMAGES.blanco },
      { name: 'Gris', images: REMERA_NIKE_IMAGES.gris },
      { name: 'Azul', images: REMERA_NIKE_IMAGES.azul },
    ],
    sales: 200,
    featured: true,
  },
  {
    name: 'Remera Essentials',
    category: 'remeras',
    brand: 'Adidas',
    price: 29999,
    discount: 20,
    description: 'Remera clásica de algodón con logo bordado. Comodidad en cada uso, estilo casual.',
    images: REMERA_ADIDAS_IMAGES.blanco,
    sizes: ['S', 'M', 'L', 'XL'],
    stockBySize: { 'S': 12, 'M': 18, 'L': 20, 'XL': 10 },
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: REMERA_ADIDAS_IMAGES.blanco },
      { name: 'Negro', images: REMERA_ADIDAS_IMAGES.negro },
      { name: 'Verde', images: REMERA_ADIDAS_IMAGES.verde },
    ],
    sales: 150,
  },
  {
    name: 'Remera Performance',
    category: 'remeras',
    brand: 'Puma',
    price: 24999,
    discount: 15,
    description: 'Remera de alto rendimiento con tecnología dryCELL. Mantiene la piel seca durante el ejercicio.',
    images: REMERA_NIKE_IMAGES.azul,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 8, 'M': 12, 'L': 15, 'XL': 10, 'XXL': 5 },
    gender: 'unisex',
    colors: [
      { name: 'Azul', images: REMERA_NIKE_IMAGES.azul },
      { name: 'Negro', images: REMERA_NIKE_IMAGES.negro },
      { name: 'Blanco', images: REMERA_NIKE_IMAGES.blanco },
    ],
    sales: 85,
  },
  {
    name: 'Remera Crop',
    category: 'remeras',
    brand: 'Nike',
    price: 27999,
    discount: 25,
    description: 'Remera crop moderna con corte ajustado. Perfecta para looks deportivos y urbanos.',
    images: REMERA_NIKE_IMAGES.blanco,
    sizes: ['XS', 'S', 'M', 'L'],
    stockBySize: { 'XS': 5, 'S': 10, 'M': 12, 'L': 8 },
    gender: 'mujer',
    colors: [
      { name: 'Blanco', images: REMERA_NIKE_IMAGES.blanco },
      { name: 'Negro', images: REMERA_NIKE_IMAGES.negro },
      { name: 'Gris', images: REMERA_NIKE_IMAGES.gris },
    ],
    sales: 90,
  },

  // ========== PANTALONES ==========
  {
    name: 'Pantalón Jogger Training',
    category: 'pantalones',
    brand: 'Nike',
    price: 54999,
    discount: 20,
    description: 'Pantalón jogger para entrenamiento con tecnología Dri-FIT. Elástico, cómodo y moderno.',
    images: PANTALON_NIKE_IMAGES.negro,
    sizes: ['28', '30', '32', '34', '36', '38'],
    stockBySize: { '28': 8, '30': 12, '32': 15, '34': 10, '36': 6, '38': 4 },
    gender: 'hombre',
    colors: [
      { name: 'Negro', images: PANTALON_NIKE_IMAGES.negro },
      { name: 'Gris', images: PANTALON_NIKE_IMAGES.gris },
      { name: 'Azul', images: PANTALON_NIKE_IMAGES.azul },
    ],
    sales: 65,
  },
  {
    name: 'Pantalón Tiro 19',
    category: 'pantalones',
    brand: 'Adidas',
    price: 49999,
    discount: 25,
    description: 'Pantalón clásico de training con rayas laterales. Diseño icónico de Adidas.',
    images: PANTALON_NIKE_IMAGES.negro,
    sizes: ['28', '30', '32', '34', '36'],
    stockBySize: { '28': 6, '30': 10, '32': 14, '34': 8, '36': 4 },
    gender: 'hombre',
    colors: [
      { name: 'Negro', images: PANTALON_NIKE_IMAGES.negro },
      { name: 'Azul', images: PANTALON_NIKE_IMAGES.azul },
    ],
    sales: 90,
  },
  {
    name: 'Pantalón Skinny 511',
    category: 'pantalones',
    brand: "Levi's",
    price: 79999,
    discount: 15,
    description: 'Pantalón vaquero skinny de tiro medio. Estilo clásico con ajuste moderno.',
    images: LEVIS_IMAGES.azul,
    sizes: ['28', '30', '32', '34', '36'],
    stockBySize: { '28': 4, '30': 8, '32': 10, '34': 6, '36': 3 },
    gender: 'unisex',
    colors: [
      { name: 'Azul', images: LEVIS_IMAGES.azul },
      { name: 'Negro', images: LEVIS_IMAGES.negro },
    ],
    sales: 45,
  },
  {
    name: 'Pantalón Cargo',
    category: 'pantalones',
    brand: 'Puma',
    price: 44999,
    discount: 30,
    description: 'Pantalón cargo con múltiples bolsillos. Estilo urbano y funcionalidad.',
    images: PANTALON_NIKE_IMAGES.gris,
    sizes: ['30', '32', '34', '36', '38'],
    stockBySize: { '30': 7, '32': 10, '34': 8, '36': 5, '38': 3 },
    gender: 'hombre',
    colors: [
      { name: 'Gris', images: PANTALON_NIKE_IMAGES.gris },
      { name: 'Negro', images: PANTALON_NIKE_IMAGES.negro },
      { name: 'Verde', images: PANTALON_NIKE_IMAGES.azul },
    ],
    sales: 35,
  },

  // ========== BUZOS ==========
  {
    name: 'Buzo Hoodie Essentials',
    category: 'buzos',
    brand: 'Nike',
    price: 69999,
    discount: 25,
    description: 'Buzo con capucha de algodón cepillado. Comodidad premium para el día a día.',
    images: BUZO_NIKE_IMAGES.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 10, 'M': 15, 'L': 18, 'XL': 12, 'XXL': 8 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: BUZO_NIKE_IMAGES.negro },
      { name: 'Gris', images: BUZO_NIKE_IMAGES.gris },
      { name: 'Azul', images: BUZO_NIKE_IMAGES.azul },
      { name: 'Verde', images: BUZO_NIKE_IMAGES.verde },
    ],
    sales: 180,
    featured: true,
  },
  {
    name: 'Buzo Trefoil',
    category: 'buzos',
    brand: 'Adidas',
    price: 59999,
    discount: 20,
    description: 'Buzo clásico con el logo Trefoil. Algodón suave y cálido para el invierno.',
    images: BUZO_ADIDAS_IMAGES.negro,
    sizes: ['S', 'M', 'L', 'XL'],
    stockBySize: { 'S': 8, 'M': 12, 'L': 14, 'XL': 8 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: BUZO_ADIDAS_IMAGES.negro },
      { name: 'Blanco', images: BUZO_ADIDAS_IMAGES.blanco },
      { name: 'Gris', images: BUZO_ADIDAS_IMAGES.gris },
    ],
    sales: 120,
  },
  {
    name: 'Buzo Reverse Weave',
    category: 'buzos',
    brand: 'Champion',
    price: 74999,
    discount: 15,
    description: 'Buzo de alta calidad con tecnología Reverse Weave. Resistente a la shrinkage.',
    images: BUZO_NIKE_IMAGES.gris,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 6, 'M': 9, 'L': 12, 'XL': 7, 'XXL': 4 },
    gender: 'unisex',
    colors: [
      { name: 'Gris', images: BUZO_NIKE_IMAGES.gris },
      { name: 'Negro', images: BUZO_NIKE_IMAGES.negro },
      { name: 'Azul', images: BUZO_NIKE_IMAGES.azul },
    ],
    sales: 75,
  },
  {
    name: 'Buzo Oversize',
    category: 'buzos',
    brand: 'Nike',
    price: 64999,
    discount: 30,
    description: 'Buzo oversize con diseño moderno. Corte holgado para un estilo urbano y relajado.',
    images: BUZO_NIKE_IMAGES.verde,
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockBySize: { 'M': 8, 'L': 10, 'XL': 6, 'XXL': 4 },
    gender: 'unisex',
    colors: [
      { name: 'Verde', images: BUZO_NIKE_IMAGES.verde },
      { name: 'Negro', images: BUZO_NIKE_IMAGES.negro },
      { name: 'Gris', images: BUZO_NIKE_IMAGES.gris },
    ],
    sales: 95,
  },

  // ========== CAMPERAS ==========
  {
    name: 'Campera Rain Jacket',
    category: 'camperas',
    brand: 'Nike',
    price: 89999,
    discount: 35,
    description: 'Campera impermeable con capucha. Ideal para días de lluvia y actividades al aire libre.',
    images: CAMPERA_NIKE_IMAGES.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 5, 'M': 8, 'L': 10, 'XL': 6, 'XXL': 3 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: CAMPERA_NIKE_IMAGES.negro },
      { name: 'Azul', images: CAMPERA_NIKE_IMAGES.azul },
      { name: 'Verde', images: CAMPERA_NIKE_IMAGES.verde },
    ],
    sales: 55,
    featured: true,
  },
  {
    name: 'Campera Windbreaker',
    category: 'camperas',
    brand: 'Adidas',
    price: 79999,
    discount: 20,
    description: 'Campera cortavientos ligera. Perfecta para runners y días ventosos.',
    images: CAMPERA_NIKE_IMAGES.azul,
    sizes: ['S', 'M', 'L', 'XL'],
    stockBySize: { 'S': 4, 'M': 7, 'L': 9, 'XL': 5 },
    gender: 'unisex',
    colors: [
      { name: 'Azul', images: CAMPERA_NIKE_IMAGES.azul },
      { name: 'Negro', images: CAMPERA_NIKE_IMAGES.negro },
      { name: 'Verde', images: CAMPERA_NIKE_IMAGES.verde },
    ],
    sales: 40,
  },
  {
    name: 'Campera 1996 Nuptse',
    category: 'camperas',
    brand: 'The North Face',
    price: 199999,
    discount: 10,
    description: 'Campera羽绒服 con relleno sintético. Máxima calidez para invierno extremo.',
    images: CAMPERA_NIKE_IMAGES.verde,
    sizes: ['S', 'M', 'L', 'XL'],
    stockBySize: { 'S': 2, 'M': 4, 'L': 5, 'XL': 2 },
    gender: 'unisex',
    colors: [
      { name: 'Verde', images: CAMPERA_NIKE_IMAGES.verde },
      { name: 'Negro', images: CAMPERA_NIKE_IMAGES.negro },
      { name: 'Azul', images: CAMPERA_NIKE_IMAGES.azul },
    ],
    featured: true,
    sales: 30,
  },
  {
    name: 'Campera Pluma',
    category: 'camperas',
    brand: 'Columbia',
    price: 149999,
    discount: 25,
    description: 'Campera con aislamiento térmico avanzado. Ligera y extremadamente cálida.',
    images: CAMPERA_NIKE_IMAGES.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { 'S': 3, 'M': 5, 'L': 6, 'XL': 4, 'XXL': 2 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: CAMPERA_NIKE_IMAGES.negro },
      { name: 'Azul', images: CAMPERA_NIKE_IMAGES.azul },
    ],
    sales: 45,
  },

  // ========== ACCESORIOS ==========
  {
    name: 'Gorra Classic',
    category: 'accesorios',
    brand: 'Nike',
    price: 19999,
    discount: 15,
    description: 'Gorra classic con cierre adjustable. Estilo urbano para cualquier outfit.',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'],
    sizes: ['Única'],
    stockBySize: { 'Única': 25 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Blanco', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Gris', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
    ],
    sales: 80,
  },
  {
    name: 'Mochila Nike',
    category: 'accesorios',
    brand: 'Nike',
    price: 44999,
    discount: 20,
    description: 'Mochila con múltiples compartimentos. Ideal para estudio, trabajo o deporte.',
    images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'],
    sizes: ['Única'],
    stockBySize: { 'Única': 20 },
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'] },
      { name: 'Azul', images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'] },
    ],
    sales: 60,
  },
  {
    name: 'Medias Athletic (3 pack)',
    category: 'accesorios',
    brand: 'Adidas',
    price: 9999,
    discount: 10,
    description: 'Pack de 3 pares de medias deportivas. Comodidad y rendimiento en cada paso.',
    images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'],
    sizes: ['Única'],
    stockBySize: { 'Única': 50 },
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] },
      { name: 'Negro', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] },
    ],
    sales: 200,
  },
];

async function seedFull() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log('🗑️ Deleted existing products');

    // Insertar nuevos productos
    const products = await Product.insertMany(productsData);
    console.log(`✅ Inserted ${products.length} products with colors and stock by size`);

    // Mostrar resumen
    console.log('\n📦 Products created:');
    const byCategory: Record<string, number> = {};
    products.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      const totalStock = Object.values(p.stockBySize || {}).reduce((a: number, b: number) => a + b, 0);
      console.log(`  - ${p.name} (${p.brand}) - ${p.colors?.length || 0} colors - ${totalStock} unidades`);
    });

    console.log('\n📊 By Category:');
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count} productos`);
    });

    const totalStock = products.reduce((sum, p) => {
      return sum + Object.values(p.stockBySize || {}).reduce((a: number, b: number) => a + b, 0);
    }, 0);
    console.log(`\n📈 Total Stock: ${totalStock} unidades`);

    await mongoose.disconnect();
    console.log('\n👋 Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedFull();