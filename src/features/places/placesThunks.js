import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSuggestions, getPlaceDetails } from '../../services/googleMaps';

export const fetchSuggestions = createAsyncThunk(
  'places/fetchSuggestions',
  async (input, { rejectWithValue }) => {
    try {
      return await getSuggestions(input);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const selectPlace = createAsyncThunk(
  'places/selectPlace',
  async (placeId, { rejectWithValue }) => {
    try {
      return await getPlaceDetails(placeId);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);