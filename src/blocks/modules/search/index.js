import $ from "jquery";
export default function() {
  $('.js-tab-wrapper .js-tab').on('click', function (e) {
    e.preventDefault();
    $('.js-tab').removeClass('active')
    $(this).addClass('active')

    $('.js-tab-block').removeClass('active')
    const targetId = $(this).attr('href').substring(1);
    const targetSection = $('#' + targetId);
    targetSection.addClass('active')
  });


  $(document).on('click', '.drop-search__tab', function (e) {
    e.preventDefault();
    $('.drop-search__tab').removeClass('active')
    $(this).addClass('active')

    $('.drop-search__block').removeClass('active')
    const targetId = $(this).attr('href').substring(1);
    const targetSection = $('#' + targetId);
    targetSection.addClass('active')
  });
}