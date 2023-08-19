function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[date.getDay()];
  return `${days}, ${hours} : ${minutes}`;
}
let h3 = document.querySelector("h3");
let now = new Date();

h3.innerHTML = formatDate(now);
//
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//
//function convertToFahrenheit(event) {
// event.preventDefault();
//let tempElement = document.querySelector("#temperature");
//let temperature = tempElement.innerHTML;
//temperature = Number(temperature);
//tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "89fe1e0a45c1dabec6c6cd0f055d12a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "489fe1e0a45c1dabec6c6cd0f055d12a";
  let apiPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
