'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface GalleryImage {
  _id: string;
  type: 'slider' | 'gallery';
  column?: number;
  url: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  order: number;
  active: boolean;
}

interface FormData {
  type: 'slider' | 'gallery';
  column: string;
  url: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  order: string;
}

const initialForm: FormData = {
  type: 'slider',
  column: '1',
  url: '',
  title: '',
  subtitle: '',
  description: '',
  badge: '',
  order: '0',
};

export default function GalleryAdminPage() {
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery/all`);
      const data = await response.json();
      setImages(data.data || []);
    } catch (err) {
      setError('Error al cargar imágenes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      type: image.type,
      column: image.column?.toString() || '1',
      url: image.url,
      title: image.title || '',
      subtitle: image.subtitle || '',
      description: image.description || '',
      badge: image.badge || '',
      order: image.order.toString(),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      type: formData.type,
      column: formData.type === 'gallery' ? parseInt(formData.column) : undefined,
      url: formData.url,
      title: formData.title || undefined,
      subtitle: formData.subtitle || undefined,
      description: formData.description || undefined,
      badge: formData.badge || undefined,
      order: parseInt(formData.order),
    };

    try {
      const url = editingImage 
        ? `${API_URL}/api/gallery/${editingImage._id}`
        : `${API_URL}/api/gallery`;
      
      const response = await fetch(url, {
        method: editingImage ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al guardar');

      setSuccessMessage(editingImage ? 'Imagen actualizada' : 'Imagen creada');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowForm(false);
      setEditingImage(null);
      setFormData(initialForm);
      fetchImages();
    } catch (err) {
      setError('Error al guardar la imagen');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return;

    try {
      await fetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
      setSuccessMessage('Imagen eliminada');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchImages();
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/gallery/${id}/toggle`, { method: 'PATCH' });
      fetchImages();
    } catch (err) {
      setError('Error al cambiar estado');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingImage(null);
    setFormData(initialForm);
  };

  const filteredImages = filterType 
    ? images.filter(img => img.type === filterType)
    : images;

  const sliderCount = images.filter(img => img.type === 'slider').length;
  const galleryCount = images.filter(img => img.type === 'gallery').length;

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Galería</h1>
        <div className="mt-8 animate-pulse h-32 bg-gray-200 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              Admin
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Galería</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Galería</h1>
          <p className="text-gray-600 mt-1">Administra el slider y las imágenes de la galería</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }} variant="primary">
          + Nueva Imagen
        </Button>
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-500">Slider</p>
          <p className="text-2xl font-bold text-blue-600">{sliderCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-500">Galería</p>
          <p className="text-2xl font-bold text-purple-600">{galleryCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-500">Activas</p>
          <p className="text-2xl font-bold text-green-600">{images.filter(i => i.active).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-500">Inactivas</p>
          <p className="text-2xl font-bold text-red-600">{images.filter(i => !i.active).length}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterType('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas ({images.length})
        </button>
        <button
          onClick={() => setFilterType('slider')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'slider' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🖼️ Slider ({sliderCount})
        </button>
        <button
          onClick={() => setFilterType('gallery')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'gallery' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📷 Galería ({galleryCount})
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-500">
          <h2 className="text-xl font-bold mb-4">
            {editingImage ? 'Editar Imagen' : 'Nueva Imagen'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as 'slider' | 'gallery' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="slider">🖼️ Slider</option>
                  <option value="gallery">📷 Galería</option>
                </select>
              </div>

              {formData.type === 'gallery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Columna *</label>
                  <select
                    value={formData.column}
                    onChange={e => setFormData({ ...formData, column: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">Columna 1 (↑)</option>
                    <option value="2">Columna 2 (↓)</option>
                    <option value="3">Columna 3 (↑)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={e => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen *</label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.unsplash.com/photo-xxx?w=800"
              />
              {formData.url && (
                <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={formData.url} alt="Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>

            {formData.type === 'slider' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="HASTA 50% OFF"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="En toda la colección"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                    <select
                      value={formData.badge}
                      onChange={e => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sin badge</option>
                      <option value="LIMITADO">LIMITADO</option>
                      <option value="NUEVO">NUEVO</option>
                      <option value="OFERTA">OFERTA</option>
                      <option value="TOP">TOP</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary">
                {editingImage ? 'Actualizar' : 'Crear Imagen'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          ))
        ) : filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No hay imágenes. Hacé click en "Nueva Imagen" para agregar.
          </div>
        ) : (
          filteredImages.map((image) => (
            <div
              key={image._id}
              className={`relative group rounded-xl overflow-hidden shadow-md ${
                !image.active ? 'opacity-50' : ''
              }`}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.url}
                  alt={image.title || 'Image'}
                  fill
                  className="object-cover"
                  unoptimized
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleToggle(image._id)}
                    className={`p-2 rounded-full ${
                      image.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    {image.active ? '✓' : '○'}
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  image.type === 'slider' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {image.type === 'slider' ? '🖼️' : `📷 Col.${image.column}`}
                </span>
              </div>

              {image.badge && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 rounded text-xs font-bold bg-red-500 text-white">
                    {image.badge}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
