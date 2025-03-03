import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { Park } from '@/lib/api'

interface ParkHeaderProps {
  park: Park
}

export function ParkHeader({ park }: ParkHeaderProps) {
  // Get state names from state codes
  const stateNames = parseStatesList(park.states)
    .map(code => US_STATES[code as keyof typeof US_STATES] || code)
    .join(', ')
  
  return (
    <div>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/parks" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Parks
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold">{park.fullName}</h1>
      <p className="text-muted-foreground mt-1">{stateNames}</p>
    </div>
  )
} 