# 📖 User Guide

> Guide aimed at non-technical users (HR, Marketing, Business Owners).

---

## 🏪 How to Use the Store

### 1. Browse Products

On the main page you'll see all available products. You can:

- **View featured products**: Those shown in the top section
- **Browse by category**: Use the category buttons (Sneakers, T-Shirts, etc.)
- **Search for products**: Use the search bar to find something specific

### 2. Filter and Sort

| Feature | How to use it |
|---------|---------------|
| **By category** | Click the top buttons (Sneakers, T-Shirts, etc.) |
| **Search** | Type in the search bar and press Enter |
| **Sort** | Choose an option from the dropdown (price, discount, popularity) |

### 3. Buying a Product

1. **Choose a product**: Click on any product card
2. **View details**: The product page will open
3. **Select size**: Pick your size from the table
4. **Select color** (if applicable): Click on the desired color
5. **Add to cart**: Click "Add to Cart"
6. **View cart**: Click the cart icon (top right)
7. **Checkout**: Fill in your details and confirm

---

## 👨‍💼 Admin Panel

The admin panel lets you manage products and the image gallery.

### How to access it

1. Go to: **/login**
2. Enter the credentials configured in the backend

⚠️ **Note:** Credentials are set via environment variables (`ADMIN_USER` and `ADMIN_PASS`). Contact the development team to get access.

### Available features

| Feature | Description |
|---------|-------------|
| **View products** | List of all products with their stock |
| **Edit product** | Change price, description, images |
| **Stock by size** | View and update stock for each size |
| **Featured** | Mark products as featured |
| **Discounts** | Apply a percentage discount |
| **Gallery** | Add/edit slider and gallery images |

### Product Management

In the admin panel you can:

- **Edit**: Change name, price, description, brand
- **Stock**: Update available quantity per size
- **Discounts**: Add a discount percentage
- **Featured**: Define which products appear first

### Gallery Management

The gallery has two sections:

1. **Slider**: Large images shown at the top
2. **Gallery**: Images in an infinite scroll layout

You can:

- Add new images
- Edit the order
- Enable/disable images
- Add badges (NEW, SALE, etc.)

---

## 💡 Useful Tips

### Managing the catalog

- **Keep stock updated**: Regularly check stock levels in the admin panel
- **Feature products**: Mark as featured the products you want to promote
- **Apply discounts**: Use discounts for clearance sales or promotions

### Managing the gallery

- **Image quality**: Use high-quality images (minimum 800px wide)
- **Relevance**: The first slider images are the most visible
- **Keep it fresh**: Update the gallery regularly with new products

---

## ❓ Frequently Asked Questions

### What if my size is out of stock?

You won't be able to select that size. If you need that product, contact the team to check availability.

### How do I change a product's price?

In the admin panel, edit the product and update the price field.

### Can I add new products?

The ability to add products directly from the admin panel is coming soon.

### Does the site accept payments?

Yes, but it's currently in demo mode. The MercadoPago integration requires additional configuration.

---
