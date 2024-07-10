import $ from "jquery";
export default function init(className) {
  $(document).on('click', className + ' .switch-button__item',function (e) {
    e.preventDefault();
    $(className + ' .switch-button__item').removeClass('active')
    $(this).addClass('active')
    $(className + ' .card-ad-relative__table').addClass('hide')
    const targetId = $(this).attr('data-index');
    const targetSection = $(className + ' .card-ad-relative__table[data-index=' + targetId + ']');
    targetSection.removeClass('hide')
  });
}