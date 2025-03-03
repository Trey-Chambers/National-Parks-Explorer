import * as LucideIcons from 'lucide-react';
import { createElement } from 'react';

// Create a mapping of activity IDs to icon names that are definitely in Lucide
const activityIconNames: Record<string, keyof typeof LucideIcons> = {
  // Hiking and walking
  'B204DE60-5A24-43DD-8902-C81625A09A74': 'Footprints', // Instead of Hiking
  '7C37B79B-D02D-49EB-9020-3DB8299B748A': 'Footprints', // Instead of Hiking
  'BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA': 'Footprints', // Instead of Hiking
  '45261C0A-00D8-4C27-A1F8-029F933A0D34': 'Footprints', // Instead of Hiking
  
  // Water activities
  'AE42B46C-E4B7-4889-A122-08FE180371AE': 'Anchor', // Instead of Fishing
  'D37A0003-8317-4F04-8FB0-4CF0A272E195': 'Anchor', // Instead of Boat
  '071BA73C-1D3C-46D4-A53C-00D5602F7F0E': 'Waves',
  
  // Wildlife viewing
  '5A2C91D1-50EC-4B24-8BED-A2E11A1892DF': 'Eye', // Instead of Binoculars
  '0B685688-3405-4E2A-ABBA-E3069492EC50': 'Eye', // Instead of Binoculars
  
  // Biking
  '7CE6E935-F839-4FEC-A63E-052B1DEF39D2': 'Bike',
  'A59947B7-3376-49B4-AD02-C0423E08C5F7': 'Tent', // Camping
  
  // Horseback riding
  '4A58AF13-E8FB-4530-B41A-97DF0B0C77B7': 'Landmark', // Instead of Horse
  
  // Other activities
  'DF4A35E0-7983-4A3E-BC13-0E6E4C9B1AF6': 'Mountain', // Mountain Climbing
  '4D224BCA-C127-408B-AC75-A51563C42411': 'Snowflake', // Skiing
  '7779241F-A70B-49BC-86F0-829AE332C708': 'Camera', // Playground
  'F9B1D433-6B86-4804-AED7-B50A519A3B7C': 'Users', // Skiing
  '13A57703-BB1A-41A2-94B8-53B692EB7238': 'Map', // Astronomy
  'C11D3746-5063-4BD0-B245-7178D1AD866C': 'History', // History
  'A0631906-9672-4583-91DE-113B93DB6B6E': 'Leaf', // Garden
  'E53E1320-9B17-41DC-86A5-A1A2CD7509E1': 'Sun', // Stargazing
};

// Create a function to get the icon component for an activity
export function getActivityIcon(activityId: string) {
  const iconName = activityIconNames[activityId] || 'Compass'; // Default to Compass
  
  // Check if the icon exists in LucideIcons
  if (iconName in LucideIcons) {
    return createElement(LucideIcons[iconName]);
  }
  
  // Fallback to Compass if the icon doesn't exist
  return createElement(LucideIcons.Compass);
}

// Export a component that renders the activity icon
export function ActivityIcon({ activityId, className }: { activityId: string, className?: string }) {
  const iconName = activityIconNames[activityId] || 'Compass';
  
  // @ts-ignore - We know these icons exist in Lucide
  const Icon = LucideIcons[iconName];
  return <Icon className={className} />;
}

// Export the default icon
export const DefaultActivityIcon = LucideIcons.Compass; 