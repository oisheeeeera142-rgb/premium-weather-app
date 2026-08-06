import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";

const AQI_STATUS = {
  1: {
    label: "Good",
    color: "#22c55e",
    progress: 20,
    description: "Air quality is satisfactory with little to no risk.",
  },
  2: {
    label: "Fair",
    color: "#84cc16",
    progress: 40,
    description: "Acceptable air quality for most people.",
  },
  3: {
    label: "Moderate",
    color: "#facc15",
    progress: 60,
    description: "Sensitive groups may experience minor effects.",
  },
  4: {
    label: "Poor",
    color: "#fb923c",
    progress: 80,
    description: "Health effects may be felt by sensitive groups.",
  },
  5: {
    label: "Very Poor",
    color: "#ef4444",
    progress: 100,
    description: "Health warnings — limit outdoor activity.",
  },
};

const DEFAULT_STATUS = {
  label: "Unknown",
  color: "#6b7280",
  progress: 0,
  description: "Air quality data isn't available right now.",
};

const getAQIStatus = (value) => AQI_STATUS[value] ?? DEFAULT_STATUS;

function AQICard({ aqi }) {
  if (!aqi) return null;

  const value = aqi.value ?? aqi;
  const status = getAQIStatus(value);

  return (
    <GlassCard
      className="
        rounded-[28px]
        p-6
        overflow-hidden
        relative
      "
    >
      {/* Glow */}
      <div
        className="absolute -right-10 -top-10 w-28 h-28 rounded-full blur-3xl"
        style={{ background: `${status.color}33` }}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Air Quality</p>

            <h2 className="text-3xl font-bold text-white mt-1">
              {status.label}
            </h2>

            <p className="text-white/60 mt-2 text-sm max-w-[220px]">
              {status.description}
            </p>
          </div>

          <div
            className="
              w-16
              h-16
              rounded-full
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-xl
              shrink-0
            "
            style={{ background: status.color }}
          >
            {value}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${status.progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: status.color }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-white/40 mt-2">
            <span>Good</span>
            <span>Moderate</span>
            <span>Very Poor</span>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}

export default AQICard;
