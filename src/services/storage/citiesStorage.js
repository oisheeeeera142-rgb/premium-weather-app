const RECENT_KEY = "weather_recent_cities";
const FAVORITES_KEY = "weather_favorite_cities";
const MAX_RECENT = 10;

const readRaw = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (err) {
    console.error(`Failed to write ${key} to localStorage:`, err);
  }
};

const toFixedCoord = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return num.toFixed(6);
};

export const buildCityKey = (city) => {
  const lat = toFixedCoord(city?.lat);
  const lon = toFixedCoord(city?.lon);
  if (lat === null || lon === null) return null;
  return `${lat}-${lon}`;
};

export const isValidCity = (city) => {
  if (!city) return false;
  const lat = Number(city.lat);
  const lon = Number(city.lon);
  return (
    typeof city.name === "string" &&
    city.name.trim().length > 0 &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
};

export const normalizeCity = (city) => {
  if (!isValidCity(city)) {
    console.error("normalizeCity: invalid city, refusing to normalize", city);
    return null;
  }
  const lat = Number(city.lat);
  const lon = Number(city.lon);
  const key = buildCityKey({ lat, lon });
  return {
    id: city.id || key,
    name: city.name,
    country: city.country || "",
    state: city.state || "",
    lat,
    lon,
  };
};

export const getRecentCities = () => {
  const list = readRaw(RECENT_KEY);
  return list.map(normalizeCity).filter(Boolean);
};

export const addRecentCity = (city) => {
  const normalized = normalizeCity(city);
  if (!normalized) {
    console.error("addRecentCity: refusing to save invalid city", city);
    return getRecentCities();
  }
  const key = buildCityKey(normalized);
  const existing = getRecentCities().filter(
    (item) => buildCityKey(item) !== key
  );
  const updated = [normalized, ...existing].slice(0, MAX_RECENT);
  writeList(RECENT_KEY, updated);
  return updated;
};

export const getFavoriteCities = () => {
  const rawList = readRaw(FAVORITES_KEY);
  const normalized = rawList.map(normalizeCity).filter(Boolean);
  if (JSON.stringify(rawList) !== JSON.stringify(normalized)) {
    writeList(FAVORITES_KEY, normalized);
  }
  return normalized;
};

export const isFavoriteCity = (city) => {
  const key = buildCityKey(city);
  if (!key) return false;
  return getFavoriteCities().some((item) => buildCityKey(item) === key);
};

export const addFavoriteCity = (city) => {
  const normalized = normalizeCity(city);
  if (!normalized) {
    console.error("addFavoriteCity: refusing to save invalid city", city);
    return getFavoriteCities();
  }
  const key = buildCityKey(normalized);
  const existing = getFavoriteCities();
  if (existing.some((item) => buildCityKey(item) === key)) {
    return existing;
  }
  const updated = [...existing, normalized];
  writeList(FAVORITES_KEY, updated);
  return updated;
};

export const removeFavoriteCity = (city) => {
  const key = buildCityKey(city);
  const existing = getFavoriteCities();
  if (!key) return existing;
  const updated = existing.filter((item) => buildCityKey(item) !== key);
  writeList(FAVORITES_KEY, updated);
  return updated;
};

export const toggleFavoriteCity = (city) => {
  console.log("Favorite clicked:", city);
  const normalized = normalizeCity(city);
  console.log("Favorite normalized city:", normalized);
  if (!normalized) {
    console.error("toggleFavoriteCity: invalid city, ignoring", city);
    return getFavoriteCities();
  }
  const result = isFavoriteCity(normalized)
    ? removeFavoriteCity(normalized)
    : addFavoriteCity(normalized);
  console.log("Favorites after toggle:", result);
  return result;
};

export default {
  getRecentCities,
  addRecentCity,
  getFavoriteCities,
  isFavoriteCity,
  addFavoriteCity,
  removeFavoriteCity,
  toggleFavoriteCity,
  normalizeCity,
  buildCityKey,
  isValidCity,
};