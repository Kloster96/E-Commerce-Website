'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product, getDiscountedPrice } from '@/models';
import { Card, Button } from '@/components';
import { formatPrice } from '@/adapters';
import { useCartStore } from '@/store';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = product.discount > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

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

  return (
    <Link href={`/producto/${product._id}`}>
      <Card className="group h-full flex flex-col relative overflow-hidden">
        {/* Badge de agregado */}
        {showAdded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-bounce">
            ✓ Agregado
          </div>
        )}

        <div 
          className="relative aspect-square overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - alternate`}
              fill
              className={`object-cover absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
              {getCategoryEmoji(product.category)} {product.category}
            </span>
          </div>
          
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">
              {product.brand}
            </span>
          </div>

          {/* Badge de descuento */}
          {hasDiscount && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}

          {/* Badge de popular */}
          {product.sales > 50 && (
            <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              🔥 Popular
            </div>
          )}
        </div>

        <div className="p-3 md:p-4 flex-1 flex flex-col">
          <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 truncate">
            {product.name}
          </h3>
          
          {/* Precios */}
          <div className="mb-2 md:mb-3">
            {hasDiscount ? (
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <span className="text-base md:text-xl font-bold text-red-500">
                  {formatPrice(discountedPrice)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-base md:text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="mb-2 md:mb-3">
            <p className="text-xs text-gray-500 mb-1 md:mb-2">Talle:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 6 && (
                <span className="text-xs text-gray-400 self-center">
                  +{product.sizes.length - 6}
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-1 md:space-y-2">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full text-xs md:text-sm py-2 md:py-2.5 ${hasDiscount ? 'bg-red-500 hover:bg-red-600' : ''}`}
              variant={selectedSize ? 'primary' : 'outline'}
            >
              {selectedSize ? 'Agregar' : 'Selecciona Talle'}
            </Button>
            <p className="hidden md:block text-xs text-center text-gray-400 hover:text-gray-900 cursor-pointer font-medium">
              Ver detalles →
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
