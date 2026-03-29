import { useState } from 'react';

import { authApi } from '@/common/api';
import { Mail, X } from 'lucide-react';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner';

import { useAppSelector } from '../../store/hooks';

export const EmailVerificationBanner = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  const handleResend = async () => {
    setSending(true);
    try {
      const res = await authApi.sendVerification();
      if (res.success) {
        toast.success('Verification email sent');
      } else {
        toast.error(res.error || 'Failed to send verification email');
      }
    } catch {
      toast.error('Failed to send verification email');
    }
    setSending(false);
  };

  return (
    <div className="flex items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2.5 dark:border-amber-900 dark:bg-amber-950/50">
      <Mail className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
      <p className="flex-1 text-sm text-amber-800 dark:text-amber-200">
        Please verify your email address.{' '}
        <button
          onClick={handleResend}
          disabled={sending}
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:no-underline disabled:opacity-50"
        >
          {sending && <Spinner className="size-3" />}
          Resend email
        </button>
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-0.5 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
};
