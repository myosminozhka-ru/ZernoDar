addEventListener("DOMContentLoaded", () => {
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
        balloonContent: `
              <div class="map-popup">
                <div class="map-popup__inner">
                  <div class="map-popup__top">
                    <div class="map-popup__icon">
                      <img src="${warehouse.icon}" alt="">
                    </div>
                    <div>
                      <a href="${warehouse.href}" class="map-popup__title">${warehouse.name}</a>
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
            `
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

  window.slideTo = function(id) {
    try {
      setTimeout(() => {
        const index = $(`[data-id="${id}"]`).attr("aria-label").split('/')[0].trim();
        console.log(index);
        window.mapSlider.slideTo(index, 100, false);
      }, 500);
    } catch (error) {
      console.error(error);
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
    //   ownerHref: '/href',
    // },
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