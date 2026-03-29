import { apiClient, type ApiResponse } from './client';

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  userId: number;
  createdAt: string;
  _count: {
    subscriptions: number;
  };
}

export interface CreateCategoryInput {
  name: string;
  icon?: string;
  color?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  icon?: string;
  color?: string;
}

export const categoriesApi = {
  async getAll(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/api/categories');
  },

  async create(data: CreateCategoryInput): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>('/api/categories', data);
  },

  async update(id: number, data: UpdateCategoryInput): Promise<ApiResponse<Category>> {
    return apiClient.put<Category>(`/api/categories/${id}`, data);
  },

  async delete(id: number): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/api/categories/${id}`);
  },
};
