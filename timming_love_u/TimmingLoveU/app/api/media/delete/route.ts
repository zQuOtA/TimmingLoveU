import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db'
import { unlink } from 'fs/promises'
import path from 'path'

export async function DELETE(req: NextRequest) {
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
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 404 }
      )
    }

    // Get media ID from query
    const { searchParams } = new URL(req.url)
    const mediaId = searchParams.get('id')

    if (!mediaId) {
      return NextResponse.json(
        { error: 'ID da mídia não fornecido.' },
        { status: 400 }
      )
    }

    // Get media
    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Mídia não encontrada.' },
        { status: 404 }
      )
    }

    // Check if user owns the media
    if (media.userId !== user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar esta mídia.' },
        { status: 403 }
      )
    }

    // Delete file from disk
    try {
      const filePath = path.join(process.cwd(), 'public', media.url)
      await unlink(filePath)
    } catch (error) {
      console.error('Error deleting file from disk:', error)
      // Continue even if file deletion fails
    }

    // Delete from database
    await prisma.media.delete({
      where: { id: mediaId }
    })

    return NextResponse.json({
      success: true,
      message: 'Mídia deletada com sucesso!'
    })

  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar mídia. Tente novamente.' },
      { status: 500 }
    )
  }
}
