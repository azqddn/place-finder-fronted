import { useDispatch, useSelector } from 'react-redux';
import withFavouritesLoaded from '../hoc/withFavouritesLoaded';
import { selectFavourites } from '../features/favourites/favouritesSlice';
import { selectFromHistory } from '../features/places/placesSlice';

function FavouritesList() {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);

  return (
    <div className="card shadow-sm">
      <div className="card-header fw-semibold">Favourites ({favourites.length})</div>
      {favourites.length === 0 ? (
        <div className="card-body text-muted">No favourites yet.</div>
      ) : (
        <ul className="list-group list-group-flush">
          {favourites.map((p) => (
            <li key={p.placeId}>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(selectFromHistory(p))}
              >
                <div className="fw-semibold">{p.name}</div>
                <div className="small text-muted">{p.address}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default withFavouritesLoaded(FavouritesList);