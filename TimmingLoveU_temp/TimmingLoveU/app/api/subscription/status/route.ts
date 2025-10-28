
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { getUserSubscription, hasActiveSubscription } from '@/lib/payment/subscription';
import { prisma } from '@/lib/db';

export async function GET() {
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

    const subscription = await getUserSubscription(user.id);
    const isActive = await hasActiveSubscription(user.id);

    if (!subscription) {
      return NextResponse.json({
        hasSubscription: false,
        isActive: false,
      });
    }

    const now = new Date();
    const isInTrial = subscription.trialEndsAt ? subscription.trialEndsAt > now : false;
    const trialDaysLeft = isInTrial && subscription.trialEndsAt
      ? Math.ceil((subscription.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return NextResponse.json({
      hasSubscription: true,
      isActive,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        provider: subscription.provider,
        isInTrial,
        trialDaysLeft,
        trialEndsAt: subscription.trialEndsAt,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        canceledAt: subscription.canceledAt,
        plan: subscription.plano,
      },
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    );
  }
}
