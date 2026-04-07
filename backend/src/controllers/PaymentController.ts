import { Request, Response, NextFunction } from 'express';
import { createPreference, getPayment, getMerchantOrder } from '../services/MercadoPagoService';

interface PaymentItem {
  id: string;
  name: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  unit_price: number;
}

interface CreatePaymentDTO {
  items: PaymentItem[];
  payer: {
    name: string;
    email: string;
  };
}

export const createPaymentPreference = async (
  req: Request<unknown, unknown, CreatePaymentDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { items, payer } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({
        success: false,
        error: 'No items provided',
      });
      return;
    }

    const preference = await createPreference(items, payer);

    res.json({
      success: true,
      data: {
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
      },
    });
  } catch (error: any) {
    console.error('❌ MercadoPago error:', error?.response?.data || error);
    res.status(500).json({
      success: false,
      error: error?.response?.data?.message || error?.message || 'Error creating preference',
      details: error?.response?.data || null,
    });
  }
};

export const handleWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const payment = await getPayment(data.id);
      // Process payment
    } else if (type === 'merchant_order') {
      const order = await getMerchantOrder(data.id);
      // Process order
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
};

export const paymentSuccess = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({
    success: true,
    message: 'Payment successful',
  });
};

export const paymentFailure = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({
    success: false,
    message: 'Payment failed',
  });
};

export const paymentPending = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({
    success: true,
    message: 'Payment pending',
  });
};
