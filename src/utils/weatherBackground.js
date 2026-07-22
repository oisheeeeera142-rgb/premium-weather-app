export const getWeatherBackground = (
  condition,
  isNight
) => {
  if (isNight) {
    return "/backgrounds/night.jpg";
  }

  switch (
    condition?.toLowerCase()
  ) {
    case "clear":
      return "/backgrounds/sunny.jpg";

    case "rain":
    case "drizzle":
      return "/backgrounds/rain.jpg";

    case "clouds":
      return "/backgrounds/clouds.jpg";

    case "thunderstorm":
      return "/backgrounds/storm.jpg";

    default:
      return "/backgrounds/default.jpg";
  }
};