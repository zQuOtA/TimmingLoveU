
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Milestones } from '../milestones'

describe('Milestones Component', () => {
  const mockMilestones = [
    {
      title: '100 Dias Juntos',
      date: new Date('2023-04-25'),
      description: 'Celebrando 100 dias de amor 💕',
      completed: true,
    },
    {
      title: 'Primeiro Aniversário',
      date: new Date('2024-01-15'),
      description: '1 ano de amor e felicidade ❤️',
      completed: true,
    },
    {
      title: '1000 Dias Juntos',
      date: new Date('2025-10-11'),
      description: 'Um marco especial de 1000 dias! 🎉',
      completed: false,
    },
  ]

  it('should render all milestones', () => {
    render(<Milestones milestones={mockMilestones} />)
    
    expect(screen.getByText('100 Dias Juntos')).toBeInTheDocument()
    expect(screen.getByText('Primeiro Aniversário')).toBeInTheDocument()
    expect(screen.getByText('1000 Dias Juntos')).toBeInTheDocument()
  })

  it('should render milestone descriptions', () => {
    render(<Milestones milestones={mockMilestones} />)
    
    expect(screen.getByText(/Celebrando 100 dias de amor/)).toBeInTheDocument()
    expect(screen.getByText(/1 ano de amor e felicidade/)).toBeInTheDocument()
    expect(screen.getByText(/Um marco especial de 1000 dias/)).toBeInTheDocument()
  })

  it('should format dates correctly', () => {
    render(<Milestones milestones={mockMilestones} />)
    
    expect(screen.getByText(/25\/04\/2023/)).toBeInTheDocument()
    expect(screen.getByText(/15\/01\/2024/)).toBeInTheDocument()
  })

  it('should show completed status for completed milestones', () => {
    const { container } = render(<Milestones milestones={mockMilestones} />)
    
    // Check for completed milestone indicators
    const completedIndicators = container.querySelectorAll('[data-completed="true"]')
    expect(completedIndicators.length).toBeGreaterThan(0)
  })

  it('should show pending status for upcoming milestones', () => {
    const { container } = render(<Milestones milestones={mockMilestones} />)
    
    // Check for pending milestone indicators
    const pendingIndicators = container.querySelectorAll('[data-completed="false"]')
    expect(pendingIndicators.length).toBeGreaterThan(0)
  })

  it('should render empty state when no milestones', () => {
    render(<Milestones milestones={[]} />)
    
    expect(screen.getByText(/Nenhum marco/i)).toBeInTheDocument()
  })

  it('should display milestones in order', () => {
    render(<Milestones milestones={mockMilestones} />)
    
    const titles = screen.getAllByRole('heading', { level: 4 })
    expect(titles[0]).toHaveTextContent('100 Dias Juntos')
    expect(titles[1]).toHaveTextContent('Primeiro Aniversário')
    expect(titles[2]).toHaveTextContent('1000 Dias Juntos')
  })

  it('should handle single milestone', () => {
    const singleMilestone = [mockMilestones[0]]
    render(<Milestones milestones={singleMilestone} />)
    
    expect(screen.getByText('100 Dias Juntos')).toBeInTheDocument()
    expect(screen.queryByText('Primeiro Aniversário')).not.toBeInTheDocument()
  })
})
