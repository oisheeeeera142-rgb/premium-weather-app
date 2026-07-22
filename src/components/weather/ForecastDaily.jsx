import GlassCard from "../common/GlassCard";

function ForecastDaily({ data = [] }) {
  if (!data.length) {
    return (
      <GlassCard className="p-6 text-center text-white/70">
        No 5-Day Forecast Available
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <GlassCard
          key={index}
          className="
            p-4
            rounded-3xl
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-white/10
          "
        >
          <div className="flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">

              <div className="text-lg font-semibold text-white w-14">
                {item.day}
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.condition}
                className="w-12 h-12"
              />

              <div>
                <p className="text-white font-medium">
                  {item.condition}
                </p>

                <p className="text-white/60 text-xs">
                  {new Date(item.date * 1000).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

              <span className="text-white/60 text-sm">
                {item.tempMin}°
              </span>

              <div
                className="
                  w-24
                  h-2
                  rounded-full
                  bg-white/20
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-yellow-300
                    to-orange-500
                    w-full
                  "
                />
              </div>

              <span className="text-white font-bold text-lg">
                {item.tempMax}°
              </span>

            </div>

          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export default ForecastDaily;