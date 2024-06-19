import $ from "jquery";

export default function init() {

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
}