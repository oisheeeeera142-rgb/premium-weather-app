import SunnyAnimation from "./SunnyAnimation";
import CloudyAnimation from "./CloudyAnimation";
import RainAnimation from "./RainAnimation";
import NightAnimation from "./NightAnimation";

function WeatherAnimation({
  condition
}) {
  const weather =
    condition?.toLowerCase() || "";

  if (
    weather.includes("rain") ||
    weather.includes("drizzle")
  ) {
    return <RainAnimation />;
  }

  if (
    weather.includes("cloud")
  ) {
    return <CloudyAnimation />;
  }

  if (
    weather.includes("night")
  ) {
    return <NightAnimation />;
  }

  return <SunnyAnimation />;
}

export default WeatherAnimation;