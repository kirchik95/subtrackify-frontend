import { useAppDispatch } from '@/common/store/hooks';
import { updatePreferences } from '@/features/profile/store/actions';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (\u20AC)' },
  { value: 'GBP', label: 'GBP (\u00A3)' },
  { value: 'JPY', label: 'JPY (\u00A5)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'RUB', label: 'RUB (\u20BD)' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Espa\u00F1ol' },
  { value: 'fr', label: 'Fran\u00E7ais' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '\u65E5\u672C\u8A9E' },
  { value: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439' },
];

const TIMEZONES = [
  { value: 'America/New_York', label: 'UTC-5 (Eastern Time)' },
  { value: 'America/Chicago', label: 'UTC-6 (Central Time)' },
  { value: 'America/Denver', label: 'UTC-7 (Mountain Time)' },
  { value: 'America/Los_Angeles', label: 'UTC-8 (Pacific Time)' },
  { value: 'Europe/London', label: 'UTC+0 (GMT)' },
  { value: 'Europe/Paris', label: 'UTC+1 (CET)' },
  { value: 'Europe/Moscow', label: 'UTC+3 (MSK)' },
  { value: 'Asia/Tokyo', label: 'UTC+9 (JST)' },
];

interface RegionalCardProps {
  currency: string;
  language: string;
  timezone: string;
}

export const RegionalCard = ({ currency, language, timezone }: RegionalCardProps) => {
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (value: string) => {
    dispatch(updatePreferences({ regional: { currency: value } }));
  };

  const handleLanguageChange = (value: string) => {
    dispatch(updatePreferences({ regional: { language: value } }));
  };

  const handleTimezoneChange = (value: string) => {
    dispatch(updatePreferences({ regional: { timezone: value } }));
  };

  return (
    <div className="flex flex-1 basis-0 flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Regional</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Currency</Label>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="h-auto rounded-xl px-4 py-3 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Language</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-auto rounded-xl px-4 py-3 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Timezone</Label>
          <Select value={timezone} onValueChange={handleTimezoneChange}>
            <SelectTrigger className="h-auto rounded-xl px-4 py-3 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
