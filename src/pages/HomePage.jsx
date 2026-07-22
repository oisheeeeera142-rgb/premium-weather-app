import { useEffect, useMemo } from "react";
import { useWeather } from "../context/WeatherContext";

import { getSettings } from "../services/storage/settingsStorage";

import PageContainer from "../components/common/PageContainer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";

import AppBackground from "../components/layout/AppBackground";
import Header from "../components/layout/Header";

import HeroWeatherCard from "../components/weather/HeroWeatherCard";
import ForecastHourly from "../components/weather/ForecastHourly";
import ForecastChart from "../components/weather/ForecastChart";
import ForecastDaily from "../components/weather/ForecastDaily";
import WeatherDetailsGrid from "../components/weather/WeatherDetailsGrid";
import SunriseSunsetCard from "../components/weather/SunriseSunsetCard";
import AQICard from "../components/weather/AQICard";

import SectionTitle from "../components/common/SectionTitle";

function HomePage() {
  const {
    weather,
    forecast,
    aqi,
    loading,
    error,
    loadCurrentLocationWeather,
  } = useWeather();

  const settings = useMemo(() => getSettings(), []);

  useEffect(() => {
    loadCurrentLocationWeather();
  }, [loadCurrentLocationWeather]);

  if (loading) {
    return (
      <AppBackground
        condition={weather?.weatherMain}
        hideAnimation={settings.hideBackground}
      >
        <LoadingSpinner text="Getting weather..." />
      </AppBackground>
    );
  }

  if (error) {
    return (
      <AppBackground
        condition={weather?.weatherMain}
        hideAnimation={settings.hideBackground}
      >
        <PageContainer>
          <ErrorState
            message={error}
            onRetry={loadCurrentLocationWeather}
          />
        </PageContainer>
      </AppBackground>
    );
  }

  return (
    <AppBackground
      condition={weather?.weatherMain}
      hideAnimation={settings.hideBackground}
    >
      <PageContainer>

        {/* Header */}
        <Header
          city={weather?.city}
          country={weather?.country}
        />

        {/* Hero */}
        {weather && (
          <section className="mt-6">
            <HeroWeatherCard weather={weather} />
          </section>
        )}

        {/* 24 Hour Forecast */}
        {forecast?.hourly?.length > 0 && (
          <section className="mt-8">
            <SectionTitle title="24 Hour Forecast" />

            <div className="mt-4">
              <ForecastHourly
                data={forecast.hourly}
              />
            </div>
          </section>
        )}

        {/* Temperature Graph */}
        {forecast?.hourly?.length > 0 && (
          <section className="mt-8">
            <SectionTitle title="Temperature Trend" />

            <div className="mt-4">
              <ForecastChart
                data={forecast.hourly}
              />
            </div>
          </section>
        )}

        {/* 5 Day Forecast */}
        {forecast?.daily?.length > 0 && (
          <section className="mt-8">
            <SectionTitle title="5 Day Forecast" />

            <div className="mt-4">
              <ForecastDaily
                data={forecast.daily}
              />
            </div>
          </section>
        )}

        {/* Weather Details */}
        {weather && (
          <section className="mt-8">
            <SectionTitle title="Weather Details" />

            <div className="mt-4">
              <WeatherDetailsGrid
                weather={weather}
              />
            </div>
          </section>
        )}

        {/* Sunrise & Sunset */}
        {weather && (
          <section className="mt-8">
            <SectionTitle title="Sunrise & Sunset" />

            <div className="mt-4">
              <SunriseSunsetCard
                sunrise={weather.sunrise}
                sunset={weather.sunset}
              />
            </div>
          </section>
        )}

        {/* Air Quality */}
        {aqi && (
          <section className="mt-8 mb-10">
            <SectionTitle title="Air Quality" />

            <div className="mt-4">
              <AQICard aqi={aqi} />
            </div>
          </section>
        )}

      </PageContainer>
    </AppBackground>
  );
}

export default HomePage;