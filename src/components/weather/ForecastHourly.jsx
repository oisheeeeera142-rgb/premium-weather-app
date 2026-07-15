
import GlassCard from "../common/GlassCard";
import { formatTemperature } from "../../utils/temperature";

function ForecastHourly({
  data = [],
}) {
  const formatHour = (
    timestamp
  ) => {
    return new Date(
      timestamp * 1000
    ).toLocaleTimeString(
      [],
      {
        hour: "numeric",
        hour12: true,
      }
    );
  };

  return (
    <div
      className="
      flex
      gap-4
      overflow-x-auto
      pb-3
    "
    >
      {data.map(
        (
          item,
          index
        ) => (
          <GlassCard
            key={index}
            className="
            min-w-[120px]
            p-4
            text-center
          "
          >
            <p
              className="
              text-white/60
              text-sm
            "
            >
              {formatHour(
                item.time
              )}
            </p>

            {item.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt=""
                className="
                w-12
                h-12
                mx-auto
                my-2
              "
              />
            )}

            <p
              className="
              text-white
              text-xl
              font-bold
            "
            >
              {formatTemperature(
                item.temp
              )}
            </p>
          </GlassCard>
        )
      )}
    </div>
  );
}

export default ForecastHourly;

