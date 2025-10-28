
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { cancelSubscription } from '@/lib/payment/subscription';
import { cancelStripeSubscription } from '@/lib/payment/stripe';
import { cancelMercadoPagoSubscription } from '@/lib/payment/mercadopago';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const subscription = await prisma.userSubscription.findFirst({
      where: { userId: user.id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Cancel subscription with the provider
    if (subscription.subscriptionId) {
      if (subscription.provider === 'stripe') {
        await cancelStripeSubscription(subscription.subscriptionId);
      } else if (subscription.provider === 'mercadopago') {
        await cancelMercadoPagoSubscription(subscription.subscriptionId);
      }
    }

    // Update local subscription record
    const updatedSubscription = await cancelSubscription(user.id);

    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the current period',
      subscription: {
        cancelAtPeriodEnd: updatedSubscription.cancelAtPeriodEnd,
        canceledAt: updatedSubscription.canceledAt,
        currentPeriodEnd: updatedSubscription.currentPeriodEnd,
      },
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
