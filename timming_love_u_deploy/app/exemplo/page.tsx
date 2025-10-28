
'use client'

import { useState, useEffect } from 'react'
import { Heart, ArrowLeft, Share2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface TimeLeft {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function ExamplePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    months: 0, 
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const startDate = new Date('2020-02-14T00:00:00-03:00')
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ years, months, days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'João ❤️ Maria - Nossa História de Amor',
          text: 'Veja nossa página especial de casal!',
          url: shareUrl,
        })
      } catch {
        console.log('Share cancelled')
      }
    } else {
      // Fallback para copiar link
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        alert('Link copiado para área de transferência!')
      }
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-romantic-gradient" />
  }

  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500 animate-heart-pulse" />
            <h1 className="text-xl font-romantic font-bold text-gray-800">João ❤️ Maria</h1>
          </div>
          <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-romantic font-bold text-gray-800 mb-4">
              João <Heart className="inline w-8 h-8 text-pink-500 mx-2" /> Maria
            </h1>
            <p className="text-lg text-gray-600">
              Juntos desde 14 de Fevereiro de 2020
            </p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100">
            <h2 className="text-2xl font-romantic font-semibold text-gray-800 mb-6">
              Nosso Tempo Juntos ⏰
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-pink-600">{timeLeft.years}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.years === 1 ? 'Ano' : 'Anos'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-rose-600">{timeLeft.months}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.months === 1 ? 'Mês' : 'Meses'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-pink-600">{timeLeft.days}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.days === 1 ? 'Dia' : 'Dias'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-rose-600">{timeLeft.hours}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.hours === 1 ? 'Hora' : 'Horas'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-pink-600">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.minutes === 1 ? 'Minuto' : 'Minutos'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-rose-600">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-600">
                  {timeLeft.seconds === 1 ? 'Segundo' : 'Segundos'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-pink-100/50 border border-pink-100 text-center">
            <h3 className="text-2xl font-romantic font-semibold text-gray-800 mb-4">
              Nossa Mensagem Especial
            </h3>
            <p className="text-gray-700 text-lg italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;Cada segundo ao seu lado é um presente. Cada minuto é uma nova descoberta. 
              Cada hora é repleta de sorrisos. Cada dia é uma nova aventura. 
              Cada mês é um marco na nossa história. Cada ano é prova do nosso amor verdadeiro. 
              Te amo hoje e sempre! 💕&rdquo;
            </p>
            <p className="text-pink-600 font-semibold mt-4">- João para Maria</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-romantic font-bold text-gray-800 mb-4">
            Gostou da Nossa Página?
          </h3>
          <p className="text-gray-600 mb-8">
            Crie a sua própria página de casal personalizada e celebre o seu amor também!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-romantic px-8 py-4 text-lg" asChild>
              <Link href="/signup">
                <Heart className="w-5 h-5 mr-2" />
                Criar Minha Página
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-romantic-outline px-8 py-4 text-lg" asChild>
              <Link href="/">
                <ExternalLink className="w-5 h-5 mr-2" />
                Saber Mais
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
