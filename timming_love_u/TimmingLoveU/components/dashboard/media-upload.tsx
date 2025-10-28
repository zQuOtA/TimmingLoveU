'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Upload, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface MediaUploadProps {
  onUploadSuccess?: () => void
}

export function MediaUpload({ onUploadSuccess }: MediaUploadProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const isImage = selectedFile.type.startsWith('image/')
    const isVideo = selectedFile.type.startsWith('video/')

    if (!isImage && !isVideo) {
      toast.error('Tipo de arquivo inválido. Envie uma imagem ou vídeo.')
      return
    }

    // Validate file size
    const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024 // 10MB for images, 50MB for videos
    if (selectedFile.size > maxSize) {
      toast.error(`Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`)
      return
    }

    setFile(selectedFile)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Selecione um arquivo primeiro.')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (titulo) formData.append('titulo', titulo)
      if (descricao) formData.append('descricao', descricao)
      if (dataEvento) formData.append('dataEvento', dataEvento)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar arquivo')
      }

      toast.success(data.message)
      
      // Reset form
      setFile(null)
      setPreview(null)
      setTitulo('')
      setDescricao('')
      setDataEvento('')
      setOpen(false)
      
      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess()
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar arquivo')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isImage = file?.type.startsWith('image/')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <Upload className="w-4 h-4 mr-2" />
          Enviar Mídia
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enviar Foto ou Vídeo</DialogTitle>
          <DialogDescription>
            Compartilhe momentos especiais do seu relacionamento. Imagens até 10MB e vídeos até 50MB.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Arquivo</Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="relative">
                  {isImage ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <video
                      src={preview}
                      controls
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-4">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Clique para selecionar uma imagem ou vídeo
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, WebP até 10MB • MP4, WebM, MOV até 50MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título (opcional)</Label>
            <Input
              id="titulo"
              placeholder="Ex: Nosso primeiro encontro"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição (opcional)</Label>
            <Textarea
              id="descricao"
              placeholder="Conte a história desse momento especial..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="dataEvento">Data do Evento (opcional)</Label>
            <Input
              id="dataEvento"
              type="date"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
            />
          </div>

          {/* Upload Button */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1 bg-pink-500 hover:bg-pink-600"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUploading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
