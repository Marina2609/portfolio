export default class Settings {
  constructor() {
    const defaultConfig = { volume: 50, timeGame: false, timeStep: 20 };

    const defaultResults = {
      audio: Array(12).fill(null),
      images: Array(12).fill(null),
      questions: Array(12).fill(null),
    };

    const defaultFullAnswers = {
      audio: Array(12).fill(null),
      images: Array(12).fill(null),
      questions: Array(12).fill(null),
    };

    const defaultBlitz = {
      highScore: 0,
      gamesPlayed: 0,
    };

    try {
      this.config = {
        ...defaultConfig,
        ...JSON.parse(localStorage.getItem("musicQuizSettings")),
      };
      this.results =
        JSON.parse(localStorage.getItem("musicQuizResults")) || defaultResults;
      this.fullAnswers =
        JSON.parse(localStorage.getItem("musicQuizFullAnswers")) ||
        defaultFullAnswers;
      this.blitz =
        JSON.parse(localStorage.getItem("musicQuizBlitz")) || defaultBlitz;
    } catch (e) {
      this.config = defaultConfig;
      this.results = defaultResults;
      this.fullAnswers = defaultFullAnswers;
      this.blitz = defaultBlitz;
    }
  }

  save(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem("musicQuizSettings", JSON.stringify(this.config));
  }

  saveResult(type, categoryIndex, score, answers) {
    if (!this.results[type]) this.results[type] = Array(12).fill(null);
    if (!this.fullAnswers[type]) this.fullAnswers[type] = Array(12).fill(null);

    this.results[type][categoryIndex] = score;
    this.fullAnswers[type][categoryIndex] = answers;

    localStorage.setItem("musicQuizResults", JSON.stringify(this.results));
    localStorage.setItem(
      "musicQuizFullAnswers",
      JSON.stringify(this.fullAnswers),
    );
  }

  saveBlitzResult(score) {
    this.blitz.gamesPlayed++;
    if (score > this.blitz.highScore) {
      this.blitz.highScore = score;
    }
    localStorage.setItem("musicQuizBlitz", JSON.stringify(this.blitz));
  }
}
