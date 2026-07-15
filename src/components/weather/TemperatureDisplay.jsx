import {
  formatTemperature
} from "../../utils/temperature";


function TemperatureDisplay({
  temperature,
  unit="metric"
}) {

  return (

    <div
      className="
        flex
        items-start
        justify-center
        text-white
      "
    >

      <span
        className="
          text-7xl
          md:text-8xl
          font-extrabold
          tracking-tight
        "
      >

        {
          Math.round(
            temperature
          )
        }

      </span>


      <span
        className="
          text-3xl
          mt-3
          font-semibold
        "
      >

        {
          unit === "metric"
          ? "°C"
          : "°F"
        }

      </span>


    </div>

  );

}


export default TemperatureDisplay;