import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { WiRaindrop, WiSunrise, WiSunset } from "react-icons/wi";

import GlassCard from "../common/GlassCard";

// Width of one graph-point / timeline-item band. Fixed (not a Tailwind
// breakpoint) on purpose — the graph and the row below both derive their
// pixel positions from this single number, which is what keeps every
// graph point locked to the item underneath it while they scroll together.
const ITEM_WIDTH = 72;

// Only the "Now" point gets a visible marker on the curve.
function CurrentDot(props) {
  const { cx, cy, index } = props;
  if (index !== 0 || cx == null || cy == null) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="#7dd3fc" opacity={0.18} />
      <circle
        cx={cx}
        cy={cy}
        r={4.5}
        fill="#7dd3fc"
        stroke="#0c4a6e"
        strokeWidth={2}
      />
    </g>
  );
}

function ForecastHourly({ data = [], sunrise, sunset }) {
  const scrollRef = useRef(null);

  const hourlyData = useMemo(
    () =>
      data.slice(0, 8).map((item, index) => ({
        hour: item.time || (index === 0 ? "Now" : "--"),
        temp: Math.round(Number(item.temperature) || 0),
        icon: item.icon || "01d",
        condition: item.condition || "Clear",
        pop: item.pop ?? 0,
        humidity: Number(item.humidity || 0),
        timestamp: item.timestamp,
      })),
    [data]
  );

  // Sun markers positioned in px along the shared scroll width, so they can
  // be drawn once as a single line spanning both the graph and the row.
  const sunMarkers = useMemo(() => {
    if (!hourlyData.length) return [];

    const markers = [];

    [
      { ts: sunrise, key: "sunrise", label: "Sunrise", Icon: WiSunrise },
      { ts: sunset, key: "sunset", label: "Sunset", Icon: WiSunset },
    ].forEach(({ ts, key, label, Icon }) => {
      if (!ts) return;

      for (let i = 0; i < hourlyData.length - 1; i++) {
        const a = hourlyData[i];
        const b = hourlyData[i + 1];
        if (!a.timestamp || !b.timestamp) continue;

        if (ts >= a.timestamp && ts <= b.timestamp) {
          const span = b.timestamp - a.timestamp || 1;
          const fraction = (ts - a.timestamp) / span;
          const x = (i + 0.5 + fraction) * ITEM_WIDTH;
          markers.push({ key, label, Icon, x });
          break;
        }
      }
    });

    return markers;
  }, [sunrise, sunset, hourlyData]);

  if (!hourlyData.length) {
    return (
      <GlassCard hover={false} className="p-6 text-center text-white/70">
        No forecast data available
      </GlassCard>
    );
  }

  const temps = hourlyData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const totalWidth = hourlyData.length * ITEM_WIDTH;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <GlassCard hover={false} className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">

        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            24 Hour Forecast
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-0.5">
            Next 24 Hours
          </p>
        </div>

        {/* Graph + timeline share one horizontal scroller, so they can
            never drift out of alignment with each other. */}
        <div
          ref={scrollRef}
          className="mt-3 overflow-x-auto pb-1 scrollbar-hide"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
          }}
        >
          <div
            className="relative"
            style={{ width: `${totalWidth}px` }}
          >

            {/* Sun marker line(s) — one vertical thread through graph + row */}
            {sunMarkers.map(({ key, label, Icon, x }) => (
              <div
                key={key}
                className="absolute top-0 bottom-0 z-20 flex flex-col items-center pointer-events-none"
                style={{ left: `${x}px`, transform: "translateX(-50%)" }}
              >
                <span
                  className="
                    flex items-center gap-0.5
                    rounded-full bg-amber-300/15 text-amber-200
                    text-[9px] font-semibold px-1.5 py-0.5 mb-0.5
                    whitespace-nowrap
                  "
                >
                  <Icon size={12} />
                  {label}
                </span>
                <span className="flex-1 w-px bg-gradient-to-b from-amber-200/40 via-amber-200/15 to-transparent" />
              </div>
            ))}

            {/* Temperature graph */}
            <div style={{ width: `${totalWidth}px`, height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyData}
                  margin={{ top: 28, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="hour" hide />
                  <YAxis domain={[minTemp - 3, maxTemp + 6]} hide />

                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#7dd3fc"
                    strokeWidth={2.5}
                    fill="url(#tempFill)"
                    dot={<CurrentDot />}
                    isAnimationActive={true}
                    style={{ filter: "drop-shadow(0 2px 6px rgba(125,211,252,0.3))" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Seam */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Timeline row — one flex item per graph point, equal width bands
                so every item sits directly under its point above. */}
            <div className="flex mt-2">
              {hourlyData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.035 }}
                  className="flex flex-col items-center text-center shrink-0"
                  style={{ width: `${ITEM_WIDTH}px` }}
                >
                  <p
                    className={`
                      text-[11px] font-semibold tracking-wide
                      ${index === 0 ? "text-sky-200" : "text-white/70"}
                    `}
                  >
                    {item.hour}
                  </p>

                  <img
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={item.condition}
                    className="w-9 h-9"
                    loading="lazy"
                  />

                  <p className="text-sm font-bold text-white leading-none">
                    {item.temp}°
                  </p>

                  {index === 0 ? (
                    <span
                      className="
                        inline-flex items-center gap-1 mt-1.5
                        rounded-full bg-emerald-500/15 px-2 py-0.5
                        text-[9px] font-semibold tracking-wide text-emerald-300
                      "
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-300" />
                      LIVE
                    </span>
                  ) : (
                    <div className="mt-1.5 flex items-center gap-0.5 text-sky-300/90 text-[10px] font-medium">
                      <WiRaindrop size={12} />
                      <span>{item.pop}%</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </GlassCard>
    </motion.div>
  );
}

export default ForecastHourly;
