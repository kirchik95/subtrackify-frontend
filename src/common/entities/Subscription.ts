// Re-export types from API for consistency
export type {
  Subscription,
  BillingCycle,
  SubscriptionStatus,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  FilterSubscriptionsQuery,
} from '../api/subscriptions';

// Legacy type alias for backward compatibility
// @deprecated Use BillingCycle from '../api/subscriptions' instead
export type SubscriptionFrequency = 'monthly' | 'weekly' | 'yearly';
