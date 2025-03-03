import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">National Parks Explorer</h3>
            <p className="text-sm text-muted-foreground">
              Discover America's natural wonders and plan your next adventure.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/parks" className="text-muted-foreground hover:text-primary">
                  All Parks
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-primary">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary">
                  Park Map
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Plan Your Trip</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/itinerary" className="text-muted-foreground hover:text-primary">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/lodging" className="text-muted-foreground hover:text-primary">
                  Lodging
                </Link>
              </li>
              <li>
                <Link href="/camping" className="text-muted-foreground hover:text-primary">
                  Camping
                </Link>
              </li>
              <li>
                <Link href="/permits" className="text-muted-foreground hover:text-primary">
                  Permits & Passes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} National Parks Explorer. All rights reserved.
          </p>
          <p className="mt-2">
            This site is not affiliated with the National Park Service. Data provided by the{' '}
            <a 
              href="https://www.nps.gov/subjects/developer/api-documentation.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              NPS API
            </a>.
          </p>
        </div>
      </div>
    </footer>
  )
} 