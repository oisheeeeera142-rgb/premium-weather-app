import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiNightClear,
  WiSnow,
  WiThunderstorm,
  WiFog
} from "react-icons/wi";

export const getWeatherIcon =
  (
    weatherMain,
    isNight = false
  ) => {
    switch (
      weatherMain
    ) {
      case "Clear":
        return isNight
          ? WiNightClear
          : WiDaySunny;

      case "Clouds":
        return WiCloud;

      case "Rain":
      case "Drizzle":
        return WiRain;

      case "Thunderstorm":
        return WiThunderstorm;

      case "Snow":
        return WiSnow;

      case "Mist":
      case "Fog":
      case "Haze":
        return WiFog;

      default:
        return WiDaySunny;
    }
  };