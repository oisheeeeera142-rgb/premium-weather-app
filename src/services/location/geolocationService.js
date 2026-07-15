export const getCurrentPosition =
  () =>
    new Promise(
      (resolve, reject) => {
        if (
          !navigator.geolocation
        ) {
          reject(
            new Error(
              "Geolocation not supported"
            )
          );
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve(position),
          (error) =>
            reject(error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      }
    );

export default {
  getCurrentPosition
};