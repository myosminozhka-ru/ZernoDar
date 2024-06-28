import $ from "jquery";
export default function init(className = '.card-rating-modal__mobile') {
  $(className + ' .card-rating-modal__thead button').on('click', function (e) {
    e.preventDefault();
    $(className + ' .card-rating-modal__thead button').removeClass('active')
    $(this).addClass('active')
    $(className + ' .card-rating-modal__list').addClass('hide')
    const targetId = $(this).attr('data-index');
    const targetSection = $(className + ' .card-rating-modal__list[data-index=' + targetId + ']');
    targetSection.removeClass('hide')
  });
}