import GlassCard from "../common/GlassCard";

import { formatTime } from "../../utils/dateFormatter";

import {
  MdWbSunny,
  MdNightlight,
} from "react-icons/md";

function SunriseSunsetCard({
  sunrise,
  sunset,
}) {
  const now = Date.now() / 1000;

  const progress =
    sunrise && sunset
      ? Math.min(
          100,
          Math.max(
            0,
            ((now - sunrise) /
              (sunset - sunrise)) *
              100
          )
        )
      : 0;

  return (
    <GlassCard
      className="
        relative
        overflow-hidden
        rounded-3xl
        p-6
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -right-12
          -top-12
          w-32
          h-32
          rounded-full
          bg-yellow-300/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6">

          <h3 className="text-white text-xl font-semibold">
            Sunrise & Sunset
          </h3>

          <p className="text-white/60 text-sm mt-1">
            Daylight Progress
          </p>

        </div>

        {/* Progress */}
        <div className="mb-8">

          <div className="relative">

            <div
              className="
                h-2
                rounded-full
                bg-white/10
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-yellow-300
                  via-orange-400
                  to-blue-400
                  transition-all
                  duration-500
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div
              className="
                absolute
                -top-3
                transition-all
                duration-500
              "
              style={{
                left: `calc(${progress}% - 12px)`,
              }}
            >
              ☀️
            </div>

          </div>

        </div>

        {/* Sunrise & Sunset */}
        <div
          className="
            grid
            grid-cols-2
            gap-5
          "
        >
          {/* Sunrise */}
          <div
            className="
              rounded-2xl
              bg-white/10
              p-4
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-full
                bg-yellow-400/20
                flex
                items-center
                justify-center
              "
            >
              <MdWbSunny
                size={28}
                className="text-yellow-300"
              />
            </div>

            <div>

              <p className="text-white/60 text-sm">
                Sunrise
              </p>

              <p className="text-white font-bold text-lg">
                {formatTime(sunrise)}
              </p>

            </div>

          </div>

          {/* Sunset */}
          <div
            className="
              rounded-2xl
              bg-white/10
              p-4
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-full
                bg-blue-400/20
                flex
                items-center
                justify-center
              "
            >
              <MdNightlight
                size={28}
                className="text-blue-200"
              />
            </div>

            <div>

              <p className="text-white/60 text-sm">
                Sunset
              </p>

              <p className="text-white font-bold text-lg">
                {formatTime(sunset)}
              </p>

            </div>

          </div>

        </div>

      </div>
    </GlassCard>
  );
}

export default SunriseSunsetCard;