const pictureInnerContainer = document.querySelector(
  ".picture-inner-container",
);
const column1 = document.querySelector(".column1");
const column2 = document.querySelector(".column2");
const column3 = document.querySelector(".column3");

function randomPictures() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(arr);

  for (let i = 0; i < arr.length; i++) {
    const img = document.createElement("img");
    img.classList.add("gallery-img");
    img.src = `assets/img/gallery/gallery${arr[i]}.jpg`;
    img.alt = `gallery${arr[i]}`;
    // pictureInnerContainer.append(img);

    if (i < 5) {
      column1.append(img);
    } else if (i >= 5 && i <= 9) {
      column2.append(img);
    } else if (i > 9) {
      column3.append(img);
    }
  }
}

randomPictures();
