import { useState } from 'react';

import { Switch } from '@/components/ui/switch';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  defaultEnabled: boolean;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'email',
    label: 'Email notifications',
    description: 'Receive email alerts for upcoming payments.',
    defaultEnabled: true,
  },
  {
    id: 'push',
    label: 'Push notifications',
    description: 'Get push notifications on your device.',
    defaultEnabled: true,
  },
  {
    id: 'renewal',
    label: 'Reminder before renewal',
    description: 'Get reminded 3 days before a subscription renews.',
    defaultEnabled: false,
  },
  {
    id: 'report',
    label: 'Monthly spending report',
    description: 'Receive a monthly summary of your subscriptions.',
    defaultEnabled: true,
  },
];

export const NotificationsCard = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATION_SETTINGS.map((s) => [s.id, s.defaultEnabled]))
  );

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Notifications</h2>

      <div className="flex flex-col gap-5">
        {NOTIFICATION_SETTINGS.map((setting, index) => (
          <div key={setting.id}>
            {index > 0 && <div className="mb-5 h-px w-full bg-border" />}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">{setting.label}</span>
                <span className="text-[13px] text-muted-foreground">{setting.description}</span>
              </div>
              <Switch
                checked={settings[setting.id]}
                onCheckedChange={() => toggleSetting(setting.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
