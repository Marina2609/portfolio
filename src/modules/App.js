import View from "./View.js";
import Settings from "./Settings.js";
import { Game, BlitzGame } from "./Game.js";
import audioData from "../../assets/audio.js";
import imagesData from "../../assets/images.js";
import questionsData from "../../assets/questions.js";

export default class App {
  constructor() {
    this.view = new View();
    this.settings = new Settings();
    this.currentGame = null;
    this.blitzGame = null;
  }

  init() {
    this.view.renderHome();
    this.addEventListeners();
  }

  startNewRound(type, categoryIndex) {
    this.currentGame = new Game(type, categoryIndex);
    this.showNextQuestion();
  }

  showNextQuestion() {
    const currentQuestion =
      this.currentGame.questions[this.currentGame.questionIndex];
    let correctAnswer = "";

    if (this.currentGame.type === "audio")
      correctAnswer = `${currentQuestion.name} — ${currentQuestion.category}`;
    if (this.currentGame.type === "images")
      correctAnswer = currentQuestion.author;
    if (this.currentGame.type === "questions")
      correctAnswer = currentQuestion.answer;

    const variants =
      this.currentGame.type === "questions"
        ? [correctAnswer]
        : this.currentGame.getAnswers(correctAnswer);

    this.view.renderQuestion(
      currentQuestion,
      variants,
      this.currentGame.questionIndex,
      this.currentGame.type,
      this.currentGame.answers,
    );

    if (this.currentGame.type === "audio") {
      this.currentGame.playAudio(this.settings.config.volume);
    }

    if (
      this.settings.config.timeGame &&
      this.currentGame.type !== "questions"
    ) {
      const timeLimit = this.settings.config.timeStep || 10;
      this.view.updateTimer(timeLimit);
      this.currentGame.startTimer(
        timeLimit,
        (time) => this.view.updateTimer(time),
        () => this.handleAnswer(null),
      );
    }
  }

  handleAnswer(userAnswer) {
    if (
      this.settings.config.timeGame &&
      this.currentGame.type !== "questions"
    ) {
      this.currentGame.stopTimer();
    }
    this.currentGame.stopAudio();

    const result = this.currentGame.checkAnswer(userAnswer);

    const allButtons = document.querySelectorAll(".answer-btn");
    const currentQuestion =
      this.currentGame.questions[this.currentGame.questionIndex];

    let correctValue = "";

    if (this.currentGame.type === "audio")
      correctValue = `${currentQuestion.name} — ${currentQuestion.category}`;
    if (this.currentGame.type === "images")
      correctValue = currentQuestion.author;
    if (this.currentGame.type === "questions")
      correctValue = currentQuestion.answer;

    allButtons.forEach((btn) => {
      btn.style.pointerEvents = "none";

      const btnText = btn.textContent.trim();
      const userText = userAnswer ? String(userAnswer).trim() : "";
      const correctText = String(correctValue).trim();

      if (userText && btnText === userText) {
        btn.classList.add(result.isCorrect ? "correct-choice" : "wrong-choice");
      }
      if (btnText === correctText) {
        btn.classList.add("correct-choice");
      }
    });

    this.settings.saveResult(
      this.currentGame.type,
      this.currentGame.categoryIndex,
      this.currentGame.score,
      this.currentGame.answers,
    );

    this.playSound(result.isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      this.view.renderModal(
        result.isCorrect,
        result.correctData,
        this.currentGame.type,
      );
    }, 1000);
  }

  startBlitz() {
    this.blitzGame = new BlitzGame();
    this.showNextBlitzQuestion();

    this.blitzGame.startTimer(
      (time) => {
        this.view.updateTimer(time);
        this.blitzGame.timeLeft = time;
      },
      () => this.handleBlitzTimeOut(),
    );
  }

  showNextBlitzQuestion() {
    const questionData = this.blitzGame.generateQuestion();
    this.view.renderBlitzQuestion(
      questionData,
      this.blitzGame.score,
      this.blitzGame.numberQuestion,
      this.blitzGame.timeLeft,
    );
    this.blitzGame.playAudio(this.settings.config.volume);
  }

  handleBlitzAnswer(userChoice) {
    if (!this.blitzGame) return;

    this.blitzGame.stopAudio();

    const isCorrect = this.blitzGame.checkAnswer(userChoice);
    this.playSound(isCorrect ? "correct" : "wrong");

    if (this.blitzGame.isSuperGame && this.blitzGame.wrongPool.length === 0) {
      const blitzModal = document.querySelector(".blitz-end-overlay");

      if (blitzModal) blitzModal.remove();

      this.view.renderEndRoundModal(
        this.blitzGame.wrongPool,
        this.blitzGame.score,
        this.blitzGame.numberQuestion,
        0,
      );
      this.blitzGame = null;
      return;
    }

    this.showNextBlitzQuestion();
  }

  handleBlitzTimeOut() {
    if (!this.blitzGame) return;

    this.blitzGame.stopTimer();
    this.blitzGame.stopAudio();
    this.settings.saveBlitzResult(this.blitzGame.score);

    const hasErrors = this.blitzGame.wrongPool.length > 0;

    this.view.renderBlitzEndModal(
      this.blitzGame.score,
      this.blitzGame.numberQuestion,
      hasErrors,
    );
  }

  activateSuperGame() {
    if (!this.blitzGame) return;
    this.blitzGame.numberQuestion =
      this.blitzGame.numberQuestion - this.blitzGame.wrongPool.length;

    document.querySelector(".end-round-overlay").remove();
    this.blitzGame.isSuperGame = true;
    this.view.updateTimer(0);
    this.showNextBlitzQuestion();
  }

  playSound(resultName) {
    const audio = new Audio(`./assets/mp3/${resultName}.mp3`);
    audio.volume = this.settings.config.volume / 100;
    audio.currentTime = 0;
    audio.play().catch(() => console.warn("Звуковой эффект не найден"));
  }

  addEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.id === "audio-btn")
        this.view.renderCategories("audio", this.settings.results);
      if (e.target.id === "images-btn")
        this.view.renderCategories("images", this.settings.results);
      if (e.target.id === "questions-btn")
        this.view.renderCategories("questions", this.settings.results);
      if (e.target.id === "settings-btn")
        this.view.renderSettings(this.settings.config);
      if (
        e.target.id === "blitz-menu-btn" ||
        e.target.classList.contains("back-to-blitz-menu-btn")
      ) {
        const modal = document.querySelector(".modal-overlay");
        if (modal) modal.remove();

        if (this.blitzGame) this.blitzGame.stopTimer();
        this.blitzGame = null;
        this.view.renderBlitzMenu(this.settings.blitz);
        return;
      }
      if (e.target.id === "start-blitz-btn") this.startBlitz();

      const blitzBtn = e.target.closest(".blitz-btn");
      if (blitzBtn) {
        this.handleBlitzAnswer(blitzBtn.dataset.choice === "true");
      }

      const backToCatsBtn = e.target.closest(".back-to-categories-btn");
      if (backToCatsBtn) {
        this.view.renderCategories(
          backToCatsBtn.dataset.type,
          this.settings.results,
        );
        return;
      }

      const categoryCard = e.target.closest(".category-card");
      if (categoryCard && !e.target.classList.contains("results-link")) {
        const { id, type } = categoryCard.dataset;
        this.startNewRound(type, parseInt(id));
      }

      const flipCard = e.target.closest(".flip-card");
      if (flipCard) {
        flipCard.classList.add("flipped");

        const nextTheoryBtn = document.querySelector(".next-theory-btn");
        if (nextTheoryBtn) nextTheoryBtn.style.visibility = "visible";

        if (this.currentGame && this.currentGame.type === "questions") {
          if (
            this.currentGame.answers.length === this.currentGame.questionIndex
          ) {
            this.currentGame.answers.push(true);
            this.settings.saveResult(
              this.currentGame.type,
              this.currentGame.categoryIndex,
              this.currentGame.score,
              this.currentGame.answers,
            );
          }
        }
      }

      if (e.target.classList.contains("results-link")) {
        const categoryIndex = parseInt(e.target.dataset.id);
        const parentCard = e.target.closest(".category-card");
        const type = parentCard ? parentCard.dataset.type : "audio";

        let itemsPerCategory = 10;
        if (type === "audio") itemsPerCategory = 15;
        if (type === "images") itemsPerCategory = 5;

        const start = categoryIndex * itemsPerCategory;

        let sourcePool = audioData;
        if (type === "images") sourcePool = imagesData;
        if (type === "questions") sourcePool = questionsData;

        const categoryData = sourcePool.slice(start, start + itemsPerCategory);

        this.view.renderResults(
          categoryData,
          this.settings.fullAnswers[type][categoryIndex],
          this.settings.results[type][categoryIndex],
          categoryIndex,
          type,
        );
      }

      const resultCard = e.target.closest(".result-card");

      if (resultCard) {
        const index = parseInt(resultCard.dataset.index);
        const parent = resultCard.closest(".results-screen");
        const retryBtn = parent ? parent.querySelector(".retry-btn") : null;
        if (retryBtn) {
          const catIdx = parseInt(retryBtn.dataset.id);
          const gameType = retryBtn.dataset.type;

          let itemsCount = 10;
          if (gameType === "audio") itemsCount = 15;
          if (gameType === "images") itemsCount = 5;

          let sourcePool = audioData;
          if (gameType === "images") sourcePool = imagesData;
          if (gameType === "questions") sourcePool = questionsData;

          this.view.renderPictureInfoModal(
            sourcePool[catIdx * itemsCount + index],
            gameType,
          );
        }
      }
      if (e.target.classList.contains("close-info-btn")) {
        const infoModal = document.querySelector(".pic-info-overlay");
        if (infoModal) infoModal.remove();
      }

      const retryBtn = e.target.closest(".retry-btn");

      if (retryBtn) {
        this.startNewRound(
          retryBtn.dataset.type,
          parseInt(retryBtn.dataset.id),
        );
      }

      const answerBtn = e.target.closest(".answer-btn");
      if (answerBtn) {
        this.handleAnswer(answerBtn.dataset.answer);
      }

      if (e.target.classList.contains("next-theory-btn")) {
        if (
          this.currentGame.answers.length === this.currentGame.questionIndex
        ) {
          this.currentGame.answers.push(true);
        }

        this.currentGame.score = this.currentGame.answers.filter(
          (ans) => ans === true,
        ).length;
        this.settings.saveResult(
          this.currentGame.type,
          this.currentGame.categoryIndex,
          this.currentGame.score,
          this.currentGame.answers,
        );

        if (this.currentGame.nextQuestion()) {
          this.showNextQuestion();
        } else {
          const type = this.currentGame.type;
          this.currentGame = null;
          this.view.renderCategories(type, this.settings.results);
        }
      }

      if (e.target.classList.contains("next-btn")) {
        document.querySelector(".modal-overlay").remove();
        if (this.currentGame.nextQuestion()) {
          this.showNextQuestion();
        } else {
          let itemsCount = 10;
          if (this.currentGame.type === "audio") itemsCount = 15;
          if (this.currentGame.type === "images") itemsCount = 5;

          this.view.renderEndRoundModal(
            [],
            this.currentGame.score,
            this.currentGame.numberQuestion,
            itemsCount,
          );
        }
      }

      if (e.target.classList.contains("continue-btn")) {
        document.querySelector(".end-round-overlay").remove();
        const type = this.currentGame.type;
        this.currentGame = null;
        this.view.renderCategories(type, this.settings.results);
      }

      const quitBtn =
        e.target.closest(".quit-blitz-btn") ||
        e.target.closest(".quit-btn") ||
        e.target.closest(".back-btn");
      if (quitBtn) {
        const modal = document.querySelector(".modal-overlay");
        if (modal) modal.remove();

        if (this.currentGame) {
          if (this.currentGame.type !== "questions") {
            this.currentGame.stopTimer();
          }
          this.currentGame.stopAudio();

          this.settings.saveResult(
            this.currentGame.type,
            this.currentGame.categoryIndex,
            this.currentGame.score,
            this.currentGame.answers,
          );

          const type = this.currentGame.type;
          this.currentGame = null;

          if (type === "questions") {
            this.view.renderCategories(type, this.settings.results);
            return;
          }
        }

        if (this.blitzGame) {
          this.blitzGame.stopTimer();
          this.settings.saveBlitzResult(this.blitzGame.score);

          this.blitzGame = null;
          this.view.renderBlitzMenu(this.settings.blitz);
          return;
        }

        this.view.renderHome();
      }

      if (e.target.id === "volume-switch") {
        const vol = e.target.checked ? 50 : 0;
        this.settings.save({ volume: vol });
        if (document.querySelector("#volume-range"))
          document.querySelector("#volume-range").value = vol;
      }
      if (e.target.id === "time-switch")
        this.settings.save({ timeGame: e.target.checked });

      if (e.target.classList.contains("start-super-blitz-btn")) {
        const blitzModal = document.querySelector(".blitz-end-overlay");
        if (blitzModal) blitzModal.remove();

        if (this.blitzGame) {
          this.blitzGame.isSuperGame = true;
          this.showNextBlitzQuestion();
        }
        return;
      }

      if (e.target.classList.contains("back-to-blitz-menu-btn")) {
        const blitzModal = document.querySelector(".blitz-end-overlay");
        if (blitzModal) blitzModal.remove();

        const endRoundModal = document.querySelector(".end-round-overlay");
        if (endRoundModal) endRoundModal.remove();

        this.blitzGame = null;
        this.view.renderBlitzMenu(this.settings.blitz);
        return;
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.id === "volume-range")
        this.settings.save({ volume: e.target.value });
      if (e.target.id === "time-range") {
        const val = parseInt(e.target.value);
        this.settings.save({ timeStep: val });
        if (document.querySelector(".time-value"))
          document.querySelector(".time-value").textContent = `${"⏳ "}` + val;
      }
    });
  }
}
