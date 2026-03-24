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
  isLoading: boolean;
  error: string | null;
  addSubscriptionDialogOpen: boolean;
  editSubscriptionId: number | null;
}

const initialState: SubscriptionsState = {
  items: [],
  isLoading: false,
  error: null,
  addSubscriptionDialogOpen: false,
  editSubscriptionId: null,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setAddSubscriptionOpen: (state, action: PayloadAction<boolean>) => {
      state.addSubscriptionDialogOpen = action.payload;
    },
    setEditSubscriptionId: (state, action: PayloadAction<number | null>) => {
      state.editSubscriptionId = action.payload;
    },
    addSubscription: (state, action: PayloadAction<Omit<Subscription, 'id' | 'createdAt'>>) => {
      const newSubscription: Subscription = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      state.items.push(newSubscription);
    },
    removeSubscription: (state, action: PayloadAction<number>) => {
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
      .addCase(fetchSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch subscriptions';
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.items.push(action.payload);
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
