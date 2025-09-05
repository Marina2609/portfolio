const hideAudioPlayer = document.getElementById("hide-AudioPlayer");
const hideToDoList = document.getElementById("hide-ToDoList");
const hideWeather = document.getElementById("hide-Weather");
const hideQuotes = document.getElementById("hide-Quotes");
const hideDate = document.getElementById("hide-Date");
const hideTime = document.getElementById("hide-Time");
const hideGreeting = document.getElementById("hide-Greeting");
const hideGitHub = document.getElementById("hide-GitHub");

// Функция переключения языка интерфейса
function lang() {
  if (langEn.checked) {
    setting.textContent = "Settings";
    eng.textContent = "English";
    rus.textContent = "Russian";
    what.placeholder = "[Enter in english]";
    checkbox0.textContent = "Audio player";
    checkbox1.textContent = "ToDo list";
    checkbox2.textContent = "Weather";
    checkbox3.textContent = "Quotes";
    checkbox4.textContent = "Date";
    checkbox5.textContent = "Time";
    checkbox6.textContent = "Greeting";
    checkbox7.textContent = "GitHub";
    localStorage.setItem("language", "en");
  } else if (langRu.checked) {
    setting.textContent = "Настройки";
    eng.textContent = "Английский";
    rus.textContent = "Русский";
    what.placeholder = "[Вводите на английском]";
    checkbox0.textContent = "Аудиоплеер";
    checkbox1.textContent = "Список дел";
    checkbox2.textContent = "Погода";
    checkbox3.textContent = "Цитаты";
    checkbox4.textContent = "Дата";
    checkbox5.textContent = "Время";
    checkbox6.textContent = "Приветствие";
    checkbox7.textContent = "GitHub";
    localStorage.setItem("language", "ru");
  }
}

settings.onclick = function () {
  location.href = "#modal";

  lang();
};

// Функция плавного скрытия/показа элементов
function toggleOpacity(id, hide) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transition = "opacity 1s ease-in-out";
  el.style.opacity = hide ? 0 : 1;
}

// Функция скрытия/показа элементов в зависимости от чекбоксов
function hideElem() {
  toggleOpacity("player", hideAudioPlayer.checked);
  toggleOpacity("todo", hideToDoList.checked);
  toggleOpacity("weather", hideWeather.checked);
  toggleOpacity("quotes", hideQuotes.checked);
  toggleOpacity("change-quote", hideQuotes.checked);
  toggleOpacity("date", hideDate.checked);
  toggleOpacity("time", hideTime.checked);
  toggleOpacity("greeting-container", hideGreeting.checked);
  toggleOpacity("github", hideGitHub.checked);
  toggleOpacity("year", hideGitHub.checked);

  saveCheckboxes();
}

// Сохраняем состояние чекбоксов в localStorage
function saveCheckboxes() {
  localStorage.setItem("hideAudioPlayer", hideAudioPlayer.checked);
  localStorage.setItem("hideToDoList", hideToDoList.checked);
  localStorage.setItem("hideWeather", hideWeather.checked);
  localStorage.setItem("hideQuotes", hideQuotes.checked);
  localStorage.setItem("hideDate", hideDate.checked);
  localStorage.setItem("hideTime", hideTime.checked);
  localStorage.setItem("hideGreeting", hideGreeting.checked);
  localStorage.setItem("hideGitHub", hideGitHub.checked);
}

// Загружаем состояние чекбоксов из localStorage
function loadCheckboxes() {
  hideAudioPlayer.checked = localStorage.getItem("hideAudioPlayer") === "true";
  hideToDoList.checked = localStorage.getItem("hideToDoList") === "true";
  hideWeather.checked = localStorage.getItem("hideWeather") === "true";
  hideQuotes.checked = localStorage.getItem("hideQuotes") === "true";
  hideDate.checked = localStorage.getItem("hideDate") === "true";
  hideTime.checked = localStorage.getItem("hideTime") === "true";
  hideGreeting.checked = localStorage.getItem("hideGreeting") === "true";
  hideGitHub.checked = localStorage.getItem("hideGitHub") === "true";
}

// Загружаем язык из localStorage и применяем
function loadLanguage() {
  const savedLang = localStorage.getItem("language");
  if (savedLang === "en") {
    langEn.checked = true;
  } else if (savedLang === "ru") {
    langRu.checked = true;
  } else {
    // По умолчанию английский
    langEn.checked = true;
  }
  lang();
}

// Обработчики событий
langEn.addEventListener("change", () => {
  lang();
  saveLanguage();
});
langRu.addEventListener("change", () => {
  lang();
  saveLanguage();
});

function saveLanguage() {
  if (langEn.checked) {
    localStorage.setItem("language", "en");
  } else if (langRu.checked) {
    localStorage.setItem("language", "ru");
  }
}

// Обработчики для чекбоксов
hideAudioPlayer.addEventListener("change", hideElem);
hideToDoList.addEventListener("change", hideElem);
hideWeather.addEventListener("change", hideElem);
hideQuotes.addEventListener("change", hideElem);
hideDate.addEventListener("change", hideElem);
hideTime.addEventListener("change", hideElem);
hideGreeting.addEventListener("change", hideElem);
hideGitHub.addEventListener("change", hideElem);

// При загрузке страницы восстанавливаем настройки
window.addEventListener("DOMContentLoaded", () => {
  loadLanguage();
  loadCheckboxes();
  hideElem();
});
