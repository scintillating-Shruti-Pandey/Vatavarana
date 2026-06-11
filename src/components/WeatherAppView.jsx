import { useEffect, useRef } from 'react';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { Forecast } from './Forecast';
import { UnitToggle } from './UnitToggle';
import { SearchX } from 'lucide-react';

export const WeatherAppView = ({ 
  weatherData, 
  forecastData, 
  loading, 
  error, 
  unit, 
  setUnit, 
  fetchByCity, 
  fetchByCoords,
  fetchCitySuggestions,
  fetchByLocation,
  hasSearched
}) => {
  
  // Auto fetch location on mount only if haven't searched yet
  const fetched = useRef(false);
  useEffect(() => {
    if (!fetched.current && !hasSearched) {
      fetched.current = true;
      fetchByLocation();
    }
  }, [fetchByLocation, hasSearched]);

  // Accept either a string (city query) or a suggestion object with lat/lon
  const handleSearch = (value) => {
    if (!value) return;

    if (typeof value === 'string') {
      fetchByCity(value);
    } else if (value.lat && value.lon) {
      fetchByCoords(value.lat, value.lon);
    }
  };

  return (
    <div className="weather-app-view">
      <header className="header">
        <SearchBar 
          onSearch={handleSearch} 
          onLocation={fetchByLocation} 
          fetchSuggestions={fetchCitySuggestions}
        />
        <UnitToggle unit={unit} setUnit={setUnit} />
      </header>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-container glass-panel">
          <SearchX size={48} color="#a67cff" />
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && weatherData && forecastData && (
        <main className="main-content fade-in">
          <CurrentWeather data={weatherData} unit={unit} />
          <Forecast data={forecastData} unit={unit} />
        </main>
      )}
    </div>
  );
};
