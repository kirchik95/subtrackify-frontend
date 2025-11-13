import { useNavigate } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { useAppDispatch, useAppSelector } from '../common/store/hooks';
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
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </FieldContent>
            </Field>
          </FieldGroup>

          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
