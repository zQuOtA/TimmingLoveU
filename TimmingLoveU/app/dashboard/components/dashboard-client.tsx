'use client'

import { useState, useEffect } from 'react'
import { 
  Heart, 
  BarChart3, 
  Image as ImageIcon, 
  Award, 
  Menu,
  LogOut,
  Home,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CoupleInfo } from '@/components/dashboard/couple-info'
import { RelationshipStats } from '@/components/dashboard/relationship-stats'
import { Milestones } from '@/components/dashboard/milestones'
import { MediaGallery } from '@/components/dashboard/media-gallery'
import { MediaUpload } from '@/components/dashboard/media-upload'
import { SubscriptionStatus } from '@/components/dashboard/subscription-status'
import { toast } from 'sonner'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface DashboardData {
  stats: {
    duration: {
      totalDays: number
      years: number
      months: number
      days: number
    }
    media: {
      total: number
      images: number
      videos: number
    }
    views: number
    memberSince: string
    milestones: any[]
  }
  couplePage: {
    id: string
    nomeCasal: string
    mensagem: string | null
    dataInicioRelacao: string
    bannerUrl: string | null
    slugPublico: string
  }
}

interface DashboardClientProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/couple/stats')
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 400) {
            // User doesn't have a couple page yet
            setDashboardData(null)
            return
          }
          throw new Error(data.error || 'Erro ao carregar dados')
        }

        setDashboardData(data)
      } catch (error: any) {
        console.error('Error loading dashboard:', error)
        toast.error(error.message || 'Erro ao carregar dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [refreshTrigger])

  const handleUploadSuccess = () => {
    // Refresh dashboard data
    setRefreshTrigger(prev => prev + 1)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Página de Casal Não Encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            Você ainda não criou uma página de casal. Crie uma agora para começar!
          </p>
          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir para Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const userName = user?.name || user?.email || 'Usuário'
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              <span className="font-playfair font-bold text-xl text-gray-900">
                Timming LoveU
              </span>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback className="bg-pink-100 text-pink-700">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">
                    {userName}
                  </span>
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <Home className="w-4 h-4 mr-2" />
                    Página Inicial
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${dashboardData.couplePage.slugPublico}`} className="cursor-pointer">
                    <Heart className="w-4 h-4 mr-2" />
                    Minha Página de Casal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Gerencie sua página de casal e acompanhe seus momentos especiais
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Estatísticas</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2 py-3">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Galeria</span>
              <span className="sm:hidden">Mídia</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2 py-3">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Marcos</span>
              <span className="sm:hidden">Marcos</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Subscription Status */}
            <SubscriptionStatus />
            
            <CoupleInfo 
              couplePage={dashboardData.couplePage} 
              views={dashboardData.stats.views}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <RelationshipStats stats={dashboardData.stats} />
              </div>
              <div>
                <Milestones milestones={dashboardData.stats.milestones} />
              </div>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <RelationshipStats stats={dashboardData.stats} />
          </TabsContent>

          {/* Media Gallery Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-1">
                  Galeria de Memórias
                </h2>
                <p className="text-gray-600">
                  Suas fotos e vídeos especiais em um só lugar
                </p>
              </div>
              <MediaUpload onUploadSuccess={handleUploadSuccess} />
            </div>
            <MediaGallery refreshTrigger={refreshTrigger} />
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Milestones milestones={dashboardData.stats.milestones} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
