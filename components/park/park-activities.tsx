import { Park } from '@/types/nps'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface ParkActivitiesProps {
  park: Park
}

export function ParkActivities({ park }: ParkActivitiesProps) {
  if (!park.activities || park.activities.length === 0) {
    return <p>No activities information available for this park.</p>
  }

  // Group activities by category
  const categories = {
    'Water Activities': ['Boating', 'Canoeing', 'Fishing', 'Kayaking', 'Paddling', 'Sailing', 'Swimming'],
    'Winter Activities': ['Cross-Country Skiing', 'Skiing', 'Snowshoeing', 'Snow Play'],
    'Hiking & Climbing': ['Hiking', 'Backpacking', 'Climbing', 'Mountaineering', 'Walking'],
    'Wildlife Viewing': ['Birdwatching', 'Wildlife Watching'],
    'Educational': ['Astronomy', 'Stargazing', 'Guided Tours', 'Museum Exhibits', 'Junior Ranger Program'],
    'Other Activities': []
  }

  const categorizedActivities: Record<string, typeof park.activities> = {}
  
  // Initialize categories
  Object.keys(categories).forEach(category => {
    categorizedActivities[category] = []
  })
  
  // Categorize activities
  park.activities.forEach(activity => {
    let assigned = false
    
    // Check if activity belongs to a specific category
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => activity.name.includes(keyword))) {
        categorizedActivities[category].push(activity)
        assigned = true
        break
      }
    }
    
    // If not assigned to any category, put in "Other Activities"
    if (!assigned) {
      categorizedActivities['Other Activities'].push(activity)
    }
  })

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Activities at {park.name}</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categorizedActivities).map(([category, activities]) => {
          if (activities.length === 0) return null
          
          return (
            <div key={category} className="rounded-lg border p-4">
              <h3 className="mb-3 text-lg font-medium">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {activities.map(activity => (
                  <Badge key={activity.id} variant="secondary">
                    {activity.name}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 