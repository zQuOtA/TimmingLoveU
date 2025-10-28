
import Stripe from 'stripe';
import { PAYMENT_CONFIG } from './config';

export const stripe = new Stripe(PAYMENT_CONFIG.stripe.secretKey, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

export async function createStripeCheckoutSession({
  userId,
  userEmail,
  planId,
}: {
  userId: string;
  userEmail: string;
  planId: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    client_reference_id: userId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: PAYMENT_CONFIG.subscription.currency.toLowerCase(),
          product_data: {
            name: 'Timming LoveU - Assinatura Mensal',
            description: 'Acesso completo para criar sua página de relacionamento',
          },
          unit_amount: PAYMENT_CONFIG.subscription.price,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: PAYMENT_CONFIG.subscription.trialPeriodDays,
      metadata: {
        userId,
        planId,
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?payment=canceled`,
    metadata: {
      userId,
      planId,
    },
  });

  return session;
}

export async function cancelStripeSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  return subscription;
}

export async function getStripeSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}
