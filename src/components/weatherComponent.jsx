import React from "react";
import "./weather.css";
import { useContectData } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faTemperatureLow,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
const WeatherComponent = () => {
  const { weatherData } = useContectData();

  return (
    <div>
      <div className="container">
        <div className="main-weather">
          <h2>
            {weatherData?.location?.name}, {weatherData?.location?.region},{" "}
            {weatherData?.location?.country}
          </h2>
          <div className="inner-weather">
            <div className="weather-icon">
              <img src={weatherData?.current?.condition.icon} />
            </div>
            <span> {weatherData?.current?.temp_c}° </span>
          </div>
          <p className="condition-text">
            {weatherData?.current?.condition.text}
          </p>
        </div>
        <div className="info-container">
          <h3>Feels like {weatherData?.current?.feelslike_c}°</h3>
          <div className="other-info humidity">
            <FontAwesomeIcon icon={faDroplet} />
            <p>Humidity</p>
            <p>{weatherData?.current?.humidity}%</p>
          </div>
          <div className="other-info wind">
            <FontAwesomeIcon icon={faWind} />
            <p>Wind</p>
            <p> {weatherData?.current?.wind_kph}kph</p>
          </div>
          <div className="other-info pressure">
            <FontAwesomeIcon icon={faTemperatureLow} />
            <p>Pressure</p>
            <p>{weatherData?.current?.pressure_mb}hpa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
