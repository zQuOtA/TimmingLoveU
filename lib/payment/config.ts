
// Payment configuration and utilities
export const PAYMENT_CONFIG = {
  provider: (process.env.PAYMENT_PROVIDER || 'stripe') as 'stripe' | 'mercadopago',
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  mercadopago: {
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || '',
    webhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET || '',
  },
  subscription: {
    price: parseInt(process.env.SUBSCRIPTION_PRICE || '9900'),
    currency: process.env.SUBSCRIPTION_CURRENCY || 'BRL',
    trialPeriodDays: parseInt(process.env.TRIAL_PERIOD_DAYS || '7'),
  },
};

export function isStripeConfigured(): boolean {
  return !!(
    PAYMENT_CONFIG.stripe.secretKey &&
    PAYMENT_CONFIG.stripe.publishableKey
  );
}

export function isMercadoPagoConfigured(): boolean {
  return !!(
    PAYMENT_CONFIG.mercadopago.accessToken &&
    PAYMENT_CONFIG.mercadopago.publicKey
  );
}

export function isPaymentConfigured(): boolean {
  if (PAYMENT_CONFIG.provider === 'stripe') {
    return isStripeConfigured();
  }
  return isMercadoPagoConfigured();
}
