// Импортируем API модули
import { analyticsApi } from './analytics';
import { authApi } from './auth';
import { profileApi } from './profile';
import { subscriptionsApi } from './subscriptions';

// Экспортируем базовый клиент и типы
export { apiClient, type ApiResponse } from './client';

// Экспортируем типы из auth
export type { LoginCredentials, RegisterCredentials, User, AuthResponse } from './auth';

// Экспортируем типы из subscriptions
export type {
  Subscription,
  BillingCycle,
  SubscriptionStatus,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  FilterSubscriptionsQuery,
} from './subscriptions';
export { SUBSCRIPTION_COLORS } from './subscriptions';

// Экспортируем типы из profile
export type { UpdateProfileInput, ChangePasswordInput } from './profile';

// Экспортируем типы из analytics
export type { AnalyticsSummary, SpendingHistoryItem, CategoryBreakdown } from './analytics';

// Собираем все API в один объект
export const api = {
  auth: authApi,
  profile: profileApi,
  subscriptions: subscriptionsApi,
  analytics: analyticsApi,
};

// Экспортируем отдельные API модули для удобства
export { analyticsApi, authApi, profileApi, subscriptionsApi };
