let dateContainer = document.querySelector(".date");
let timeContainer = document.querySelector(".hours");
let now = new Date();

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
  "December"
];

let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let today = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateContainer.innerHTML = `${now.getDate()} ${month} ${now.getFullYear()}`;
timeContainer.innerHTML = `${today}, ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector("#city-name");

  searchCity.innerHTML = searchInput.value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let apiKey = "0c7738f69f93f7a10985af2c2d89420a";

function showTemperature(response) {
  let degrees = document.querySelector(".current-temperature");
  let weatherDescription = document.querySelector(".weather-quote");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");

  degrees.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  weatherDescription.innerHTML = response.data.weather[0].main;
  currentWind.innerHTML = response.data.wind.speed;
  currentHumidity.innerHTML = response.data.main.humidity;
}

function displayCurrentTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentCity = document.querySelector(".current-city");
  let weatherDescription = document.querySelector(".weather-quote");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
}

let url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(url).then(displayCurrentTemperature);
