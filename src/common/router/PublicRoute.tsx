import { Navigate } from 'react-router';

import { Spinner } from '@/components/ui/spinner';

import { useAppSelector } from '../store/hooks';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isInitializing } = useAppSelector((state) => state.auth);

  // Пока идет инициализация, показываем загрузку
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8 text-gray-500" />
      </div>
    );
  }

  // Если пользователь уже авторизован, перенаправляем на главную
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь не авторизован, показываем публичную страницу
  return <>{children}</>;
};
