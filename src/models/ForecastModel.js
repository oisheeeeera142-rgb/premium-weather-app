export default class ForecastModel {
  constructor({
    hourly = [],
    daily = []
  } = {}) {
    this.hourly = hourly;
    this.daily = daily;
  }

  static fromApi(apiData) {
    const hourly =
      apiData?.list
        ?.slice(0, 8)
        .map((item) => ({
          timestamp: item.dt,
          time: item.dt_txt,

          temperature:
            item.main.temp,

          minTemp:
            item.main.temp_min,

          maxTemp:
            item.main.temp_max,

          weather:
            item.weather[0].main,

          description:
            item.weather[0]
              .description,

          icon:
            item.weather[0].icon
        })) || [];

    const uniqueDays =
      new Map();

    apiData?.list?.forEach(
      (item) => {
        const day =
          item.dt_txt.split(
            " "
          )[0];

        if (
          !uniqueDays.has(day)
        ) {
          uniqueDays.set(
            day,
            item
          );
        }
      }
    );

    const daily =
      Array.from(
        uniqueDays.values()
      )
        .slice(0, 5)
        .map((item) => ({
          timestamp:
            item.dt,

          date:
            item.dt_txt,

          temperature:
            item.main.temp,

          minTemp:
            item.main.temp_min,

          maxTemp:
            item.main.temp_max,

          weather:
            item.weather[0]
              .main,

          icon:
            item.weather[0]
              .icon
        }));

    return new ForecastModel({
      hourly,
      daily
    });
  }

  toJSON() {
    return {
      hourly: this.hourly,
      daily: this.daily
    };
  }
}