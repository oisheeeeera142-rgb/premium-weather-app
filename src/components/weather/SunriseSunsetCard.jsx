import GlassCard
from "../common/GlassCard";


import {
formatTime
}
from "../../utils/dateFormatter";


import {
MdWbSunny,
MdNightlight
}
from "react-icons/md";



function SunriseSunsetCard({

sunrise,

sunset

}) {


return (

<GlassCard

className="
p-5
"

>


<div
className="
grid
grid-cols-2
gap-5
text-white
"
>



<div
className="
flex
items-center
gap-3
"
>


<MdWbSunny
size={35}
className="
text-yellow-300
"
/>


<div>

<p
className="
text-white/60
text-sm
"
>

Sunrise

</p>


<p
className="
font-bold
"
>

{
formatTime(
sunrise
)
}

</p>


</div>


</div>





<div
className="
flex
items-center
gap-3
"
>


<MdNightlight
size={35}
className="
text-blue-200
"
/>


<div>


<p
className="
text-white/60
text-sm
"
>

Sunset

</p>


<p
className="
font-bold
"
>

{
formatTime(
sunset
)
}

</p>


</div>


</div>



</div>


</GlassCard>


);


}


export default SunriseSunsetCard;