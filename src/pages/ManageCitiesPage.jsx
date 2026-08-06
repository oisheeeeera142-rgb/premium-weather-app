import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBack, MdMyLocation } from "react-icons/md";

import { useWeather } from "../context/WeatherContext";
import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";

import SearchBar from "../components/city/SearchBar";
import LocationCard from "../components/city/LocationCard";
import popularLocations from "../data/popularLocations";

import {
  getRecentCities,
  addRecentCity,
  getFavoriteCities,
  isFavoriteCity,
  toggleFavoriteCity,
} from "../services/storage/citiesStorage";

function ManageCitiesPage() {
  const navigate = useNavigate();
  const { loadCityWeather, loadCurrentLocationWeather } = useWeather();

  const [recent, setRecent] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setRecent(getRecentCities());
    setFavorites(getFavoriteCities());
  }, []);

  const handleSelectLocation = async (location) => {
    const city = {
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    };

    await loadCityWeather(city);
    setRecent(addRecentCity(city));
    navigate("/");
  };

  const handleUseCurrentLocation = async () => {
    await loadCurrentLocationWeather();
    navigate("/");
  };

  const handleToggleFavorite = (location) => {
    setFavorites(toggleFavoriteCity(location));
  };

  return (
    <PageContainer>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <MdArrowBack size={20} className="text-white" />
        </button>

        <h1 className="text-xl font-bold text-white">Manage Cities</h1>
      </div>

      <SearchBar onSelect={handleSelectLocation} />

      <motion.div whileTap={{ scale: 0.98 }} className="mt-4">
        <GlassCard
          className="p-4 flex items-center gap-3 cursor-pointer"
          onClick={handleUseCurrentLocation}
        >
          <MdMyLocation size={22} className="text-white" />
          <span className="text-white font-medium">Current Location</span>
        </GlassCard>
      </motion.div>

      {favorites.length > 0 && (
        <section className="mt-8">
          <SectionTitle title="Favorites" />
          <div className="mt-4 grid gap-3">
            {favorites.map((city) => (
              <LocationCard
                key={`${city.lat}-${city.lon}`}
                location={city}
                onSelect={handleSelectLocation}
                isFavorite
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="mt-8">
          <SectionTitle title="Recently Viewed" />
          <div className="mt-4 grid gap-3">
            {recent.map((city) => (
              <LocationCard
                key={`${city.lat}-${city.lon}`}
                location={city}
                onSelect={handleSelectLocation}
                isFavorite={isFavoriteCity(city)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 mb-10">
        <SectionTitle title="Popular Locations" />
        <div className="mt-4 grid gap-3">
          {popularLocations.map((city) => (
            <LocationCard
              key={`${city.lat}-${city.lon}`}
              location={city}
              onSelect={handleSelectLocation}
              isFavorite={isFavoriteCity(city)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default ManageCitiesPage;