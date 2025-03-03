import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ParkNotFound() {
  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Park Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the park you're looking for. It may have been removed or you might have followed an incorrect link.
        </p>
        <Button asChild>
          <Link href="/parks">
            Browse All Parks
          </Link>
        </Button>
      </div>
    </div>
  )
} 