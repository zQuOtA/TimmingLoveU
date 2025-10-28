'use client'

import { CheckCircle2, Circle, Calendar, PartyPopper } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Milestone {
  title: string
  date: string
  description: string
  completed: boolean
}

interface MilestonesProps {
  milestones: Milestone[]
}

export function Milestones({ milestones }: MilestonesProps) {
  const completedMilestones = milestones.filter(m => m.completed)
  const upcomingMilestones = milestones.filter(m => !m.completed)

  const getDaysUntil = (date: string) => {
    const now = new Date()
    const targetDate = new Date(date)
    return differenceInDays(targetDate, now)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-1">
          Marcos Importantes
        </h2>
        <p className="text-gray-600">
          Celebre os momentos especiais da sua jornada juntos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completed Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Conquistas ({completedMilestones.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedMilestones.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma conquista ainda
              </p>
            ) : (
              <div className="space-y-4">
                {completedMilestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {milestone.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(new Date(milestone.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-purple-500" />
              Próximos Marcos ({upcomingMilestones.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMilestones.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum marco próximo
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => {
                  const daysUntil = getDaysUntil(milestone.date)
                  return (
                    <div
                      key={index}
                      className="flex gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <div className="flex-shrink-0">
                        <Circle className="w-6 h-6 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {milestone.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {format(new Date(milestone.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-purple-600">
                            {daysUntil === 0 && 'Hoje!'}
                            {daysUntil === 1 && 'Amanhã!'}
                            {daysUntil > 1 && `Em ${daysUntil} dias`}
                            {daysUntil < 0 && 'Em breve'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Summary */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Progresso de Marcos</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedMilestones.length} de {milestones.length} completados
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
              <p className="text-2xl font-bold text-pink-500">
                {milestones.length > 0 
                  ? Math.round((completedMilestones.length / milestones.length) * 100)
                  : 0}%
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
              style={{
                width: milestones.length > 0
                  ? `${(completedMilestones.length / milestones.length) * 100}%`
                  : '0%'
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
