import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SavedParks } from '@/components/dashboard/saved-parks'
import { doc, getDoc } from 'firebase/firestore'
import { getParksByIds } from '@/lib/api'

// Mock Firebase firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}))

// Mock the API functions
jest.mock('@/lib/api', () => ({
  getParksByIds: jest.fn(),
}))

describe('SavedParks', () => {
  const userId = 'user123'
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('shows loading state initially', () => {
    render(<SavedParks userId={userId} />)
    
    expect(screen.getByText('Loading your saved parks...')).toBeInTheDocument()
  })
  
  it('shows message when user has no saved parks', async () => {
    // Mock getDoc to return a user document with empty favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: [],
      }),
    })
    
    render(<SavedParks userId={userId} />)
    
    await waitFor(() => {
      expect(screen.getByText('You haven\'t saved any parks yet.')).toBeInTheDocument()
    })
  })
  
  it('renders saved parks when user has favorites', async () => {
    // Mock getDoc to return a user document with favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: ['yose', 'grca'],
      }),
    })
    
    // Mock getParksByIds to return park data
    ;(getParksByIds as jest.Mock).mockResolvedValue([
      {
        id: 'park1',
        parkCode: 'yose',
        name: 'Yosemite National Park',
        states: 'CA',
        images: [{ url: 'https://example.com/yosemite.jpg', altText: 'Yosemite' }],
        description: 'Yosemite description',
      },
      {
        id: 'park2',
        parkCode: 'grca',
        name: 'Grand Canyon National Park',
        states: 'AZ',
        images: [{ url: 'https://example.com/grandcanyon.jpg', altText: 'Grand Canyon' }],
        description: 'Grand Canyon description',
      },
    ])
    
    render(<SavedParks userId={userId} />)
    
    await waitFor(() => {
      // Check if both parks are rendered
      expect(screen.getByText('Yosemite National Park')).toBeInTheDocument()
      expect(screen.getByText('Grand Canyon National Park')).toBeInTheDocument()
      
      // Check if images are rendered
      expect(screen.getByAltText('Yosemite')).toBeInTheDocument()
      expect(screen.getByAltText('Grand Canyon')).toBeInTheDocument()
      
      // Check if view details buttons are rendered
      expect(screen.getAllByText('View Details')).toHaveLength(2)
    })
  })
  
  it('handles errors when fetching saved parks', async () => {
    // Mock getDoc to reject with an error
    ;(getDoc as jest.Mock).mockRejectedValue(new Error('Failed to fetch user data'))
    
    render(<SavedParks userId={userId} />)
    
    await waitFor(() => {
      expect(screen.getByText('Error loading saved parks. Please try again later.')).toBeInTheDocument()
    })
  })
}) 