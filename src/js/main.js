// all scripts here
window.showMore = () => {

};

window.imagesFolderURL = window.location.href.includes('localhost') ? '' : window.location.origin + '/local/templates/zernodar/';

const mediaQuery = window.matchMedia("(max-width: 1023px)");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
function hasMouseSupport() {
  return window.matchMedia('(pointer: fine)').matches;
}
// ==== copy start
class Copy {
  constructor() {
    this.textarea = document.querySelector('#urlCopy')
    this.init()
  }
  init() {
    if (!this.textarea) return
    this.copyHandler()
  }
  copy(id) {
    let text = ''
    if (id) {
      const el = document.querySelector(`[data-copy-text=${id}]`);
      text = el.textContent
      this.textarea.innerHTML = el.textContent;
    } else {
      this.textarea.innerHTML = window.location.href;
    }
    // this.textarea.focus();
    this.textarea.select();

    if (navigator.clipboard && window.isSecureContext) {
        // Используем Clipboard API
        navigator.clipboard.writeText(text).then(function() {
            console.log('Текст скопирован в буфер обмена!');
        }, function(err) {
            console.error('Ошибка при копировании текста: ', err);
        });
    } else {

        try {
            document.execCommand('copy');
            console.log('Текст скопирован в буфер обмена (фоллбэк)!');
        } catch (err) {
            console.error('Ошибка при копировании текста (фоллбэк): ', err);
        }
    }
  }
  copyHandler() {
    const that = this
    $(document).on('click', '[data-copy-trigger]', function() {
      const id = $(this).attr('data-copy-trigger')
      that.copy(id)
      that.inform(id, $(this))
    })
  }
  inform(id, jq) {
    let inform = $(`[data-copy-inform=${id}]`)
    let text = ''
    if (inform.length) {
      text = inform.text()
    } else {
      inform = jq
      text = jq.text()
    }
    inform.text('Скопировано!')
    setTimeout(function() {
      inform.text(text)
    }, 2000);
  }
}
// ==== copy end

// ==== helper start
const helper = {
  textSlice(text, length) {
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
    function () {
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
  constructor(name, scrollLock = true, type = 'modal') {
    this.name = name;
    this.scrollLock = scrollLock;
    this.modal = document.querySelector(`[data-modal="${name}"]`);
    this.callbackClose = null;
    this.type = type;
    this.init();
  }
  init() {
    if (this.modal) {
      this.content = this.modal.querySelector(".modal__content");
      this.openHendler();
      this.closeHendler();
      // if (this.type === 'confirm') {
      //   this.showCustomConfirm()
      // }
    }
  }
  showCustomConfirm() {
    return new Promise((resolve, reject) => {
        this.modal.querySelector(`[data-confirm-yes]`).onclick = () => {
            resolve(true);
            this.close()
        };

        this.modal.querySelector(`[data-confirm-no]`).onclick = () => {
            resolve(false);
            this.close()
        };
    });
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
          if (this.type !== 'confirm') {
            this.close();
          }
        }
      })
      : null;
    this.modal
      ? this.modal
        .querySelector("button.close-x")
        ?.addEventListener("click", (e) => {
          if (this.type !== 'confirm') {
            this.close();
          }
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
function more(element, button, count = 1, parent, all) {
  $(parent + (all ? '' : ':not(.inited)')).each(function (idx, el) {
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
    instances.push(IMask(el, { mask: "+{7 }(000)-0000-000" }));
  });

  return instances;
}
// ==== tel mask end

// ==== inn mask start
function innMask(selector) {
  const inputs = document.querySelectorAll(selector);
  const instances = [];
  inputs.forEach((el) => {
    instances.push(IMask(el, {
      mask: /^\d{0,12}$/
     }));
  });

  return instances;
}
// ==== inn mask end

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
    $('.header').addClass('open')
    $('.nav').addClass('open')
    $('body').addClass('lock')
  }
  close() {
    this.isNavOpen = false
    $('.header__burger').removeClass('active')
    $('.header').removeClass('open')
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
    if ($(e.target).closest('.nav-drop').length) {
      return
    }
    $('.nav__item').removeClass('active')
    if (this[mod + 'IsOpen']) {
      this.closeNavDrop('.nav-drop--' + mod)
      this.supplyIsOpen = false
      this.demandIsOpen = false
    } else {
      $('.nav__item--' + mod).addClass('active')
      this.openNavDrop('.nav-drop--' + mod)
      this.supplyIsOpen = false
      this.demandIsOpen = false
      this[mod + 'IsOpen'] = true;
    }
  }
  navDropHandler() {
    // if (!isMobile) {
    //   $('.nav__item--supply').on('mouseenter' ,this.navDropItemHandler.bind(this, "supply"))
    //   $('.nav__item--demand').on('mouseenter' , this.navDropItemHandler.bind(this, "demand"))
    // } else {
    //   $('.nav__item--supply svg').on('click' ,this.navDropItemHandler.bind(this, "supply"))
    //   $('.nav__item--demand svg').on('click' , this.navDropItemHandler.bind(this, "demand"))
    // }

    $('.nav__item--supply').on('click', this.navDropItemHandler.bind(this, "supply"))
    $('.nav__item--demand').on('click', this.navDropItemHandler.bind(this, "demand"))

    $(document).on('click', (event) => {
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

    $('.nav-drop').each(function (index, element) {

      $(element).find('.nav-drop__title').each(function (index, arrow) {
        $(arrow).on('click', function (e) {
          if ($(e.target).is($(arrow).find('a.str'))) {
            console.log("is");
            e.preventDefault()
          }
          e.stopPropagation()
          const isOpen = $(element).find(`.nav-drop__block:eq(${index})`).hasClass('open')

          if (!mediaQuery.matches && isOpen) {
            // если это десктоп и нажали на уже открытое, то ничего не делаем
          } else {
            // если это мобилка
            $(element).find('.nav-drop__title').removeClass('active')
            $(element).find('.nav-drop__block').removeClass('open')
          }
          if (!isOpen) {
            $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
            $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
          }
        })
      })

      // $(element).find('.nav-drop__title').each(function(index, title) {
      //   $(title).on('mouseenter', function() {
      //     if (!isMobile) {
      //       $(element).find('.nav-drop__title').removeClass('active')
      //       $(element).find('.nav-drop__block').removeClass('open')
      //       $(element).find(`.nav-drop__title:eq(${index})`).addClass('active')
      //       $(element).find(`.nav-drop__block:eq(${index})`).addClass('open')
      //     }
      //   })
      // })
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
    // Function to handle the event
    const handleMediaQueryChange = (event) => {
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
      $('.nav-drop').each(function (index, element) {
        $(element).find('.nav-drop__block').removeClass('open')
        $(element).find('.nav-drop__title').removeClass('active')
        $(element).find(`.nav-drop__block:eq(0)`).addClass('open')
        $(element).find('.nav-drop__block').appendTo($(element).find('.nav-drop__right'))

      })
    } else {
      $('.nav-drop').each(function (index, element) {
        $(element).find('.nav-drop__block').removeClass('open')
        $(element).find('.nav-drop__title').removeClass('active')
        $(element).find('.nav-drop__title').each(function (index, title) {
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

// ==== Sidebar start
window.rangeInstance = {};
class Sidebar {
  constructor(name, parentSelector) {
    this.name = name
    this.parentSelector = parentSelector
    this.modal()
    this.category()
    this.resetListener()
    this.initRange(name, parentSelector)
    this.onChangeRangeCallbacks = []
    this.onChangeRangeCallback = null
  }

  onChangeRange(callback) {
    this.onChangeRangeCallbacks.push(callback)
  }

  onChangeRangeCurrent(callback) {
    this.onChangeRangeCallback = callback
  }

  clearOnChangeRange() {
    this.onChangeRangeCallbacks = [];
  }

  callOnChangeRangeCallbacks() {
    this.onChangeRangeCallbacks.forEach(callback => callback());
  }

  onChangeCurrent(data) {
    const id = data.input[0].id;
    const findInstance = this.findCurrentRangeInstance(id);
    const instance = findInstance.instance;
    const datas = { id: '', value: '', element: null }
    if (instance.target === 'from') {
      datas.id = instance.fromId
      datas.value = instance.old_from
      datas.element = $("#" + instance.fromId)
      // console.log(instance.fromId + ': ' + instance.old_from);
    } else if (instance.target === 'to') {
      datas.id = instance.toId
      datas.value = instance.old_to
      datas.element = $("#" + instance.toId)
      // console.log(instance.toId + ': ' + instance.old_to);
    }
    return this.onChangeRangeCallback ? this.onChangeRangeCallback(datas) : datas;
  }

  findCurrentRangeInstance(id) {
    return window.rangeInstance[this.name].find(instance => instance.instance.input.id == id)
  }

  initRange(name, parentSelector) {
    const that = this;
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
          that.callOnChangeRangeCallbacks()
          that.onChangeCurrent(data)
        },
        onUpdate: function (data) {
          inputFrom.value = data.from
          inputTo.value = data.to
          placeholderFromStr.textContent = data.from
          placeholderToStr.textContent = data.to
          that.callOnChangeRangeCallbacks()
          that.onChangeCurrent(data)
        }
      });

      // 2. Save instance to variable
      const rangeInstance = $(inputRange).data("ionRangeSlider");
      rangeInstance.toId = inputTo.id;
      rangeInstance.fromId = inputFrom.id;

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

    $(document).click(function (event) {
      if (
        !$(event.target).closest('.js-open-map').length &&
        !$(event.target).closest('.map-point').length
      ) {
        $('.map-point').removeClass('open')
      }
    });
  }

  category() {
    $(this.parentSelector).each(function (index) {
      const thatwrapper = this;
      $(thatwrapper).find('.filter-list__item').each(function (index) {
        const that = this
        $(this).find('.filter-list__title').on('click', function () {
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
    $('.js-reset-filter').on('click', () => {
      this.resetFilter()
    })
  }

  resetFilter() {
    $(this.parentSelector + ' .catalog-sidebar').trigger("reset");
    $(this.parentSelector + ' .catalog-head__top').trigger("reset");
    $(this.parentSelector + ' .app-filter').trigger("reset");
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

  if ($('.base-tab__item--tab').length && !$('.base-tab__item--tab').hasClass('active')) {
    $('.base-tab__item--tab').eq(0).addClass('active')
    $('.base-tab__block--tab').eq(0).addClass('active')
  }

  $(document).on('click', ' .review-list__to-answer .review-to-answer', function (e) {
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


  $(document).on('click', ' .review-list__answers', function (e) {
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
  $(document).on('click', className + ' .switch-button__item', function (e) {
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
  const slider = document.querySelector('.partners-slider__wrapper'); // контейнер слайдера
  if (!slider) return;

  const slides = slider.querySelectorAll('.partners-slider__slide'); // все слайды

  const minSlides = 12; // минимальное количество слайдов

  if (slides.length < minSlides) {
      const slidesToAdd = minSlides - slides.length; // количество слайдов, которые нужно добавить

      for (let i = 0; i < slidesToAdd; i++) {
          const duplicateSlide = slides[i % slides.length].cloneNode(true); // клонирование слайдов
          slider.appendChild(duplicateSlide); // добавление клона в слайдер
      }
  }
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
        loop: true,
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

    toggleButton.addEventListener("click", function () {
      body.style.display = "block";
      toggleButton.style.display = "none";

      if (isPassword) {
        infoSpan.style.display = "none";
      }

      if (
        isPassword &&
        !mediaQuery.matches
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
          !mediaQuery.matches
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



  // Extend the selectmenu widget with a unique name (customSelectmenu)
  $.widget("custom.customSelectmenu", $.ui.selectmenu, {
    _renderItem: function (ul, item) {
      var li = $("<li>");
      if (item.disabled) {
        li.addClass("ui-state-disabled");
      }
      // Custom rendering logic
      var wrapper = $('<div class="custom-item">');
      var description = $('<span class="custom-item-description">').text(item.element.attr('data-description'));
      wrapper.append(item.label).append(description);
      return li.append(wrapper).appendTo(ul);
    }
  });

  $(".select--typeorg select").customSelectmenu({
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
      $(this).addClass('open')
    }
    const itIsCanceler = $(target).closest('.js-edit-contact-cancel')
    if (itIsCanceler && itIsCanceler.length) {
      content.addClass('hide')
      open.removeClass('hide')
      cancel.addClass('hide')
      $(this).removeClass('open')
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
            <use xlink:href="${window.imagesFolderURL}img/sprites/sprite.svg#plus"></use>
          </svg>
        </label>
        <div class="dropfile__img">
          <img src="" alt="">
        </div>
        <div class="dropfile__delete">
          <svg>
            <use xlink:href="${window.imagesFolderURL}img/sprites/sprite.svg#trash"></use>
          </svg>
        </div>
        <div class="dropfile__info">
          <div class="dropfile__icon">
            <svg>
              <use xlink:href="${window.imagesFolderURL}img/sprites/sprite.svg#picture"></use>
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
    const itemsCount = $('.dropfile__item').length;
    const itemActive = $('.dropfile__item:last-child');
    itemsCount > 1 ? btn.attr('disabled', false) : btn.attr('disabled', true);
    console.log(itemsCount);
    itemsCount > 2 ? itemActive.addClass('hide') : itemActive.removeClass('hide');
  }

  function performAction() {
    // Replace this with your desired action
    console.log('Action performed!');
  }

  if (!hasMouseSupport()) {
    $(document).on('click', '.dropfile__item.show', function () {
      $('.dropfile__item.show').removeClass('hover')
      $(this).addClass('hover')
    })
  } else {
    $(document).on('mouseenter', '.dropfile__item.show', function () {
      $(this).addClass('hover')
    })
    $(document).on('mouseleave', '.dropfile__item.show', function () {
      $('.dropfile__item.show').removeClass('hover')
    })
  }


  $(document).click(function (event) {
    if (
      !$(event.target).closest('.dropfile__item.show').length
    ) {
      $('.dropfile__item.show').removeClass('hover')
    }
  });

}
// ==== profile end

// ==== cookies start
function cookies() {
  if (localStorage.getItem('cookies') == 'true') {
    $('.cookies').addClass('hide')
  }
  $('.cookies__btn').on('click', function () {
    $('.cookies').addClass('hide')
    localStorage.setItem('cookies', true)
  })
}
// ==== cookies end

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
$(".custom-select").each(function(index, el)  {
  $(el).selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-mini",
      "ui-selectmenu-menu": "ui-selectmenu-menu-mini"
    },
    appendTo: $(this).closest(".subs-mob__inner, .tariff-cards"),
    position: {
      my: 'center bottom',
      at: 'center top'
    }
  });
})
// ==== subscription end


// ==== publish time start
function publishTime() {
  $('[data-publish-select="publish-weekdays"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    }
  });
  $('[data-publish-select="publish-time"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    }
  });
  function changePublish(e, selector) {
    let parent = null;
    if (selector) {
      if (!$(selector).length) {
        return;
      }
      $(selector).each((index, el) => {
        if ($(el).prop('checked')) {
          parent = $(el).closest('.add-ann-publish');
          return;
        }
      })
    } else {
      parent = $(e.target).closest('.add-ann-publish');
    }
    const id = $(parent).find('input').attr('id');
    
    const siblings = $(parent).siblings('.add-ann-publish');
    siblings.removeClass('open')
    parent.addClass('open')
    
    $(`[data-publish-notification]`).addClass('hide')
    $(`[data-publish-notification="${id}"]`).removeClass('hide')
  }
  changePublish(null, '[name="PUBLISH"]')
  $('[name="PUBLISH"]').on('change', changePublish)
}
// ==== publish time end

// ==== others selectmenu start

// $('.add-ann-block .my-input .my-select select').selectmenu({
//   classes: {
//     "ui-selectmenu-button": "ui-selectmenu-button-border",
//     "ui-selectmenu-menu": "ui-selectmenu-menu-border"
//   }
// });

$(".select--sort select").selectmenu({
  classes: {
    "ui-selectmenu-button": "ui-selectmenu-button-border",
    "ui-selectmenu-menu": "ui-selectmenu-menu-border"
  }
});
// $(".filter__item .select select").selectmenu({
//   classes: {
//     "ui-selectmenu-button": "ui-selectmenu-button-filter",
//     "ui-selectmenu-menu": "ui-selectmenu-menu-filter"
//   }
// });
// ==== others selectmenu end


// ==== sms code time start
window.startTimeSMSCode = function (seconds) {
  window.startTimeSMSCodeID ? clearInterval(window.startTimeSMSCodeID) : null;
  $('[data-resend-code]').attr('disabled', true)
  let timeRemaining = seconds;

  const intervalId = setInterval(() => {
    // Рассчитываем часы, минуты и секунды
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const remainingSeconds = timeRemaining % 60;

    // Форматируем результат в человекопонятный вид
    const timeString = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    // Выводим результат в тег <p>
    $("[data-timer]").text(timeString);

    // Останавливаем таймер, когда время закончится
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      $('[data-resend-code]').attr('disabled', false)
    }

    // Уменьшаем оставшееся время на 1 секунду
    timeRemaining--;
  }, 1000); // Запускаем таймер с интервалом в 1 секунду
  window.startTimeSMSCodeID = intervalId;
}
// ==== sms code time end


// ==== tab data attr start
$(document).on('click', '[data-tab-edit-block-trigger]', function (e) {
  const id = e.target.dataset.tabEditBlockTriggerId;
  const trigger = e.target.dataset.tabEditBlockTrigger;
  $(`[data-tab-edit-block-trigger="${trigger}"]`).removeClass('active');
  $(`[data-tab-edit-block-trigger-id="${id}"]`).addClass('active');
  $(`[data-tab-edit-block="${trigger}"]`).addClass('hide');
  $(`[data-tab-edit-block-id="${id}"]`).removeClass('hide');
})
// ==== tab data attr end


// ==== scroll to data attr start
$(document).on('click', '[data-scroll-to]', function (e) {
  const val = e.target.dataset.scrollTo;
  const isId = (/^#.*/).test(val);
  if (isId) {
    $(val).length ? $(val)[0].scrollIntoView({
      block: 'center', // Выровнять по нижней части экрана
      behavior: 'smooth' // Плавная прокрутка
    }) : null;
  } else {
    $("html").animate({ scrollTop: 0 }, "slow");
  }
})
// ==== scroll to data attr end

// ==== auto height input-wrap start
function autoHeightInputWrap(reinit) {
  function setEqualHeight(container) {

    const wraps = $(container).find('.my-input:not(.hide)')
    var grouped = groupElementsByPosition(wraps);
    grouped.forEach(array => {
      // Сброс высоты всех элементов
      array.forEach((element => {
        $(element).find('.my-input__label').css('height', 'auto');
      }))
      // Находим самый высокий элемент
      let maxHeight = 0;
      array.forEach(element => {
        const height = $(element).find('.my-input__label').outerHeight();
        if (height > maxHeight) {
          maxHeight = height;
        }
      })
      // Задаем максимальную высоту всем элементам
      array.forEach((element => {
        $(element).find('.my-input__label').css('height', maxHeight + 'px');
      }))
    })
  }
  const container = '.autoHeightInputWrap';
  $(container).each(function() {
    const els = $(this).find('.my-input__label')
    if (!els.length || mediaQuery.matches) {
      return;
    }
    // Вызываем функцию при загрузке страницы
    setEqualHeight(this);
    if (!reinit) {
      // Наблюдатель за изменениями в DOM
      const observer = new MutationObserver(() => setEqualHeight(this));

      // Настройки наблюдателя
      observer.observe(this, {
        childList: true,
        subtree: true
      });

      mediaQuery.addEventListener('change', () => setEqualHeight(this));
    }
  });
}

function groupElementsByPosition(selector) {
  var elements = $(selector);
  var groupedArray = [];
  var currentTop = null;

  elements.each(function() {
      // Получаем позицию элемента относительно страницы
      var elementTop = $(this).offset().top;

      // Если элемент находится на новой строке (новая координата по оси Y)
      if (elementTop !== currentTop) {
          currentTop = elementTop;
          // Начинаем новый подмассив
          groupedArray.push([]);
      }

      // Добавляем элемент в последнюю строку (подмассив)
      groupedArray[groupedArray.length - 1].push(this);
  });

  return groupedArray;
}
window.autoHeightInputWrap = autoHeightInputWrap;
// ==== auto height input-wrap end

// ==== tooltip start
$('.helptip').tooltip({
  classes: {
    "ui-tooltip": "ui-corner-all ui-widget-shadow ui-helptip"
  }
});
$('.header__act').tooltip({
  classes: {
    "ui-tooltip": "ui-corner-all ui-widget-shadow ui-helptip--count-add"
  }
});
// if (hasMouseSupport()) {
//   $('.helptip').tooltip({
//     trigger: 'hover',
//     classes: {
//       "ui-tooltip": "helptip"
//     }
//   });
// } else {
//   $('.helptip').tooltip({
//     trigger: 'click',
//     classes: {
//       "ui-tooltip": "helptip"
//     }
//   });
// }
// ==== tooltip end

// ***** invoke scripts start
addEventListener("DOMContentLoaded", () => {
  window.showMore = (all) => {
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
      ".contact-requisites__inner"
    );

    more(
      ".switch-train li",
      ".btn4",
      6,
      ".catalog-update__top2",
      all
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
  cookies();
  authCode();
  publishTime();
  autoHeightInputWrap();
  window.octo = {
    header: new Header(),
    textSellerModal: new Modal("text-seller"),
    tabReqModal: new Modal("tab-req"),
    ratingModal: new Modal("rating"),
    sentToModerationModal: new Modal("sent-to-moderation"),
    modalMessageWait: new Modal("modalMessageWait"),
    modalMessageStatusUpdated: new Modal("modalMessageStatusUpdated"),
    sortCompamyModal: new Modal("sort-compamy"),
    newsSubsModal: new Modal("news-subs"),
    modalReviewComplaint: new Modal("review-complaint"),
    modalMakeReview: new Modal("modalMakeReview"),
    modalPersonalTariff: new Modal("modalPersonalTariff"),
    modalVerifyAccount: new Modal("modalVerifyAccount"),
    modalConfirm: new Modal("modalConfirm", true, 'confirm'),
    modalTariffPayNotification: new Modal("modalTariffPayNotification"),
    Sidebar: Sidebar,
    catalogSidebar: new Sidebar('catalogSidebar', '.catalog-wrapper'),
    mapFilter: new Sidebar('mapFilter', '.app'),
    copy: new Copy(),
    innMasks: innMask(".inn-input"),
  };
  //window.octo.modalConfirm.open()

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // $('[name="radio-group"]').on('change', function(e) {
  //   if (e.target.id === 'option2') {
  //     window.octo.modalConfirm.open()
  //     octo.modalConfirm.showCustomConfirm().then((result) => {
  //       if (result) {
  //           window.octo.modalMessageStatusUpdated.open()
  //       } else {
  //           console.log("Отменено!");
  //       }
  //     });
  //   }
  // })

  // $('#autopay').on('change', function(e) {
  //   console.log(e.target.checked);
    
  //   if (!e.target.checked) {
  //     window.octo.modalConfirm.open()
  //     octo.modalConfirm.showCustomConfirm().then((result) => {
  //       if (result) {
  //           window.octo.modalMessageStatusUpdated.open()
  //           e.target.checked = false
  //       } else {
  //           console.log("Отменено!");
  //           e.target.checked = true
  //       }
  //     });
  //   } else {
  //     console.log('unchecked');
  //   }
  // })
  // window.octo.catalogSidebar.onChangeRangeCurrent(debounce(function (data) {
  //   // в data данные текущего ползунка
  //   console.log(data)
  // }, 2000));
  // window.octo.mapFilter.onChangeRangeCurrent(debounce(function (data) {
  //   // в data данные текущего ползунка
  //   console.log(data)
  // }, 2000));
  // window.octo.catalogSidebar.onChangeRange(debounce(function (e) {
  //   // window.rangeInstance.catalogSidebar - спиоск ползунов на боковом сайдбаре
  //   if (window.rangeInstance?.catalogSidebar?.length) {
  //     window.rangeInstance?.catalogSidebar.forEach(i => {
  //       // при изменении ползунка или ручного ввода инпути снизу
  //       // выводит в консоль каждый инпут с id и value
  //       console.log(i.instance.input.id + ': ' + i.instance.input.value)
  //     })
  //   }
  // }, 2000));
  // window.octo.textSellerModal.open()
  // $('[data-filter-geo="range_container"] input').ionRangeSlider({
  //   onChange: function (data) {
  //     const currentValue = data.input.val();
  //     console.log(currentValue);
  //     // currentValue - текущее значение ползунка
  //     // тут можно вызвать функция ajax для передачи данных карты/фильтра на бэк 
  //   },
  // });
});
// ***** invoke scripts end

