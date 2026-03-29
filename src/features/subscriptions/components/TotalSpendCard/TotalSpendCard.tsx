import type { AnalyticsSummary } from '@/common/api';
import { getCurrencySymbol } from '@/common/utils/formatPrice';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface TotalSpendCardProps {
  summary: AnalyticsSummary | null;
}

export const TotalSpendCard = ({ summary }: TotalSpendCardProps) => {
  const symbol = getCurrencySymbol(summary?.currency || 'USD');
  const total = summary?.monthlyTotal ?? 0;
  const changePercent = summary?.changePercent ?? 0;
  const isPositiveChange = changePercent >= 0;

  return (
    <div className="flex flex-col rounded-3xl gap-4 bg-[#09090B] shadow-[0_4px_12px_#0000000D] p-8">
      <div className="flex items-center gap-2">
        <DollarSign className="size-5 text-white" />
        <span className="text-[15px] font-medium text-[#A1A1AA]">Total Monthly Spend</span>
      </div>
      <div className="text-5xl font-semibold text-white tracking-tight">
        {symbol}
        {total.toFixed(2)}
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
            {Math.abs(changePercent).toFixed(1)}%
          </span>
        </div>
        <span className="text-[13px] text-[#A1A1AA]">vs last month</span>
      </div>
    </div>
  );
};
