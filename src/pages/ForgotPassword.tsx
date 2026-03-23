import { useState } from 'react';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { authApi } from '../common/api/auth';
import { AuthLayout } from '../common/ui/AuthLayout';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.forgotPassword(data.email);
      if (response.success) {
        setSubmittedEmail(data.email);
        setIsSubmitted(true);
      } else {
        toast.error('Request failed', {
          description: response.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      toast.error('Request failed', {
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Mail className="size-6 text-foreground" />
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.02em] text-foreground">
            Check your email
          </h1>
          <p className="text-[15px] leading-[22px] text-muted-foreground">
            We sent a password reset link to{' '}
            <span className="font-medium text-foreground">{submittedEmail}</span>
          </p>
        </div>

        {/* Resend */}
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-auto w-full rounded-[12px] py-3.5 text-[15px] font-medium"
            onClick={() => setIsSubmitted(false)}
          >
            Didn&apos;t receive the email? Resend
          </Button>
        </div>

        {/* Footer */}
        <div className="flex justify-center">
          <Link
            to="/login"
            viewTransition
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.02em] text-foreground">
          Forgot password?
        </h1>
        <p className="text-[15px] leading-[22px] text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Email address</Label>
          <Input
            type="email"
            placeholder="alex@example.com"
            className="h-auto rounded-[12px] px-4 py-3 text-sm"
            aria-invalid={!!errors.email || undefined}
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && <p className="text-[13px] text-destructive">{errors.email.message}</p>}
        </div>

        <Button
          type="submit"
          className="h-auto rounded-[12px] py-3.5 text-[15px] font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 size-4" />
              Sending...
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="flex justify-center">
        <Link
          to="/login"
          viewTransition
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};
