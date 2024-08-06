<script setup>
import { ref, onMounted } from 'vue'
import TheFilter from './TheFilter.vue'

import { useWarehousesStore } from '@/stores/warehouses'
const warehouses = useWarehousesStore()

onMounted(() => map())

function map() {

  // Функция для отображения меток на карте
  function showWarehousesOnMap(map, warehouses) {
      warehouses.forEach(function(warehouse) {
          var placemark = new ymaps.Placemark(warehouse.coordinates, {
              hintContent: warehouse.name,
              balloonContent: warehouse.type
          });
          map.geoObjects.add(placemark);
      });
  }

  // Пример использования
  var map;

  ymaps.ready(function() {
      map = new ymaps.Map("map-search", {
          center: [55.76, 37.64],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl']
      });

      // Показать все склады по умолчанию
      showWarehousesOnMap(map, warehouses.listWarehouses);

      // Пример фильтрации по типу склада
      // document.getElementById('filterByType').addEventListener('change', function() {
      //     var selectedType = this.value;
      //     map.geoObjects.each(function(geoObject) {
      //         geoObject.options.set('visible', true);
      //         if (selectedType !== 'all' && geoObject.properties.get('balloonContent') !== selectedType) {
      //             geoObject.options.set('visible', false);
      //         }
      //     });
      // });
  });

}

</script>

<template>
  <div class="app-map">
    <div class="app-map__inner">
      <div class="app-map__map">
        <div class="app-map__filter">
          <TheFilter></TheFilter>
        </div>
        <div id="map-search">
          <!-- <img src="/images/map.jpg" class="app-map__img" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-map {
  &__inner {
  }
  #map-search {
    height: calc(100vh - 15rem);
    border-radius: 2rem;
    overflow: hidden;
    &>ymaps {
      width: 100% !important;
      height: 100% !important;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @include tab {
    #map-search {
      height: 100vh;
      border-radius: 0;
    }
  }
}
</style>
