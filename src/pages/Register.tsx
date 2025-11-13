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
import { register } from '../features/auth/store/actions';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Исключаем confirmPassword из данных перед отправкой
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const result = await dispatch(register(registerData));

    if (register.fulfilled.match(result)) {
      toast.success('Registration successful', {
        description: `Welcome, ${result.payload.user.name}!`,
      });
      navigate('/');
    } else {
      toast.error('Registration failed', {
        description: result.payload as string,
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...registerField('name')}
                  disabled={isLoading}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...registerField('email')}
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
                  {...registerField('password')}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...registerField('confirmPassword')}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
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
                Creating account...
              </>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
