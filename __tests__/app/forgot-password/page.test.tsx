import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ForgotPasswordPage from '@/app/forgot-password/page'
import { useAuth } from '@/contexts/auth-context'

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}))

describe('ForgotPasswordPage', () => {
  const mockResetPassword = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock the useAuth hook implementation
    ;(useAuth as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
    })
  })
  
  it('renders the forgot password form', () => {
    render(<ForgotPasswordPage />)
    
    expect(screen.getByText('Reset Password')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })
  
  it('shows validation error when form is submitted with empty email', async () => {
    render(<ForgotPasswordPage />)
    
    // Submit the form without filling in the email
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Please enter your email address')).toBeInTheDocument()
    })
    
    // Ensure resetPassword was not called
    expect(mockResetPassword).not.toHaveBeenCalled()
  })
  
  it('calls resetPassword with correct email and shows success message', async () => {
    mockResetPassword.mockResolvedValue(undefined)
    
    render(<ForgotPasswordPage />)
    
    // Fill in the email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }))
    
    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com')
      expect(screen.getByText('Password reset email sent. Please check your inbox.')).toBeInTheDocument()
    })
  })
  
  it('displays an error message when password reset fails', async () => {
    mockResetPassword.mockRejectedValue({ message: 'User not found' })
    
    render(<ForgotPasswordPage />)
    
    // Fill in the email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'nonexistent@example.com' },
    })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }))
    
    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument()
    })
  })
  
  it('displays loading state when sending reset email', async () => {
    // Set loading to true
    ;(useAuth as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: true,
    })
    
    render(<ForgotPasswordPage />)
    
    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
  })
}) 