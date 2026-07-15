import SunnyAnimation from "./SunnyAnimation";
import CloudyAnimation from "./CloudyAnimation";
import RainAnimation from "./RainAnimation";
import NightAnimation from "./NightAnimation";


function WeatherAnimationRenderer({
  condition,
  isNight = false
}) {


  if (isNight) {
    return (
      <NightAnimation />
    );
  }


  switch(condition) {

    case "Clear":
      return (
        <SunnyAnimation />
      );


    case "Clouds":
      return (
        <CloudyAnimation />
      );


    case "Rain":
    case "Drizzle":
    case "Thunderstorm":

      return (
        <RainAnimation />
      );


    default:

      return (
        <CloudyAnimation />
      );
  }

}


export default WeatherAnimationRenderer;