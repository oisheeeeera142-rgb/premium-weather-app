
import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  getWeatherBundle,
  getCurrentWeatherByCoords,
  getForecastByCoords,
  getAirQuality,
} from "../services/api/weatherApi";

const WeatherContext = createContext(null);

export function WeatherProvider({
  children,
}) {
  const [weather, setWeather] =
    useState(null);

  const [forecast, setForecast] =
    useState({
      hourly: [],
      daily: [],
    });

  const [aqi, setAqi] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const clearError = () => {
    setError(null);
  };

  const buildWeatherObject = (
    current
  ) => {
    return {
      city: current.name,
      country:
        current.sys?.country,

      temperature:
        Math.round(
          current.main?.temp
        ),

      feelsLike:
        Math.round(
          current.main?.feels_like
        ),

      humidity:
        current.main?.humidity,

      pressure:
        current.main?.pressure,

      visibility:
        current.visibility,

      windSpeed:
        current.wind?.speed,

      tempMin:
        Math.round(
          current.main?.temp_min
        ),

      tempMax:
        Math.round(
          current.main?.temp_max
        ),

      weatherMain:
        current.weather?.[0]
          ?.main,

      description:
        current.weather?.[0]
          ?.description,

      icon:
        current.weather?.[0]
          ?.icon,

      sunrise:
        current.sys?.sunrise,

      sunset:
        current.sys?.sunset,

      lat:
        current.coord?.lat,

      lon:
        current.coord?.lon,
    };
  };

  const buildForecastObject = (
    forecastData
  ) => {
    const hourly =
      forecastData.list
        ?.slice(0, 8)
        ?.map((item) => ({
          time: item.dt,
          temp:
            Math.round(
              item.main.temp
            ),
          icon:
            item.weather?.[0]
              ?.icon,
        })) || [];

    const dailyMap = {};

    forecastData.list?.forEach(
      (item) => {
        const date =
          new Date(
            item.dt * 1000
          ).toDateString();

        if (
          !dailyMap[date]
        ) {
          dailyMap[date] =
            item;
        }
      }
    );

    const daily =
      Object.values(
        dailyMap
      )
        .slice(0, 5)
        .map((item) => ({
          date: item.dt,
          temp:
            Math.round(
              item.main.temp
            ),
          icon:
            item.weather?.[0]
              ?.icon,
          condition:
            item.weather?.[0]
              ?.main,
        }));

    return {
      hourly,
      daily,
    };
  };

  const loadCurrentLocationWeather =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const position =
          await new Promise(
            (
              resolve,
              reject
            ) => {
              navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                  enableHighAccuracy:
                    true,
                  timeout: 10000,
                }
              );
            }
          );

        const lat =
          position.coords
            .latitude;

        const lon =
          position.coords
            .longitude;

        const data =
          await getWeatherBundle(
            lat,
            lon
          );

        setWeather(
          buildWeatherObject(
            data.current
          )
        );

        setForecast(
          buildForecastObject(
            data.forecast
          )
        );

        setAqi(
          data.airQuality
            ?.list?.[0]
            ?.main?.aqi || 1
        );
      } catch (err) {
        setError(
          err?.message ||
            "Failed to load weather"
        );
      } finally {
        setLoading(false);
      }
    }, []);

  const loadCityWeather =
    useCallback(
      async (city) => {
        try {
          setLoading(true);
          setError(null);

          const current =
            await getCurrentWeatherByCoords(
              city.lat,
              city.lon
            );

          const forecastData =
            await getForecastByCoords(
              city.lat,
              city.lon
            );

          const air =
            await getAirQuality(
              city.lat,
              city.lon
            );

          setWeather(
            buildWeatherObject(
              current
            )
          );

          setForecast(
            buildForecastObject(
              forecastData
            )
          );

          setAqi(
            air?.list?.[0]
              ?.main?.aqi || 1
          );
        } catch (err) {
          setError(
            err?.message ||
              "Failed to load city weather"
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  const value = {
    weather,
    setWeather,

    forecast,
    setForecast,

    aqi,
    setAqi,

    loading,
    error,

    clearError,

    loadCurrentLocationWeather,
    loadCityWeather,
  };

  return (
    <WeatherContext.Provider
      value={value}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context =
    useContext(
      WeatherContext
    );

  if (!context) {
    throw new Error(
      "useWeather must be used within WeatherProvider"
    );
  }

  return context;
}

export default WeatherContext;

