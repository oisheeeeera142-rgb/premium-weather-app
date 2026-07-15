export default class WeatherModel {
  constructor(data = {}) {
    this.city = data.city || "";
    this.country = data.country || "";

    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;

    this.temperature = data.temperature || 0;
    this.feelsLike = data.feelsLike || 0;

    this.minTemp = data.minTemp || 0;
    this.maxTemp = data.maxTemp || 0;

    this.humidity = data.humidity || 0;
    this.pressure = data.pressure || 0;

    this.visibility = data.visibility || 0;

    this.windSpeed = data.windSpeed || 0;
    this.windDegree = data.windDegree || 0;

    this.sunrise = data.sunrise || 0;
    this.sunset = data.sunset || 0;

    this.weatherMain =
      data.weatherMain || "";

    this.description =
      data.description || "";

    this.icon = data.icon || "";

    this.timestamp =
      data.timestamp || Date.now();
  }

  static fromApi(apiData) {
    return new WeatherModel({
      city: apiData?.name || "",

      country:
        apiData?.sys?.country || "",

      latitude:
        apiData?.coord?.lat || 0,

      longitude:
        apiData?.coord?.lon || 0,

      temperature:
        apiData?.main?.temp || 0,

      feelsLike:
        apiData?.main?.feels_like || 0,

      minTemp:
        apiData?.main?.temp_min || 0,

      maxTemp:
        apiData?.main?.temp_max || 0,

      humidity:
        apiData?.main?.humidity || 0,

      pressure:
        apiData?.main?.pressure || 0,

      visibility:
        apiData?.visibility || 0,

      windSpeed:
        apiData?.wind?.speed || 0,

      windDegree:
        apiData?.wind?.deg || 0,

      sunrise:
        apiData?.sys?.sunrise || 0,

      sunset:
        apiData?.sys?.sunset || 0,

      weatherMain:
        apiData?.weather?.[0]?.main ||
        "",

      description:
        apiData?.weather?.[0]
          ?.description || "",

      icon:
        apiData?.weather?.[0]?.icon ||
        "",

      timestamp:
        apiData?.dt || Date.now()
    });
  }

  toJSON() {
    return {
      city: this.city,
      country: this.country,

      latitude: this.latitude,
      longitude: this.longitude,

      temperature:
        this.temperature,

      feelsLike:
        this.feelsLike,

      minTemp: this.minTemp,
      maxTemp: this.maxTemp,

      humidity:
        this.humidity,

      pressure:
        this.pressure,

      visibility:
        this.visibility,

      windSpeed:
        this.windSpeed,

      windDegree:
        this.windDegree,

      sunrise:
        this.sunrise,

      sunset:
        this.sunset,

      weatherMain:
        this.weatherMain,

      description:
        this.description,

      icon: this.icon,

      timestamp:
        this.timestamp
    };
  }
}