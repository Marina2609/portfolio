const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".dot");
const slideNumberCurrent = document.querySelector(".slide-number-current");
const slideNumberTotal = document.querySelector(".slide-number-total");
const prevBtn = document.querySelector(".arrow-prev");
const nextBtn = document.querySelector(".arrow-next");

let currentIndex = 0;
let autoScroll;
let bgTime = 0;
let curNum;
let totalNum;

const options = {
  interval: 10000,
};

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");

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

function gotoNext() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

nextBtn.addEventListener("click", () => {
  gotoNext();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});

updateSlider();

function setAutoScroll() {
  autoScroll = setInterval(() => {
    const fnTime = Date.now();

    if (fnTime - bgTime + 10 > options.interval) {
      bgTime = fnTime;
      gotoNext();
    }
  }, options.interval);
}

setAutoScroll();
