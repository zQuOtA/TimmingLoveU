import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PAYMENT_CONFIG } from '@/lib/payment/config';

export async function GET() {
  try {
    let plans = await prisma.planoAssinatura.findMany({
      where: { ativo: true },
      orderBy: { createdAt: 'desc' },
    });

    // If no plans exist, create a default one
    if (plans.length === 0) {
      const defaultPlan = await prisma.planoAssinatura.create({
        data: {
          nome: 'Plano Mensal',
          preco: PAYMENT_CONFIG.subscription.price / 100,
          descricao: 'Acesso completo para criar sua página de relacionamento',
          duracaoMeses: 1,
          maxPaginas: 1,
          ativo: true,
        },
      });
      plans = [defaultPlan];
    }

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}
