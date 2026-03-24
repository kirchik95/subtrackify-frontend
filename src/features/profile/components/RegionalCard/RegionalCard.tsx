import { useState } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CURRENCIES = [
  { value: 'usd', label: 'USD ($)' },
  { value: 'eur', label: 'EUR (€)' },
  { value: 'gbp', label: 'GBP (£)' },
  { value: 'jpy', label: 'JPY (¥)' },
  { value: 'cad', label: 'CAD ($)' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
];

const TIMEZONES = [
  { value: 'utc-5', label: 'UTC-5 (Eastern Time)' },
  { value: 'utc-6', label: 'UTC-6 (Central Time)' },
  { value: 'utc-7', label: 'UTC-7 (Mountain Time)' },
  { value: 'utc-8', label: 'UTC-8 (Pacific Time)' },
  { value: 'utc+0', label: 'UTC+0 (GMT)' },
  { value: 'utc+1', label: 'UTC+1 (CET)' },
  { value: 'utc+9', label: 'UTC+9 (JST)' },
];

export const RegionalCard = () => {
  const [currency, setCurrency] = useState('usd');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('utc-5');

  return (
    <div className="flex flex-1 basis-0 flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Regional</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
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
          <Select value={language} onValueChange={setLanguage}>
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
          <Select value={timezone} onValueChange={setTimezone}>
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
