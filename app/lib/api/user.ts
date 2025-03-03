import { API_ENDPOINTS } from "@/config/api";
import { handleApiError } from "@/lib/utils/error-handling";
import type { UserProfile, UpdateUserProfileRequest } from "@/types/user";

/**
 * Fetches the current user's profile
 * @returns Promise with user profile data
 */
export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw await handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}

/**
 * Updates the current user's profile
 * @param data - Profile data to update
 * @returns Promise with updated user profile
 */
export async function updateUserProfile(
  data: UpdateUserProfileRequest
): Promise<UserProfile> {
  try {
    const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
} 