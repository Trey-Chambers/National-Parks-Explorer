import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'
import { useAuth } from '@/contexts/auth-context'
import { redirect } from 'next/navigation'

// Mock the components used in the dashboard
jest.mock('@/components/dashboard/user-profile', () => ({
  UserProfile: ({ user }) => <div data-testid="user-profile">User Profile: {user.email}</div>,
}))

jest.mock('@/components/dashboard/saved-parks', () => ({
  SavedParks: ({ userId }) => <div data-testid="saved-parks">Saved Parks for: {userId}</div>,
}))

jest.mock('@/components/dashboard/user-itineraries', () => ({
  UserItineraries: ({ userId }) => <div data-testid="user-itineraries">Itineraries for: {userId}</div>,
}))

// Mock the useAuth hook
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useSearchParams: () => ({
    get: jest.fn().mockImplementation((param) => {
      if (param === 'tab') return 'profile'
      return null
    }),
  }),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('redirects to sign-in page when user is not authenticated', async () => {
    // Mock useAuth to return no user and not loading
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    })
    
    render(<DashboardPage />)
    
    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/sign-in?callbackUrl=/dashboard')
    })
  })
  
  it('shows loading state when authentication is in progress', () => {
    // Mock useAuth to return loading state
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    })
    
    render(<DashboardPage />)
    
    // Check if loading spinner is shown
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
  
  it('renders the dashboard with tabs when user is authenticated', async () => {
    // Mock useAuth to return a user
    const mockUser = { uid: 'user123', email: 'test@example.com' }
    ;(useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    })
    
    render(<DashboardPage />)
    
    // Check if dashboard title is rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    
    // Check if tabs are rendered
    expect(screen.getByRole('tab', { name: /profile/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /saved parks/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /itineraries/i })).toBeInTheDocument()
    
    // Check if the profile tab content is rendered by default
    expect(screen.getByTestId('user-profile')).toBeInTheDocument()
    expect(screen.getByText(`User Profile: ${mockUser.email}`)).toBeInTheDocument()
  })
}) 