import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";

function HeroWeatherCard({ weather }) {
  const currentDateTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  });

  const weatherEmoji = () => {
    switch (weather?.weatherMain) {
      case "Rain":
        return "🌧️";
      case "Clouds":
        return "☁️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
      case "Haze":
        return "🌫️";
      case "Drizzle":
        return "🌦️";
      case "Clear":
      default:
        return "☀️";
    }
  };

  return (
    <GlassCard
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-8
        text-white
      "
    >
      {/* Floating ambient glows */}
      <motion.div
        animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-sky-400/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10"
      >

        {/* Location */}
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight">
            📍 {weather?.city}, {weather?.country}
          </p>

          <p className="text-sm text-white/70 mt-1">
            {currentDateTime}
          </p>
        </div>

        {/* Weather Icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mt-8"
        >
          <div className="text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            {weatherEmoji()}
          </div>
        </motion.div>

        {/* Temperature */}
        <div className="text-center mt-6">
          <h1 className="text-[80px] leading-none font-extralight tracking-tighter">
            {weather?.temperature}°
          </h1>

          <p className="text-2xl font-semibold mt-2">
            {weather?.description}
          </p>

          <p className="text-white/70 mt-2">
            Feels Like {weather?.feelsLike}°
          </p>
        </div>

        {/* High Low */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="bg-white/10 rounded-2xl px-5 py-3">
            <p className="text-xs text-white/60">High</p>
            <p className="text-xl font-bold">{weather?.tempMax}°</p>
          </div>

          <div className="bg-white/10 rounded-2xl px-5 py-3">
            <p className="text-xs text-white/60">Low</p>
            <p className="text-xl font-bold">{weather?.tempMin}°</p>
          </div>
        </div>

        {/* Weather Info */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 rounded-2xl p-4 text-center transition-colors duration-300 hover:bg-white/15">
            <p className="text-white/60 text-sm">💨 Wind</p>
            <p className="text-lg font-semibold">{weather?.windSpeed} km/h</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center transition-colors duration-300 hover:bg-white/15">
            <p className="text-white/60 text-sm">💧 Humidity</p>
            <p className="text-lg font-semibold">{weather?.humidity}%</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center transition-colors duration-300 hover:bg-white/15">
            <p className="text-white/60 text-sm">👀 Visibility</p>
            <p className="text-lg font-semibold">{weather?.visibility} km</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center transition-colors duration-300 hover:bg-white/15">
            <p className="text-white/60 text-sm">🌡 Pressure</p>
            <p className="text-lg font-semibold">{weather?.pressure} hPa</p>
          </div>
        </div>

      </motion.div>
    </GlassCard>
  );
}

export default HeroWeatherCard;
