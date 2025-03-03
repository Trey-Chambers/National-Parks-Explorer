'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

interface Itinerary {
  id: string
  name: string
  startDate: string
  endDate: string
  parks: Array<{
    id: string
    name: string
    parkCode: string
    states: string
  }>
  createdAt: string
}

interface UserItinerariesProps {
  userId: string
}

export function UserItineraries({ userId }: UserItinerariesProps) {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchItineraries() {
      try {
        // Query Firestore for user's itineraries
        const itinerariesQuery = query(
          collection(db, 'itineraries'),
          where('userId', '==', userId)
        )
        
        const querySnapshot = await getDocs(itinerariesQuery)
        const itinerariesData: Itinerary[] = []
        
        querySnapshot.forEach((doc) => {
          itinerariesData.push({
            id: doc.id,
            ...doc.data() as Omit<Itinerary, 'id'>
          })
        })
        
        // Sort by creation date (newest first)
        itinerariesData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        
        setItineraries(itinerariesData)
      } catch (error) {
        console.error('Error fetching itineraries:', error)
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchItineraries()
  }, [userId])
  
  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading itineraries...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Failed to load your itineraries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }
  
  if (itineraries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Itineraries</CardTitle>
          <CardDescription>
            You haven't created any itineraries yet. Plan your next adventure!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/itinerary">Create Itinerary</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Your Itineraries</h2>
        <Button asChild>
          <Link href="/itinerary">Create New Itinerary</Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {itineraries.map((itinerary) => (
          <Card key={itinerary.id}>
            <CardHeader>
              <CardTitle>{itinerary.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {itinerary.startDate && itinerary.endDate ? (
                  <>
                    {format(new Date(itinerary.startDate), 'MMM d, yyyy')} - {format(new Date(itinerary.endDate), 'MMM d, yyyy')}
                  </>
                ) : (
                  'No dates set'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium">Parks:</h3>
                <ul className="space-y-1">
                  {itinerary.parks.map((park) => (
                    <li key={park.id} className="flex items-center text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {park.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/itinerary/${itinerary.id}`}>
                    View Details
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 