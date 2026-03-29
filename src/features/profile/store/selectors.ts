import type { RootState } from '@/common/store/store';

export const getPreferences = (state: RootState) => state.preferences.data;
export const getPreferencesIsLoading = (state: RootState) => state.preferences.isLoading;
