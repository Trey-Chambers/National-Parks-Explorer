import Link from 'next/link'
import { Mountain } from 'lucide-react'

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Mountain className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          National Parks Explorer
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/parks"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Parks
        </Link>
        <Link
          href="/activities"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Activities
        </Link>
        <Link
          href="/map"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Map
        </Link>
        <Link
          href="/itinerary"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Plan a Trip
        </Link>
      </nav>
    </div>
  )
} 