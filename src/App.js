import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  const search = document.getElementById("get-city-name");
  const temp = document.getElementById("temp-text");
  const cityName = document.getElementById("city-name");
  const dateTime = document.getElementById("date-time");
  const sunRise = document.getElementById("sun-rise");
  const sunSet = document.getElementById("sun-set");
  const minTemp = document.getElementById("min-temp");
  const maxTemp = document.getElementById("max-temp");
  const weatherMain = document.getElementById("weather-main");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const weather = document.getElementsByClassName("weather");

  const set_city = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(json => {

        if (search.value !== "") {
          weather[0].style.opacity = "1";
        }
        else {
          alert("type a city name");
        }
        temp.innerText = `Weather temp: ${json.main.temp}`;
        cityName.innerText = json.name;
        dateTime.innerText = unixTimeToNormalTime(json.dt)
        sunRise.innerText = `Sun-rise: ${unixTimeToNormalTime(json.sys.sunrise)}`;
        sunSet.innerText = `Sun-set: ${unixTimeToNormalTime(json.sys.sunset)}`;
        minTemp.innerText = `min temp: ${json.main.temp_min}`;
        maxTemp.innerText = `max temp: ${json.main.temp_max}`;
        weatherMain.innerText = `weather state: ${json.weather[0].main}`;
        feelsLike.innerText = `Feels Like: ${json.main.feels_like}`;
        humidity.innerText = `Humidity: ${json.main.humidity}`;
      });
  }

  function unixTimeToNormalTime(unixTimestamp) {

    const date = new Date(unixTimestamp * 1000);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours.toString()}:${minutes.toString()}`;

    return formattedTime;
  }

  return (
    <div className="App">
      <h1 id="header">Weather Site</h1>

      <p id="hint">type a city name</p>

      <div className="input-city-name">
        <input
          id='get-city-name'
          placeholder='City Name'
          value={city}
          onChange={(m) => setCity(m.target.value)}
        />
        <button id="get-btn"
          alt="search" onClick={() => set_city(city)}>
          Search
        </button>
      </div>

      <div className="weather">
        <div className="city-date">
          <p id="city-name"></p>
          <p id="date-time">Mon 12th jan</p>
        </div>

        <p id="weather-main"></p>

        <div className="temputre">
          <p id="temp-text"></p>
          <p id="temp-sign">°C</p>
        </div>

        <div className="sun-time">
          <p id="sun-rise"></p>
          <p id="sun-set"></p>
        </div>

        <div className="temp-minmax">
          <p id="min-temp"></p>
          <p id="max-temp"></p>
        </div>

        <div className="other">
          <p id="feels-like"></p>
          <p id="humidity"></p>
        </div>

      </div>
    </div>
  );
}
export default App;

