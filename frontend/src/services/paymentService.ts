import { CartItem } from '@/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface PaymentPreference {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
}

export interface CreatePreferenceDTO {
  items: {
    id: string;
    name: string;
    description: string;
    picture_url: string;
    category_id: string;
    quantity: number;
    unit_price: number;
  }[];
  payer: {
    name: string;
    email: string;
  };
}

export const paymentService = {
  async createPreference(cartItems: CartItem[], payer: { name: string; email: string }): Promise<PaymentPreference> {
    const items = cartItems.map((item) => ({
      id: item.product._id,
      name: item.product.name,
      description: item.product.description?.substring(0, 100) || '',
      picture_url: item.product.images?.[0] || '',
      category_id: item.product.brand || 'sneakers',
      quantity: item.quantity,
      unit_price: item.product.price,
    }));

    const response = await fetch(`${API_URL}/api/payment/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, payer }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment preference');
    }

    const data = await response.json();
    return data.data;
  },
};
