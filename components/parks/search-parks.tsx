'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchParks() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/parks?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="text"
        placeholder="Search for parks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 pl-10 pr-20 text-base"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Button 
        type="submit" 
        className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2"
        disabled={!query.trim()}
      >
        Search
      </Button>
    </form>
  )
} 