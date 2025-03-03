import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPark } from '@/lib/api'
import { ParkHeader } from '@/components/parks/park-header'
import { ParkDetails } from '@/components/parks/park-details'
import { ParkImages } from '@/components/parks/park-images'
import { ParkActivities } from '@/components/parks/park-activities'
import { ParkLocation } from '@/components/parks/park-location'

interface ParkPageProps {
  params: {
    parkCode: string
  }
}

export async function generateMetadata({ params }: ParkPageProps): Promise<Metadata> {
  try {
    const park = await getPark(params.parkCode)
    
    return {
      title: park.fullName,
      description: park.description.substring(0, 160),
      openGraph: {
        images: park.images && park.images.length > 0 ? [park.images[0].url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Park Details',
      description: 'View details about this national park',
    }
  }
}

export default async function ParkPage({ params }: ParkPageProps) {
  try {
    const park = await getPark(params.parkCode)
    
    return (
      <div className="container py-8">
        <ParkHeader park={park} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ParkDetails park={park} />
            <ParkImages park={park} />
            <ParkActivities park={park} />
          </div>
          <div>
            <ParkLocation park={park} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error loading park ${params.parkCode}:`, error)
    notFound()
  }
} 