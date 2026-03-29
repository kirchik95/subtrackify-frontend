import type { RootState } from '@/common/store/store';

export const getAnalyticsSummary = (state: RootState) => state.analytics.summary;
export const getSpendingHistory = (state: RootState) => state.analytics.spendingHistory;
export const getCategoryBreakdown = (state: RootState) => state.analytics.categoryBreakdown;
export const getAnalyticsIsLoading = (state: RootState) => state.analytics.isLoading;
