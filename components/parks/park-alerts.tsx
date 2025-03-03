import { getAlerts } from '@/lib/api'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface ParkAlertsProps {
  parkCode: string
}

export async function ParkAlerts({ parkCode }: ParkAlertsProps) {
  const response = await getAlerts(parkCode)
  const alerts = response.data
  
  // Helper function to get icon based on alert category
  const getAlertIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'danger':
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case 'caution':
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  // Helper function to get alert variant based on category
  const getAlertVariant = (category: string): 'default' | 'destructive' => {
    return category.toLowerCase() === 'danger' ? 'destructive' : 'default'
  }
  
  if (alerts.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Alerts</h2>
        <p>No current alerts for this park.</p>
      </div>
    )
  }
  
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Alerts</h2>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.category)}>
            <div className="flex items-start gap-2">
              {getAlertIcon(alert.category)}
              <div>
                <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
                <AlertDescription>
                  <p className="mt-1">{alert.description}</p>
                  {alert.url && (
                    <a 
                      href={alert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm underline"
                    >
                      More information
                    </a>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  )
} 