import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserProfile } from '@/components/dashboard/user-profile'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'

// Mock Firebase auth and firestore
jest.mock('firebase/auth', () => ({
  updateProfile: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}))

// Mock the useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('UserProfile', () => {
  const mockUser = {
    uid: 'user123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
  }
  
  const mockToast = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock useToast implementation
    ;(useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    })
  })
  
  it('renders the user profile information', () => {
    render(<UserProfile user={mockUser} />)
    
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByAltText('Profile')).toHaveAttribute('src', mockUser.photoURL)
  })
  
  it('allows editing the display name', async () => {
    // Mock updateProfile to resolve successfully
    ;(updateProfile as jest.Mock).mockResolvedValue(undefined)
    ;(updateDoc as jest.Mock).mockResolvedValue(undefined)
    
    render(<UserProfile user={mockUser} />)
    
    // Click the edit button
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }))
    
    // Check if the form is displayed
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    
    // Change the name
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Updated Name' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))
    
    await waitFor(() => {
      // Check if updateProfile was called with the new name
      expect(updateProfile).toHaveBeenCalledWith(
        mockUser,
        { displayName: 'Updated Name' }
      )
      
      // Check if updateDoc was called to update the user document
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', mockUser.uid)
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        { name: 'Updated Name' }
      )
      
      // Check if toast was called with success message
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      }))
    })
  })
  
  it('handles errors when updating profile', async () => {
    // Mock updateProfile to reject with an error
    ;(updateProfile as jest.Mock).mockRejectedValue(new Error('Update failed'))
    
    render(<UserProfile user={mockUser} />)
    
    // Click the edit button
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }))
    
    // Change the name
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Updated Name' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))
    
    await waitFor(() => {
      // Check if toast was called with error message
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        description: 'Failed to update profile: Update failed',
        variant: 'destructive',
      }))
    })
  })
}) 