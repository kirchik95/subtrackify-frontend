import { configureStore } from '@reduxjs/toolkit';

import { analyticsReducer } from '../../features/analytics/store/slice';
import { authReducer } from '../../features/auth/store/slice';
import { preferencesReducer } from '../../features/profile/store/slice';
import { subscriptionReducer } from '../../features/subscriptions/store/slice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionReducer,
    auth: authReducer,
    analytics: analyticsReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
