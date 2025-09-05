const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");
const what = document.querySelector(".what");

const standard = document.getElementById("standard-collection");
const unsplash = document.getElementById("unsplash-collection");
const flickr = document.getElementById("flickr-collection");

let typingTimer; //timer identifier
const doneTypingInterval = 1000;
const doneTypingIntervalPhoto = 5;

/*----------------Путь к изображениям------------*/
const base =
  "https://raw.githubusercontent.com/Marina2609/stage1-tasks/assets/images/";

/*----------------Смена картинок------------*/
let randomNum;
let bgNum = 1;

function getRundomNum() {
  randomNum = Math.ceil(Math.random() * 20);
  bgNum = randomNum;

  if (randomNum >= 1 && randomNum <= 9) {
    randomNum = "0" + randomNum;
  }
  //  console.log("randomNum" + randomNum);

  document.body.style.backgroundImage = base + timeOfDay + randomNum + ".jpg)";

  setBg(bgNum);
}
getRundomNum();

/*----------------Смена картинок принимаем значение------------*/
function setBg(bgNum) {
  //Рандом картинок с гита
  if (bgNum >= 1 && bgNum <= 9) {
    bgNum = "0" + bgNum;
  }

  //Определяем половину дня
  var tod = null;

  if (
    greeting.textContent === "Good morning," ||
    greeting.textContent === "Доброе утро,"
  ) {
    tod = "morning";
  }
  if (
    greeting.textContent === "Good afternoon," ||
    greeting.textContent === "Добрый день,"
  ) {
    tod = "afternoon";
  }
  if (
    greeting.textContent === "Good evening," ||
    greeting.textContent === "Добрый вечер,"
  ) {
    tod = "evening";
  }
  if (
    greeting.textContent === "Good night," ||
    greeting.textContent === "Спокойной ночи,"
  ) {
    tod = "night";
  }

  //Проверяем в настройках какой выбран чекбокс
  if (standard.checked) {
    //Поле для ввода заблокировано
    what.disabled = 1;

    let img = new Image();
    img.src = base + tod + "/" + bgNum + ".jpg";

    img.onload = () => {
      document.body.style.backgroundImage = "url('" + img.src + "')";
    };
  }
  if (unsplash.checked) {
    //Поле для ввода разблокировано
    what.disabled = 0;

    if (
      what.value !== "[Enter in english]" ||
      what.value !== "[Вводите на английском]"
    ) {
      tod = what.value;
    }
    let url =
      "https://api.unsplash.com/photos/random?query=" +
      tod +
      "&client_id=Ex-wYKtYyp04uEbW7HFK5GezK_EJd10DKiffGFKXFvE";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.body.style.backgroundImage =
          "url('" + data.urls.regular + "')";
      });
  }
  if (flickr.checked) {
    //Поле для ввода разблокировано
    what.disabled = 0;
    /*
        if(what.value !== "[Enter in english]" || what.value !== "[Вводите на английском]"){
                tod = what.value;
        }
        const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ad2579b615db20fd26f6831911499ab&tags=' + tod + '&extras=url_l&format=json&nojsoncallback=1';
        fetch(url)
        .then(res => res.json())
        .then(data => {
           // document.body.style.backgroundImage = "url('" + url + "')";

        console.log(url);
        });
        */
  }
}

function check() {
  if (unsplash.checked) {
    return getRundomNum();
  }
  if (flickr.checked) {
    return getRundomNum();
  }
  if (standard.checked) {
    return getRundomNum();
  }
}

/*----------------Смена картинок кликом назад------------*/
function getSlidePrev() {
  if (bgNum == 1) {
    bgNum = 20;
  } else {
    bgNum -= 1;
  }
  //  console.log("bgNum" + bgNum);
  setBg(bgNum);

  prev.disabled = true;

  setTimeout(function () {
    prev.disabled = false;
  }, 1000);
}

/*----------------Смена картинок кликом вперед------------*/
function getSlideNext() {
  if (bgNum == 20) {
    bgNum = 1;
  } else {
    bgNum += 1;
  }

  setBg(bgNum);

  next.disabled = true;

  setTimeout(function () {
    next.disabled = false;
  }, 1000);
}

/*----------------Слушатель------------*/
prev.addEventListener("click", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(getSlidePrev, doneTypingIntervalPhoto);
});
next.addEventListener("click", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(getSlideNext, doneTypingIntervalPhoto);
});

standard.addEventListener("click", check);
unsplash.addEventListener("click", check);
flickr.addEventListener("click", check);

/*----------------Ввод значений с клавиатуры для поиска фото на заставку------------*/
what.addEventListener("keyup", () => {
  clearTimeout(typingTimer);

  if (unsplash.checked || flickr.checked) {
    if (what.value) {
      typingTimer = setTimeout(setBg, doneTypingInterval);
    }
  }
});
