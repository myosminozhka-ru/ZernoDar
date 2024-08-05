<script setup>
import { ref } from 'vue'
import TheFilter from './TheFilter.vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="app-map">
    <div class="app-map__inner">
      <div class="app-map__map">
        <div class="app-map__filter">
          <TheFilter></TheFilter>
        </div>
        <div id="map-search">
          <img src="/images/map.jpg" class="app-map__img" alt="">
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
