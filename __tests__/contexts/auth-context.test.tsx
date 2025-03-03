import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import { auth } from '@/lib/firebase'

// Mock Firebase auth functions
const mockSignInWithEmailAndPassword = jest.fn()
const mockCreateUserWithEmailAndPassword = jest.fn()
const mockSignOut = jest.fn()
const mockSendPasswordResetEmail = jest.fn()
const mockOnAuthStateChanged = jest.fn()

jest.mock('@/lib/firebase', () => {
  return {
    auth: {
      signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
      createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
      signOut: () => mockSignOut(),
      sendPasswordResetEmail: (...args) => mockSendPasswordResetEmail(...args),
      onAuthStateChanged: (callback) => {
        mockOnAuthStateChanged(callback)
        return jest.fn() // Return unsubscribe function
      },
    },
    db: {
      doc: jest.fn().mockReturnThis(),
      setDoc: jest.fn(),
      getDoc: jest.fn(),
    },
  }
})

// Test component that uses the auth context
const TestComponent = () => {
  const { user, loading, signIn, signOut, signUp, resetPassword } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
      <button onClick={() => signIn('test@example.com', 'password')}>Sign In</button>
      <button onClick={() => signUp('test@example.com', 'password', 'Test User')}>Sign Up</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => resetPassword('test@example.com')}>Reset Password</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('provides loading state initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
    expect(mockOnAuthStateChanged).toHaveBeenCalled()
  })
  
  it('updates user state when auth state changes', async () => {
    // Simulate a user being logged in
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback({ email: 'test@example.com', uid: '123' })
      return jest.fn()
    })
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    })
  })
  
  it('calls signIn when sign in button is clicked', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com', uid: '123' }
    })
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    fireEvent.click(screen.getByText('Sign In'))
    
    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password'
      )
    })
  })
  
  it('calls signUp when sign up button is clicked', async () => {
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: { 
        email: 'test@example.com', 
        uid: '123',
        updateProfile: jest.fn().mockResolvedValue(undefined)
      }
    })
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    fireEvent.click(screen.getByText('Sign Up'))
    
    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password'
      )
    })
  })
  
  it('calls signOut when sign out button is clicked', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    fireEvent.click(screen.getByText('Sign Out'))
    
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled()
    })
  })
  
  it('calls resetPassword when reset password button is clicked', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    fireEvent.click(screen.getByText('Reset Password'))
    
    await waitFor(() => {
      expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(
        auth,
        'test@example.com'
      )
    })
  })
}) 