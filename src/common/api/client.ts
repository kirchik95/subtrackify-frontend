import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// В режиме разработки используем прокси Vite (пустой baseURL)
// В продакшене используем переменную окружения или дефолтный URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'http://localhost:3000');

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private axiosInstance: AxiosInstance;
  private static ACCESS_TOKEN_KEY = 'auth_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';
  private refreshPromise: Promise<boolean> | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = this.getAccessToken();
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiResponse<unknown>>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Auto-refresh on 401 (except for auth endpoints themselves)
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/login') &&
          !originalRequest.url?.includes('/auth/register') &&
          !originalRequest.url?.includes('/auth/refresh')
        ) {
          originalRequest._retry = true;

          const refreshed = await this.tryRefresh();
          if (refreshed) {
            const token = this.getAccessToken();
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return this.axiosInstance(originalRequest);
          }

          // Refresh failed — clear tokens
          this.clearTokens();
        }

        if (!error.response) {
          return Promise.reject({
            success: false,
            error: error.message || 'Network error',
          });
        }

        const errorData = error.response.data;
        return Promise.reject({
          success: false,
          error: errorData?.error || errorData?.message || 'Request failed',
        });
      }
    );
  }

  private async tryRefresh(): Promise<boolean> {
    // Deduplicate concurrent refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.doRefresh();
    const result = await this.refreshPromise;
    this.refreshPromise = null;
    return result;
  }

  private async doRefresh(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await this.axiosInstance.post<
        ApiResponse<{ accessToken: string; refreshToken: string }>
      >('/api/auth/refresh', { refreshToken });

      const data = response.data;
      if (data.success && data.data) {
        this.setTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  setToken(token: string | null, persistent = true) {
    if (token) {
      localStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);

      const storage = persistent ? localStorage : sessionStorage;
      storage.setItem(ApiClient.ACCESS_TOKEN_KEY, token);
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      this.clearTokens();
    }
  }

  setTokens(accessToken: string, refreshToken: string, persistent = true) {
    const storage = persistent ? localStorage : sessionStorage;

    // Clear both storages first
    localStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);
    localStorage.removeItem(ApiClient.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ApiClient.REFRESH_TOKEN_KEY);

    storage.setItem(ApiClient.ACCESS_TOKEN_KEY, accessToken);
    storage.setItem(ApiClient.REFRESH_TOKEN_KEY, refreshToken);
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  clearTokens() {
    localStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);
    localStorage.removeItem(ApiClient.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ApiClient.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ApiClient.REFRESH_TOKEN_KEY);
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  getAccessToken(): string | null {
    return (
      localStorage.getItem(ApiClient.ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(ApiClient.ACCESS_TOKEN_KEY)
    );
  }

  getRefreshToken(): string | null {
    return (
      localStorage.getItem(ApiClient.REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(ApiClient.REFRESH_TOKEN_KEY)
    );
  }

  getToken(): string | null {
    return this.getAccessToken();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, body);
    return response.data;
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(endpoint, body);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(endpoint);
    return response.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
