import SearchBox from './components/SearchBox';
import MapView from './components/MapView';
import SearchHistory from './components/SearchHistory';

export default function App() {
  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Place Finder</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="mb-3"><SearchBox /></div>
          <MapView />
        </div>
        <div className="col-lg-4">
          <SearchHistory />
        </div>
      </div>
    </div>
  );
}