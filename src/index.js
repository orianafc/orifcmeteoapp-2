function refreshWeather(response) {
  if (response.data.status === "not_found") {
    alert("City not found, try again");
  }
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  let unitElement = document.querySelector("#weather-unit");
  unitElement.innerHTML = "ºC";

  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}ºC`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#weather-img");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon" class="weather-icon" />`;

  getWeatherForecast(response.data.city);
}
function getWeatherForecast(city) {
  let apiKey = "02ab91betd0a6efa2b010d3034deffo4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayWeatherForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
            <div class="col">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img
                class="weather-forecast-icon"
                src="${day.condition.icon_url}"
                alt="weather-forecast-icon"
                width="80"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}</span><span class="weather-foreast-unit">ºC</span>
                <strong class="weather-forecast-temperature-max">
                 ${Math.round(day.temperature.maximum)}
                 </strong>
                <strong class="weather-foreast-unit">
                ºC</strong>
              </div>
            </div>
          </div>`;
    }
  });
  let weatherForecastElement = document.querySelector("#weather-forecast");
  weatherForecastElement.innerHTML = forecastHTML;
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}, `;
}
function searchCity(city) {
  let apiKey = "02ab91betd0a6efa2b010d3034deffo4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
