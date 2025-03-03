import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { VideoBackground } from '@/components/ui/video-background'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-black">
      {/* Replace the image with our video background */}
      <VideoBackground videoId="1062132948" className="opacity-60" />
      
      <div className="container relative z-10 mx-auto px-4 py-16 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          Discover America's Natural Wonders
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
          Explore the beauty and majesty of U.S. National Parks. Plan your next adventure with our comprehensive guide.
        </p>
        
        <div className="mx-auto max-w-md">
          <form className="relative">
            <Input
              type="text"
              className="h-12 pl-10 pr-20 text-base"
              placeholder="Search for parks..."
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Button 
              className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2" 
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/parks">Explore All Parks</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="bg-white/10 text-white hover:bg-white/20"
          >
            <Link href="/activities">Browse by Activity</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 