import $ from "jquery";

export default function init(element, button, count = 1) {
  const btnStr = $(button).children('.str');
  const btnText = btnStr.text();
  
  function start() {
    for (let index = count; index < $(element).length; index++) {
      $(element).eq(index).toggleClass('hide');
    }
  }
  start();

  let isOpen = false;
  $(button).click(
    function() {
      $(button).toggleClass('open');
      if (isOpen) {
        btnStr.text(btnText)
      } else {
        btnStr.text('Свернуть')
      }
      isOpen = !isOpen;
      start()
    }
  );
}