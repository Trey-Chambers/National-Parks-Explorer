import type { ApiError } from "@/types/user";

/**
 * Handles API error responses
 * @param response - Fetch Response object
 * @returns Formatted error object
 */
export async function handleApiError(response: Response): Promise<Error> {
  let errorData: ApiError;
  
  try {
    errorData = await response.json();
  } catch (e) {
    // If response cannot be parsed as JSON
    errorData = {
      message: `API error: ${response.statusText}`,
      status: response.status,
    };
  }
  
  const error = new Error(errorData.message || "An unknown error occurred");
  
  // Attach additional error metadata
  (error as any).status = response.status;
  (error as any).code = errorData.code;
  
  return error;
}

/**
 * Creates a custom error with additional metadata
 * @param message - Error message
 * @param metadata - Additional error metadata
 * @returns Custom error object
 */
export function createCustomError(
  message: string,
  metadata?: Record<string, any>
): Error {
  const error = new Error(message);
  
  if (metadata) {
    Object.assign(error, metadata);
  }
  
  return error;
} 