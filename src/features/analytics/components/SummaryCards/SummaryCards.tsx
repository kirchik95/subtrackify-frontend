import type { AnalyticsSummary } from '@/common/api';
import { Activity, DollarSign, Pause, TrendingDown, TrendingUp, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SummaryCardsProps {
  summary: AnalyticsSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const isPositiveChange = summary.changePercent >= 0;

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Monthly Spend - dark card */}
      <div className="flex flex-col rounded-3xl gap-4 bg-[#09090B] shadow-[0_4px_12px_#0000000D] p-8">
        <div className="flex items-center gap-2">
          <DollarSign className="size-5 text-white" />
          <span className="text-[15px] font-medium text-[#A1A1AA]">Monthly Spend</span>
        </div>
        <div className="text-4xl font-semibold text-white tracking-tight">
          ${summary.monthlyTotal.toFixed(2)}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 rounded-lg px-2 py-1',
              isPositiveChange ? 'bg-[#DC262633]' : 'bg-[#16A34A33]'
            )}
          >
            {isPositiveChange ? (
              <TrendingUp className="size-3 text-[#F87171]" />
            ) : (
              <TrendingDown className="size-3 text-[#22C55E]" />
            )}
            <span
              className={cn(
                'text-xs font-semibold',
                isPositiveChange ? 'text-[#F87171]' : 'text-[#4ADE80]'
              )}
            >
              {Math.abs(summary.changePercent).toFixed(1)}%
            </span>
          </div>
          <span className="text-[13px] text-[#A1A1AA]">vs last month</span>
        </div>
      </div>

      {/* Active */}
      <div className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8 gap-4">
        <div className="flex items-center gap-2">
          <Activity className="size-5 text-emerald-500" />
          <span className="text-[15px] font-medium text-muted-foreground">Active</span>
        </div>
        <div className="text-4xl font-semibold text-foreground tracking-tight">
          {summary.activeCount}
        </div>
        <span className="text-[13px] text-muted-foreground">of {summary.totalCount} total</span>
      </div>

      {/* Paused */}
      <div className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8 gap-4">
        <div className="flex items-center gap-2">
          <Pause className="size-5 text-amber-500" />
          <span className="text-[15px] font-medium text-muted-foreground">Paused</span>
        </div>
        <div className="text-4xl font-semibold text-foreground tracking-tight">
          {summary.pausedCount}
        </div>
        <span className="text-[13px] text-muted-foreground">subscriptions</span>
      </div>

      {/* Cancelled */}
      <div className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8 gap-4">
        <div className="flex items-center gap-2">
          <XCircle className="size-5 text-red-500" />
          <span className="text-[15px] font-medium text-muted-foreground">Cancelled</span>
        </div>
        <div className="text-4xl font-semibold text-foreground tracking-tight">
          {summary.cancelledCount}
        </div>
        <span className="text-[13px] text-muted-foreground">subscriptions</span>
      </div>
    </div>
  );
};
