
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentConfig {
  provider: 'stripe' | 'mercadopago';
  publicKey: string;
  price: number;
  currency: string;
  trialPeriodDays: number;
}

interface PricingCardProps {
  isLoggedIn: boolean;
}

export default function PricingCard({ isLoggedIn }: PricingCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch payment configuration
    fetch('/api/payment/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setConfig(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching payment config:', err);
        setError('Erro ao carregar configurações de pagamento');
      });
  }, []);

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/pricing');
      return;
    }

    if (!config) {
      setError('Configuração de pagamento não carregada');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get or create a plan (you might want to fetch the actual plan from DB)
      const planResponse = await fetch('/api/planos');
      let planId = null;
      
      if (planResponse.ok) {
        const plans = await planResponse.json();
        if (plans && plans.length > 0) {
          planId = plans[0].id;
        }
      }

      // If no plan exists in DB, we'll handle it in the API
      // Create checkout session
      const response = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId || 'default', // The API will handle default plan creation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar sessão de pagamento');
      }

      // Redirect based on provider
      if (config.provider === 'stripe') {
        // Use the URL from the checkout session instead of redirectToCheckout
        if (data.url) {
          window.location.href = data.url;
        }
      } else if (config.provider === 'mercadopago') {
        // Redirect to Mercado Pago checkout
        if (data.initPoint) {
          window.location.href = data.initPoint;
        }
      }
    } catch (err: any) {
      console.error('Error creating checkout:', err);
      setError(err.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price / 100);
  };

  if (error && !config) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-romantic-card rounded-2xl p-8 shadow-2xl max-w-md w-full border-4 border-pink-200 relative overflow-hidden">
      {/* Popular Badge */}
      <div className="absolute top-0 right-0 bg-pink-500 text-white px-6 py-2 rounded-bl-xl font-semibold flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Mais Popular
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-romantic font-bold text-gray-800 mb-2">
          Plano Mensal
        </h3>
        <div className="mb-6">
          <span className="text-5xl font-bold text-pink-500">
            {config ? formatPrice(config.price, config.currency) : '...'}
          </span>
          <span className="text-gray-600 ml-2">/mês</span>
        </div>

        {config && (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
            <p className="text-pink-800 font-semibold text-center">
              🎉 {config.trialPeriodDays} dias grátis para testar!
            </p>
          </div>
        )}

        <ul className="space-y-3 mb-8">
          {[
            'Acesso completo a todos os recursos',
            `${config?.trialPeriodDays || 7} dias de teste gratuito`,
            'Cancele quando quiser',
            'Suporte prioritário',
          ].map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubscribe}
          disabled={loading || !config}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              {isLoggedIn ? 'Começar Teste Gratuito' : 'Criar Conta e Começar'}
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
