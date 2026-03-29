import type { CategoryBreakdown } from '@/common/api';
import { getCurrencySymbol } from '@/common/utils/formatPrice';
import { Tag } from 'lucide-react';
import { Cell, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface CategoryBreakdownChartProps {
  data: CategoryBreakdown[];
  currency: string;
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export const CategoryBreakdownChart = ({ data, currency }: CategoryBreakdownChartProps) => {
  const symbol = getCurrencySymbol(currency);
  const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
    acc[item.category || 'Uncategorized'] = {
      label: item.category || 'Uncategorized',
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {});

  const chartData = data.map((item, index) => ({
    name: item.category || 'Uncategorized',
    value: item.total,
    count: item.count,
    percentage: item.percentage,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8 h-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">By Category</h3>
        <p className="text-[13px] text-muted-foreground mt-1">Spending distribution</p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8">
          <Tag className="size-8 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">No category data</span>
        </div>
      ) : (
        <>
          <ChartContainer config={chartConfig} className="mx-auto h-[180px] w-[180px]">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${symbol}${Number(value).toFixed(2)}`}
                    hideIndicator
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                strokeWidth={2}
                stroke="var(--background)"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex flex-col gap-3 mt-6">
            {data.map((item, index) => (
              <div key={item.category || 'uncategorized'} className="flex items-center gap-3">
                <div
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="flex flex-1 items-center justify-between min-w-0">
                  <span className="text-sm text-foreground truncate">
                    {item.category || 'Uncategorized'}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {item.percentage.toFixed(0)}%
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {symbol}
                      {item.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
