import { useDispatch, useSelector } from 'react-redux';
import { clearHistory, selectFromHistory } from '../features/places/placesSlice';

export default function SearchHistory() {
  const dispatch = useDispatch();
  const history = useSelector((s) => s.places.history);

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-semibold">Search history ({history.length})</span>
        {history.length > 0 && (
          <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(clearHistory())}>
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="card-body text-muted">No searches yet.</div>
      ) : (
        <ul className="list-group list-group-flush">
          {history.map((p) => (
            <li key={p.searchedAt}>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(selectFromHistory(p))}
              >
                <div className="fw-semibold">{p.name}</div>
                <div className="small text-muted">{p.address}</div>
                <div className="small text-secondary">
                  {new Date(p.searchedAt).toLocaleString()}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}