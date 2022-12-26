import axios from "axios"

export function getWeather(lat, lon, timezone) {
  return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timeformat=unixtime",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      }
    )
    .then(({ data }) => {
      return parseCurrentWeather(data)
    })
}

function parseCurrentWeather({ current_weather, daily, hourly }) {
  const {
    temperature: currentTemp,
    weathercode: iconCode,
  } = current_weather
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp]
  } = daily

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    tempDirection: getTempDirection(current_weather, hourly),
    iconCode,
  }
}

function getTempDirection(current_weather, hourly) {
    let actualTimes = hourly.time
    .map((time, index) => {
      return {
        timestamp: time
      }
    })
    .filter(({ timestamp }) => timestamp > current_weather.time);

    const nextHourTemp = hourly.temperature_2m[hourly.time.length-actualTimes.length];

    if(nextHourTemp < current_weather.temperature) {
        return "left"
    } else if(nextHourTemp > current_weather.temperature) {
        return "right"
    } else {
        return 'none'
    }
}