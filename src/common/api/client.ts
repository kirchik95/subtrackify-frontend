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
  private static TOKEN_KEY = 'auth_token';

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = this.getToken();
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
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
      (error: AxiosError<ApiResponse<unknown>>) => {
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

  setToken(token: string | null, persistent = true) {
    if (token) {
      localStorage.removeItem(ApiClient.TOKEN_KEY);
      sessionStorage.removeItem(ApiClient.TOKEN_KEY);

      const storage = persistent ? localStorage : sessionStorage;
      storage.setItem(ApiClient.TOKEN_KEY, token);
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(ApiClient.TOKEN_KEY);
      sessionStorage.removeItem(ApiClient.TOKEN_KEY);
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  getToken(): string | null {
    return localStorage.getItem(ApiClient.TOKEN_KEY) || sessionStorage.getItem(ApiClient.TOKEN_KEY);
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
