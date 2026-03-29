import { useNavigate } from 'react-router';

import type { Subscription } from '@/common/entities/Subscription';
import { formatPrice } from '@/common/utils/formatPrice';
import { Trash2 } from 'lucide-react';

import { SubscriptionIcon } from '../../../SubscriptionIcon';

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
  const navigate = useNavigate();

  return (
    <div
      className="group flex items-center rounded-xl p-4 transition-colors hover:bg-accent/50 cursor-pointer"
      onClick={() => navigate(`/subscription/${subscription.id}`)}
    >
      <div className="flex-[2] flex items-center gap-3 min-w-0">
        <SubscriptionIcon name={subscription.name} color={subscription.color} />
        <span className="text-[15px] font-medium text-foreground truncate">
          {subscription.name}
        </span>
      </div>
      <div className="flex-1 text-foreground">{subscription.category?.name || '—'}</div>
      <div className="flex-1 text-sm text-muted-foreground">
        {formatFrequency(subscription.billingCycle)}
      </div>
      <div className="flex-1 text-right text-sm text-foreground">
        {formatDate(subscription.nextBillingDate)}
      </div>
      <div className="flex-1 text-right text-[15px] font-semibold text-foreground">
        {formatPrice(subscription.price, subscription.currency)}
      </div>
      <div className="w-10 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(subscription.id);
          }}
          className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity p-1"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
};
