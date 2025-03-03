import { apiRequest } from './api-client'
import { ParkResponse } from '@/types/nps'

/**
 * Legacy compatibility function for the old getParks API
 * @param params - Parameters for the API request
 * @returns Promise with park response
 */
export async function getParksLegacy(params: Record<string, string> = {}): Promise<ParkResponse> {
  return apiRequest<ParkResponse>({
    endpoint: '/parks',
    params,
    tags: ['parks']
  })
} 