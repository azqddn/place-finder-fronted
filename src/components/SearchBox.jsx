import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import { fetchSuggestions, selectPlace } from '../features/places/placesThunks';
import { clearSuggestions } from '../features/places/placesSlice';

export default function SearchBox() {
  const dispatch = useDispatch();
  const { suggestions, suggestionsStatus, error } = useSelector((s) => s.places);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query.trim(), 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) dispatch(fetchSuggestions(debouncedQuery));
    else dispatch(clearSuggestions());
  }, [debouncedQuery, dispatch]);

  const handlePick = (s) => {
    setQuery(s.description);
    dispatch(selectPlace(s.placeId));
  };

  return (
    <div className="position-relative">
      <label htmlFor="place-search" className="form-label fw-semibold">
        Search a place
      </label>
      <input
        id="place-search"
        className="form-control form-control-lg"
        placeholder="e.g. Petronas Twin Towers"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {suggestionsStatus === 'loading' && (
        <div className="form-text">Searching…</div>
      )}
      {error && <div className="text-danger small mt-1">{error}</div>}

      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow mt-1" style={{ zIndex: 1000 }}>
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => handlePick(s)}
              >
                <strong>{s.mainText}</strong>{' '}
                <span className="text-muted small">{s.secondaryText}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}