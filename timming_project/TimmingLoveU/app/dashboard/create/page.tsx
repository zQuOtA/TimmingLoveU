import { requireActiveSubscription } from '@/lib/auth/subscription-guard';
import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Criar Página de Casal - Timming LoveU',
  description: 'Crie sua página de relacionamento personalizada',
};

export default async function CreateCouplePage() {
  // This will redirect to /pricing if user doesn't have active subscription
  const userId = await requireActiveSubscription();

  return (
    <div className="min-h-screen bg-romantic-gradient py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Heart className="w-10 h-10 text-pink-500 animate-heart-pulse" />
              <h1 className="text-4xl font-romantic font-bold text-gray-800">
                Criar Página de Casal
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Crie uma página única e especial para celebrar seu amor
            </p>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center mb-8">
          <Sparkles className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-romantic font-bold text-green-800 mb-2">
            Você tem acesso!
          </h2>
          <p className="text-green-700">
            Sua assinatura está ativa. Comece a criar sua página de relacionamento agora!
          </p>
        </div>

        {/* Create Form (Placeholder) */}
        <div className="bg-romantic-card rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-romantic font-bold text-gray-800 mb-6">
            Informações do Casal
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Casal
              </label>
              <input
                type="text"
                placeholder="Ex: João & Maria"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Início do Relacionamento
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem Especial
              </label>
              <textarea
                rows={4}
                placeholder="Conte sua história de amor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm text-pink-800">
                💡 <strong>Dica:</strong> Esta é uma página de exemplo protegida. O formulário
                completo de criação já existe no projeto. Esta página demonstra o controle de
                acesso baseado em assinatura.
              </p>
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Criar Página de Casal
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <h4 className="font-semibold text-gray-800 mb-3">
            ✨ Recursos Disponíveis para Assinantes:
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Galeria de fotos ilimitada</li>
            <li>• Adicione vídeos do seu relacionamento</li>
            <li>• Contador de tempo juntos</li>
            <li>• Música personalizada de fundo</li>
            <li>• Banner customizável</li>
            <li>• Link único e compartilhável</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
