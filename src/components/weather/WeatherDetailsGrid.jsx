import {
  MdWaterDrop,
  MdAir,
  MdSpeed,
  MdVisibility,
  MdThermostat,
} from "react-icons/md";

import WeatherDetailCard from "./WeatherDetailCard";

function WeatherDetailsGrid({ weather }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >
      <WeatherDetailCard
        icon={<MdThermostat size={24} />}
        title="Feels Like"
        value={weather?.feelsLike}
        unit="°"
      />

      <WeatherDetailCard
        icon={<MdWaterDrop size={24} />}
        title="Humidity"
        value={weather?.humidity}
        unit="%"
      />

      <WeatherDetailCard
        icon={<MdAir size={24} />}
        title="Wind Speed"
        value={weather?.windSpeed}
        unit="km/h"
      />

      <WeatherDetailCard
        icon={<MdVisibility size={24} />}
        title="Visibility"
        value={weather?.visibility}
        unit="km"
      />

      <WeatherDetailCard
        icon={<MdSpeed size={24} />}
        title="Pressure"
        value={weather?.pressure}
        unit="hPa"
      />

      <WeatherDetailCard
        icon={<span className="text-xl">🌡️</span>}
        title="Max Temp"
        value={weather?.tempMax}
        unit="°"
      />

      <WeatherDetailCard
        icon={<span className="text-xl">❄️</span>}
        title="Min Temp"
        value={weather?.tempMin}
        unit="°"
      />

      <WeatherDetailCard
        icon={<span className="text-xl">☀️</span>}
        title="Condition"
        value={weather?.weatherMain}
        unit=""
      />
    </div>
  );
}

export default WeatherDetailsGrid;