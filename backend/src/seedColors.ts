import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sneaker-vault';

// Imágenes por color para sneakers
const SNEAKER_IMAGES = {
  nike: {
    rojo: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    ],
    negro: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
    ],
    azul: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
    ],
    verde: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
    ],
  },
  adidas: {
    negro: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
    ],
    gris: [
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
    ],
    verde: [
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    ],
  },
  newbalance: {
    gris: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    ],
    negro: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    ],
    azul: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    ],
  },
};

// Imágenes por color para remeras
const REMERA_IMAGES = {
  nike: {
    negro: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
    ],
    gris: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    azul: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
  },
  adidas: {
    negro: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    verde: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    ],
  },
  puma: {
    negro: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    rojo: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
  },
};

// Imágenes por color para pantalones
const PANTALON_IMAGES = {
  nike: {
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
  },
  adidas: {
    negro: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    ],
    negroBlanco: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    ],
  },
  levis: {
    azul: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
      'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800',
    ],
    negro: [
      'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    ],
  },
};

// Imágenes por color para buzos
const BUZO_IMAGES = {
  nike: {
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
  },
  adidas: {
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
  },
  puma: {
    negro: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    gris: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    ],
    azul: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    ],
  },
};

// Imágenes por color para camperas
const CAMPERA_IMAGES = {
  nike: {
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
  },
  adidas: {
    negro: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    blanco: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
    gris: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
  },
  thenorthface: {
    negro: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    verde: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
    rojo: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
  },
};

// Datos de productos con colores
const productsData = [
  // SNEAKERS
  {
    name: 'Air Max 90',
    category: 'sneakers',
    brand: 'Nike',
    price: 149999,
    discount: 20,
    description: 'Las icónicas Air Max 90 mantienen su diseño clásico con la amortiguación Air visible.',
    images: SNEAKER_IMAGES.nike.rojo,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 25,
    gender: 'unisex',
    colors: [
      { name: 'Rojo', images: SNEAKER_IMAGES.nike.rojo },
      { name: 'Negro', images: SNEAKER_IMAGES.nike.negro },
      { name: 'Blanco', images: SNEAKER_IMAGES.nike.blanco },
      { name: 'Azul', images: SNEAKER_IMAGES.nike.azul },
    ],
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
    images: SNEAKER_IMAGES.nike.blanco,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 30,
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: SNEAKER_IMAGES.nike.blanco },
      { name: 'Negro', images: SNEAKER_IMAGES.nike.negro },
    ],
    sales: 95,
  },
  {
    name: 'Dunk Low',
    category: 'sneakers',
    brand: 'Nike',
    price: 159999,
    discount: 30,
    description: 'Las Nike Dunk Low combinan herencia deportiva con estilo urbano.',
    images: SNEAKER_IMAGES.nike.negro,
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 22,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: SNEAKER_IMAGES.nike.negro },
      { name: 'Verde', images: SNEAKER_IMAGES.nike.verde },
      { name: 'Rojo', images: SNEAKER_IMAGES.nike.rojo },
    ],
    sales: 85,
    featured: true,
  },
  {
    name: 'Ultraboost 22',
    category: 'sneakers',
    brand: 'Adidas',
    price: 179999,
    discount: 15,
    description: 'Las Ultraboost 22 ofrecen la mejor tecnología de amortiguación de Adidas.',
    images: SNEAKER_IMAGES.adidas.negro,
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 18,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: SNEAKER_IMAGES.adidas.negro },
      { name: 'Blanco', images: SNEAKER_IMAGES.adidas.blanco },
      { name: 'Gris', images: SNEAKER_IMAGES.adidas.gris },
    ],
    sales: 78,
  },
  {
    name: 'Forum Low',
    category: 'sneakers',
    brand: 'Adidas',
    price: 109999,
    discount: 25,
    description: 'Las Adidas Forum Low trae de vuelta el legado de los 80s con un diseño limpio.',
    images: SNEAKER_IMAGES.adidas.blanco,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 20,
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: SNEAKER_IMAGES.adidas.blanco },
      { name: 'Negro', images: SNEAKER_IMAGES.adidas.negro },
    ],
    sales: 65,
  },
  {
    name: '574 Classic',
    category: 'sneakers',
    brand: 'New Balance',
    price: 89999,
    discount: 10,
    description: 'Las New Balance 574 son el epítome del confort casual.',
    images: SNEAKER_IMAGES.newbalance.gris,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    stock: 30,
    gender: 'unisex',
    colors: [
      { name: 'Gris', images: SNEAKER_IMAGES.newbalance.gris },
      { name: 'Negro', images: SNEAKER_IMAGES.newbalance.negro },
      { name: 'Blanco', images: SNEAKER_IMAGES.newbalance.blanco },
      { name: 'Azul', images: SNEAKER_IMAGES.newbalance.azul },
    ],
    sales: 55,
  },
  // REMERAS
  {
    name: 'Remera Dri-FIT',
    category: 'remeras',
    brand: 'Nike',
    price: 34999,
    discount: 40,
    description: 'Remera deportiva con tecnología Dri-FIT que absorbe la humedad. Perfecta para entrenamientos.',
    images: REMERA_IMAGES.nike.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: REMERA_IMAGES.nike.negro },
      { name: 'Blanco', images: REMERA_IMAGES.nike.blanco },
      { name: 'Gris', images: REMERA_IMAGES.nike.gris },
      { name: 'Azul', images: REMERA_IMAGES.nike.azul },
    ],
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
    images: REMERA_IMAGES.adidas.blanco,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    gender: 'unisex',
    colors: [
      { name: 'Blanco', images: REMERA_IMAGES.adidas.blanco },
      { name: 'Negro', images: REMERA_IMAGES.adidas.negro },
      { name: 'Verde', images: REMERA_IMAGES.adidas.verde },
    ],
    sales: 150,
  },
  {
    name: 'Remera Oversize',
    category: 'remeras',
    brand: 'Puma',
    price: 24999,
    discount: 25,
    description: 'Remera oversize con diseño moderno. Corte holgado para un estilo urbano.',
    images: REMERA_IMAGES.puma.negro,
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 35,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: REMERA_IMAGES.puma.negro },
      { name: 'Blanco', images: REMERA_IMAGES.puma.blanco },
      { name: 'Rojo', images: REMERA_IMAGES.puma.rojo },
    ],
    sales: 85,
  },
  // PANTALONES
  {
    name: 'Pantalón Jogger Training',
    category: 'pantalones',
    brand: 'Nike',
    price: 54999,
    discount: 20,
    description: 'Pantalón jogger para entrenamiento con tecnología Dri-FIT. Elástico y cómodo.',
    images: PANTALON_IMAGES.nike.negro,
    sizes: ['28', '30', '32', '34', '36', '38'],
    stock: 28,
    gender: 'hombre',
    colors: [
      { name: 'Negro', images: PANTALON_IMAGES.nike.negro },
      { name: 'Gris', images: PANTALON_IMAGES.nike.gris },
      { name: 'Azul', images: PANTALON_IMAGES.nike.azul },
    ],
    sales: 65,
  },
  {
    name: 'Pantalón Tiro',
    category: 'pantalones',
    brand: 'Adidas',
    price: 49999,
    discount: 25,
    description: 'Pantalón clásico de training con rayas laterales. Diseño icónico.',
    images: PANTALON_IMAGES.adidas.negro,
    sizes: ['28', '30', '32', '34', '36'],
    stock: 35,
    gender: 'hombre',
    colors: [
      { name: 'Negro', images: PANTALON_IMAGES.adidas.negro },
      { name: 'Negro/Blanco', images: PANTALON_IMAGES.adidas.negroBlanco },
    ],
    sales: 90,
  },
  {
    name: 'Pantalón Skinny',
    category: 'pantalones',
    brand: 'Levis',
    price: 79999,
    discount: 15,
    description: 'Pantalón vaquero skinny de tiro medio. Estilo clásico con ajuste moderno.',
    images: PANTALON_IMAGES.levis.azul,
    sizes: ['28', '30', '32', '34', '36'],
    stock: 22,
    gender: 'unisex',
    colors: [
      { name: 'Azul', images: PANTALON_IMAGES.levis.azul },
      { name: 'Negro', images: PANTALON_IMAGES.levis.negro },
    ],
    sales: 45,
  },
  // BUZOS
  {
    name: 'Buzo Hoodie Essentials',
    category: 'buzos',
    brand: 'Nike',
    price: 69999,
    discount: 25,
    description: 'Buzo con capucha de algodón cepillado. Comodidad premium para el día a día.',
    images: BUZO_IMAGES.nike.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 40,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: BUZO_IMAGES.nike.negro },
      { name: 'Gris', images: BUZO_IMAGES.nike.gris },
      { name: 'Azul', images: BUZO_IMAGES.nike.azul },
      { name: 'Verde', images: BUZO_IMAGES.nike.verde },
    ],
    sales: 180,
    featured: true,
  },
  {
    name: 'Buzo Trefoil',
    category: 'buzos',
    brand: 'Adidas',
    price: 59999,
    discount: 30,
    description: 'Buzo clásico con el logo Trefoil. Algodón suave y cálido.',
    images: BUZO_IMAGES.adidas.negro,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: BUZO_IMAGES.adidas.negro },
      { name: 'Blanco', images: BUZO_IMAGES.adidas.blanco },
      { name: 'Gris', images: BUZO_IMAGES.adidas.gris },
    ],
    sales: 120,
  },
  {
    name: 'Buzo Classic',
    category: 'buzos',
    brand: 'Puma',
    price: 54999,
    discount: 20,
    description: 'Buzo deportivo con logo Puma. Perfecto para entrenamiento o uso diario.',
    images: BUZO_IMAGES.puma.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 30,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: BUZO_IMAGES.puma.negro },
      { name: 'Gris', images: BUZO_IMAGES.puma.gris },
      { name: 'Azul', images: BUZO_IMAGES.puma.azul },
    ],
    sales: 75,
  },
  // CAMPERAS
  {
    name: 'Campera Rain Jacket',
    category: 'camperas',
    brand: 'Nike',
    price: 89999,
    discount: 35,
    description: 'Campera impermeable con capucha. Ideal para días de lluvia.',
    images: CAMPERA_IMAGES.nike.negro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: CAMPERA_IMAGES.nike.negro },
      { name: 'Azul', images: CAMPERA_IMAGES.nike.azul },
      { name: 'Verde', images: CAMPERA_IMAGES.nike.verde },
    ],
    sales: 55,
  },
  {
    name: 'Campera Windbreaker',
    category: 'camperas',
    brand: 'Adidas',
    price: 79999,
    discount: 25,
    description: 'Campera cortavientos ligera. Perfecta para runner y días ventosos.',
    images: CAMPERA_IMAGES.adidas.negro,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: CAMPERA_IMAGES.adidas.negro },
      { name: 'Blanco', images: CAMPERA_IMAGES.adidas.blanco },
      { name: 'Gris', images: CAMPERA_IMAGES.adidas.gris },
    ],
    sales: 40,
  },
  {
    name: 'Campera 1996 Nuptse',
    category: 'camperas',
    brand: 'The North Face',
    price: 199999,
    discount: 15,
    description: 'Campera羽绒服 con relleno sintético. Máxima calidez para invierno.',
    images: CAMPERA_IMAGES.thenorthface.negro,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    gender: 'unisex',
    colors: [
      { name: 'Negro', images: CAMPERA_IMAGES.thenorthface.negro },
      { name: 'Verde', images: CAMPERA_IMAGES.thenorthface.verde },
      { name: 'Rojo', images: CAMPERA_IMAGES.thenorthface.rojo },
    ],
    featured: true,
    sales: 30,
  },
];

async function seedColors() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log('🗑️ Deleted existing products');

    // Insertar nuevos productos
    const products = await Product.insertMany(productsData);
    console.log(`✅ Inserted ${products.length} products with colors`);

    console.log('\n📦 Products created:');
    products.forEach((p) => {
      console.log(`  - ${p.name} (${p.brand}) - ${p.colors?.length || 0} colors`);
    });

    await mongoose.disconnect();
    console.log('\n👋 Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedColors();