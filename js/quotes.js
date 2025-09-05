const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

/*----------------Цитаты и авторы------------*/
// Массивы цитат и авторов для английского
const quotesEn = [
  "Success is the child of audacity",
  "Success is one percent inspiration, ninety-nine percent perspiration",
  "Success consists of going from failure to failure without loss of enthusiasm",
  "You miss 100% of the shots you don’t take",
  "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change",
  "Build your own dreams, or someone else will hire you to build theirs",
  "The will to win, the desire to succeed, the urge to reach your full potential… these are the keys that will unlock the door to personal excellence",
  "Fall seven times and stand up eight",
  "There are no shortcuts to any place worth going",
  "Success is not the key to happiness. Happiness is the key to success",
  "When I do good, I feel good. When I do bad, I feel bad. That’s my religion",
  "I am not a product of my circumstances. I am a product of my decisions",
  "It’s not the years in your life that count. It’s the life in your years",
  "There are people who have money and people who are rich",
  "You only live once, but if you do it right, once is enough",
  "The two most important days in your life are the day you are born and the day you find out why",
  "If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough",
  "Always dream and shoot higher than you know you can do. Do not bother just to be better than your contemporaries or predecessors. Try to be better than yourself",
  "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams",
];

const authorsEn = [
  "Benjamin Disraeli",
  "Thomas Edison",
  "Winston Churchill",
  "Wayne Gretzky",
  "Charles Darwin",
  "Farrah Gray",
  "Confucius",
  "Japanese Proverb",
  "Helen Keller",
  "Herman Cain",
  "Abraham Lincoln",
  "Stephen Covey",
  "Abraham Lincoln",
  "Coco Chanel",
  "Mae West",
  "Mark Twain",
  "Oprah Winfrey",
  "William Faulkner",
  "Dr. Seuss",
];

// Массивы цитат и авторов для русского
const quotesRu = [
  "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
  "Сложность программы растет до тех пор, пока не превысит способности программиста",
  "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
  "Что разум человека может постигнуть и во что он может поверить, того он способен достичь",
  "Стремитесь не к успеху, а к ценностям, которые он дает",
  "Своим успехом я обязана тому, что никогда не оправдывалась и не принимала оправданий от других",
  "Сложнее всего начать действовать, все остальное зависит только от упорства",
  "Надо любить жизнь больше, чем смысл жизни",
  "Начинать всегда стоит с того, что сеет сомнения",
  "80% успеха - это появиться в нужном месте в нужное время",
  "В моем словаре нет слова «невозможно»",
  "Либо вы управляете вашим днем, либо день управляет вами",
  "Два самых важных дня в твоей жизни: день, когда ты появился на свет, и день, когда понял, зачем",
  "Лучшая месть – огромный успех",
  "Слабые люди всю жизнь стараются быть не хуже других. Сильным во что бы то ни стало нужно стать лучше всех",
  "Идите уверенно по направлению к мечте. Живите той жизнью, которую вы сами себе придумали",
  "У всего есть своя красота, но не каждый может ее увидеть",
  "Я лучше умру от страсти, чем от скуки",
  "Вопрос не в том, кто мне разрешит, а в том, кто сможет мне запретить",
];

const authorsRu = [
  "Стив Макконнелл",
  "Артур Блох. Законы Мэрфи",
  "И. Берард",
  "Наполеон Хилл",
  "Альберт Эйнштейн",
  "Флоренс Найтингейл",
  "Амелия Эрхарт",
  "Федор Достоевский",
  "Борис Стругацкий",
  "Вуди Аллен",
  "Наполеон Бонапарт",
  "Джим Рон",
  "Марк Твен",
  "Фрэнк Синатра",
  "Борис Акунин",
  "Генри Дэвид Торо",
  "Конфуций",
  "Винсент ван Гог",
  "Айн Рэнд",
];

// Объявляем переменную для хранения текущего массива
let currentQuotes = [];
let currentAuthors = [];

/*----------------Функция выбора массива в зависимости от языка------------*/
function updateQuoteArray() {
  if (langEn.checked) {
    currentQuotes = quotesEn;
    currentAuthors = authorsEn;
  } else if (langRu.checked) {
    currentQuotes = quotesRu;
    currentAuthors = authorsRu;
  }
}

// Функция для отображения случайной цитаты
function showRandomQuote() {
  updateQuoteArray();
  const index = Math.floor(Math.random() * currentQuotes.length);
  quote.textContent = currentQuotes[index];
  author.textContent = currentAuthors[index];
}

// Обработчик для кнопки смены цитаты
changeQuote.addEventListener("click", showRandomQuote);

// Обработчики для переключения языка
langEn.addEventListener("change", showRandomQuote);
langRu.addEventListener("change", showRandomQuote);

// Изначально показываем цитату
window.addEventListener("load", showRandomQuote);
