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

search("Paris");
