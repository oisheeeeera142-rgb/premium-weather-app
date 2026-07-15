export default class SettingsModel {
  constructor(data = {}) {
    this.darkMode =
      data.darkMode ?? true;

    this.temperatureUnit =
      data.temperatureUnit ??
      "metric";

    this.notifications =
      data.notifications ??
      false;

    this.dailyAlerts =
      data.dailyAlerts ??
      false;

    this.hideBackground =
      data.hideBackground ??
      false;
  }

  static default() {
    return new SettingsModel({
      darkMode: true,

      temperatureUnit:
        "metric",

      notifications:
        false,

      dailyAlerts:
        false,

      hideBackground:
        false
    });
  }

  static fromStorage(
    storedData
  ) {
    return new SettingsModel(
      storedData
    );
  }

  toJSON() {
    return {
      darkMode:
        this.darkMode,

      temperatureUnit:
        this
          .temperatureUnit,

      notifications:
        this.notifications,

      dailyAlerts:
        this.dailyAlerts,

      hideBackground:
        this.hideBackground
    };
  }
}