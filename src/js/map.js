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

  window.catalogMapSliderView = function (action) {
    if (action) {
      $('.app__sidbar').addClass('open');
      $('.app__sidbar-open').addClass('close');
    } else {
      $('.app__sidbar').removeClass('open');
      $('.app__sidbar-open').removeClass('close');
    }
  }

  window.removeAllWarehousesOnMap = function () {
    myMap.geoObjects.removeAll();
  }

  // пример данных у точек на карте
  const warehouses = [
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
      icon: 'img/first-screen2.jpg',
      tags: ["tag 1", "tag 1"],
      ownerHref: '/href',
    },
    {
      id: '3',
      coordinates: [55.742848, 37.605283],
      name: "name 3",
      price: "price 1",
      icon: 'img/first-screen3.jpg',
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
    }
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
  // Хранение старого и нового массива объектов
  let oldObjects = [];
  let geoObjects = new Map();
  let myMap;
  let clusterer;

  function init() {

    if (!document.querySelector("#map-search")) {
      return;
    }

    // Инициализация карты
    myMap = new ymaps.Map("map-search", {
      center: [55.76, 37.64],
      zoom: 10,
      controls: ['zoomControl', 'fullscreenControl']
    });

    window.catalogMap = myMap;

    // Создание кластеризатора
    clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedVioletClusterIcons', // Внешний вид кластеров
      groupByCoordinates: false, // Не группировать точки с одинаковыми координатами
      clusterDisableClickZoom: false, // Включаем зум при клике на кластер
      clusterBalloonContentLayout: 'cluster#balloonCarousel', // Карусель в балуне
      clusterBalloonPanelMaxMapArea: 0, // Отключить сворачивание панели при увеличении карты
      // clusterBalloonContentLayoutWidth: 200, // Ширина карусели
      // clusterBalloonContentLayoutHeight: 130, // Высота карусели
      clusterBalloonPagerSize: 5 // Количество элементов в панели навигации карусели
    });

    // Добавляем обработчик клика по кластеру
    clusterer.events.add('click', function (e) {
      const target = e.get('target'); // Получаем кластер, по которому кликнули

      // Проверяем, что это действительно кластер, а не отдельная метка
      if (target instanceof ymaps.ClusterPlacemark) {
        const clusterBounds = target.getBounds(); // Получаем границы кластера
        const mapZoom = myMap.getZoom(); // Текущий зум карты
        const geoObjects = target.getGeoObjects(); // Получаем метки внутри кластера

        // Проверяем, находятся ли все метки в одной и той же координате
        const areAllObjectsInSameCoordinates = geoObjects.every(geoObject =>
          geoObject.geometry.getCoordinates().toString() === geoObjects[0].geometry.getCoordinates().toString()
        );

        // Если все метки находятся на одной и той же координате, показываем карусель
        if (areAllObjectsInSameCoordinates) {
          // debugger
          // setTimeout(() => {
          //   debugger
          //   target?.balloon?.open(); // Открываем балун с каруселью
          // }, 500);
        } else {
          // Иначе зумируем на границы кластера
          // myMap.setBounds(clusterBounds, {
          //   checkZoomRange: true, // Убедиться, что зум не выйдет за пределы minZoom и maxZoom
          //   zoomMargin: 40 // Установка отступов при зумировании (для комфорта)
          // }).then(function () {
          //   const newZoom = myMap.getZoom();

          //   // Если зум не изменился, увеличиваем его на 1 для дальнейшей разгруппировки
          //   if (newZoom === mapZoom) {
          //     myMap.setZoom(newZoom + 1);
          //   }
          // });
        }
      }
    });

    // Пример начального массива объектов
    oldObjects = [
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
        icon: 'img/first-screen2.jpg',
        tags: ["tag 1", "tag 1"],
        ownerHref: '/href',
      },
      {
        id: '3',
        coordinates: [55.742848, 37.605283],
        name: "name 3",
        price: "price 1",
        icon: 'img/first-screen3.jpg',
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
      }
    ];

    // Отображаем начальные объекты
    updateMap(oldObjects);


    myMap.events.add('boundschange', debounce(function (e) {
      console.log("getBounds", myMap.getBounds());
      //updateMap(oldObjects);
    }, 2000));
  }

  // Функция для обновления карты с кластеризацией
  function updateMap(newObjects) {
    // Удаляем объекты, которых нет в новом массиве
    for (let i = 0; i < oldObjects.length; i++) {
      if (!isObjectInArray(oldObjects[i], newObjects)) {
        removeObjectFromMap(oldObjects[i]);
      }
    }

    // Добавляем новые объекты, которых не было в старом массиве
    for (let i = 0; i < newObjects.length; i++) {
      if (!isObjectInArray(newObjects[i], oldObjects)) {
        addObjectToMap(newObjects[i]);
      }
    }

    // Обновляем старый массив
    oldObjects = [...newObjects];
  }

  window.showWarehousesOnMap = updateMap

  // Функция проверки наличия объекта в массиве по id
  function isObjectInArray(obj, array) {
    return array.some(item => item.id === obj.id);
  }

  // Функция добавления объекта на карту
  function addObjectToMap(obj) {
    const placemark = new ymaps.Placemark(obj.coordinates, {
      balloonContentHeader: `<strong>${obj.name}</strong>`,
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
    ` : ``,
    }, {
      // Опции для кастомной иконки
      iconLayout: 'default#image',
      iconImageHref: '/img/marker-map.svg', // Путь к вашей иконке
      iconImageSize: [30, 42],                // Размер иконки
      iconImageOffset: [-15, -42]             // Смещение иконки
    });
    geoObjects.set(obj.id, placemark); // Сохраняем метку в Map по её id
    clusterer.add(placemark); // Добавляем метку в кластеризатор
    myMap.geoObjects.add(clusterer); // Добавляем кластеризатор на карту (если еще не добавлен)
    placemark.events.add('click', () => window.slideTo(obj.id));
  }

  // Функция удаления объекта с карты
  function removeObjectFromMap(obj) {
    const placemark = geoObjects.get(obj.id);
    if (placemark) {
      clusterer.remove(placemark); // Удаляем метку из кластеризатора
      geoObjects.delete(obj.id); // Удаляем метку из Map
    }
  }

  try {
    ymaps.ready(init);
  } catch (error) {
    console.log(error);
  }

});