import { motion, AnimatePresence } from "framer-motion";

import SunnyAnimation from "../../animations/SunnyAnimation";
import CloudyAnimation from "../../animations/CloudyAnimation";
import RainAnimation from "../../animations/RainAnimation";
import NightAnimation from "../../animations/NightAnimation";

function AppBackground({
  children,
  condition = "Clear",
  hideAnimation = false
}) {

  const getBackgroundClasses = () => {

    const weather =
      condition?.toLowerCase() || "";

    if (
      weather.includes("rain") ||
      weather.includes("drizzle") ||
      weather.includes("thunderstorm")
    ) {
      return `
        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-blue-950
      `;
    }

    if (
      weather.includes("cloud")
    ) {
      return `
        bg-gradient-to-br
        from-slate-800
        via-slate-700
        to-slate-900
      `;
    }

    if (
      weather.includes("night")
    ) {
      return `
        bg-gradient-to-br
        from-indigo-950
        via-slate-950
        to-black
      `;
    }

    return `
      bg-gradient-to-br
      from-sky-400
      via-cyan-500
      to-blue-700
    `;
  };

  const renderAnimation = () => {

    if (hideAnimation) {
      return null;
    }

    const weather =
      condition?.toLowerCase() || "";

    if (
      weather.includes("rain") ||
      weather.includes("drizzle") ||
      weather.includes("thunderstorm")
    ) {
      return <RainAnimation />;
    }

    if (
      weather.includes("cloud")
    ) {
      return <CloudyAnimation />;
    }

    if (
      weather.includes("night")
    ) {
      return <NightAnimation />;
    }

    return <SunnyAnimation />;
  };

  return (

    <div
      className={`
        min-h-screen
        w-full
        overflow-hidden
        relative
        ${getBackgroundClasses()}
      `}
    >

      <AnimatePresence>
        {renderAnimation()}
      </AnimatePresence>

      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.6
        }}
        className="
          absolute
          inset-0
          backdrop-blur-[2px]
        "
      />

      <div
        className="
          relative
          z-10
          min-h-screen
          w-full
        "
      >
        {children}
      </div>

    </div>

  );
}

export default AppBackground;