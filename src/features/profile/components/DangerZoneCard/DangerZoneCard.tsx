import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { DeleteAccountDialog } from '../DeleteAccountDialog';

export const DangerZoneCard = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 basis-0 flex-col justify-between gap-6 rounded-3xl border border-[#FECACA] bg-[#FEF2F2] p-8 shadow-[0_4px_12px_#00000005]">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
          <p className="text-sm leading-relaxed text-destructive">
            Once you delete your account, there is no going back. All your data will be permanently
            removed.
          </p>
        </div>

        <Button
          variant="destructive"
          className="h-10 w-fit rounded-xl px-4 text-sm"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete Account
        </Button>
      </div>

      <DeleteAccountDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </>
  );
};
