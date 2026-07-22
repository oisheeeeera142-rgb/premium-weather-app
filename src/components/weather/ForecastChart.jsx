import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ForecastChart({ data = [] }) {
  const chartData = data.map((item) => ({
    time: item.time || "--",

    temperature: Number(item.temperature || 0),

    humidity: Number(item.humidity || 0),
  }));

  if (!chartData.length) {
    return (
      <div
        className="
          weather-glass
          rounded-3xl
          p-6
          text-center
          text-white/80
        "
      >
        No forecast chart available
      </div>
    );
  }

  return (
    <div
      className="
        weather-glass
        rounded-3xl
        p-5
        mt-4
      "
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Temperature Trend
        </h3>

        <p className="text-sm text-white/60">
          Next 24 Hours
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.12}
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "#ffffff",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#ffffff",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#1f2937",
              borderRadius: "16px",
              border: "none",
              color: "#ffffff",
            }}
            formatter={(value, name) => {
              if (name === "temperature") {
                return [`${value}°C`, "Temperature"];
              }

              if (name === "humidity") {
                return [`${value}%`, "Humidity"];
              }

              return value;
            }}
          />

          {/* Temperature */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#fbbf24"
            strokeWidth={4}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 7,
            }}
          />

          {/* Humidity */}
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;