
import mercadopago from 'mercadopago';
import { PAYMENT_CONFIG } from './config';

// Configure Mercado Pago
mercadopago.configure({
  access_token: PAYMENT_CONFIG.mercadopago.accessToken,
});

export async function createMercadoPagoPreference({
  userId,
  userEmail,
  planId,
}: {
  userId: string;
  userEmail: string;
  planId: string;
}) {
  const preference = await mercadopago.preferences.create({
    items: [
      {
        title: 'Timming LoveU - Assinatura Mensal',
        description: 'Acesso completo para criar sua página de relacionamento',
        unit_price: PAYMENT_CONFIG.subscription.price / 100,
        quantity: 1,
        currency_id: PAYMENT_CONFIG.subscription.currency,
      },
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
      userId,
      planId,
    },
    notification_url: `${process.env.NEXTAUTH_URL}/api/payment/webhook/mercadopago`,
  });

  return preference;
}

export async function getMercadoPagoPayment(paymentId: string) {
  const payment = await mercadopago.payment.get(paymentId);
  return payment;
}

export async function cancelMercadoPagoSubscription(subscriptionId: string) {
  // Note: Mercado Pago doesn't have direct subscription cancellation in the same way as Stripe
  // This would typically involve canceling the preapproval or stopping recurring payments
  try {
    const response = await mercadopago.preapproval.update({
      id: subscriptionId,
      status: 'cancelled',
    });
    return response;
  } catch (error) {
    console.error('Error canceling Mercado Pago subscription:', error);
    throw error;
  }
}
