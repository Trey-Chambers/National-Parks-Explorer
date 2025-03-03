'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserProfile } from '@/components/dashboard/user-profile'
import { SavedParks } from '@/components/dashboard/saved-parks'
import { UserItineraries } from '@/components/dashboard/user-itineraries'
import { useAuth } from '@/contexts/auth-context'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('profile')
  
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['profile', 'saved-parks', 'itineraries'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])
  
  // Redirect if not logged in
  if (!loading && !user) {
    redirect('/sign-in?callbackUrl=/dashboard')
  }
  
  if (loading) {
    return (
      <div className="container flex h-[calc(100vh-200px)] items-center justify-center">
        <div data-testid="loading-spinner" className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }
  
  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="saved-parks">Saved Parks</TabsTrigger>
          <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          {user && <UserProfile user={user} />}
        </TabsContent>
        
        <TabsContent value="saved-parks">
          {user && <SavedParks userId={user.uid} />}
        </TabsContent>
        
        <TabsContent value="itineraries">
          {user && <UserItineraries userId={user.uid} />}
        </TabsContent>
      </Tabs>
    </div>
  )
} 