import axios from "axios"

export function getWeather(lat, lon, timezone) {
  return axios
    .get(
      "https://api.open-meteo.com/v1/forecast?daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timeformat=unixtime",
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

function parseCurrentWeather({ current_weather, daily }) {
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
    iconCode,
  }
}