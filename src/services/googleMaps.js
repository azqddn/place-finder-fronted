const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let loaderPromise;
let sessionToken;

export function loadGoogleMaps() {
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.importLibrary) return resolve();
    window.__gmapsReady = () => resolve();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&loading=async&v=weekly&callback=__gmapsReady`;
    script.async = true;
    script.onerror = () => {
      loaderPromise = null;
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });
  return loaderPromise;
}

export async function getSuggestions(input) {
  await loadGoogleMaps();
  const { AutocompleteSuggestion, AutocompleteSessionToken } =
    await google.maps.importLibrary('places');
  sessionToken ??= new AutocompleteSessionToken();

  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    sessionToken,
  });

  // Return plain serializable objects (Redux requirement)
  return suggestions.map(({ placePrediction }) => ({
    placeId: placePrediction.placeId,
    description: placePrediction.text.text,
    mainText: placePrediction.mainText?.text ?? placePrediction.text.text,
    secondaryText: placePrediction.secondaryText?.text ?? '',
  }));
}

export async function getPlaceDetails(placeId) {
  await loadGoogleMaps();
  const { Place } = await google.maps.importLibrary('places');
  const place = new Place({ id: placeId });
  await place.fetchFields({
    fields: ['displayName', 'formattedAddress', 'location'],
    ...(sessionToken && { sessionToken }),
  });
  sessionToken = undefined; // session ends after selection

  return {
    placeId,
    name: place.displayName,
    address: place.formattedAddress,
    lat: place.location.lat(),
    lng: place.location.lng(),
  };
}