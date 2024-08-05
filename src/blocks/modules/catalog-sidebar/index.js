import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';

window.rangeInstance = {};

export default class Sidebar {
  constructor(name, parentSelector) {
    this.name = name
    this.parentSelector = parentSelector
    this.modal()
    this.category()
    this.resetListener()
  }

  static initRange(name, parentSelector) {
    window.ionRangeSlider = ionRangeSlider
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

    $(document).click(function(event) {
      if (
        !$(event.target).closest('.js-open-map').length &&
        !$(event.target).closest('.map-point').length
      ) {
        $('.map-point').removeClass('open')
      }
    });
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
