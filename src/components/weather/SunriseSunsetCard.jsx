import { motion } from "framer-motion";
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
            ((now - sunrise) / (sunset - sunrise)) * 100
          )
        )
      : 0;

  const isNight = sunrise && sunset ? now < sunrise || now > sunset : false;

  // Position the sun along a semicircular arc (SVG viewBox 0 0 300 100),
  // tracing the visual path of the sun rather than a straight bar.
  const angle = Math.PI * (1 - progress / 100);
  const arcRadius = 120;
  const cx = 150;
  const cy = 100;
  const sunX = cx - arcRadius * Math.cos(angle);
  const sunY = cy - arcRadius * Math.sin(angle);

  return (
    <GlassCard
      className="
        relative
        overflow-hidden
        rounded-[28px]
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
        <div className="mb-4">
          <h3 className="text-white text-xl font-semibold">
            Sunrise & Sunset
          </h3>

          <p className="text-white/60 text-sm mt-1">
            {isNight ? "It's dark out" : "Daylight Progress"}
          </p>
        </div>

        {/* Sun path illustration */}
        <div className="relative w-full h-[100px] mb-2">
          <svg
            viewBox="0 0 300 110"
            className="w-full h-full overflow-visible"
          >
            {/* Horizon line */}
            <line
              x1="10"
              y1="100"
              x2="290"
              y2="100"
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="4 4"
            />

            {/* Arc path */}
            <path
              d="M 30 100 A 120 120 0 0 1 270 100"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />

            {/* Traveled portion of the arc */}
            <path
              d="M 30 100 A 120 120 0 0 1 270 100"
              fill="none"
              stroke="url(#sunGradient)"
              strokeWidth="2.5"
              strokeDasharray="565"
              strokeDashoffset={565 - (565 * progress) / 100}
            />

            <defs>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>

            {/* Sun marker */}
            {!isNight && (
              <motion.circle
                cx={sunX}
                cy={sunY}
                r="7"
                fill="#fde047"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </svg>
        </div>

        {/* Sunrise & Sunset */}
        <div className="grid grid-cols-2 gap-5">
          {/* Sunrise */}
          <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <MdWbSunny size={28} className="text-yellow-300" />
            </div>

            <div>
              <p className="text-white/60 text-sm">Sunrise</p>
              <p className="text-white font-bold text-lg">
                {formatTime(sunrise)}
              </p>
            </div>
          </div>

          {/* Sunset */}
          <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
              <MdNightlight size={28} className="text-blue-200" />
            </div>

            <div>
              <p className="text-white/60 text-sm">Sunset</p>
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



