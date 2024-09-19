addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(max-width: 1023px)");
  // выпадашки select
  $('[data-select="name_44"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    },
    change: function (event, ui) {
      console.log(event, ui);
    },
  });

  $('[data-select="name_77"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    },
    change: function (event, ui) {
      console.log(event, ui);
    },
  });

  // скрыть footer
  if ($('.app').length) {
    $('.footer').css({display: 'none'})
  }

  // фильтр модалка
  // открыть window.modalMapFilter.open()
  // закрыть window.modalMapFilter.close()
  window.modalMapFilter = new Modal("modalMapFilter");


  // reset фильтра window.octo.mapFilter.resetFilter()

  // slider
  // для обновления слайда window.mapSlider.update();
  window.mapSlider = new Swiper('.app-list__swiper', {
    loop: false,
    slidesPerView: 'auto',
    direction: "horizontal",
    freeMode: true,
    mousewheel: {
      enabled: true,
      sensitivity: 0.5,
    },
    breakpoints: {
      100: {
        loop: false,
        slidesPerView: 'auto',
        direction: "horizontal",
        freeMode: true,
        mousewheel: {
          enabled: true,
          sensitivity: 0.5,
        },
      },
      1024: {
        loop: false,
        slidesPerView: 'auto',
        direction: "vertical",
        freeMode: true,
        mousewheel: {
          enabled: true,
          sensitivity: 0.5,
        },
      }
    }
  });

  // Функция для отображения меток на карте
  window.showWarehousesOnMap = function showWarehousesOnMap(warehouses) {
    warehouses.forEach(function (warehouse) {
      var placemark = new ymaps.Placemark(warehouse.coordinates, {
        // Данные для попапа
        balloonContent: !mediaQuery.matches ? `
              <div class="map-popup">
                <div class="map-popup__inner">
                  <div class="map-popup__top">
                    <div class="map-popup__icon">
                      <img src="${warehouse.icon}" alt="">
                    </div>
                    <div>
                      <a href="${warehouse.href}" target="_black" class="map-popup__title">${warehouse.name}</a>
                      <div class="map-popup__price">${warehouse.price}</div>
                    </div>
                  </div>
                  <div class="map-popup__bot">
                    <div class="map-popup__tags">
                      ${warehouse.tags.map(i => "<span>" + i + "</span>").reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          '',
        )}
                    </div>
                  </div>
                </div>
              </div>
            ` : ``
      }, {
        // Опции для кастомной иконки
        iconLayout: 'default#image',
        iconImageHref: '/local/templates/zernodar/img/sprites/marker-map.svg', // Путь к вашей иконке
        iconImageSize: [30, 42],                // Размер иконки
        iconImageOffset: [-15, -42]             // Смещение иконки
      });
      window.catalogMap.geoObjects.add(placemark);
      placemark.events.add('click', () => window.slideTo(warehouse.id));
    });
  }

  window.lastClickedCatalogMapPlacemarkId = null;

  window.slideTo = function(idParam) {
    try {
      setTimeout(() => {
        let id = idParam;
        if (!id && window.lastClickedCatalogMapPlacemarkId) {
          id = window.lastClickedCatalogMapPlacemarkId;
        }
        window.lastClickedCatalogMapPlacemarkId = id;
        const index = $(`[data-item-id="${id}"]`).index();
        console.log(index);
        window.mapSlider.slideTo(index, 100, false);
        window.catalogMapSliderView(true);
      }, 500);
    } catch (error) {
      window.catalogMapSliderView(false);
      console.error(error);
    }
  }

  $(document).on('click', '.app__sidbar', (e) => {
    if ($('.app__sidbar').is(e.target)) {
      window.catalogMapSliderView(false);
    }
  })

  $(document).on('click', '.app__sidbar-open .btn3', (e) => {
    window.catalogMapSliderView(true);
  })

  window.catalogMapSliderView = function(action) {
    if (action) {
      $('.app__sidbar').addClass('open');
      $('.app__sidbar-open').addClass('close');
    } else {
      $('.app__sidbar').removeClass('open');
      $('.app__sidbar-open').removeClass('close');
    }
  }

  window.removeAllWarehousesOnMap = function() {
    window.catalogMap.geoObjects.removeAll();
  }

  // пример данных у точек на карте
  const warehouses = [
    // {
    //   id: '1',
    //   coordinates: [55.829544, 37.436152],
    //   name: "name 1",
    //   price: "price 1",
    //   icon: 'img/first-screen1.jpg',
    //   tags: ["tag 1", "tag 1"],
    //   href: '/href',
    // },
    // {
    //   id: '2',
    //   coordinates: [55.813376, 37.630301],
    //   name: "name 2",
    //   price: "price 1",
    //   icon: 'img/first-screen2.jpg',
    //   tags: ["tag 1", "tag 1"]
    //   href: '/href',
    // },
    // {
    //   id: '3',
    //   coordinates: [55.742848, 37.605283],
    //   name: "name 3",
    //   price: "price 1",
    //   icon: 'img/first-screen3.jpg',
    //   tags: ["tag 1", "tag 1"]
    //   href: '/href',
    // },
    // {
    //   id: '4',
    //   coordinates: [55.750630, 37.674063],
    //   name: "name 4",
    //   price: "price 1",
    //   icon: 'img/first-screen1.jpg',
    //   tags: ["tag 1", "tag 1"]
    //   href: '/href',
    // }
  ];

  // debounce функция, которая «откладывает» вызов другой функции до того момента, когда с последнего вызова пройдёт определённое количество времени
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

  // Инициализация карты
  try {
    ymaps.ready(function () {

      if (!document.querySelector("#map-search")) {
        return;
      }
      
      const map = new ymaps.Map("map-search", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl']
      });

      window.catalogMap = map;

      // Показать склады warehouses
      window.showWarehousesOnMap(warehouses);

      window.catalogMap.events.add('boundschange', debounce(function (e) {
        // Возвращает двумерный массив геокоординат левого нижнего и правого верхнего углов области показа карты.
        // можно получить новые точки на карте
        // удалить старыне window.removeAllWarehousesOnMap();
        // добавить новые window.showWarehousesOnMap(массив данных);
        var result = window.catalogMap.getBounds();

        if (result) {
          $('[data-name="ADDRESS_GEO_LAT"]').find('[data-min]').val(result[0][0]);
          $('[data-name="ADDRESS_GEO_LAT"]').find('[data-max]').val(result[1][0]);
          $('[data-name="ADDRESS_GEO_LON"]').find('[data-min]').val(result[0][1]);
          $('[data-name="ADDRESS_GEO_LON"]').find('[data-max]').val(result[1][1]);

          window.SmartFilterDataChanged(window.filter);
        }
      }, 1000));
    });
  } catch (error) {
    
  }

});