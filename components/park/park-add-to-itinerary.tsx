'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Park } from '@/types/nps'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Plus } from 'lucide-react'

interface ParkAddToItineraryProps {
  park: Park
}

export function ParkAddToItinerary({ park }: ParkAddToItineraryProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const handleAddToItinerary = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add parks to your itinerary.",
        variant: "destructive"
      })
      return
    }
    
    // Store park in localStorage to be used in the itinerary page
    const parkToAdd = {
      id: park.id,
      name: park.name,
      parkCode: park.parkCode,
      states: park.states,
      images: park.images ? [park.images[0]] : []
    }
    
    try {
      // Get existing parks or initialize empty array
      const existingParks = JSON.parse(localStorage.getItem('itineraryParks') || '[]')
      
      // Check if park is already in the itinerary
      const parkExists = existingParks.some((p: any) => p.id === park.id)
      
      if (!parkExists) {
        // Add park to array
        existingParks.push(parkToAdd)
        
        // Save back to localStorage
        localStorage.setItem('itineraryParks', JSON.stringify(existingParks))
        
        toast({
          title: "Added to itinerary",
          description: `${park.name} has been added to your itinerary.`
        })
      } else {
        toast({
          title: "Already in itinerary",
          description: `${park.name} is already in your itinerary.`
        })
      }
      
      // Navigate to itinerary page
      router.push('/itinerary')
    } catch (error) {
      console.error('Error adding to itinerary:', error)
      toast({
        title: "Error",
        description: "Failed to add park to itinerary. Please try again.",
        variant: "destructive"
      })
    }
  }
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleAddToItinerary}
      disabled={loading}
    >
      <Calendar className="mr-2 h-4 w-4" />
      Add to Itinerary
    </Button>
  )
} 