import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import SplashScreen
  from "../pages/SplashScreen";

import HomePage
  from "../pages/HomePage";

import ManageCitiesPage
  from "../pages/ManageCitiesPage";

import SettingsPage
  from "../pages/SettingsPage";
  

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <SplashScreen />
          }
        />

        <Route
          path="/home"
          element={
            <HomePage />
          }
        />

        <Route
          path="/cities"
          element={
            <ManageCitiesPage />
          }
        />

        <Route
          path="/settings"
          element={
            <SettingsPage />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;