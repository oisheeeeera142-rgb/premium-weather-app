import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdStar, MdStarBorder } from "react-icons/md";

import { getCurrentWeatherByCoords } from "../../services/api/weatherApi";
import GlassCard from "../common/GlassCard";

function LocationCard({ location, onSelect, isFavorite, onToggleFavorite }) {
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    let active = true;

    getCurrentWeatherByCoords(location.lat, location.lon)
      .then((data) => {
        if (!active) return;
        setTemp(Math.round(data.main?.temp));
        setIcon(data.weather?.[0]?.icon);
      })
      .catch(() => {
        if (active) setTemp(null);
      });

    return () => {
      active = false;
    };
  }, [location.lat, location.lon]);

  return (
    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
      <GlassCard
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => onSelect(location)}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
              className="w-10 h-10"
            />
          )}

          <div>
            <p className="font-semibold text-white">{location.name}</p>
            <p className="text-white/60 text-xs">{location.country}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-white">
            {temp !== null ? `${temp}°` : "--"}
          </span>

          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(location);
              }}
              className="text-yellow-300"
            >
              {isFavorite ? <MdStar size={22} /> : <MdStarBorder size={22} />}
            </button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default LocationCard;