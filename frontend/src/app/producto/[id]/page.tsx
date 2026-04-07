'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/adapters';
import { Product, sortSizes } from '@/models';
import { useCartStore } from '@/store';
import { Button } from '@/components';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const getCategoryEmoji = (category: string) => {
  const emojis: Record<string, string> = {
    sneakers: '👟',
    remeras: '👕',
    pantalones: '👖',
    camperas: '🧥',
    buzos: '🧶',
    musculosas: '🎽',
    accesorios: '🎒',
  };
  return emojis[category] || '📦';
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [hoveredColorIndex, setHoveredColorIndex] = useState<number | null>(null);
  const [showAdded, setShowAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      const { id } = await params;
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`, { cache: 'no-store' });
        if (!response.ok) {
          notFound();
        }
        const data = await response.json();
        setProduct(data.data);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    const colorName = product.colors?.[selectedColorIndex]?.name || 'Default';
    addItem(product, selectedSize, colorName);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  // Obtener las imágenes del color seleccionado (o default)
  const getCurrentImages = () => {
    if (!product) return [];
    const colorData = product.colors?.[selectedColorIndex];
    return colorData?.images || product.images;
  };

  const currentImages = getCurrentImages();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-24 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-12 bg-gray-200 rounded w-1/2" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  // Determinar qué imágenes mostrar (hover o selected)
  const displayImages = hoveredColorIndex !== null && product.colors?.[hoveredColorIndex]
    ? product.colors[hoveredColorIndex].images 
    : currentImages;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Badge de agregado */}
      {showAdded && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-xl animate-bounce">
          ✓ Producto agregado al carrito
        </div>
      )}

      <Link 
        href="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imágenes */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={displayImages[selectedImage] || displayImages[0]}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>
          
          {/* Miniaturas - mostrar las del color seleccionado */}
          {displayImages.length > 1 && (
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'ring-2 ring-gray-900 shadow-lg' 
                      : 'bg-gray-100 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info del producto */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {getCategoryEmoji(product.category)} {product.category}
            </span>
            <span className="inline-block bg-gray-900 text-white text-sm font-bold px-3 py-1 rounded-full">
              {product.brand}
            </span>
            {product.gender && product.gender !== 'unisex' && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.gender}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Selector de colores con hover para cambiar imágenes */}
          {product.colors && product.colors.length > 0 && (
            <div className="border-b border-gray-200 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Color</h3>
                <span className="text-sm text-gray-500">
                  {product.colors[selectedColorIndex]?.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColorIndex(index);
                      setSelectedImage(0);
                    }}
                    onMouseEnter={() => setHoveredColorIndex(index)}
                    onMouseLeave={() => setHoveredColorIndex(null)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColorIndex === index
                        ? 'border-gray-900 ring-2 ring-gray-300'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: getColorHex(color.name) }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Talles - versión simple/compacta con stock por talle */}
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Talle</h3>
              {product.stockBySize && (
                <span className="text-sm text-gray-500">
                  {Object.values(product.stockBySize).reduce((a, b) => a + b, 0)} unidades
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sortSizes(product.sizes).map((size) => {
                const stockForSize = product.stockBySize?.[size] || 0;
                const isAvailable = stockForSize > 0;
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : isAvailable
                          ? 'border-gray-300 text-gray-700 hover:border-gray-900'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full"
              size="lg"
              variant={selectedSize ? 'primary' : 'outline'}
            >
              {!selectedSize ? 'Selecciona un Talle' : 'Agregar al Carrito'}
            </Button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold text-green-800">Envío gratis a todo el país</p>
                <p className="text-sm text-green-600">Entrega en 3-5 días hábiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para convertir nombre de color a hex
function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Gris': '#808080',
    'Rojo': '#FF0000',
    'Azul': '#0000FF',
    'Verde': '#008000',
    'Amarillo': '#FFFF00',
    'Naranja': '#FFA500',
    'Rosa': '#FFC0CB',
    'Morado': '#800080',
    'Marron': '#8B4513',
    'Beige': '#F5F5DC',
    'Negro/Blanco': '#000000',
    'Blanco/Negro': '#FFFFFF',
    'Rojo/Blanco': '#FF0000',
    'Azul/Blanco': '#0000FF',
  };
  
  return colors[colorName] || '#808080';
}