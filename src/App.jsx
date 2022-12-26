import { useState, useEffect } from 'react'
import Point from './Point/Point'
import { getWeather } from './getWeather'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
  }, []);

  function positionSuccess({ coords }) {
    getWeather(
      coords.latitude,
      coords.longitude,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ).then((data) => {
        setWeatherData(data)
        setIsLoading(false)
      })
      .catch(e => {
        console.error(e)
        alert("Error getting weather.")
        setIsLoading(false)
      })
  }

  function positionError() {
    alert(
      "There was an error getting your location. Please allow us to use your location and refresh the page."
    )
  }

  function getCurrentPosition() {
    const offset = Math.round((weatherData.currentTemp-weatherData.lowTemp)*(100/(weatherData.highTemp-weatherData.lowTemp)));
    return offset;
  }
  
  return (
    <section className="weather-widget">
      {isLoading
          ? <div>Loading</div>
          : <div className='temp-line'>
              <div className="temp-slider">
                <Point type="current" value={weatherData.currentTemp} leftOffset={getCurrentPosition()} />
              </div>
              <div className='temp-low'>{weatherData.lowTemp}&deg;</div>
              <div className='temp-high'>{weatherData.highTemp}&deg;</div>
          </div>
      }
    </section>
  )
}

export default App
