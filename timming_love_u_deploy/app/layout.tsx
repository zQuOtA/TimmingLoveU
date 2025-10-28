
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

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
  openGraph: {
    title: 'Timming LoveU - Páginas Personalizadas de Casal',
    description: 'Crie páginas românticas personalizadas para celebrar seu amor. Cronômetro do tempo juntos, galeria de fotos, música especial e muito mais.',
    url: '/',
    siteName: 'Timming LoveU',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
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
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
