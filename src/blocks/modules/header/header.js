import $ from "jquery";

export default class Header {
  
  constructor() {
    this.isSearchOpen = false;
    this.isDropOpen = false;
    this.isNavOpen = false;
    this.header = document.querySelector('.header');
    this.scrollUp = document.querySelector('.scroll-up');
    this.preloader = document.querySelector('.preloader');
    this.init()
  }
  init() {
    this.searchHandler()
    this.navDropHandler()
    this.menuHandler()
    // this.scrollHandler()
    // this.preloaderHandler()
  }
  menuHandler() {
    $(".header__burger").click(() => {
      if ($(".header__burger").hasClass('active')) {
        this.close()
      } else {
        this.open()
      }
    })
  }
  open() {
    this.isNavOpen = true
    $('.header__burger').addClass('active')
    $('.nav').addClass('open')
    $('body').addClass('lock')
  }
  close() {
    this.isNavOpen = false
    $('.header__burger').removeClass('active')
    $('.nav').removeClass('open')
    $('body').removeClass('lock')
  }
  scrollHandler() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      if (lastScroll < pageYOffset && pageYOffset > 200) {
        this.scrollUp ? this.scrollUp.classList.add('down') : null;
      }
      if (pageYOffset < this.header.clientHeight - (this.header.clientHeight * 60 / 100)) {
        this.scrollUp ? this.scrollUp.classList.remove('down') : null;
      }

      lastScroll = pageYOffset
    })
  }
  preloaderHandler() {
  }
  openSearch() {
    this.isSearchOpen = true
    $('.nav').addClass('hide')
    $('.header-search').addClass('open')
    $(this).addClass('hide')
    $('.drop-search').addClass('open')
    $('body').addClass('lock')
  }
  closeSearch() {
    if (this.isSearchOpen) {
      $('.nav').removeClass('hide')
      $('.header-search').removeClass('open')
      $('.trig-open-search').removeClass('hide')
      $('.drop-search').removeClass('open')
      $('body').removeClass('lock')
      this.isSearchOpen = false
    }
  }
  searchHandler() {

    $('.trig-open-search').click(this.openSearch.bind(this));
    $('.trig-close-search').click(this.closeSearch.bind(this));
    
    $(document).click((event) => {
      if (
        !$(event.target).closest('.header-search').length &&
        !$(event.target).closest('.trig-open-search').length &&
        !$(event.target).closest('[data-modal]').length &&
        !$(event.target).closest('[data-class]').length &&
        !$(event.target).closest('.drop-search__inner').length
      ) {
        this.closeSearch();
      }
    });

  }
  navDropHandler() {
    $('.nav__item--supply').click((e) => {
      e.preventDefault()
      $('.nav__item').removeClass('active')
      $('.nav__item--supply').addClass('active')
      this.openNavDrop('.nav-drop--supply')
    })
    
    $('.nav__item--demand').click((e) => {
      e.preventDefault()
      $('.nav__item').removeClass('active')
      $('.nav__item--demand').addClass('active')
      this.openNavDrop('.nav-drop--demand')
    })

    $(document).click((event) => {
      if (
        this.isDropOpen &&
        !$(event.target).closest('.nav-drop__inner').length &&
        !$(event.target).closest('.nav__item--drop').length
      ) {
        this.closeNavDrop()
      }
    });

    $('.nav-drop').each(function(index, element) {
      $(element).find('.nav-drop__arrow').each(function(index, arrow) {
        $(arrow).on('click', function() {
          $(element).find('.nav-drop__title').removeClass('active')
          $(element).find('.nav-drop__block').removeClass('open')
          $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
          $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
        })
      })
      $(element).find('.nav-drop__title').each(function(index, title) {
        $(title).on('mouseover', function() {
          $(element).find('.nav-drop__title').removeClass('active')
          $(element).find('.nav-drop__block').removeClass('open')
          $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
          $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
        })
      })
    })

  }
  openNavDrop(selector = '.nav-drop') {
    this.isDropOpen = true
    $('.nav-drop').removeClass('open')
    $(selector).addClass('open')
  }
  closeNavDrop(selector = '.nav-drop') {
    this.isDropOpen = false
    $(selector).removeClass('open')
    $('.nav__item').removeClass('active')
  }
}
