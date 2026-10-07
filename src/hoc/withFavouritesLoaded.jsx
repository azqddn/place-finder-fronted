import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavourites } from '../features/favourites/favouritesThunks';
import {
  selectFavouritesStatus,
  selectFavouritesError,
} from '../features/favourites/favouritesSlice';

export default function withFavouritesLoaded(WrappedComponent) {
  function WithFavouritesLoaded(props) {
    const dispatch = useDispatch();
    const status = useSelector(selectFavouritesStatus);
    const error = useSelector(selectFavouritesError);

    useEffect(() => {
      if (status === 'idle') dispatch(loadFavourites());
    }, [status, dispatch]);

    if (status === 'loading' || status === 'idle') {
      return <div className="text-muted small p-3">Loading favourites…</div>;
    }
    if (status === 'failed') {
      return (
        <div className="text-danger small p-3">
          {error}{' '}
          <button className="btn btn-link btn-sm p-0" onClick={() => dispatch(loadFavourites())}>
            Retry
          </button>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  }

  WithFavouritesLoaded.displayName = `withFavouritesLoaded(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithFavouritesLoaded;
}