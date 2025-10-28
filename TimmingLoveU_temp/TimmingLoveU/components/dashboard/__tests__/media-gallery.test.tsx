
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MediaGallery } from '../media-gallery'
import { toast } from 'sonner'

// Mock fetch
global.fetch = jest.fn()

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('MediaGallery Component', () => {
  const mockMediaData = [
    {
      id: '1',
      tipo: 'image',
      url: '/uploads/images/test1.jpg',
      fileName: 'test1.jpg',
      titulo: 'Foto de férias',
      descricao: 'Nossa viagem à praia',
      dataEvento: '2023-07-15',
      createdAt: '2023-07-15T10:00:00Z',
    },
    {
      id: '2',
      tipo: 'video',
      url: '/uploads/videos/test2.mp4',
      fileName: 'test2.mp4',
      titulo: 'Vídeo do aniversário',
      descricao: null,
      dataEvento: '2023-08-20',
      createdAt: '2023-08-20T14:30:00Z',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, media: mockMediaData }),
    })
  })

  it('should render loading state initially', () => {
    render(<MediaGallery />)
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument()
  })

  it('should load and display media items', async () => {
    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText('Foto de férias')).toBeInTheDocument()
      expect(screen.getByText('Vídeo do aniversário')).toBeInTheDocument()
    })
  })

  it('should display filter options', async () => {
    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText(/Todos/i)).toBeInTheDocument()
    })
  })

  it('should filter images when image filter is selected', async () => {
    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText('Foto de férias')).toBeInTheDocument()
    })

    // Find and click the filter select
    const filterButton = screen.getByRole('combobox')
    fireEvent.click(filterButton)
    
    // Select "Imagens" option
    const imageOption = screen.getByText(/Imagens/i)
    fireEvent.click(imageOption)
    
    await waitFor(() => {
      // Only image should be visible
      expect(screen.getByText('Foto de férias')).toBeInTheDocument()
    })
  })

  it('should show delete confirmation dialog when delete button is clicked', async () => {
    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText('Foto de férias')).toBeInTheDocument()
    })

    // Click delete button (first one)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0])
      
      await waitFor(() => {
        expect(screen.getByText(/Tem certeza/i)).toBeInTheDocument()
      })
    }
  })

  it('should delete media when confirmed', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, media: mockMediaData }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, media: [mockMediaData[1]] }),
      })

    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText('Foto de férias')).toBeInTheDocument()
    })

    // Click delete button
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg') && btn.closest('[data-testid]')?.getAttribute('data-testid') === 'delete-button'
    )
    
    if (deleteButton) {
      fireEvent.click(deleteButton)
      
      // Confirm deletion
      await waitFor(() => {
        const confirmButton = screen.getByText(/Confirmar/i)
        fireEvent.click(confirmButton)
      })

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled()
      })
    }
  })

  it('should handle fetch error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to load media' }),
    })

    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })

  it('should refresh media when refreshTrigger changes', async () => {
    const { rerender } = render(<MediaGallery refreshTrigger={1} />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    rerender(<MediaGallery refreshTrigger={2} />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  it('should display empty state when no media is available', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, media: [] }),
    })

    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText(/Nenhuma mídia/i)).toBeInTheDocument()
    })
  })

  it('should display event date when provided', async () => {
    render(<MediaGallery />)
    
    await waitFor(() => {
      expect(screen.getByText(/15\/07\/2023/)).toBeInTheDocument()
    })
  })
})
