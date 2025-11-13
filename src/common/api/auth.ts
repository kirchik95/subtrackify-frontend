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
  token: string;
}

export const authApi = {
  /**
   * Вход пользователя
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);

    if (response.success && response.data) {
      // Сохраняем токен в API клиенте
      apiClient.setToken(response.data.token);
    }

    return response;
  },

  /**
   * Регистрация пользователя
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', credentials);

    if (response.success && response.data) {
      // Сохраняем токен в API клиенте
      apiClient.setToken(response.data.token);
    }

    return response;
  },

  /**
   * Получение текущего пользователя
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>('/api/auth/me');

    if (!response.success) {
      // Очищаем токен при ошибке (токен невалидный или истек)
      apiClient.setToken(null);
    }

    return response;
  },

  /**
   * Выход пользователя
   */
  logout(): void {
    apiClient.setToken(null);
  },
};
