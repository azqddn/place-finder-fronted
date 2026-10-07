import FavouriteToggle from './FavouriteToggle';

export default function FavouriteButton({ place }) {
  return (
    <FavouriteToggle place={place}>
      {({ isFavourite, isPending, toggle }) => (
        <button
          type="button"
          className={`btn btn-sm ${isFavourite ? 'btn-warning' : 'btn-outline-warning'}`}
          disabled={isPending}
          aria-pressed={isFavourite}
          onClick={toggle}
        >
          {isPending ? 'Saving…' : isFavourite ? '★ Favourited' : '☆ Add favourite'}
        </button>
      )}
    </FavouriteToggle>
  );
}