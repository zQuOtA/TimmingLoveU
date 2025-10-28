
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Mail, MessageCircle, Send, Heart } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, assunto: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      toast.error('Por favor, preencha todos os campos.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        setFormData({
          nome: '',
          email: '',
          assunto: '',
          mensagem: ''
        })
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.')
      }
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-gray-700">Nome</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
              className="pl-10"
              placeholder="Seu nome completo"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10"
              placeholder="seu@email.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assunto" className="text-gray-700">Assunto</Label>
        <Select value={formData.assunto} onValueChange={handleSubjectChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o assunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="suporte">Suporte Técnico</SelectItem>
            <SelectItem value="pagamento">Questões de Pagamento</SelectItem>
            <SelectItem value="sugestao">Sugestão ou Feedback</SelectItem>
            <SelectItem value="bug">Reportar Bug</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem" className="text-gray-700">Mensagem</Label>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
          <Textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            required
            className="pl-10 min-h-[120px]"
            placeholder="Escreva sua mensagem aqui..."
          />
        </div>
      </div>

      <Button type="submit" className="w-full btn-romantic" disabled={isLoading}>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <Send className="w-5 h-5 mr-2" />
        )}
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>
    </form>
  )
}
