import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiWind, FiDroplet } from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import GlassCard from "../common/GlassCard";

// Custom X-axis tick: renders the OpenWeather icon above the day label
// so the chart keeps the same iconography as the compact list.
function DayAxisTick({ x, y, payload, index, chartData }) {
  const item = chartData[index];
  if (!item) return null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <image
        href={`https://openweathermap.org/img/wn/${item.icon}.png`}
        x={-14}
        y={2}
        width={28}
        height={28}
      />
      <text
        x={0}
        y={40}
        textAnchor="middle"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontWeight={600}
      >
        {item.day}
      </text>
    </g>
  );
}

// Custom tooltip styled to match the glassmorphism theme instead of the
// default Recharts white box.
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const max = payload.find((p) => p.dataKey === "tempMax")?.value;
  const min = payload.find((p) => p.dataKey === "tempMin")?.value;

  return (
    <div className="rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 px-3 py-2 shadow-lg">
      <p className="text-white text-xs font-semibold mb-1">{label}</p>
      {max !== undefined && (
        <p className="text-orange-300 text-xs">High {max}°</p>
      )}
      {min !== undefined && (
        <p className="text-cyan-300 text-xs">Low {min}°</p>
      )}
    </div>
  );
}

// Inline value labels drawn above/below each point, e.g. "34°" / "26°",
// so the trend is readable without hovering.
function renderMaxLabel(props) {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y - 12}
      textAnchor="middle"
      fill="#fdba74"
      fontSize={12}
      fontWeight={700}
    >
      {value}°
    </text>
  );
}

function renderMinLabel(props) {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y + 20}
      textAnchor="middle"
      fill="#67e8f9"
      fontSize={12}
      fontWeight={700}
    >
      {value}°
    </text>
  );
}

function ForecastDaily({ data = [] }) {
  const [expanded, setExpanded] = useState(false);

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

  // Chart data mirrors the compact list (same "Today" label on index 0)
  // so both views stay in sync.
  const chartData = data.map((item, index) => ({
    ...item,
    day: index === 0 ? "Today" : item.day,
    tempMin: Number(item.tempMin),
    tempMax: Number(item.tempMax),
  }));

  return (
    <GlassCard className="rounded-[28px] p-3 sm:p-4">
      {/* Toggle control */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="
          w-full
          flex
          items-center
          justify-between
          gap-2
          px-2
          pb-2
          group
          cursor-pointer
        "
      >
        <span className="text-[11px] font-medium tracking-wide text-white/50 group-hover:text-white/80 transition-colors">
          {expanded ? "Compact view" : "View details"}
        </span>

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white/50 group-hover:text-white/80 transition-colors"
        >
          <FiChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Horizontally scrollable on small screens so labels/icons
                never overlap or clip the page width. */}
            <div className="overflow-x-auto -mx-1 px-1">
              <div className="min-w-[480px] sm:min-w-0 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 24, right: 20, left: 20, bottom: 30 }}
                  >
                    <defs>
                      <linearGradient id="maxLineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                      <linearGradient id="minLineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.06)"
                    />

                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      tick={(props) => (
                        <DayAxisTick {...props} chartData={chartData} />
                      )}
                    />

                    <YAxis
                      hide
                      domain={[
                        (dataMin) => dataMin - 4,
                        (dataMax) => dataMax + 6,
                      ]}
                    />

                    <Tooltip
                      content={<ChartTooltip />}
                      cursor={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="tempMax"
                      stroke="url(#maxLineGradient)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#fb923c", strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                      label={renderMaxLabel}
                      isAnimationActive
                      animationDuration={700}
                    />

                    <Line
                      type="monotone"
                      dataKey="tempMin"
                      stroke="url(#minLineGradient)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#22d3ee", strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                      label={renderMinLabel}
                      isAnimationActive
                      animationDuration={700}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Wind + rain probability row, aligned under each day column */}
              <div
                className="grid gap-1 mt-1 px-1 min-w-[480px] sm:min-w-0"
                style={{
                  gridTemplateColumns: `repeat(${chartData.length}, minmax(0,1fr))`,
                }}
              >
                {chartData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <div className="flex items-center gap-1 text-white/60 text-[11px]">
                      <FiWind size={11} className="shrink-0" />
                      <span>
                        {item.windSpeed != null ? `${item.windSpeed} km/h` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-300/80 text-[11px]">
                      <FiDroplet size={11} className="shrink-0" />
                      <span>
                        {item.pop != null ? `${item.pop}%` : "—"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export default ForecastDaily;