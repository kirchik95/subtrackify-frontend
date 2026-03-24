import { SUBSCRIPTION_COLORS } from '@/common/api';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-2">
      {SUBSCRIPTION_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            'size-8 rounded-full shrink-0 flex items-center justify-center transition-transform hover:scale-110',
            value === color && 'ring-2 ring-offset-2 ring-foreground'
          )}
          style={{ backgroundColor: color }}
        >
          {value === color && <Check className="size-4 text-white" />}
        </button>
      ))}
    </div>
  );
};
