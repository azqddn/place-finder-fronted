# Place Finder (Frontend)

A React app that uses Google Places autocomplete to find a place and show it on a map. Every search is stored in Redux, and places can be marked as favourites through the Place Finder API (separate repository).

## Features

- Autocomplete search box powered by Google Places API (New)
- Selected place is shown on a Google Map with a marker
- Search history stored in Redux
- Favourites saved through the backend API

## Tech Stack

- React (Vite)
- Redux Toolkit (Redux Thunk)
- Axios
- Bootstrap 5
- Google Maps JavaScript API and Places API (New)

## Prerequisites

- Node.js 20 or newer
- A Google Cloud project with billing enabled
- The backend API running (see the backend repository's README). Search and map work without it, but favourites will not.

## Setup

---
### 1. Create the Google API key

1. Open Google Cloud Console, then **APIs & Services → Library**.
2. Enable **Maps JavaScript API** and **Places API (New)**.
3. Go to **Credentials** and create an API key.
4. Restrict the key:
   - Application restriction: **Websites**, with `http://localhost:5173/*`
   - API restriction: **Maps JavaScript API** and **Places API (New)**

---
### 2. Start the backend

Follow the backend repository's README. The API should be running at `http://localhost:8080`.

---
### 3. Configure environment variables

Copy `.env.example` to `.env` (this file is git-ignored, so your key is not committed) and fill in your values:

```
VITE_GOOGLE_MAPS_API_KEY=<your Google API key>
VITE_API_BASE_URL=http://localhost:8080/api
```

> Vite reads `.env` only at startup. Restart `npm run dev` after changing it.

---
### 4. Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Project Structure

```
src/
├── app/                 Redux store
├── features/
│   ├── places/          slice and thunks for search and history
│   └── favourites/      slice and thunks for favourites
├── services/            Google Maps loader, axios client, favourites API
├── hooks/               useDebounce, useGoogleMap, useFavourite
├── hoc/                 withFavouritesLoaded
└── components/          SearchBox, MapView, SearchHistory, FavouritesList, FavouriteButton, FavouriteToggle
```

## Design Notes

- **Redux Thunk** (through `createAsyncThunk`) handles all async calls.
- **Debounced search** (300 ms) reduces Google API calls.
- **Stale response handling** uses a request ID so late responses never overwrite newer ones.
- **Session tokens** group autocomplete requests into one billing session.
- **Serializable state**: Redux holds only plain objects, never Google objects.
- **Patterns**: custom hooks (`useFavourite`), render props (`FavouriteToggle`) and a higher-order component (`withFavouritesLoaded`).
- The frontend uses `lat` and `lng`. `services/favouritesApi.js` converts them to `latitude` and `longitude` for the backend.

## Troubleshooting

| Problem | Fix |
|---|---|
| Favourites fail with a CORS error | Make sure the backend allows `http://localhost:5173` |
