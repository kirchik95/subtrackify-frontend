import { useState } from 'react';
import { useNavigate } from 'react-router';

import { profileApi } from '@/common/api/profile';
import { useAppDispatch } from '@/common/store/hooks';
import { logout } from '@/features/auth/store/actions';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isConfirmed = confirmText === 'DELETE';

  const handleDelete = async () => {
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      const response = await profileApi.deleteAccount();
      if (response.success) {
        toast.success('Account deleted successfully');
        dispatch(logout());
        navigate('/login');
      } else {
        toast.error('Failed to delete account', { description: response.error });
      }
    } catch (error) {
      const apiError = error as { error?: string };
      toast.error('Failed to delete account', {
        description: apiError.error || 'Something went wrong',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) setConfirmText('');
    onOpenChange(value);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-[480px] gap-6 rounded-3xl p-8">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="text-[22px] leading-7 tracking-[-0.02em]">
            Delete Account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-[22px]">
            This action cannot be undone. This will permanently delete your account, subscriptions,
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Type DELETE to confirm</p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="h-auto rounded-xl px-4 py-3 text-sm"
            placeholder="DELETE"
            autoComplete="off"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            className="rounded-xl px-5 py-2.5 text-sm"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-xl px-5 py-2.5 text-sm"
            disabled={!isConfirmed || isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <Spinner className="mr-2 size-4" />
                Deleting...
              </>
            ) : (
              'Delete Account'
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
