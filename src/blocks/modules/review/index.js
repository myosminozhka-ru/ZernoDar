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

  $(document).on('click', ' .review-list__to-answer .review-to-answer', function(e) {
    const target = e.target
    const open = $(this).find('.review-to-answer__open .btn3')[0]
    const cancel = $(this).find('.review-to-answer__btns .btn3--transparent')[0]
    const content = $(this).find('.review-to-answer__content')[0]
    if (target === open) {
      content.classList.remove('hide')
      $(this).find('.review-to-answer__open').addClass('hide')
    }
    if (target === cancel) {
      content.reset()
      content.classList.add('hide')
      $(this).find('.review-to-answer__open').removeClass('hide')
    }
  })


  $(document).on('click', ' .review-list__answers', function(e) {
    const target = e.target
    const open = $(this).find('.review-list__edit')
    const cancel = $(this).find('.review-to-answer__btns .btn3--transparent')[0]
    const content = $(this).find('.review-list__content')[0]
    const isOpen = $(target).closest(open)
    if (isOpen && isOpen.length) {
      content.classList.add('hide')
      $(this).find('.review-list__edit-answer').removeClass('hide')
    }
    if (target === cancel) {
      content.classList.remove('hide')
      $(this).find('.review-list__edit-answer').addClass('hide')
    }
  })
}