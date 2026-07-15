export const isString =
  (value) => {
    return (
      typeof value ===
      "string"
    );
  };

export const isNumber =
  (value) => {
    return (
      typeof value ===
        "number" &&
      !Number.isNaN(value)
    );
  };

export const isValidLatitude =
  (lat) => {
    return (
      isNumber(lat) &&
      lat >= -90 &&
      lat <= 90
    );
  };

export const isValidLongitude =
  (lon) => {
    return (
      isNumber(lon) &&
      lon >= -180 &&
      lon <= 180
    );
  };

export const isValidCity =
  (city) => {
    if (!city) {
      return false;
    }

    return (
      isString(city.name) &&
      city.name.length > 0 &&
      isValidLatitude(
        city.lat
      ) &&
      isValidLongitude(
        city.lon
      )
    );
  };

export const isNonEmptyArray =
  (value) => {
    return (
      Array.isArray(
        value
      ) &&
      value.length > 0
    );
  };