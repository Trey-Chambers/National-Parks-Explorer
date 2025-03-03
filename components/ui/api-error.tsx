import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ApiErrorProps {
  title?: string
  message: string
  statusCode?: number
  onRetry?: () => void
}

export function ApiError({ 
  title = 'Error loading data', 
  message, 
  statusCode,
  onRetry 
}: ApiErrorProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title} {statusCode && `(${statusCode})`}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={onRetry}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
} 