// National Park Service API configuration
export const API_ENDPOINT = 'https://developer.nps.gov/api/v1'
export const API_KEY = process.env.NPS_API_KEY || 'YOUR_FALLBACK_API_KEY'

// Other configuration constants
export const SITE_NAME = 'National Parks Explorer'
export const SITE_URL = 'https://national-parks-explorer.vercel.app'

export const NPS_API_CONFIG = {
  baseUrl: 'https://developer.nps.gov/api/v1',
  apiKey: process.env.NPS_API_KEY || '',
  endpoints: {
    parks: '/parks',
    activities: '/activities',
    topics: '/topics',
    alerts: '/alerts',
    events: '/events',
    campgrounds: '/campgrounds',
    visitorcenters: '/visitorcenters',
  },
}

export const CACHE_CONFIG = {
  parks: {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
  activities: {
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days (rarely changes)
    cacheTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  alerts: {
    staleTime: 1000 * 60 * 15, // 15 minutes (can change frequently)
    cacheTime: 1000 * 60 * 60, // 1 hour
  },
}

// US States mapping
export const US_STATES: Record<string, string> = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
  'DC': 'District of Columbia',
  'AS': 'American Samoa',
  'GU': 'Guam',
  'MP': 'Northern Mariana Islands',
  'PR': 'Puerto Rico',
  'VI': 'U.S. Virgin Islands',
} 