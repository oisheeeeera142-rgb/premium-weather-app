import GlassCard from "../common/GlassCard";

function WeatherDetailCard({
  icon,
  title,
  value,
  unit,
}) {
  return (
    <GlassCard
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        p-5
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:-translate-y-1
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-24
          h-24
          rounded-full
          bg-white/10
          blur-2xl
        "
      />

      <div className="relative z-10">

        {/* Icon */}
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-white/10
            flex
            items-center
            justify-center
            text-3xl
            text-white
            mb-5
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-white/20
          "
        >
          {icon}
        </div>

        {/* Title */}
        <p
          className="
            text-sm
            text-white/60
            font-medium
          "
        >
          {title}
        </p>

        {/* Value */}
        <div className="mt-2 flex items-end">

          <span
            className="
              text-3xl
              font-bold
              text-white
              leading-none
            "
          >
            {value ?? "--"}
          </span>

          {unit && (
            <span
              className="
                ml-1
                mb-1
                text-base
                text-white/70
              "
            >
              {unit}
            </span>
          )}

        </div>

      </div>
    </GlassCard>
  );
}

export default WeatherDetailCard;