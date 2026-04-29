const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".dot");
const slideNumberCurrent = document.querySelector(".slide-number-current");
const slideNumberTotal = document.querySelector(".slide-number-total");
const prevBtn = document.querySelector(".arrow-prev");
const nextBtn = document.querySelector(".arrow-next");

let currentIndex = 0;
let autoScroll; // переменная для интервала
let bgTime = 0; // время последнего переключения
let curNum;
let totalNum;

const options = {
  interval: 10000, // интервал в миллисекундах, можно изменить
};

// Обновление слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  // Обновляем точки
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");

  // Обновляем номер
  if (currentIndex + 1 < 9) {
    curNum = `0${currentIndex + 1}`;
    totalNum = `0${totalSlides}`;
  } else {
    curNum = `${currentIndex + 1}`;
    totalNum = `${totalSlides}`;
  }
  slideNumberCurrent.textContent = curNum;
  slideNumberTotal.textContent = totalNum;
}

// Функция для переключения на следующий слайд
function gotoNext() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

// Обработчик для стрелки "вперёд"
nextBtn.addEventListener("click", () => {
  gotoNext();
});

// Обработчик для стрелки "назад"
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Обработчик для точек
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});

// Изначально
updateSlider();

// Функция автоингрессии
function setAutoScroll() {
  autoScroll = setInterval(() => {
    const fnTime = Date.now();
    if (fnTime - bgTime + 10 > options.interval) {
      bgTime = fnTime;
      gotoNext();
    }
  }, options.interval);
}

// Запуск автоматической прокрутки
setAutoScroll();

// function updateSlider() {
//   // Перемещаем слайды
//   document.querySelector(".slides").style.transform =
//     `translateX(-${currentIndex * 100}%)`;

//   // Обновляем активные точки
//   dots.forEach((dot) => dot.classList.remove("active"));
//   dots[currentIndex].classList.add("active");

//   // Обновляем номер страницы
//   slideNumber.textContent = `${currentIndex + 1} / ${totalSlides}`;
// }
