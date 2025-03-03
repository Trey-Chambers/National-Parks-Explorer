'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ParkSearch } from '@/components/itinerary/park-search'
import { ItineraryList } from '@/components/itinerary/itinerary-list'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Park } from '@/types/nps'

export function ItineraryBuilder() {
  const [selectedParks, setSelectedParks] = useState<Park[]>([])
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const { toast } = useToast()
  const router = useRouter()
  
  const addParkToItinerary = (park: Park) => {
    if (selectedParks.some(p => p.id === park.id)) {
      toast({
        title: "Park already in itinerary",
        description: `${park.name} is already in your itinerary.`,
        variant: "destructive",
      })
      return
    }
    
    setSelectedParks(prev => [...prev, park])
    toast({
      title: "Park added to itinerary",
      description: `${park.name} has been added to your itinerary.`,
    })
  }
  
  const removeParkFromItinerary = (parkId: string) => {
    setSelectedParks(prev => prev.filter(park => park.id !== parkId))
  }
  
  const reorderParks = (startIndex: number, endIndex: number) => {
    const result = Array.from(selectedParks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    
    setSelectedParks(result)
  }
  
  const saveItinerary = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a toast
    toast({
      title: "Itinerary saved",
      description: "Your itinerary has been saved successfully.",
    })
  }
  
  const shareItinerary = () => {
    // In a real app, this would generate a shareable link
    // For now, we'll just copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied to clipboard",
      description: "Share this link with friends and family.",
    })
  }
  
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Your Itinerary</h2>
          
          <ItineraryList 
            parks={selectedParks} 
            onRemove={removeParkFromItinerary} 
            onReorder={reorderParks}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={saveItinerary} disabled={selectedParks.length === 0}>
              Save Itinerary
            </Button>
            <Button 
              variant="outline" 
              onClick={shareItinerary}
              disabled={selectedParks.length === 0}
            >
              Share Itinerary
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Add Parks</h2>
          <ParkSearch onSelectPark={addParkToItinerary} />
        </div>
      </div>
    </div>
  )
} 