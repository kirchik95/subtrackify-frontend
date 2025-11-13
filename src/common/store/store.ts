import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../../features/auth/store/slice';
import { subscriptionReducer } from '../../features/subscriptions/store/slice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
