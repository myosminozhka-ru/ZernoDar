import $ from "jquery";

export default class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.scrollUp = document.querySelector('.scroll-up');
    this.preloader = document.querySelector('.preloader');
    this.init()
  }
  init() {
    this.toggleHandler()
    // this.scrollHandler()
    // this.preloaderHandler()
  }
  open() {
    this.burger.classList.add('active')
    this.nav.classList.add('active')
    document.body.classList.add('lock')
  }
  close() {
    this.burger.classList.remove('active')
    this.nav.classList.remove('active')
    document.body.classList.remove('lock')
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
    
    $('.nav').addClass('hide')
    $('.header-search').addClass('open')
    $(this).addClass('hide')
    $('.drop-search').addClass('open')
    $('body').addClass('lock')
  }
  closeSearch() {
    $('.nav').removeClass('hide')
    $('.header-search').removeClass('open')
    $('.trig-open-search').removeClass('hide')
    $('.drop-search').removeClass('open')
    $('body').removeClass('lock')
  }
  toggleHandler() {
    // close on click outside
    const that = this;
    $(document).click(function(event) {
      if (
        !$(event.target).closest('.header-search').length &&
        !$(event.target).closest('.trig-open-search').length &&
        !$(event.target).closest('[data-modal]').length &&
        !$(event.target).closest('[data-class]').length &&
        !$(event.target).closest('.drop-search__inner').length
      ) {
        that.closeSearch();
      }
    });

    $('.trig-open-search').click(this.openSearch);
    $('.trig-close-search').click(this.closeSearch);

  }
}
