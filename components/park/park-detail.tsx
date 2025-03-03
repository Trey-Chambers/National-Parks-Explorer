'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Park } from '@/types/nps'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ParkFavoriteButton } from '@/components/park/park-favorite-button'
import { ParkActivities } from '@/components/park/park-activities'
import { ParkMap } from '@/components/park/park-map'
import { ParkWeather } from '@/components/park/park-weather'
import { ParkHours } from '@/components/park/park-hours'
import { ParkFees } from '@/components/park/park-fees'
import { ParkAddToItinerary } from '@/components/park/park-add-to-itinerary'
import { parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

interface ParkDetailProps {
  park: Park
}

export function ParkDetail({ park }: ParkDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Get state names from state codes
  const stateNames = parseStatesList(park.states)
    .map(code => US_STATES[code as keyof typeof US_STATES] || code)
    .join(', ')
  
  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{park.name}</h1>
          <p className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {stateNames}
            {park.designation && ` • ${park.designation}`}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <ParkFavoriteButton parkCode={park.parkCode} parkName={park.name} />
          <ParkAddToItinerary park={park} />
          <Button variant="outline" size="sm" asChild>
            <Link href={park.url} target="_blank" rel="noopener noreferrer">
              Official Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {park.images && park.images.length > 0 && (
        <div className="relative mb-8 h-[300px] overflow-hidden rounded-lg md:h-[500px]">
          <Image
            src={park.images[0].url}
            alt={park.images[0].altText || park.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="hours">Hours & Seasons</TabsTrigger>
          <TabsTrigger value="fees">Fees & Passes</TabsTrigger>
          <TabsTrigger value="directions">Directions</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="mb-4 text-2xl font-semibold">About {park.name}</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p>{park.description}</p>
              </div>
            </div>
            
            <div>
              <ParkMap park={park} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <ParkActivities park={park} />
        </TabsContent>
        
        <TabsContent value="hours">
          <ParkHours park={park} />
        </TabsContent>
        
        <TabsContent value="fees">
          <ParkFees park={park} />
        </TabsContent>
        
        <TabsContent value="directions">
          <div className="prose max-w-none dark:prose-invert">
            <h2>Directions</h2>
            <p>{park.directionsInfo}</p>
            {park.directionsUrl && (
              <Button asChild variant="outline">
                <Link href={park.directionsUrl} target="_blank" rel="noopener noreferrer">
                  Get Detailed Directions
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="weather">
          <ParkWeather park={park} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 