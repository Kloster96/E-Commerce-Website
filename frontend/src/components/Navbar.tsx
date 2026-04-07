'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useCartStore } from '@/store';

const CATEGORIES = [
  { name: 'Inicio', href: '/', icon: '🏠' },
  { name: 'Sneakers', href: '/?category=sneakers', icon: '👟' },
  { name: 'Remeras', href: '/?category=remeras', icon: '👕' },
  { name: 'Pantalones', href: '/?category=pantalones', icon: '👖' },
  { name: 'Camperas', href: '/?category=camperas', icon: '🧥' },
  { name: 'Buzos', href: '/?category=buzos', icon: '🧶' },
  { name: 'Musculosas', href: '/?category=musculosas', icon: '🎽' },
  { name: 'Accesorios', href: '/?category=accesorios', icon: '🎒' },
];

function NavbarContent() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category') || '';
  const getItemCount = useCartStore((state) => state.getItemCount);
  const itemCount = mounted ? getItemCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActiveCategory = (href: string) => {
    if (href === '/') return currentCategory === '';
    const cat = new URLSearchParams(href.split('?')[1]).get('category');
    return cat === currentCategory;
  };

  const handleCategoryClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    // Navegar a la nueva URL
    router.push(href);
    
    // Hacer scroll a la sección de productos después de un pequeño delay
    setTimeout(() => {
      const productsSection = document.getElementById('productos');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    // Cerrar menú mobile
    setMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Desktop: Logo - Categorías - Carrito (todo en una línea) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex-shrink-0 mr-6">
            <span className="text-lg font-bold tracking-wide text-gray-900">ESENCIA</span>
          </button>

          {/* Categorías centradas */}
          <div className="flex items-center space-x-1 flex-1 justify-center">
            {CATEGORIES.filter(cat => cat.href !== '/').map((cat) => (
              <button
                key={cat.name}
                onClick={(e) => handleCategoryClick(e, cat.href)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActiveCategory(cat.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Carrito */}
          <Link 
            href="/carrito" 
            className="relative p-1.5 text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0 ml-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile: Logo - Carrito - Menu */}
      <div className="lg:hidden max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex-shrink-0">
            <span className="text-lg font-bold tracking-wide text-gray-900">ESENCIA</span>
          </button>

          {/* Carrito y Menu */}
          <div className="flex items-center gap-2">
            <Link 
              href="/carrito" 
              className="relative p-1.5 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Categorías scroll horizontal */}
      <div className="lg:hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-1 py-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={(e) => cat.href === '/' ? handleHomeClick(e) : handleCategoryClick(e, cat.href)}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActiveCategory(cat.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu (expandible) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col space-y-1">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.name}
                  onClick={(e) => cat.href === '/' ? handleHomeClick(e) : handleCategoryClick(e, cat.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left ${
                    isActiveCategory(cat.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export const Navbar = () => {
  return (
    <Suspense fallback={
      <nav className="bg-white shadow-md sticky top-0 z-50 h-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <span className="text-lg font-bold tracking-wide text-gray-900">ESENCIA</span>
          </div>
        </div>
      </nav>
    }>
      <NavbarContent />
    </Suspense>
  );
};
