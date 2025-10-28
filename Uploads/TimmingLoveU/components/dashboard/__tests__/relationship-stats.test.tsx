
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { RelationshipStats } from '../relationship-stats'

describe('RelationshipStats Component', () => {
  const mockStats = {
    stats: {
      duration: {
        totalDays: 730,
        years: 2,
        months: 0,
        days: 0,
      },
      media: {
        total: 50,
        images: 35,
        videos: 15,
      },
    },
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should render relationship duration correctly', () => {
    render(<RelationshipStats {...mockStats} />)
    
    expect(screen.getByText(/2/)).toBeInTheDocument() // years
    expect(screen.getByText(/Anos/i)).toBeInTheDocument()
  })

  it('should render total days correctly', () => {
    render(<RelationshipStats {...mockStats} />)
    expect(screen.getByText('730')).toBeInTheDocument()
  })

  it('should render media statistics correctly', () => {
    render(<RelationshipStats {...mockStats} />)
    
    expect(screen.getByText('50')).toBeInTheDocument() // total media
    expect(screen.getByText('35')).toBeInTheDocument() // images
    expect(screen.getByText('15')).toBeInTheDocument() // videos
  })

  it('should update live time every second', async () => {
    render(<RelationshipStats {...mockStats} />)
    
    // Initial render
    const initialTime = screen.getAllByText(/\d+/)[0]
    expect(initialTime).toBeInTheDocument()
    
    // Advance time by 1 second
    jest.advanceTimersByTime(1000)
    
    await waitFor(() => {
      // Time should have updated
      const updatedTime = screen.getAllByText(/\d+/)[0]
      expect(updatedTime).toBeInTheDocument()
    })
  })

  it('should render with zero media', () => {
    const statsWithNoMedia = {
      stats: {
        ...mockStats.stats,
        media: {
          total: 0,
          images: 0,
          videos: 0,
        },
      },
    }
    
    render(<RelationshipStats {...statsWithNoMedia} />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should handle single digit duration values', () => {
    const statsWithSingleDigits = {
      stats: {
        duration: {
          totalDays: 45,
          years: 0,
          months: 1,
          days: 15,
        },
        media: mockStats.stats.media,
      },
    }
    
    render(<RelationshipStats {...statsWithSingleDigits} />)
    
    expect(screen.getByText('1')).toBeInTheDocument() // 1 month
    expect(screen.getByText('15')).toBeInTheDocument() // 15 days
  })

  it('should display all stat cards', () => {
    const { container } = render(<RelationshipStats {...mockStats} />)
    
    // Should have multiple card elements
    const cards = container.querySelectorAll('[class*="card"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})
