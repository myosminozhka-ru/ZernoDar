import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';

export default class Sidebar {
  constructor() {
    this.initRange()
    this.modal()
    this.category()
    this.resetListener()
  }
  initRange() {
    window.ionRangeSlider = ionRangeSlider
    const rangeInstanceArray = []

    const rangeNodes = document.querySelectorAll('.filter-range')

    rangeNodes.forEach(element => {
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
    window.rangeInstanceArray = rangeInstanceArray

  }

  modal() {
    $('.js-open-filter').on('click', () => {
      $('.catalog-sidebar__modal').addClass('open')
    })

    $('.js-close-filter').on('click', () => {
      $('.catalog-sidebar__modal').removeClass('open')
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
    $('.filter-list__item').each(function( index ) {
      console.log(this);
      const that = this
      $(this).children('.filter-list__title').on('click', function() {
        if ($(that).hasClass('open')) {
          $('.filter-list__item').removeClass('hide')
          $(that).removeClass('open')
        } else {
          $('.filter-list__item').toggleClass('hide')
          $(that).toggleClass('hide')
          $(that).toggleClass('open')
        }
        // $('.filter-list__item').toggleClass('hide')
      })
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
    $('.catalog-sidebar').trigger("reset");
    $('.catalog-head__top').trigger("reset");

    window.rangeInstanceArray.forEach(instance => {
      instance.instance.reset()
      instance.resetInputs()
    })
  }
}
