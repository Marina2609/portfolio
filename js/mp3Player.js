const playInList = document.getElementById("playInList");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const audio = document.querySelector("audio");
const audioTimeTreak = document.querySelector(".audio-time");
const playItem = document.querySelector(".play-item");
const treckName = document.querySelector(".track-name");
const curTimeAudio = document.querySelector(".current-time");
const durTimeAudio = document.querySelector(".duration-time");
const audioVolumeTreak = document.querySelector(".audio-volume");
const playTime = document.querySelector(".play-time");
const playBtn = document.querySelector(".play");
const playList = document.querySelector(".play-list");
const soundBtn = document.querySelector(".sound-btn");
const volumeControl = document.querySelector(".volume-control");

// Массив с названиями песен
const tracks = [
  "Aqua Caelestis",
  "River Flows In You",
  "Summer Wind",
  "Ennio Morricone",
];

// Очищаем содержимое ul, если нужно
playList.innerHTML = "";

// Создаем и добавляем li с кнопками
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.className = "play-item";
  li.id = `play-item${index}`;
  li.setAttribute("value", index);

  li.appendChild(document.createTextNode(track));

  const button = document.createElement("button");
  button.id = "playInList";
  button.className = `playInList${index} player-icon`;
  button.setAttribute("value", index);

  li.appendChild(button);
  playList.appendChild(li);
});

playTime.onclick = audioRewind;

soundBtn.onclick = function () {
  if (audio.muted) {
    audio.muted = false;
    soundBtn.style.backgroundImage = "url(assets/svg/sound.svg)";
  } else {
    audio.muted = true;
    soundBtn.style.backgroundImage = "url(assets/svg/sound-cancel.svg)";
  }
};

/*---------------- Аудиоплеер ------------*/
let trackIndex = 0; // Индекс текущего трека
let isPlaying = false;
let audioPlayInterval = null;

// Инициализация плеера при загрузке страницы
window.onload = () => {
  trackIndex = 0;

  updateTrackInfo();

  audio.pause();

  updatePlayPauseUI();
  updatePlaylistUI();
  updateVolumeUI();
};

// Обновляем отображение названия трека и src аудио
function updateTrackInfo() {
  treckName.textContent = tracks[trackIndex];
  audio.src = `assets/sounds/${tracks[trackIndex]}.mp3`;
  audio.currentTime = 0;
}

// Обновляем UI кнопки play/pause
function updatePlayPauseUI() {
  if (isPlaying) {
    playBtn.style.backgroundImage = "url(assets/svg/pause.svg)";
  } else {
    playBtn.style.backgroundImage = "url(assets/svg/play.svg)";
  }
}

// Обновляем UI списка треков — подсвечиваем текущий и меняем иконки
function updatePlaylistUI() {
  tracks.forEach((track, i) => {
    const li = document.getElementById(`play-item${i}`);
    const btn = document.querySelector(`.playInList${i}`);

    if (!li || !btn) return;

    if (i === trackIndex && isPlaying) {
      li.style.color = "#C5B358";
      btn.style.backgroundImage = isPlaying
        ? "url(assets/svg/pause.svg)"
        : "url(assets/svg/play.svg)";
    } else {
      li.style.color = "#FFF";
      btn.style.backgroundImage = "url(assets/svg/play.svg)";
    }
  });
}

// Обновляем прогресс и время воспроизведения
function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  if (duration && currentTime >= 0) {
    const percent = Math.round((currentTime / duration) * 100);
    playTime.value = percent;
    playTime.style.background = `linear-gradient(to right, #474747 0%, #474747 ${percent}%, #dddddd ${percent}%, #dddddd 100%)`;

    // Форматируем время
    const curMins = Math.floor(currentTime / 60);
    const curSecs = Math.floor(currentTime % 60);
    const durMins = Math.floor(duration / 60);
    const durSecs = Math.floor(duration % 60);

    curTimeAudio.textContent = `0${curMins}:${
      curSecs < 10 ? "0" : ""
    }${curSecs}`;
    durTimeAudio.textContent = `0${durMins}:${
      durSecs < 10 ? "0" : ""
    }${durSecs}`;
  }
}

// Запускаем воспроизведение или ставим на паузу
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

// Обработчик события play
audio.onplaying = () => {
  isPlaying = true;

  updatePlayPauseUI();
  updatePlaylistUI();

  if (!audioPlayInterval) {
    audioPlayInterval = setInterval(() => {
      updateProgress();
    }, 500);
  }
};

// Обработчик события pause
audio.onpause = () => {
  isPlaying = false;

  updatePlayPauseUI();
  updatePlaylistUI();

  if (audioPlayInterval) {
    clearInterval(audioPlayInterval);
    audioPlayInterval = null;
  }
};

// Добавляем обработчик окончания трека
audio.addEventListener("ended", () => {
  playNextTrack();
});

// Переключение на следующий трек
function playNextTrack() {
  trackIndex = (trackIndex + 1) % tracks.length;

  updateTrackInfo();

  audio.play();

  updatePlaylistUI();
}

// Переключение на предыдущий трек
function playPrevTrack() {
  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;

  updateTrackInfo();

  audio.play();

  updatePlaylistUI();
}

// Обработчик клика по кнопке в списке треков
function playTrackFromList(event) {
  const target = event.target;

  if (target.tagName !== "BUTTON") return;

  const value = parseInt(target.getAttribute("value"), 10);

  if (isNaN(value) || value < 0 || value >= tracks.length) return;

  if (trackIndex === value) {
    // Если кликнули по текущему треку — переключаем play/pause
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  } else {
    // Если кликнули по другому треку — переключаем на него и запускаем
    trackIndex = value;

    updateTrackInfo();

    audio.play();
  }

  updatePlaylistUI();
}

// Обработчик перемотки по прогрессбару. Перемещение ползунка
function audioRewind(event) {
  const rect = this.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const width = rect.width;
  const percent = offsetX / width;

  audio.currentTime = audio.duration * percent;

  updateProgress();
}

// Обработчик изменения громкости
function changeVolume() {
  const value = this.value;
  audio.volume = value / 100;

  if (audio.volume === 0) {
    soundBtn.style.backgroundImage = "url(assets/svg/sound-cancel.svg)";
  } else {
    soundBtn.style.backgroundImage = "url(assets/svg/sound.svg)";
  }

  this.style.background = `linear-gradient(to right, #474747 0%, #474747 ${value}%, #dddddd ${value}%, #dddddd 100%)`;
}

// Слушатели событий
playBtn.addEventListener("click", togglePlayPause);
playPrev.addEventListener("click", playPrevTrack);
playNext.addEventListener("click", playNextTrack);
playList.addEventListener("click", playTrackFromList);
playTime.addEventListener("click", audioRewind);
volumeControl.addEventListener("input", changeVolume);
