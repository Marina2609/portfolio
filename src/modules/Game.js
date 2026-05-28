import audioData from "../../assets/audio.js";
import imagesData from "../../assets/images.js";
import questionsData from "../../assets/questions.js";

export class Game {
  constructor(type, categoryIndex) {
    this.type = type;
    this.categoryIndex = categoryIndex;
    this.questionIndex = 0;
    this.score = 0;
    this.numberQuestion = 1;
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

    const isCorrect =
      this.type === "questions"
        ? true
        : String(userAnswer).trim() === String(correctAnswer).trim();

    this.answers.push(isCorrect);
    this.numberQuestion++;

    if (isCorrect) this.score++;

    return {
      isCorrect,
      correctData: currentQuestion,
      currentScore: this.score,
      correctNumberQuestion: this.numberQuestion,
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
    this.numberQuestion = 1;
    this.timeLeft = 60;
    this.currentQuestion = null;
    this.isStatementCorrect = false;
    this.currentAudio = null;

    try {
      this.wrongPool =
        JSON.parse(localStorage.getItem("blitz_wrong_questions_pool")) || [];
    } catch (e) {
      this.wrongPool = [];
    }

    this.isFromWrongPool = false;
    this.isSuperGame = false;
    this.wrongPoolIndex = -1;
  }

  generateQuestion() {
    this.stopAudio();
    this.isStatementCorrect = Math.random() > 0.5;

    if (this.isSuperGame && this.wrongPool.length > 0) {
      this.wrongPoolIndex = 0;
      const savedWrong = this.wrongPool[this.wrongPoolIndex];

      if (savedWrong.type === "audio") {
        let displayedName = savedWrong.correctData.name;

        if (!this.isStatementCorrect) {
          let wrongTrack;
          do {
            wrongTrack =
              audioData[Math.floor(Math.random() * audioData.length)];
          } while (wrongTrack.name === savedWrong.correctData.name);
          displayedName = wrongTrack.name;
        }

        this.currentQuestion = {
          type: "audio",
          audioNum: savedWrong.correctData.audioNum,
          text: `СУПЕР-ИГРА! \nЭтот музыкальный фрагмент — \n«${savedWrong.correctData.category} — \n${displayedName}»?`,
          correctData: savedWrong.correctData,
        };
      } else {
        let displayedAuthor = savedWrong.correctData.author;

        if (!this.isStatementCorrect) {
          let wrongImg;
          do {
            wrongImg =
              imagesData[Math.floor(Math.random() * imagesData.length)];
          } while (wrongImg.author === savedWrong.correctData.author);
          displayedAuthor = wrongImg.author;
        }

        this.currentQuestion = {
          type: "images",
          imageNum: savedWrong.correctData.imageNum,
          text: `СУПЕР-ИГРА! \nНа портрете изображен композитор \n${displayedAuthor}?`,
          correctData: savedWrong.correctData,
        };
      }
      return this.currentQuestion;
    }

    this.isFromWrongPool = false;

    const pool = Math.random() > 0.5 ? "audio" : "images";

    if (pool === "audio") {
      const randomTrack =
        audioData[Math.floor(Math.random() * audioData.length)];

      let displayedStatement = `${randomTrack.category} — ${randomTrack.name}`;

      if (!this.isStatementCorrect) {
        let wrongTrack;

        do {
          wrongTrack = audioData[Math.floor(Math.random() * audioData.length)];
        } while (wrongTrack.name === randomTrack.name);

        displayedStatement = `${wrongTrack.category} — ${wrongTrack.name}`;
      }

      this.currentQuestion = {
        type: "audio",
        audioNum: randomTrack.audioNum,
        text: `Этот музыкальный фрагмент — \n«${displayedStatement}»?`,
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
        text: `На портрете изображен композитор \n${displayedAuthor}?`,
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
      this.numberQuestion++;
      this.score++;

      if (!this.isSuperGame) {
        this.timeLeft += 3;
      } else {
        this.wrongPool.splice(this.wrongPoolIndex, 1);
      }
    } else {
      if (!this.isSuperGame) {
        this.numberQuestion++;
        const isDuplicate = this.wrongPool.some((item) => {
          if (this.currentQuestion.type === "audio") {
            return (
              item.type === "audio" &&
              item.correctData.audioNum ===
                this.currentQuestion.correctData.audioNum
            );
          } else {
            return (
              item.type === "images" &&
              item.correctData.imageNum ===
                this.currentQuestion.correctData.imageNum
            );
          }
        });

        if (!isDuplicate) {
          this.wrongPool.push({
            type: this.currentQuestion.type,
            correctData: this.currentQuestion.correctData,
          });
        }
      } else {
        const missed = this.wrongPool.splice(this.wrongPoolIndex, 1)[0];
        this.wrongPool.push(missed);
      }
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
