
import { prisma } from '@/lib/db';
import { PAYMENT_CONFIG } from './config';

export async function createOrUpdateSubscription({
  userId,
  planoId,
  provider,
  subscriptionId,
  customerId,
  status,
  trialEndsAt,
  currentPeriodStart,
  currentPeriodEnd,
}: {
  userId: string;
  planoId: string;
  provider: 'stripe' | 'mercadopago';
  subscriptionId?: string;
  customerId?: string;
  status: string;
  trialEndsAt?: Date;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}) {
  // Check if subscription already exists for this user
  const existingSubscription = await prisma.userSubscription.findFirst({
    where: { userId },
  });

  if (existingSubscription) {
    // Update existing subscription
    return await prisma.userSubscription.update({
      where: { id: existingSubscription.id },
      data: {
        planoId,
        provider,
        subscriptionId,
        customerId,
        status,
        trialEndsAt,
        currentPeriodStart,
        currentPeriodEnd,
      },
    });
  }

  // Create new subscription with trial
  const trialStartsAt = new Date();
  const calculatedTrialEndsAt = trialEndsAt || new Date(
    Date.now() + PAYMENT_CONFIG.subscription.trialPeriodDays * 24 * 60 * 60 * 1000
  );

  return await prisma.userSubscription.create({
    data: {
      userId,
      planoId,
      provider,
      subscriptionId,
      customerId,
      status,
      trialStartsAt,
      trialEndsAt: calculatedTrialEndsAt,
      currentPeriodStart,
      currentPeriodEnd,
    },
  });
}

export async function getUserSubscription(userId: string) {
  return await prisma.userSubscription.findFirst({
    where: { userId },
    include: { plano: true },
  });
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) return false;

  // Check if subscription is active or in trial
  const now = new Date();
  const isInTrial = subscription.trialEndsAt && subscription.trialEndsAt > now;
  const isActive = subscription.status === 'active' || subscription.status === 'trial';
  const notExpired = !subscription.currentPeriodEnd || subscription.currentPeriodEnd > now;

  return isActive && (isInTrial || notExpired);
}

export async function cancelSubscription(userId: string) {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription || !subscription.subscriptionId) {
    throw new Error('Subscription not found');
  }

  // Update subscription to cancel at period end
  return await prisma.userSubscription.update({
    where: { id: subscription.id },
    data: {
      cancelAtPeriodEnd: true,
      canceledAt: new Date(),
    },
  });
}

export async function createTransaction({
  subscriptionId,
  provider,
  providerTxnId,
  amount,
  currency,
  status,
  paymentMethod,
  metadata,
}: {
  subscriptionId: string;
  provider: 'stripe' | 'mercadopago';
  providerTxnId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod?: string;
  metadata?: any;
}) {
  return await prisma.transaction.create({
    data: {
      subscriptionId,
      provider,
      providerTxnId,
      amount,
      currency,
      status,
      paymentMethod,
      metadata,
    },
  });
}
