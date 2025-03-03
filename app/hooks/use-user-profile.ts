import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/lib/api/user";
import type { UserProfile, UpdateUserProfileRequest } from "@/types/user";

/**
 * Hook for fetching and managing user profile data
 * @returns User profile data and mutation functions
 */
export function useUserProfile() {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateUserProfileRequest) => updateUserProfile(data),
    onSuccess: () => {
      // Invalidate and refetch the profile data
      refetch();
    },
  });

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    updateProfile: mutate,
    refetch,
  };
} 