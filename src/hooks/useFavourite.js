import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsFavourite,
  selectIsPending,
} from '../features/favourites/favouritesSlice';
import { addFavourite, removeFavourite } from '../features/favourites/favouritesThunks';

export default function useFavourite(place) {
  const dispatch = useDispatch();
  const isFavourite = useSelector((s) => selectIsFavourite(s, place.placeId));
  const isPending = useSelector((s) => selectIsPending(s, place.placeId));

  const toggle = useCallback(() => {
    if (isPending) return;
    dispatch(isFavourite ? removeFavourite(place.placeId) : addFavourite(place));
  }, [dispatch, isFavourite, isPending, place]);

  return { isFavourite, isPending, toggle };
}