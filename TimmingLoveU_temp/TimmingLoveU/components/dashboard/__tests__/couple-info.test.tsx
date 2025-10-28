
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CoupleInfo } from '../couple-info'
import { toast } from 'sonner'

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}))

describe('CoupleInfo Component', () => {
  const mockCoupleData = {
    couplePage: {
      nomeCasal: 'João & Maria',
      mensagem: 'Nossa história de amor começou em um dia ensolarado...',
      dataInicioRelacao: '2023-01-15',
      bannerUrl: '/test-banner.jpg',
      slugPublico: 'joao-maria',
    },
    views: 150,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
      share: undefined,
    })
  })

  it('should render couple name correctly', () => {
    render(<CoupleInfo {...mockCoupleData} />)
    expect(screen.getByText('João & Maria')).toBeInTheDocument()
  })

  it('should render relationship start date formatted correctly', () => {
    render(<CoupleInfo {...mockCoupleData} />)
    expect(screen.getByText(/Desde 15\/01\/2023/)).toBeInTheDocument()
  })

  it('should render views count', () => {
    render(<CoupleInfo {...mockCoupleData} />)
    expect(screen.getByText(/150 visualizações/)).toBeInTheDocument()
  })

  it('should render couple message when provided', () => {
    render(<CoupleInfo {...mockCoupleData} />)
    expect(screen.getByText(/Nossa história de amor começou em um dia ensolarado/)).toBeInTheDocument()
  })

  it('should not render message section when message is null', () => {
    const dataWithoutMessage = {
      ...mockCoupleData,
      couplePage: { ...mockCoupleData.couplePage, mensagem: null },
    }
    render(<CoupleInfo {...dataWithoutMessage} />)
    expect(screen.queryByText('Nossa História')).not.toBeInTheDocument()
  })

  it('should render public page link correctly', () => {
    render(<CoupleInfo {...mockCoupleData} />)
    expect(screen.getByText(/http:\/\/localhost:3000\/joao-maria/)).toBeInTheDocument()
  })

  it('should open public page in new tab when "Ver Página Pública" is clicked', () => {
    window.open = jest.fn()
    render(<CoupleInfo {...mockCoupleData} />)
    
    const visitPageButton = screen.getByText('Ver Página Pública')
    fireEvent.click(visitPageButton)
    
    expect(window.open).toHaveBeenCalledWith('/joao-maria', '_blank')
  })

  it('should copy link to clipboard when share button is clicked (no navigator.share)', async () => {
    render(<CoupleInfo {...mockCoupleData} />)
    
    const shareButton = screen.getByText('Compartilhar')
    fireEvent.click(shareButton)
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/joao-maria'
      )
      expect(toast.success).toHaveBeenCalledWith('Link copiado para a área de transferência!')
    })
  })

  it('should use navigator.share when available', async () => {
    const mockShare = jest.fn(() => Promise.resolve())
    Object.assign(navigator, { share: mockShare })
    
    render(<CoupleInfo {...mockCoupleData} />)
    
    const shareButton = screen.getByText('Compartilhar')
    fireEvent.click(shareButton)
    
    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith({
        title: 'João & Maria - Timming LoveU',
        text: 'Veja nossa página do amor!',
        url: 'http://localhost:3000/joao-maria',
      })
    })
  })

  it('should fallback to clipboard when navigator.share throws error', async () => {
    const mockShare = jest.fn(() => Promise.reject(new Error('Share cancelled')))
    Object.assign(navigator, { share: mockShare })
    
    render(<CoupleInfo {...mockCoupleData} />)
    
    const shareButton = screen.getByText('Compartilhar')
    fireEvent.click(shareButton)
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/joao-maria'
      )
      expect(toast.success).toHaveBeenCalledWith('Link copiado para a área de transferência!')
    })
  })

  it('should render banner image when bannerUrl is provided', () => {
    const { container } = render(<CoupleInfo {...mockCoupleData} />)
    const images = container.querySelectorAll('img')
    const bannerImage = Array.from(images).find(img => img.src.includes('test-banner.jpg'))
    expect(bannerImage).toBeInTheDocument()
  })

  it('should render heart icon when no banner is provided', () => {
    const dataWithoutBanner = {
      ...mockCoupleData,
      couplePage: { ...mockCoupleData.couplePage, bannerUrl: null },
    }
    const { container } = render(<CoupleInfo {...dataWithoutBanner} />)
    // Check for the Heart icon class (lucide-react adds specific classes)
    const heartIcon = container.querySelector('svg')
    expect(heartIcon).toBeInTheDocument()
  })
})
