import $ from "jquery";
export default function() {
  $(document).on('click', '.main-tab__tab', function (e) {
    e.preventDefault();
    $('.main-tab__tab').removeClass('active')
    $(this).addClass('active')

    $('.main-tab__block').removeClass('active')
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