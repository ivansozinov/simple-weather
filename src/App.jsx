import { useState, useEffect } from 'react'
import Point from './Point/Point'
import LHTemp from './LHTemp/LHTemp'
import Icon from './Icon/Icon'
import { getWeather } from './getWeather'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { maximumAge: 600_000 })
  }, []);

  function positionSuccess({ coords }) {
    getWeather(
      coords.latitude,
      coords.longitude,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ).then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e)
        setIsError(true);
        setIsLoading(false);
      })
  }

  function positionError() {
    alert("There was an error getting your location. Please allow us to use your location and refresh the page.");
    setIsError(true);
  }

  function getCurrentPosition() {
    return Math.round((weatherData.currentTemp-weatherData.lowTemp)*(100/(weatherData.highTemp-weatherData.lowTemp)));
  }

  if(isError) {
    return (
      <section className="weather-widget">Please allow us to use your location and refresh the page.</section>
    )
  }
  
  return (
    <section className="weather-widget">
      {isLoading
        ? <div>Loading</div>
        : <>
            <LHTemp type="low" value={weatherData.lowTemp} />
            <div className='temp-line'>
              <div className="temp-slider">
                <Icon iconCode={weatherData.iconCode} />
                <Point type="current" value={weatherData.currentTemp} direction={weatherData.tempDirection} leftOffset={getCurrentPosition()} />
              </div>
            </div>
            <LHTemp type="high" value={weatherData.highTemp} />
          </>
        }
    </section>
  )
}

export default App
