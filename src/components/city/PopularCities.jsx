import {
POPULAR_CITIES
}
from "../../utils/constants";


import GlassCard
from "../common/GlassCard";



function PopularCities({
onSelect
}) {


return (

<div
className="
grid
grid-cols-2
gap-3
"
>


{
POPULAR_CITIES.map(
(city)=>(


<GlassCard

key={city}

className="
p-4
"

>


<button

onClick={() =>
onSelect({
name:city
})
}

className="
text-white
w-full
text-left
"

>

{city}

</button>


</GlassCard>


))
}


</div>


);


}


export default PopularCities;