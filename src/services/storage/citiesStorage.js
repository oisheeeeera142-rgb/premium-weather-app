const RECENT_KEY = "weather_recent_cities";
const FAVORITES_KEY = "weather_favorite_cities";
const MAX_RECENT = 10;

const readList = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeList = (key, list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

const cityKey = (city) => `${city.lat}-${city.lon}`;

export const getRecentCities = () => readList(RECENT_KEY);

export const addRecentCity = (city) => {
  const existing = readList(RECENT_KEY).filter(
    (item) => cityKey(item) !== cityKey(city)
  );

  const updated = [city, ...existing].slice(0, MAX_RECENT);
  writeList(RECENT_KEY, updated);
  return updated;
};

export const getFavoriteCities = () => readList(FAVORITES_KEY);

export const isFavoriteCity = (city) =>
  readList(FAVORITES_KEY).some((item) => cityKey(item) === cityKey(city));

export const addFavoriteCity = (city) => {
  const existing = readList(FAVORITES_KEY);

  if (existing.some((item) => cityKey(item) === cityKey(city))) {
    return existing;
  }

  const updated = [...existing, city];
  writeList(FAVORITES_KEY, updated);
  return updated;
};

export const removeFavoriteCity = (city) => {
  const updated = readList(FAVORITES_KEY).filter(
    (item) => cityKey(item) !== cityKey(city)
  );

  writeList(FAVORITES_KEY, updated);
  return updated;
};

export const toggleFavoriteCity = (city) =>
  isFavoriteCity(city) ? removeFavoriteCity(city) : addFavoriteCity(city);