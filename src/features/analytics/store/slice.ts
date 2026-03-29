import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAnalyticsSummary,
  fetchCategoryBreakdown,
  fetchSpendingHistory,
  type AnalyticsSummary,
  type CategoryBreakdown,
  type SpendingHistoryItem,
} from './actions';

interface AnalyticsState {
  summary: AnalyticsSummary | null;
  spendingHistory: SpendingHistoryItem[];
  spendingHistoryCurrency: string;
  categoryBreakdown: CategoryBreakdown[];
  categoryBreakdownCurrency: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  summary: null,
  spendingHistory: [],
  spendingHistoryCurrency: 'USD',
  categoryBreakdown: [],
  categoryBreakdownCurrency: 'USD',
  isLoading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAnalyticsSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch summary';
      });

    builder.addCase(fetchSpendingHistory.fulfilled, (state, action) => {
      state.spendingHistory = action.payload.history;
      state.spendingHistoryCurrency = action.payload.currency;
    });

    builder.addCase(fetchCategoryBreakdown.fulfilled, (state, action) => {
      state.categoryBreakdown = action.payload.categories;
      state.categoryBreakdownCurrency = action.payload.currency;
    });
  },
});

export const { reducer: analyticsReducer } = analyticsSlice;
