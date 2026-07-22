
const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY;
 
  

const WEATHER_BASE_URL =
  import.meta.env.VITE_WEATHER_BASE_URL ||
  "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.error(
    "Missing VITE_OPENWEATHER_API_KEY in .env"
  );
}

const validateResponse = async (
  response
) => {
  if (!response.ok) {
    const error =
      await response
        .json()
        .catch(() => null);

    throw new Error(
      error?.message ||
        "Failed to fetch weather data"
    );
  }

  return response.json();
};

const buildUrl = (
  endpoint,
  params = {}
) => {
  const url = new URL(
    `${WEATHER_BASE_URL}/${endpoint}`
  );

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        url.searchParams.append(
          key,
          value
        );
      }
    }
  );

  url.searchParams.append(
    "appid",
    API_KEY
  );

  return url.toString();
};

export const getCurrentWeatherByCoords =
  async (
    lat,
    lon,
    units = "metric"
  ) => {
    const response =
      await fetch(
        buildUrl("weather", {
          lat,
          lon,
          units,
        })
      );

    return validateResponse(
      response
    );
  };

export const getCurrentWeatherByCity =
  async (
    city,
    units = "metric"
  ) => {
    const response =
      await fetch(
        buildUrl("weather", {
          q: city,
          units,
        })
      );

    return validateResponse(
      response
    );
  };

export const getForecastByCoords =
  async (
    lat,
    lon,
    units = "metric"
  ) => {
    const response =
      await fetch(
        buildUrl("forecast", {
          lat,
          lon,
          units,
        })
      );

    return validateResponse(
      response
    );
  };

export const getForecastByCity =
  async (
    city,
    units = "metric"
  ) => {
    const response =
      await fetch(
        buildUrl("forecast", {
          q: city,
          units,
        })
      );

    return validateResponse(
      response
    );
  };

export const getAirQuality =
  async (
    lat,
    lon
  ) => {
    const url = new URL(
      "https://api.openweathermap.org/data/2.5/air_pollution"
    );

    url.searchParams.append(
      "lat",
      lat
    );

    url.searchParams.append(
      "lon",
      lon
    );

    url.searchParams.append(
      "appid",
      API_KEY
    );

    const response =
      await fetch(
        url.toString()
      );

    return validateResponse(
      response
    );
  };

export const getWeatherBundle =
  async (
    lat,
    lon,
    units = "metric"
  ) => {
    const [
      current,
      forecast,
      airQuality,
    ] = await Promise.all([
      getCurrentWeatherByCoords(
        lat,
        lon,
        units
      ),
      getForecastByCoords(
        lat,
        lon,
        units
      ),
      getAirQuality(
        lat,
        lon
      ),
    ]);

    return {
      current,
      forecast,
      airQuality,
    };
  };

/*
|--------------------------------------------------------------------------
| Compatibility exports
|--------------------------------------------------------------------------
| Older files may call:
| getCurrentWeather(...)
| getForecast(...)
|--------------------------------------------------------------------------
*/

export const getCurrentWeather =
  async (
    lat,
    lon,
    units = "metric"
  ) => {
    return getCurrentWeatherByCoords(
      lat,
      lon,
      units
    );
  };

export const getForecast =
  async (
    lat,
    lon,
    units = "metric"
  ) => {
    return getForecastByCoords(
      lat,
      lon,
      units
    );
  };

export default {
  getCurrentWeatherByCoords,
  getCurrentWeatherByCity,

  getForecastByCoords,
  getForecastByCity,

  getCurrentWeather,
  getForecast,

  getAirQuality,
  getWeatherBundle,
};

