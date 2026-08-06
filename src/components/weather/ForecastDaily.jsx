import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";

function ForecastDaily({ data = [] }) {
  if (!data.length) {
    return (
      <GlassCard className="p-6 text-center text-white/70">
        No 5-Day Forecast Available
      </GlassCard>
    );
  }

  // Global min/max across the week so every bar is positioned
  // relative to the same scale — this is what makes the strip
  // read like a real range instead of five disconnected bars.
  const allMins = data.map((d) => Number(d.tempMin));
  const allMaxs = data.map((d) => Number(d.tempMax));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const span = Math.max(globalMax - globalMin, 1);

  return (
    <GlassCard className="rounded-[28px] p-3 sm:p-4">
      <div className="divide-y divide-white/5">
        {data.map((item, index) => {
          const min = Number(item.tempMin);
          const max = Number(item.tempMax);
          const left = ((min - globalMin) / span) * 100;
          const width = Math.max(((max - min) / span) * 100, 8);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="
                flex
                items-center
                justify-between
                gap-3
                py-3.5
                px-2
                rounded-2xl
                transition-colors
                duration-300
                hover:bg-white/5
              "
            >
              {/* Left: day + icon + condition */}
              <div className="flex items-center gap-3 w-[38%] min-w-0">
                <span className="text-sm font-semibold text-white w-11 shrink-0">
                  {index === 0 ? "Today" : item.day}
                </span>

                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  alt={item.condition}
                  className="w-9 h-9 shrink-0"
                  loading="lazy"
                />

                <span className="text-white/70 text-xs truncate hidden sm:block">
                  {item.condition}
                </span>
              </div>

              {/* Right: min - range bar - max */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-white/50 text-sm w-8 text-right shrink-0">
                  {min}°
                </span>

                <div className="relative flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                    className="
                      absolute
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-300
                      via-amber-300
                      to-orange-400
                    "
                    style={{ left: `${left}%` }}
                  />
                </div>

                <span className="text-white font-bold text-sm w-8 shrink-0">
                  {max}°
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default ForecastDaily;
