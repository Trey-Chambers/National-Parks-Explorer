import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Clock, Info, DollarSign, Compass, Phone, Mail, ExternalLink } from 'lucide-react'
import { getParkByCode } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { ParkActivities } from '@/components/parks/park-activities'
import { ParkAlerts } from '@/components/parks/park-alerts'
import { ParkGallery } from '@/components/parks/park-gallery'

interface ParkDetailProps {
  parkCode: string
}

export async function ParkDetail({ parkCode }: ParkDetailProps) {
  const park = await getParkByCode(parkCode)
  
  // Get state names from state codes
  const stateNames = parseStatesList(park.states)
    .map(code => US_STATES[code as keyof typeof US_STATES] || code)
    .join(', ')
  
  // Get the first image or use a placeholder
  const heroImage = park.images && park.images.length > 0
    ? park.images[0]
    : { url: '/images/park-placeholder.jpg', altText: park.name, caption: '', credit: '' }
  
  // Get entrance fees
  const entranceFees = park.entranceFees || []
  
  // Get operating hours
  const operatingHours = park.operatingHours && park.operatingHours.length > 0
    ? park.operatingHours[0]
    : null
  
  // Get contact info
  const phoneNumber = park.contacts.phoneNumbers && park.contacts.phoneNumbers.length > 0
    ? park.contacts.phoneNumbers[0].phoneNumber
    : null
  
  const email = park.contacts.emailAddresses && park.contacts.emailAddresses.length > 0
    ? park.contacts.emailAddresses[0].emailAddress
    : null
  
  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{park.name}</h1>
          <div className="mt-2 flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{stateNames}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={park.directionsUrl} target="_blank" rel="noopener noreferrer">
              <Compass className="mr-2 h-4 w-4" />
              Directions
            </Link>
          </Button>
          <Button asChild>
            <Link href="/itinerary/add" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Add to Itinerary
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
        <Image
          src={heroImage.url}
          alt={heroImage.altText}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {heroImage.caption && (
          <div className="absolute bottom-0 w-full bg-black/60 p-2 text-center text-sm text-white">
            {heroImage.caption} {heroImage.credit && <span>Photo: {heroImage.credit}</span>}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">About {park.name}</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <p>{park.description}</p>
                </div>
              </div>
              
              {park.weatherInfo && (
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Weather</h3>
                  <p>{park.weatherInfo}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activities">
              <ParkActivities parkCode={parkCode} activities={park.activities} />
            </TabsContent>
            
            <TabsContent value="alerts">
              <ParkAlerts parkCode={parkCode} />
            </TabsContent>
            
            <TabsContent value="gallery">
              <ParkGallery images={park.images} parkName={park.name} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Park Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {operatingHours && (
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <div className="text-sm">
                      {operatingHours.description && (
                        <p className="mb-2">{operatingHours.description}</p>
                      )}
                      {operatingHours.standardHours && (
                        <ul className="space-y-1">
                          <li><span className="font-medium">Monday:</span> {operatingHours.standardHours.monday}</li>
                          <li><span className="font-medium">Tuesday:</span> {operatingHours.standardHours.tuesday}</li>
                          <li><span className="font-medium">Wednesday:</span> {operatingHours.standardHours.wednesday}</li>
                          <li><span className="font-medium">Thursday:</span> {operatingHours.standardHours.thursday}</li>
                          <li><span className="font-medium">Friday:</span> {operatingHours.standardHours.friday}</li>
                          <li><span className="font-medium">Saturday:</span> {operatingHours.standardHours.saturday}</li>
                          <li><span className="font-medium">Sunday:</span> {operatingHours.standardHours.sunday}</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {entranceFees.length > 0 && (
                <div className="flex items-start gap-2">
                  <DollarSign className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Entrance Fees</h3>
                    <ul className="space-y-2 text-sm">
                      {entranceFees.map((fee, index) => (
                        <li key={index}>
                          <div className="font-medium">{fee.title} - {formatPrice(fee.cost)}</div>
                          <p>{fee.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    {phoneNumber && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="hover:underline">
                          {phoneNumber}
                        </a>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${email}`} className="hover:underline">
                          {email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <a 
                        href={park.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Official Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nearby Parks</CardTitle>
              <CardDescription>Explore other parks in {stateNames}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/parks?state=${parseStatesList(park.states)[0]}`}>
                    View All Parks in {stateNames}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 