import { createSlice } from '@reduxjs/toolkit';
import { fetchSuggestions, selectPlace } from './placesThunks';

const initialState = {
  suggestions: [],
  suggestionsStatus: 'idle', // idle | loading | failed
  currentRequestId: null,
  selected: null,
  history: [],
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearSuggestions(state) {
      state.suggestions = [];
      state.suggestionsStatus = 'idle';
      state.currentRequestId = null;
    },
    selectFromHistory(state, action) {
      state.selected = action.payload;
    },
    clearHistory(state) {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state, { meta }) => {
        state.suggestionsStatus = 'loading';
        state.currentRequestId = meta.requestId;
      })
      .addCase(fetchSuggestions.fulfilled, (state, { meta, payload }) => {
        if (state.currentRequestId !== meta.requestId) return;
        state.suggestions = payload;
        state.suggestionsStatus = 'idle';
      })
      .addCase(fetchSuggestions.rejected, (state, { meta, payload }) => {
        if (state.currentRequestId !== meta.requestId) return;
        state.suggestionsStatus = 'failed';
        state.error = payload ?? 'Could not load suggestions';
      })
      .addCase(selectPlace.fulfilled, (state, { payload }) => {
        state.selected = payload;
        state.suggestions = [];
        state.error = null;
        state.history = [
          { ...payload, searchedAt: new Date().toISOString() },
          ...state.history,
        ];
      })
      .addCase(selectPlace.rejected, (state, { payload }) => {
        state.error = payload ?? 'Could not load place details';
      });
  },
});

export const { clearSuggestions, selectFromHistory, clearHistory } = placesSlice.actions;
export default placesSlice.reducer;