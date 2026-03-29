import { profileApi, type UpdatePreferencesInput } from '@/common/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type {
  UserPreferences,
  UpdatePreferencesInput,
  NotificationPreferences,
  RegionalPreferences,
  AppearancePreferences,
} from '@/common/api';

export const fetchPreferences = createAsyncThunk(
  'preferences/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi.getPreferences();

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch preferences');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to fetch preferences');
    }
  }
);

export const updatePreferences = createAsyncThunk(
  'preferences/update',
  async (data: UpdatePreferencesInput, { rejectWithValue }) => {
    try {
      const response = await profileApi.updatePreferences(data);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to update preferences');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to update preferences');
    }
  }
);
