import { motion } from "framer-motion";

import { formatTemperature } from "../../utils/temperature";

function TemperatureDisplay({
  temperature,
  unit = "metric",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        flex
        items-start
        justify-center
        text-white
      "
    >
      <span
        className="
          text-7xl
          md:text-8xl
          font-extrabold
          tracking-tight
          leading-none
          drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]
        "
      >
        {formatTemperature(temperature, unit)}
      </span>

      <span
        className="
          text-3xl
          mt-3
          font-semibold
          text-white/80
        "
      >
        {unit === "metric" ? "°C" : "°F"}
      </span>
    </motion.div>
  );
}

export default TemperatureDisplay;