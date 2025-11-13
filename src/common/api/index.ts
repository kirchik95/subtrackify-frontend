// Импортируем API модули
import { authApi } from './auth';
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

// Собираем все API в один объект
export const api = {
  auth: authApi,
  subscriptions: subscriptionsApi,
  // Здесь будут другие API модули, например:
  // categories: categoriesApi,
};

// Экспортируем отдельные API модули для удобства
export { authApi, subscriptionsApi };
