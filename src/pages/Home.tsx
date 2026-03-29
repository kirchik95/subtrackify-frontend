import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';

import { pageVariants, sectionVariants, tabContentVariants } from '@/common/animations/page';
import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import { fetchAnalyticsSummary } from '@/features/analytics/store/actions';
import { fetchSubscriptions } from '@/features/subscriptions/store/actions';
import { Calendar, DollarSign, List } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { CalendarView } from '../features/subscriptions/components/CalendarView';
import { SubscriptionsList } from '../features/subscriptions/components/SubscriptionsList';
import { TotalSpendCard } from '../features/subscriptions/components/TotalSpendCard';
import { UpcomingPayments } from '../features/subscriptions/components/UpcomingPayments';

function SidebarSkeleton() {
  return (
    <>
      <div className="flex flex-col rounded-3xl gap-4 bg-[#09090B] shadow-[0_4px_12px_#0000000D] p-8">
        <div className="flex items-center gap-2">
          <DollarSign className="size-5 text-[#52525B]" />
          <div className="h-4 w-[140px] rounded-sm bg-[#27272A]" />
        </div>
        <div className="mt-1">
          <div className="h-12 w-[180px] rounded-lg bg-[#3F3F46]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[22px] w-[50px] rounded-lg bg-[#27272A]" />
          <div className="h-[14px] w-[90px] rounded-sm bg-[#27272A]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 w-[90px] rounded-sm bg-[#E4E4E7]" />
          <div className="h-4 w-[60px] rounded-sm bg-[#F4F4F5]" />
        </div>
        <div className="flex flex-col gap-4">
          {[
            { name: 'w-20', date: 'w-[50px]', price: 'w-[50px]' },
            { name: 'w-[100px]', date: 'w-[60px]', price: 'w-[60px]' },
            { name: 'w-[70px]', date: 'w-10', price: 'w-[45px]' },
          ].map((row, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px bg-[#F4F4F5] mb-4" />}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-[10px] bg-[#F4F4F5] shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <div className={`h-4 rounded-sm bg-[#E4E4E7] ${row.name}`} />
                    <div className={`h-3 rounded-sm bg-[#F4F4F5] ${row.date}`} />
                  </div>
                </div>
                <div className={`h-4 rounded-sm bg-[#E4E4E7] ${row.price}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const viewMode = location.pathname === '/calendar' ? 'calendar' : 'list';
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const isLoading = useAppSelector((state) => state.subscriptions.isLoading);
  const summary = useAppSelector((state) => state.analytics.summary);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchAnalyticsSummary());
  }, [dispatch]);

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div className="flex items-end justify-between" variants={sectionVariants}>
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight leading-10 text-foreground">
            Dashboard
          </h1>
          <p className="text-[15px] text-muted-foreground mt-1">
            Overview of your monthly spending and subscriptions.
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-muted p-1">
          <Link
            to="/calendar"
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all no-underline',
              viewMode === 'calendar'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Calendar className="size-4" />
            Calendar
          </Link>
          <Link
            to="/list"
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all no-underline',
              viewMode === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="size-4" />
            List
          </Link>
        </div>
      </motion.div>

      <motion.div className="flex gap-6" variants={sectionVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            className="flex-[2] min-w-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabContentVariants}
          >
            {viewMode === 'list' ? <SubscriptionsList /> : <CalendarView />}
          </motion.div>
        </AnimatePresence>
        <div className="flex-1 flex flex-col gap-6">
          {isLoading && subscriptions.length === 0 ? (
            <SidebarSkeleton />
          ) : (
            <>
              <TotalSpendCard summary={summary} />
              <UpcomingPayments subscriptions={subscriptions} />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
