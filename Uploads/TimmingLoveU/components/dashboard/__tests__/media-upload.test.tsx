
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MediaUpload } from '../media-upload'
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

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url')

describe('MediaUpload Component', () => {
  const mockOnUploadSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
  })

  it('should render upload form', () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    expect(screen.getByText(/Adicionar Foto ou Vídeo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Arquivo/i)).toBeInTheDocument()
  })

  it('should allow file selection', () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    expect(fileInput.files?.[0]).toBe(file)
  })

  it('should show preview when image is selected', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    await waitFor(() => {
      const preview = screen.getByAltText(/Preview/i)
      expect(preview).toBeInTheDocument()
    })
  })

  it('should allow entering title and description', () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const titleInput = screen.getByPlaceholderText(/Título/i)
    const descriptionInput = screen.getByPlaceholderText(/Descrição/i)
    
    fireEvent.change(titleInput, { target: { value: 'Minha foto' } })
    fireEvent.change(descriptionInput, { target: { value: 'Uma descrição linda' } })
    
    expect(titleInput).toHaveValue('Minha foto')
    expect(descriptionInput).toHaveValue('Uma descrição linda')
  })

  it('should submit form with file', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/media/upload',
        expect.objectContaining({
          method: 'POST',
        })
      )
      expect(mockOnUploadSuccess).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalled()
    })
  })

  it('should show error when no file is selected', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Por favor, selecione um arquivo')
    })
  })

  it('should validate file size for images', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    // Create a file larger than 10MB
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
    
    Object.defineProperty(largeFile, 'size', { value: 11 * 1024 * 1024 })
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('muito grande')
      )
    })
  })

  it('should validate file type', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const invalidFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    
    fireEvent.change(fileInput, { target: { files: [invalidFile] } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('tipo de arquivo')
      )
    })
  })

  it('should handle upload error', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Upload failed' }),
    })

    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
      expect(mockOnUploadSuccess).not.toHaveBeenCalled()
    })
  })

  it('should reset form after successful upload', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const titleInput = screen.getByPlaceholderText(/Título/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(titleInput.value).toBe('')
    })
  })

  it('should disable submit button while uploading', async () => {
    render(<MediaUpload onUploadSuccess={mockOnUploadSuccess} />)
    
    const fileInput = screen.getByLabelText(/Arquivo/i) as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    const submitButton = screen.getByText(/Enviar/i)
    fireEvent.click(submitButton)
    
    // Button should be disabled during upload
    expect(submitButton).toBeDisabled()
  })
})
