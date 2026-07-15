import { useEffect, useMemo } from "react";

import { useWeather } from "../context/WeatherContext";

import { getSettings } from "../services/storage/settingsStorage";

import PageContainer from "../components/common/PageContainer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import AppBackground from "../components/layout/AppBackground";
import Header from "../components/layout/Header";

import HeroWeatherCard from "../components/weather/HeroWeatherCard";
import AQICard from "../components/weather/AQICard";
import ForecastHourly from "../components/weather/ForecastHourly";
import ForecastDaily from "../components/weather/ForecastDaily";
import WeatherDetailsGrid from "../components/weather/WeatherDetailsGrid";
import SunriseSunsetCard from "../components/weather/SunriseSunsetCard";

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

  const settings = useMemo(
    () => getSettings(),
    []
  );

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

        <Header
          city={weather?.city}
          country={weather?.country}
        />

        {weather && (
          <HeroWeatherCard weather={weather} />
        )}

        {aqi && (
          <AQICard aqi={aqi} />
        )}

        <section className="mt-8">
          <SectionTitle title="24 Hour Forecast" />

          <ForecastHourly
            data={forecast?.hourly || []}
          />
        </section>

        <section className="mt-8">
          <SectionTitle title="5 Day Forecast" />

          <ForecastDaily
            data={forecast?.daily || []}
          />
        </section>

        {weather && (
          <section className="mt-8">
            <SectionTitle title="Weather Details" />

            <WeatherDetailsGrid
              weather={weather}
            />
          </section>
        )}

        {weather && (
          <section className="mt-8">
            <SunriseSunsetCard
              sunrise={weather.sunrise}
              sunset={weather.sunset}
            />
          </section>
        )}

      </PageContainer>
    </AppBackground>
  );
}

export default HomePage;