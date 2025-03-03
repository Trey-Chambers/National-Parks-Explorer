import Image from 'next/image'
import Link from 'next/link'
import { getParks } from '@/lib/api'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ParksPagination } from '@/components/parks/parks-pagination'
import { truncateText, parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'
import { ParkCard } from './park-card'
import { Pagination } from '@/components/ui/pagination'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface ParksListProps {
  query: string
  stateCode: string
  page: number
  limit: number
}

export async function ParksList({ query, stateCode, page, limit }: ParksListProps) {
  try {
    // Calculate the start index for pagination
    const start = (page - 1) * limit
    
    // Fetch parks data
    const { parks, total } = await getParks(query, stateCode, limit, start)
    
    // If no parks found, show a message
    if (parks.length === 0) {
      return (
        <div className="mt-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No parks found</AlertTitle>
            <AlertDescription>
              Try adjusting your search criteria or explore all parks.
            </AlertDescription>
          </Alert>
        </div>
      )
    }
    
    // Calculate total pages
    const totalPages = Math.ceil(total / limit)
    
    return (
      <div className="mt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error in ParksList:', error)
    return (
      <div className="mt-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load parks. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
} 