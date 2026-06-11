import { formatTime, formatTemp, groupForecastByDay, getDailyForecast, getDayName } from '../utils/formatters';

export const Forecast = ({ data, unit }) => {
  if (!data) return null;

  // For hourly we can just take the first 8 items (which is 24 hours since it's 3-hour steps)
  const hourlyData = data.list.slice(0, 8);
  
  // For daily, we need to group the data
  const grouped = groupForecastByDay(data.list);
  const dailyData = getDailyForecast(grouped);

  return (
    <div className="right-sidebar">
      <div className="hourly-forecast glass-panel">
        <h2>Today</h2>
        <div className="hourly-list">
          {hourlyData.map((item) => (
            <div key={item.dt} className="hourly-item">
              <span className="time">{formatTime(item.dt, data.city.timezone)}</span>
              <img 
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                alt={item.weather[0].main} 
              />
              <span className="temp">{formatTemp(item.main.temp, unit)}°</span>
            </div>
          ))}
        </div>
      </div>

      <div className="daily-forecast glass-panel">
        <h2>5-Day Forecast</h2>
        <div className="daily-list">
          {dailyData.map((item) => (
            <div key={item.date} className="daily-item">
              <span className="daily-day">{getDayName(item.timestamp)}</span>
              <div className="daily-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                  alt={item.condition} 
                />
                <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>{item.condition}</span>
              </div>
              <div className="daily-temps">
                <span className="max">{formatTemp(item.maxTemp, unit)}°</span>
                <span className="min">{formatTemp(item.minTemp, unit)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
