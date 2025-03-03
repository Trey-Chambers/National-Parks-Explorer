import { Park } from '@/types/nps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, CreditCard } from 'lucide-react'

interface ParkFeesProps {
  park: Park
}

export function ParkFees({ park }: ParkFeesProps) {
  if ((!park.entranceFees || park.entranceFees.length === 0) && 
      (!park.entrancePasses || park.entrancePasses.length === 0)) {
    return <p>No fee information available for this park.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Fees & Passes</h2>
      
      {park.entranceFees && park.entranceFees.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-medium">Entrance Fees</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {park.entranceFees.map((fee) => (
              <Card key={fee.title}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <DollarSign className="mr-2 h-5 w-5" />
                    {fee.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">
                    ${parseFloat(fee.cost).toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{fee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {park.entrancePasses && park.entrancePasses.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-medium">Passes</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {park.entrancePasses.map((pass) => (
              <Card key={pass.title}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    {pass.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">
                    ${parseFloat(pass.cost).toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{pass.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 