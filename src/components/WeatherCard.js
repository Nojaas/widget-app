import React, { useState, useContext, useEffect } from "react";
import { Context } from "../WidgetApp";
import axios from "axios";

import "../styles/Card.css";

function WeatherCard() {
    const { address } = useContext(Context);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (address.length >= 3) {
            const KEY = "83d6b4f77467a61826697d308c1484df";
            const URL = `http://api.openweathermap.org/data/2.5/weather?q=${address}`;

            const fetchData = async (url, params) => {
                try {
                    const response = await axios.get(url, { params });
                    return response.data;

                    } catch (error) {
                    console.error(error);
                }
            };

            const params = {
                units: "metric",
                appid: KEY,
            };

            fetchData(URL, params).then((data) => {
                if (data.cod === 200) setWeather(data);
                console.log(data);
            });
        } else setWeather(null);
    }, [address]);

  return (
    <div>
      {weather && address ? (
        <div className="weather-container">
            <h1>{weather.name} {weather.sys.country}</h1>
            <p className="weather-temp">{Math.round(weather.main.temp)}°</p>
            <p className="weather-decription">{weather.weather[0].description}</p>
            <div className="weather-minmax">
                <p>Max: {Math.round(weather.main.temp_max)}°</p>
                <p>Min: {Math.round(weather.main.temp_min)}°</p>
            </div>
            <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather-icon"
            ></img>
        </div>
      ) : (
        <p className="empty-address">Waiting for a valid address...</p>
      )}
    </div>
  );
}

export default WeatherCard;
