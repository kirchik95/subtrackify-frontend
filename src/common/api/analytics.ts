import { apiClient, type ApiResponse } from './client';

export interface AnalyticsSummary {
  monthlyTotal: number;
  previousMonthTotal: number;
  changePercent: number;
  activeCount: number;
  pausedCount: number;
  cancelledCount: number;
  totalCount: number;
}

export interface SpendingHistoryItem {
  month: string; // yyyy-MM format
  total: number;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export const analyticsApi = {
  async getSummary(): Promise<ApiResponse<AnalyticsSummary>> {
    return apiClient.get<AnalyticsSummary>('/api/analytics/summary');
  },

  async getSpendingHistory(months = 12): Promise<ApiResponse<SpendingHistoryItem[]>> {
    return apiClient.get<SpendingHistoryItem[]>(`/api/analytics/spending-history?months=${months}`);
  },

  async getByCategory(): Promise<ApiResponse<CategoryBreakdown[]>> {
    return apiClient.get<CategoryBreakdown[]>('/api/analytics/by-category');
  },
};
