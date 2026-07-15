const SETTINGS_KEY =
  "premium_weather_settings";

const DEFAULT_SETTINGS = {
  darkMode: true,
  notifications: true,
  weatherAlerts: true,
  temperatureUnit: "metric",
  hideBackground: false
};

export const getSettings = () => {
  try {
    const settings =
      localStorage.getItem(
        SETTINGS_KEY
      );

    return settings
      ? JSON.parse(settings)
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (
  settings
) => {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  );
};

export const updateSettings = (
  updates
) => {
  const current =
    getSettings();

  const next = {
    ...current,
    ...updates
  };

  saveSettings(next);

  return next;
};

export default {
  getSettings,
  saveSettings,
  updateSettings
};