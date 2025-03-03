import { Park } from '@/types/nps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

interface ParkHoursProps {
  park: Park
}

export function ParkHours({ park }: ParkHoursProps) {
  if (!park.operatingHours || park.operatingHours.length === 0) {
    return <p>No operating hours information available for this park.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Hours & Seasons</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {park.operatingHours.map((hours) => (
          <Card key={hours.name}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                {hours.name}
              </CardTitle>
              {hours.description && (
                <CardDescription>{hours.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hours.standardHours && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Monday:</div>
                    <div>{hours.standardHours.monday || 'Closed'}</div>
                    
                    <div className="font-medium">Tuesday:</div>
                    <div>{hours.standardHours.tuesday || 'Closed'}</div>
                    
                    <div className="font-medium">Wednesday:</div>
                    <div>{hours.standardHours.wednesday || 'Closed'}</div>
                    
                    <div className="font-medium">Thursday:</div>
                    <div>{hours.standardHours.thursday || 'Closed'}</div>
                    
                    <div className="font-medium">Friday:</div>
                    <div>{hours.standardHours.friday || 'Closed'}</div>
                    
                    <div className="font-medium">Saturday:</div>
                    <div>{hours.standardHours.saturday || 'Closed'}</div>
                    
                    <div className="font-medium">Sunday:</div>
                    <div>{hours.standardHours.sunday || 'Closed'}</div>
                  </div>
                )}
                
                {hours.exceptions && hours.exceptions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Exceptions:</h4>
                    <ul className="space-y-2 text-sm">
                      {hours.exceptions.map((exception, index) => (
                        <li key={index}>
                          <span className="font-medium">{exception.name}:</span>{' '}
                          {exception.startDate} to {exception.endDate}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 