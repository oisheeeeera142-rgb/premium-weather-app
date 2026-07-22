
import { motion, AnimatePresence } from "framer-motion";

import SunnyAnimation from "../animations/SunnyAnimation";
import CloudyAnimation from "../animations/CloudyAnimation";
import RainAnimation from "../animations/RainAnimation";
import NightAnimation from "../animations/NightAnimation";

function AppBackground({
  children,
  condition = "Clear",
  hideAnimation = false
}) {

  const weather =
    condition?.toLowerCase() || "";

  const getBackgroundImage = () => {

    if (
      weather.includes("rain") ||
      weather.includes("drizzle") ||
      weather.includes("thunderstorm")
    ) {
      return "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2000&q=80";
    }

    if (
      weather.includes("cloud")
    ) {
      return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80";
    }

    if (
      weather.includes("night")
    ) {
      return "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=2000&q=80";
    }

    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80";
  };

  const getOverlayClasses = () => {

    if (
      weather.includes("rain") ||
      weather.includes("drizzle") ||
      weather.includes("thunderstorm")
    ) {
      return `
        bg-slate-950/65
      `;
    }

    if (
      weather.includes("cloud")
    ) {
      return `
        bg-slate-900/55
      `;
    }

    if (
      weather.includes("night")
    ) {
      return `
        bg-black/60
      `;
    }

    return `
      bg-sky-900/25
    `;
  };

  const renderAnimation = () => {

    if (hideAnimation) {
      return null;
    }

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
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >

      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 1
        }}
        className="
          absolute
          inset-0
        "
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      <div
        className={`
          absolute
          inset-0
          ${getOverlayClasses()}
        `}
      />

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
          backdrop-blur-[6px]
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

