import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import { fetchPreferences } from '@/features/profile/store/actions';
import { getPreferences, getPreferencesIsLoading } from '@/features/profile/store/selectors';

import { Skeleton } from '@/components/ui/skeleton';

import { AppearanceCard } from '../AppearanceCard';
import { DataExportCard } from '../DataExportCard';
import { NotificationsCard } from '../NotificationsCard';
import { RegionalCard } from '../RegionalCard';

function PreferencesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <Skeleton className="h-[240px] flex-1 rounded-3xl" />
        <Skeleton className="h-[240px] flex-1 rounded-3xl" />
      </div>
      <div className="flex gap-6">
        <Skeleton className="h-[320px] flex-1 rounded-3xl" />
        <Skeleton className="h-[200px] w-[420px] rounded-3xl" />
      </div>
    </div>
  );
}

export const PreferencesTab = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector(getPreferences);
  const isLoading = useAppSelector(getPreferencesIsLoading);

  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  if (isLoading && !preferences) {
    return <PreferencesSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <AppearanceCard
          theme={preferences?.appearance.theme ?? 'system'}
          compactMode={preferences?.appearance.compactMode ?? false}
        />
        <RegionalCard
          currency={preferences?.regional.currency ?? 'USD'}
          language={preferences?.regional.language ?? 'en'}
          timezone={preferences?.regional.timezone ?? 'UTC'}
        />
      </div>

      <div className="flex gap-6">
        <NotificationsCard notifications={preferences?.notifications ?? null} />
        <DataExportCard />
      </div>
    </div>
  );
};
