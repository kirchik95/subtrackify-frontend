import { Suspense, use } from 'react';
import { Link, useSearchParams } from 'react-router';

import { authApi } from '@/common/api';
import { CheckCircle2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const verifyPromiseCache = new Map<string, Promise<{ success: boolean; message: string }>>();

function getVerifyPromise(token: string) {
  if (!verifyPromiseCache.has(token)) {
    verifyPromiseCache.set(
      token,
      authApi.verifyEmail(token).then((res) => ({
        success: res.success,
        message: res.success
          ? res.message || 'Email verified successfully'
          : res.error || 'Verification failed',
      }))
    );
  }
  return verifyPromiseCache.get(token)!;
}

function VerifyResult({ token }: { token: string }) {
  const result = use(getVerifyPromise(token));

  if (result.success) {
    return (
      <>
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Email verified!</h1>
        <p className="text-sm text-muted-foreground">{result.message}</p>
        <Button asChild className="mt-2 rounded-[12px]">
          <Link to="/">Go to Dashboard</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <XCircle className="size-8 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-2xl font-semibold text-foreground">Verification failed</h1>
      <p className="text-sm text-muted-foreground">{result.message}</p>
      <Button asChild variant="outline" className="mt-2 rounded-[12px]">
        <Link to="/">Go to Dashboard</Link>
      </Button>
    </>
  );
}

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <XCircle className="size-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Verification failed</h1>
        <p className="text-sm text-muted-foreground">Missing verification token</p>
        <Button asChild variant="outline" className="mt-2 rounded-[12px]">
          <Link to="/">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Suspense
        fallback={
          <>
            <Spinner className="size-8" />
            <h1 className="text-2xl font-semibold text-foreground">Verifying your email...</h1>
            <p className="text-sm text-muted-foreground">Please wait a moment.</p>
          </>
        }
      >
        <VerifyResult token={token} />
      </Suspense>
    </div>
  );
};
