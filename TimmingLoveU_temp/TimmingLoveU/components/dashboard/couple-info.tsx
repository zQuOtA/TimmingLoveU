'use client'

import { Heart, Calendar, Eye, Share2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface CoupleInfoProps {
  couplePage: {
    nomeCasal: string
    mensagem: string | null
    dataInicioRelacao: string
    bannerUrl: string | null
    slugPublico: string
  }
  views: number
}

export function CoupleInfo({ couplePage, views }: CoupleInfoProps) {
  const pageUrl = `${window.location.origin}/${couplePage.slugPublico}`

  const handleShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${couplePage.nomeCasal} - Timming LoveU`,
          text: 'Veja nossa página do amor!',
          url: pageUrl,
        })
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(pageUrl)
        toast.success('Link copiado para a área de transferência!')
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(pageUrl)
      toast.success('Link copiado para a área de transferência!')
    }
  }

  const handleVisitPage = () => {
    window.open(`/${couplePage.slugPublico}`, '_blank')
  }

  return (
    <Card className="overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400">
        {couplePage.bannerUrl ? (
          <Image
            src={couplePage.bannerUrl}
            alt="Banner do casal"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-20 h-20 text-white/30" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-playfair font-bold text-white mb-2">
            {couplePage.nomeCasal}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                Desde {format(new Date(couplePage.dataInicioRelacao), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views} visualizações</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Message */}
        {couplePage.mensagem && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Nossa História</h3>
            <p className="text-gray-700 leading-relaxed italic">
              "{couplePage.mensagem}"
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleVisitPage}
            className="flex-1 bg-pink-500 hover:bg-pink-600"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver Página Pública
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Page URL */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Link da sua página:</p>
          <p className="text-sm font-mono text-gray-900 truncate">
            {pageUrl}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
