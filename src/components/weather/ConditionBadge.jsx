import {
  getWeatherIcon
}
from "../../utils/iconMapper";


function ConditionBadge({
  condition,
  description,
  night = false
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
        gap-4
        text-white
      "
    >

      <div className="relative shrink-0">

        {/* Ambient glow behind the icon, matches the rest of the card set */}
        <div
          className="
            absolute
            inset-0
            rounded-2xl
            bg-sky-400/20
            blur-xl
          "
        />

        <div
          className="
            relative
            flex
            items-center
            justify-center
            w-16
            h-16
            rounded-2xl
            bg-white/10
            border
            border-white/15
            backdrop-blur-md
          "
        >
          <Icon
            size={36}
            className="drop-shadow-sm"
          />
        </div>

      </div>


      <div>

        <p
          className="
            text-lg
            sm:text-xl
            font-bold
            tracking-tight
          "
        >

          {condition}

        </p>


        <p
          className="
            text-white/60
            text-sm
            capitalize
            mt-0.5
          "
        >

          {description}

        </p>

      </div>


    </div>

  );

}


export default ConditionBadge;
