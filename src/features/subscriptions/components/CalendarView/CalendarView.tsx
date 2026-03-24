import { useState } from 'react';
import { useNavigate } from 'react-router';

import { SUBSCRIPTION_COLORS } from '@/common/api';
import type { Subscription } from '@/common/entities/Subscription';
import { useAppSelector } from '@/common/store/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return SUBSCRIPTION_COLORS[Math.abs(hash) % SUBSCRIPTION_COLORS.length];
}

function getCalendarDays(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days: { date: number; month: number; year: number; isCurrentMonth: boolean }[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDay - i,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: d, month, year, isCurrentMonth: true });
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      date: d,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false,
    });
  }

  return days;
}

function getSubscriptionsForDay(
  subscriptions: Subscription[],
  day: number,
  month: number,
  year: number
) {
  return subscriptions.filter((sub) => {
    const billingDate = new Date(sub.nextBillingDate);
    return (
      billingDate.getDate() === day &&
      billingDate.getMonth() === month &&
      billingDate.getFullYear() === year &&
      sub.status === 'active'
    );
  });
}

const formatPrice = (price: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    RUB: '₽',
    JPY: '¥',
    CNY: '¥',
  };
  return `${symbols[currency] || currency}${price.toFixed(2)}`;
};

export const CalendarView = () => {
  const navigate = useNavigate();
  const subscriptions = useAppSelector((state) => state.subscriptions.items);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = getCalendarDays(currentYear, currentMonth);
  const weeks = Array.from({ length: 6 }, (_, i) => days.slice(i * 7, (i + 1) * 7));

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day: number, month: number, year: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-background p-8 gap-6 shadow-[0_4px_12px_#00000005]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">{monthName}</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="flex items-center justify-center size-8 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="flex items-center justify-center size-8 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col rounded-xl overflow-hidden border border-border">
        <div className="flex bg-muted/50 py-3">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="flex-1 text-center text-[13px] font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex border-t border-border">
            {week.map((day, dayIndex) => {
              const daySubs = getSubscriptionsForDay(subscriptions, day.date, day.month, day.year);
              const todayHighlight = isToday(day.date, day.month, day.year);

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    'flex-1 min-h-[100px] flex flex-col gap-1 p-2',
                    dayIndex > 0 && 'border-l border-border',
                    !day.isCurrentMonth && 'bg-muted/30'
                  )}
                >
                  <span
                    className={cn(
                      'text-[13px]',
                      todayHighlight
                        ? 'text-blue-600 font-medium'
                        : day.isCurrentMonth
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                    )}
                  >
                    {day.date}
                  </span>
                  {daySubs.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => navigate(`/subscription/${sub.id}`)}
                      className="rounded-sm bg-muted py-1 px-1.5 text-left transition-colors hover:bg-muted/80 cursor-pointer"
                      style={{ borderLeft: `3px solid ${sub.color || getColorFromName(sub.name)}` }}
                    >
                      <div className="text-[11px] leading-[14px] text-foreground truncate">
                        {sub.name}
                      </div>
                      <div className="text-[10px] leading-[12px] text-muted-foreground">
                        {formatPrice(sub.price, sub.currency)}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
