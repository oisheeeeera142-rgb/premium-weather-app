import AppRouter
from "./routes/AppRouter";

import {
  WeatherProvider
} from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <AppRouter />
    </WeatherProvider>
  );
}

export default App;