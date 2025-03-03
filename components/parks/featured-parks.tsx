import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedParks } from '@/lib/api'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { truncateText, parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'

export async function FeaturedParks() {
  // Add error handling and default empty array
  let featuredParks = []
  
  try {
    featuredParks = await getFeaturedParks()
  } catch (error) {
    console.error('Error fetching featured parks:', error)
    // Continue with empty array
  }
  
  // If no parks are found, show a message
  if (!featuredParks || featuredParks.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Featured Parks</h2>
        <p className="text-muted-foreground">
          No featured parks available at the moment. Please check back later.
        </p>
      </div>
    )
  }

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Featured National Parks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredParks.map((park) => {
            // Get the first image or use a placeholder
            const imageUrl = park.images && park.images.length > 0
              ? park.images[0].url
              : '/images/park-placeholder.jpg'
            
            // Get state names from state codes
            const stateNames = parseStatesList(park.states)
              .map(code => US_STATES[code as keyof typeof US_STATES] || code)
              .join(', ')
            
            return (
              <Link 
                href={`/parks/${park.parkCode}`} 
                key={park.id}
                className="block h-full transition-transform hover:scale-[1.02]"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={park.images && park.images.length > 0 ? park.images[0].altText : park.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="line-clamp-1">{park.fullName}</CardTitle>
                    <CardDescription className="line-clamp-1">{stateNames}</CardDescription>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {truncateText(park.description, 150)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
} 