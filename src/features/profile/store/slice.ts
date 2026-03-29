import { createSlice } from '@reduxjs/toolkit';

import { fetchPreferences, updatePreferences, type UserPreferences } from './actions';

interface PreferencesState {
  data: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  data: null,
  isLoading: false,
  error: null,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch preferences';
      });

    builder.addCase(updatePreferences.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { reducer: preferencesReducer } = preferencesSlice;
