"use strict";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const WEATHER_API = {
  key: "793ee93e70826ee4cee70cdaa94844b6",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");
let city = document.getElementById("city"),
  temperature = document.getElementById("temp"),
  minMaxTemp = document.getElementById("min-max"),
  weatherType = document.getElementById("weather"),
  date = document.getElementById("date"),
  todayDate = new Date();

// Event Listener Function on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    if (!searchInputBox.value) {
      alert("Enter city name, Zip code");
    } else {
      // console.log(searchInputBox.value.trim());
      getWeatherReport(searchInputBox.value.trim());
      document.querySelector(".weather-body").style.display = "block";
    }
  }
});

// Get Weather Report
const getWeatherReport = (city) => {
  fetch(
    `${WEATHER_API.baseUrl}?q=${city}&appid=${WEATHER_API.key}&units=metric`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
};

// Show Weather Report
const showWeatherReport = (weather) => {
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  weatherType.innerText = `${weather.weather[0].main}`;

  date.innerText = dateManage(todayDate);
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('/assets/images/clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('/assets/images/cloud.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('/assets/images/haze.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('/assets/images/rain.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('/assets/images/snow.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage =
      "url('/assets/images/thunderstorm.jpg')";
  }
};

// Date manage
const dateManage = (dateArg) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
};
