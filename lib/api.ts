import { apiRequest, APIError } from './api-client'
import { 
  ParkResponse, 
  AlertResponse, 
  ActivityResponse,
  EventResponse,
  NewsResponse,
  CampgroundResponse
} from '@/types/nps'

// Types for the National Park Service API responses
export interface Park {
  id: string
  parkCode: string
  fullName: string
  name: string
  description: string
  latitude: string
  longitude: string
  states: string
  directionsInfo: string
  directionsUrl: string
  url: string
  weatherInfo: string
  images: {
    url: string
    altText: string
    title: string
    caption: string
    credit: string
  }[]
  activities: {
    id: string
    name: string
  }[]
  topics: {
    id: string
    name: string
  }[]
  operatingHours: {
    name: string
    description: string
    standardHours: {
      sunday: string
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
    }
    exceptions: any[]
  }[]
  entranceFees: {
    cost: string
    description: string
    title: string
  }[]
  contacts: {
    phoneNumbers: {
      phoneNumber: string
      description: string
      extension: string
      type: string
    }[]
    emailAddresses: {
      emailAddress: string
      description: string
    }[]
  }
}

export interface ParksResponse {
  total: string
  limit: string
  start: string
  data: Park[]
}

/**
 * Fetches parks with optional filtering
 * @param query - Search query
 * @param stateCode - Filter by state code
 * @param limit - Number of results to return
 * @param start - Starting index for pagination
 * @returns Promise with parks data
 */
export async function getParks(
  query: string = '',
  stateCode: string = '',
  limit: number = 24,
  start: number = 0
): Promise<{ parks: Park[]; total: number }> {
  try {
    console.log(`Fetching parks with query: "${query}", stateCode: "${stateCode}", limit: ${limit}, start: ${start}`);
    
    const params: Record<string, string | number> = {
      limit,
      start,
    };
    
    if (query) {
      params.q = query;
    }
    
    if (stateCode && stateCode !== 'all') {
      params.stateCode = stateCode;
    }
    
    const response = await apiRequest<ParksResponse>('/parks', params);
    
    if (!response || !response.data) {
      console.error('Invalid response format from API:', response);
      return { parks: [], total: 0 };
    }
    
    console.log(`Received ${response.data.length} parks out of ${response.total}`);
    
    return {
      parks: response.data,
      total: parseInt(response.total || '0'),
    };
  } catch (error) {
    console.error('Error fetching parks:', error);
    // Return empty data instead of throwing to prevent page crashes
    return { parks: [], total: 0 };
  }
}

/**
 * Fetches a specific park by its park code
 * @param parkCode - The park code
 * @returns Promise with park data
 */
export async function getPark(parkCode: string): Promise<Park> {
  try {
    console.log(`Fetching park with code: ${parkCode}`);
    
    const response = await apiRequest<ParksResponse>('/parks', {
      parkCode,
    });
    
    if (!response || !response.data || response.data.length === 0) {
      console.error(`Park with code ${parkCode} not found`);
      throw new APIError(`Park with code ${parkCode} not found`, 404);
    }
    
    console.log(`Successfully fetched park: ${response.data[0].fullName}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching park ${parkCode}:`, error);
    throw error; // Let the calling function handle the error
  }
}

/**
 * Fetches featured parks (currently just returns a few popular parks)
 * @returns Promise with featured parks data
 */
export async function getFeaturedParks(): Promise<Park[]> {
  // Featured park codes (hardcoded for now)
  const featuredParkCodes = ['yose', 'grca', 'zion', 'yell', 'acad', 'olym'];
  
  try {
    // Use apiRequest directly instead of getParks
    const response = await apiRequest<ParksResponse>('/parks', {
      parkCode: featuredParkCodes.join(','),
      limit: 6,
    });
    
    if (!response || !response.data) {
      console.error('Invalid response format from API:', response);
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching featured parks:', error);
    throw new APIError('Failed to fetch featured parks', 0);
  }
}

/**
 * Fetches activities data
 * @returns Promise with activities data
 */
export async function getActivities(): Promise<ActivityResponse> {
  return apiRequest<ActivityResponse>({
    endpoint: '/activities',
    tags: ['activities']
  })
}

/**
 * Fetches alerts for a specific park
 * @param parkCode - The park code
 * @returns Promise with alerts data
 */
export async function getParkAlerts(parkCode: string): Promise<AlertResponse> {
  return apiRequest<AlertResponse>({
    endpoint: '/alerts',
    params: { parkCode },
    cache: 'no-store', // Always get fresh alerts
    tags: [`alerts-${parkCode}`]
  })
}

/**
 * Fetches events for a specific park
 * @param parkCode - The park code
 * @returns Promise with events data
 */
export async function getParkEvents(parkCode: string): Promise<EventResponse> {
  return apiRequest<EventResponse>({
    endpoint: '/events',
    params: { parkCode },
    cache: 'no-store', // Events change frequently
    tags: [`events-${parkCode}`]
  })
}

/**
 * Fetches news releases for a specific park
 * @param parkCode - The park code
 * @returns Promise with news releases data
 */
export async function getParkNews(parkCode: string): Promise<NewsResponse> {
  return apiRequest<NewsResponse>({
    endpoint: '/newsreleases',
    params: { parkCode },
    tags: [`news-${parkCode}`]
  })
}

/**
 * Fetches campgrounds for a specific park
 * @param parkCode - The park code
 * @returns Promise with campgrounds data
 */
export async function getParkCampgrounds(parkCode: string): Promise<CampgroundResponse> {
  return apiRequest<CampgroundResponse>({
    endpoint: '/campgrounds',
    params: { parkCode },
    tags: [`campgrounds-${parkCode}`]
  })
}

/**
 * Fetches parks by their IDs (for saved parks)
 */
export async function getParksByIds(parkCodes: string[]): Promise<Park[]> {
  if (parkCodes.length === 0) {
    return []
  }
  
  try {
    const response = await apiRequest<ParksResponse>('/parks', {
      parkCode: parkCodes.join(','),
      limit: 50,
    })
    
    return response.data
  } catch (error) {
    console.error('Error fetching parks by IDs:', error)
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Failed to fetch parks by IDs', 0)
  }
}

// Additional API functions can be added here 