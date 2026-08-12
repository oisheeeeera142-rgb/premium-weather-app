import {
  reverseGeocode,
  getMostSpecificLocality,
} from "../api/geocodingApi";

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 300000
};

export const GEOLOCATION_ERRORS = {
  NOT_SUPPORTED:
    "Geolocation is not supported by this browser.",

  PERMISSION_DENIED:
    "Location permission denied.",

  POSITION_UNAVAILABLE:
    "Location information unavailable.",

  TIMEOUT:
    "Location request timed out.",

  UNKNOWN:
    "Unknown location error."
};

const mapGeolocationError = (error) => {
  switch (error.code) {
    case 1:
      return GEOLOCATION_ERRORS.PERMISSION_DENIED;

    case 2:
      return GEOLOCATION_ERRORS.POSITION_UNAVAILABLE;

    case 3:
      return GEOLOCATION_ERRORS.TIMEOUT;

    default:
      return GEOLOCATION_ERRORS.UNKNOWN;
  }
};

export const isGeolocationSupported = () => {
  return "geolocation" in navigator;
};

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(
        new Error(
          GEOLOCATION_ERRORS.NOT_SUPPORTED
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

          accuracy:
            position.coords.accuracy,

          timestamp:
            position.timestamp
        });
      },

      (error) => {
        reject(
          new Error(
            mapGeolocationError(error)
          )
        );
      },

      GEO_OPTIONS
    );
  });
};

export const getCurrentLocationWithCity =
  async () => {
    const location =
      await getCurrentPosition();

    try {
      const address =
        await reverseGeocode(
          location.latitude,
          location.longitude
        );

      console.log(
        "GPS coordinates:",
        location.latitude,
        location.longitude
      );

      console.log(
        "Reverse geocoded address:",
        address
      );

      const displayLocation =
        getMostSpecificLocality(
          address
        );

      console.log(
        "Selected display location:",
        displayLocation
      );

      return {
        ...location,

        // Most specific populated locality (neighbourhood/suburb/etc),
        // NOT cityData.name — that field can be an unrelated nearby
        // place (e.g. "Sāmāir" instead of "Bashundhara R/A").
        city: displayLocation,

        state:
          address?.state || "",

        country:
          address?.country || ""
      };
    } catch {
      return {
        ...location,

        city: "Unknown City",
        state: "",
        country: ""
      };
    }
  };

export const getPermissionState =
  async () => {
    if (
      !navigator.permissions
    ) {
      return "prompt";
    }

    try {
      const permission =
        await navigator.permissions.query(
          {
            name: "geolocation"
          }
        );

      return permission.state;
    } catch {
      return "prompt";
    }
  };

export const watchLocation = (
  onSuccess,
  onError
) => {
  if (!isGeolocationSupported()) {
    onError?.(
      new Error(
        GEOLOCATION_ERRORS.NOT_SUPPORTED
      )
    );

    return null;
  }

  const watchId =
    navigator.geolocation.watchPosition(
      (position) => {
        onSuccess?.({
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

          accuracy:
            position.coords.accuracy,

          timestamp:
            position.timestamp
        });
      },

      (error) => {
        onError?.(
          new Error(
            mapGeolocationError(error)
          )
        );
      },

      {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 20000
      }
    );

  return watchId;
};

export const stopWatchingLocation = (
  watchId
) => {
  if (
    watchId !== null &&
    watchId !== undefined
  ) {
    navigator.geolocation.clearWatch(
      watchId
    );
  }
};

export const requestLocationPermission =
  async () => {
    try {
      const state =
        await getPermissionState();

      if (state === "granted") {
        return {
          granted: true,
          state
        };
      }

      await getCurrentPosition();

      return {
        granted: true,
        state: "granted"
      };
    } catch {
      return {
        granted: false,
        state: "denied"
      };
    }
  };

export const getLocationSummary =
  async () => {
    const location =
      await getCurrentLocationWithCity();

    return {
      latitude:
        location.latitude,

      longitude:
        location.longitude,

      city:
        location.city,

      state:
        location.state,

      country:
        location.country,

      label: [
        location.city,
        location.state,
        location.country
      ]
        .filter(Boolean)
        .join(", ")
    };
  };

const geolocationService = {
  isGeolocationSupported,
  getCurrentPosition,
  getCurrentLocationWithCity,
  getPermissionState,
  watchLocation,
  stopWatchingLocation,
  requestLocationPermission,
  getLocationSummary
};

export default geolocationService;