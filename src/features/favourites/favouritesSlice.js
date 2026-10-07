import { createSlice } from '@reduxjs/toolkit';
import { loadFavourites, addFavourite, removeFavourite } from './favouritesThunks';

const initialState = {
  items: [],
  loadStatus: 'idle', // idle | loading | succeeded | failed
  pendingIds: [],
  error: null,
};

const startPending = (state, placeId) => {
  state.pendingIds.push(placeId);
  state.error = null;
};
const endPending = (state, placeId) => {
  state.pendingIds = state.pendingIds.filter((id) => id !== placeId);
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavourites.pending, (state) => {
        state.loadStatus = 'loading';
        state.error = null;
      })
      .addCase(loadFavourites.fulfilled, (state, { payload }) => {
        state.loadStatus = 'succeeded';
        state.items = payload;
      })
      .addCase(loadFavourites.rejected, (state, { payload }) => {
        state.loadStatus = 'failed';
        state.error = payload ?? 'Could not load favourites';
      })

      .addCase(addFavourite.pending, (state, { meta }) => startPending(state, meta.arg.placeId))
      .addCase(addFavourite.fulfilled, (state, { meta, payload }) => {
        endPending(state, meta.arg.placeId);
        if (!state.items.some((f) => f.placeId === payload.placeId)) {
          state.items.unshift(payload);
        }
      })
      .addCase(addFavourite.rejected, (state, { meta, payload }) => {
        endPending(state, meta.arg.placeId);
        state.error = payload ?? 'Could not save favourite';
      })

      .addCase(removeFavourite.pending, (state, { meta }) => startPending(state, meta.arg))
      .addCase(removeFavourite.fulfilled, (state, { payload: placeId }) => {
        endPending(state, placeId);
        state.items = state.items.filter((f) => f.placeId !== placeId);
      })
      .addCase(removeFavourite.rejected, (state, { meta, payload }) => {
        endPending(state, meta.arg);
        state.error = payload ?? 'Could not remove favourite';
      });
  },
});

export const selectFavourites = (s) => s.favourites.items;
export const selectFavouritesStatus = (s) => s.favourites.loadStatus;
export const selectFavouritesError = (s) => s.favourites.error;
export const selectIsFavourite = (s, placeId) =>
  s.favourites.items.some((f) => f.placeId === placeId);
export const selectIsPending = (s, placeId) =>
  s.favourites.pendingIds.includes(placeId);

export default favouritesSlice.reducer;