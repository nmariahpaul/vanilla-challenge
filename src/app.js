function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Currently: ${day}, ${hour}:${minutes}`;
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-display");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date">${formatForecast(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="forecast-temperature">
                  <span class="temperature-maximum">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="temperature-minimum">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "28da7852e0ace951fd98245728509e42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  let lastUpdatedElement = document.querySelector("#updated-time");
  lastUpdatedElement.innerHTML = formatDate(response.data.dt * 1000);
  let currentIconElement = document.querySelector("#current-temp-icon");
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
let apiKey = "28da7852e0ace951fd98245728509e42";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function search(city) {
  let apiKey = "28da7852e0ace951fd98245728509e42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-value");
  search(searchValue.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
displayForecast();
search("Paris");
