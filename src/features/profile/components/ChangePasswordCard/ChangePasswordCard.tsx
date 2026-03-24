import { useState } from 'react';

import { profileApi } from '@/common/api/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const ChangePasswordCard = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await profileApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password updated successfully');
        reset();
      } else {
        toast.error('Failed to update password', { description: response.error });
      }
    } catch (error) {
      const apiError = error as { error?: string };
      toast.error('Failed to update password', {
        description: apiError.error || 'Something went wrong',
      });
    }
  };

  return (
    <div className="flex flex-[2] basis-0 flex-col gap-7 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Current Password</Label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              className="h-auto rounded-xl px-4 py-3 pr-10 text-sm"
              placeholder="Enter current password"
              aria-invalid={!!errors.currentPassword || undefined}
              {...register('currentPassword')}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showCurrentPassword ? (
                <Eye className="size-[18px]" />
              ) : (
                <EyeOff className="size-[18px]" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-[13px] text-destructive">{errors.currentPassword.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">New Password</Label>
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                className="h-auto rounded-xl px-4 py-3 pr-10 text-sm"
                placeholder="Enter new password"
                aria-invalid={!!errors.newPassword || undefined}
                {...register('newPassword')}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <Eye className="size-[18px]" />
                ) : (
                  <EyeOff className="size-[18px]" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-[13px] text-destructive">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Confirm Password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                className="h-auto rounded-xl px-4 py-3 pr-10 text-sm"
                placeholder="Confirm new password"
                aria-invalid={!!errors.confirmPassword || undefined}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <Eye className="size-[18px]" />
                ) : (
                  <EyeOff className="size-[18px]" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[13px] text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-border pt-5">
          <Button
            type="submit"
            className="h-10 rounded-xl px-4 text-sm"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 size-4" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
