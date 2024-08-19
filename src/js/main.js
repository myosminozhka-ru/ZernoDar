// all scripts here
window.showMore = () => {

};
// ==== copy start
class Copy {
  constructor() {
    this.nodes = document.querySelectorAll('[data-copy-trigger]')
    this.textarea = document.querySelector('#urlCopy')
    this.init()
  }
  init() {
    if (!this.textarea) return
    this.copyHandler()
  }
  copy(id) {
    
    if (id) {
      const text = document.querySelector(`[data-copy-text=${id}]`)
      
      this.textarea.innerHTML = text.textContent
    } else {
      this.textarea.innerHTML = window.location.href;
    }
    this.textarea.select();
    document.execCommand("copy");
  }
  copyHandler() {
    this.nodes.forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-copy-trigger')
        this.copy(id)
        this.alert()
      })
    })
  }
  alert() {
    alert('Скопировано!')
  }
}
// ==== copy end

// ==== helper start
const helper = {
  textSlice (text, length){
    const number = Number(length)
    const txt = text.trim()
    if (typeof number !== 'number' || typeof txt !== 'string' || txt.length <= length) return text
    return txt.slice(0, number) + '...';
  },
  elementTextSlice(selector, length) {
    const textNodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector
    textNodes.length ? textNodes.forEach(i => {
      i.innerHTML = this.textSlice(i.textContent, length)
    }) : null;
  }
}
// ==== helper end

// ==== hideShowBlock start
function hideShowBlock(element, button) {
  const btnStr = $(button).children('.str');
  const btnText = btnStr.text();

  let isOpen = $(element).hasClass('hide');
  $(button).click(
    function() {
      $(button).toggleClass('open');
      if (isOpen) {
        btnStr.text('Свернуть')
      } else {
        btnStr.text(btnText)
      }
      isOpen = !isOpen;
      $(element).toggleClass('hide');
    }
  );
}
// === hideShowBlock end

// modal start
class Modal {
  constructor(name, scrollLock = true) {
    this.name = name;
    this.scrollLock = scrollLock;
    this.modal = document.querySelector(`[data-modal="${name}"]`);
    this.callbackClose = null;
    this.init();
  }
  init() {
    if (this.modal) {
      this.content = this.modal.querySelector(".modal__content");
      this.openHendler();
      this.closeHendler();
    }
  }
  open() {
    window.lastZIndexModal = window.lastZIndexModal
      ? window.lastZIndexModal + 1
      : 150;
    this.modal ? (this.modal.style["z-index"] = window.lastZIndexModal) : null;
    this.modal ? this.modal.classList.remove("hide") : null;
    this.modal ? this.modal.classList.add("active") : null;
    this.scrollLock ? document.body.classList.add("lock") : null;
  }
  close() {
    // this.modal ? this.modal.style['z-index'] = -150 : null;
    this.modal ? this.modal.classList.remove("active") : null;
    this.modal ? this.modal.classList.add("hide") : null;
    this.scrollLock ? document.body.classList.remove("lock") : null;
    this.onCloseAction();
  }
  openHendler() {
    const name = this.name;
    $(document).on("click", `[data-class="${name}"]`, (e) => {
      this.open();
      const carElementId = this.modal.querySelector('[name="ELEMENT_ID"]');
      if (carElementId) {
        carElementId.value = e.target.dataset.elementId || "";
      }
    });
  }
  closeHendler() {
    this.modal
      ? this.modal.addEventListener("click", (e) => {
          if (e.target.classList.contains("close-x")) {
            this.close();
          }
        })
      : null;
    this.modal
      ? this.modal
          .querySelector("button.close-x")
          .addEventListener("click", (e) => {
            this.close();
          })
      : null;
  }
  onClose(callback) {
    this.callbackClose = callback;
  }
  onCloseAction() {
    this.callbackClose ? this.callbackClose() : null;
  }
}
// ==== modal end

// ==== more start
function more(element, button, count = 1, parent) {
  $(parent + ':not(.inited)').each(function (idx, el) {
    $(el).addClass("inited")
    let btn = $(el).find(button)
    let els = $(el).find(element)

    if (els.length <= count) {
      btn.addClass("hide")
      return;
    }
    let btnStr = btn.children(".str").eq(0);
    let btnText = btnStr.text();
    let isOpen = false;
    btn.on("click", function (e) {
      isOpen = btn.hasClass("open") // $(this).find(button).hasClass("open")
      btn.toggleClass("open");
      if (isOpen) {
        btnStr.text(btnText);
        start(els, "hide");
      } else {
        start(els, "show");
        btnStr.text("Свернуть");
      }
    });
    start(els, "hide");
  })

  function start(elements, make) {
    for (let index = count; index < elements.length; index++) {
      if (make === "hide") {
        elements.eq(index).addClass("hide");
      } else {
        elements.eq(index).removeClass("hide");
      }
    }
  }
}
// ==== more end

// ==== tel mask start
function phoneMask(selector) {
  const inputs = document.querySelectorAll(selector);
  const instances = [];
  inputs.forEach((el) => {
    instances.push(IMask(el, { mask: "+{7 }000-000-00-00" }));
  });

  return instances;
}
// ==== tel mask end

// ==== Header start
class Header {
  constructor() {
    this.isSearchOpen = false;
    this.isDropOpen = false;
    this.isNavOpen = false;
    this.demandIsOpen = false;
    this.supplyIsOpen = false;
    this.header = document.querySelector('.header');
    this.scrollUp = document.querySelector('.scroll-up');
    this.preloader = document.querySelector('.preloader');
    this.init()
  }
  init() {
    this.searchHandler()
    this.navDropHandler()
    this.menuHandler()
    this.moveElementPlaceHandler()
    // this.scrollHandler()
    // this.preloaderHandler()
  }
  static setHeaderPosition(pos) {
    const localPosition = localStorage.getItem("headerPosition");
    if (pos === false) {
      localStorage.setItem("headerPosition", pos);
      $(".header").css({
        position: '',
      })
    } else if (pos) {
      localStorage.setItem("headerPosition", pos);
      $(".header").css({
        position: pos,
      })
    } else if (localPosition) {
      $(".header").css({
        position: localPosition,
      })
    }
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
  navDropItemHandler(mod, e) {
    e.preventDefault()
    if (this[mod + 'IsOpen']) {
      $('.nav__item').removeClass('active')
      this.closeNavDrop('.nav-drop--' + mod)
      this.supplyIsOpen = false
      this.demandIsOpen = false
    } else {
      $('.nav__item').removeClass('active')
      $('.nav__item--' + mod).addClass('active')
      this.openNavDrop('.nav-drop--' + mod)
      this.supplyIsOpen = false
      this.demandIsOpen = false
      this[mod + 'IsOpen'] = true;
    }
  }
  navDropHandler() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      $('.nav__item--supply').on('mouseenter' ,this.navDropItemHandler.bind(this, "supply"))
      $('.nav__item--demand').on('mouseenter' , this.navDropItemHandler.bind(this, "demand"))
    } else {
      $('.nav__item--supply svg').on('click' ,this.navDropItemHandler.bind(this, "supply"))
      $('.nav__item--demand svg').on('click' , this.navDropItemHandler.bind(this, "demand"))
    }

    $(document).click((event) => {
      if (
        this.isDropOpen &&
        !$(event.target).closest('.nav-drop__inner').length &&
        !$(event.target).closest('.nav__item--drop').length
      ) {
        this.closeNavDrop()
        this.supplyIsOpen = false
        this.demandIsOpen = false
      }
    });

    $('.nav-drop').each(function(index, element) {
      $(element).find('.nav-drop__arrow').each(function(index, arrow) {
        $(arrow).on('click', function() {
          const isOpen = $(element).find(`.nav-drop__block:eq(${index})`).hasClass('open')
          $(element).find('.nav-drop__title').removeClass('active')
          $(element).find('.nav-drop__block').removeClass('open')
          if (!isOpen) {
            $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
            $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
          }
        })
      })

      $(element).find('.nav-drop__title').each(function(index, title) {
        $(title).on('mouseenter', function() {
          if (!isMobile) {
            $(element).find('.nav-drop__title').removeClass('active')
            $(element).find('.nav-drop__block').removeClass('open')
            $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
            $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
          }
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
  moveElementPlaceHandler() {
    const mediaQuery = window.matchMedia("(max-width: 760px)");

    // Function to handle the event
    const  handleMediaQueryChange = (event) => {
        if (event.matches) {
            this.moveElementPlace("out")
            this.moveNavBlocks("out")
        } else {
            this.moveElementPlace("home")
            this.moveNavBlocks("home")
        }
    }

    // Add the listener to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange.bind(this));

    // Initial check
    handleMediaQueryChange(mediaQuery);
  }
  moveNavBlocks(direction = "home") {
    if (direction == "home") {
      $('.nav-drop').each(function(index, element) {
        $(element).find('.nav-drop__block').removeClass('open')
        $(element).find('.nav-drop__title').removeClass('active')
        $(element).find(`.nav-drop__block:eq(0)`).addClass('open')
        $(element).find('.nav-drop__block').appendTo($(element).find('.nav-drop__right'))

      })
    } else {
      $('.nav-drop').each(function(index, element) {
        $(element).find('.nav-drop__block').removeClass('open')
        $(element).find('.nav-drop__title').removeClass('active')
        $(element).find('.nav-drop__title').each(function(index, title) {
          $(element).find(`.nav-drop__block:eq(${index})`).appendTo(title)
        })
      })
    }
  }
  moveElementPlace(direction = "home") {
    if (direction == "home") {
      $('.nav-drop--supply').appendTo($('.header'));
      $('.nav-drop--demand').appendTo($('.header'));
    } else {
      $('.nav-drop--supply').appendTo($('.nav__item--supply'));
      $('.nav-drop--demand').appendTo($('.nav__item--demand'));
    }
  }
}
Header.setHeaderPosition();
// ==== Header end

// ==== cardAdMap start
function cardAdMap() {
  if (!$('#map').length) {
    return false;
  }
  try {
    
    ymaps.ready(function () {
              
      // let breakpoint = window.matchMedia('(max-width: 48em)');
      // let descOptions = {
      //     iconLayout: 'default#image',
      //     iconImageHref: 'img/map-point.svg',
      //     iconImageSize: [50, 50],
      //     iconImageOffset: [-25, -25]
      // };
      // if (breakpoint) {
      //     descOptions.iconImageSize = [50, 50],
      //     descOptions.iconImageOffset = [-25, -25]
      // }                            
      var myMap = new ymaps.Map('map', {
          center: [55.699467, 37.625594],
          zoom: 12
      });

      var searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#map'
        }
      }); 

      myMap.controls.add(searchControl);


      searchControl.search('Дворцовая площадь, 2');

      const input = document.querySelector('.card-ad-map__input input')
      
      input.addEventListener('change', (e) => {
        console.log(e);
        searchControl.search('Дворцовая площадь, 2');
        var result = searchControl.getResult(0);
        result.then(function (res) {
            console.log("Результат " + res );
        }, function (err) {
            console.log("Ошибка");
        });
      })
      // myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      //   hintContent: 'Варшавское ш., <br/> 9 строение 1 (Метро Тульская)',
      //   balloonContent: 'Зикаар'
      // }, descOptions);
      // myMap.geoObjects.add(myPlacemark);

      $('.card-ad-map__input button').click(function() {
        $('.card-ad-map__map').toggleClass('open');
      })
    });
  } catch(e) {
    console.log(e);
    
  }
}
// ==== cardAdMap end

// ==== Sidebar start
window.rangeInstance = {};
class Sidebar {
  constructor(name, parentSelector) {
    this.name = name
    this.parentSelector = parentSelector
    this.modal()
    this.category()
    this.resetListener()
    this.initMapRadiusRange()
  }

  static initRange(name, parentSelector) {
    const rangeInstanceArray = []

    const rangeNodes = document.querySelectorAll(parentSelector + ' .filter-range:not(.inited)')

    rangeNodes.forEach(element => {
      element.classList.add('inited')
      const inputRange = element.querySelector('.js-range-slider')
      const inputFrom = element.querySelector('.filter-range__input--from')
      const inputTo = element.querySelector('.filter-range__input--to')
      const placeholderFrom = element.querySelector('.filter-range__val--from')
      const placeholderTo = element.querySelector('.filter-range__val--to')
      const placeholderFromStr = element.querySelector('.filter-range__val--from span')
      const placeholderToStr = element.querySelector('.filter-range__val--to span')
      $(inputRange).ionRangeSlider({

        onChange: function (data) {
          inputFrom.value = data.from
          inputTo.value = data.to
          placeholderFromStr.textContent = data.from
          placeholderToStr.textContent = data.to
        },
        onUpdate: function (data) {
          inputFrom.value = data.from
          inputTo.value = data.to
          placeholderFromStr.textContent = data.from
          placeholderToStr.textContent = data.to
        }
      });

      // 2. Save instance to variable
      const rangeInstance = $(inputRange).data("ionRangeSlider");
      rangeInstanceArray.push({
        instance: rangeInstance,
        resetInputs,
      })

      function resetInputs() {
        inputFrom.value = rangeInstance.options.min
        inputTo.value = rangeInstance.options.max
      }

      const classNameHide = "visually-hidden";

      placeholderFrom.addEventListener('click', () => {
        placeholderFrom.classList.add(classNameHide)
        inputFrom.classList.remove(classNameHide)
        inputFrom.focus()
      })
      placeholderTo.addEventListener('click', () => {
        placeholderTo.classList.add(classNameHide)
        inputTo.classList.remove(classNameHide)
        inputTo.focus()
      })
      inputFrom.addEventListener('focus', () => {
        placeholderFrom.classList.add(classNameHide)
        inputFrom.classList.remove(classNameHide)
      })
      inputTo.addEventListener('focus', () => {
        placeholderTo.classList.add(classNameHide)
        inputTo.classList.remove(classNameHide)
      })
      inputFrom.addEventListener('blur', (e) => {
        placeholderFrom.classList.remove(classNameHide)
        inputFrom.classList.add(classNameHide)
        const isValid = +e.target.value >= rangeInstance.options.min
        if (!isValid) {
          inputFrom.value = rangeInstance.options.min
          placeholderFromStr.textContent = rangeInstance.options.min
        }
        rangeInstance.update({
          from: isValid ? +e.target.value : rangeInstance.options.min,
          to: inputTo.value
        });
      })
      inputTo.addEventListener('blur', (e) => {
        placeholderTo.classList.remove(classNameHide)
        inputTo.classList.add(classNameHide)
        const isValid = +e.target.value <= rangeInstance.options.max
        if (!isValid) {
          inputTo.value = rangeInstance.options.max
          placeholderToStr.textContent = rangeInstance.options.max
        }
        rangeInstance.update({
          from: inputFrom.value,
          to: isValid ? +e.target.value : rangeInstance.options.max,
        });
      })
    })
    window.rangeInstance[name] = rangeInstanceArray

  }

  modal() {
    $('.js-open-filter').on('click', () => {
      $('.catalog-sidebar__modal').addClass('open')
      $('body').addClass('lock2')
    })

    $('.js-close-filter').on('click', () => {
      $('.catalog-sidebar__modal').removeClass('open')
      $('body').removeClass('lock2')
    })

    $('.js-open-map').on('click', () => {
      $('.map-point').addClass('open')
    })

    $('.js-close-map').on('click', () => {
      $('.map-point').removeClass('open')
    })

    $('.allcaterories').appendTo($('.catalog-sidebar__inner'));
    $('.js-open-allcaterories').on('click', () => {
      $('.allcaterories').addClass('open')
    })

    $('.js-close-allcaterories').on('click', () => {
      $('.allcaterories').removeClass('open')
    })

    $(document).click(function(event) {
      if (
        !$(event.target).closest('.js-open-map').length &&
        !$(event.target).closest('.map-point').length
      ) {
        $('.map-point').removeClass('open')
      }
    });
  }

  initMapRadiusRange() {
    $(".map-point .js-range-slider").ionRangeSlider();
  }

  category() {
    $('.catalog-wrapper').each(function( index ) {
      const thatwrapper = this;
      $(thatwrapper).find('.filter-list__item').each(function( index ) {
        const that = this
        $(this).find('.filter-list__title').on('click', function() {
          if ($(that).hasClass('open')) {
            $(thatwrapper).find('.filter-list__item').removeClass('hide')
            $(that).removeClass('open')
          } else {
            $(thatwrapper).find('.filter-list__item').toggleClass('hide')
            $(that).toggleClass('hide')
            $(that).toggleClass('open')
          }
          // $('.filter-list__item').toggleClass('hide')
        })
      });
    });
  }

  resetListener() {
    $( ".catalog-sidebar, .catalog-head__top" ).on( "submit", function( event ) {
      event.preventDefault();
    });

    $('.js-reset-filter').on('click', () => {
      this.resetFilter()
    })
  }

  resetFilter() {
    $(this.parentSelector + ' .catalog-sidebar').trigger("reset");
    $(this.parentSelector + ' .catalog-head__top').trigger("reset");
    this.resetRange()
  }

  resetRange(name) {

    window.rangeInstance[name || this.name].forEach(instance => {
      instance.instance.reset()
      instance.resetInputs()
    })

  }
}
// ==== Sidebar end

// ==== review start
function review() {
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
// ==== review end

// ==== cardAdRelative start
function cardAdRelative(className) {
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
// ==== cardAdRelative end

// ==== cardRatingModal start
function cardRatingModal(className = '.card-rating-modal__mobile') {
  $(className + ' .card-rating-modal__thead button').on('click', function (e) {
    e.preventDefault();
    $(className + ' .card-rating-modal__thead button').removeClass('active')
    $(this).addClass('active')
    $(className + ' .card-rating-modal__list').addClass('hide')
    const targetId = $(this).attr('data-index');
    const targetSection = $(className + ' .card-rating-modal__list[data-index=' + targetId + ']');
    targetSection.removeClass('hide')
  });
}

// ==== cardRatingModal end

// ==== article start
function article() {
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


  const swiper = new Swiper('.main-news__slider', {
    loop: false,
    slidesPerView: 'auto',
    pagination: {
      type: 'progressbar',
      el: '.main-news__pag .slider-pag',
      bulletClass: 'progressbar',
      bulletActiveClass: 'active',
      clickable: true,
    },
  });
}
// ==== article end

// ==== firstScreen start
function firstScreen() {
  const swiper = new Swiper('.first-screen__slider', {
    loop: true,
    pagination: {
      el: '.slider-pag',
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
  });
}
// ==== firstScreen end

// ==== partners start
function partners() {
  const swiper = new Swiper('.partners-slider__slider', {
    loop: true,
    slidesPerView: 3,
    loopAdditionalSlides: 8,
    freeMode: true,
    grid: {
      rows: 2,
    },
    breakpoints: {
      840: {
        slidesPerView: 'auto',
        grid: {
          rows: 1,
        },
      },
    },
  });
}
// ==== partners end

// ==== mainAdvantages start
function mainAdvantages() {
  const swiper = new Swiper('.main-avtg__slider', {
    loop: false,
    slidesPerView: 'auto',
    loopAdditionalSlides: 2,
    pagination: {
      el: '.slider-pag',
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      clickable: true,
    },
  });
  if (swiper?.mounted === true) {
    swiper.slideNext()
  }
}
// ==== mainAdvantages end

// ==== security start
function security() {
  const securityItems = document.querySelectorAll(".security__item");

  securityItems.forEach((item) => {
    const toggleButton = item.querySelector(".security__toggle");
    const cancelButton = item.querySelector(".security__button-cancel");
    const body = item.querySelector(".security__body");
    const infoSpan = item.querySelector(".security__info");
    const labelMobile = item.querySelector(".security__label.label-mobile");
    const isPassword = item.classList.contains('security__item--password')


    function isMobile() {
      return window.innerWidth < 700;
    }

    toggleButton.addEventListener("click", function () {
      body.style.display = "block";
      toggleButton.style.display = "none";

      if (isPassword) {
        infoSpan.style.display = "none";
      }

      if (
        isPassword &&
        !isMobile()
      ) {
        labelMobile.style.display = "none";
      }
    });

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        body.style.display = "none";
        toggleButton.style.display = "block";

        if (infoSpan && infoSpan.textContent.includes("Обновлен месяц назад")) {
          infoSpan.style.display = "block";
        }

        if (
          isPassword &&
          !isMobile()
        ) {
          labelMobile.style.display = "block";
        }
      });
    }
  });
}
// ==== security end

// ==== signupSwitch start
function signupSwitch() {
  const juridicalElement = document.getElementById("juridical");
  const juridicalForm = document.getElementById("juridicalForm");
  const physicalElement = document.getElementById("physical");
  const physicalForm = document.getElementById("physicalForm");

  if (juridicalElement) {
    juridicalElement.addEventListener("change", function () {
      if (juridicalForm && physicalForm) {
        juridicalForm.classList.add("registration__block--active");
        physicalForm.classList.remove("registration__block--active");
      }
    });
  }

  if (physicalElement) {
    physicalElement.addEventListener("change", function () {
      if (physicalForm && juridicalForm) {
        physicalForm.classList.add("registration__block--active");
        juridicalForm.classList.remove("registration__block--active");
      }
    });
  }

  phoneMask(".phone-input");


  $(".select--typeorg select").selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-typeorg",
      "ui-selectmenu-menu": "ui-selectmenu-menu-typeorg"
    }
  });
}
// ==== signupSwitch end

// ==== search start
function search() {
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
// ==== search end

// ==== profile start
function profile() {
  $(document).on('click', ' .edit-contact__item', function (e) {
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


  $('.js-edit-about-open').on('click', function (e) {
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
  $('.edit-about__cancel, .js-edit-about-cancel').on('click', function (e) {
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


  $('.js-edit-requisites-open').on('click', function (e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })
  $('.js-edit-requisites-cancel').on('click', function (e) {
    const block = $('.edit-requisites')
    const open = $('.js-edit-requisites-open')
    const cancel = $('.js-edit-requisites-cancel')
    block.toggleClass('active')
    open.toggleClass('hide')
    cancel.toggleClass('hide')
  })

  function getAverageColor(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const imageData = context.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return { r, g, b };
  }

  function isColorDark({ r, g, b }) {
    // Calculate the luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  }

  function generateFileItem(id) {
    return `
      <div class="dropfile__item active" id="${id}">
        <label class="dropfile__add">
          <input type="file" name="" id="" accept=".png, .jpg, .jpeg, .pdf" hidden>
          <svg>
            <use xlink:href="img/sprites/sprite.svg#plus"></use>
          </svg>
        </label>
        <div class="dropfile__img">
          <img src="" alt="">
        </div>
        <div class="dropfile__delete">
          <svg>
            <use xlink:href="img/sprites/sprite.svg#trash"></use>
          </svg>
        </div>
        <div class="dropfile__info">
          <div class="dropfile__icon">
            <svg>
              <use xlink:href="img/sprites/sprite.svg#picture"></use>
            </svg>
          </div>
          <div class="dropfile__name-wrap">
            <div class="dropfile__name"></div>
            <div class="dropfile__size"></div>
          </div>
        </div>
      </div>
    `;
  }

  $(document).on('change', '.dropfile__item.active input', handleFileInput)
  $(document).on('click', '.dropfile__item.show .dropfile__delete', removeFileInput)

  $('.veri__link').on('click', showFileList)
  $('.veri__subtitle').on('click', toggleChange)

  const dropZone = document.querySelector('.veri__inner--draganddrop');


  dropZone ? dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.classList.add('highlight');
  }) : null;

  // Unhighlight drop zone on drag leave
  dropZone ? dropZone.addEventListener('dragleave', function (e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');
  }) : null;

  dropZone ? dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');

    const files = e.dataTransfer.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      handleFileInput(null, element);
    }
    showFileList();
  }) : null;

  function handleFileInput(e, drop) {
    const list = $('.dropfile__list');
    const item = e ? $(this).closest('.dropfile__item') : $('.dropfile__item.active');
    const input = e ? $(this) : $('.dropfile__item.active input');
    const imgWrap = item.find('.dropfile__img');
    const img = item.find('.dropfile__img img');
    const name = item.find('.dropfile__name');
    const size = item.find('.dropfile__size');
    const id = Date.now();

    const value = drop ? 'drop' : e.target.value;

    if (value.trim() === '') {
      return;
    }

    const file = drop ? drop : e.target.files[0];
    if (file) {
      if (file.type.match('image.*') || file.type === 'application/pdf') {

        item.addClass('show');
        item.removeClass('active');
        // Display the file name
        name.text(file.name);

        // Convert file size to KB and display it
        const fileSizeInKB = (file.size / 1024).toFixed(2);
        size.text(fileSizeInKB + ' KB');

        input.attr('name', id);
        input.attr('id', id);
      }
      if (file.type.match('image.*')) {
        // Read and display the image
        const reader = new FileReader();
        reader.onload = function (e) {
          const pic = new Image();
          pic.src = e.target.result;
          pic.onload = function () {
            img.attr('src', e.target.result);
            const avgColor = getAverageColor(pic);
            const isDark = isColorDark(avgColor);
            name.css('color', isDark ? 'white' : 'black');
            size.css('color', isDark ? 'white' : 'black');
          };
        };
        reader.readAsDataURL(file);

        list.append($(generateFileItem('id-' + Date.now())))

      } else if (file.type === 'application/pdf') {
        list.append($(generateFileItem('id-' + id)))
        imgWrap.text('PDF')
        item.addClass('pdf');
        name.css('color', 'black');
        size.css('color', 'black');
      } else {
        alert('Пожалуйста, выберите допустимое изображение или PDF-файл.');
      }
    }
    isReadyToSend()
  }

  function removeFileInput(e) {
    const item = $(this).closest('.dropfile__item');
    item.remove()

    isReadyToSend()
  }

  function showFileList(e) {
    const text = $('.veri__text--greeting');
    text.addClass('hide')
    $('.veri__labels').removeClass('hide')
  }

  function toggleChange(e) {
    $('.veri__inner--draganddrop').removeClass('hide')
    $('.veri__inner--verified').addClass('hide')
  }

  function isReadyToSend() {
    const btn = $('.js-send-profile-docs');
    $('.dropfile__item').length > 1 ? btn.attr('disabled', false) : btn.attr('disabled', true);
  }

  function performAction() {
    // Replace this with your desired action
    console.log('Action performed!');
  }

  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    $(document).on('click', '.dropfile__item.show', function() {
      $('.dropfile__item.show').removeClass('hover')
      $(this).addClass('hover')
    })
  } else {
    $(document).on('mouseenter', '.dropfile__item.show', function() {
      $(this).addClass('hover')
    })
    $(document).on('mouseleave', '.dropfile__item.show', function() {
      $('.dropfile__item.show').removeClass('hover')
    })
  }


  $(document).click(function(event) {
    if (
      !$(event.target).closest('.dropfile__item.show').length
    ) {
      $('.dropfile__item.show').removeClass('hover')
    }
  });

}
// ==== profile end

// ==== contactMap start
function contactMap() {
  if (!$('#contact-map').length) {
    return false;
  }
  ymaps.ready(function () {                         
    var contactMap = new ymaps.Map('contact-map', {
        center: [55.699467, 37.625594],
        zoom: 12
    });
  });
}
// ==== contactMap end

// ==== cookies start
function cookies() {
  if (localStorage.getItem('cookies') == 'true') {
    $('.cookies').addClass('hide')
  }
  $('.cookies__btn').on('click', function() {
    $('.cookies').addClass('hide')
    localStorage.setItem('cookies', true)
  })
}
// ==== cookies end

// ==== announcements start
function announcements() {
  let indexOfRow = 0;
  const row = $('.js-add-ann-new-row-block .js-add-ann-new-row-clone').eq(0);
  const putPlace = $(".js-add-ann-new-row-block .js-add-ann-new-row-before")

  $(".js-add-ann-new-row-block .js-add-ann-new-row-button").on('click', function() {
    indexOfRow = indexOfRow + 1;
    const clonedRow = row.clone();
    const inputs = $(clonedRow).find("select, input, textarea");
    inputs.each(function (idx, element) {
      const el =  $(element);
      let id = el.attr("id");
      id = id.slice(0, -1) + indexOfRow;
      el.attr("id", id);
      el.attr("name", id);
    })
    putPlace.before(clonedRow);
    $(clonedRow).find(".js-add-ann-new-row-remove").on('click', removeRow)
  })

  function removeRow() {
    $(this).parent(".js-add-ann-new-row-clone").remove()
  }


}
// ==== announcements end

// ==== auth code start
function authCode() {
  const inputs = document.querySelectorAll(".code-input");

  if (inputs.length > 0) {
    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1) {
          if (index !== inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          if (input.value.length === 0 && index !== 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = "";
          } else {
            input.value = "";
          }
        } else if (event.key.length === 1 && /\d/.test(event.key)) {
          input.value = "";
        }
      });
    });

    inputs[inputs.length - 1].addEventListener("input", () => {
      if (inputs[inputs.length - 1].value.length === 1) {
        inputs[inputs.length - 1].blur();
      }
    });
  }
}
// ==== auth code end

// ==== subscription start
$(".custom-select").selectmenu({
  classes: {
    "ui-selectmenu-button": "ui-selectmenu-button-mini",
    "ui-selectmenu-menu": "ui-selectmenu-menu-mini"
  }
});
// ==== subscription end

// ***** invoke scripts start
addEventListener("DOMContentLoaded", () => {
  window.showMore = () => {
    more(
      "ul li",
      ".card-ad-top__table-more .open-more2",
      6,
      ".card-ad-top__list"
    );

    more(
      "tr",
      ".card-ad-top__table-more .open-more",
      4,
      ".card-ad-top__table--harakteristitki"
    );

    more(
      ".card-ad-description__content ul li",
      ".card-ad-description__more .open-more2",
      1,
      ".card-ad-description"
    );

    more(".edit-about__text-part", ".edit-about__more .open-more2", 1, ".edit-about");


    more(
      ".contact-requisites__item",
      ".js-contact-requisites-open",
      7,
      ".contact-requisites__list"
    );

    more(
      ".agreement__content>p",
      ".agreement__more .open-more2",
      4,
      ".agreement"
    );

    more(
      ".switch-train li",
      ".btn4",
      6,
      ".catalog-update__top2"
    );

    more(
      ".card__data li",
      ".card__bot .open-more3, .card__data .open-more2",
      6,
      ".catalog-update .card"
    );

    more(
      ".card__data li",
      ".card__bot .open-more3, .card__data .open-more2",
      5,
      ".catalog-wrapper .card"
    );

  }
  window.showMore();



  hideShowBlock(
    ".article .article__nav .article-nav__list",
    ".article .article__nav .open-more2"
  );

  cardAdMap();
  review();
  cardAdRelative(".card-ad-relative");
  cardRatingModal();
  article();
  firstScreen();
  partners();
  mainAdvantages();
  security();
  signupSwitch();
  search();
  profile();
  contactMap();
  cookies();
  announcements();
  authCode();
  window.octo = {
    header: new Header(),
    textSellerModal: new Modal("text-seller"),
    tabReqModal: new Modal("tab-req"),
    ratingModal: new Modal("rating"),
    sentToModerationModal: new Modal("sent-to-moderation"),
    sortCatalogModal: new Modal("sort-catalog"),
    sortCompamyModal: new Modal("sort-compamy"),
    newsSubsModal: new Modal("news-subs"),
    modalReviewComplaint: new Modal("review-complaint"),
    modalMakeReview: new Modal("modalMakeReview"),
    modalPersonalTariff: new Modal("modalPersonalTariff"),
    Sidebar: Sidebar,
    catalogSidebar: new Sidebar('catalogSidebar', '.catalog-wrapper'),
    catalogSidebarRange: Sidebar.initRange('catalogSidebar', '.catalog-wrapper'),
    copy: new Copy(),
  };
  // window.octo.sentToModerationModal.open()
});
// ***** invoke scripts end

