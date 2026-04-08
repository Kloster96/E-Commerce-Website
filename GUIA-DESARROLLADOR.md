# 💻 Guía para Desarrolladores

> Guía técnica para desarrolladores que necesiten entender, modificar o extender el proyecto.

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Express.js, Node.js, MongoDB (Mongoose) |
| **Pagos** | MercadoPago SDK |
| **Deploy** | Vercel (Frontend), Render (Backend) |

---

## 📁 Estructura del Proyecto

```
E-Commerce-Website/
├── frontend/                 # Next.js App Router
│   ├── src/
│   │   ├── app/            # Páginas (page.tsx, layout.tsx)
│   │   ├── components/     # Componentes React
│   │   ├── models/         # Interfaces TypeScript
│   │   ├── store/         # Zustand (estado global)
│   │   ├── services/      # Llamadas API
│   │   └── adapters/      # Transformación de datos
│   ├── package.json
│   └── next.config.js
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/    # Lógica de rutas
│   │   ├── models/        # Modelos Mongoose
│   │   ├── routes/        # Definición de rutas
│   │   ├── services/     # Lógica de negocio
│   │   ├── middleware/   # Middleware Express
│   │   └── index.ts      # Entry point
│   ├── package.json
│   └── Procfile           # Render config
│
├── README.md
├── GUIA-USUARIO.md
└── GUIA-DESARROLLADOR.md
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Prerrequisitos

- Node.js 18+
- MongoDB (local o Atlas)

### 1. Clonar y preparar

```bash
git clone https://github.com/Kloster96/E-Commerce-Website.git
cd E-Commerce-Website
```

### 2. Backend

```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env
# Editar .env con tus credenciales

npm run dev
# Backend corriendo en http://localhost:3001
```

**Variables del backend (.env):**
```env
PORT=3001
MONGO_URI=mongodb+srv://tu_connection_string
MERCADOPAGO_ACCESS_TOKEN=tu_token
MERCADOPAGO_SANDBOX=true
```

### 3. Frontend

```bash
cd frontend
npm install

# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

npm run dev
# Frontend corriendo en http://localhost:3000
```

---

## 📡 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Listar productos (soporta filtros) |
| GET | `/api/products/:id` | Obtener un producto |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

**Parámetros de query:**
- `category`: Filtrar por categoría
- `search`: Búsqueda por nombre
- `brand`: Filtrar por marca
- `sort`: Ordenamiento (price_asc, price_desc, discount, popular)
- `page`, `limit`: Paginación

### Galería

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/gallery/slider` | Imágenes del slider |
| GET | `/api/gallery/gallery` | Imágenes de la galería |
| GET | `/api/gallery/all` | Todas las imágenes |
| POST | `/api/gallery` | Crear imagen |
| PUT | `/api/gallery/:id` | Actualizar imagen |
| DELETE | `/api/gallery/:id` | Eliminar imagen |
| PATCH | `/api/gallery/:id/toggle` | Activar/desactivar |

### Pagos (MercadoPago)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/payment/create-preference` | Crear preferencia de pago |

---

## 🎨 Convenciones de Código

### Frontend

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase (`useDebounce.ts`)
- **Páginas**: `page.tsx` (Next.js App Router)
- **Estilos**: Tailwind CSS
- **Estado**: Zustand en `/store`

### Backend

- **Controladores**: Singular, ejemplo `ProductController.ts`
- **Rutas**: Plural, ejemplo `/api/products`
- **Modelos**: Singular, ejemplo `Product.ts`
- **Servicios**: Nombre descriptivo, ejemplo `ProductService.ts`

---

## 🔧 Scripts Disponibles

### Frontend

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servir producción
npm run lint     # Linter
```

### Backend

```bash
npm run dev          # Desarrollo con tsx
npm run build        # Compilar TypeScript
npm run start        # Producción (node)
npm run seed:products  # Cargar productos de prueba
npm run seed:gallery   # Cargar imágenes de prueba
```

---

## ☁️ Deploy

### Frontend → Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Importar repositorio `E-Commerce-Website`
3. Framework: **Next.js**
4. Agregar variable de entorno:
   - `NEXT_PUBLIC_API_URL` = URL del backend en Render
5. Deploy automático en push a main

### Backend → Render

1. Ir a [render.com](https://render.com)
2. Nuevo **Web Service**
3. Conectar repositorio GitHub
4. Configuración:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npx tsx src/index.ts`
5. Environment Variables:
   - `PORT=3001`
   - `MONGO_URI=tu_mongodb_connection_string`
6. Deploy

---

## ⚠️ Notas Importantes

### MercadoPago

- Requiere cuenta verificada para pagos reales
- Modo sandbox usa usuarios de prueba
- Configurar con variables de entorno

### Imágenes

- Usan Unsplash para desarrollo
- Pueden caducar o no cargar
- En producción, usar Cloudinary o similar

### Autenticación Admin

-当前没有真正的保护
- Cookies básico (sin JWT)
- Cambiar credenciales en producción

---

## 🐛 Troubleshooting

### Error de conexión con MongoDB

Verificar que `MONGO_URI` sea correcta y la red permita conexión a Atlas.

### Error de build en Vercel

Limpiar cache: `rm -rf frontend/.next`

### Imágenes no cargan

Verificar que `next.config.js` tenga los dominios permitidos en `images.remotePatterns`.

---

## 📞 Soporte

Para dudas técnicas o reportar bugs, contactar al equipo de desarrollo.

---

*Guía técnica para desarrolladores del E-Commerce Website*