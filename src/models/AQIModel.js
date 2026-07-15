export default class AQIModel {
  constructor(data = {}) {
    this.index =
      data.index || 0;

    this.label =
      data.label || "Unknown";

    this.color =
      data.color || "#94A3B8";

    this.co = data.co || 0;
    this.no = data.no || 0;
    this.no2 = data.no2 || 0;
    this.o3 = data.o3 || 0;
    this.so2 = data.so2 || 0;
    this.pm25 = data.pm25 || 0;
    this.pm10 = data.pm10 || 0;
    this.nh3 = data.nh3 || 0;
  }

  static fromApi(apiData) {
    const item =
      apiData?.list?.[0];

    if (!item) {
      return new AQIModel();
    }

    const aqi =
      item.main.aqi;

    const labels = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor"
    };

    const colors = {
      1: "#10B981",
      2: "#84CC16",
      3: "#FBBF24",
      4: "#FB923C",
      5: "#EF4444"
    };

    return new AQIModel({
      index: aqi,
      label:
        labels[aqi] ||
        "Unknown",

      color:
        colors[aqi] ||
        "#94A3B8",

      co:
        item.components.co,

      no:
        item.components.no,

      no2:
        item.components.no2,

      o3:
        item.components.o3,

      so2:
        item.components.so2,

      pm25:
        item.components.pm2_5,

      pm10:
        item.components.pm10,

      nh3:
        item.components.nh3
    });
  }

  toJSON() {
    return {
      index: this.index,
      label: this.label,
      color: this.color,

      co: this.co,
      no: this.no,
      no2: this.no2,
      o3: this.o3,
      so2: this.so2,

      pm25: this.pm25,
      pm10: this.pm10,
      nh3: this.nh3
    };
  }
}