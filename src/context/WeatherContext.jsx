
import { reverseGeocode }
from "../services/api/geocodingApi";
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

  const capitalize = (
    text = ""
  ) => {
    return text.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );
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
Number(
(current.visibility/1000).toFixed(1)
),

      windSpeed:
Number(
(current.wind?.speed*3.6).toFixed(1)
),

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
        capitalize(
          current.weather?.[0]
            ?.description || ""
        ),

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
  forecastData,
  currentWeather
) => { const nowTimestamp = Math.floor(Date.now() / 1000);

const nextForecast = forecastData.list
  ?.filter((item) => item.dt > nowTimestamp)
  .slice(0, 7)
  .map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),

    timestamp: item.dt,

    temperature: Math.round(item.main?.temp || 0),

    icon: item.weather?.[0]?.icon || "01d",

    condition: item.weather?.[0]?.main || "Clear",

    pop: Math.round((item.pop || null) * 100),

    humidity: item.main?.humidity ?? 0,
  })) || [];

const hourly = [
  {
    time: "Now",

    timestamp: nowTimestamp,

    temperature: Math.round(currentWeather.main?.temp),

    icon: currentWeather.weather?.[0]?.icon,

    condition: currentWeather.weather?.[0]?.main,

    pop: 0,

    // ✅ নতুন যোগ করো
    humidity: currentWeather.main?.humidity ?? 0,
  },

  ...nextForecast,
];
  
    const dailyMap = {};

forecastData.list?.forEach((item) => {
  const date = new Date(item.dt * 1000).toDateString();
  const hour = new Date(item.dt * 1000).getHours();

  if (
    !dailyMap[date] ||
    Math.abs(hour - 12) <
      Math.abs(
        new Date(
          dailyMap[date].dt * 1000
        ).getHours() - 12
      )
  ) {
    dailyMap[date] = item;
  }
});

    const daily =
      Object.values(
        dailyMap
      )
        .slice(0, 5)
        .map((item) => ({
          day:
            new Date(
              item.dt * 1000
            ).toLocaleDateString(
              "en-US",
              {
                weekday: "short",
              }
            ),

          date: item.dt,
temperature:
  Math.round(
    item.main?.temp || 0
  ),

tempMin:
  Math.round(
    item.main?.temp_min || 0
  ),

tempMax:
  Math.round(
    item.main?.temp_max || 0
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

        console.log(
          "LAT:",
          lat
        );

        console.log(
          "LON:",
          lon
        );

        const data =
  await getWeatherBundle(
    lat,
    lon
  );

const locationInfo =
  await reverseGeocode(
    lat,
    lon
  );

const weatherData =
  buildWeatherObject(
    data.current
  );

weatherData.city =
  locationInfo?.city ||
  locationInfo?.town ||
  locationInfo?.municipality ||
  locationInfo?.village ||
  locationInfo?.county ||
  locationInfo?.name ||
  data.current?.name ||
  "Unknown";


weatherData.country =
  locationInfo?.country ||
  data.current?.sys?.country;

setWeather(weatherData);


setForecast(
  buildForecastObject(
    data.forecast,
    data.current
  )
);

       const aqiValue =
  data.airQuality
    ?.list?.[0]
    ?.main?.aqi;

setAqi(
  aqiValue ?? null
);
      } catch (err) {
        console.error(err);

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

          const weatherData =
  buildWeatherObject(
    current
  );


setWeather(
  weatherData
);

          setForecast(
  buildForecastObject(
    forecastData,
    current
  )
);

          setAqi(
            air?.list?.[0]
              ?.main?.aqi || 1
          );
        } catch (err) {
          console.error(err);

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
    forecast,
    aqi,
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