
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import PricingCard from './pricing-card';
import Link from 'next/link';
import { Heart, Check, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Planos - Timming LoveU',
  description: 'Escolha seu plano e comece a criar sua página de amor',
};

export default async function PricingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-romantic-gradient py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Heart className="w-10 h-10 text-pink-500 animate-heart-pulse" />
            <span className="text-4xl font-romantic font-bold text-gray-800">Timming LoveU</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece sua jornada de amor com 7 dias grátis. Sem compromisso, cancele quando quiser.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center mb-12">
          <PricingCard isLoggedIn={!!session} />
        </div>

        {/* Features List */}
        <div className="bg-romantic-card rounded-2xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-romantic font-bold text-gray-800 mb-6 text-center">
            O que está incluído:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Página personalizada para seu casal',
              'Galeria de fotos ilimitada',
              'Adicione vídeos do seu relacionamento',
              'Contador de tempo juntos',
              'Música personalizada de fundo',
              'Banner customizável',
              'Link único e compartilhável',
              'Atualizações ilimitadas',
              'Suporte prioritário',
              'Sem anúncios',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-romantic font-bold text-gray-800 mb-6 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div className="bg-romantic-card rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Como funciona o período de teste gratuito?
              </h3>
              <p className="text-gray-600">
                Você tem 7 dias grátis para usar todos os recursos. Após o período de teste,
                sua assinatura será renovada automaticamente. Você pode cancelar a qualquer momento.
              </p>
            </div>
            <div className="bg-romantic-card rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Posso cancelar minha assinatura?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento. Você continuará tendo
                acesso até o final do período pago.
              </p>
            </div>
            <div className="bg-romantic-card rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Quais formas de pagamento são aceitas?
              </h3>
              <p className="text-gray-600">
                Aceitamos cartões de crédito e débito através do Stripe e Mercado Pago,
                garantindo a segurança das suas transações.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
