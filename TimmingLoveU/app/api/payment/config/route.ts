
import { NextResponse } from 'next/server';
import { PAYMENT_CONFIG, isPaymentConfigured } from '@/lib/payment/config';

export async function GET() {
  try {
    if (!isPaymentConfigured()) {
      return NextResponse.json(
        { error: 'Payment provider not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      provider: PAYMENT_CONFIG.provider,
      publicKey:
        PAYMENT_CONFIG.provider === 'stripe'
          ? PAYMENT_CONFIG.stripe.publishableKey
          : PAYMENT_CONFIG.mercadopago.publicKey,
      price: PAYMENT_CONFIG.subscription.price,
      currency: PAYMENT_CONFIG.subscription.currency,
      trialPeriodDays: PAYMENT_CONFIG.subscription.trialPeriodDays,
    });
  } catch (error) {
    console.error('Error fetching payment config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment configuration' },
      { status: 500 }
    );
  }
}
