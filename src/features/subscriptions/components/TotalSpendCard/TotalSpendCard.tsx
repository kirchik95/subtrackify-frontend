import type { Subscription } from '@/common/entities/Subscription';
import { DollarSign, TrendingUp } from 'lucide-react';

interface TotalSpendCardProps {
  subscriptions: Subscription[];
}

function normalizeToMonthly(price: number, billingCycle: string): number {
  switch (billingCycle) {
    case 'daily':
      return price * 30;
    case 'weekly':
      return price * 4.33;
    case 'yearly':
      return price / 12;
    default:
      return price;
  }
}

export const TotalSpendCard = ({ subscriptions }: TotalSpendCardProps) => {
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active');

  const totalMonthly = activeSubscriptions.reduce(
    (sum, sub) => sum + normalizeToMonthly(sub.price, sub.billingCycle),
    0
  );

  return (
    <div className="flex flex-col rounded-3xl gap-4 bg-[#09090B] shadow-[0_4px_12px_#0000000D] p-8">
      <div className="flex items-center gap-2">
        <DollarSign className="size-5 text-white" />
        <span className="text-[15px] font-medium text-[#A1A1AA]">Total Monthly Spend</span>
      </div>
      <div className="text-5xl font-semibold text-white tracking-tight">
        ${totalMonthly.toFixed(2)}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg bg-[#16A34A33] px-2 py-1">
          <TrendingUp className="size-3 text-[#22C55E]" />
          <span className="text-xs font-semibold text-[#4ADE80]">0.0%</span>
        </div>
        <span className="text-[13px] text-[#A1A1AA]">vs last month</span>
      </div>
    </div>
  );
};
