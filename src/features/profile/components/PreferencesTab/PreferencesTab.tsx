import { AppearanceCard } from '../AppearanceCard';
import { DataExportCard } from '../DataExportCard';
import { NotificationsCard } from '../NotificationsCard';
import { RegionalCard } from '../RegionalCard';

export const PreferencesTab = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <AppearanceCard />
        <RegionalCard />
      </div>

      <div className="flex gap-6">
        <NotificationsCard />
        <DataExportCard />
      </div>
    </div>
  );
};
