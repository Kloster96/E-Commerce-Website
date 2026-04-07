Prompt: Fullstack Sneaker Store (Clean Architecture)

**Contexto:** Actúa como un Arquitecto de Software Senior. Necesito crear un Ecommerce de zapatillas llamado "Sneaker Vault". El proyecto debe ser Fullstack, utilizando Next.js para el Frontend y Node.js/Express para el Backend, siguiendo principios de Clean Architecture y tipos estrictos en TypeScript.

---

## 🏗️ Requisitos del Backend (Node.js + Express + MongoDB)

Genera el código para una API REST profesional con la siguiente estructura de carpetas: `src/models`, `src/controllers`, `src/routes`, `src/services` y `src/middleware`.

1. **Base de Datos:** Configura la conexión a MongoDB usando Mongoose.
2. **Modelo (Schema):** Crea un modelo `Sneaker` con:
   - `name` (String), `brand` (String), `price` (Number), `description` (String).
   - `images` (Array de Strings).
   - `sizes` (Array de Numbers, ej: [38, 39, 40, 41, 42, 43, 44, 45]).
   - `stock` (Number).
3. **Controladores y Rutas:**
   - `GET /api/sneakers`: Debe permitir filtrar por `brand` mediante query params.
   - `GET /api/sneakers/:id`: Detalle del producto.
   - `POST /api/sneakers`: Endpoint para cargar productos.
4. **Clean Code:** Usa un middleware para el manejo de errores global y tipado estricto para las peticiones y respuestas.

---

## 🎨 Requisitos del Frontend (Next.js 14+ App Router)

Crea un frontend moderno y responsive usando Tailwind CSS.

1. **Estructura de Carpetas:** Sigue el patrón de Gentleman Programming:
   - `src/components`: Componentes reutilizables (Button, Card, Navbar).
   - `src/models`: Interfaces de TypeScript.
   - `src/adapters`: Para transformar los datos de la API al formato que necesita la UI.
   - `src/services`: Para las llamadas a la API (usando fetch).
   - `src/store`: Gestión de estado global con **Zustand** para el carrito.
2. **Componentes Clave:**
   - `ProductGrid`: Server Component que hace el fetch inicial a la API.
   - `ProductCard`: Con efectos de hover y diseño limpio.
   - `CartStore`: Estado de Zustand que permita agregar/quitar zapatillas y calcular el total, persistiendo en LocalStorage.
3. **UX/UI:** Implementa `loading.tsx` para Skeleton Screens y usa `next/image` para optimizar las fotos de las zapatillas.

---

## 🛠️ Archivo de Configuración y Seed

1. Provee un archivo `.env.example` con las variables necesarias (MONGO_URI, PORT, API_URL).
2. Provee un script `seed.ts` para poblar la base de datos con al menos 5 zapatillas de ejemplo (Nike, Adidas, Jordan) con sus respectivos talles y precios en ARS.

---

**Resultado esperado:** Código modular, fácil de leer, listo para ser implementado en OpenCode y escalable para futuras funcionalidades como Autenticación o Checkout.
"""

with open("/mnt/data/prompt-ecommerce-sneakers.md", "w", encoding="utf-8") as f:
    f.write(content)