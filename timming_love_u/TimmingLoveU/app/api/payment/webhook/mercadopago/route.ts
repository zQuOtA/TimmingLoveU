
import { NextResponse } from 'next/server';
import { getMercadoPagoPayment } from '@/lib/payment/mercadopago';
import { createOrUpdateSubscription, createTransaction } from '@/lib/payment/subscription';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Mercado Pago sends notifications with different types
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // Get payment details from Mercado Pago
      const paymentData = await getMercadoPagoPayment(paymentId);

      const userId = paymentData.external_reference;
      const planoId = paymentData.metadata?.plan_id;

      if (!userId) {
        console.warn('Missing userId in payment data');
        return NextResponse.json({ received: true });
      }

      // Get or create a default plan if planoId is not available
      let actualPlanoId = planoId;
      if (!actualPlanoId) {
        const defaultPlan = await prisma.planoAssinatura.findFirst({
          where: { ativo: true },
        });
        if (defaultPlan) {
          actualPlanoId = defaultPlan.id;
        }
      }

      if (!actualPlanoId) {
        throw new Error('No plan found');
      }

      // Handle payment status
      if (paymentData.status === 'approved') {
        // Check if subscription already exists
        let userSubscription = await prisma.userSubscription.findFirst({
          where: { userId },
        });

        if (!userSubscription) {
          // Create new subscription with trial
          userSubscription = await createOrUpdateSubscription({
            userId,
            planoId: actualPlanoId,
            provider: 'mercadopago',
            customerId: paymentData.payer?.id,
            status: 'trial',
          });
        }

        // Create transaction record
        await createTransaction({
          subscriptionId: userSubscription.id,
          provider: 'mercadopago',
          providerTxnId: paymentId.toString(),
          amount: paymentData.transaction_amount || 0,
          currency: paymentData.currency_id || 'BRL',
          status: 'completed',
          paymentMethod: paymentData.payment_method_id || 'unknown',
          metadata: { payment: paymentData },
        });

        // Update subscription status to active
        await prisma.userSubscription.update({
          where: { id: userSubscription.id },
          data: { status: 'active' },
        });

        // Update user's planoAtivo flag
        await prisma.user.update({
          where: { id: userId },
          data: { planoAtivo: true },
        });
      } else if (paymentData.status === 'rejected' || paymentData.status === 'cancelled') {
        // Handle failed payment
        const userSubscription = await prisma.userSubscription.findFirst({
          where: { userId },
        });

        if (userSubscription) {
          await createTransaction({
            subscriptionId: userSubscription.id,
            provider: 'mercadopago',
            providerTxnId: paymentId.toString(),
            amount: paymentData.transaction_amount || 0,
            currency: paymentData.currency_id || 'BRL',
            status: 'failed',
            paymentMethod: paymentData.payment_method_id || 'unknown',
            metadata: { payment: paymentData },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Mercado Pago webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Mercado Pago also sends GET requests to verify the webhook endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
