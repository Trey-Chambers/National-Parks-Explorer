import Link from 'next/link'
import { getActivities } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getActivityIcon } from '@/lib/activity-icons'

export async function ActivitiesList() {
  const response = await getActivities()
  const activities = response.data
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {activities.map((activity) => (
        <Link 
          key={activity.id} 
          href={`/parks?activity=${encodeURIComponent(activity.id)}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {getActivityIcon(activity.name)}
              </div>
              <CardTitle className="text-xl">{activity.name}</CardTitle>
              <CardDescription>
                Explore parks offering this activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {activity.name} in national parks offers unique experiences in stunning natural settings.
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 