import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = 'f7abf716fd6a9cdcf1fe365b608ab7b8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (queryType, queryValue) => {
    setLoading(true);
    setError(null);

    try {
      let params = {
        appid: API_KEY,
        units: 'metric', // We fetch metric by default, and handle conversions in UI or state if needed. Actually, OpenWeatherMap does metric/imperial. We can just fetch metric and calculate imperial locally to avoid re-fetching, or refetch. Calculating locally is faster.
      };

      if (queryType === 'city') {
        params.q = queryValue;
      } else if (queryType === 'coords') {
        params.lat = queryValue.lat;
        params.lon = queryValue.lon;
      }

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, { params }),
        axios.get(`${BASE_URL}/forecast`, { params })
      ]);

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCity = (city) => fetchWeather('city', city);

  const fetchCitySuggestions = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query.trim(),
          limit: 5,
          appid: API_KEY
        }
      });

      return response.data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);
  
  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather('coords', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchByCity,
    fetchCitySuggestions,
    fetchByLocation
  };
};
