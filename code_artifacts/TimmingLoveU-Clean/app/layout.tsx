import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Timming LoveU - Páginas Personalizadas de Casal',
  description: 'Crie páginas românticas personalizadas para celebrar seu amor. Cronômetro do tempo juntos, galeria de fotos, música especial e muito mais.',
  keywords: [
    'página de casal',
    'cronômetro relacionamento',
    'página romântica',
    'aniversário namoro',
    'tempo juntos',
    'galeria casal',
    'música romântica'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
