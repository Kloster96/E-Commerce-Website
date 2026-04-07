import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Sneaker, ISneaker } from './models';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sneaker-vault';

const sneakersData: Omit<ISneaker, '_id' | 'createdAt' | 'updatedAt'>[] = [
  // NIKE
  {
    name: 'Air Max 90',
    brand: 'Nike',
    price: 149999,
    description: 'Las icónicas Air Max 90 mantienen su diseño clásico con la amortiguación Air visible que revolucionó el mundo del running.',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 25,
  },
  {
    name: 'Air Force 1 Low',
    brand: 'Nike',
    price: 159999,
    description: 'El clásico de Nike que nunca pasa de moda. Diseño limpio y versátil para cualquier outfit.',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 30,
  },
  {
    name: 'Dunk Low',
    brand: 'Nike',
    price: 159999,
    description: 'Las Nike Dunk Low combinan herencia deportiva con estilo urbano. Un must-have para cualquier coleccionista.',
    images: [
      'https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=800',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800'
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 22,
  },
  {
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Nike',
    price: 249999,
    description: 'Las Air Jordan 1 son un ícono de la cultura sneaker. Diseño icónico que define la elegancia y el estilo urbano.',
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800'
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 12,
  },
  {
    name: 'Air Max 97',
    brand: 'Nike',
    price: 189999,
    description: 'El diseño ondulado de la Air Max 97 la convierte en una de las más reconocibles del mundo.',
    images: [
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 18,
  },
  // ADIDAS
  {
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 179999,
    description: 'Las Ultraboost 22 ofrecen la mejor tecnología de amortiguación de Adidas con retorno de energía excepcional.',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 18,
  },
  {
    name: 'Forum Low',
    brand: 'Adidas',
    price: 109999,
    description: 'Las Adidas Forum Low trae de vuelta el legado de los 80s con un diseño limpio y materiales premium.',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 20,
  },
  {
    name: 'Superstar',
    brand: 'Adidas',
    price: 119999,
    description: 'Las Adidas Superstar son un ícono del streetwear. La characteristic concha de metal las hace inconfundibles.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 25,
  },
  {
    name: 'Gazelle',
    brand: 'Adidas',
    price: 129999,
    description: 'Las Gazelle vuelven con su diseño clásico de los 60s. Ideales para un estilo casual y sofisticado.',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800',
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 15,
  },
  // JORDAN
  {
    name: 'Air Jordan 4 Retro',
    brand: 'Jordan',
    price: 279999,
    description: 'Las Air Jordan 4 revolucionaron el diseño de sneakers. Icono absoluto de la cultura sneaker.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800'
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 10,
  },
  {
    name: 'Air Jordan 11',
    brand: 'Jordan',
    price: 299999,
    description: 'Las Air Jordan 11 son leyendas. Diseño elegante y revolucionario con su suela de transparente.',
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800'
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 8,
  },
  // NEW BALANCE
  {
    name: '574 Classic',
    brand: 'New Balance',
    price: 89999,
    description: 'Las New Balance 574 son el epítome del confort casual. Diseño versátil para el uso diario.',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    stock: 30,
  },
  {
    name: '990v5',
    brand: 'New Balance',
    price: 199999,
    description: 'Las 990v5 representan la máxima calidad y comodidad. El estándar de oro de New Balance.',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 15,
  },
  // PUMA
  {
    name: 'RS-X',
    brand: 'Puma',
    price: 119999,
    description: 'Las RS-X combinan tecnología de running retro con un diseño voluminoso y audaz para el máximo impacto visual.',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 15,
  },
  {
    name: 'Suede Classic',
    brand: 'Puma',
    price: 79999,
    description: 'Las Puma Suede son un clásico atemporal. Diseño simple y elegante que combina con todo.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 22,
  },
  // REEBOK
  {
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 74999,
    description: 'Las Reebok Classic Leather ofrecen comodidad duradera con un diseño atemporal que nunca pasa de moda.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 28,
  },
  {
    name: 'Club C 85',
    brand: 'Reebok',
    price: 84999,
    description: 'Las Club C 85 son un clásico del tennis que se convirtió en ícono del streetwear.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 20,
  },
  // CONVERSE
  {
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 59999,
    description: 'Las Chuck Taylor son las sneakers más icónicas de la historia. Un básico en todo guardarropas.',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800',
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800'
    ],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    stock: 50,
  },
  {
    name: 'Chuck 70',
    brand: 'Converse',
    price: 89999,
    description: 'Las Chuck 70 son una versión premium del clásico con mejores materiales y confort.',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800',
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 25,
  },
  // VANS
  {
    name: 'Old Skool',
    brand: 'Vans',
    price: 64999,
    description: 'Las Old Skool son el ícono de Vans. Con su stripe lateral característica, son un básicas del skate.',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'
    ],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    stock: 35,
  },
  {
    name: 'Sk8-Hi',
    brand: 'Vans',
    price: 74999,
    description: 'Las Sk8-Hi son las zapatillas altas de Vans. Perfectas para skate y estilo urbano.',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'
    ],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    stock: 28,
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Sneaker.deleteMany({});
    console.log('🗑️  Existing sneakers deleted');

    const createdSneakers = await Sneaker.insertMany(sneakersData);
    console.log(`✅ Seeded ${createdSneakers.length} sneakers successfully`);

    console.log('\n📦 Created sneakers:');
    createdSneakers.forEach((sneaker, index) => {
      console.log(`   ${index + 1}. ${sneaker.brand} ${sneaker.name} - $${sneaker.price.toLocaleString('es-AR')}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
