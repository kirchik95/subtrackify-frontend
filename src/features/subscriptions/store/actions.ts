import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Subscription, SubscriptionFrequency } from '../../../common/entities/Subscription';

// Thunk для создания подписки
// В будущем здесь будет вызов API
export const createSubscription = createAsyncThunk(
  'subscriptions/create',
  async (data: { name: string; cost: number; frequency: SubscriptionFrequency }) => {
    // TODO: Заменить на реальный API вызов
    // const response = await api.post('/subscriptions', data);
    // return response.data;

    // Временная заглушка - данные будут сохранены через reducer в slice
    return data;
  }
);

// Thunk для получения всех подписок
// В будущем здесь будет вызов API
export const fetchSubscriptions = createAsyncThunk('subscriptions/fetchAll', async () => {
  // TODO: Заменить на реальный API вызов
  // const response = await api.get('/subscriptions');
  // return response.data;

  // Временная заглушка - данные загружаются из localStorage через slice
  return [];
});

// Thunk для обновления подписки
// В будущем здесь будет вызов API
export const updateSubscription = createAsyncThunk(
  'subscriptions/update',
  async (subscription: Subscription) => {
    // TODO: Заменить на реальный API вызов
    // const response = await api.put(`/subscriptions/${subscription.id}`, subscription);
    // return response.data;

    // Временная заглушка
    return subscription;
  }
);

// Thunk для удаления подписки
// В будущем здесь будет вызов API
export const deleteSubscription = createAsyncThunk('subscriptions/delete', async (id: string) => {
  // TODO: Заменить на реальный API вызов
  // await api.delete(`/subscriptions/${id}`);
  // return id;

  // Временная заглушка
  return id;
});
