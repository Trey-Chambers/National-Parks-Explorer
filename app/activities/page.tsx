import { Suspense } from 'react'
import { Metadata } from 'next'
import { ActivitiesList } from '@/components/activities/activities-list'
import { ActivitiesListSkeleton } from '@/components/activities/activities-list-skeleton'

export const metadata: Metadata = {
  title: 'Browse Activities | National Parks Explorer',
  description: 'Discover national parks by activities like hiking, camping, wildlife viewing, and more',
}

export default function ActivitiesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Browse by Activity</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Discover national parks based on your favorite outdoor activities and interests.
      </p>
      
      <Suspense fallback={<ActivitiesListSkeleton />}>
        <ActivitiesList />
      </Suspense>
    </div>
  )
} 