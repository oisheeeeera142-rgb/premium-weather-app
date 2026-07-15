const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY;

const WEATHER_BASE_URL =
  import.meta.env.VITE_WEATHER_BASE_URL;

const validateResponse = async (
  response
) => {
  if (!response.ok) {
    throw new Error(
      "Failed to fetch air quality"
    );
  }

  return response.json();
};

export const getAQIByCoords = async (
  lat,
  lon
) => {
  const url =
    `${WEATHER_BASE_URL}/air_pollution?lat=${lat}` +
    `&lon=${lon}` +
    `&appid=${API_KEY}`;

  const response = await fetch(url);

  return validateResponse(response);
};

export const getAQILabel = (aqi) => {
  switch (aqi) {
    case 1:
      return "Good";

    case 2:
      return "Fair";

    case 3:
      return "Moderate";

    case 4:
      return "Poor";

    case 5:
      return "Very Poor";

    default:
      return "Unknown";
  }
};

export const getAQIColor = (aqi) => {
  switch (aqi) {
    case 1:
      return "#10B981";

    case 2:
      return "#84CC16";

    case 3:
      return "#FBBF24";

    case 4:
      return "#FB923C";

    case 5:
      return "#EF4444";

    default:
      return "#94A3B8";
  }
};

export const normalizeAQI = (
  apiResponse
) => {
  const data =
    apiResponse?.list?.[0];

  if (!data) {
    return null;
  }

  return {
    index: data.main.aqi,
    label: getAQILabel(
      data.main.aqi
    ),
    color: getAQIColor(
      data.main.aqi
    ),
    co: data.components.co,
    no: data.components.no,
    no2: data.components.no2,
    o3: data.components.o3,
    so2: data.components.so2,
    pm2_5:
      data.components.pm2_5,
    pm10:
      data.components.pm10,
    nh3: data.components.nh3
  };
};

export default {
  getAQIByCoords,
  getAQILabel,
  getAQIColor,
  normalizeAQI
};