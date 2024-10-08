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
    $('.footer').css({ display: 'none' })
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
  window.slideTo = function (idParam) {
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
      }, 100);
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

  window.catalogMapSliderView = function (action) {
    if (action) {
      $('.app__sidbar').addClass('open');
      $('.app__sidbar-open').addClass('close');
    } else {
      $('.app__sidbar').removeClass('open');
      $('.app__sidbar-open').removeClass('close');
    }
  }

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
  // Хранение старого и нового массива объектов
  let oldObjects = [];
  let geoObjects = new Map();
  let myMap;
  let clusterer;
  let onBoundsChange = debounce(function (e) {
    var result = myMap.getBounds();
    window.showWarehousesOnMap([
      {
        id: '1',
        coordinates: [55.829544, 37.436152],
        name: "name 1",
        price: "price 1",
        icon: 'img/first-screen1.jpg',
        tags: ["tag 1", "tag 1"],
        ownerHref: '/href',
      },
      {
        id: '2',
        coordinates: [55.813376, 37.630301],
        name: "name 2",
        price: "price 1",
        icon: 'img/user-ava.png',
        tags: [],
        ownerHref: '/href',
      },
      {
        id: '3',
        coordinates: [55.742848, 37.605283],
        name: "Пшеница 2 класса в Новгородской области",
        price: "price 1",
        icon: 'img/user-ava.png',
        tags: ["tag 1", "tag 1"],
        ownerHref: '/href',
      },
      {
        id: '4',
        coordinates: [55.750630, 37.674063],
        name: "name 4",
        price: "price 1",
        icon: 'img/first-screen1.jpg',
        tags: ["tag 1", "tag 1"],
        ownerHref: '/href',
      },
      {
        id: '5',
        coordinates: [55.750630, 37.674063],
        name: "Пшеница 2 класса в Новгородской области",
        price: "price 1",
        icon: 'img/first-screen1.jpg',
        tags: ["tag 1", "tag 1"],
        ownerHref: '/href',
      },
      {
        id: '6',
        coordinates: [55.750630, 37.674063],
        name: "name 4",
        price: "",
        icon: 'img/first-screen1.jpg',
        tags: [],
        ownerHref: '/href',
      },
    ])
    
    if (result) {
      $('[data-name="ADDRESS_GEO_LAT"]').find('[data-min]').val(result[0][0]);
      $('[data-name="ADDRESS_GEO_LAT"]').find('[data-max]').val(result[1][0]);
      $('[data-name="ADDRESS_GEO_LON"]').find('[data-min]').val(result[0][1]);
      $('[data-name="ADDRESS_GEO_LON"]').find('[data-max]').val(result[1][1]);

      //window.SmartFilterDataChanged(window.filter, true);
    }
  }, 1000);

  function init() {

    if (!document.querySelector("#map-search")) {
      return;
    }

    var coordinates = document.querySelector("#map-search").getAttribute("data-map-coordinates").split(',').map(c => +c),
      zoom = 5;

    if (!coordinates || !coordinates[0]) {
      coordinates = [56.326483, 44.006050];
      zoom = 5;
    }

    // Инициализация карты
    myMap = new ymaps.Map("map-search", {
      center: coordinates,
      zoom: zoom,
      controls: []
    }, {
      maxZoom: 16,
      minZoom: 4,
    });

    window.catalogMap = myMap;

    // Создание кластеризатора
    clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedVioletClusterIcons', // Внешний вид кластеров
      groupByCoordinates: false, // Не группировать точки с одинаковыми координатами
      clusterDisableClickZoom: false, // Включаем зум при клике на кластер
      clusterBalloonContentLayout: 'cluster#balloonCarousel', // Карусель в балуне
      clusterBalloonPanelMaxMapArea: 0, // Отключить сворачивание панели при увеличении карты
      clusterBalloonContentLayoutWidth: mediaQuery.matches ? 'auto' : 'auto', // Ширина карусели
      clusterBalloonContentLayoutHeight: mediaQuery.matches ? 'auto' : 'auto', // Высота карусели
      clusterBalloonPagerSize: 5, // Количество элементов в панели навигации карусели
      margin: 20,
    });
    // Обработчик клика на кластер
    clusterer.events.add('click', function (e) {
      var target = e.get('target');

      // Проверяем, кликнули ли на кластер
      if (target.getGeoObjects) {
        // Получаем метки внутри кластера
        var geoObjects = target.getGeoObjects();
        
        // Проверяем, что метки есть в кластере
        if (geoObjects.length > 0) {
            var firstPlacemark = geoObjects[0]; // Берём первую метку
            var firstPlacemarkId = firstPlacemark.properties.get('id'); // Получаем её id
            var allSameCoordinates = geoObjects.every(function (geoObject) {
              return geoObject.geometry.getCoordinates().toString() === geoObjects[0].geometry.getCoordinates().toString();
            });
            // Теперь можно использовать id первой метки
            console.log("ID первой метки:", firstPlacemarkId);
            if (!mediaQuery.matches && firstPlacemarkId && allSameCoordinates) {
              window.slideTo(firstPlacemarkId);
            }
            // if (mediaQuery.matches) {
            // }
            // Отключаем временно событие boundschange
            if (!mediaQuery.matches) { // в десктопе всегда
              myMap.events.remove('boundschange', onBoundsChange);
              setTimeout(function() {
                  myMap.events.add('boundschange', onBoundsChange);
              }, 1500);
            } else if (!allSameCoordinates && mediaQuery.matches) { // в мобиле если все координаты не равны 
              myMap.events.remove('boundschange', onBoundsChange);
              setTimeout(function() {
                  myMap.events.add('boundschange', onBoundsChange);
              }, 1500);
            } else if (allSameCoordinates) {
              window.catalogMapSliderView(true)
            }
        }
      }
    });

    myMap.geoObjects.add(clusterer);

    // Отображаем начальные объекты
    onBoundsChange()
    myMap.events.add('boundschange', onBoundsChange);
  }

  // Функция для обновления карты с кластеризацией
  function updateMap(newObjects) {
    console.log('update');
    
    // Создаём объект для хранения placemark по их id
    const placemarksById = {};

    // Заполняем placemarksById текущими объектами на карте
    clusterer.getGeoObjects().forEach(placemark => {
        const id = placemark.properties.get('id');
        placemarksById[id] = placemark;
    });

    // Массив id новых объектов для сравнения
    const newIds = newObjects.map(obj => obj.id);

    // Обновляем видимость старых меток
    oldObjects.forEach((object) => {
        const placemark = placemarksById[object.id];

        if (newIds.includes(object.id)) {
            placemark.options.set('visible', true); // Если объект есть в новом массиве, показать метку
        } else {
            placemark.options.set('visible', false); // Если объекта нет в новом массиве, скрыть метку
        }
    });

    // Обрабатываем новые объекты и добавляем их в кластер, если их еще нет
    newObjects.forEach((object) => {
        if (!placemarksById[object.id]) {
            const placemark = new ymaps.Placemark(object.coordinates, {
                id: object.id, // Присваиваем id как свойство метки
                hintContent: object.name,
                balloonContentBody: `
                <div class="map-popup ${object.tags.length ? '' : 'map-popup--tags'}">
                  <div class="map-popup__inner">
                    <div class="map-popup__top">
                      <div class="map-popup__icon">
                        <img src="${object.icon}" alt="">
                      </div>
                      <div>
                        <a href="${object.ownerHref}" class="map-popup__title">${object.name}</a>
                        <div class="map-popup__price">${object.price}</div>
                      </div>
                    </div>
                    ${object.tags.length ? '<div class="map-popup__bot"><div class="map-popup__tags">' : ''}
                        ${object.tags.length ? object.tags.map(i => "<span>" + i + "</span>").reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  '',
                ) : ''}
                    ${object.tags.length ? '</div></div>' : ''}
                  </div>
                </div>
              `,
            }, {
                iconLayout: 'default#image',
                iconImageHref:  'img/marker-map.svg',
                iconImageSize: [30, 42],
                iconImageOffset: [-15, -42]
            });

            // Добавляем метку в кластер
            clusterer.add(placemark);
            placemarksById[object.id] = placemark;
            placemark.events.add('click', () => {
              // Отключаем временно событие boundschange
              myMap.events.remove('boundschange', onBoundsChange);
              setTimeout(function() {
                myMap.events.add('boundschange', onBoundsChange);
                window.slideTo(object.id);
              }, 1500);
            });
        } else {
            // Если метка уже существует, просто показываем её
            placemarksById[object.id].options.set('visible', true);
        }
    });

    // Обновляем массив старых объектов
    oldObjects = [...newObjects]; // Клонируем новый массив, чтобы избежать мутаций
  }


  window.showWarehousesOnMap = updateMap

  // Функция проверки наличия объекта в массиве по id
  function isObjectInArray(obj, array) {
    return array.some(item => item.id === obj.id);
  }

  // Функция добавления объекта на карту
  function addObjectToMap(obj) {
    const placemark = new ymaps.Placemark(obj.coordinates, {
      balloonContentBody: !mediaQuery.matches ? `
      <div class="map-popup">
        <div class="map-popup__inner">
          <div class="map-popup__top">
            <div class="map-popup__icon">
              <img src="${obj.icon}" alt="">
            </div>
            <div>
              <a href="${obj.ownerHref}" class="map-popup__title">${obj.name}</a>
              <div class="map-popup__price">${obj.price}</div>
            </div>
          </div>
          <div class="map-popup__bot">
            <div class="map-popup__tags">
              ${obj.tags.length ? obj.tags.map(i => "<span>" + i + "</span>").reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        '',
      ) : ''}
            </div>
          </div>
        </div>
      </div>
    ` : '',
    }, {
      // Опции для кастомной иконки
      iconLayout: 'default#image',
      iconImageHref: 'img/marker-map.svg', // Путь к вашей иконке
      iconImageSize: [30, 42],                // Размер иконки
      iconImageOffset: [-15, -42]             // Смещение иконки
    });
    geoObjects.set(obj.id, placemark); // Сохраняем метку в Map по её id
    clusterer.add(placemark); // Добавляем метку в кластеризатор
    myMap.geoObjects.add(clusterer); // Добавляем кластеризатор на карту (если еще не добавлен)
    placemark.events.add('click', () => {
      // Отключаем временно событие boundschange
      myMap.events.remove('boundschange', onBoundsChange);

      setTimeout(function() {
        myMap.events.add('boundschange', onBoundsChange);
        window.slideTo(obj.id);
      }, 1500);
    });
  }

  // Функция удаления объекта с карты
  function removeObjectFromMap(obj) {
    const placemark = geoObjects.get(obj.id);
    if (placemark) {
      clusterer.remove(placemark); // Удаляем метку из кластеризатора
      geoObjects.delete(obj.id); // Удаляем метку из Map
    }
  }

  function startMapCatalogLoader() {
    $('.app__loader').removeClass('hide')
  }

  window.startMapCatalogLoader = startMapCatalogLoader;

  function finishMapCatalogLoader(timer) {
    if (timer) {
      setTimeout(function() {
        $('.app__loader').addClass('hide')
      }, timer)
    } else {
      $('.app__loader').addClass('hide')
    }
  }
  window.finishMapCatalogLoader = finishMapCatalogLoader;

  window.removeAllObjectFromMap = function () {
    oldObjects = [];
    geoObjects?.clear();
    clusterer?.removeAll();
  }

  window.removeAllWarehousesOnMap = window.removeAllObjectFromMap;

  // Инициализация карты
  try {
    ymaps.ready(init);
  } catch (error) {
    console.log(error);
  }

});