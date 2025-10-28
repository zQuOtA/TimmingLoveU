
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test admin user (hidden from user responses)
  const testPassword = await bcrypt.hash('johndoe123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      password: testPassword,
      planoAtivo: true,
      isAdmin: true,
      dataExpiracaoPlano: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    }
  })

  // Create sample subscription plans
  await prisma.planoAssinatura.upsert({
    where: { id: 'plan-mensal' },
    update: {},
    create: {
      id: 'plan-mensal',
      nome: 'Plano Mensal',
      preco: 9.90,
      descricao: 'Páginas ilimitadas, todas as funcionalidades',
      duracaoMeses: 1,
      maxPaginas: -1, // -1 = unlimited
      ativo: true,
    }
  })

  await prisma.planoAssinatura.upsert({
    where: { id: 'plan-anual' },
    update: {},
    create: {
      id: 'plan-anual',
      nome: 'Plano Anual',
      preco: 99.00,
      descricao: 'Páginas ilimitadas, 2 meses grátis!',
      duracaoMeses: 12,
      maxPaginas: -1,
      ativo: true,
    }
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
