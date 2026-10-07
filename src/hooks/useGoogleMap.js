import { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '../services/googleMaps';

const DEFAULT_CENTER = { lat: 3.139, lng: 101.6869 };

export default function useGoogleMap(containerRef, place) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadGoogleMaps();
      const { Map } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
      if (cancelled || !containerRef.current) return;

      mapRef.current = new Map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: 11,
        mapId: 'DEMO_MAP_ID',
      });
      markerRef.current = new AdvancedMarkerElement({ map: null });
    })();
    return () => {
      cancelled = true;
    };
  }, [containerRef]);

  useEffect(() => {
    if (!place || !mapRef.current || !markerRef.current) return;
    const position = { lat: place.lat, lng: place.lng };
    mapRef.current.panTo(position);
    mapRef.current.setZoom(15);
    markerRef.current.position = position;
    markerRef.current.title = place.name;
    markerRef.current.map = mapRef.current;
  }, [place]);
}