import React, { useEffect, useState } from "react";
import styled from "styled-components";

const kelvin_to_celsius = kelvin => {
  return (kelvin - 273.15).toFixed(2);
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Main1 = styled.div`
  background: linear-gradient(#80b3ff 70%, #4e5e7a);
  padding: 10px;
  flex: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Weatherbox = styled.div`
  height: 70%;
  width: 70%;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const Weather = styled.div`
  flex: 1;
  align-items: center;
`;

const Weather2 = styled.div`
  flex: 1;
  align-items: center;
`;

function Main() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
      getWeatherForecastByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b58f4b916657c538913b1c2b8086c8e`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("날씨", data);
    setWeatherData(data);
    setWeatherIcon(data.weather[0].icon);
  };

  const getWeatherForecastByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5b58f4b916657c538913b1c2b8086c8e`;
    let response = await fetch(url);
    let data = await response.json();

    const timezoneOffset = data.city.timezone;
    const localTime = new Date().getTimezoneOffset() * 60000;
    data.list.forEach(forecast => {
      const utcTime = new Date(forecast.dt * 1000);
      forecast.dt_txt = new Date(utcTime - localTime).toISOString();
    });

    console.log("5일 예보", data);
    setWeatherForecastData(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <MainWrapper>
      <MainContent>
        <Main1>
          <Weatherbox>
            <Weather>
              {weatherData && weatherForecastData ? (
                <div>
                  <img
                    src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
                  />
                  <p>Location: {weatherData.name}</p>
                  <p>
                    Current Temp: {kelvin_to_celsius(weatherData.main.temp)} °C
                  </p>
                  <p>Current Weather: {weatherData.weather[0].description}</p>
                  <p>
                    Max Temp: {kelvin_to_celsius(weatherData.main.temp_max)}°C
                  </p>
                  <p>
                    Min Temp: {kelvin_to_celsius(weatherData.main.temp_min)}°C
                  </p>
                </div>
              ) : (
                "Loading weather data..."
              )}
            </Weather>
            <Weather2>
              <h2>5-Day Temp</h2>
              {weatherForecastData ? (
                <ul>
                  {weatherForecastData.list
                    .filter(forecast => forecast.dt_txt.includes("09:00:00"))
                    .map((forecast, index) => (
                      <li key={index}>
                        {forecast.dt_txt.split("T")[0]}{" "}
                        {kelvin_to_celsius(forecast.main.temp)} °C,{" "}
                        {forecast.weather[0].description}
                      </li>
                    ))}
                </ul>
              ) : (
                "Loading weather forecast..."
              )}
            </Weather2>
          </Weatherbox>
        </Main1>
      </MainContent>
    </MainWrapper>
  );
}

export default Main;
