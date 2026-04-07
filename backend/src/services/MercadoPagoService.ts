import { MercadoPagoConfig, Preference, Payment, MerchantOrder } from 'mercadopago';

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
const IS_SANDBOX = process.env.MERCADOPAGO_SANDBOX === 'true';

const client = new MercadoPagoConfig({ 
  accessToken: ACCESS_TOKEN,
  options: {
    sandbox: IS_SANDBOX,
  },
});

export const createPreference = async (items: any[], payer: any) => {
  const preferenceClient = new Preference(client);
  
  // Forzar email de prueba si estamos en sandbox
  const payerEmail = IS_SANDBOX && !payer.email.includes('@testuser.com') 
    ? `test_${payer.email.replace('@', '_')}@testuser.com`
    : payer.email;
  
  const preferenceData = {
    items,
    payer: {
      name: payer.name,
      email: payerEmail,
    },
    // Simplificado para evitar errores de políticas
    // payment_methods y back_urls comentados por ahora
    // external_reference único
    external_reference: `sneaker-vault-${Date.now()}`,
  };

  // Solo agregar notification_url en producción (no localhost)
  if (!IS_SANDBOX && process.env.API_URL && !process.env.API_URL.includes('localhost')) {
    (preferenceData as any).notification_url = `${process.env.API_URL}/api/payment/webhook`;
  }

  try {
    const response = await preferenceClient.create({ body: preferenceData });
    return response;
  } catch (error: any) {
    console.error('❌ MercadoPago create preference error:', error?.message);
    throw error;
  }
};

export const getPayment = async (paymentId: string) => {
  const paymentClient = new Payment(client);
  const response = await paymentClient.get({ id: paymentId });
  return response;
};

export const getMerchantOrder = async (merchantOrderId: string) => {
  const merchantOrderClient = new MerchantOrder(client);
  const response = await merchantOrderClient.get({ id: merchantOrderId });
  return response;
};

export const isMercadoPagoConfigured = (): boolean => {
  return ACCESS_TOKEN.length > 0;
};
