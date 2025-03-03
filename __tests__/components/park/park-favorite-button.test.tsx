import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ParkFavoriteButton } from '@/components/park/park-favorite-button'
import { useAuth } from '@/contexts/auth-context'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'

// Mock the Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}))

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}))

// Mock the useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('ParkFavoriteButton', () => {
  const mockUser = { uid: 'user123' }
  const mockToast = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock useAuth implementation
    ;(useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
    })
    
    // Mock useToast implementation
    ;(useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    })
  })
  
  it('renders the button in loading state initially', () => {
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
  
  it('checks if the park is a favorite when the component mounts', async () => {
    // Mock getDoc to return a user document with favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: ['yose'],
      }),
    })
    
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    await waitFor(() => {
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'user123')
      expect(getDoc).toHaveBeenCalled()
      
      // Button should show as favorited
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Saved')
      expect(button).not.toBeDisabled()
    })
  })
  
  it('adds a park to favorites when clicked and not already a favorite', async () => {
    // Mock getDoc to return a user document without favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: [],
      }),
    })
    
    // Mock updateDoc to resolve successfully
    ;(updateDoc as jest.Mock).mockResolvedValue(undefined)
    
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    // Wait for the initial check to complete
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalled()
    })
    
    // Click the button to add to favorites
    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
      // Check if updateDoc was called with arrayUnion
      expect(updateDoc).toHaveBeenCalled()
      expect(arrayUnion).toHaveBeenCalledWith('yose')
      
      // Check if toast was called with success message
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Added to favorites',
        description: expect.stringContaining('Yosemite National Park'),
      }))
      
      // Button should now show as favorited
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Saved')
    })
  })
  
  it('removes a park from favorites when clicked and already a favorite', async () => {
    // Mock getDoc to return a user document with favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: ['yose'],
      }),
    })
    
    // Mock updateDoc to resolve successfully
    ;(updateDoc as jest.Mock).mockResolvedValue(undefined)
    
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    // Wait for the initial check to complete
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalled()
    })
    
    // Click the button to remove from favorites
    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
      // Check if updateDoc was called with arrayRemove
      expect(updateDoc).toHaveBeenCalled()
      expect(arrayRemove).toHaveBeenCalledWith('yose')
      
      // Check if toast was called with success message
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Removed from favorites',
        description: expect.stringContaining('Yosemite National Park'),
      }))
      
      // Button should now show as not favorited
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Save to Favorites')
    })
  })
  
  it('shows an authentication required message when user is not logged in', async () => {
    // Mock useAuth to return no user
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
    })
    
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    // Wait for the initial check to complete
    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })
    
    // Click the button
    fireEvent.click(screen.getByRole('button'))
    
    // Check if toast was called with authentication required message
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Authentication required',
      description: expect.stringContaining('Please sign in'),
      variant: 'destructive',
    }))
  })
  
  it('handles errors when updating favorites', async () => {
    // Mock getDoc to return a user document without favorites
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        favorites: [],
      }),
    })
    
    // Mock updateDoc to reject with an error
    ;(updateDoc as jest.Mock).mockRejectedValue(new Error('Database error'))
    
    render(<ParkFavoriteButton parkCode="yose" parkName="Yosemite National Park" />)
    
    // Wait for the initial check to complete
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalled()
    })
    
    // Click the button to add to favorites
    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
      // Check if toast was called with error message
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        description: expect.stringContaining('Failed to update favorites'),
        variant: 'destructive',
      }))
    })
  })
}) 