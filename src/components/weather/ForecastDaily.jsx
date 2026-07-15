
import GlassCard from "../common/GlassCard";

function ForecastDaily({
  data = [],
}) {
  const formatDay = (
    timestamp
  ) => {
    return new Date(
      timestamp * 1000
    ).toLocaleDateString(
      [],
      {
        weekday: "short",
      }
    );
  };

  return (
    <div
      className="
      space-y-3
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
            p-4
            flex
            justify-between
            items-center
          "
          >
            <div
              className="
              flex
              items-center
              gap-3
            "
            >
              {item.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  alt=""
                  className="
                  w-10
                  h-10
                "
                />
              )}

              <div>
                <p
                  className="
                  text-white
                  font-semibold
                "
                >
                  {formatDay(
                    item.date
                  )}
                </p>

                <p
                  className="
                  text-white/60
                  text-sm
                "
                >
                  {
                    item.condition
                  }
                </p>
              </div>
            </div>

            <p
              className="
              text-white
              font-bold
              text-lg
            "
            >
              {item.temp}°
            </p>
          </GlassCard>
        )
      )}
    </div>
  );
}

export default ForecastDaily;
