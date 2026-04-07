'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface FilterButtonsProps {
  options: { value: string; label: string; icon: string }[];
  currentValue: string;
  paramKey: string;
}

export const FilterButtons = ({ options, currentValue, paramKey }: FilterButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    
    // Usar shallow routing para evitar remount completo de la página
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams, paramKey]);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
            currentValue === opt.value
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

interface CategoryButtonsProps {
  categories: { value: string; label: string; emoji: string }[];
  currentCategory: string;
}

export const CategoryButtons = ({ categories, currentCategory }: CategoryButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className="flex md:grid md:grid-cols-8 gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      <button
        onClick={() => router.push('/ofertas', { scroll: false })}
        className="flex-shrink-0 flex flex-col items-center justify-center w-20 md:w-auto p-2 md:p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-md hover:shadow-lg transition-all text-white"
      >
        <span className="text-xl md:text-3xl mb-1">🏷️</span>
        <span className="text-xs md:text-sm font-medium">Ofertas</span>
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className="flex-shrink-0 flex flex-col items-center justify-center w-20 md:w-auto p-2 md:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <span className="text-xl md:text-3xl mb-1">{cat.emoji}</span>
          <span className="text-xs md:text-sm font-medium text-gray-700">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};
