export const getWeatherBackground =
  (
    condition,
    isNight = false
  ) => {
    if (isNight) {
      return {
        gradient:
          "bg-nightGradient"
      };
    }

    switch (
      condition
    ) {
      case "Clear":
        return {
          gradient:
            "bg-weatherGradient"
        };

      case "Clouds":
        return {
          gradient:
            "bg-slate-700"
        };

      case "Rain":
      case "Drizzle":
        return {
          gradient:
            "bg-rainGradient"
        };

      case "Thunderstorm":
        return {
          gradient:
            "bg-gray-900"
        };

      case "Snow":
        return {
          gradient:
            "bg-sky-200"
        };

      default:
        return {
          gradient:
            "bg-weatherGradient"
        };
    }
  };