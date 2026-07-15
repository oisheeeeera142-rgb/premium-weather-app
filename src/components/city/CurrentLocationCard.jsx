import {
MdMyLocation
} from "react-icons/md";


import GlassCard
from "../common/GlassCard";


function CurrentLocationCard({
location,
onOpen
}) {


return (

<GlassCard
className="
p-5
"
>


<button

onClick={onOpen}

className="
w-full
flex
items-center
gap-4
text-white
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

<MdMyLocation
size={26}
/>

</div>



<div
className="
text-left
"
>

<h3
className="
font-semibold
"
>

Current Location

</h3>


<p
className="
text-white/60
text-sm
"
>

{
location?.city ||
"Detecting..."
}

</p>


</div>


</button>


</GlassCard>

);


}


export default CurrentLocationCard;