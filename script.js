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

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.main.wind.speed
  );
  //document.querySelector("#description").innerHTML =
  //response.data.weather[0].main;
}

function retrievePosition(position) {
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "489fe1e0a45c1dabec6c6cd0f055d12a";
  let apiPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
