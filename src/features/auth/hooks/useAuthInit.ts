import { useEffect, useRef } from 'react';

import { apiClient } from '@/common/api';

import { useAppDispatch, useAppSelector } from '../../../common/store/hooks';
import { getCurrentUser } from '../store/actions';
import { authActions } from '../store/slice';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, isInitializing, user } = useAppSelector(
    (state) => state.auth
  );
  const hasInitialized = useRef(false);

  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    // Если уже инициализировали, пропускаем
    if (hasInitialized.current) {
      return;
    }

    // Если пользователь уже авторизован и есть данные пользователя, завершаем инициализацию
    // Это происходит после успешного логина или регистрации
    if (isAuthenticated && user) {
      hasInitialized.current = true;
      dispatch(authActions.setInitializing(false));
      return;
    }

    // Если идет загрузка, пропускаем (ждем завершения текущего запроса)
    if (isLoading) {
      return;
    }

    // Проверяем, есть ли токен в localStorage
    const token = apiClient.getToken();
    console.log('token', token);

    // Вызываем /me только если есть токен, но пользователь еще не авторизован
    // Это происходит при перезагрузке страницы с сохраненным токеном
    if (token && !isAuthenticated) {
      hasInitialized.current = true;
      dispatch(getCurrentUser());
    } else if (!token) {
      // Нет токена, завершаем инициализацию
      hasInitialized.current = true;
      dispatch(authActions.setInitializing(false));
    }
  }, [dispatch, isAuthenticated, isLoading, isInitializing, user]);
};
