import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const api = {
  key: 'f1ed219bb722bee5eabdcac2350f267a',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setQuery('');
        setWeather(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataBuilder = (currentDay) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let day = days[currentDay.getDay()];
    let date = currentDay.getDate();
    let month = months[currentDay.getMonth()];
    let year = currentDay.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={weather.main && weather.main.temp > 16 ? 'app warm' : 'app'}
    >
      <main>
        <div data-aos='zoom-in' className='search-box'>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              className='search-bar'
              placeholder='Search...'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button type='submit'> Search</button>
          </form>
        </div>

        {typeof weather.main != 'undefined' ? (
          <div data-aos='fade-up' data-aos-anchor-placement='center-center'>
            <div className='location-box'>
              <div className='location'>
                {weather.name},{weather.sys.country}
              </div>
              <div className='date'>{dataBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
