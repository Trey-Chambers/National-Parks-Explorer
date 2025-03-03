import { Skeleton } from '@/components/ui/skeleton'

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-full max-w-[250px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-full max-w-[250px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-full max-w-[250px]" />
      </div>
      <Skeleton className="h-10 w-28" />
    </div>
  )
} 