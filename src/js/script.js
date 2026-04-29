// explore-slider
window.addEventListener("DOMContentLoaded", function () {
  var mousedown = "mousedown",
    mousemove = "mousemove",
    mouseup = "mouseup";
  var touch = !!("ontouchstart" in window);
  if (touch)
    ((mousedown = "touchstart"),
      (mousemove = "touchmove"),
      (mouseup = "touchend"));
  [].forEach.call(
    document.querySelectorAll(".explore-slider-container"),
    function (container) {
      var bottom = container.querySelector(".slider-bottom"),
        bar = container.querySelector(".slider-bar"),
        left,
        h = container.clientHeight,
        w = container.clientWidth;
      var init = function (e) {
        e.preventDefault();
        touch && (e = e.changedTouches[0]);
        left = e.clientX - this.offsetLeft;
        h = container.clientHeight;
        w = container.clientWidth;
        clip(left);
        container.addEventListener(mousemove, move, true);
        window.addEventListener(mouseup, stop, true);
      };
      var move = function (e) {
        touch && (e = e.changedTouches[0]);
        var x = e.clientX - this.offsetLeft;
        x = Math.min(w, Math.max(0, x));
        clip(x);
      };
      var clip = function (left) {
        bottom.style.clip = "rect(0," + left + "px," + h + "px,0)";
        bar.style.left = left + "px";
      };
      clip(w / 1.65);
      var stop = function (e) {
        container.removeEventListener(mousemove, move, true);
        window.removeEventListener(mouseup, stop, true);
      };
      container.addEventListener(mousedown, init, true);
      window.addEventListener(
        "resize",
        function () {
          clip(container.clientWidth / 2);
        },
        true,
      );
    },
  );
});
