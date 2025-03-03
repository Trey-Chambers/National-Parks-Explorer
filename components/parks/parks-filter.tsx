'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, MapPin, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { US_STATES } from '@/lib/config'

interface ParksFilterProps {
  initialQuery?: string
  initialState?: string
}

export function ParksFilter({ initialQuery = '', initialState = '' }: ParksFilterProps) {
  const [query, setQuery] = useState(initialQuery)
  const [stateCode, setStateCode] = useState(initialState)
  const router = useRouter()
  const pathname = usePathname()

  // Update state when props change (e.g., when user navigates back)
  useEffect(() => {
    setQuery(initialQuery)
    setStateCode(initialState)
  }, [initialQuery, initialState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build query parameters
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (stateCode) params.set('state', stateCode)
    
    // Navigate to the filtered results
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    setQuery('')
    setStateCode('')
    router.push(pathname)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search parks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <div className="relative">
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger className="pl-9">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {Object.entries(US_STATES).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Apply Filters
          </Button>
          {(query || stateCode) && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              aria-label="Reset filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  )
} 