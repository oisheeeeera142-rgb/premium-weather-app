
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useWeather } from "../context/WeatherContext";

import * as cityStorage from "../services/storage/cityStorage";

import PageContainer from "../components/common/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import AppBackground from "../components/layout/AppBackground";

import CitySearch from "../components/city/CitySearch";
import CityCard from "../components/city/CityCard";
import CurrentLocationCard from "../components/city/CurrentLocationCard";
import PopularCities from "../components/city/PopularCities";

import EmptyState from "../components/common/EmptyState";

function ManageCitiesPage() {
  const navigate = useNavigate();

  const { loadCityWeather } = useWeather();

  const [cities, setCities] = useState(
    cityStorage.getSavedCities()
  );

  const [searchResults, setSearchResults] =
    useState([]);

  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }

    const filtered = cities.filter((city) =>
      city.name
        .toLowerCase()
        .includes(text.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const handleSelect = async (city) => {
    const normalized = {
      name: city.name,
      country: city.country || "",
      lat: Number(city.lat),
      lon: Number(city.lon),
    };

    cityStorage.addCity(normalized);

    setCities(
      cityStorage.getSavedCities()
    );

    cityStorage.setSelectedCity(
      normalized
    );

    await loadCityWeather(
      normalized
    );

    navigate("/home");
  };

  const handleRemove = (cityName) => {
    cityStorage.removeCity(cityName);

    setCities(
      cityStorage.getSavedCities()
    );
  };

  return (
    <AppBackground>
      <PageContainer>
        <SectionTitle
          title="Manage Cities"
        />

        <CitySearch
          results={searchResults}
          onSearch={handleSearch}
          onSelect={handleSelect}
        />

        <div className="mt-6">
          <CurrentLocationCard
            location={{
              city:
                "Current Location",
            }}
            onOpen={() =>
              navigate("/home")
            }
          />
        </div>

        <div className="mt-8">
          <SectionTitle
            title="Added Cities"
          />

          {cities.length === 0 ? (
            <EmptyState
              title="No Cities Added"
              description="Add cities to quickly switch between weather locations."
            />
          ) : (
            <div className="space-y-3">
              {cities.map((city) => (
                <CityCard
                  key={`${city.name}-${city.lat}`}
                  city={city}
                  onSelect={
                    handleSelect
                  }
                  onRemove={
                    handleRemove
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <SectionTitle
            title="Popular Cities"
          />

          <PopularCities
            onSelect={handleSelect}
          />
        </div>
      </PageContainer>
    </AppBackground>
  );
}

export default ManageCitiesPage;

