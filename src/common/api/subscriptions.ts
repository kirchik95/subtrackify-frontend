import { apiClient, type ApiResponse } from './client';

export type BillingCycle = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'paused';

export interface EmbeddedCategory {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface Subscription {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  nextBillingDate: string; // ISO date string
  status: SubscriptionStatus;
  categoryId: number | null;
  category: EmbeddedCategory | null;
  color?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export const SUBSCRIPTION_COLORS = [
  '#E50914',
  '#FF6B00',
  '#FBBF24',
  '#1DB954',
  '#06B6D4',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
] as const;

export interface CreateSubscriptionInput {
  name: string;
  description?: string;
  price: number;
  currency?: string; // Default: 'USD'
  billingCycle: BillingCycle;
  nextBillingDate: string; // ISO date string
  categoryId?: number | null;
  color?: string;
}

export interface UpdateSubscriptionInput {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  billingCycle?: BillingCycle;
  nextBillingDate?: string; // ISO date string
  categoryId?: number | null;
  color?: string;
}

export interface FilterSubscriptionsQuery {
  categoryId?: number;
  status?: SubscriptionStatus;
  minPrice?: number;
  maxPrice?: number;
}

export const subscriptionsApi = {
  async getAll(filters?: FilterSubscriptionsQuery): Promise<ApiResponse<Subscription[]>> {
    const queryParams = new URLSearchParams();

    if (filters?.categoryId) {
      queryParams.append('categoryId', filters.categoryId.toString());
    }
    if (filters?.status) {
      queryParams.append('status', filters.status);
    }
    if (filters?.minPrice !== undefined) {
      queryParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      queryParams.append('maxPrice', filters.maxPrice.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/subscriptions?${queryString}` : '/api/subscriptions';

    return apiClient.get<Subscription[]>(endpoint);
  },

  async getById(id: number): Promise<ApiResponse<Subscription>> {
    return apiClient.get<Subscription>(`/api/subscriptions/${id}`);
  },

  async create(data: CreateSubscriptionInput): Promise<ApiResponse<Subscription>> {
    return apiClient.post<Subscription>('/api/subscriptions', {
      ...data,
      currency: data.currency || 'USD',
    });
  },

  async update(id: number, data: UpdateSubscriptionInput): Promise<ApiResponse<Subscription>> {
    return apiClient.put<Subscription>(`/api/subscriptions/${id}`, data);
  },

  async delete(id: number): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/api/subscriptions/${id}`);
  },
};
