import { Spinner } from '@/components/ui/spinner';

import { useAppSelector } from '../../../common/store/hooks';
import { useAuthInit } from '../hooks/useAuthInit';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  useAuthInit();
  const { isInitializing } = useAppSelector((state) => state.auth);

  // Пока идет инициализация (проверка токена и запрос /me), показываем загрузку
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-8 text-gray-500" />
      </div>
    );
  }

  return <>{children}</>;
};
