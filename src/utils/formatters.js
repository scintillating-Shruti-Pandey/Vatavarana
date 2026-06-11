import { format, isToday, isTomorrow } from 'date-fns';

export const formatTemp = (temp, unit) => {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

export const formatTime = (timestamp, timezoneOffset = 0) => {
  // Convert unix timestamp to local time of the queried city
  const localDate = new Date((timestamp + timezoneOffset) * 1000);
  // Using UTC methods because we already shifted the time by timezoneOffset
  return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
};

export const formatDay = (timestamp, timezoneOffset = 0) => {
  const localDate = new Date((timestamp + timezoneOffset) * 1000);
  
  // We need to offset the current date to match the timezone to correctly check isToday/isTomorrow
  const now = new Date();
  const currentCityTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (timezoneOffset * 1000));

  // Simple hack to get day string
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[localDate.getUTCDay()];
};

export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE');
};

export const groupForecastByDay = (forecastList) => {
  const grouped = {};
  
  forecastList.forEach(item => {
    // OpenWeatherMap returns forecasts every 3 hours.
    // We group them by date (YYYY-MM-DD)
    const date = item.dt_txt.split(' ')[0];
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};

// Returns a summarized daily forecast array (min/max temp, main icon)
export const getDailyForecast = (groupedForecast) => {
  return Object.keys(groupedForecast).map(date => {
    const dayData = groupedForecast[date];
    
    // Find min and max temp for the day
    const temps = dayData.map(d => d.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get the icon from the middle of the day (usually index 4 out of 8, which is around 12:00)
    // or fallback to the first available if not a full day
    const midDayItem = dayData.find(d => d.dt_txt.includes('12:00:00')) || dayData[Math.floor(dayData.length / 2)];
    
    return {
      date,
      timestamp: midDayItem.dt,
      minTemp,
      maxTemp,
      icon: midDayItem.weather[0].icon,
      condition: midDayItem.weather[0].main
    };
  }).slice(0, 5); // Ensure we only return 5 days
};
