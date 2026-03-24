import { useState } from 'react';

import { subscriptionActions } from '@/features/subscriptions/store/slice';
import { Plus, Search } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../../common/store/hooks';
import { deleteSubscription } from '../../store/actions';
import { SubscriptionDeleteAlertDialog } from '../SubscriptionDeleteAlertDialog';
import { SubscriptionItem } from './components/SubscriptionItem';

const skeletonRows = [
  { name: 'w-[100px]', cat: 'w-20', cycle: 'w-[60px]', date: 'w-20', amount: 'w-[50px]' },
  { name: 'w-20', cat: 'w-[60px]', cycle: 'w-[70px]', date: 'w-[90px]', amount: 'w-[60px]' },
  { name: 'w-[120px]', cat: 'w-[90px]', cycle: 'w-[50px]', date: 'w-[75px]', amount: 'w-[55px]' },
  { name: 'w-[90px]', cat: 'w-[70px]', cycle: 'w-[60px]', date: 'w-[85px]', amount: 'w-[65px]' },
];

function SubscriptionsListSkeleton() {
  return (
    <div className="flex flex-col min-h-[500px] rounded-3xl border border-border bg-background p-8 gap-6 shadow-[0_4px_12px_#00000005]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-[180px] rounded-md bg-[#E4E4E7]" />
          <div className="h-5 w-[60px] rounded-md bg-[#F4F4F5]" />
        </div>
        <div className="h-9 w-60 rounded-[10px] bg-[#F4F4F5]" />
      </div>

      <div className="flex pb-3 border-b border-border px-4">
        <div className="flex-[2]">
          <div className="h-4 w-[60px] rounded-sm bg-[#E4E4E7]" />
        </div>
        <div className="flex-1">
          <div className="h-4 w-[60px] rounded-sm bg-[#E4E4E7]" />
        </div>
        <div className="flex-1">
          <div className="h-4 w-20 rounded-sm bg-[#E4E4E7]" />
        </div>
        <div className="flex-1 flex justify-end">
          <div className="h-4 w-[90px] rounded-sm bg-[#E4E4E7]" />
        </div>
        <div className="flex-1 flex justify-end">
          <div className="h-4 w-[60px] rounded-sm bg-[#E4E4E7]" />
        </div>
        <div className="w-10" />
      </div>

      <div className="flex flex-col">
        {skeletonRows.map((row, i) => (
          <div key={i}>
            {i > 0 && <div className="h-px bg-[#F4F4F5]" />}
            <div className="flex items-center rounded-xl p-4">
              <div className="flex-[2] flex items-center gap-3">
                <div className="size-10 rounded-[10px] bg-[#F4F4F5] shrink-0" />
                <div className={`h-[18px] rounded-sm bg-[#E4E4E7] ${row.name}`} />
              </div>
              <div className="flex-1">
                <div className={`h-[22px] rounded-md bg-[#F4F4F5] ${row.cat}`} />
              </div>
              <div className="flex-1">
                <div className={`h-4 rounded-sm bg-[#E4E4E7] ${row.cycle}`} />
              </div>
              <div className="flex-1 flex justify-end">
                <div className={`h-4 rounded-sm bg-[#E4E4E7] ${row.date}`} />
              </div>
              <div className="flex-1 flex justify-end">
                <div className={`h-[18px] rounded-sm bg-[#E4E4E7] ${row.amount}`} />
              </div>
              <div className="w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SubscriptionsList = () => {
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const isLoading = useAppSelector((state) => state.subscriptions.isLoading);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading && subscriptions.length === 0) {
    return <SubscriptionsListSkeleton />;
  }

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

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscriptions.filter((sub) => sub.status === 'active').length;

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-background p-8 py-24 shadow-[0_4px_12px_#00000005]">
        <div className="flex items-center justify-center size-16 rounded-2xl bg-muted mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" strokeDasharray="2 2" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeDasharray="2 2" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeDasharray="2 2" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeDasharray="2 2" />
            <path d="M12 8v8M8 12h8" strokeDasharray="0" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No subscriptions yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-[280px] mb-6">
          Add your first subscription to start tracking your monthly expenses.
        </p>
        <button
          onClick={() => dispatch(subscriptionActions.setAddSubscriptionOpen(true))}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Subscription
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-background p-8 gap-6 shadow-[0_4px_12px_#00000005]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">All Subscriptions</h2>
          <span className="rounded-lg bg-muted px-2 py-1 text-sm text-foreground">
            {activeCount} Active
          </span>
        </div>
        <div className="flex items-center w-60 rounded-[10px] border border-border px-3 py-2 gap-2">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="flex pb-3 border-b border-border px-4">
        <div className="flex-[2] text-[13px] font-medium text-muted-foreground">Service</div>
        <div className="flex-1 text-[13px] font-medium text-muted-foreground">Category</div>
        <div className="flex-1 text-[13px] font-medium text-muted-foreground">Billing Cycle</div>
        <div className="flex-1 text-right text-[13px] font-medium text-muted-foreground">
          Next Payment
        </div>
        <div className="flex-1 text-right text-[13px] font-medium text-muted-foreground">
          Amount
        </div>
        <div className="w-10" />
      </div>

      <div className="flex flex-col">
        {filteredSubscriptions.map((subscription, index) => (
          <div key={subscription.id}>
            {index > 0 && <div className="h-px bg-muted" />}
            <SubscriptionItem subscription={subscription} onDelete={handleDeleteClick} />
          </div>
        ))}
        {filteredSubscriptions.length === 0 && searchQuery && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No subscriptions matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
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
