import React from 'react'
import { render, screen } from '@testing-library/react'
import { ParkDetail } from '@/components/park/park-detail'

// Mock the child components
jest.mock('@/components/park/park-favorite-button', () => ({
  ParkFavoriteButton: () => <div data-testid="park-favorite-button">Favorite Button</div>,
}))

jest.mock('@/components/park/park-add-to-itinerary', () => ({
  ParkAddToItinerary: () => <div data-testid="park-add-to-itinerary">Add to Itinerary</div>,
}))

jest.mock('@/components/park/park-activities', () => ({
  ParkActivities: () => <div data-testid="park-activities">Activities</div>,
}))

jest.mock('@/components/park/park-map', () => ({
  ParkMap: () => <div data-testid="park-map">Map</div>,
}))

jest.mock('@/components/park/park-hours', () => ({
  ParkHours: () => <div data-testid="park-hours">Hours</div>,
}))

jest.mock('@/components/park/park-fees', () => ({
  ParkFees: () => <div data-testid="park-fees">Fees</div>,
}))

jest.mock('@/components/park/park-weather', () => ({
  ParkWeather: () => <div data-testid="park-weather">Weather</div>,
}))

// Mock the utils functions
jest.mock('@/lib/utils', () => ({
  parseStatesList: jest.fn().mockReturnValue(['CA', 'NV']),
  cn: jest.fn().mockImplementation((...args) => args.join(' ')),
}))

// Mock the config
jest.mock('@/lib/config', () => ({
  US_STATES: {
    CA: 'California',
    NV: 'Nevada',
  },
}))

describe('ParkDetail', () => {
  const mockPark = {
    id: '1',
    parkCode: 'yose',
    name: 'Yosemite National Park',
    description: 'A beautiful national park in California',
    states: 'CA,NV',
    designation: 'National Park',
    url: 'https://www.nps.gov/yose/index.htm',
    directionsInfo: 'Directions to Yosemite',
    directionsUrl: 'https://www.nps.gov/yose/planyourvisit/directions.htm',
    latLong: 'lat:37.84883288, lng:-119.5571873',
    weatherInfo: 'Weather information for Yosemite',
    images: [
      {
        url: 'https://example.com/yosemite.jpg',
        altText: 'Yosemite Valley',
        title: 'Yosemite Valley',
        caption: 'Beautiful view of Yosemite Valley',
        credit: 'NPS',
      },
    ],
    activities: [],
    entranceFees: [],
    entrancePasses: [],
    operatingHours: [],
  }
  
  it('renders the park details correctly', () => {
    render(<ParkDetail park={mockPark} />)
    
    // Check if the park name is rendered
    expect(screen.getByText('Yosemite National Park')).toBeInTheDocument()
    
    // Check if the park location is rendered
    expect(screen.getByText(/California, Nevada/)).toBeInTheDocument()
    
    // Check if the park designation is rendered
    expect(screen.getByText(/National Park/)).toBeInTheDocument()
    
    // Check if the park description is rendered
    expect(screen.getByText('A beautiful national park in California')).toBeInTheDocument()
    
    // Check if the action buttons are rendered
    expect(screen.getByTestId('park-favorite-button')).toBeInTheDocument()
    expect(screen.getByTestId('park-add-to-itinerary')).toBeInTheDocument()
    expect(screen.getByText('Official Website')).toBeInTheDocument()
    
    // Check if the tabs are rendered
    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /activities/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /hours/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /fees/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /directions/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /weather/i })).toBeInTheDocument()
    
    // Check if the map component is rendered in the overview tab
    expect(screen.getByTestId('park-map')).toBeInTheDocument()
  })
  
  it('renders the park image when available', () => {
    render(<ParkDetail park={mockPark} />)
    
    const image = screen.getByAltText('Yosemite Valley')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('yosemite.jpg'))
  })
  
  it('does not render an image when no images are available', () => {
    const parkWithoutImages = { ...mockPark, images: [] }
    render(<ParkDetail park={parkWithoutImages} />)
    
    // There should be no img elements
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
  
  it('renders directions information', () => {
    render(<ParkDetail park={mockPark} />)
    
    // Click on the directions tab
    fireEvent.click(screen.getByRole('tab', { name: /directions/i }))
    
    // Check if the directions info is rendered
    expect(screen.getByText('Directions to Yosemite')).toBeInTheDocument()
    expect(screen.getByText('Get Detailed Directions')).toBeInTheDocument()
  })
}) 