import { API_ENDPOINT } from '@/lib/config'

// Get API key from environment variable
const API_KEY = process.env.NPS_API_KEY || process.env.NEXT_PUBLIC_NPS_API_KEY || '';

if (!API_KEY) {
  console.warn('No NPS API key found in environment variables. API requests will likely fail.');
}

interface RequestOptions {
  endpoint: string
  params?: Record<string, string>
  cache?: RequestCache
  tags?: string[]
}

export class APIError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

export async function apiRequest<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<T> {
  // Prepare URL and parameters
  const url = new URL(`${API_ENDPOINT}${endpoint}`);
  
  // Add API key to all requests
  url.searchParams.append('api_key', API_KEY);
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
  
  const maskedUrl = url.toString().replace(API_KEY, 'API_KEY_HIDDEN');
  console.log(`API Request: ${maskedUrl}`);
  
  try {
    // Make the request with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    clearTimeout(timeoutId);
    
    // Handle HTTP errors
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      
      // Special handling for 403 errors to provide more helpful information
      if (response.status === 403) {
        console.error('API key may be invalid or missing. Check your .env.local file.');
        
        // Try to get more information from the response
        try {
          const errorData = await response.json();
          console.error('API error details:', errorData);
        } catch (e) {
          // Ignore if we can't parse the error response
        }
      }
      
      throw new APIError(`HTTP error ${response.status}: ${response.statusText}`, response.status);
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Add additional logging for debugging
    if (!data) {
      console.error('API returned null or undefined data');
    } else {
      console.log(`API Response: ${endpoint} returned ${data.data?.length || 0} items`);
    }
    
    return data as T;
  } catch (error) {
    // Handle network errors or other issues
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('API request timed out');
      throw new APIError('Request timed out', 408);
    }
    
    console.error('API request failed:', error);
    
    // Return empty data instead of throwing to prevent page crashes
    if (endpoint === '/parks') {
      return { data: [], total: '0', limit: '0', start: '0' } as unknown as T;
    }
    
    throw new APIError(
      `Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`,
      0
    );
  }
} 