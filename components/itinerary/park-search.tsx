'use client'

import { useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { searchParks } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Park } from '@/types/nps'
import { Loader2, Search, Plus } from 'lucide-react'
import { parseStatesList } from '@/lib/utils'
import { US_STATES } from '@/lib/config'

interface ParkSearchProps {
  onSelectPark: (park: Park) => void
}

export function ParkSearch({ onSelectPark }: ParkSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Park[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  
  // Search for parks when the debounced query changes
  useState(() => {
    const fetchParks = async () => {
      if (!debouncedQuery.trim()) {
        setResults([])
        return
      }
      
      setIsLoading(true)
      try {
        const response = await searchParks(debouncedQuery)
        setResults(response.data)
      } catch (error) {
        console.error('Error searching parks:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchParks()
  }, [debouncedQuery])
  
  return (
    <div>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search for parks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : results.length > 0 ? (
          results.map((park) => {
            // Get state names from state codes
            const stateNames = parseStatesList(park.states)
              .map(code => US_STATES[code as keyof typeof US_STATES] || code)
              .join(', ')
            
            return (
              <div 
                key={park.id} 
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <h3 className="font-medium">{park.name}</h3>
                  <p className="text-sm text-muted-foreground">{stateNames}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onSelectPark(park)}
                  aria-label={`Add ${park.name} to itinerary`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )
          })
        ) : query.trim() ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No parks found matching "{query}"
          </p>
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Search for parks to add to your itinerary
          </p>
        )}
      </div>
    </div>
  )
} 