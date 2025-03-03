import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignInPage from '@/app/sign-in/page'
import { useAuth } from '@/contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}))

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('SignInPage', () => {
  const mockSignIn = jest.fn()
  const mockSignInWithGoogle = jest.fn()
  const mockPush = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock the useAuth hook implementation
    ;(useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signInWithGoogle: mockSignInWithGoogle,
      loading: false,
    })
    
    // Mock the useRouter hook implementation
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    
    // Mock the useSearchParams hook implementation
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('/dashboard'),
    })
  })
  
  it('renders the sign in form', () => {
    render(<SignInPage />)
    
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
  
  it('shows validation error when form is submitted with empty fields', async () => {
    render(<SignInPage />)
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
    })
    
    // Ensure signIn was not called
    expect(mockSignIn).not.toHaveBeenCalled()
  })
  
  it('calls signIn with correct credentials and redirects on successful sign in', async () => {
    mockSignIn.mockResolvedValue(undefined)
    
    render(<SignInPage />)
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })
  
  it('displays an error message when sign in fails', async () => {
    mockSignIn.mockRejectedValue({ message: 'Invalid email or password' })
    
    render(<SignInPage />)
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong-password' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    })
  })
  
  it('calls signInWithGoogle and redirects on successful Google sign in', async () => {
    mockSignInWithGoogle.mockResolvedValue(undefined)
    
    render(<SignInPage />)
    
    // Click the Google sign in button
    fireEvent.click(screen.getByRole('button', { name: /google/i }))
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })
  
  it('displays loading state when signing in', async () => {
    // Set loading to true
    ;(useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signInWithGoogle: mockSignInWithGoogle,
      loading: true,
    })
    
    render(<SignInPage />)
    
    expect(screen.getByRole('button', { name: /signing in/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
  })
}) 