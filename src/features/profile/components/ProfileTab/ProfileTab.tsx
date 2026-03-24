import type { User } from '@/common/api/auth';

import { AvatarCard } from '../AvatarCard';
import { ChangePasswordCard } from '../ChangePasswordCard';
import { DangerZoneCard } from '../DangerZoneCard';
import { PersonalInfoCard } from '../PersonalInfoCard';

interface ProfileTabProps {
  user: User;
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return { firstName: parts[0] || '', lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  const { firstName, lastName } = splitName(user.name);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <AvatarCard name={user.name} email={user.email} />
        <PersonalInfoCard firstName={firstName} lastName={lastName} email={user.email} />
      </div>

      <div className="flex gap-6">
        <ChangePasswordCard />
        <DangerZoneCard />
      </div>
    </div>
  );
};
