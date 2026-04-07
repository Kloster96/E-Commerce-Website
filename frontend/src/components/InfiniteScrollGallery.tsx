'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface GalleryImage {
  _id: string;
  url: string;
  column: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const FALLBACK_IMAGES = {
  column1: [
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
  ],
  column2: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
  ],
  column3: [
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400',
  ],
};

export const InfiniteScrollGallery = () => {
  const [column1, setColumn1] = useState<string[]>(FALLBACK_IMAGES.column1);
  const [column2, setColumn2] = useState<string[]>(FALLBACK_IMAGES.column2);
  const [column3, setColumn3] = useState<string[]>(FALLBACK_IMAGES.column3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery/gallery`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        const col1 = data.data.filter((img: GalleryImage) => img.column === 1).map((img: GalleryImage) => img.url);
        const col2 = data.data.filter((img: GalleryImage) => img.column === 2).map((img: GalleryImage) => img.url);
        const col3 = data.data.filter((img: GalleryImage) => img.column === 3).map((img: GalleryImage) => img.url);
        
        if (col1.length > 0) setColumn1(col1);
        if (col2.length > 0) setColumn2(col2);
        if (col3.length > 0) setColumn3(col3);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Duplicar imágenes para loop infinito
  const images1 = [...column1, ...column1];
  const images2 = [...column2, ...column2];
  const images3 = [...column3, ...column3];

  if (loading) {
    return (
      <div className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl h-[500px] md:h-[600px] bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <style jsx>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        .scroll-up {
          animation: scrollUp 30s linear infinite;
        }
        
        .scroll-down {
          animation: scrollDown 30s linear infinite;
        }
        
        .gallery-container:hover .scroll-up,
        .gallery-container:hover .scroll-down {
          animation-play-state: paused;
        }
      `}</style>

      <div className="gallery-container grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Columna 1 - Scroll hacia ARRIBA */}
        <div className="overflow-hidden rounded-2xl h-[500px] md:h-[600px]">
          <div className="scroll-up flex flex-col gap-3 md:gap-4">
            {images1.map((img, index) => (
              <div 
                key={index}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna 2 - Scroll hacia ABAJO (solo visible en md+) */}
        <div className="hidden md:block overflow-hidden rounded-2xl h-[600px]">
          <div className="scroll-down flex flex-col gap-4">
            {images2.map((img, index) => (
              <div 
                key={index}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna 3 - Scroll hacia ARRIBA */}
        <div className="overflow-hidden rounded-2xl h-[500px] md:h-[600px]">
          <div className="scroll-up flex flex-col gap-3 md:gap-4" style={{ animationDelay: '-15s' }}>
            {images3.map((img, index) => (
              <div 
                key={index}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
