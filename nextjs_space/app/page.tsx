
import { Heart, Clock, Image, Music, Share2, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500 animate-heart-pulse" />
            <h1 className="text-2xl font-romantic font-bold text-gray-800">Timming LoveU</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="btn-romantic" asChild>
              <Link href="/signup">Começar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-romantic font-bold text-gray-800 mb-6 text-shadow-romantic">
              Celebre Seu Amor
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Crie páginas românticas personalizadas para celebrar cada momento do seu relacionamento. 
              Cronômetro do tempo juntos, galeria de fotos, música especial e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-romantic px-8 py-4 text-lg" asChild>
                <Link href="/signup">
                  <Heart className="w-5 h-5 mr-2" />
                  Criar Minha Página
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-romantic-outline px-8 py-4 text-lg" asChild>
                <Link href="/exemplo">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ver Exemplo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-romantic font-bold text-center text-gray-800 mb-16">
            Tudo Para Celebrar Seu Amor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up hover:scale-105 transition-transform duration-300">
              <Clock className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Cronômetro do Amor
              </h4>
              <p className="text-gray-600">
                Acompanhe em tempo real há quanto tempo vocês estão juntos. Anos, meses, dias, horas e segundos de felicidade.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.1s'}}>
              <Image className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Galeria de Momentos
              </h4>
              <p className="text-gray-600">
                Compartilhe suas fotos mais especiais em uma galeria linda e organizada. Cada imagem conta uma história.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.2s'}}>
              <Music className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Música Especial
              </h4>
              <p className="text-gray-600">
                Adicione a música que representa vocês. Spotify, YouTube ou upload direto do arquivo MP3.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-romantic-card rounded-xl p-8 text-center animate-slide-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.3s'}}>
              <Share2 className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h4 className="text-xl font-romantic font-semibold mb-3 text-gray-800">
                Fácil de Compartilhar
              </h4>
              <p className="text-gray-600">
                Compartilhe sua página com amigos e família. Um link único e especial para seu amor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-romantic-hero">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heart-pulse" />
          <h3 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-6">
            Pronto Para Começar?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Crie sua página personalizada em minutos e comece a celebrar seu amor de forma única.
          </p>
          <Button size="lg" className="btn-romantic px-12 py-4 text-lg" asChild>
            <Link href="/signup">
              <Heart className="w-5 h-5 mr-2" />
              Criar Agora - É Gratuito
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Teste grátis por 7 dias. Depois apenas R$ 9,90/mês.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-pink-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-lg font-romantic font-semibold text-gray-800">Timming LoveU</span>
          </div>
          <p className="text-gray-600 mb-6">
            Celebrando o amor, um momento de cada vez.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/contato" className="hover:text-pink-500 transition-colors">
              Contato
            </Link>
            <Link href="/exemplo" className="hover:text-pink-500 transition-colors">
              Ver Exemplo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
