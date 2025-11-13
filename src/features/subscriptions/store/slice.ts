import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Subscription } from '../../../common/entities/Subscription';
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription as updateSubscriptionAction,
} from './actions';

interface SubscriptionsState {
  items: Subscription[];
  addSubscriptionDialogOpen: boolean;
}

const initialState: SubscriptionsState = {
  items: [],
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
    },
    removeSubscription: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((sub) => sub.id !== action.payload);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      const index = state.items.findIndex((sub) => sub.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateSubscriptionAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((sub) => sub.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.items = state.items.filter((sub) => sub.id !== action.payload);
      });
  },
});

export const { actions: subscriptionActions, reducer: subscriptionReducer } = subscriptionSlice;
