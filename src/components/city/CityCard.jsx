import {
  MdDelete,
  MdLocationCity
} from "react-icons/md";

import GlassCard
from "../common/GlassCard";


function CityCard({
  city,
  onSelect,
  onRemove
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
items-center
justify-between
text-white
"
>


<button

onClick={() =>
onSelect(city)
}

className="
flex
items-center
gap-4
text-left
flex-1
"

>


<div
className="
w-12
h-12
rounded-full
bg-white/10
flex
items-center
justify-center
"

>

<MdLocationCity
size={26}
/>

</div>



<div>

<h3
className="
font-semibold
text-lg
"
>

{city.name}

</h3>


<p
className="
text-white/60
text-sm
"
>

{city.country}

</p>


</div>


</button>




<button

onClick={() =>
onRemove(city.name)
}

className="
w-10
h-10
rounded-full
bg-red-500/20
flex
items-center
justify-center
hover:bg-red-500/30
transition
"

>

<MdDelete
className="
text-red-300
"
/>


</button>



</div>


</GlassCard>


);


}


export default CityCard;