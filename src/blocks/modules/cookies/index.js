import $ from "jquery";

export default function() {
  if (localStorage.getItem('cookies') == 'true') {
    $('.cookies').addClass('hide')
  }
  $('.cookies__btn').on('click', function() {
    $('.cookies').addClass('hide')
    localStorage.setItem('cookies', true)
  })
}