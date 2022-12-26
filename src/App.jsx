import { useState, useEffect } from 'react'
import Point from './Point/Point'
import LHTemp from './LHTemp/LHTemp'
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
    alert(
      "There was an error getting your location. Please allow us to use your location and refresh the page."
    )
    setIsError(true)
  }

  function getCurrentPosition() {
    const offset = Math.round((weatherData.currentTemp-weatherData.lowTemp)*(100/(weatherData.highTemp-weatherData.lowTemp)));
    return offset;
  }
  
  return (
    <section className="weather-widget">
      {isError
      ? <div>Please allow us to use your location and refresh the page.</div>
      : isLoading
          ? <div>Loading</div>
          : <>
              <LHTemp type="low" value={weatherData.lowTemp} />
              <div className='temp-line'>
                <div className="temp-slider">
                  <Point type="current" value={weatherData.currentTemp} leftOffset={getCurrentPosition()} />
                </div>
              </div>
              <LHTemp type="high" value={weatherData.highTemp} />
            </>
        }
    </section>
  )
}

export default App
