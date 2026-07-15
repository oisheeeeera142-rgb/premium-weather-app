import GlassCard
from "../common/GlassCard";


function AQICard({
aqi
}) {


if(!aqi)
return null;


return (

<GlassCard
className="
p-5
mt-5
"
>

<div
className="
text-white
"
>


<p
className="
text-white/60
text-sm
"
>
Air Quality
</p>


<h3
className="
text-2xl
font-bold
"
>

{aqi.label}

</h3>


<p
className="
mt-2
"
>

AQI Level:
{aqi.index}

</p>


</div>


</GlassCard>

);


}


export default AQICard;