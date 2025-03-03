import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Park } from '@/lib/api'

interface ParkImagesProps {
  park: Park
}

export function ParkImages({ park }: ParkImagesProps) {
  // Skip if no images
  if (!park.images || park.images.length === 0) {
    return null
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Park Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {park.images.map((image, index) => (
            <div key={index} className="space-y-2">
              <div className="relative h-48 w-full overflow-hidden rounded-md">
                <Image
                  src={image.url}
                  alt={image.altText || park.fullName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {image.caption && (
                <p className="text-sm text-muted-foreground">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 