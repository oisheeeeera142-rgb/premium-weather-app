export const formatTemperature = (temp) => {
  if (
    temp === undefined ||
    temp === null
  ) {
    return "--";
  }

  return `${Math.round(temp)}°`;
};