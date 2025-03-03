export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUserProfileRequest = Partial<
  Pick<UserProfile, "name" | "email" | "bio">
>;

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
} 