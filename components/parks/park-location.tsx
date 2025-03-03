import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, MapPin } from 'lucide-react'
import { Park } from '@/lib/api'

interface ParkLocationProps {
  park: Park
}

export function ParkLocation({ park }: ParkLocationProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${park.fullName}&center=${park.latitude},${park.longitude}&zoom=10`}
          ></iframe>
        </div>
        
        <div className="space-y-2">
          <Button asChild variant="outline" className="w-full">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="mr-2 h-4 w-4" />
              View on Google Maps
            </a>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <a href={park.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Official Park Website
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 