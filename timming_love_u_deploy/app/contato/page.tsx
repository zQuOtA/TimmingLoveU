
'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-xl font-romantic font-bold text-gray-800">Contato</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para você! 
            Envie sua mensagem e retornaremos o mais rápido possível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100">
              <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-6">
                Fale Conosco
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">contato@timmingloveu.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Suporte</h4>
                    <p className="text-gray-600">Respondemos em até 24 horas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100">
              <h3 className="text-xl font-romantic font-semibold text-gray-800 mb-4">
                Dúvidas Frequentes
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  <strong>Como funciona o teste grátis?</strong><br />
                  Você tem 7 dias para testar todas as funcionalidades gratuitamente.
                </p>
                <p className="text-gray-600">
                  <strong>Posso cancelar a qualquer momento?</strong><br />
                  Sim! O cancelamento é simples e pode ser feito pelo dashboard.
                </p>
                <p className="text-gray-600">
                  <strong>Como personalizar minha página?</strong><br />
                  Após criar sua conta, você terá acesso ao editor completo.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mensagem Enviada!</h3>
                <p className="text-gray-600 mb-6">
                  Obrigado pelo contato. Retornaremos em breve!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="btn-romantic-outline"
                >
                  Enviar Nova Mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-6">
                  Envie sua Mensagem
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="duvidas">Dúvidas sobre o Serviço</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="problema">Problema na Página</option>
                    <option value="cancelamento">Cancelamento</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                    placeholder="Descreva sua dúvida, sugestão ou problema..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-romantic py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
