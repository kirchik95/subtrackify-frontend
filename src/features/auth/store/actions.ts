import {
  authApi,
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
  type User,
} from '@/common/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Re-export types for convenience
export type { LoginCredentials, RegisterCredentials, User, AuthResponse };

export const login = createAsyncThunk(
  'auth/login',
  async (
    { rememberMe, ...credentials }: LoginCredentials & { rememberMe?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.login(credentials, rememberMe);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Login failed');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Registration failed');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Registration failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.getCurrentUser();

    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to get current user');
    }

    return response.data;
  } catch (error) {
    const apiError = error as { success: false; error: string };
    return rejectWithValue(apiError.error || 'Failed to get current user');
  }
});

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await authApi.googleAuth(accessToken);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Google authentication failed');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Google authentication failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});
