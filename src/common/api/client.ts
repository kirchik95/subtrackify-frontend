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

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Загружаем токен из localStorage при инициализации
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Interceptor для добавления токена в каждый запрос
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor для обработки ошибок
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse<unknown>>) => {
        // Обрабатываем ошибки сети
        if (!error.response) {
          return Promise.reject({
            success: false,
            error: error.message || 'Network error',
          });
        }

        // Обрабатываем ошибки от сервера
        const errorData = error.response.data;
        return Promise.reject({
          success: false,
          error: errorData?.error || errorData?.message || 'Request failed',
        });
      }
    );
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('auth_token', token);
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('auth_token');
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
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
