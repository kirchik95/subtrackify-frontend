import type { SpendingHistoryItem } from '@/common/api';
import { getCurrencySymbol } from '@/common/utils/formatPrice';
import { format, parse } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface SpendingChartProps {
  data: SpendingHistoryItem[];
  currency: string;
}

const chartConfig = {
  total: {
    label: 'Spending',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export const SpendingChart = ({ data, currency }: SpendingChartProps) => {
  const symbol = getCurrencySymbol(currency);
  const chartData = data.map((item) => ({
    month: format(parse(item.month, 'yyyy-MM', new Date()), 'MMM'),
    total: item.total,
  }));

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Spending History</h3>
        <p className="text-[13px] text-muted-foreground mt-1">
          Monthly spending over the last 12 months
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">
          No spending data available
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-total)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-total)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => `${symbol}${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `${symbol}${Number(value).toFixed(2)}`}
                  hideIndicator
                />
              }
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="url(#fillTotal)"
              stroke="var(--color-total)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  );
};
