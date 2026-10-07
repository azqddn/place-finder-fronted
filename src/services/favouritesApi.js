import { apiClient } from './apiClient';

const toApi = ({ placeId, name, address, lat, lng }) => ({
  placeId,
  name,
  address,
  latitude: lat,
  longitude: lng,
});

const fromApi = ({ latitude, longitude, ...rest }) => ({
  ...rest,
  lat: latitude,
  lng: longitude,
});

export const fetchFavouritesApi = () =>
  apiClient.get('/favourites').then((r) => r.data.map(fromApi));

export const addFavouriteApi = (place) =>
  apiClient.post('/favourites', toApi(place)).then((r) => fromApi(r.data));

export const removeFavouriteApi = (placeId) =>
  apiClient.delete(`/favourites/${encodeURIComponent(placeId)}`);