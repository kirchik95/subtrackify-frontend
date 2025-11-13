import type { Subscription } from '@/common/entities/Subscription';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SubscriptionItemProps {
  subscription: Subscription;
  onDelete: (id: number) => void;
}

const formatFrequency = (billingCycle: string) => {
  const frequencyMap: Record<string, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  };
  return frequencyMap[billingCycle] || billingCycle;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const SubscriptionItem = ({ subscription, onDelete }: SubscriptionItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">{subscription.name}</h3>
          <span className="text-sm text-muted-foreground">
            {formatFrequency(subscription.billingCycle)}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {subscription.currency} {subscription.price.toFixed(2)}
          </span>
          <span>•</span>
          <span>Added {formatDate(subscription.createdAt)}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(subscription.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};
