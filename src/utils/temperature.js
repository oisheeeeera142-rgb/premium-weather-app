export const celsiusToFahrenheit =
  (value) => {
    return (
      (value * 9) / 5 + 32
    );
  };

export const fahrenheitToCelsius =
  (value) => {
    return (
      ((value - 32) * 5) /
      9
    );
  };

export const formatTemperature =
  (
    value,
    unit = "metric"
  ) => {
    if (
      value === undefined ||
      value === null
    ) {
      return "--°";
    }

    const rounded =
      Math.round(value);

    return unit ===
      "imperial"
      ? `${rounded}°F`
      : `${rounded}°C`;
  };

export const temperatureSymbol =
  (
    unit = "metric"
  ) => {
    return unit ===
      "imperial"
      ? "°F"
      : "°C";
  };