import $ from "jquery";

export default function init(element, button, count = 1) {
  let fistClick = true;
  let btnStr = $(button).children(".str");
  let btnText = btnStr.text();

  function start() {
    for (let index = count; index < $(element).length; index++) {
      $(element).eq(index).toggleClass("hide");
    }
  }
  start();

  let isOpen = false;
  $(button).click(function () {
    if (fistClick) {
      btnText = $(this).children(".str").text();
    }
    fistClick = !fistClick;
    $(button).toggleClass("open");
    if (isOpen) {
      btnStr.text(btnText);
    } else {
      btnStr.text("Свернуть");
    }
    isOpen = !isOpen;
    start();
  });
}
