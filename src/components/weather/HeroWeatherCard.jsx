import GlassCard from "../common/GlassCard";


function WeatherDetailCard({
  icon,
  title,
  value,
  unit
}) {


return (

<GlassCard
className="
p-5
"
>

<div
className="
flex
flex-col
gap-3
text-white
"
>


<div
className="
text-3xl
text-white/80
"
>

{icon}

</div>



<p
className="
text-sm
text-white/60
"
>

{title}

</p>



<p
className="
text-xl
font-bold
"
>

{value}

<span
className="
text-sm
font-normal
ml-1
"
>

{unit}

</span>

</p>


</div>


</GlassCard>

);


}


export default WeatherDetailCard;