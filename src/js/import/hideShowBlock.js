import $ from "jquery";

export default function init(element, button) {
  const btnStr = $(button).children('.str');
  const btnText = btnStr.text();

  let isOpen = $(element).hasClass('hide');
  $(button).click(
    function() {
      $(button).toggleClass('open');
      if (isOpen) {
        btnStr.text('Свернуть')
      } else {
        btnStr.text(btnText)
      }
      isOpen = !isOpen;
      $(element).toggleClass('hide');
    }
  );
}