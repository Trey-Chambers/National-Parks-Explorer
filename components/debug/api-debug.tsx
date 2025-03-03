'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { US_STATES } from '@/lib/config'

export function ApiDebug() {
  const [apiUrl, setApiUrl] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stateCode, setStateCode] = useState('all')
  
  const fetchParks = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Construct the API URL
      const url = new URL('https://developer.nps.gov/api/v1/parks')
      
      // Add API key
      url.searchParams.append('api_key', process.env.NEXT_PUBLIC_NPS_API_KEY || '')
      
      // Add limit
      url.searchParams.append('limit', '10')
      
      // Add state filter if not "all"
      if (stateCode !== 'all') {
        url.searchParams.append('stateCode', stateCode)
      }
      
      setApiUrl(url.toString())
      
      // Fetch data
      const res = await fetch(url.toString())
      
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
      }
      
      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>API Debug Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select value={stateCode} onValueChange={setStateCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
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
            <Button onClick={fetchParks} disabled={loading}>
              {loading ? 'Loading...' : 'Test API'}
            </Button>
          </div>
          
          {apiUrl && (
            <div className="p-2 bg-muted rounded-md overflow-x-auto">
              <code className="text-xs">{apiUrl}</code>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          {response && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response:</h3>
              <div className="p-4 bg-muted rounded-md overflow-x-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(response, null, 2)}</pre>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Found {response.total} parks, showing {response.data?.length || 0}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 