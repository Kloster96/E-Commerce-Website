import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/models';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, size: string, color: string) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product._id === product._id && item.size === size && item.color === color
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += 1;
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, size, color, quantity: 1 }],
          };
        });
      },

      removeItem: (productId: string, size: string, color: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product._id === productId && item.size === size && item.color === color)
          ),
        }));
      },

      updateQuantity: (productId: string, size: string, color: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'sneaker-vault-cart',
    }
  )
);
