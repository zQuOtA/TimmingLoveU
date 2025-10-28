
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { PAYMENT_CONFIG } from './config';

// Lazy initialization of Mercado Pago client
let client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (!client) {
    if (!PAYMENT_CONFIG.mercadopago.accessToken) {
      throw new Error('Mercado Pago access token not configured');
    }
    client = new MercadoPagoConfig({
      accessToken: PAYMENT_CONFIG.mercadopago.accessToken,
    });
  }
  return client;
}

export async function createMercadoPagoPreference({
  userId,
  userEmail,
  planId,
}: {
  userId: string;
  userEmail: string;
  planId: string;
}) {
  const preference = new Preference(getClient());
  
  const response = await preference.create({
    body: {
      items: [
        {
          id: planId,
          title: 'Timming LoveU - Assinatura Mensal',
          description: 'Acesso completo para criar sua página de relacionamento',
          unit_price: PAYMENT_CONFIG.subscription.price / 100,
          quantity: 1,
          currency_id: PAYMENT_CONFIG.subscription.currency,
        } as any,
      ],
      payer: {
        email: userEmail,
      },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
        failure: `${process.env.NEXTAUTH_URL}/pricing?payment=failed`,
        pending: `${process.env.NEXTAUTH_URL}/pricing?payment=pending`,
      },
      auto_return: 'approved',
      external_reference: userId,
      metadata: {
        user_id: userId,
        plan_id: planId,
      },
      notification_url: `${process.env.NEXTAUTH_URL}/api/payment/webhook/mercadopago`,
    }
  });

  return response;
}

export async function getMercadoPagoPayment(paymentId: string) {
  const payment = new Payment(client);
  const response = await payment.get({ id: paymentId });
  return response;
}

export async function cancelMercadoPagoSubscription(subscriptionId: string) {
  // Note: Mercado Pago doesn't have direct subscription cancellation in the same way as Stripe
  // For now, we'll just log this and handle it manually or through the dashboard
  console.log(`Subscription cancellation requested for: ${subscriptionId}`);
  console.log('Please cancel this subscription manually through Mercado Pago dashboard');
  
  // In the future, if using Mercado Pago subscriptions (preapprovals),
  // you would implement the cancellation logic here
  return { success: true, message: 'Subscription marked for cancellation' };
}
