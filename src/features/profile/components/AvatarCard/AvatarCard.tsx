import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { AvatarUploadDialog } from '../AvatarUploadDialog';

interface AvatarCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export const AvatarCard = ({ name, email, avatarUrl }: AvatarCardProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="flex w-[420px] shrink-0 flex-col items-center gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
        <Avatar className="size-24">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-muted text-[28px] font-semibold text-muted-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="h-10 rounded-xl px-4 text-sm"
            onClick={() => setUploadDialogOpen(true)}
          >
            Upload new
          </Button>
          <Button variant="outline" className="h-10 rounded-xl px-4 text-sm" disabled={!avatarUrl}>
            Remove
          </Button>
        </div>
      </div>

      <AvatarUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        currentInitials={initials}
      />
    </>
  );
};
