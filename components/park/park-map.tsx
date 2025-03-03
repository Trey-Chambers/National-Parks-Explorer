'use client'

import { useState } from 'react'
import { Park } from '@/types/nps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, MapPin } from 'lucide-react'

interface ParkMapProps {
  park: Park
}

export function ParkMap({ park }: ParkMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  
  // Extract latitude and longitude from latLong string
  let lat = 0
  let lng = 0
  
  if (park.latLong) {
    const latMatch = park.latLong.match(/lat:([-\d.]+)/)
    const lngMatch = park.latLong.match(/lng:([-\d.]+)/)
    
    if (latMatch && lngMatch) {
      lat = parseFloat(latMatch[1])
      lng = parseFloat(lngMatch[1])
    }
  }
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.name)}&query_place_id=${park.id}`
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Location</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="mr-1 h-3 w-3" />
          {park.latLong ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'Location data not available'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {park.latLong ? (
          <div className="relative h-[200px] w-full overflow-hidden rounded-md bg-muted">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=10`}
              onLoad={() => setMapLoaded(true)}
            ></iframe>
            
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">Map not available</p>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            View on Google Maps
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
} 