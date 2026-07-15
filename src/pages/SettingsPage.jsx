import {
  MdDarkMode,
  MdNotifications,
  MdLocationOn,
  MdPrivacyTip,
  MdFeedback,
  MdInfo,
  MdStarRate,
  MdPalette,
  MdThermostat,
} from "react-icons/md";

import { useState, useEffect } from "react";

import AppBackground from "../components/layout/AppBackground";
import PageContainer from "../components/common/PageContainer";

import SettingCard from "../components/settings/SettingCard";
import ToggleSwitch from "../components/settings/ToggleSwitch";
import SettingsSection from "../components/settings/SettingsSection";

import {
  getSettings,
  saveSettings,
} from "../services/storage/settingsStorage";

function SettingsPage() {
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Dark Mode Support
  useEffect(() => {
    const root = document.documentElement;

    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <AppBackground hideAnimation={settings.hideBackground}>
      <PageContainer>
        <h1 className="text-white text-3xl font-bold mb-8">
          Settings
        </h1>

        <SettingsSection title="Preferences">
          <SettingCard
            icon={<MdDarkMode />}
            title="Dark Mode"
            description="Enable dark appearance"
            rightContent={
              <ToggleSwitch
                checked={settings.darkMode}
                onChange={(value) =>
                  updateSetting("darkMode", value)
                }
              />
            }
          />

          <SettingCard
            icon={<MdThermostat />}
            title="Temperature Unit"
            description={
              settings.unit === "metric"
                ? "Celsius (°C)"
                : "Fahrenheit (°F)"
            }
            rightContent={
              <button
                onClick={() =>
                  updateSetting(
                    "unit",
                    settings.unit === "metric"
                      ? "imperial"
                      : "metric"
                  )
                }
                className="px-4 py-2 rounded-xl bg-white/10 text-white"
              >
                {settings.unit === "metric" ? "°C" : "°F"}
              </button>
            }
          />

          <SettingCard
            icon={<MdPalette />}
            title="Hide Background"
            description="Disable weather animations"
            rightContent={
              <ToggleSwitch
                checked={settings.hideBackground}
                onChange={(value) =>
                  updateSetting("hideBackground", value)
                }
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Alerts">
          <SettingCard
            icon={<MdNotifications />}
            title="Notifications"
            description="Enable app notifications"
            rightContent={
              <ToggleSwitch
                checked={settings.notifications}
                onChange={(value) =>
                  updateSetting("notifications", value)
                }
              />
            }
          />

          <SettingCard
            icon={<MdNotifications />}
            title="Daily Weather Alerts"
            description="Receive daily forecasts"
            rightContent={
              <ToggleSwitch
                checked={settings.dailyAlerts}
                onChange={(value) =>
                  updateSetting("dailyAlerts", value)
                }
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="General">
          <SettingCard
            icon={<MdLocationOn />}
            title="Manage Location"
            description="Location permissions"
          />

          <SettingCard
            icon={<MdStarRate />}
            title="Rate App"
            description="Rate this weather app"
          />

          <SettingCard
            icon={<MdFeedback />}
            title="Feedback"
            description="Send feedback"
          />

          <SettingCard
            icon={<MdPrivacyTip />}
            title="Privacy Policy"
            description="View privacy information"
          />

          <SettingCard
            icon={<MdInfo />}
            title="About App"
            description="Version 1.0.0"
          />
        </SettingsSection>
      </PageContainer>
    </AppBackground>
  );
}

export default SettingsPage;