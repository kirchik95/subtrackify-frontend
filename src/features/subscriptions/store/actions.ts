import {
  subscriptionsApi,
  type CreateSubscriptionInput,
  type FilterSubscriptionsQuery,
  type UpdateSubscriptionInput,
} from '@/common/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Re-export types for convenience
export type {
  Subscription,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  FilterSubscriptionsQuery,
  BillingCycle,
  SubscriptionStatus,
} from '@/common/api';

/**
 * Создать новую подписку
 */
export const createSubscription = createAsyncThunk(
  'subscriptions/create',
  async (data: CreateSubscriptionInput, { rejectWithValue }) => {
    try {
      const response = await subscriptionsApi.create(data);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to create subscription');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to create subscription');
    }
  }
);

/**
 * Получить все подписки пользователя
 */
export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchAll',
  async (filters: FilterSubscriptionsQuery | undefined, { rejectWithValue }) => {
    try {
      const response = await subscriptionsApi.getAll(filters);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch subscriptions');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to fetch subscriptions');
    }
  }
);

/**
 * Обновить подписку
 */
export const updateSubscription = createAsyncThunk(
  'subscriptions/update',
  async ({ id, data }: { id: number; data: UpdateSubscriptionInput }, { rejectWithValue }) => {
    try {
      const response = await subscriptionsApi.update(id, data);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to update subscription');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to update subscription');
    }
  }
);

/**
 * Удалить подписку
 */
export const deleteSubscription = createAsyncThunk(
  'subscriptions/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await subscriptionsApi.delete(id);

      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete subscription');
      }

      return id;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to delete subscription');
    }
  }
);
