
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { PAYMENT_CONFIG } from '@/lib/payment/config';
import { createStripeCheckoutSession } from '@/lib/payment/stripe';
import { createMercadoPagoPreference } from '@/lib/payment/mercadopago';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { planId } = await request.json();

    let plan;
    
    // If planId is provided, verify it exists
    if (planId && planId !== 'default') {
      plan = await prisma.planoAssinatura.findUnique({
        where: { id: planId },
      });

      if (!plan || !plan.ativo) {
        return NextResponse.json(
          { error: 'Invalid or inactive plan' },
          { status: 400 }
        );
      }
    } else {
      // Get or create default plan
      plan = await prisma.planoAssinatura.findFirst({
        where: { ativo: true },
      });

      if (!plan) {
        // Create default plan
        plan = await prisma.planoAssinatura.create({
          data: {
            nome: 'Plano Mensal',
            preco: PAYMENT_CONFIG.subscription.price / 100,
            descricao: 'Acesso completo para criar sua página de relacionamento',
            duracaoMeses: 1,
            maxPaginas: 1,
            ativo: true,
          },
        });
      }
    }

    // Get user ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId: user.id,
        status: { in: ['trial', 'active'] },
      },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Create checkout session based on provider
    if (PAYMENT_CONFIG.provider === 'stripe') {
      const checkoutSession = await createStripeCheckoutSession({
        userId: user.id,
        userEmail: user.email,
        planId: plan.id,
      });

      return NextResponse.json({
        provider: 'stripe',
        sessionId: checkoutSession.id,
        url: checkoutSession.url,
      });
    } else {
      const preference = await createMercadoPagoPreference({
        userId: user.id,
        userEmail: user.email,
        planId: plan.id,
      });

      return NextResponse.json({
        provider: 'mercadopago',
        preferenceId: preference.id,
        initPoint: preference.init_point,
      });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
