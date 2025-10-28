
import { Metadata } from 'next'
import LoginForm from './login-form'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Entrar - Timming LoveU',
  description: 'Faça login na sua conta Timming LoveU',
}

export default function LoginPage() {
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
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600">
            Entre na sua conta para acessar suas páginas do amor.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-romantic-card rounded-xl p-8 shadow-xl">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/signup" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                Cadastre-se aqui
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
