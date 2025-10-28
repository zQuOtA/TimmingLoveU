'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Video, Trash2, Calendar, Loader2, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Media {
  id: string
  tipo: string
  url: string
  fileName: string
  titulo: string | null
  descricao: string | null
  dataEvento: string | null
  createdAt: string
}

interface MediaGalleryProps {
  refreshTrigger?: number
}

export function MediaGallery({ refreshTrigger }: MediaGalleryProps) {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadMedia = async () => {
    try {
      setIsLoading(true)
      const filterParam = filter !== 'all' ? `?tipo=${filter}` : ''
      const response = await fetch(`/api/media/list${filterParam}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar mídia')
      }

      setMedia(data.media)
    } catch (error: any) {
      console.error('Error loading media:', error)
      toast.error(error.message || 'Erro ao carregar mídia')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [filter, refreshTrigger])

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/media/delete?id=${deleteId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar mídia')
      }

      toast.success(data.message)
      setDeleteId(null)
      loadMedia()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao deletar mídia')
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredMedia = media

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar mídia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="image">Imagens</SelectItem>
            <SelectItem value="video">Vídeos</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600">
          {filteredMedia.length} {filteredMedia.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="flex justify-center gap-4 mb-4">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <Video className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Nenhuma mídia encontrada
          </h3>
          <p className="text-sm text-gray-600">
            Envie fotos e vídeos para começar sua galeria de memórias!
          </p>
        </div>
      )}

      {/* Media Grid */}
      {!isLoading && filteredMedia.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Media Content */}
              <div className="aspect-square relative bg-gray-100">
                {item.tipo === 'image' ? (
                  <Image
                    src={item.url}
                    alt={item.titulo || 'Imagem do casal'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                {/* Media Type Badge */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                  {item.tipo === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-white" />
                  ) : (
                    <Video className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Media Info */}
              <div className="p-3">
                {item.titulo && (
                  <h4 className="font-semibold text-gray-900 mb-1 truncate">
                    {item.titulo}
                  </h4>
                )}
                {item.descricao && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {item.descricao}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {item.dataEvento
                      ? format(new Date(item.dataEvento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                      : format(new Date(item.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá deletar permanentemente esta mídia.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                'Deletar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
