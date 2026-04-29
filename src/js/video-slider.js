const videoFS = document.querySelector(".player");
const btnPlay = document.querySelector(".btn-play");
const play = document.getElementById("play");
const player = document.querySelector(".main-video");
const currentVideo = document.getElementById("mainVideo");
const soundBar = document.getElementById("soundBar");
const progressBar = document.getElementById("progressBar");
const fullscreen = document.getElementById("fullscreen");
const volume = document.getElementById("soundBar");
const mute = document.getElementById("mute");
currentVideo.volume = 0.1;
progressBar.value = 0;

const playing = () => {
  if (currentVideo.paused) {
    currentVideo.play();
    btnPlay.style.display = "none";
    play.style.backgroundImage = "url(../assets/svg/video_icon/pause.svg)";
  } else {
    currentVideo.pause();
    btnPlay.style.display = "block";
    play.style.backgroundImage = "url(../assets/svg/video_icon/play.svg)";
  }
};

const muting = () => {
  if (!video.muted) {
    video.muted = true;
    soundBar.style.pointerEvents = "none";
    mute.style.backgroundImage =
      "url(../assets/svg/video_icon/sound-cancel.svg)";
  } else {
    video.muted = false;
    soundBar.style.pointerEvents = "auto";
    mute.style.backgroundImage = "url(../assets/svg/video_icon/sound.svg)";
  }
};

player.addEventListener("click", () => playing());
play.addEventListener("click", () => playing());
mute.addEventListener("click", (e) => muting());

//++++++++++++++Progress and sound bars+++++++++++++++//

volume.addEventListener("input", function (e) {
  currentVideo.volume = e.currentTarget.value / 100;
  if (currentVideo.volume === 0) {
    mute.style.backgroundImage =
      "url(../assets/svg/video_icon/sound-cancel.svg)";
  } else {
    mute.style.backgroundImage = "url(../assets/svg/video_icon/sound.svg)";
  }
});

soundBar.oninput = function () {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #710707 0%, #710707 0%" +
    value +
    "%, #C4C4C4 " +
    value +
    "%, #C4C4C4 100%)";
};

progressBar.addEventListener("input", function (e) {
  var x = currentVideo.duration / this.max;
  var y = this.value;
  var percentage = x * y;
  currentVideo.currentTime = percentage;
});

currentVideo.addEventListener("timeupdate", () => {
  if (isNaN(currentVideo.duration)) return;

  var percentage = (currentVideo.currentTime / currentVideo.duration) * 100;
  progressBar.style.background =
    "linear-gradient(to right, #710707 0%, #710707 0%" +
    percentage +
    "%, #C4C4C4 " +
    percentage +
    "%, #C4C4C4 100%)";
  progressBar.value = percentage;

  if (currentVideo.currentTime == currentVideo.duration) {
    btnPlay.style.display = "block";
    play.style.backgroundImage = "url(../assets/svg/video_icon/play.svg)";
  }
});

//++++++++++++++++Full screen+++++++++++++//

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (videoFS.webkitRequestFullscreen) {
    videoFS.webkitRequestFullscreen();
  } else {
    videoFS.requestFullscreen();
  }
}

fullscreen.addEventListener("click", (e) => {
  toggleFullScreen();

  if (document.fullscreenElement) {
    fullscreen.style.backgroundImage =
      "url(../assets/svg/video_icon/screen.svg";

    currentVideo.style.cursor = "auto";
  } else {
    fullscreen.style.backgroundImage =
      "url(../assets/svg/video_icon/fullscreen.svg";
    currentVideo.style.cursor = "auto";
  }
});

document.addEventListener("fullscreenchange", exitHandler);
document.addEventListener("webkitfullscreenchange", exitHandler);
document.addEventListener("mozfullscreenchange", exitHandler);
document.addEventListener("MSFullscreenChange", exitHandler);

function exitHandler() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    fullscreen.style.backgroundImage =
      "url(../assets/svg/video_icon/screen.svg";
  }
}

//+++++++++++Interactive controls+++++++++++//

var up = function () {
  currentVideo.style.cursor = "auto";
};

var down = function () {
  if (!currentVideo.paused) {
    currentVideo.style.cursor = "none";
  }
};

currentVideo.addEventListener("mousemove", (e) => {
  currentVideo.style.cursor = "auto";
  if (document.fullscreenElement) {
    up();
  }
  setTimeout(down, 3000);
});

//+++++++++++++++++++++++Controlling video with keys+++++++++++++++++++++++/

window.addEventListener("keypress", function (e) {
  if (event.keyCode == 32 && event.target === document.body) {
    event.preventDefault();
    playing();
  }

  switch (e.code) {
    case "KeyK":
      playing();
      break;
    case "KeyM":
      muting();
      break;
    case "KeyF":
      toggleFullScreen();
      break;
    case "KeyJ":
      currentVideo.currentTime -= 5;
      break;
    case "KeyL":
      currentVideo.currentTime += 5;
      break;
    case "Comma":
      currentVideo.playbackRate -= 0.35;
      break;
    case "Period":
      currentVideo.playbackRate += 0.35;
      break;
    // case 'KeyO':
    //   changeSlide('prev')
    //   break
    // case 'KeyP':
    //   changeSlide('next')
  }
});

//++++++++++++++Slider+++++++++++++++//

const videos = [
  {
    src: "../assets/video/video0.mp4",
    poster: "../assets/img/video_posters/poster0.jpg",
  },
  {
    src: "../assets/video/video1.mp4",
    poster: "../assets/img/video_posters/poster1.jpg",
  },
  {
    src: "../assets/video/video2.mp4",
    poster: "../assets/img/video_posters/poster2.jpg",
  },
  {
    src: "../assets/video/video3.mp4",
    poster: "../assets/img/video_posters/poster3.jpg",
  },
  {
    src: "../assets/video/video4.mp4",
    poster: "../assets/img/video_posters/poster4.jpg",
  },
];

$(document).ready(function () {
  $(".thumbnails").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true, // На десктопе берет 452px из CSS
    centerMode: false,
    dots: true,
    appendDots: ".video-dots",
    nextArrow: ".video__slider_next",
    prevArrow: ".video__slider_prev",
    responsive: [
      {
        breakpoint: 1480, // Планшеты и ниже
        settings: {
          variableWidth: false, // Отключаем фикс. ширину
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});

const mainVideoContainer = document.getElementById("mainVideo");
const dotsContainer = document.querySelector(".video-dots");

let currentIndex = 0;

// Создаем точки навигации
function createDots(count) {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const li = document.createElement("li");
    if (i === 0) li.classList.add("slick-active");
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      setSlide(i);
    });
    li.appendChild(btn);
    dotsContainer.appendChild(li);
  }
}

// Обновление активной точки
function updateDots(index) {
  const dots = document.querySelectorAll(".video-dots li");
  dots.forEach((dot, i) => {
    dot.classList.toggle("slick-active", i === index);
  });
}

// Установка слайда
function setSlide(index) {
  currentIndex = index;
  // Загружаем локальное видео
  const posterImage = videos[index].poster;
  const srcVideo = videos[index].src;
  mainVideoContainer.poster = posterImage;
  mainVideoContainer.src = srcVideo;

  progressBar.value = 0;
  progressBar.style.background =
    "linear-gradient(to right, #710707 0%, #710707 0%" +
    "0%, #C4C4C4 " +
    "0%, #C4C4C4 100%)";

  updateDots(index);
}

// Обработчики миниатюр
document.querySelectorAll(".thumbnail").forEach((thumb, idx) => {
  thumb.addEventListener("click", () => {
    setSlide(parseInt(thumb.getAttribute("data-index")));
  });
});

// Навигация стрелками
document.querySelector(".video__slider_next").addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % videos.length;
  setSlide(newIndex);
});
document.querySelector(".video__slider_prev").addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + videos.length) % videos.length;
  setSlide(newIndex);
});

// Инициализация
createDots(videos.length);
setSlide(0);
