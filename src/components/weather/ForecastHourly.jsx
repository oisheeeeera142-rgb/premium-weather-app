
import ForecastChart from "./ForecastChart";

function ForecastHourly({ data = [] }) {
  const hourlyData = data.slice(0, 8).map((item) => ({
    hour: item.time || "--",
    temp: Math.round(Number(item.temperature) || 0),
    icon: item.icon || "01d",
    condition: item.condition || "Clear",
    pop: item.pop,
    humidity: Number(item.humidity || 0),
  }));

  if (!hourlyData.length) {
    return (
      <div className="weather-glass rounded-[28px] p-6 text-center text-white">
        No forecast data available
      </div>
    );
  }

  return (
    <div
      className="
        weather-glass
        rounded-[32px]
        p-6
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          24 Hour Forecast
        </h2>

        <p className="text-white/60 text-sm mt-1">
          Next 24 Hours • Updated every 3 hours
        </p>
      </div>

      {/* Temperature Graph */}

      <div className="mb-8">
        <ForecastChart data={hourlyData} />
      </div>

      {/* Hourly Forecast */}

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
          snap-x
          snap-mandatory
          scrollbar-hide
        "
      >
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className={`
              snap-start
              min-w-[105px]
              rounded-[28px]
              p-4
              text-center
              transition-all
              duration-300
              ${index === 0
                ? "bg-white/20 border border-white/30 shadow-xl scale-105"
                : "bg-white/10 hover:bg-white/20"
              }
            `}
          >
            {/* Time */}

            <p className="text-sm font-semibold text-white">
              {item.hour}
            </p>

            {/* Icon */}

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.condition}
              className="w-14 h-14 mx-auto my-2"
            />

            {/* Temp */}

            <p className="text-2xl font-bold text-white">
              {item.temp}°
            </p>

            {/* Condition */}

            <p className="text-xs text-white/70 mt-1 line-clamp-1">
              {item.condition}
            </p>

            {/* Bottom */}

            {item.hour === "Now" ? (
              <div
                className="
                  mt-3
                  rounded-full
                  bg-emerald-500/20
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-emerald-300
                "
              >
                ● Live
              </div>
            ) : (
              <div className="mt-3 space-y-1">

                <div className="flex justify-center items-center gap-1 text-sky-300 text-xs font-semibold">
                  <span>🌧</span>
                  <span>{item.pop}%</span>
                </div>

                <div className="flex justify-center items-center gap-1 text-cyan-300 text-xs">
                  <span>💧</span>
                  <span>{item.humidity}%</span>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


