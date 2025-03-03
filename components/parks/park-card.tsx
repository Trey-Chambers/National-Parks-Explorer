import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { truncateText, parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { Park } from '@/lib/api'

interface ParkCardProps {
  park: Park
}

export function ParkCard({ park }: ParkCardProps) {
  // Get the first image or use a placeholder
  const imageUrl = park.images && park.images.length > 0
    ? park.images[0].url
    : '/images/park-placeholder.jpg'
  
  // Get state names from state codes
  const stateNames = parseStatesList(park.states)
    .map(code => US_STATES[code as keyof typeof US_STATES] || code)
    .join(', ')
  
  return (
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
        <CardTitle className="line-clamp-1 text-xl">{park.fullName}</CardTitle>
        <CardDescription className="line-clamp-1">{stateNames}</CardDescription>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {truncateText(park.description, 150)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/parks/${park.parkCode}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 