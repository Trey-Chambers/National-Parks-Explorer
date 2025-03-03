'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DirectApiTest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use a direct fetch to the NPS API
      const apiKey = process.env.NEXT_PUBLIC_NPS_API_KEY;
      const url = `https://developer.nps.gov/api/v1/parks?limit=1&api_key=${apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Direct API Test</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={testApi} disabled={loading}>
          {loading ? 'Testing...' : 'Test NPS API Directly'}
        </Button>
        
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-4">
            <p className="font-semibold">Response:</p>
            <pre className="mt-2 p-4 bg-muted rounded-md overflow-x-auto text-xs">
              {result}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 