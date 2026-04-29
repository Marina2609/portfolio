function debounce(func, wait = 20, immediate = true) {
  var timeout;

  return function () {
    var context = this,
      args = arguments;

    var later = function () {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

const images = document.querySelectorAll(".gallery-img");

function showImages(e) {
  images.forEach((image) => {
    const slideInAt = window.scrollY + window.innerHeight;
    const isHalfShown = slideInAt > image.offsetTop;

    if (isHalfShown) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
}

setTimeout(
  () => document.addEventListener("scroll", debounce(showImages)),
  100,
);

setTimeout(() => triggerScroll(), 150);

const sectionGallery = document.querySelector("#gallery");

function triggerScroll() {
  let galleryTop = sectionGallery.offsetTop;
  let scrollPos = window.scrollY + window.innerHeight;
  let galleryBottom = sectionGallery.offsetTop + sectionGallery.offsetHeight;
  let isVisible = scrollPos > galleryTop && galleryBottom > window.scrollY;

  if (isVisible) window.scrollBy(0, 10);
}

setTimeout(
  () =>
    images.forEach(
      (item) => (item.style.transition = "transform 0.5s, opacity 0.5s"),
    ),
  100,
);
