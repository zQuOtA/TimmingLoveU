import Link from 'next/link'
import { Heart, ArrowLeft, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500 animate-heart-pulse" />
            <span className="text-2xl font-romantic font-bold text-gray-800">Timming LoveU</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </header>

      <div className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <MessageCircle className="w-16 h-16 text-pink-500 mx-auto mb-6" />
            <h1 className="text-4xl font-romantic font-bold text-gray-800 mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600">
              Tem alguma dúvida, sugestão ou quer criar sua página personalizada? Estamos aqui para você!
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="space-y-6 mb-12">
            <div className="bg-romantic-card rounded-xl p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-romantic font-semibold text-gray-800 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Envie um email e responderemos em até 24 horas
                  </p>
                  <a 
                    href="mailto:contato@timminglove.com" 
                    className="text-pink-600 hover:text-pink-700 font-medium text-lg"
                  >
                    contato@timminglove.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-romantic-card rounded-xl p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-8 h-8 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-romantic font-semibold text-gray-800 mb-2">
                    Mensagem Direta
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Clique no botão abaixo para abrir seu cliente de email
                  </p>
                  <Button className="btn-romantic" asChild>
                    <a href="mailto:contato@timminglove.com?subject=Quero criar minha página&body=Olá! Gostaria de criar minha página personalizada no Timming LoveU.">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* What to include in message */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-pink-100">
            <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              O que incluir na sua mensagem
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">💕</span>
                <span>Seu nome e email para contato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">💕</span>
                <span>Nome do casal que deseja na página</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">💕</span>
                <span>Data de início do relacionamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">💕</span>
                <span>Funcionalidades desejadas (galeria, música, vídeos, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">💕</span>
                <span>Qualquer personalização especial que desejar</span>
              </li>
            </ul>
          </div>

          {/* Footer note */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Respondemos todas as mensagens em até 24 horas! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
