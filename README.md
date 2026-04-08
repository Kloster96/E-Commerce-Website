# 🛒 E-Commerce Website

> Tienda online de sneakers y ropa deportiva desarrollada con Next.js y Express.

## 🌐 Ver la tienda

**URL:** **[Sitio Web de la tienda](https://e-commerce-website-gp9e2r1d4-kloster96s-projects.vercel.app)**

---

## 📋 Descripción del Proyecto

Este es un **e-commerce completo** para la venta de zapatillas, ropa y accesorios deportivos. El sistema incluye:

- 🛍️ **Catálogo de productos** con filtros por categoría, búsqueda y ordenamiento
- 🛒 **Carrito de compras** con gestión de talles y colores
- 💳 **Checkout** con integración a MercadoPago (opcional)
- 👨‍💼 **Panel de administración** para gestionar productos, galería y más
- 📱 **Diseño responsive** adaptado a móviles y escritorio
- 🎨 **Galería visual** con slider y scroll infinito

---

## 👥 ¿Para quién es este documento?

### Para **Non-Técnicos** (RH, Marketing, Dueños del negocio)

Ir a la sección: **[GUIA-USUARIO.md](./GUIA-USUARIO.md)**

### Para **Desarrolladores** (Técnicos)

Ir a la sección: **[GUIA-DESARROLLADOR.md](./GUIA-DESARROLLADOR.md)**

---

## 🏪 Cómo usar la tienda

### 1. Acceder al sitio

El sitio está disponible en: **https://tu-url-de-vercel.com**

### 2. Navegar por el catálogo

- **Explorar productos**: En la página principal verás todos los productos
- **Filtrar por categoría**: Usa los botones superiores (Sneakers, Remeras, Pantalones, etc.)
- **Buscar**: Usa el buscador para encontrar productos específicos
- **Ordenar**: Podés ordenar por precio, descuento o popularidad

### 3. Comprar un producto

1. **Elegir producto**: Click en cualquier producto para ver los detalles
2. **Seleccionar talle**: Elegí tu número/talle en la tabla
3. **Seleccionar color** (si aplica): Los colores aparecen como opciones
4. **Agregar al carrito**: Click en "Agregar al Carrito"
5. **Ir al carrito**: Click en el ícono del carrito arriba a la derecha
6. **Finalizar compra**: Completá los datos y confirmación

### 4. Panel de Administración

El panel de admin permite gestionar:

- **Ver productos**: Lista de todos los productos con stock
- **Editar productos**: Cambiar precios, descripciones, stock
- **Gestionar galería**: Agregar/modificar imágenes del slider y galería
- **Ver pedidos**: (Próximamente) Pedidos realizados

#### ¿Cómo acceder al admin?

1. Ir a: `/login`
2. Usuario: `admin`
3. Contraseña: `admin123` ⚠️ **Cambiar en producción**

#### Funciones del Admin:

| Función | Descripción |
|---------|-------------|
| **Stock por talle** | Podés ver y editar el stock de cada talle |
| **Productos destacados** | Marcar productos como destacados |
| **Descuentos** | Aplicar descuentos en porcentaje |
| **Galería** | Agregar imágenes al slider y galería |

---

## 💻 Para Desarrolladores

### 🛠️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|-------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Express.js, Node.js, MongoDB (Mongoose) |
| **Pagos** | MercadoPago (opcional) |
| **Deploy** | Vercel (Frontend), Render (Backend) |
| **Imágenes** | Unsplash (desarrollo), Cloudinary (próximamente) |

### 📁 Estructura del Proyecto

```
E-Commerce-Website/
├── frontend/                 # Aplicación Next.js
│   ├── src/
│   │   ├── app/            # Páginas y rutas
│   │   ├── components/     # Componentes reutilizables
│   │   ├── models/         # Tipos e interfaces TypeScript
│   │   ├── store/          # Estado global (Zustand)
│   │   ├── services/       # Servicios API
│   │   └── adapters/       # Adaptadores de datos
│   └── package.json
│
├── backend/                  # API Express
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── models/        # Modelos de MongoDB
│   │   ├── routes/        # Definición de rutas API
│   │   ├── services/      # Lógica de negocio
│   │   └── middleware/    # Middleware Express
│   └── package.json
│
└── README.md               # Este archivo
```

### 🚀 Variables de Entorno

#### Frontend (`.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (`.env`)

```env
PORT=3001
MONGO_URI=mongodb+srv://...
MERCADOPAGO_ACCESS_TOKEN=tu_token
MERCADOPAGO_SANDBOX=true
```

### ⚡ Scripts

#### Frontend

```bash
cd frontend
npm install
npm run dev     # Desarrollo en http://localhost:3000
npm run build   # Build para producción
npm run start   # Producción
```

#### Backend

```bash
cd backend
npm install
npm run dev     # Desarrollo en http://localhost:3001
npm run start   # Producción
```

### 🔧 Cargar Datos de Prueba (Seed)

El backend incluye scripts para cargar productos de ejemplo:

```bash
cd backend

# Cargar productos
npm run seed:products

# Cargar galería
npm run seed:gallery
```

---

## ☁️ Deploy

### Frontend → Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Importar el repositorio `E-Commerce-Website`
3. Framework: **Next.js**
4. Agregar variable:
   - `NEXT_PUBLIC_API_URL` = `https://tu-backend.onrender.com`
5. Deploy automático

### Backend → Render

1. Ir a [render.com](https://render.com)
2. Nuevo **Web Service**
3. Conectar el repositorio
4. Configuración:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npx tsx src/index.ts`
5. Variables:
   - `PORT=3001`
   - `MONGO_URI=tu_connection_string`
6. Deploy

---

## ⚠️ Notas Importantes

1. **MercadoPago**: Requiere cuenta verificada para aceptar pagos reales. En modo sandbox funciona con usuarios de prueba.

2. **Imágenes**: Las imágenes de productos son de Unsplash (servicio externo). Pueden caducar o no cargar.

3. **MongoDB**: Se requiere una base de datos MongoDB Atlas o local.

4. **Seguridad**: Las credenciales del admin (`admin/admin123`) deben cambiarse en producción mediante variables de entorno (`ADMIN_USER`, `ADMIN_PASS`).

---

## 📞 Soporte

Para dudas técnicas o reportar problemas, contactá al equipo de desarrollo.

---

*Documento generado automáticamente para el proyecto E-Commerce Website*
