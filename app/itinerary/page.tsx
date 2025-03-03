import { Metadata } from 'next'
import { ItineraryBuilder } from '@/components/itinerary/itinerary-builder'

export const metadata: Metadata = {
  title: 'Plan Your Trip | National Parks Explorer',
  description: 'Create a custom itinerary for your national parks adventure',
}

export default function ItineraryPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Plan Your Trip</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Create a custom itinerary for your national parks adventure. Add parks, activities, and plan your perfect trip.
      </p>
      
      <ItineraryBuilder />
    </div>
  )
} 