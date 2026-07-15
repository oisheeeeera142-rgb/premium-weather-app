export default class CityModel {
  constructor(data = {}) {
    this.name =
      data.name || "";

    this.country =
      data.country || "";

    this.state =
      data.state || "";

    this.lat =
      data.lat || 0;

    this.lon =
      data.lon || 0;
  }

  static fromApi(apiData) {
    return new CityModel({
      name:
        apiData.name || "",

      country:
        apiData.country || "",

      state:
        apiData.state || "",

      lat:
        apiData.lat || 0,

      lon:
        apiData.lon || 0
    });
  }

  static isValid(city) {
    return (
      city &&
      typeof city.name ===
        "string" &&
      city.name.length > 0 &&
      typeof city.lat ===
        "number" &&
      typeof city.lon ===
        "number"
    );
  }

  toJSON() {
    return {
      name: this.name,
      country:
        this.country,

      state: this.state,

      lat: this.lat,
      lon: this.lon
    };
  }
}