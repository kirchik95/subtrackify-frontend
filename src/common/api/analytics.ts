import { apiClient, type ApiResponse } from './client';

export interface AnalyticsSummary {
  monthlyTotal: number;
  previousMonthTotal: number;
  changePercent: number;
  activeCount: number;
  pausedCount: number;
  cancelledCount: number;
  totalCount: number;
  currency: string;
}

export interface SpendingHistoryItem {
  month: string; // yyyy-MM format
  total: number;
}

export interface SpendingHistoryResponse {
  history: SpendingHistoryItem[];
  currency: string;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface CategoryBreakdownResponse {
  categories: CategoryBreakdown[];
  currency: string;
}

export const analyticsApi = {
  async getSummary(): Promise<ApiResponse<AnalyticsSummary>> {
    return apiClient.get<AnalyticsSummary>('/api/analytics/summary');
  },

  async getSpendingHistory(months = 12): Promise<ApiResponse<SpendingHistoryResponse>> {
    return apiClient.get<SpendingHistoryResponse>(
      `/api/analytics/spending-history?months=${months}`
    );
  },

  async getByCategory(): Promise<ApiResponse<CategoryBreakdownResponse>> {
    return apiClient.get<CategoryBreakdownResponse>('/api/analytics/by-category');
  },
};
