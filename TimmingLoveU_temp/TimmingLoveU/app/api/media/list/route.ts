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
        { error: 'Não autenticado. Faça login para visualizar mídia.' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        couplePages: {
          where: { ativo: true },
          take: 1
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

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const tipo = searchParams.get('tipo') // 'image', 'video', or null for all
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: any = {
      couplePageId: couplePage.id,
      ativo: true
    }

    if (tipo && (tipo === 'image' || tipo === 'video')) {
      where.tipo = tipo
    }

    // Get media
    const media = await prisma.media.findMany({
      where,
      orderBy: [
        { ordem: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: offset
    })

    // Get total count
    const total = await prisma.media.count({ where })

    return NextResponse.json({
      success: true,
      media,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error('Error listing media:', error)
    return NextResponse.json(
      { error: 'Erro ao listar mídia. Tente novamente.' },
      { status: 500 }
    )
  }
}
