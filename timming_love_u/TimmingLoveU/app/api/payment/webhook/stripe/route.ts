
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/payment/stripe';
import { PAYMENT_CONFIG } from '@/lib/payment/config';
import { createOrUpdateSubscription, createTransaction } from '@/lib/payment/subscription';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature found' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      PAYMENT_CONFIG.stripe.webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planoId = session.metadata?.planId;

        if (!userId || !planoId) {
          throw new Error('Missing userId or planId in session metadata');
        }

        // Create subscription record with trial
        await createOrUpdateSubscription({
          userId,
          planoId,
          provider: 'stripe',
          subscriptionId: session.subscription as string,
          customerId: session.customer as string,
          status: 'trial',
        });

        // Update user's planoAtivo flag
        await prisma.user.update({
          where: { id: userId },
          data: { planoAtivo: true },
        });

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        const planoId = subscription.metadata?.planId;

        if (!userId || !planoId) {
          console.warn('Missing userId or planId in subscription metadata');
          break;
        }

        const status = subscription.status === 'trialing' ? 'trial' : subscription.status;
        
        // TypeScript may not recognize these properties but they exist on Stripe.Subscription
        const subAny = subscription as any;

        await createOrUpdateSubscription({
          userId,
          planoId,
          provider: 'stripe',
          subscriptionId: subscription.id,
          customerId: subscription.customer as string,
          status,
          trialEndsAt: subscription.trial_end
            ? new Date(subscription.trial_end * 1000)
            : undefined,
          currentPeriodStart: subAny.current_period_start
            ? new Date(subAny.current_period_start * 1000)
            : undefined,
          currentPeriodEnd: subAny.current_period_end
            ? new Date(subAny.current_period_end * 1000)
            : undefined,
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find subscription by Stripe subscription ID
        const userSubscription = await prisma.userSubscription.findUnique({
          where: { subscriptionId: subscription.id },
        });

        if (userSubscription) {
          // Update subscription status
          await prisma.userSubscription.update({
            where: { id: userSubscription.id },
            data: {
              status: 'canceled',
              canceledAt: new Date(),
            },
          });

          // Update user's planoAtivo flag
          await prisma.user.update({
            where: { id: userSubscription.userId },
            data: { planoAtivo: false },
          });
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const invoiceAny = invoice as any;
        const subscriptionId = invoiceAny.subscription as string;

        if (subscriptionId) {
          // Find subscription
          const userSubscription = await prisma.userSubscription.findUnique({
            where: { subscriptionId },
          });

          if (userSubscription) {
            // Create transaction record
            const invAny = invoice as any;
            await createTransaction({
              subscriptionId: userSubscription.id,
              provider: 'stripe',
              providerTxnId: invoice.id,
              amount: (invAny.amount_paid || 0) / 100,
              currency: (invoice.currency || 'usd').toUpperCase(),
              status: 'completed',
              paymentMethod: invAny.payment_intent as string,
              metadata: { invoice },
            });

            // Update subscription status to active if it was in trial
            if (userSubscription.status === 'trial') {
              await prisma.userSubscription.update({
                where: { id: userSubscription.id },
                data: { status: 'active' },
              });
            }
          }
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const invoiceAny = invoice as any;
        const subscriptionId = invoiceAny.subscription as string;

        if (subscriptionId) {
          const userSubscription = await prisma.userSubscription.findUnique({
            where: { subscriptionId },
          });

          if (userSubscription) {
            // Create transaction record for failed payment
            const invAny2 = invoice as any;
            await createTransaction({
              subscriptionId: userSubscription.id,
              provider: 'stripe',
              providerTxnId: invoice.id,
              amount: (invAny2.amount_due || 0) / 100,
              currency: (invoice.currency || 'usd').toUpperCase(),
              status: 'failed',
              metadata: { invoice },
            });

            // Update subscription status
            await prisma.userSubscription.update({
              where: { id: userSubscription.id },
              data: { status: 'past_due' },
            });
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
