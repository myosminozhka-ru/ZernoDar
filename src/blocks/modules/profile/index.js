import $ from "jquery";
export default function() {
  $(document).on('click', ' .edit-contact__item', function(e) {
    const target = e.target
    const open = $(this).find('.edit-contact__change')
    const cancel = $(this).find('.edit-contact__change.js-edit-contact-cancel')
    const content = $(this).find('.edit-contact__body')
    const itIsOpener = $(target).closest('.js-edit-contact-change')
    if (itIsOpener && itIsOpener.length) {
      content.removeClass('hide')
      open.addClass('hide')
      cancel.removeClass('hide')
    }
    const itIsCanceler = $(target).closest('.js-edit-contact-cancel')
    if (itIsCanceler && itIsCanceler.length) {
      content.addClass('hide')
      open.removeClass('hide')
      cancel.addClass('hide')
    }
  })


  $('.js-edit-about-open').on('click', function(e) {
    const text = $('.edit-about__text')
    const content = $('.edit-about__body')
    const open = $('.js-edit-about-open')
    const cancel = $('.js-edit-about-cancel')
    const more = $('.edit-about__more')
    text.toggleClass('hide')
    content.toggleClass('hide')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
    more.toggleClass('hide')
  })
  $('.edit-about__cancel, .js-edit-about-cancel').on('click', function(e) {
    const text = $('.edit-about__text')
    const content = $('.edit-about__body')
    const open = $('.js-edit-about-open')
    const cancel = $('.js-edit-about-cancel')
    const more = $('.edit-about__more')
    text.toggleClass('hide')
    content.toggleClass('hide')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
    more.toggleClass('hide')
  })


  $('.js-edit-requisites-open').on('click', function(e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })
  $('.js-edit-requisites-cancel').on('click', function(e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })
}