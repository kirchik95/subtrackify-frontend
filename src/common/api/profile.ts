import type { User } from './auth';
import { apiClient, type ApiResponse } from './client';

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const profileApi = {
  async updateProfile(data: UpdateProfileInput): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/api/auth/profile', {
      name: `${data.firstName} ${data.lastName}`.trim(),
    });
  },

  async changePassword(data: ChangePasswordInput): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/api/auth/change-password', data);
  },

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiClient.post<{ avatarUrl: string }>('/api/auth/avatar', formData);
  },

  async removeAvatar(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>('/api/auth/avatar');
  },

  async deleteAccount(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>('/api/auth/account');
  },
};
