import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SessionProvider from '@/lib/auth/session-provider'
import { Toaster } from 'sonner'

export const dynamic = "force-dynamic"

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
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Timming LoveU - Páginas Personalizadas de Casal',
    description: 'Crie páginas românticas personalizadas para celebrar seu amor. Cronômetro do tempo juntos, galeria de fotos, música especial e muito mais.',
    url: '/',
    siteName: 'Timming LoveU',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Timming LoveU - Páginas Românticas Personalizadas'
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timming LoveU - Páginas Personalizadas de Casal',
    description: 'Crie páginas românticas personalizadas para celebrar seu amor',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster position="top-right" richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}