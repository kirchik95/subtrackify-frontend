export type SubscriptionFrequency = 'monthly' | 'weekly' | 'annually';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  frequency: SubscriptionFrequency;
  startDate: string; // ISO date string for the day when subscription is charged
  createdAt: string;
}
