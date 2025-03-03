import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Park } from '@/lib/api'

interface ParkActivitiesProps {
  park: Park
}

export function ParkActivities({ park }: ParkActivitiesProps) {
  // Skip if no activities
  if (!park.activities || park.activities.length === 0) {
    return null
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {park.activities.map((activity) => (
            <Badge key={activity.id} variant="secondary">
              {activity.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 