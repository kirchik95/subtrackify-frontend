import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';

import { useAppDispatch, useAppSelector } from '../../../../common/store/hooks';
import { subscriptionActions } from '../../store/slice';
import { SubscriptionDeleteAlertDialog } from '../SubscriptionDeleteAlertDialog';

const formatFrequency = (frequency: string) => {
  const frequencyMap: Record<string, string> = {
    weekly: 'Weekly',
    monthly: 'Monthly',
    annually: 'Annually',
  };
  return frequencyMap[frequency] || frequency;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const SubscriptionsList = () => {
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSubscriptionToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (subscriptionToDelete) {
      dispatch(subscriptionActions.removeSubscription(subscriptionToDelete));
      setSubscriptionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setSubscriptionToDelete(null);
  };

  const subscriptionToDeleteData = subscriptions.find((sub) => sub.id === subscriptionToDelete);

  if (subscriptions.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 7l-7 5-7-5M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v0M5 5v14l7-5 7 5V5" />
          </svg>
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No subscriptions yet</EmptyTitle>
          <EmptyDescription>
            Add your first subscription to start tracking your recurring expenses.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subscriptions</h2>
        <span className="text-sm text-muted-foreground">
          {subscriptions.length} {subscriptions.length === 1 ? 'subscription' : 'subscriptions'}
        </span>
      </div>
      <Separator />
      <div className="space-y-3">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{subscription.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatFrequency(subscription.frequency)}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  ${subscription.cost.toFixed(2)}
                </span>
                <span>•</span>
                <span>Added {formatDate(subscription.createdAt)}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(subscription.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <SubscriptionDeleteAlertDialog
        open={subscriptionToDelete !== null}
        subscriptionName={subscriptionToDeleteData?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};
