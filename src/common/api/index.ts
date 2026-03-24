// Импортируем API модули
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

// Собираем все API в один объект
export const api = {
  auth: authApi,
  profile: profileApi,
  subscriptions: subscriptionsApi,
};

// Экспортируем отдельные API модули для удобства
export { authApi, profileApi, subscriptionsApi };
