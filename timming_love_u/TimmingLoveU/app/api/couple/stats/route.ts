import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado.' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        couplePages: {
          where: { ativo: true },
          take: 1,
          include: {
            media: {
              where: { ativo: true },
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      )
    }

    // Check if user has a couple page
    if (!user.couplePages || user.couplePages.length === 0) {
      return NextResponse.json(
        { error: 'Você não possui uma página de casal.' },
        { status: 400 }
      )
    }

    const couplePage = user.couplePages[0]
    
    // Calculate relationship duration
    const now = new Date()
    const startDate = new Date(couplePage.dataInicioRelacao)
    const diffInMillis = now.getTime() - startDate.getTime()
    
    const totalDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24))
    const years = Math.floor(totalDays / 365)
    const months = Math.floor((totalDays % 365) / 30)
    const days = Math.floor((totalDays % 365) % 30)
    
    // Count media by type
    const images = couplePage.media.filter(m => m.tipo === 'image').length
    const videos = couplePage.media.filter(m => m.tipo === 'video').length
    
    // Calculate important milestones
    const milestones = []
    
    // First anniversary
    const firstAnniversary = new Date(startDate)
    firstAnniversary.setFullYear(firstAnniversary.getFullYear() + 1)
    if (now >= firstAnniversary) {
      milestones.push({
        title: 'Primeiro Aniversário',
        date: firstAnniversary,
        description: '1 ano de amor e felicidade ❤️',
        completed: true
      })
    }
    
    // 100 days
    const hundredDays = new Date(startDate)
    hundredDays.setDate(hundredDays.getDate() + 100)
    if (now >= hundredDays) {
      milestones.push({
        title: '100 Dias Juntos',
        date: hundredDays,
        description: 'Celebrando 100 dias de amor 💕',
        completed: true
      })
    }
    
    // 1000 days
    const thousandDays = new Date(startDate)
    thousandDays.setDate(thousandDays.getDate() + 1000)
    milestones.push({
      title: '1000 Dias Juntos',
      date: thousandDays,
      description: 'Um marco especial de 1000 dias! 🎉',
      completed: now >= thousandDays
    })
    
    // Next anniversary
    const nextAnniversary = new Date(startDate)
    const currentYear = now.getFullYear()
    nextAnniversary.setFullYear(currentYear)
    if (nextAnniversary < now) {
      nextAnniversary.setFullYear(currentYear + 1)
    }
    
    const yearsUntilNextAnniversary = Math.floor((nextAnniversary.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
    
    milestones.push({
      title: `${yearsUntilNextAnniversary}º Aniversário`,
      date: nextAnniversary,
      description: `Próximo aniversário de namoro 🎂`,
      completed: false
    })
    
    // Sort milestones by date
    milestones.sort((a, b) => a.date.getTime() - b.date.getTime())

    return NextResponse.json({
      success: true,
      stats: {
        duration: {
          totalDays,
          years,
          months,
          days
        },
        media: {
          total: couplePage.media.length,
          images,
          videos
        },
        views: couplePage.views,
        memberSince: user.createdAt,
        milestones
      },
      couplePage: {
        id: couplePage.id,
        nomeCasal: couplePage.nomeCasal,
        mensagem: couplePage.mensagem,
        dataInicioRelacao: couplePage.dataInicioRelacao,
        bannerUrl: couplePage.bannerUrl,
        slugPublico: couplePage.slugPublico
      }
    })

  } catch (error) {
    console.error('Error getting couple stats:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas. Tente novamente.' },
      { status: 500 }
    )
  }
}
