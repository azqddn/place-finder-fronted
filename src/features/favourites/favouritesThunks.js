import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFavouritesApi,
  addFavouriteApi,
  removeFavouriteApi,
} from '../../services/favouritesApi';

export const loadFavourites = createAsyncThunk(
  'favourites/load',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFavouritesApi();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addFavourite = createAsyncThunk(
  'favourites/add',
  async (place, { rejectWithValue }) => {
    try {
      return await addFavouriteApi(place);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  'favourites/remove',
  async (placeId, { rejectWithValue }) => {
    try {
      await removeFavouriteApi(placeId);
      return placeId;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);