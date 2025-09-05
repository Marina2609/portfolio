const time = document.querySelector(".time");
const day = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

const langEn = document.getElementById("langEn");
const langRu = document.getElementById("langRu");

// Опции для форматирования даты
const options = { weekday: "long", month: "long", day: "numeric" };

/*---------------- Время суток (для разных языков) ------------*/
const timeOfDay = {
  en: {
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  ru: {
    morning: "утро",
    afternoon: "день",
    evening: "вечер",
    night: "ночи",
  },
};

/*---------------- Отображение времени ------------*/
function showTime() {
  const now = new Date();

  // Текущее время
  const currentTime = now.toLocaleTimeString();
  time.textContent = currentTime;

  // Показать дату
  showDay(now);

  // Показать приветствие
  nowTimeOfDay(now);

  // Обновлять каждую секунду
  setTimeout(showTime, 1000);
}

/*---------------- Отображение даты ------------*/
function showDay(dateObj) {
  let currentDate;

  if (langEn.checked) {
    currentDate = dateObj.toLocaleDateString("en-US", options);
  } else if (langRu.checked) {
    currentDate = dateObj.toLocaleDateString("ru-RU", options);
    // Сделать первую букву заглавной
    currentDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  } else {
    // По умолчанию английский
    currentDate = dateObj.toLocaleDateString("en-US", options);
  }

  day.textContent = currentDate;
}

/*---------------- Получение времени суток ------------*/
function getTimeOfDay(dateObj) {
  const hours = dateObj.getHours();

  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours <= 23) {
    return "evening";
  } else {
    return "night";
  }
}

/*---------------- Приветствие ------------*/
function nowTimeOfDay(dateObj) {
  const todKey = getTimeOfDay(dateObj);

  let greetingText = "";

  if (langEn.checked) {
    greetingText = `Good ${timeOfDay.en[todKey]},`;
  } else if (langRu.checked) {
    // В русском языке разные варианты приветствия в зависимости от времени суток
    switch (todKey) {
      case "morning":
        greetingText = `Доброе ${timeOfDay.ru.morning},`;
        break;
      case "afternoon":
      case "evening":
        greetingText = `Добрый ${timeOfDay.ru[todKey]},`;
        break;
      case "night":
        greetingText = `Спокойной ${timeOfDay.ru.night},`;
        break;
      default:
        greetingText = `Здравствуйте,`;
    }
  } else {
    // По умолчанию английский
    greetingText = `Good ${timeOfDay.en[todKey]},`;
  }

  greeting.textContent = greetingText;
}

/*---------------- Сохранение имени пользователя в localStorage ------------*/
function setLocalStorage() {
  if (yourName) {
    localStorage.setItem("name", yourName.value);
  }
}

window.addEventListener("beforeunload", setLocalStorage);

/*---------------- Загрузка имени пользователя из localStorage ------------*/
function getLocalStorage() {
  if (yourName && localStorage.getItem("name")) {
    yourName.value = localStorage.getItem("name");
  }
}

window.addEventListener("load", () => {
  getLocalStorage();
  showTime();
});

/*---------------- Обработка смены языка ------------*/
// Можно обновлять дату и приветствие при смене
langEn.addEventListener("change", () => {
  showDay(new Date());
  nowTimeOfDay(new Date());
});

langRu.addEventListener("change", () => {
  showDay(new Date());
  nowTimeOfDay(new Date());
});
