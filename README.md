# 🛒 E-Commerce Website

> Online store for sneakers and sportswear.

---

## 📋 Project Description

This is a **full e-commerce** system for the sale of sneakers, clothing, and sports accessories. The system includes:

- 🛍️ **Product catalog** with category filters, search, and sorting
- 🛒 **Shopping cart** with size and color management
- 💳 **Checkout** with MercadoPago integration (optional)
- 👨‍💼 **Admin panel** to manage products, gallery, and more
- 📱 **Responsive design** adapted for mobile and desktop
- 🎨 **Visual gallery** with slider and infinite scroll

---

## 👥 Who is this document for?

### For **Non-Technical Users** (HR, Marketing, Business Owners)

Go to section: **[USER-GUIDE.md](./GUIA-USUARIO.md)**

### For **Developers** (Technical)

Go to section: **[DEVELOPER-GUIDE.md](./GUIA-DESARROLLADOR.md)**

---

## 🏪 How to use the store

### 1. Access the site
🌐 Live Demo
**[View the store →](https://e-commerce-website-hazel-gamma.vercel.app)**

### 2. Navigate the catalog

- **Explore products**: You will see all products on the main page
- **Filter by category**: Use the top buttons (Sneakers, T-shirts, Pants, etc.)
- **Search**: Use the search bar to find specific products
- **Sort**: You can sort by price, discount, or popularity

### 3. Buy a product

1. **Choose product**: Click on any product to see the details
2. **Select size**: Choose your size/number from the table
3. **Select color** (if applicable): Colors appear as options
4. **Add to cart**: Click on "Add to Cart"
5. **Go to cart**: Click on the cart icon at the top right
6. **Complete purchase**: Fill in the data and confirmation

### 4. Admin Panel

The admin panel allows managing:

- **View products**: List of all products with stock
- **Edit products**: Change prices, descriptions, stock
- **Manage gallery**: Add/modify images for the slider and gallery
- **View orders**: (Coming soon) Orders placed

#### How to access the admin?

1. Go to: `/login`
2. Enter the credentials configured in the backend

The credentials are configured via environment variables (`ADMIN_USER` and `ADMIN_PASS`). Consult with the development team.

#### Admin Functions:

| Function | Description |
|---------|-------------|
| **Stock by size** | View and edit the stock for each size |
| **Featured products** | Mark products as featured |
| **Discounts** | Apply percentage discounts |
| **Gallery** | Add images to the slider and gallery |

---

## 💻 For Developers

### 🛠️ Technologies Used

| Layer | Technology |
|------|-------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Express.js, Node.js, MongoDB (Mongoose) |
| **Payments** | MercadoPago (optional) |
| **Deploy** | Vercel (Frontend), Render (Backend) |
| **Images** | Unsplash (development), Cloudinary (coming soon) |

### 📁 Project Structure
```text
E-Commerce-Website/
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # Pages and routes
│   │   ├── components/       # Reusable components
│   │   ├── models/           # TypeScript types and interfaces
│   │   ├── store/            # Global state (Zustand)
│   │   ├── services/         # API services
│   │   └── adapters/         # Data adapters
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API route definition
│   │   ├── services/         # Business logic
│   │   └── middleware/       # Express middleware
│   └── package.json
│
└── README.md                 # This file
```
### Frontend (.env)
NEXT_PUBLIC_API_URL=http://localhost:3001
### Backend (.env)
PORT=3001
MONGO_URI=mongodb+srv://...
MERCADOPAGO_ACCESS_TOKEN=your_token
MERCADOPAGO_SANDBOX=true

### Frontend
cd frontend
npm install
npm run dev     # Development at http://localhost:3000
npm run build   # Build for production
npm run start   # Production

### Backend
cd backend
npm install
npm run dev     # Development at http://localhost:3001
npm run start   # Production

### 🔧 Load Test Data (Seed)
The backend includes scripts to load sample products:
cd backend

# Load products
npm run seed:products

# Load gallery
npm run seed:gallery

☁️ Deploy
Frontend → Vercel
Go to vercel.com

Import the E-Commerce-Website repository

Framework: Next.js

Add variable:

NEXT_PUBLIC_API_URL = your-backend

Automatic deploy

Backend → Render
Go to render.com

New Web Service

Connect the repository

Configuration:

Root: backend

Build: npm install

Start: npx tsx src/index.ts

Variables:

PORT=3001

MONGO_URI=your_connection_string

Deploy

⚠️ Important Notes
MercadoPago: Requires a verified account to accept real payments. In sandbox mode, it works with test users.

Images: Product images are from Unsplash (external service). They may expire or fail to load.

MongoDB: A MongoDB Atlas or local database is required.

Security: Admin credentials are configured via environment variables (ADMIN_USER and ADMIN_PASS). Never expose credentials in the code.
