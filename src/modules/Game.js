import audioData from "../../assets/audio.js";
import imagesData from "../../assets/images.js";
import questionsData from "../../assets/questions.js";

export class Game {
  constructor(type, categoryIndex) {
    this.type = type;
    this.categoryIndex = categoryIndex;
    this.questionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.currentAudio = null;
    this.questions = this.getQuestions();
  }

  getQuestions() {
    let itemsPerCategory = 10;
    if (this.type === "audio") itemsPerCategory = 15;
    if (this.type === "images") itemsPerCategory = 5;
    if (this.type === "questions") itemsPerCategory = 10;

    const start = this.categoryIndex * itemsPerCategory;
    const sourceData = this.getSourceData();
    return sourceData.slice(start, start + itemsPerCategory);
  }

  getSourceData() {
    if (this.type === "audio") return audioData;
    if (this.type === "images") return imagesData;
    return questionsData;
  }

  playAudio(volume) {
    this.stopAudio();
    if (this.type !== "audio") return;

    const currentQuestion = this.questions[this.questionIndex];
    this.currentAudio = new Audio(
      `./assets/audio/${currentQuestion.audioNum}.m4a`,
    );
    this.currentAudio.volume = volume / 100;
    this.currentAudio.play().catch(() => console.warn("Файл трека не найден"));
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  checkAnswer(userAnswer) {
    const currentQuestion = this.questions[this.questionIndex];
    let correctAnswer = "";

    if (this.type === "audio")
      correctAnswer = `${currentQuestion.name} — ${currentQuestion.category}`;
    if (this.type === "images") correctAnswer = currentQuestion.author;
    if (this.type === "questions") correctAnswer = currentQuestion.answer;

    // В режиме теории любой клик по единственной кнопке считается верным изучением темы
    const isCorrect =
      this.type === "questions"
        ? true
        : String(userAnswer).trim() === String(correctAnswer).trim();

    this.answers.push(isCorrect);
    if (isCorrect) this.score++;

    return {
      isCorrect,
      correctData: currentQuestion,
      currentScore: this.score,
    };
  }

  nextQuestion() {
    this.stopAudio();
    this.questionIndex++;

    let totalSteps = 10;
    if (this.type === "audio") totalSteps = 15;
    if (this.type === "images") totalSteps = 5;

    return this.questionIndex < totalSteps;
  }

  getAnswers(correctAnswer) {
    const variants = [correctAnswer];

    // ИСПРАВЛЕНО: Если это теория, возвращаем только 1 правильный ответ без генерации дубликатов [INDEX]
    if (this.type === "questions") {
      return variants;
    }

    const sourceData = this.getSourceData();
    while (variants.length < 4) {
      const randomItem =
        sourceData[Math.floor(Math.random() * sourceData.length)];
      let variant = "";

      if (this.type === "audio")
        variant = `${randomItem.name} — ${randomItem.category}`;
      if (this.type === "images") variant = randomItem.author;

      if (variant && !variants.includes(variant)) {
        variants.push(variant);
      }
    }
    return this.shuffle(variants);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startTimer(timeLimit, onTick, onTimeOut) {
    this.timeLeft = timeLimit;
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (onTick) onTick(this.timeLeft);
      if (this.timeLeft <= 0) {
        this.stopTimer();
        if (onTimeOut) onTimeOut();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
}

export class BlitzGame {
  constructor() {
    this.score = 0;
    this.timeLeft = 60;
    this.currentQuestion = null;
    this.isStatementCorrect = false;
    this.currentAudio = null;
  }

  // Внутри класса BlitzGame в Game.js замените этот метод:
  generateQuestion() {
    this.stopAudio();
    const pool = Math.random() > 0.5 ? "audio" : "images";
    this.isStatementCorrect = Math.random() > 0.5;

    if (pool === "audio") {
      const randomTrack =
        audioData[Math.floor(Math.random() * audioData.length)];

      // Склеиваем правильную строку в формате "Категория — Название"
      let displayedStatement = `${randomTrack.category} — ${randomTrack.name}`;

      if (!this.isStatementCorrect) {
        // Если утверждение ложно, подменяем на совершенно другой случайный трек
        let wrongTrack;
        do {
          wrongTrack = audioData[Math.floor(Math.random() * audioData.length)];
        } while (wrongTrack.name === randomTrack.name);
        displayedStatement = `${wrongTrack.category} — ${wrongTrack.name}`;
      }

      this.currentQuestion = {
        type: "audio",
        audioNum: randomTrack.audioNum,
        text: `Этот музыкальный фрагмент — «${displayedStatement}»?`,
        correctData: randomTrack,
      };
    } else {
      const randomImg =
        imagesData[Math.floor(Math.random() * imagesData.length)];
      let displayedAuthor = randomImg.author;

      if (!this.isStatementCorrect) {
        let wrongImg;
        do {
          wrongImg = imagesData[Math.floor(Math.random() * imagesData.length)];
        } while (wrongImg.author === randomImg.author);
        displayedAuthor = wrongImg.author;
      }

      this.currentQuestion = {
        type: "images",
        imageNum: randomImg.imageNum,
        text: `На портрете изображен композитор ${displayedAuthor}?`,
        correctData: randomImg,
      };
    }

    return this.currentQuestion;
  }

  playAudio(volume) {
    if (this.currentQuestion.type === "audio") {
      this.currentAudio = new Audio(
        `./assets/audio/${this.currentQuestion.audioNum}.m4a`,
      );
      this.currentAudio.volume = volume / 100;
      this.currentAudio
        .play()
        .catch(() => console.warn("Файл трека блица не найден"));
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  checkAnswer(userChoice) {
    const isCorrect = userChoice === this.isStatementCorrect;
    if (isCorrect) {
      this.score++;
      this.timeLeft += 4;
    }
    return isCorrect;
  }

  startTimer(onTick, onTimeOut) {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (onTick) onTick(this.timeLeft);
      if (this.timeLeft <= 0) {
        this.stopAudio();
        clearInterval(this.timerInterval);
        if (onTimeOut) onTimeOut();
      }
    }, 1000);
  }

  stopTimer() {
    this.stopAudio();
    clearInterval(this.timerInterval);
  }
}
