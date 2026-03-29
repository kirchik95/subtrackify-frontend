import { useNavigate } from 'react-router';

import type { Subscription } from '@/common/entities/Subscription';
import { formatPrice } from '@/common/utils/formatPrice';
import { CalendarDays } from 'lucide-react';

import { SubscriptionIcon } from '../SubscriptionIcon';

interface UpcomingPaymentsProps {
  subscriptions: Subscription[];
}

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const UpcomingPayments = ({ subscriptions }: UpcomingPaymentsProps) => {
  const navigate = useNavigate();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const upcoming = subscriptions
    .filter((sub) => {
      if (sub.status !== 'active') return false;
      const billingDate = new Date(sub.nextBillingDate);
      return billingDate.getMonth() === currentMonth && billingDate.getFullYear() === currentYear;
    })
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime());

  return (
    <div className="flex-1 flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-semibold text-foreground">This Month</h3>
        <span className="text-[13px] font-medium text-muted-foreground">
          {upcoming.length} Active
        </span>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8">
          <CalendarDays className="size-8 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">No upcoming payments</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {upcoming.map((sub, index) => (
            <div key={sub.id}>
              {index > 0 && <div className="h-px bg-muted mb-4" />}
              <button
                onClick={() => navigate(`/subscription/${sub.id}`)}
                className="flex items-center justify-between w-full rounded-xl p-2 -m-2 transition-colors hover:bg-accent/50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <SubscriptionIcon name={sub.name} color={sub.color} />
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatShortDate(sub.nextBillingDate)}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {formatPrice(sub.price, sub.currency)}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
