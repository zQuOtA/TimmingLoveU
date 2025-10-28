import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'

// Maximum file sizes (in bytes)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado. Faça login para enviar mídia.' },
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
        { error: 'Você precisa criar uma página de casal primeiro.' },
        { status: 400 }
      )
    }

    const couplePage = user.couplePages[0]

    // Parse form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    const titulo = formData.get('titulo') as string | null
    const descricao = formData.get('descricao') as string | null
    const dataEvento = formData.get('dataEvento') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado.' },
        { status: 400 }
      )
    }

    // Validate file type
    const fileType = file.type
    let tipo: 'image' | 'video'
    
    if (ALLOWED_IMAGE_TYPES.includes(fileType)) {
      tipo = 'image'
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: `Imagem muito grande. Tamanho máximo: ${MAX_IMAGE_SIZE / 1024 / 1024}MB` },
          { status: 400 }
        )
      }
    } else if (ALLOWED_VIDEO_TYPES.includes(fileType)) {
      tipo = 'video'
      if (file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json(
          { error: `Vídeo muito grande. Tamanho máximo: ${MAX_VIDEO_SIZE / 1024 / 1024}MB` },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Envie imagens (JPEG, PNG, GIF, WebP) ou vídeos (MP4, WebM, MOV).' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileExtension = path.extname(file.name)
    const randomName = randomBytes(16).toString('hex')
    const fileName = `${randomName}${fileExtension}`
    
    // Determine upload directory
    const uploadDir = tipo === 'image' ? 'images' : 'videos'
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', uploadDir, fileName)
    const fileUrl = `/uploads/${uploadDir}/${fileName}`

    // Save file to disk
    await writeFile(uploadPath, buffer)

    // Save to database
    const media = await prisma.media.create({
      data: {
        couplePageId: couplePage.id,
        userId: user.id,
        tipo,
        url: fileUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: fileType,
        titulo: titulo || null,
        descricao: descricao || null,
        dataEvento: dataEvento ? new Date(dataEvento) : null,
      }
    })

    return NextResponse.json({
      success: true,
      message: tipo === 'image' ? 'Imagem enviada com sucesso!' : 'Vídeo enviado com sucesso!',
      media
    })

  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar mídia. Tente novamente.' },
      { status: 500 }
    )
  }
}
