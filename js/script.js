const sliderContainer = document.querySelector(".slider-container");

const slideLeft = document.querySelector(".left-slide");
const slideRight = document.querySelector(".right-slide");

const upBtn = document.querySelector(".btn-up");
const downBtn = document.querySelector(".btn-down");

const slidesLength = slideLeft.querySelectorAll("div").length;

const prev = document.getElementById("btn-prev");
const next = document.getElementById("btn-next");

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
  const slideHeight = sliderContainer.clientHeight;

  if (direction === "up") {
    activeSlideIndex++;

    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex--;

    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }

  slideRight.style.transform = `translateY(-${
    activeSlideIndex * slideHeight
  }px)`;
  slideLeft.style.transform = `translateY(${activeSlideIndex * slideHeight}px)`;
};

document.onwheel = function (event) {
  const slideHeight = sliderContainer.clientHeight;

  if (event.deltaY > 0) {
    activeSlideIndex++;

    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  } else {
    activeSlideIndex--;

    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }

  slideRight.style.transform = `translateY(-${
    activeSlideIndex * slideHeight
  }px)`;
  slideLeft.style.transform = `translateY(${activeSlideIndex * slideHeight}px)`;
};

upBtn.addEventListener("click", () => changeSlide("up"));
downBtn.addEventListener("click", () => changeSlide("down"));
