import { Navigate } from 'react-router';

import { useAppSelector } from '../store/hooks';

interface ProtectedRouterProps {
  children: React.ReactNode;
}

export const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Если пользователь не авторизован, перенаправляем на страницу логина
  // isInitializing уже обработан в AuthInitializer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если пользователь авторизован, рендерим дочерние элементы
  return <>{children}</>;
};
