import GlassCard from "../common/GlassCard";

const getAQIStatus = (value) => {
  switch (value) {
    case 1:
      return {
        label: "Good",
        color: "#22c55e",
        progress: "20%",
      };

    case 2:
      return {
        label: "Fair",
        color: "#84cc16",
        progress: "40%",
      };

    case 3:
      return {
        label: "Moderate",
        color: "#facc15",
        progress: "60%",
      };

    case 4:
      return {
        label: "Poor",
        color: "#fb923c",
        progress: "80%",
      };

    case 5:
      return {
        label: "Very Poor",
        color: "#ef4444",
        progress: "100%",
      };

    default:
      return {
        label: "Unknown",
        color: "#6b7280",
        progress: "0%",
      };
  }
};

function AQICard({ aqi }) {
  if (!aqi) return null;

  const status = getAQIStatus(
    aqi.value ?? aqi
  );

  return (
    <GlassCard
      className="
        rounded-3xl
        p-6
        overflow-hidden
        relative
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          w-28
          h-28
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-white/70 text-sm">
              Air Quality
            </p>

            <h2 className="text-3xl font-bold text-white mt-1">
              {status.label}
            </h2>

            <p className="text-white/60 mt-2">
              AQI Level {aqi.value ?? aqi}/5
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
            "
            style={{
              background: status.color,
            }}
          >
            {aqi.value ?? aqi}
          </div>

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: status.progress,
                background: status.color,
              }}
            />

          </div>

        </div>

      </div>

    </GlassCard>
  );
}

export default AQICard;