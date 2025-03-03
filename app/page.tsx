import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { FeaturedParks } from '@/components/parks/featured-parks'
import { SearchParks } from '@/components/parks/search-parks'
import { Button } from '@/components/ui/button'
import { FeaturedParksSkeleton } from '@/components/parks/featured-parks-skeleton'
import { ArrowRight } from 'lucide-react'
import { HeroVideoBackground } from '@/components/home/hero-video-background'

export const metadata: Metadata = {
  title: 'Explore National Parks | National Parks Explorer',
  description: 'Discover the beauty of US National Parks and plan your next adventure',
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-black">
        <HeroVideoBackground />
        <div className="container relative z-10 mx-auto px-4 py-16 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Discover America's Natural Wonders
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Explore the beauty and majesty of U.S. National Parks. Plan your next adventure with our comprehensive guide.
          </p>
          <div className="mx-auto max-w-md">
            <SearchParks />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/parks">
                Explore All Parks
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
              <Link href="/activities">
                Browse by Activity
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Parks Section */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Parks</h2>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/parks">
                View all parks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <Suspense fallback={<FeaturedParksSkeleton />}>
            <FeaturedParks />
          </Suspense>
        </div>
      </section>

      {/* Plan Your Trip Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Plan Your Route</h3>
              <p className="text-muted-foreground">
                Map out your journey to visit multiple parks and attractions along the way.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Create an Itinerary</h3>
              <p className="text-muted-foreground">
                Build a custom itinerary with activities, lodging, and points of interest.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                  <path d="M8.5 8.5v.01"/>
                  <path d="M16 15.5v.01"/>
                  <path d="M12 12v.01"/>
                  <path d="M11 17v.01"/>
                  <path d="M7 14v.01"/>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Discover Activities</h3>
              <p className="text-muted-foreground">
                Find the perfect activities for your interests, from hiking to wildlife viewing.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/itinerary">
                Start Planning Your Trip
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter for the latest park news, travel tips, and seasonal highlights.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                required
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

// Mock data for activities
const activities = [
  { id: 'hiking', name: 'Hiking', icon: () => <HikingIcon /> },
  { id: 'camping', name: 'Camping', icon: () => <CampingIcon /> },
  { id: 'wildlife', name: 'Wildlife', icon: () => <WildlifeIcon /> },
  { id: 'water', name: 'Water Activities', icon: () => <WaterIcon /> },
  { id: 'winter', name: 'Winter Sports', icon: () => <WinterIcon /> },
  { id: 'history', name: 'Historical Sites', icon: () => <HistoryIcon /> },
]

// Placeholder icons (replace with actual icons from lucide-react)
function HikingIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m13 4 3.5 9h-7l-3.5 9"></path><path d="M7 4v9h7"></path></svg>
}

function CampingIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2 2 12h3v9h14v-9h3L12 2z"></path></svg>
}

function WildlifeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M8 3h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1l-2 3v-3H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M10 18v3"></path><path d="M14 18v3"></path><path d="M12 18v3"></path></svg>
}

function WaterIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M2 12h20"></path><path d="M5 12v4"></path><path d="M19 12v4"></path><path d="M5 16h14"></path></svg>
}

function WinterIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2v20"></path><path d="m4.93 10 14.14 4"></path><path d="m14.93 6-10 12"></path><path d="m9.07 6 10 12"></path><path d="m4.93 14 14.14-4"></path></svg>
}

function HistoryIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M3 5v14"></path><path d="M8 5v14"></path><path d="M12 5v14"></path><path d="M17 5v14"></path><path d="M21 5v14"></path></svg>
} 