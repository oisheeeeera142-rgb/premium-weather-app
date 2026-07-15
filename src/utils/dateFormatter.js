export const formatTime =
  (
    timestamp,
    locale = "en-US"
  ) => {
    return new Date(
      timestamp * 1000
    ).toLocaleTimeString(
      locale,
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );
  };

export const formatHour =
  (
    dateString
  ) => {
    return new Date(
      dateString
    ).toLocaleTimeString(
      [],
      {
        hour: "numeric"
      }
    );
  };

export const formatDay =
  (
    dateString
  ) => {
    return new Date(
      dateString
    ).toLocaleDateString(
      [],
      {
        weekday: "short"
      }
    );
  };

export const formatFullDate =
  (
    dateString
  ) => {
    return new Date(
      dateString
    ).toLocaleDateString(
      [],
      {
        weekday: "long",
        month: "long",
        day: "numeric"
      }
    );
  };