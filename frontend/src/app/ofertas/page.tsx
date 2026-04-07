import Link from 'next/link';
import { Suspense } from 'react';
import { ProductGrid, ProductGridSkeleton } from '@/components';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getProductsOnSale() {
  const url = `${API_URL}/api/products?onSale=true&sort=discount`;
  
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function OfertasPage() {
  const products = await getProductsOnSale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero de ofertas */}
      <div className="mb-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">🏷️</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Ofertas</h1>
            <p className="text-xl text-white/90 mt-2">
              Los mejores descuentos en ropa y zapatillas
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            🔥 Descuentos hasta 50%
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            🚚 Envío gratis
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            ⭐ Calidad garantizada
          </span>
        </div>
      </div>

      {/* Stats de ofertas */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{products.length}</p>
          <p className="text-sm text-gray-500">Productos en oferta</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-3xl font-bold text-orange-500">
            {Math.max(...products.map((p: any) => p.discount), 0)}%
          </p>
          <p className="text-sm text-gray-500">Descuento máximo</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-3xl font-bold text-blue-500">
            {new Set(products.map((p: any) => p.brand)).size}
          </p>
          <p className="text-sm text-gray-500">Marcas en oferta</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-3xl font-bold text-green-500">
            {new Set(products.map((p: any) => p.category)).size}
          </p>
          <p className="text-sm text-gray-500">Categorías</p>
        </div>
      </div>

      {/* Grid de productos con descuento */}
      <Suspense fallback={<ProductGridSkeleton />}>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-gray-500 text-lg">No hay productos con descuento en este momento</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </Suspense>
    </div>
  );
}
