import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useGoogleMap from '../hooks/useGoogleMap';

export default function MapView() {
  const containerRef = useRef(null);
  const selected = useSelector((s) => s.places.selected);
  useGoogleMap(containerRef, selected);

  return (
    <div className="card shadow-sm">
      {selected && (
        <div className="card-header">
          <div className="fw-semibold">{selected.name}</div>
          <div className="small text-muted">{selected.address}</div>
        </div>
      )}
      <div ref={containerRef} style={{ height: 420 }} />
    </div>
  );
}