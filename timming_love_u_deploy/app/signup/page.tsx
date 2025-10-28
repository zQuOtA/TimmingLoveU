
'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, Lock, Heart, Eye, EyeOff, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    
    if (!acceptTerms) {
      alert('Você precisa aceitar os termos de uso')
      return
    }
    
    setIsSubmitting(true)
    
    // Simular cadastro
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    // Redirect would happen here
    console.log('Signup attempt with:', formData)
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
          <h1 className="text-xl font-romantic font-bold text-gray-800">Criar Conta</h1>
          <div></div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-heart-pulse" />
              <h1 className="text-3xl font-romantic font-bold text-gray-800 mb-2">
                Comece Agora!
              </h1>
              <p className="text-gray-600">
                Crie sua conta e celebre seu amor com uma página única
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Nome"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Sobrenome"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded border-pink-300 text-pink-600 shadow-sm focus:ring-pink-500 mt-1"
                />
                <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
                  Eu aceito os{' '}
                  <Link href="/terms" className="text-pink-600 hover:text-pink-500">
                    termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-pink-600 hover:text-pink-500">
                    política de privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !acceptTerms}
                className="w-full btn-romantic py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Criando conta...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Criar Conta Grátis
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-pink-100 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  className="text-pink-600 hover:text-pink-500 font-semibold transition-colors"
                >
                  Entrar
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🎉 <strong>7 dias grátis</strong> • Depois apenas R$ 9,90/mês • Cancele a qualquer momento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
