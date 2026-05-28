export default class View {
  constructor() {
    this.app = document.querySelector("#app");
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(...className.split(" "));
    }
    return element;
  }

  renderHome() {
    if (!this.app) {
      this.app = document.querySelector("#app");
    }
    if (!this.app) {
      console.error("Критическая ошибка: Контейнер #app не найден!");
      return;
    }

    this.app.innerHTML = "";
    const container = this.createElement("div", "home-screen fade-in");
    container.innerHTML = `
            <h1 class="logo">МУЗЫКАЛЬНЫЙ КВИЗ</h1>
            <div class="menu-buttons">
                <button id="audio-btn" class="menu-btn">🎶 Угадай мелодию</button>
                <button id="images-btn" class="menu-btn">👤 Композиторы</button>
                <button id="questions-btn" class="menu-btn">🎼 Теория музыки</button>
                <button id="blitz-menu-btn" class="menu-btn blitz-theme-btn">⚡️ Режим Блиц</button>
            </div>
            <button class="settings-btn" id="settings-btn">⚙️</button>
        `;
    this.app.append(container);
  }

  renderCategories(type, results) {
    this.app.innerHTML = "";
    const container = this.createElement("div", "categories-screen fade-in");

    const backBtn = this.createElement("button", "back-btn");
    backBtn.textContent = "🏠 На главную";

    const title = this.createElement("h2", "screen-title");

    if (type === "audio") title.textContent = "УГАДАЙ МЕЛОДИЮ";
    if (type === "images") title.textContent = "КОМПОЗИТОРЫ";
    if (type === "questions") title.textContent = "ТЕОРИЯ МУЗЫКИ";

    const grid = this.createElement("div", "categories-grid");

    let categoriesCount = 12;
    let totalItems = 10;

    if (type === "audio") {
      categoriesCount = 3;
      totalItems = 15;
    }
    if (type === "images") {
      categoriesCount = 1;
      totalItems = 5;
    }
    if (type === "questions") {
      categoriesCount = 5;
      totalItems = 10;
    }

    for (let i = 0; i < categoriesCount; i++) {
      const score = results[type][i];
      const isPlayed = score !== null;

      let starsCount = 0;
      if (isPlayed) {
        if (type === "images") starsCount = Math.floor(score / 1);
        else starsCount = Math.floor(score / 2);
      }
      if (starsCount > 5) starsCount = 5;

      const imgIdx = i;

      const card = this.createElement("div", "category-card");
      if (isPlayed) card.classList.add("played");

      const starsHTML = Array(5)
        .fill(0)
        .map(
          (_, index) => `
                <span class="star-item ${index < starsCount ? "active" : ""}">★</span>
            `,
        )
        .join("");

      card.innerHTML = `
                <div class="category-header">
                    <span class="round">Раунд ${i + 1}</span>
                    ${isPlayed ? `<span class="score-label"><p>${score}</p>/ ${totalItems}</span>` : ""}
                </div>
                <div class="category-image">
                    <img src="./assets/img/${imgIdx}.jpg" class="${isPlayed ? "" : "grayscale"}">
                </div>
                <div class="stars-list">${isPlayed ? starsHTML : ""}</div>
                <button class="results-link ${isPlayed ? "visible" : ""}" data-id="${i}">Результаты</button>
            `;
      card.dataset.id = i;
      card.dataset.type = type;
      grid.append(card);
    }

    container.append(backBtn, title, grid);
    this.app.append(container);
  }

  renderQuestion(questionData, variants, currentStep, type, answers = []) {
    this.app.innerHTML = "";
    const container = this.createElement("div", "question-screen fade-in");

    if (type === "questions") {
      const topQuitBtn = this.createElement(
        "button",
        "menu-btn back-btn quit-theory-top-btn",
      );
      topQuitBtn.textContent = "⬅ Прервать изучение";
      topQuitBtn.style.margin = "0 auto 20px auto";
      topQuitBtn.style.maxWidth = "220px";
      topQuitBtn.style.display = "block";
      container.append(topQuitBtn);
    }

    const header = this.createElement("div", "question-header");

    header.innerHTML = `
            <div class="timer-text" style="font-weight: bold; font-size: 1.2rem;">${type === "questions" ? "" : "00:00"}</div>
            <div class="progress-info" style="color: #666; font-size: 0.95rem;">${currentStep + 1} / ${type === "audio" ? 15 : type === "images" ? 5 : 10}</div>
        `;
    container.append(header);

    let totalSteps = 10;
    if (type === "audio") totalSteps = 15;
    if (type === "images") totalSteps = 5;

    const bulletContainer = this.createElement("div", "bullet-container");
    bulletContainer.style.marginTop = "10px";
    for (let i = 0; i < totalSteps; i++) {
      const bullet = this.createElement("div", "bullet");
      if (answers[i] === true) bullet.classList.add("correct");
      if (answers[i] === false) bullet.classList.add("wrong");
      bulletContainer.append(bullet);
    }
    container.append(bulletContainer);

    const title = this.createElement("h3", "question-title");
    title.style.marginTop = "15px";
    if (type === "audio")
      title.textContent = "КАК НАЗЫВАЕТСЯ ДАННОЕ МУЗЫКАЛЬНОЕ ПРОИЗВЕДЕНИЕ?";
    if (type === "images") title.textContent = "КТО ИЗОБРАЖЕН НА ПОРТРЕТЕ?";
    if (type === "questions") title.textContent = "ИЗУЧЕНИЕ ТЕОРИИ МУЗЫКИ";
    container.append(title);

    if (type === "audio") {
      const vinylWrap = this.createElement("div", "vinyl-container");
      vinylWrap.innerHTML = `
                <div class="vinyl-disk">
                    <div class="vinyl-center"></div>
                </div>
            `;
      container.append(vinylWrap);
    }

    if (type === "images") {
      const imgWrap = this.createElement("div", "question-image");
      imgWrap.innerHTML = `<img src="./assets/img/${questionData.imageNum}.jpg">`;
      container.append(imgWrap);
    }

    if (type === "questions") {
      const flipContainer = this.createElement("div", "flip-card-container");
      flipContainer.innerHTML = `
                <div class="flip-card">
                    <div class="flip-card-front">
                        <div class="card-badge">Вопрос</div>
                        <p class="card-text">${questionData.question}</p>
                        <span class="flip-hint">🔄 Нажмите, чтобы перевернуть</span>
                    </div>
                    <div class="flip-card-back">
                        <div class="card-badge correct">Ответ</div>
                        <p class="card-text">${questionData.answer}</p>
                    </div>
                </div>
            `;
      container.append(flipContainer);

      const controlGrid = this.createElement("div", "menu-buttons");
      controlGrid.style.marginTop = "20px";

      const nextBtn = this.createElement("button", "menu-btn next-theory-btn");
      nextBtn.textContent = "Дальше ➡";
      nextBtn.style.visibility = "hidden";

      controlGrid.append(nextBtn);
      container.append(controlGrid);
      this.app.append(container);
      return;
    }

    const grid = this.createElement("div", "answers-grid");
    variants.forEach((variant) => {
      const btn = this.createElement("button", "answer-btn");
      btn.dataset.answer = variant;
      btn.textContent = variant;
      grid.append(btn);
    });

    container.append(grid);
    this.app.append(container);
  }

  renderBlitzQuestion(questionData, score, numberQuestion, timeLeft) {
    this.app.innerHTML = "";
    const container = this.createElement(
      "div",
      "question-screen blitz-screen fade-in",
    );

    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");

    container.innerHTML = `
            <div class="question-header">
                <div class="blitz-score-info">Счет: <strong>${score}</strong></div>
                <div class="blitz-question-info">Вопрос: <strong>${numberQuestion}</strong></div>
                <div class="timer-text ${timeLeft <= 10 ? "warning" : ""}">${m}:${s}</div>
            </div>
            <h3 class="question-title">${questionData.text}</h3>
            
            ${
              questionData.type === "images"
                ? `
                <div class="question-image">
                    <img src="./assets/img/${questionData.imageNum}.jpg">
                </div>
            `
                : `
                <div class="vinyl-container">
                    <div class="vinyl-disk">
                        <div class="vinyl-center"></div>
                    </div>
                </div>
            `
            }
            
            <div class="blitz-answers-grid">
                <button class="blitz-btn answer-yes" data-choice="true">ДА</button>
                <button class="blitz-btn answer-no" data-choice="false">НЕТ</button>
            </div>
            <button class="menu-btn quit-blitz-btn" style="margin: 20px auto 0 auto; max-width: 240px; display: block;">Прервать игру</button>
        `;
    this.app.append(container);
  }

  renderBlitzMenu(stats) {
    this.app.innerHTML = "";
    const container = this.createElement("div", "categories-screen fade-in");
    container.innerHTML = `
            <h2 class="screen-title">РЕЖИМ БЛИЦ</h2>
            <div class="blitz-stats-card">
                <p>Сыграно игр: <strong>${stats.gamesPlayed}</strong></p>
                <p>Лучший рекорд: <strong>${stats.highScore} очков</strong></p>
            </div>
            <button id="start-blitz-btn" class="menu-btn" style="margin: 20px auto; display: block; max-width: 320px;">Старт (1 минута)</button>
            <button class="back-btn">🏠 На главную</button>
        `;
    this.app.append(container);
  }

  renderResults(
    categoryData,
    categoryResults,
    categoryScore,
    categoryIndex,
    type,
  ) {
    this.app.innerHTML = "";
    const container = this.createElement("div", "results-screen fade-in");

    const btnContainer = this.createElement("div", "results-buttons-wrap");

    const backBtn = this.createElement("button", "back-to-categories-btn");
    backBtn.textContent = "Назад";
    backBtn.dataset.type = type;

    const retryBtn = this.createElement("button", "retry-btn");
    retryBtn.textContent = "Изучить снова";
    retryBtn.dataset.id = categoryIndex;
    retryBtn.dataset.type = type;

    btnContainer.append(backBtn, retryBtn);

    const title = this.createElement("h2", "screen-title");
    title.textContent = "РЕЗУЛЬТАТЫ";

    let totalItems = 10;
    if (type === "audio") totalItems = 15;
    if (type === "images") totalItems = 5;

    const scoreInfo = this.createElement("p", "results-score-info");

    if (type === "questions") {
      scoreInfo.textContent = `Вы изучили материалы этой категории (${totalItems} вопросов)`;
    } else {
      scoreInfo.textContent = `Ты ответил на ${categoryScore || 0} из ${totalItems} вопросов`;
    }

    const grid = this.createElement("div", "results-grid");

    if (type !== "images") {
      grid.style.display = "flex";
      grid.style.flexDirection = "column";
      grid.style.alignItems = "stretch";
      grid.style.gap = "10px";
      grid.style.maxWidth = "500px";
      grid.style.margin = "0 auto 30px auto";
    }

    categoryData.forEach((item, index) => {
      const isCorrect = categoryResults && categoryResults[index] === true;
      const card = this.createElement("div", "result-card");
      card.dataset.index = index;

      if (type !== "images") {
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.gap = "15px";
        card.style.padding = "12px 15px";
        card.style.background = "#f9f9f9";
        card.style.border = "1px solid #e0e0e0";
        card.style.borderRadius = "6px";
        card.style.cursor = "pointer";
        card.style.textAlign = "left";
      } else {
        if (!isCorrect) card.classList.add("grayscale");
      }

      if (type === "images") {
        card.innerHTML = `<img src="./assets/img/${item.imageNum}.jpg" alt="composer">`;
      } else if (type === "audio") {
        card.innerHTML = `
                    <span style="font-size: 1.2rem; color: ${isCorrect ? "#4caf50" : "#f44336"}">
                        ${isCorrect ? "✔" : "✖"}
                    </span>
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold; font-size: 1rem; color: ${isCorrect ? "#000" : "#777"}">«${item.name}»</div>
                        <div style="font-size: 0.85rem; color: #666;">${item.category}</div>
                    </div>
                `;
      } else {
        card.innerHTML = `
                    <span style="font-size: 1.2rem; color: ${isCorrect ? "#4caf50" : "#ddd"}">✔</span>
                    <div style="font-size: 0.95rem; color: ${isCorrect ? "#000" : "#aaa"}; flex-grow: 1;">
                        ${item.question}
                    </div>
                `;
      }
      grid.append(card);
    });

    container.append(btnContainer, title, scoreInfo, grid);
    this.app.append(container);
  }

  renderPictureInfoModal(item, type) {
    const overlay = this.createElement(
      "div",
      "modal-overlay active pic-info-overlay",
    );
    let contentHTML = "";

    if (type === "images") {
      contentHTML = `
                <img src="./assets/img/${item.imageNum}.jpg" class="modal-img">
                <p class="pic-author" style="font-weight: bold; margin-top: 15px; font-size: 1.2rem; color: #000000;">${item.author || "Неизвестен"}</p>
            `;
    } else if (type === "audio") {
      contentHTML = `
                <div class="end-round-icon" style="font-size: 48px; margin-bottom: 10px;">🎵</div>
                <p class="pic-name" style="font-weight: bold; font-size: 1.2rem;">«${item.name}»</p>
                <p class="pic-author" style="font-size: 1rem; color: #555;">Категория: ${item.category}</p>
            `;
    } else {
      contentHTML = `
                <div class="end-round-icon" style="font-size: 48px; margin-bottom: 10px;">📝</div>
                <p class="pic-name" style="font-weight: bold; font-size: 1.1rem; text-align: left; padding: 0 10px; margin-bottom: 10px;">${item.question}</p>
                <p class="pic-author" style="font-size: 1.1rem; color: #4caf50; font-weight: bold;">Правильный ответ: ${item.answer}</p>
            `;
    }

    overlay.innerHTML = `
            <div class="modal-content">
                ${contentHTML}
                <button class="menu-btn close-info-btn" style="margin-top: 15px; max-width: 160px; padding: 10px 20px;">Закрыть</button>
            </div>
        `;
    document.body.append(overlay);
  }

  renderModal(isCorrect, correctData, type) {
    const overlay = this.createElement("div", "modal-overlay active");
    let contentHTML = "";

    if (type === "images") {
      contentHTML = `
                <img src="./assets/img/${correctData.imageNum}.jpg" class="modal-img">
                <p class="pic-name">${correctData.author}</p>
            `;
    } else if (type === "audio") {
      contentHTML = `
                <div class="end-round-icon" style="font-size: 48px; margin-bottom: 10px;">🎵</div>
                <p class="pic-name">«${correctData.name}»</p>
                <p class="pic-author">Категория: ${correctData.category}</p>
            `;
    }

    overlay.innerHTML = `
            <div class="modal-content fade-in">
                <div class="icon ${isCorrect ? "correct" : "wrong"}">${isCorrect ? "&#10003;" : "&#10005;"}</div>
                ${contentHTML}
                <div class="modal-buttons">
                    <button class="quit-btn back-btn">🏠 На главную</button>
                    <button class="next-btn">Следующий</button>
                </div>
            </div>
        `;
    document.body.append(overlay);
  }

  renderEndRoundModal(wrongPool, score, numberQuestion, totalQuestions) {
    const overlay = this.createElement(
      "div",
      "modal-overlay active end-round-overlay",
    );
    const isBlitz = totalQuestions === 0;

    overlay.innerHTML = `
            <div class="modal-content end-round-content fade-in">
                <div class="end-round-icon">🏆</div>
                <h2 class="end-round-title">${isBlitz ? "Раунд завершен!" : wrongPool.length === 0 ? "Раунд завершен!" : "Время вышло!"}</h2>
                <p class="end-round-result">Ваш результат: <span class="highlight-score">${score}</span> ${isBlitz ? `очков из <span class="highlight-numberQuestion">${numberQuestion - 1}</span>` : `из ${totalQuestions}`}</p>
                <button class="end-round-btn ${isBlitz ? "back-to-blitz-menu-btn" : "continue-btn"}">Продолжить</button>
            </div>
        `;
    document.body.append(overlay);
  }

  updateTimer(seconds) {
    const timer = document.querySelector(".timer-text");
    if (!timer) return;
    const s = seconds % 60;
    const m = Math.floor(seconds / 60);
    timer.classList.remove("warning");
    timer.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    if (seconds <= 5) timer.classList.add("warning");
  }

  renderSettings(config) {
    this.app.innerHTML = "";
    const container = this.createElement("div", "settings-screen fade-in");
    container.innerHTML = `
            <h2 class="settings-title">НАСТРОЙКИ</h2>
            <div class="settings-wrapper">
              <div class="settings-card">
               <p class="label-text">ЗВУК</p>
                <div class="icon-volume">${config.volume > 0 ? "🔊" : "🔇"}</div>
                <input type="range" id="volume-range" min="0" max="100" value="${config.volume}">
                <div class="toggle-group">
                    <input type="checkbox" id="volume-switch" ${config.volume > 0 ? "checked" : ""}>
                    <label for="volume-switch">ВКЛ/ВЫКЛ</label>
                </div>
               
            </div>
            <div class="settings-card">
            <p class="label-text">ТАЙМЕР</p>
                <div class="icon-time">⏱️</div>
                <div class="time-controls">
                    <input type="range" id="time-range" min="5" max="30" step="5" value="${config.timeStep || 10}">
                   
                </div>
                 <span class="time-value">⏳ ${config.timeStep || 10}</span>
                <div class="toggle-group">
                    <input type="checkbox" id="time-switch" ${config.timeGame ? "checked" : ""}>
                    <label for="time-switch">ВКЛ/ВЫКЛ</label>
                </div>
                
            </div>
 </div>
            
            <button class="save-settings-btn back-btn">Сохранить</button>
        `;
    this.app.append(container);
  }

  renderBlitzEndModal(score, numberQuestion, hasErrors = false) {
    const overlay = this.createElement(
      "div",
      "modal-overlay active blitz-end-overlay",
    );

    const superGameButtonHTML = hasErrors
      ? `<button class="menu-btn start-super-blitz-btn" style="background-color: #ff9800 !important;">Хочешь сыграть в Супер-игру?</button>`
      : `<p style="color: #4caf50; font-weight: bold; margin-bottom: 10px;">✨ Идеальный раунд без ошибок! ✨</p>`;

    overlay.innerHTML = `
            <div class="modal-content end-round-content fade-in">
                <div class="end-round-icon">⏱️</div>
                <h2 class="end-round-title">Время вышло!</h2>
                <p class="end-round-result" style="margin-bottom: 20px;">Ваш результат: <span class="highlight-score">${score}</span> очков из <span class="highlight-numberQuestion">${numberQuestion - 1}</span></p>
                
                <div class="modal-buttons">
                    ${superGameButtonHTML}
                    <button class="menu-btn back-to-blitz-menu-btn">В главное меню игры</button>
                </div>
            </div>
        `;
    document.body.append(overlay);
  }
}
