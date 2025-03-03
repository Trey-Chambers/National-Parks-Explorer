'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/components/dashboard/user-profile'
import { SavedParks } from '@/components/dashboard/saved-parks'
import { UserItineraries } from '@/components/dashboard/user-itineraries'
import { LogOut } from 'lucide-react'

export function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [user, loading, router])
  
  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }
  
  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return null
  }
  
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.displayName || 'Explorer'}
          </p>
        </div>
        
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="saved-parks">Saved Parks</TabsTrigger>
          <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <UserProfile user={user} />
        </TabsContent>
        
        <TabsContent value="saved-parks">
          <SavedParks userId={user.uid} />
        </TabsContent>
        
        <TabsContent value="itineraries">
          <UserItineraries userId={user.uid} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 