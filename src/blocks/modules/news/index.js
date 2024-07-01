import $ from "jquery";
export default function init() {
  $('.article-nav__item a').on('click', function (e) {
    e.preventDefault();
    $('.article-nav__item a').removeClass('active')
    $(this).addClass('active')
    const targetId = $(this).attr('href').substring(1);
    const targetSection = $('#' + targetId);
    targetSection.length ? targetSection[0].scrollIntoView({
      behavior: 'smooth'
    }) : null;
  });
}