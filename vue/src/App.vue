<script setup>
import ListItem from './components/ListItem.vue';
import TheMap from './components/TheMap.vue';
import TheSearch from './components/TheSearch.vue';
import { provide } from 'vue'


let baseURL = null
let imgPath = ''

switch (location.hostname) {
  case "127.0.0.1":
  case "localhost":
  case "dev1-zeecar.fvds.ru":
    baseURL = "https://dev2-zeecar.fvds.ru"
    break;
  default:
    baseURL = location.origin
    imgPath = '/local/templates/zeecar'
}

provide(/* key */ 'imgPath', /* value */ imgPath)
</script>

<template>
  <div class="app">
    <div class="app__inner">
      <div class="app__map">
        <TheMap/>
      </div>
      <div class="app__sidbar">
        <div class="app__search">
          <TheSearch/>
        </div>
        <div class="app__list">
          <ListItem/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .app {
    padding: 3.2rem;
    &__inner {
      display: flex;
      gap: 3.5rem;
    }
    &__map {
      flex-grow: 1;
    }
    &__sidbar {
      flex-shrink: 0;
      width: 59.5rem;
    }
    &__search {
      margin-bottom: 2.5rem;
    }
    @include tab {
      padding: 0;
      &__inner {
        display: block;
      }
      &__map {
        height: 100vh;
        width: 100%;
      }
      &__sidbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 70;
      }
      &__search {
        display: none;
      }
    }
  }
</style>
