'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, sortSizes } from '@/models';
import { formatPrice } from '@/adapters';
import { Button } from '@/components';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const CATEGORIES = [
  { value: 'sneakers', label: 'Sneakers', emoji: '👟' },
  { value: 'remeras', label: 'Remeras', emoji: '👕' },
  { value: 'pantalones', label: 'Pantalones', emoji: '👖' },
  { value: 'camperas', label: 'Camperas', emoji: '🧥' },
  { value: 'buzos', label: 'Buzos', emoji: '🧶' },
  { value: 'musculosas', label: 'Musculosas', emoji: '🎽' },
  { value: 'accesorios', label: 'Accesorios', emoji: '🎒' },
];

const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Reebok', 'Converse', 'Vans', 'Levi\'s', 'The North Face', 'Fila', 'Otro'];
const GENDERS = ['unisex', 'hombre', 'mujer'];

const SIZES_BY_CATEGORY: Record<string, string[]> = {
  sneakers: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
  remeras: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  pantalones: ['28', '30', '32', '34', '36', '38', '40'],
  camperas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  buzos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  musculosas: ['S', 'M', 'L', 'XL', 'XXL'],
  accesorios: ['Única'],
};

interface ColorEntry {
  name: string;
  images: string[];
}

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  price: string;
  discount: string;
  description: string;
  images: string[];
  sizes: string[];
  stockBySize: Record<string, string>;
  gender: string;
  colors: ColorEntry[];
  featured: boolean;
}

const initialForm: ProductFormData = {
  name: '',
  category: '',
  brand: '',
  price: '',
  discount: '0',
  description: '',
  images: [''],
  sizes: [],
  stockBySize: {},
  gender: 'unisex',
  colors: [],
  featured: false,
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = filterCategory 
        ? `${API_URL}/api/products?category=${filterCategory}`
        : `${API_URL}/api/products`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  // Calcular stock total
  const getTotalStock = (stockBySize: Record<string, string> | undefined): number => {
    if (!stockBySize) return 0;
    return Object.values(stockBySize).reduce((sum, qty) => sum + (parseInt(qty) || 0), 0);
  };

  const handleEdit = (product: Product) => {
    // Convertir stockBySize de number a string para el form
    const stockBySizeStrings: Record<string, string> = {};
    if (product.stockBySize) {
      Object.entries(product.stockBySize).forEach(([size, qty]) => {
        stockBySizeStrings[size] = qty.toString();
      });
    }

    // Si no hay stockBySize, usar el stock total como fallback
    if (Object.keys(stockBySizeStrings).length === 0 && (product as any).stock) {
      // Repartir el stock total entre los talles evenly
      const totalStock = (product as any).stock;
      const sizeCount = product.sizes.length;
      const perSize = Math.floor(totalStock / sizeCount);
      const remainder = totalStock % sizeCount;
      product.sizes.forEach((size, i) => {
        stockBySizeStrings[size] = (perSize + (i < remainder ? 1 : 0)).toString();
      });
    }

    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price.toString(),
      discount: (product.discount || 0).toString(),
      description: product.description,
      images: product.images.length > 0 ? product.images : [''],
      sizes: sortSizes(product.sizes),
      stockBySize: stockBySizeStrings,
      gender: product.gender || 'unisex',
      colors: product.colors || [],
      featured: product.featured || false,
    });
    setShowForm(true);
    
    // Scroll al formulario
    setTimeout(() => {
      document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que querés eliminar este producto?')) return;

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar');

      setSuccessMessage('Producto eliminado correctamente');
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchProducts();
    } catch (err) {
      setError('Error al eliminar el producto');
    }
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      
      // Ordenar talles numéricamente
      const sortedSizes = sortSizes(newSizes);
      
      return { ...prev, sizes: sortedSizes };
    });
  };

  const handleStockBySizeChange = (size: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      stockBySize: {
        ...prev.stockBySize,
        [size]: value,
      },
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length <= 1) return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Funciones para manejar colores
  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', images: [''] }],
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleColorNameChange = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index].name = value;
    setFormData({ ...formData, colors: newColors });
  };

  const handleColorImageChange = (colorIndex: number, imageIndex: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[colorIndex].images[imageIndex] = value;
    setFormData({ ...formData, colors: newColors });
  };

  const addColorImage = (colorIndex: number) => {
    const newColors = [...formData.colors];
    newColors[colorIndex].images.push('');
    setFormData({ ...formData, colors: newColors });
  };

  const removeColorImage = (colorIndex: number, imageIndex: number) => {
    if (formData.colors[colorIndex].images.length <= 1) return;
    const newColors = [...formData.colors];
    newColors[colorIndex].images = newColors[colorIndex].images.filter((_, i) => i !== imageIndex);
    setFormData({ ...formData, colors: newColors });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Filtrar colores vacíos y sus imágenes
    const validColors = formData.colors
      .filter(c => c.name.trim() !== '')
      .map(c => ({
        name: c.name.trim(),
        images: c.images.filter(img => img.trim() !== ''),
      }))
      .filter(c => c.images.length > 0);

    // Convertir stockBySize a números
    const stockBySizeNumbers: Record<string, number> = {};
    Object.entries(formData.stockBySize).forEach(([size, qty]) => {
      const num = parseInt(qty) || 0;
      if (num > 0) {
        stockBySizeNumbers[size] = num;
      }
    });

    const payload = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: parseInt(formData.price),
      discount: parseInt(formData.discount) || 0,
      description: formData.description,
      images: validColors.length > 0 ? validColors[0].images : formData.images.filter(img => img.trim() !== ''),
      sizes: formData.sizes,
      stockBySize: stockBySizeNumbers,
      gender: formData.gender,
      colors: validColors,
      featured: formData.featured,
    };

    try {
      let response;
      if (editingProduct) {
        response = await fetch(`${API_URL}/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) throw new Error('Error al guardar');

      setSuccessMessage(editingProduct ? 'Producto actualizado' : 'Producto creado');
      setTimeout(() => setSuccessMessage(null), 3000);
      setShowForm(false);
      setEditingProduct(null);
      setFormData(initialForm);
      fetchProducts();
    } catch (err) {
      setError('Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData(initialForm);
    setError(null);
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="mt-8 animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestioná tu catálogo de productos</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/galeria">
            <Button variant="outline">
              🖼️ Galería
            </Button>
          </Link>
          <Button
            onClick={() => { resetForm(); setShowForm(true); }}
            variant="primary"
          >
            + Nuevo Producto
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterCategory === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterCategory === cat.value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Mensajes */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div id="product-form" className="mb-8 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-500 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del producto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  required
                  value={formData.category}
                  onChange={e => {
                    setFormData({ ...formData, category: e.target.value, sizes: [], stockBySize: {} });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar categoría</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.emoji} {cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                <select
                  required
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar marca</option>
                  {BRANDS.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (ARS) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="149999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descuento (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={e => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
                {formData.discount && parseInt(formData.discount) > 0 && formData.price && (
                  <p className="text-sm text-green-600 mt-1">
                    Precio con descuento: ${Math.round(parseInt(formData.price) * (1 - parseInt(formData.discount) / 100)).toLocaleString('es-AR')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GENDERS.map(g => (
                    <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">⭐ Producto Destacado</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del producto..."
              />
            </div>

            {/* Talles con stock por talle */}
            {formData.category && (
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Talles disponibles *
                </label>
                
                {/* Selector de talles */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(SIZES_BY_CATEGORY[formData.category] || []).map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors ${
                        formData.sizes.includes(size)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Stock por talle */}
                {formData.sizes.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Stock por talle:</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {formData.sizes.map(size => (
                        <div key={size} className="text-center">
                          <label className="block text-xs text-gray-500 mb-1">{size}</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.stockBySize[size] || ''}
                            onChange={e => handleStockBySizeChange(size, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-2 text-right">
                      Total: {getTotalStock(formData.stockBySize)} unidades
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Colores con imágenes */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Colores e Imágenes</label>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Agregar Color
                </button>
              </div>

              {formData.colors.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Agregá colores para que los clientes puedan elegir. 
                  Si no agregás colores, se usará la imagen principal.
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <input
                          type="text"
                          value={color.name}
                          onChange={e => handleColorNameChange(colorIndex, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nombre del color (ej: Negro)"
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(colorIndex)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕ Eliminar
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Imágenes para este color:</p>
                        {color.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="flex gap-2">
                            <input
                              type="url"
                              value={img}
                              onChange={e => handleColorImageChange(colorIndex, imgIndex, e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="https://images.unsplash.com/photo-xxx?w=800"
                            />
                            {img && (
                              <div className="relative w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={img}
                                  alt="preview"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}
                            {color.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeColorImage(colorIndex, imgIndex)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addColorImage(colorIndex)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          + Agregar imagen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Imágenes principales (solo si no hay colores) */}
            {formData.colors.length === 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URLs de Imágenes (sin colores)</label>
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={img}
                      onChange={e => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://images.unsplash.com/photo-xxx?w=800"
                    />
                    {img && (
                      <div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={img}
                          alt="preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Agregar otra imagen
                </button>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || formData.sizes.length === 0}
              >
                {isSubmitting ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear Producto'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de productos */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Cargando productos...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay productos. Hacé click en "Nuevo Producto" para crear uno.
                  </td>
                </tr>
              ) : (
                products.map(product => {
                  // Calcular stock total desde stockBySize o el campo legacy
                  const totalStock = product.stockBySize 
                    ? Object.values(product.stockBySize).reduce((sum, qty) => sum + (qty || 0), 0)
                    : (product as any).stock || 0;
                  
                  return (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.images[0] || '/placeholder.png'}
                              alt={product.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            {product.colors && product.colors.length > 0 && (
                              <p className="text-xs text-gray-500">
                                {product.colors.map(c => c.name).join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{product.brand}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          totalStock > 10 ? 'bg-green-100 text-green-800' :
                          totalStock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {totalStock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500">Stock Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {products.reduce((sum, p) => {
              const stock = p.stockBySize 
                ? Object.values(p.stockBySize).reduce((s, q) => s + (q || 0), 0)
                : (p as any).stock || 0;
              return sum + stock;
            }, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500">Marcas</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Set(products.map(p => p.brand)).size}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500">Categorías</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Set(products.map(p => p.category)).size}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500">Sin Stock</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => {
              const stock = p.stockBySize 
                ? Object.values(p.stockBySize).reduce((s, q) => s + (q || 0), 0)
                : (p as any).stock || 0;
              return stock === 0;
            }).length}
          </p>
        </div>
      </div>
    </div>
  );
}