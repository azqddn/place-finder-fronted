import useFavourite from '../hooks/useFavourite';

export default function FavouriteToggle({ place, children }) {
  return children(useFavourite(place));
}