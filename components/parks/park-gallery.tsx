'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Image as ParkImage } from '@/types/nps'

interface ParkGalleryProps {
  images: ParkImage[]
  parkName: string
}

export function ParkGallery({ images, parkName }: ParkGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">No images available for {parkName}</p>
      </div>
    )
  }
  
  const currentImage = images[currentIndex]
  
  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }
  
  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Gallery</h2>
      
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full">
          <Image
            src={currentImage.url}
            alt={currentImage.altText || parkName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-black/30 text-white hover:bg-black/50"
            onClick={() => setIsDialogOpen(true)}
            aria-label="View full size"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      
      {currentImage.caption && (
        <div className="text-sm text-muted-foreground">
          <p>{currentImage.caption}</p>
          {currentImage.credit && <p className="mt-1 text-xs">Photo: {currentImage.credit}</p>}
        </div>
      )}
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                index === currentIndex ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${parkName} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={currentImage.url}
              alt={currentImage.altText || parkName}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          
          <div className="text-sm">
            <p className="font-medium">{currentImage.title || parkName}</p>
            {currentImage.caption && <p className="mt-1">{currentImage.caption}</p>}
            {currentImage.credit && <p className="mt-1 text-xs text-muted-foreground">Photo: {currentImage.credit}</p>}
          </div>
          
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
} 