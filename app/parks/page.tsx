import { Suspense } from 'react'
import { Metadata } from 'next'
import { getParks } from '@/lib/api'
import { ParksSearch } from '@/components/parks/parks-search'
import { ParkCard } from '@/components/parks/park-card'
import { Pagination } from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { ApiDebug } from '@/components/debug/api-debug'
import { DirectApiTest } from '@/components/debug/direct-api-test'

export const metadata: Metadata = {
  title: 'Explore National Parks',
  description: 'Discover and explore America\'s national parks',
}

interface ParksPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ParksPage({ searchParams = {} }: ParksPageProps) {
  // Convert searchParams to a regular object to avoid the await issue
  const params = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value
    ])
  );
  
  // Now use the params object instead of searchParams
  const query = params.q || '';
  const stateCode = params.state || '';
  const currentPage = Number(params.page) || 1;
  const limit = 24; // Increase the limit to show more parks
  
  // Calculate start index for pagination
  const start = (currentPage - 1) * limit;
  
  console.log(`Fetching parks page ${currentPage} with query: "${query}", state: "${stateCode}"`);
  
  // Fetch parks with search parameters
  const { parks, total } = await getParks(query, stateCode, limit, start);
  
  console.log(`Received ${parks.length} parks out of ${total} total`);
  
  // Calculate total pages
  const totalPages = Math.ceil(total / limit);
  
  if (total === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Explore National Parks</h1>
        
        <ParksSearch initialQuery={query} initialState={stateCode} />
        
        <div className="text-center py-10">
          <div className="mb-4">
            <p className="text-xl font-semibold">No parks found or API error</p>
            <p className="text-muted-foreground mt-2">
              We couldn't retrieve parks from the National Park Service API.
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-md max-w-md mx-auto text-left">
            <p className="font-medium">Possible reasons:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>The API key may be invalid or missing</li>
              <li>The National Park Service API may be experiencing issues</li>
              <li>Your search criteria may be too restrictive</li>
            </ul>
            <p className="mt-4 text-sm">
              If you're a developer, check the console for more details.
            </p>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <>
              <ApiDebug />
              <DirectApiTest />
            </>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Explore National Parks</h1>
      
      <ParksSearch initialQuery={query} initialState={stateCode} />
      
      {/* Show results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {total === 0 ? (
            'No parks found. Try adjusting your search.'
          ) : (
            `Showing ${start + 1}-${Math.min(start + parks.length, total)} of ${total} parks`
          )}
        </p>
      </div>
      
      {/* Parks grid */}
      {parks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {parks.map(park => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No parks found matching your criteria.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search filters.</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
      
      {process.env.NODE_ENV === 'development' && (
        <>
          <ApiDebug />
          <DirectApiTest />
        </>
      )}
    </div>
  )
}

// Loading state for the parks page
export function ParksPageSkeleton() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Explore National Parks</h1>
      
      {/* Search skeleton */}
      <div className="mb-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      {/* Results count skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-48" />
      </div>
      
      {/* Parks grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
} 