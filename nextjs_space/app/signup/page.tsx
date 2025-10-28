
import { Metadata } from 'next'
import SignupForm from './signup-form'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cadastro - Timming LoveU',
  description: 'Crie sua conta no Timming LoveU e comece a celebrar seu amor',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-romantic-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-pink-500 animate-heart-pulse" />
            <span className="text-3xl font-romantic font-bold text-gray-800">Timming LoveU</span>
          </Link>
          <h1 className="text-2xl font-romantic font-semibold text-gray-800 mb-2">
            Comece Sua Jornada!
          </h1>
          <p className="text-gray-600">
            Crie sua conta e comece a celebrar seus momentos especiais.
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-romantic-card rounded-xl p-8 shadow-xl">
          <SignupForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-pink-500 transition-colors">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
