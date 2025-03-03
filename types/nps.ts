// Common fields that appear in most NPS API responses
export interface NPSCommonFields {
  id: string;
  url: string;
  name: string;
  description: string;
}

// Park-specific fields
export interface Park extends NPSCommonFields {
  fullName: string;
  parkCode: string;
  states: string;
  designation: string;
  latLong: string;
  directionsInfo: string;
  directionsUrl: string;
  operatingHours: Array<{
    name: string;
    description: string;
    standardHours: Record<string, string>;
    exceptions: Array<{
      name: string;
      startDate: string;
      endDate: string;
      exceptionHours: Record<string, string>;
    }>;
  }>;
  addresses: Array<{
    type: string;
    line1: string;
    line2?: string;
    line3?: string;
    city: string;
    stateCode: string;
    postalCode: string;
  }>;
  contacts: {
    phoneNumbers: Array<{
      phoneNumber: string;
      description: string;
      extension: string;
      type: string;
    }>;
    emailAddresses: Array<{
      emailAddress: string;
      description: string;
    }>;
  };
  entranceFees: Array<{
    cost: string;
    description: string;
    title: string;
  }>;
  entrancePasses: Array<{
    cost: string;
    description: string;
    title: string;
  }>;
  fees: Array<any>;
  images: Array<{
    credit: string;
    altText: string;
    title: string;
    caption: string;
    url: string;
  }>;
  weatherInfo: string;
  topics: Array<{
    id: string;
    name: string;
  }>;
  activities: Array<{
    id: string;
    name: string;
  }>;
}

// Activity type
export interface Activity extends NPSCommonFields {
  // Additional activity-specific fields
}

// Alert type
export interface Alert extends NPSCommonFields {
  title: string;
  parkCode: string;
  category: string;
  lastIndexedDate: string;
}

// Event type
export interface Event extends NPSCommonFields {
  title: string;
  parkFullName: string;
  parkCode: string;
  category: string;
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  regResInfo: string;
  contactName: string;
  contactTelephoneNumber: string;
  contactEmailAddress: string;
  feeInfo: string;
  location: string;
}

// API response types
export interface NPSResponse<T> {
  total: number;
  limit: number;
  start: number;
  data: T[];
}

export type ParksResponse = NPSResponse<Park>;
export type ActivitiesResponse = NPSResponse<Activity>;
export type AlertsResponse = NPSResponse<Alert>;
export type EventsResponse = NPSResponse<Event>;

export interface Topic {
  id: string;
  name: string;
}

export interface PhoneNumber {
  phoneNumber: string;
  description: string;
  extension: string;
  type: string;
}

export interface EmailAddress {
  description: string;
  emailAddress: string;
}

export interface EntranceFee {
  cost: string;
  description: string;
  title: string;
}

export interface EntrancePass {
  cost: string;
  description: string;
  title: string;
}

export interface OperatingHours {
  exceptions: Exception[];
  description: string;
  standardHours: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  name: string;
}

export interface Exception {
  exceptionHours: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  startDate: string;
  endDate: string;
  name: string;
}

export interface Address {
  postalCode: string;
  city: string;
  stateCode: string;
  line1: string;
  line2: string;
  line3: string;
  type: string;
}

export interface Image {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}

export interface Alert {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  parkCode: string;
}

export interface Event {
  id: string;
  url: string;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  times: {
    timeStart: string;
    timeEnd: string;
  }[];
  recurrence: string;
  contactName: string;
  contactTelephoneNumber: string;
  contactEmailAddress: string;
  parkCode: string;
}

export interface EventResponse {
  total: string;
  data: Event[];
  limit: string;
  start: string;
}

export interface NewsRelease {
  id: string;
  url: string;
  title: string;
  abstract: string;
  parkCode: string;
  imageurl: string;
  releasedate: string;
  releasedateformatted: string;
}

export interface NewsResponse {
  total: string;
  data: NewsRelease[];
  limit: string;
  start: string;
}

export interface Campground {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: string;
  audioDescription: string;
  isPassportStampLocation: boolean;
  passportStampLocationDescription: string;
  passportStampImages: Image[];
  geometryPoiId: string;
  reservationInfo: string;
  reservationUrl: string;
  regulationsurl: string;
  regulationsOverview: string;
  amenities: {
    trashRecyclingCollection: string;
    toilets: string[];
    internetConnectivity: string;
    showers: string[];
    cellPhoneReception: string;
    laundry: string;
    amphitheater: string;
    dumpStation: string;
    campStore: string;
    staffOrVolunteerHostOnsite: string;
    potableWater: string[];
    iceAvailableForSale: string;
    firewoodForSale: string;
    foodStorageLockers: string;
  };
  contacts: {
    phoneNumbers: Array<{
      phoneNumber: string;
      description: string;
      extension: string;
      type: string;
    }>;
    emailAddresses: Array<{
      emailAddress: string;
      description: string;
    }>;
  };
  fees: Array<{
    cost: string;
    description: string;
    title: string;
  }>;
  directionsOverview: string;
  directionsUrl: string;
  operatingHours: Array<{
    exceptions: any[];
    description: string;
    standardHours: {
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
    };
    name: string;
  }>;
  addresses: Array<{
    postalCode: string;
    city: string;
    stateCode: string;
    countryCode: string;
    provinceTerritoryCode: string;
    line1: string;
    type: string;
    line2: string;
    line3: string;
  }>;
  images: Image[];
  weatherOverview: string;
  numberOfSitesReservable: string;
  numberOfSitesFirstComeFirstServe: string;
  campsites: {
    totalSites: string;
    group: string;
    horse: string;
    tentOnly: string;
    electricalHookups: string;
    rvOnly: string;
    walkBoatTo: string;
    other: string;
  };
  accessibility: {
    wheelchairAccess: string;
    internetInfo: string;
    cellPhoneInfo: string;
    fireStovePolicy: string;
    rvAllowed: string;
    rvInfo: string;
    additionalInfo: string;
    trailerAllowed: string;
    trailerMaxLength: string;
    adaInfo: string;
  };
}

export interface CampgroundResponse {
  total: string;
  data: Campground[];
  limit: string;
  start: string;
} 