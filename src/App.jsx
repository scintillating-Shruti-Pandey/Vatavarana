import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { WeatherAppView } from './components/WeatherAppView';
import './index.css';

function App() {
  const { weatherData, forecastData, loading, error, fetchByCity, fetchByLocation } = useWeather();
  const [unit, setUnit] = useState('C');
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'app'
  const [bgImage, setBgImage] = useState('/bg.png');
  const [bgClass, setBgClass] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Custom fetch wrappers to track if user has searched
  const handleCitySearch = (city) => {
    setHasSearched(true);
    fetchByCity(city);
  };

  const handleLocationSearch = () => {
    setHasSearched(true);
    fetchByLocation();
  };

  const handleExplore = () => {
    setCurrentView('app');
  };

  const handleNavHome = () => {
    setCurrentView('landing');
  };

  // Update background dynamically based on weather
  useEffect(() => {
    if (currentView === 'landing') {
      setBgImage('/bg.png'); // Default aesthetic for landing page
      return;
    }

    if (weatherData && currentView === 'app') {
      const condition = weatherData.weather[0].main.toLowerCase();
      console.log('Current weather condition:', condition);
      
      if (condition.includes('clear')) setBgImage('/bg_sunny.png');
      else if (condition.includes('cloud')) setBgImage('/bg_cloudy.png'); // User's gorgeous uploaded image!
      else if (condition.includes('rain') || condition.includes('drizzle')) setBgImage('/bg_rainy.png');
      else if (condition.includes('snow')) setBgImage('/bg_snowy.png');
      else if (condition.includes('thunder')) setBgImage('/bg_rainy.png');
      else setBgImage('/bg.png');
    }
  }, [weatherData, currentView]);

  return (
    <div 
      className="app-wrapper"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <Navbar onNavHome={handleNavHome} />
      
      <div className="app-container">
        {currentView === 'landing' ? (
          <LandingPage onExplore={handleExplore} />
        ) : (
          <WeatherAppView 
            weatherData={weatherData}
            forecastData={forecastData}
            loading={loading}
            error={error}
            unit={unit}
            setUnit={setUnit}
            fetchByCity={handleCitySearch}
            fetchByLocation={handleLocationSearch}
            hasSearched={hasSearched}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
