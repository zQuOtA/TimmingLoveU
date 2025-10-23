'use client'

import { useEffect, useState } from 'react'
import { Heart, Clock, Calendar, Image as ImageIcon, Video, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RelationshipStatsProps {
  stats: {
    duration: {
      totalDays: number
      years: number
      months: number
      days: number
    }
    media: {
      total: number
      images: number
      videos: number
    }
  }
}

export function RelationshipStats({ stats }: RelationshipStatsProps) {
  const [liveTime, setLiveTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate live time
  useEffect(() => {
    const updateLiveTime = () => {
      const totalDays = stats.duration.totalDays
      const now = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const timeSinceStart = now.getTime() - todayStart.getTime()
      
      const hours = Math.floor(timeSinceStart / (1000 * 60 * 60))
      const minutes = Math.floor((timeSinceStart % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeSinceStart % (1000 * 60)) / 1000)
      
      setLiveTime({ hours, minutes, seconds })
    }

    updateLiveTime()
    const interval = setInterval(updateLiveTime, 1000)

    return () => clearInterval(interval)
  }, [stats.duration.totalDays])

  const statCards = [
    {
      title: 'Tempo Juntos',
      icon: Heart,
      value: `${stats.duration.years}a ${stats.duration.months}m ${stats.duration.days}d`,
      subtitle: `${stats.duration.totalDays} dias totais`,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Tempo Hoje',
      icon: Clock,
      value: `${liveTime.hours.toString().padStart(2, '0')}:${liveTime.minutes.toString().padStart(2, '0')}:${liveTime.seconds.toString().padStart(2, '0')}`,
      subtitle: 'Contagem em tempo real',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Memórias',
      icon: Sparkles,
      value: stats.media.total.toString(),
      subtitle: `${stats.media.images} fotos, ${stats.media.videos} vídeos`,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-1">
          Estatísticas do Relacionamento
        </h2>
        <p className="text-gray-600">
          Acompanhe os marcos e momentos especiais da sua jornada
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Breakdown */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            Detalhamento do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-600 mb-1">
                {stats.duration.years}
              </p>
              <p className="text-sm text-gray-600">
                {stats.duration.years === 1 ? 'Ano' : 'Anos'}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 mb-1">
                {stats.duration.months}
              </p>
              <p className="text-sm text-gray-600">
                {stats.duration.months === 1 ? 'Mês' : 'Meses'}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
              <p className="text-3xl font-bold text-amber-600 mb-1">
                {stats.duration.days}
              </p>
              <p className="text-sm text-gray-600">
                {stats.duration.days === 1 ? 'Dia' : 'Dias'}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-red-50 rounded-lg">
              <p className="text-3xl font-bold text-rose-600 mb-1">
                {stats.duration.totalDays}
              </p>
              <p className="text-sm text-gray-600">Total de Dias</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
