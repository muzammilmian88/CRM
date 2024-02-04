// Weather.js

import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'e6e514a71bf9fd39c8a2cbabe8b667c1';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container mt-5">
      <h1 className='w-heading'>Weather App</h1>
      <div className="input-container mt-5">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeatherData} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

     
    </div>
    
  );
};

export default Weather;
