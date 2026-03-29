import { useAppDispatch } from '@/common/store/hooks';
import { updatePreferences } from '@/features/profile/store/actions';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

type Theme = 'light' | 'dark' | 'system';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

interface AppearanceCardProps {
  theme: Theme;
  compactMode: boolean;
}

export const AppearanceCard = ({ theme, compactMode }: AppearanceCardProps) => {
  const dispatch = useAppDispatch();
  const { setTheme: setAppTheme } = useTheme();

  const handleThemeChange = (value: Theme) => {
    setAppTheme(value);
    dispatch(updatePreferences({ appearance: { theme: value } }));
  };

  const handleCompactModeChange = (value: boolean) => {
    dispatch(updatePreferences({ appearance: { compactMode: value } }));
  };

  return (
    <div className="flex flex-1 basis-0 flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Appearance</h2>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Theme</span>
            <span className="text-[13px] text-muted-foreground">
              Select your preferred color theme.
            </span>
          </div>
          <div className="flex rounded-xl bg-muted p-1">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => handleThemeChange(t.value)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  theme === t.value
                    ? 'bg-background text-foreground shadow-[0_1px_3px_#0000001A]'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Compact mode</span>
            <span className="text-[13px] text-muted-foreground">
              Show more content with reduced spacing.
            </span>
          </div>
          <Switch checked={compactMode} onCheckedChange={handleCompactModeChange} />
        </div>
      </div>
    </div>
  );
};
