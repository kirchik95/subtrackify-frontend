import { SUBSCRIPTION_COLORS } from '@/common/api';

import { cn } from '@/lib/utils';

interface SubscriptionIconProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return SUBSCRIPTION_COLORS[Math.abs(hash) % SUBSCRIPTION_COLORS.length];
}

const sizeClasses = {
  sm: 'size-8 text-sm',
  md: 'size-10 text-base',
  lg: 'size-14 text-xl',
};

export const SubscriptionIcon = ({
  name,
  color,
  size = 'md',
  className,
}: SubscriptionIconProps) => {
  const bgColor = color || getColorFromName(name);
  const letter = name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[10px] shrink-0 font-semibold text-white',
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {letter}
    </div>
  );
};
