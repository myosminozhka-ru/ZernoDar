<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="map">
    <div class="map__inner"></div>
    hello map
  </div>
</template>

<style lang="scss">
.map {
  &__inner {
    width: 100%;
    color: $black;
  }
}
</style>
