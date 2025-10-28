
'use client'

import { useState, useEffect } from 'react'
import { Heart, Share2, ArrowLeft, Calendar, Music, Image as ImageIcon, Video } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

// Mock data for the example
const exampleData = {
  nomeCasal: 'Ana & Daniel',
  mensagem: 'Nosso amor é eterno como as estrelas no céu, e cada dia ao seu lado é um presente. Você é minha melhor metade, minha alma gêmea, minha vida toda. ✨💕',
  dataInicioRelacao: new Date('2024-04-05'), // April 05, 2024
  bannerUrl: null, // Will use gradient background
  musicaUrl: null,
  musicaFile: null,
  galeria: [] as string[], // Will be populated dynamically if needed
  videos: [] as string[]
}

export default function ExampleCouplePage() {
  const [timeCalculation, setTimeCalculation] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  })

  // Calculate time difference in real-time
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const startDate = exampleData.dataInicioRelacao
      
      const diffInMillis = now.getTime() - startDate.getTime()
      
      // Convert to readable format
      const anos = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 365))
      const meses = Math.floor((diffInMillis % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
      const dias = Math.floor((diffInMillis % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutos = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60))
      const segundos = Math.floor((diffInMillis % (1000 * 60)) / 1000)

      setTimeCalculation({ anos, meses, dias, horas, minutos, segundos })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${exampleData.nomeCasal} - Timming LoveU`,
          text: 'Veja nossa página do amor!',
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copiado para a área de transferência!')
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button variant="ghost" asChild className="bg-white/80 backdrop-blur-sm hover:bg-white/90">
            <Link href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleShare} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <div className="bg-amber-100/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-amber-700">✨ Página de Exemplo</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Names */}
      <section className="relative py-32 px-4 text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-rose-100/20 to-amber-100/30">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, rgba(252, 231, 243, 0.4) 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, rgba(254, 240, 221, 0.4) 0%, transparent 50%)`
               }}>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heart-pulse" />
          
          <h1 className="text-6xl md:text-8xl font-romantic font-bold text-gray-800 mb-6 text-shadow-romantic animate-fade-in">
            {exampleData.nomeCasal}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
            {exampleData.mensagem}
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Calendar className="w-5 h-5" />
            <span>Juntos desde {exampleData.dataInicioRelacao.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Chronometer Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-romantic font-bold text-gray-800 mb-4">
            ⏰ Nosso Cronômetro do Amor
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Estamos juntos há exatamente:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Anos', value: timeCalculation.anos },
              { label: 'Meses', value: timeCalculation.meses },
              { label: 'Dias', value: timeCalculation.dias },
              { label: 'Horas', value: timeCalculation.horas },
              { label: 'Minutos', value: timeCalculation.minutos },
              { label: 'Segundos', value: timeCalculation.segundos }
            ].map((item, index) => (
              <div key={item.label} 
                   className="bg-romantic-card rounded-xl p-6 animate-slide-up hover:scale-105 transition-all duration-300"
                   style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl md:text-4xl font-romantic font-bold text-pink-600 mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 mt-8 text-lg">
            E contando! Cada segundo ao seu lado é precioso. 💕
          </p>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-romantic font-bold text-center text-gray-800 mb-16">
            O Que Sua Página Pode Ter
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Music Feature */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up">
              <Music className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Música Especial
              </h4>
              <p className="text-gray-600 mb-4">
                Adicione a música que representa vocês dois. Spotify, YouTube ou upload direto.
              </p>
              <div className="bg-pink-50 rounded-lg p-4">
                <Music className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-pink-700 font-medium">
                  "Nossa Música" - Artista Exemplo
                </p>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <ImageIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Galeria de Fotos
              </h4>
              <p className="text-gray-600 mb-4">
                Compartilhe seus momentos mais especiais em uma galeria organizada.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-pink-50 rounded-lg aspect-square flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-pink-400" />
                </div>
                <div className="bg-rose-50 rounded-lg aspect-square flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <div className="bg-amber-50 rounded-lg aspect-square flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="bg-pink-50 rounded-lg aspect-square flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Videos */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Video className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Vídeos Especiais
              </h4>
              <p className="text-gray-600 mb-4">
                Inclua vídeos dos momentos mais marcantes do relacionamento.
              </p>
              <div className="bg-pink-50 rounded-lg p-6">
                <Video className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-pink-700 font-medium">
                  Vídeos dos nossos momentos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-romantic-hero">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heart-pulse" />
          <h3 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-6">
            Gostou do Exemplo?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Crie sua própria página personalizada em minutos e celebre seu amor de forma única!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-romantic px-12 py-4 text-lg" asChild>
              <Link href="/signup">
                <Heart className="w-5 h-5 mr-2" />
                Criar Minha Página
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-romantic-outline px-12 py-4 text-lg" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-pink-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-lg font-romantic font-semibold text-gray-800">Timming LoveU</span>
          </div>
          <p className="text-gray-600 text-sm">
            Esta é uma página de exemplo. Crie a sua própria página personalizada!
          </p>
        </div>
      </footer>
    </div>
  )
}
