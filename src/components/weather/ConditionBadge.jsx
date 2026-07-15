import {
  getWeatherIcon
}
from "../../utils/iconMapper";


function ConditionBadge({
  condition,
  description,
  night=false
}) {


  const Icon =
    getWeatherIcon(
      condition,
      night
    );


  return (

    <div
      className="
        flex
        items-center
        gap-3
        text-white
      "
    >

      <Icon
        size={48}
      />


      <div>

        <p
          className="
            text-xl
            font-semibold
          "
        >

          {condition}

        </p>


        <p
          className="
            text-white/70
            capitalize
          "
        >

          {description}

        </p>

      </div>


    </div>

  );

}


export default ConditionBadge;