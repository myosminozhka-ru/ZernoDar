
<script setup>
import TheItem from './TheItem.vue'
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="app-list">
    <div class="app-list__inner">
      <div class="app-list__mtitle">Все объявления</div>
      <div class="app-list__list">
        <div class="app-list__item">
          <TheItem></TheItem>
        </div>
        <div class="app-list__item">
          <TheItem></TheItem>
        </div>
        <div class="app-list__item">
          <TheItem></TheItem>
        </div>
      </div>
      <div class="app-list__slider">
        <swiper
          :slides-per-view="'auto'"
          :space-between="0"
          :loop="false"
          class="app-list__swiper"
        >
          <swiper-slide
            class="swiper-slide app-list__item"
          >
            <TheItem></TheItem>
          </swiper-slide>
          <swiper-slide
            class="swiper-slide app-list__item"
          >
            <TheItem></TheItem>
          </swiper-slide>
          <swiper-slide
            class="swiper-slide app-list__item"
          >
            <TheItem></TheItem>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-list {
  &__mtitle {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2.4rem;
  }
  &__item {
    margin-bottom: 2.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__slider {
    display: none;
  }
  @include tab {
    overflow: hidden;
    &__mtitle {
      display: none;
    }
    &__list {
      display: none;
    }
    &__slider {
      display: block;
      padding: 0 1.6rem;
    }
    &__item {
      width: 100%;
      margin-right: 0.8rem;
      &:last-child {
        margin-right: 0;
      }
    }
    &__swiper {
      overflow: visible !important;
    }
  }
}
</style>
