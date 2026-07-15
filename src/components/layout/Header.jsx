import {
  MdAdd,
  MdSettings
} from "react-icons/md";

import {
  useNavigate
} from "react-router-dom";


function Header({
  city,
  country
}) {


const navigate =
useNavigate();



return (

<header
className="
flex
items-center
justify-between
text-white
"
>


<div>

<h1
className="
text-2xl
font-bold
"
>

{city || "Loading..."}

</h1>


<p
className="
text-white/60
text-sm
"
>

{country}

</p>


</div>



<div
className="
flex
gap-3
"
>


<button

onClick={() =>
navigate("/cities")
}

className="
w-12
h-12
rounded-full
bg-white/10
backdrop-blur-xl
flex
items-center
justify-center
hover:bg-white/20
transition
"

>

<MdAdd
size={26}
/>

</button>



<button

onClick={() =>
navigate("/settings")
}

className="
w-12
h-12
rounded-full
bg-white/10
backdrop-blur-xl
flex
items-center
justify-center
hover:bg-white/20
transition
"

>

<MdSettings
size={25}
/>

</button>



</div>


</header>


);


}


export default Header;