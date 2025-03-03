'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { US_STATES } from '@/lib/config'
import { Search } from 'lucide-react'

interface ParksSearchProps {
  initialQuery?: string
  initialState?: string
}

export function ParksSearch({ initialQuery = '', initialState = '' }: ParksSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [query, setQuery] = useState(initialQuery)
  const [stateCode, setStateCode] = useState(initialState || 'all')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log(`Searching with query: "${query}", state: "${stateCode}"`);
    
    startTransition(() => {
      // Create new search params
      const params = new URLSearchParams()
      
      // Update or remove query parameter
      if (query) {
        params.set('q', query)
      }
      
      // Update or remove state parameter
      if (stateCode && stateCode !== 'all') {
        params.set('state', stateCode)
      }
      
      // Reset to page 1 when search criteria change
      
      // Navigate with the new params
      router.push(`/parks?${params.toString()}`)
    })
  }
  
  return (
    <form onSubmit={handleSearch} className="mb-8 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Search parks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {Object.entries(US_STATES).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button type="submit" className="w-full" disabled={isPending}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </form>
  )
} 