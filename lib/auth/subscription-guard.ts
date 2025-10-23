
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { hasActiveSubscription } from '@/lib/payment/subscription';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

/**
 * Server-side guard to check if user has an active subscription
 * Redirects to pricing page if user doesn't have an active subscription
 * @param redirectUrl - Optional URL to redirect to if user doesn't have subscription (default: /pricing)
 * @returns userId if user has active subscription
 */
export async function requireActiveSubscription(redirectUrl: string = '/pricing') {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  const isActive = await hasActiveSubscription(user.id);

  if (!isActive) {
    redirect(redirectUrl);
  }

  return user.id;
}

/**
 * Check if current user has active subscription without redirecting
 * Useful for conditional rendering
 */
export async function checkActiveSubscription(): Promise<{
  isActive: boolean;
  userId: string | null;
}> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return { isActive: false, userId: null };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { isActive: false, userId: null };
  }

  const isActive = await hasActiveSubscription(user.id);

  return { isActive, userId: user.id };
}
