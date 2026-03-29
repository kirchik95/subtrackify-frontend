import { analyticsApi } from '@/common/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type { AnalyticsSummary, SpendingHistoryItem, CategoryBreakdown } from '@/common/api';

export const fetchAnalyticsSummary = createAsyncThunk(
  'analytics/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getSummary();

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch analytics summary');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to fetch analytics summary');
    }
  }
);

export const fetchSpendingHistory = createAsyncThunk(
  'analytics/fetchSpendingHistory',
  async (months: number | undefined, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getSpendingHistory(months);

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch spending history');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to fetch spending history');
    }
  }
);

export const fetchCategoryBreakdown = createAsyncThunk(
  'analytics/fetchCategoryBreakdown',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getByCategory();

      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch category breakdown');
      }

      return response.data;
    } catch (error) {
      const apiError = error as { success: false; error: string };
      return rejectWithValue(apiError.error || 'Failed to fetch category breakdown');
    }
  }
);
