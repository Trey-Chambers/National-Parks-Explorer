'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { getParkByCode } from '@/lib/api'
import { Park } from '@/types/nps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ApiError } from '@/lib/api-client'
import { ApiError as ApiErrorComponent } from '@/components/ui/api-error'
import { parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { ExternalLink, MapPin } from 'lucide-react'

interface SavedParksProps {
  userId: string
}

export function SavedParks({ userId }: SavedParksProps) {
  const [parks, setParks] = useState<Park[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchSavedParks() {
      try {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, 'users', userId))
        
        if (!userDoc.exists()) {
          throw new Error('User document not found')
        }
        
        const userData = userDoc.data()
        const favoriteParks = userData.favorites || []
        
        if (favoriteParks.length === 0) {
          setParks([])
          setLoading(false)
          return
        }
        
        // Fetch park details for each saved park
        const parkPromises = favoriteParks.map(async (parkCode: string) => {
          const response = await getParkByCode(parkCode)
          return response.data[0]
        })
        
        const parksData = await Promise.all(parkPromises)
        setParks(parksData)
      } catch (error) {
        console.error('Error fetching saved parks:', error)
        if (error instanceof ApiError) {
          setError(`Failed to load saved parks: ${error.message}`)
        } else if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchSavedParks()
  }, [userId])
  
  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading saved parks...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return <ApiErrorComponent message={error} />
  }
  
  if (parks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Saved Parks</CardTitle>
          <CardDescription>
            You haven't saved any parks yet. Explore parks and save your favorites!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/parks">Explore Parks</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {parks.map((park) => {
          // Get state names from state codes
          const stateNames = parseStatesList(park.states)
            .map(code => US_STATES[code as keyof typeof US_STATES] || code)
            .join(', ')
          
          return (
            <Card key={park.id} className="overflow-hidden">
              <div className="relative h-48">
                {park.images && park.images.length > 0 && (
                  <Image
                    src={park.images[0].url}
                    alt={park.images[0].altText || park.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle>{park.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {stateNames}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                  {park.description}
                </p>
                <Button asChild>
                  <Link href={`/parks/${park.parkCode}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 