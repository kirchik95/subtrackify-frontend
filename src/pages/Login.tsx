import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { useAppDispatch, useAppSelector } from '../common/store/hooks';
import { AuthLayout } from '../common/ui/AuthLayout';
import { login } from '../features/auth/store/actions';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      toast.success('Login successful', {
        description: `Welcome back, ${result.payload.user.name}!`,
      });
      navigate('/');
    } else {
      toast.error('Login failed', {
        description: result.payload as string,
      });
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[32px] font-semibold text-foreground">Welcome back</h1>
        <p className="text-[15px] font-medium text-muted-foreground">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Email address</Label>
          <Input
            type="email"
            placeholder="alex@example.com"
            className="h-11"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="h-11 pr-10"
              {...register('password')}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <Eye className="size-[18px]" /> : <EyeOff className="size-[18px]" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">
              Remember me
            </Label>
          </div>
          <button type="button" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button type="submit" className="mt-2 h-11 text-[15px] font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="mr-2 size-4" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Social login */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" type="button" className="h-11 text-sm font-semibold" disabled>
          <svg className="size-[18px]" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm font-medium text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
