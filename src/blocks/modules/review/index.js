import $ from "jquery";
export default function init() {
  $('.base-tab__item--scroll').on('click', function (e) {
    e.preventDefault();
    $('.base-tab__item').removeClass('active')
    $(this).addClass('active')
    const targetId = $(this).attr('href').substring(1);
    const targetSection = $('#' + targetId);
    targetSection.length ? targetSection[0].scrollIntoView({
      behavior: 'smooth'
    }) : null;
  });

  $('.base-tab__item--tab').on('click', function (e) {
    e.preventDefault();
    $('.base-tab__item').removeClass('active')
    $(this).addClass('active')

    $('.base-tab__block--tab').removeClass('active')
    const targetId = $(this).attr('href').substring(1);
    const targetSection = $('#' + targetId);
    targetSection.addClass('active')
  });
}