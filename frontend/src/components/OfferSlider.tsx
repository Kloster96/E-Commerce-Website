'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SliderImage {
  _id: string;
  url: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const FALLBACK_SLIDES = [
  { _id: '1', url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200', title: 'HASTA 50% OFF', subtitle: 'En toda la colección', description: 'Las mejores marcas a precios increíbles.', badge: 'LIMITADO' },
  { _id: '2', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', title: 'NUEVA COLECCIÓN', subtitle: 'Otoño/Invierno 2026', description: 'Camperas, buzos y pantalones nuevos.', badge: 'NUEVO' },
  { _id: '3', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200', title: '2x1 EN REMERAS', subtitle: 'Solo por tiempo limitado', description: 'Llevá 2 y pagá solo 1.', badge: 'OFERTA' },
  { _id: '4', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200', title: 'ESTILO URBANO', subtitle: 'Lo que todos eligen', description: 'Los productos más populares.', badge: 'TOP' },
];

export const OfferSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SliderImage[]>(FALLBACK_SLIDES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery/slider`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setSlides(data.data);
      }
    } catch (error) {
      console.error('Error fetching slider:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading || slides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl aspect-[16/7] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
      <div className="relative aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-105 z-0'
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.title || 'Slide'}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
              unoptimized
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="max-w-2xl mx-auto text-center">
                  {slide.badge && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider text-white ${
                        slide.badge === 'LIMITADO' ? 'bg-red-500 animate-pulse' :
                        slide.badge === 'NUEVO' ? 'bg-blue-500' :
                        slide.badge === 'OFERTA' ? 'bg-orange-500 animate-pulse' :
                        'bg-purple-500'
                      }`}>
                        {slide.badge}
                      </span>
                      <span className="text-white/60 text-sm font-medium">Oferta Especial</span>
                    </div>
                  )}

                  {slide.title && (
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-2 leading-tight">
                      {slide.title}
                    </h2>
                  )}

                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mb-4">
                      {slide.subtitle}
                    </p>
                  )}

                  {slide.description && (
                    <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones prev/next */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
        aria-label="Anterior"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
        aria-label="Siguiente"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
