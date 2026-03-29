import type { NotificationPreferences } from '@/common/api';
import { useAppDispatch } from '@/common/store/hooks';
import { updatePreferences } from '@/features/profile/store/actions';

import { Switch } from '@/components/ui/switch';

interface NotificationSetting {
  id: keyof NotificationPreferences;
  label: string;
  description: string;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'emailNotifications',
    label: 'Email notifications',
    description: 'Receive email alerts for upcoming payments.',
  },
  {
    id: 'pushNotifications',
    label: 'Push notifications',
    description: 'Get push notifications on your device.',
  },
  {
    id: 'paymentReminders',
    label: 'Reminder before renewal',
    description: 'Get reminded 3 days before a subscription renews.',
  },
  {
    id: 'weeklyReport',
    label: 'Weekly spending report',
    description: 'Receive a weekly summary of your subscriptions.',
  },
  {
    id: 'priceChangeAlerts',
    label: 'Price change alerts',
    description: 'Get notified when a subscription price changes.',
  },
  {
    id: 'marketingEmails',
    label: 'Marketing emails',
    description: 'Receive tips and product updates.',
  },
];

interface NotificationsCardProps {
  notifications: NotificationPreferences | null;
}

export const NotificationsCard = ({ notifications }: NotificationsCardProps) => {
  const dispatch = useAppDispatch();

  const handleToggle = (id: keyof NotificationPreferences) => {
    if (!notifications) return;
    dispatch(updatePreferences({ notifications: { [id]: !notifications[id] } }));
  };

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
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
                checked={notifications?.[setting.id] ?? false}
                onCheckedChange={() => handleToggle(setting.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
