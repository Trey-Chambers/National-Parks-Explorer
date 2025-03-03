'use client'

import { useState, useEffect } from 'react'
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface ParkFavoriteButtonProps {
  parkCode: string
  parkName: string
}

export function ParkFavoriteButton({ parkCode, parkName }: ParkFavoriteButtonProps) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    async function checkIfFavorite() {
      if (!user) {
        setLoading(false)
        return
      }
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          const favorites = userData.favorites || []
          setIsFavorite(favorites.includes(parkCode))
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkIfFavorite()
  }, [user, parkCode])
  
  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save parks to your favorites.",
        variant: "destructive"
      })
      return
    }
    
    setLoading(true)
    
    try {
      const userRef = doc(db, 'users', user.uid)
      
      if (isFavorite) {
        // Remove from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(parkCode)
        })
        
        toast({
          title: "Removed from favorites",
          description: `${parkName} has been removed from your favorites.`
        })
      } else {
        // Add to favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(parkCode)
        })
        
        toast({
          title: "Added to favorites",
          description: `${parkName} has been added to your favorites.`
        })
      }
      
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error updating favorites:', error)
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={toggleFavorite}
      disabled={loading}
      className={isFavorite ? "bg-primary text-primary-foreground" : ""}
    >
      <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Saved" : "Save to Favorites"}
    </Button>
  )
} 