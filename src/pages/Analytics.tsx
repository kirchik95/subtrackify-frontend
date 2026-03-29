import { useEffect } from 'react';

import { pageVariants, sectionVariants } from '@/common/animations/page';
import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import {
  fetchAnalyticsSummary,
  fetchCategoryBreakdown,
  fetchSpendingHistory,
} from '@/features/analytics/store/actions';
import {
  getAnalyticsIsLoading,
  getAnalyticsSummary,
  getCategoryBreakdown,
  getSpendingHistory,
} from '@/features/analytics/store/selectors';
import { motion } from 'motion/react';

import { AnalyticsSkeleton } from '../features/analytics/components/AnalyticsSkeleton';
import { CategoryBreakdownChart } from '../features/analytics/components/CategoryBreakdownChart';
import { SpendingChart } from '../features/analytics/components/SpendingChart';
import { SummaryCards } from '../features/analytics/components/SummaryCards';

export const Analytics = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(getAnalyticsSummary);
  const spendingHistory = useAppSelector(getSpendingHistory);
  const categoryBreakdown = useAppSelector(getCategoryBreakdown);
  const isLoading = useAppSelector(getAnalyticsIsLoading);

  useEffect(() => {
    dispatch(fetchAnalyticsSummary());
    dispatch(fetchSpendingHistory());
    dispatch(fetchCategoryBreakdown());
  }, [dispatch]);

  if (isLoading && !summary) {
    return <AnalyticsSkeleton />;
  }

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div variants={sectionVariants}>
        <h1 className="text-[32px] font-semibold tracking-tight leading-10 text-foreground">
          Analytics
        </h1>
        <p className="text-[15px] text-muted-foreground mt-1">
          Track your spending patterns and subscription insights.
        </p>
      </motion.div>

      <motion.div variants={sectionVariants}>
        {summary && <SummaryCards summary={summary} />}
      </motion.div>

      <motion.div className="flex gap-6" variants={sectionVariants}>
        <div className="flex-[2] min-w-0">
          <SpendingChart data={spendingHistory} />
        </div>
        <div className="flex-1 min-w-0">
          <CategoryBreakdownChart data={categoryBreakdown} />
        </div>
      </motion.div>
    </motion.div>
  );
};
