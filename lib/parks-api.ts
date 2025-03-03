import { apiRequest, APIError } from './api-client'
import { Park, ParksResponse } from './api'

/**
 * Fetches parks with optional filtering
 * @param query - Search query
 * @param stateCode - Filter by state code
 * @param limit - Number of results to return
 * @param start - Starting index for pagination
 * @returns Promise with parks data
 */
export async function getFilteredParks(
  query: string = '',
  stateCode: string = '',
  limit: number = 12,
  start: number = 0
): Promise<{ parks: Park[]; total: number }> {
  try {
    const response = await apiRequest<ParksResponse>('/parks', {
      q: query,
      stateCode,
      limit,
      start,
    })
    
    return {
      parks: response.data,
      total: parseInt(response.total),
    }
  } catch (error) {
    console.error('Error fetching parks:', error)
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Failed to fetch parks', 0)
  }
} 