import { Park } from '@/types/nps'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react'

interface ParkWeatherProps {
  park: Park
}

export function ParkWeather({ park }: ParkWeatherProps) {
  if (!park.weatherInfo) {
    return <p>No weather information available for this park.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Weather</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cloud className="mr-2 h-5 w-5" />
            Weather Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p>{park.weatherInfo}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Thermometer className="mr-2 h-5 w-5" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Temperatures can vary widely throughout the year. Check the current forecast before your visit.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Droplets className="mr-2 h-5 w-5" />
              Precipitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Rain and snow can occur unexpectedly. Be prepared with appropriate clothing and gear.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Wind className="mr-2 h-5 w-5" />
              Wind
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Wind conditions can change rapidly. Secure tents and be cautious on exposed trails.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 