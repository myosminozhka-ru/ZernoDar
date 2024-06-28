import $ from "jquery";
export default function init(className) {
  $(className + ' .switch-button__item').on('click', function (e) {
    e.preventDefault();
    $(className + ' .switch-button__item').removeClass('active')
    $(this).addClass('active')
    $(className + ' .card-ad-relative__table').addClass('hide')
    const targetId = $(this).attr('data-index');
    const targetSection = $(className + ' .card-ad-relative__table[data-index=' + targetId + ']');
    targetSection.removeClass('hide')
  });
}