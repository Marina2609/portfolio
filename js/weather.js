const city = document.getElementById("city");
const weatherError = document.getElementById("weather-error");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weatherDescription = document.getElementById("weather-description");

const yourName = document.getElementById("name");

const API_KEY = "31074e3dd175bc11dbc271bb99940c09";

/*---------------- Погода ------------*/
async function getWeather() {
  let lang = "en";
  let windspeed = "Wind speed";
  let humid = "Humidity";

  if (langRu.checked) {
    lang = "ru";
    windspeed = "Скорость ветра";
    humid = "Влажность";
  }

  // Если поле города пустое, не запрашиваем погоду
  if (!city.value.trim()) {
    weatherError.textContent =
      lang === "ru" ? "Введите название города" : "Please enter a city";
    clearWeatherInfo();
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city.value.trim()
  )}&lang=${lang}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    weatherError.textContent = "";
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = capitalizeFirstLetter(
      data.weather[0].description
    );
    wind.textContent = `${windspeed}: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${humid}: ${data.main.humidity}%`;
  } catch (error) {
    weatherError.textContent =
      lang === "ru" ? "Неверное название города" : "City not found";
    clearWeatherInfo();
  }
}

function clearWeatherInfo() {
  temperature.textContent = "";
  weatherDescription.textContent = "";
  wind.textContent = "";
  humidity.textContent = "";
  weatherIcon.className = "weather-icon"; // сброс иконки
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*---------------- Язык ------------*/
function updateLanguageSettings() {
  let defaultCity, namePlaceholder;

  if (langEn.checked) {
    defaultCity = "Minsk";
    namePlaceholder = "[Enter name]";
  } else if (langRu.checked) {
    defaultCity = "Минск";
    namePlaceholder = "[Введите имя]";
  } else {
    // По умолчанию английский
    defaultCity = "Minsk";
    namePlaceholder = "[Enter name]";
  }

  // Если поле города пустое или содержит старое значение, обновляем на дефолтное
  if (!city.value.trim() || city.value === "Minsk" || city.value === "Минск") {
    city.value = defaultCity;
  }

  yourName.placeholder = namePlaceholder;

  getWeather();
}
updateLanguageSettings();

/*---------------- Локальное хранилище ------------*/
function setLocalStorage() {
  localStorage.setItem("city", city.value);
  if (yourName) {
    localStorage.setItem("name", yourName.value);
  }
}

function getLocalStorage() {
  const savedCity = localStorage.getItem("city");

  if (savedCity) {
    city.value = savedCity;
  } else {
    updateLanguageSettings();
  }
  getWeather();

  if (yourName && localStorage.getItem("name")) {
    yourName.value = localStorage.getItem("name");
  }
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

/*---------------- Слушатели ------------*/
city.addEventListener("change", getWeather);
langEn.addEventListener("click", updateLanguageSettings);
langRu.addEventListener("click", updateLanguageSettings);
