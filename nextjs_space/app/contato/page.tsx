
import { Metadata } from 'next'
import ContactForm from './contact-form'
import Link from 'next/link'
import { Heart, ArrowLeft, Mail, MessageCircle, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato - Timming LoveU',
  description: 'Entre em contato com a equipe do Timming LoveU',
}

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
              Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para você!
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-romantic-card rounded-xl p-8 shadow-xl mb-8">
            <ContactForm />
          </div>

          {/* Additional Contact Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-pink-500" />
              <span className="text-gray-600">
                Ou nos envie um email diretamente para:{' '}
                <a href="mailto:contato@timminglove.com" className="text-pink-600 hover:text-pink-700 font-medium">
                  contato@timminglove.com
                </a>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Respondemos todas as mensagens em até 24 horas! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
