import {
MdWaterDrop,
MdAir,
MdSpeed,
MdVisibility,
MdThermostat
}
from "react-icons/md";


import WeatherDetailCard
from "./WeatherDetailCard";


function WeatherDetailsGrid({
weather
}) {


return (

<div
className="
grid
grid-cols-2
md:grid-cols-4
gap-4
"
>


<WeatherDetailCard

icon={<MdWaterDrop/>}

title="Humidity"

value={weather.humidity}

unit="%"

/>



<WeatherDetailCard

icon={<MdAir/>}

title="Wind"

value={weather.windSpeed}

unit="m/s"

/>



<WeatherDetailCard

icon={<MdSpeed/>}

title="Pressure"

value={weather.pressure}

unit="hPa"

/>



<WeatherDetailCard

icon={<MdVisibility/>}

title="Visibility"

value={
weather.visibility/1000
}

unit="km"

/>



</div>

);


}


export default WeatherDetailsGrid;