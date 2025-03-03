import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Park } from '@/lib/api'

interface ParkDetailsProps {
  park: Park
}

export function ParkDetails({ park }: ParkDetailsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About {park.name}</CardTitle>
        <CardDescription>
          Learn more about this national park
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-muted-foreground">{park.description}</p>
        </div>
        
        {park.weatherInfo && (
          <div>
            <h3 className="font-medium mb-2">Weather Information</h3>
            <p className="text-muted-foreground">{park.weatherInfo}</p>
          </div>
        )}
        
        {park.directionsInfo && (
          <div>
            <h3 className="font-medium mb-2">Directions</h3>
            <p className="text-muted-foreground">{park.directionsInfo}</p>
            {park.directionsUrl && (
              <a 
                href={park.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-2 inline-block"
              >
                Get Detailed Directions
              </a>
            )}
          </div>
        )}
        
        {park.operatingHours && park.operatingHours.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Operating Hours</h3>
            {park.operatingHours.map((hours, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="text-sm font-medium">{hours.name}</h4>
                {hours.description && (
                  <p className="text-sm text-muted-foreground mb-2">{hours.description}</p>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Monday: {hours.standardHours.monday}</div>
                  <div>Tuesday: {hours.standardHours.tuesday}</div>
                  <div>Wednesday: {hours.standardHours.wednesday}</div>
                  <div>Thursday: {hours.standardHours.thursday}</div>
                  <div>Friday: {hours.standardHours.friday}</div>
                  <div>Saturday: {hours.standardHours.saturday}</div>
                  <div>Sunday: {hours.standardHours.sunday}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {park.entranceFees && park.entranceFees.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Entrance Fees</h3>
            <div className="space-y-3">
              {park.entranceFees.map((fee, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <h4 className="text-sm font-medium">{fee.title}</h4>
                  <p className="text-sm font-medium text-primary">${fee.cost}</p>
                  <p className="text-sm text-muted-foreground">{fee.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {park.contacts && (
          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            {park.contacts.phoneNumbers && park.contacts.phoneNumbers.length > 0 && (
              <div className="mb-2">
                <h4 className="text-sm font-medium">Phone Numbers</h4>
                <ul className="text-sm text-muted-foreground">
                  {park.contacts.phoneNumbers.map((phone, index) => (
                    <li key={index}>
                      {phone.type}: {phone.phoneNumber}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {park.contacts.emailAddresses && park.contacts.emailAddresses.length > 0 && (
              <div>
                <h4 className="text-sm font-medium">Email Addresses</h4>
                <ul className="text-sm text-muted-foreground">
                  {park.contacts.emailAddresses.map((email, index) => (
                    <li key={index}>
                      <a href={`mailto:${email.emailAddress}`} className="hover:underline">
                        {email.emailAddress}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 