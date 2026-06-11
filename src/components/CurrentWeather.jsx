import { PaintedHumidity, PaintedWind, PaintedVisibility, PaintedPressure } from './CustomIcons';
import { formatTemp } from '../utils/formatters';

export const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const { name, main, weather, wind, visibility, sys } = data;
  const condition = weather[0];

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="location">
          <h1>{name}, {sys.country}</h1>
          <p>{condition.description}</p>
        </div>
      </div>

      <div className="temp-container">
        <div className="weather-desc">
          <img 
            src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`} 
            alt={condition.main} 
            className="weather-icon"
          />
        </div>
        <div className="temp">
          {formatTemp(main.temp, unit)}°{unit}
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card glass-panel">
          <div className="icon" style={{ background: 'transparent', padding: 0 }}>
            <PaintedHumidity size={50} />
          </div>
          <div className="detail-info">
            <p>Humidity</p>
            <h3>{main.humidity}%</h3>
          </div>
        </div>
        <div className="detail-card glass-panel">
          <div className="icon" style={{ background: 'transparent', padding: 0 }}>
            <PaintedWind size={50} />
          </div>
          <div className="detail-info">
            <p>Wind</p>
            <h3>{Math.round(wind.speed * 3.6)} km/h</h3>
          </div>
        </div>
        <div className="detail-card glass-panel">
          <div className="icon" style={{ background: 'transparent', padding: 0 }}>
            <PaintedVisibility size={50} />
          </div>
          <div className="detail-info">
            <p>Visibility</p>
            <h3>{(visibility / 1000).toFixed(1)} km</h3>
          </div>
        </div>
        <div className="detail-card glass-panel">
          <div className="icon" style={{ background: 'transparent', padding: 0 }}>
            <PaintedPressure size={50} />
          </div>
          <div className="detail-info">
            <p>Pressure</p>
            <h3>{main.pressure} hPa</h3>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '8px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Feels like: {formatTemp(main.feels_like, unit)}°{unit}
      </div>
    </div>
  );
};
