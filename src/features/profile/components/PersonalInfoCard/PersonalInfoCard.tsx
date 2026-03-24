import { useEffect } from 'react';

import { profileApi } from '@/common/api/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoCardProps {
  firstName: string;
  lastName: string;
  email: string;
  onProfileUpdated?: (name: string) => void;
}

export const PersonalInfoCard = ({
  firstName: initialFirstName,
  lastName: initialLastName,
  email,
  onProfileUpdated,
}: PersonalInfoCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
    },
  });

  useEffect(() => {
    reset({ firstName: initialFirstName, lastName: initialLastName });
  }, [initialFirstName, initialLastName, reset]);

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      const response = await profileApi.updateProfile(data);
      if (response.success) {
        toast.success('Profile updated successfully');
        onProfileUpdated?.(`${data.firstName} ${data.lastName}`.trim());
      } else {
        toast.error('Failed to update profile', { description: response.error });
      }
    } catch (error) {
      const apiError = error as { error?: string };
      toast.error('Failed to update profile', {
        description: apiError.error || 'Something went wrong',
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-7 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">First Name</Label>
            <Input
              className="h-auto rounded-xl px-4 py-3 text-sm"
              placeholder="John"
              aria-invalid={!!errors.firstName || undefined}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-[13px] text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Last Name</Label>
            <Input
              className="h-auto rounded-xl px-4 py-3 text-sm"
              placeholder="Doe"
              aria-invalid={!!errors.lastName || undefined}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-[13px] text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Email Address</Label>
            <Input className="h-auto rounded-xl px-4 py-3 text-sm" value={email} disabled />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Role</Label>
            <Input className="h-auto rounded-xl px-4 py-3 text-sm" value="User" disabled />
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
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
