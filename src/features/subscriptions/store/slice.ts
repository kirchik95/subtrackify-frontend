import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Subscription } from '../../../common/entities/Subscription';
import { loadFromLocalStorage, saveToLocalStorage } from '../../../common/utils/localStorage';

interface SubscriptionsState {
  items: Subscription[];
  addSubscriptionDialogOpen: boolean;
}

const STORAGE_KEY = 'subtrackify_subscriptions';

const initialState: SubscriptionsState = {
  items: loadFromLocalStorage<Subscription[]>(STORAGE_KEY, []),
  addSubscriptionDialogOpen: false,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setAddSubscriptionOpen: (state, action: PayloadAction<boolean>) => {
      state.addSubscriptionDialogOpen = action.payload;
    },
    addSubscription: (state, action: PayloadAction<Omit<Subscription, 'id' | 'createdAt'>>) => {
      const newSubscription: Subscription = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      state.items.push(newSubscription);
      saveToLocalStorage(STORAGE_KEY, state.items);
    },
    removeSubscription: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((sub) => sub.id !== action.payload);
      saveToLocalStorage(STORAGE_KEY, state.items);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      const index = state.items.findIndex((sub) => sub.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage(STORAGE_KEY, state.items);
      }
    },
  },
});

export const { actions: subscriptionActions, reducer: subscriptionReducer } = subscriptionSlice;
