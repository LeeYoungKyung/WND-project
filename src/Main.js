import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./Fonts/Font.css";

const kelvin_to_celsius = kelvin => {
  const celsius = kelvin - 273.15;
  const celsiusWithoutDecimal = Math.floor(celsius);
  return celsiusWithoutDecimal;
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  padding-left: 10px;
  padding-right: 10px;
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

  background-image: url("/back.jpeg");

  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 20px;
  z-index: 999;
  display: flex;
  align-items: center;
`;

const Weather = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: large;
  font-family: "Diphylleia", serif;
  font-weight: 600;

  img {
    height: 150px;
    width: 150px;
  }
`;

const Weather2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  ul {
    list-style: none;
  }

  li {
    padding: 5px;
    display: flex;
    font-size: large;
  }
  li > div {
    margin-top: 11px;
    font-family: "Diphylleia", serif;
  }
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

    const localTime = new Date().getTimezoneOffset() * 60000;
    data.list.forEach(forecast => {
      const utcTime = new Date(forecast.dt * 1000);
      forecast.dt_txt = new Date(utcTime - localTime).toISOString();
    });

    console.log("5일", data);
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
                <fieldset
                  style={{
                    borderRadius: "10px",
                    padding: "30px",

                    background:
                      kelvin_to_celsius(weatherData.main.temp) > 26
                        ? "red"
                        : "lightblue",
                    border: "none",
                  }}
                >
                  <legend>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
                    />
                  </legend>
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
                </fieldset>
              ) : (
                "Loading weather data..."
              )}
            </Weather>
            <Weather2>
              <h1>5-Day Temp</h1>
              {weatherForecastData ? (
                <ul>
                  {weatherForecastData.list
                    .filter(forecast => forecast.dt_txt.includes("09:00:00"))
                    .map((forecast, index) => (
                      <li key={index}>
                        <div>
                          {forecast.dt_txt.split("T")[0]}{" "}
                          {kelvin_to_celsius(forecast.main.temp)} °C{" "}
                        </div>
                        <img
                          src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                          alt={forecast.weather[0].description}
                        />
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
