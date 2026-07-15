import {
  formatDay
} from "./dateFormatter";

export const isNightTime =
  (
    currentTime,
    sunrise,
    sunset
  ) => {
    return (
      currentTime <
        sunrise ||
      currentTime > sunset
    );
  };

export const normalizeCurrentWeather =
  (weather) => {
    return {
      city:
        weather.name,

      country:
        weather.sys.country,

      latitude:
        weather.coord.lat,

      longitude:
        weather.coord.lon,

      temperature:
        weather.main.temp,

      feelsLike:
        weather.main
          .feels_like,

      humidity:
        weather.main
          .humidity,

      pressure:
        weather.main
          .pressure,

      visibility:
        weather.visibility,

      windSpeed:
        weather.wind.speed,

      windDegree:
        weather.wind.deg,

      sunrise:
        weather.sys
          .sunrise,

      sunset:
        weather.sys
          .sunset,

      weatherMain:
        weather.weather[0]
          .main,

      description:
        weather.weather[0]
          .description,

      icon:
        weather.weather[0]
          .icon,

      minTemp:
        weather.main
          .temp_min,

      maxTemp:
        weather.main
          .temp_max,

      timestamp:
        weather.dt
    };
  };

export const buildHourlyForecast =
  (
    forecastData
  ) => {
    return forecastData.list
      .slice(0, 8)
      .map((item) => ({
        time:
          item.dt_txt,

        temp:
          item.main.temp,

        icon:
          item.weather[0]
            .icon,

        weather:
          item.weather[0]
            .main
      }));
  };

export const buildDailyForecast =
  (
    forecastData
  ) => {
    const dailyMap =
      new Map();

    forecastData.list.forEach(
      (item) => {
        const day =
          formatDay(
            item.dt_txt
          );

        if (
          !dailyMap.has(day)
        ) {
          dailyMap.set(
            day,
            item
          );
        }
      }
    );

    return Array.from(
      dailyMap.values()
    )
      .slice(0, 5)
      .map((item) => ({
        day:
          formatDay(
            item.dt_txt
          ),

        temp:
          item.main.temp,

        min:
          item.main.temp_min,

        max:
          item.main.temp_max,

        weather:
          item.weather[0]
            .main,

        icon:
          item.weather[0]
            .icon
      }));
  };

export const getUVPlaceholder =
  () => {
    return {
      index: 0,
      level: "N/A"
    };
  };