import { useEffect, useState } from 'react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';

import { useAppDispatch, useAppSelector } from '../../../../common/store/hooks';
import { deleteSubscription, fetchSubscriptions } from '../../store/actions';
import { SubscriptionDeleteAlertDialog } from '../SubscriptionDeleteAlertDialog';
import { SubscriptionItem } from './components/SubscriptionItem';

export const SubscriptionsList = () => {
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleDeleteClick = (id: number) => {
    setSubscriptionToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (subscriptionToDelete !== null) {
      dispatch(deleteSubscription(subscriptionToDelete));
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
          <SubscriptionItem
            key={subscription.id}
            subscription={subscription}
            onDelete={handleDeleteClick}
          />
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
