import { apiClient, type ApiResponse } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Вход пользователя
   */
  async login(
    credentials: LoginCredentials,
    rememberMe = true
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);

    if (response.success && response.data) {
      apiClient.setTokens(response.data.accessToken, response.data.refreshToken, rememberMe);
    }

    return response;
  },

  /**
   * Регистрация пользователя
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', credentials);

    if (response.success && response.data) {
      apiClient.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  },

  /**
   * Получение текущего пользователя
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>('/api/auth/me');

    if (!response.success) {
      apiClient.clearTokens();
    }

    return response;
  },

  /**
   * Запрос на сброс пароля
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/api/auth/forgot-password', { email });
  },

  /**
   * Выход пользователя — invalidate refresh token on server
   */
  async logout(): Promise<void> {
    const refreshToken = apiClient.getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient.post('/api/auth/logout', { refreshToken });
      } catch {
        // Ignore errors — we're logging out anyway
      }
    }
    apiClient.clearTokens();
  },
};
