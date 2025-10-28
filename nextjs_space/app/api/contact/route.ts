
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Create a simple contact table in Prisma if needed
// For now, we'll just log the contact and return success
export async function POST(request: NextRequest) {
  try {
    const { nome, email, assunto, mensagem } = await request.json()

    // Validation
    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      )
    }

    // Log contact form submission
    console.log('📧 Nova mensagem de contato:', {
      nome,
      email,
      assunto,
      mensagem,
      timestamp: new Date().toISOString()
    })

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system, etc.
    
    // For now, we just return success
    return NextResponse.json(
      { message: 'Mensagem recebida com sucesso! Obrigado pelo contato.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}
