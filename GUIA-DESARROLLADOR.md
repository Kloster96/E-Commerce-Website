# 💻 Developer Guide

> Technical guide for developers who need to understand, modify, or extend the project.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Express.js, Node.js, MongoDB (Mongoose) |
| **Payments** | MercadoPago SDK |
| **Deploy** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
E-Commerce-Website/
├── frontend/                 # Next.js App Router
│   ├── src/
│   │   ├── app/            # Pages (page.tsx, layout.tsx)
│   │   ├── components/     # React components
│   │   ├── models/         # TypeScript interfaces
│   │   ├── store/          # Zustand (global state)
│   │   ├── services/       # API calls
│   │   └── adapters/       # Data transformation
│   ├── package.json
│   └── next.config.js
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/    # Route logic
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Route definitions
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Entry point
│   ├── package.json
│   └── Procfile            # Render config
│
├── README.md
├── USER-GUIDE.md
└── DEVELOPER-GUIDE.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and set up

```bash
git clone https://github.com/Kloster96/E-Commerce-Website.git
cd E-Commerce-Website
```

### 2. Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

npm run dev
# Backend running at http://localhost:3001
```

**Backend environment variables (.env):**
```env
PORT=3001
MONGO_URI=mongodb+srv://your_connection_string
MERCADOPAGO_ACCESS_TOKEN=your_token
MERCADOPAGO_SANDBOX=true
```

### 3. Frontend

```bash
cd frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

npm run dev
# Frontend running at http://localhost:3000
```

---

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports filters) |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

**Query parameters:**
- `category`: Filter by category
- `search`: Search by name
- `brand`: Filter by brand
- `sort`: Sorting (price_asc, price_desc, discount, popular)
- `page`, `limit`: Pagination

### Gallery

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery/slider` | Slider images |
| GET | `/api/gallery/gallery` | Gallery images |
| GET | `/api/gallery/all` | All images |
| POST | `/api/gallery` | Create image |
| PUT | `/api/gallery/:id` | Update image |
| DELETE | `/api/gallery/:id` | Delete image |
| PATCH | `/api/gallery/:id/toggle` | Enable/disable image |

### Payments (MercadoPago)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-preference` | Create payment preference |

---

## 🎨 Code Conventions

### Frontend

- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase (`useDebounce.ts`)
- **Pages**: `page.tsx` (Next.js App Router)
- **Styles**: Tailwind CSS
- **State**: Zustand in `/store`

### Backend

- **Controllers**: Singular, e.g. `ProductController.ts`
- **Routes**: Plural, e.g. `/api/products`
- **Models**: Singular, e.g. `Product.ts`
- **Services**: Descriptive name, e.g. `ProductService.ts`

---

## 🔧 Available Scripts

### Frontend

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run linter
```

### Backend

```bash
npm run dev            # Development with tsx
npm run build          # Compile TypeScript
npm run start          # Production (node)
npm run seed:products  # Load sample products
npm run seed:gallery   # Load sample images
```

---

## ☁️ Deployment

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import the `E-Commerce-Website` repository
3. Framework: **Next.js**
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend URL on Render
5. Auto-deploy on push to main

### Backend → Render

1. Go to [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configuration:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npx tsx src/index.ts`
5. Environment Variables:
   - `PORT=3001`
   - `MONGO_URI=your_mongodb_connection_string`
6. Deploy

---

## ⚠️ Important Notes

### MercadoPago

- Requires a verified account for real payments
- Sandbox mode uses test users
- Configure via environment variables

### Images

- Unsplash is used for development
- Images may expire or fail to load
- For production, use Cloudinary or a similar service

### Admin Authentication

- No real protection currently implemented
- Basic cookies (no JWT)
- Change credentials before going to production

---

## 🐛 Troubleshooting

### MongoDB connection error

Verify that `MONGO_URI` is correct and that your network allows connections to Atlas.

### Vercel build error

Clear the cache: `rm -rf frontend/.next`

### Images not loading

Check that `next.config.js` has the allowed domains configured under `images.remotePatterns`.

---
