import { Suspense } from 'react';
import Link from 'next/link';
import { ProductGrid, ProductGridSkeleton } from '@/components';
import { OfferSlider } from '@/components/OfferSlider';
import { InfiniteScrollGallery } from '@/components/InfiniteScrollGallery';
import { FilterButtons, CategoryButtons } from '@/components/FilterButtons';
import { Pagination } from '@/components/Pagination';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  { label: 'Sneakers', value: 'sneakers', emoji: '👟' },
  { label: 'Remeras', value: 'remeras', emoji: '👕' },
  { label: 'Pantalones', value: 'pantalones', emoji: '👖' },
  { label: 'Camperas', value: 'camperas', emoji: '🧥' },
  { label: 'Buzos', value: 'buzos', emoji: '🧶' },
  { label: 'Musculosas', value: 'musculosas', emoji: '🎽' },
  { label: 'Accesorios', value: 'accesorios', emoji: '🎒' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Más recientes', icon: '🕐' },
  { value: 'price_asc', label: 'Precio: Menor', icon: '💰' },
  { value: 'price_desc', label: 'Precio: Mayor', icon: '💰' },
  { value: 'discount', label: 'Mayor descuento', icon: '🏷️' },
  { value: 'popular', label: 'Más vendidos', icon: '🔥' },
];

async function getProducts(searchParams: any) {
  const params = new URLSearchParams();
  if (searchParams.category) params.append('category', searchParams.category);
  if (searchParams.brand) params.append('brand', searchParams.brand);
  if (searchParams.q) params.append('search', searchParams.q);
  if (searchParams.sort) params.append('sort', searchParams.sort);
  if (searchParams.onSale) params.append('onSale', 'true');

  const url = `${API_URL}/api/products${params.toString() ? `?${params.toString()}` : ''}`;
  
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

interface HomeProps {
  searchParams: Promise<{ category?: string; brand?: string; q?: string; sort?: string; onSale?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const allProducts = await getProducts(params);
  
  // Paginación
  const currentPage = parseInt(params.page || '1');
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const products = allProducts.slice(startIndex, endIndex);

  const getTitle = () => {
    if (params.q) return `Resultados para "${params.q}"`;
    if (params.onSale) return '🏷️ Ofertas';
    if (params.category) {
      const cat = CATEGORIES.find(c => c.value === params.category);
      return cat ? `${cat.emoji} ${cat.label}` : params.category;
    }
    if (params.brand) return `${params.brand}`;
    return 'Todos los Productos';
  };

  const getSubtitle = () => {
    if (params.q) return `${products.length} resultado${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`;
    if (params.onSale) return `${products.length} productos con descuento`;
    if (params.category) {
      const cat = CATEGORIES.find(c => c.value === params.category);
      return `Explora nuestra colección de ${(cat?.name || '').toLowerCase()}`;
    }
    return 'Encuentra las mejores zapatillas y ropa de las marcas más populares';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      {/* Slider de ofertas - SIEMPRE VISIBLE */}
      <OfferSlider />

      {/* Galería de imágenes infinita */}
      <InfiniteScrollGallery />

      {/* Categorías rápidas */}
      <div className="mb-6 md:mb-8">
        <CategoryButtons categories={CATEGORIES} currentCategory={params.category || ''} />
      </div>

      {/* Header con título y filtros */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {getTitle()}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {getSubtitle()}
            </p>
          </div>
          
          {/* Ordenar */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 flex-shrink-0">Ordenar:</span>
            <FilterButtons 
              options={SORT_OPTIONS} 
              currentValue={params.sort || ''} 
              paramKey="sort" 
            />
          </div>
        </div>
      </div>

      {/* Grid de productos - ID para scroll */}
      <div id="productos">
        <Suspense fallback={<ProductGridSkeleton />}>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron productos</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Ver todos los productos
              </Link>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
