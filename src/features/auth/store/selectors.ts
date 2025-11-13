import type { RootState } from '@/common/store/store';

export const getAuthSelector = (state: RootState) => state.auth;

export const getUserSelector = (state: RootState) => state.auth.user;

export const getIsLoadingSelector = (state: RootState) => state.auth.isLoading;

export const getIsAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;

export const getIsInitializingSelector = (state: RootState) => state.auth.isInitializing;

export const getErrorSelector = (state: RootState) => state.auth.error;
