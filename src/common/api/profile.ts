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

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  paymentReminders: boolean;
  priceChangeAlerts: boolean;
  weeklyReport: boolean;
  marketingEmails: boolean;
}

export interface RegionalPreferences {
  currency: string;
  language: string;
  timezone: string;
}

export interface AppearancePreferences {
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  regional: RegionalPreferences;
  appearance: AppearancePreferences;
}

export interface UpdatePreferencesInput {
  notifications?: Partial<NotificationPreferences>;
  regional?: Partial<RegionalPreferences>;
  appearance?: Partial<AppearancePreferences>;
}

export interface ImportResult {
  imported: number;
  errors: { row: number; message: string }[];
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

  async getPreferences(): Promise<ApiResponse<UserPreferences>> {
    return apiClient.get<UserPreferences>('/api/preferences');
  },

  async updatePreferences(data: UpdatePreferencesInput): Promise<ApiResponse<UserPreferences>> {
    return apiClient.put<UserPreferences>('/api/preferences', data);
  },

  async exportCsv(): Promise<void> {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'http://localhost:3000');

    const response = await fetch(`${baseUrl}/api/export/csv`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async importCsv(file: File): Promise<ApiResponse<ImportResult>> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post<ImportResult>('/api/import', formData);
  },
};
