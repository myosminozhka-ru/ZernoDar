<script setup>
import { inject } from 'vue'

const imgPath = inject('imgPath')
</script>

<template>
  <div class="app-search">
    <div class="app-search__inner">
      <div class="app-search__label">
        <div class="app-search__icon">
          <svg>
            <use :xlink:href="imgPath + '/img/sprites/sprite.svg#map-point'"></use>
          </svg>
        </div>
        <input type="text" class="app-search__input" placeholder="Поиск">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-search {
  &__label {
    width: 100%;
    padding: 0.8rem;
    border-radius: 1.6rem;
    border: 0.1rem solid $lightgrey;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  &__icon {
    width: 2.4rem;
    height: 2.4rem;
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__input {
    font-weight: 500;
    flex-grow: 1;
  }
}
</style>
