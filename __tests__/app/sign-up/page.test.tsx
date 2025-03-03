import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignUpPage from '@/app/sign-up/page'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}))

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('SignUpPage', () => {
  const mockSignUp = jest.fn()
  const mockSignInWithGoogle = jest.fn()
  const mockPush = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock the useAuth hook implementation
    ;(useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      signInWithGoogle: mockSignInWithGoogle,
      loading: false,
    })
    
    // Mock the useRouter hook implementation
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })
  
  it('renders the sign up form', () => {
    render(<SignUpPage />)
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })
  
  it('shows validation error when form is submitted with empty fields', async () => {
    render(<SignUpPage />)
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
    })
    
    // Ensure signUp was not called
    expect(mockSignUp).not.toHaveBeenCalled()
  })
  
  it('shows validation error when passwords do not match', async () => {
    render(<SignUpPage />)
    
    // Fill in the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    })
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password456' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })
    
    // Ensure signUp was not called
    expect(mockSignUp).not.toHaveBeenCalled()
  })
  
  it('calls signUp with correct credentials and redirects on successful sign up', async () => {
    mockSignUp.mockResolvedValue(undefined)
    
    render(<SignUpPage />)
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    })
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })
  
  it('displays an error message when sign up fails', async () => {
    mockSignUp.mockRejectedValue({ message: 'Email already in use' })
    
    render(<SignUpPage />)
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    })
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'existing@example.com' },
    })
    
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })
    
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument()
    })
  })
  
  it('calls signInWithGoogle and redirects on successful Google sign up', async () => {
    mockSignInWithGoogle.mockResolvedValue(undefined)
    
    render(<SignUpPage />)
    
    // Click the Google sign up button
    fireEvent.click(screen.getByRole('button', { name: /google/i }))
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })
}) 