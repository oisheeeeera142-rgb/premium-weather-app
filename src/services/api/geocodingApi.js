export const searchLocations = async (query, limit = 6) => {
  if (!query || query.trim().length < 2) return [];

  const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
  url.searchParams.append("q", query.trim());
  url.searchParams.append("limit", limit);
  url.searchParams.append("appid", API_KEY); // reuse the same API_KEY constant already in this file

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  const data = await response.json();

  return data.map((item) => ({
    id: `${item.lat}-${item.lon}`,
    name: item.name,
    state: item.state,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
};

const API_KEY =
  import.meta.env
    .VITE_OPENWEATHER_API_KEY;
    

const GEO_BASE_URL =
  import.meta.env
    .VITE_GEO_BASE_URL ||
  "https://api.openweathermap.org/geo/1.0";

const validateResponse =
  async (response) => {
    if (!response.ok) {
      throw new Error(
        "Failed to fetch geocoding data"
      );
    }

    return response.json();
  };

export const searchCities =
  async (
    query,
    limit = 10
  ) => {
    if (!query?.trim()) {
      return [];
    }

    const url =
      `${GEO_BASE_URL}/direct?q=` +
      encodeURIComponent(query) +
      `&limit=${limit}` +
      `&appid=${API_KEY}`;

    const response =
      await fetch(url);

    const data =
      await validateResponse(
        response
      );

    return data.map(
      (city) => ({
        name: city.name,
        country:
          city.country,
        state:
          city.state || "",
        lat: city.lat,
        lon: city.lon,
      })
    );
  };

export const reverseGeocode =
  async (
    lat,
    lon,
    limit = 1
  ) => {
    const url =
      `${GEO_BASE_URL}/reverse?lat=${lat}` +
      `&lon=${lon}` +
      `&limit=${limit}` +
      `&appid=${API_KEY}`;

    const response =
      await fetch(url);

    const data =
      await validateResponse(
        response
      );

    return data?.[0] || null;
  };

export const getCoordinatesByCity =
  async (
    cityName
  ) => {
    const results =
      await searchCities(
        cityName,
        1
      );

    if (
      !results.length
    ) {
      throw new Error(
        "City not found"
      );
    }

    return results[0];
  };

export default {
  searchCities,
  reverseGeocode,
  getCoordinatesByCity,
};

