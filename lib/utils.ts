import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to a more readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Extracts coordinates from NPS latLong string
 */
export function extractCoordinates(latLong: string): { lat: number; lng: number } | null {
  if (!latLong) return null;
  
  const match = latLong.match(/lat:([-\d.]+), long:([-\d.]+)/);
  if (!match) return null;
  
  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2]),
  };
}

/**
 * Formats a price string to a more readable format
 */
export function formatPrice(price: string): string {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return 'Free';
  if (numPrice === 0) return 'Free';
  
  return `$${numPrice.toFixed(2)}`;
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Parses state codes from the NPS states string
 */
export function parseStatesList(states: string): string[] {
  return states.split(',').map(state => state.trim());
}

/**
 * Safely get an array from a potentially undefined value
 * @param data - The data that might be undefined
 * @returns The data as an array, or an empty array if undefined
 */
export function safeArray<T>(data: T[] | undefined | null): T[] {
  return Array.isArray(data) ? data : [];
}

/**
 * Safely get an object from a potentially undefined value
 * @param data - The data that might be undefined
 * @returns The data as an object, or an empty object if undefined
 */
export function safeObject<T extends object>(data: T | undefined | null): T {
  return (data && typeof data === 'object') ? data : {} as T;
} 