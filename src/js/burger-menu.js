function burgerMenu(selector) {
  let menu = $(selector);
  let button = menu.find(".burger-menu_button", ".burger-menu_lines");
  let links = menu.find(".burger-menu_link");
  let overlay = menu.find(".burger-menu_overlay");

  button.on("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  links.on("click", () => toggleMenu());
  overlay.on("click", () => toggleMenu());

  function toggleMenu() {
    menu.toggleClass("burger-menu_active");

    if (menu.hasClass("burger-menu_active")) {
      $("body").css("overlow", "hidden");
      document.querySelector(".welcome-content").style.opacity = 0;
      document.querySelector(".welcome-content").style.transition =
        "opacity 1s ease-in-out";
    } else {
      $("body").css("overlow", "visible");
      document.querySelector(".welcome-content").style.opacity = 1;
      document.querySelector(".welcome-content").style.transition =
        "opacity 1s ease-in-out";
    }
  }
}
burgerMenu(".burger-menu");
