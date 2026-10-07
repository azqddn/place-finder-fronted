import { configureStore } from '@reduxjs/toolkit';
import placesReducer from '../features/places/placesSlice';
import favouritesReducer from '../features/favourites/favouritesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    favourites: favouritesReducer,
  },
});