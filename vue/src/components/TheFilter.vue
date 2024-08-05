<script setup>
import { inject, ref, onMounted, watch, reactive } from 'vue'

const imgPath = inject('imgPath')

const state = reactive({
  DOMContentLoaded: 0,
  isMounted: 0,
})

const isModalFilterOpen = ref(false);

const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      isModalFilterOpen.value = false
    }
};


addEventListener("DOMContentLoaded", (event) => {
  state.DOMContentLoaded = true;
});

onMounted(() => {
  state.isMounted = true;
})

watch(state, async (newValue, oldValue) => {
  if (newValue.DOMContentLoaded && newValue.isMounted) {
    window.octo.mapRange = window.octo.Sidebar.initRange('mapRange', '.app-filter');
  }
})
</script>

<template>
  <div class="app-filter">
    <div class="app-filter__head">
      <button class="app-filter__icon" @click="isModalFilterOpen = true">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.26172 16.0316H14.9284H3.26172ZM14.9284 16.0316C14.9284 16.3612 15.0261 16.6834 15.2093 16.9575C15.3924 17.2316 15.6527 17.4452 15.9572 17.5714C16.2618 17.6975 16.5969 17.7305 16.9202 17.6662C17.2435 17.6019 17.5405 17.4432 17.7736 17.2101C18.0067 16.977 18.1654 16.68 18.2297 16.3567C18.294 16.0334 18.261 15.6983 18.1349 15.3938C18.0087 15.0892 17.7951 14.8289 17.521 14.6458C17.2469 14.4627 16.9247 14.3649 16.5951 14.3649C16.153 14.3649 15.7291 14.5405 15.4165 14.8531C15.104 15.1656 14.9284 15.5895 14.9284 16.0316ZM6.59505 10.1982H18.2617H6.59505ZM3.26172 10.1982C3.26172 10.5279 3.35947 10.8501 3.5426 11.1242C3.72574 11.3983 3.98604 11.6119 4.29058 11.738C4.59512 11.8642 4.93023 11.8972 5.25354 11.8329C5.57684 11.7686 5.87381 11.6098 6.1069 11.3768C6.33998 11.1437 6.49872 10.8467 6.56303 10.5234C6.62734 10.2001 6.59433 9.86498 6.46818 9.56044C6.34204 9.25589 6.12842 8.99559 5.85434 8.81246C5.58025 8.62932 5.25802 8.53157 4.92839 8.53157C4.48636 8.53157 4.06243 8.70717 3.74987 9.01973C3.43731 9.33229 3.26172 9.75621 3.26172 10.1982ZM12.4284 4.36491L18.2617 4.36491L12.4284 4.36491ZM9.09505 4.36491H3.26172H9.09505ZM9.09505 4.36491C9.09505 4.69454 9.1928 5.01678 9.37594 5.29086C9.55907 5.56494 9.81937 5.77856 10.1239 5.90471C10.4285 6.03085 10.7636 6.06386 11.0869 5.99955C11.4102 5.93524 11.7071 5.77651 11.9402 5.54342C12.1733 5.31033 12.3321 5.01336 12.3964 4.69006C12.4607 4.36676 12.4277 4.03165 12.3015 3.7271C12.1754 3.42256 11.9618 3.16226 11.6877 2.97913C11.4136 2.79599 11.0914 2.69824 10.7617 2.69824C10.3197 2.69824 9.89577 2.87384 9.58321 3.1864C9.27065 3.49896 9.09505 3.92288 9.09505 4.36491Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Фильтры
      </button>
      <div class="app-filter__fast-filters">
        <div class="app-filter__fast-filter">
          <div class="switch-button">
            <button class="switch-button__item active">Предложение</button>
            <button class="switch-button__item">Спрос</button>
          </div>
        </div>
        <div class="app-filter__fast-filter">
          <div class="select select--full select--grey">
            <select name="" id="" class="">
              <option value="">Зерновые культуры</option>
              <option value="">Зерновые культуры 1</option>
            </select>
            <svg>
              <use :xlink:href="imgPath + 'img/sprites/sprite.svg#arrow-down'"></use>
            </svg>
          </div>
        </div>
        <div class="app-filter__fast-filter">
          <div class="select select--full select--grey">
            <select name="" id="" class="">
              <option value="">Тип товара</option>
              <option value="">Тип товара 1</option>
            </select>
            <svg>
              <use :xlink:href="imgPath + 'img/sprites/sprite.svg#arrow-down'"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isModalFilterOpen" class="app-filter__modal" @click="handleOverlayClick">
      <div class="app-filter__inner">
        <div class="app-filter__top">
          Фильтры
          <button class="app-filter__close" @click="isModalFilterOpen = false">
            <svg>
              <use :xlink:href="imgPath + 'img/sprites/sprite.svg#x'"></use>
            </svg>
          </button>
        </div>
        <div class="app-filter__mid">
          <div class="app-filter__mob-mid">
            <div class="app-filter__switch">
              <div class="switch-button">
                <button class="switch-button__item active">Предложение</button>
                <button class="switch-button__item">Спрос</button>
              </div>
            </div>
            <div class="app-filter__train">
              <div class="switch-train">
                <ul>
                <li><a href="#" class="active">Зерновые культуры</a></li>
                <li><a href="#">Масличные культуры</a></li>
                <li><a href="#">Посевной материал</a></li>
                </ul>
              </div>
            </div>
            <div class="app-filter__category">
              <div class="select select--full">
                <select name="" id="" class="">
                  <option value="">Все категории</option>
                  <option value="">Пшеница</option>
                  <option value="">Бобы</option>
                  <option value="">Горох</option>
                </select>
                <svg>
                  <use :xlink:href="imgPath + 'img/sprites/sprite.svg#arrow-down'"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="filter">
            <div class="filter__inner">
              <div class="filter__list">
                <div class="filter__item">
                  <div class="filter__title">Тип продукции</div>
                  <ul class="checkbox-list">
                    <li>
                      <label>
                        <input type="checkbox">
                        Продовольственный
                        <i></i>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox">
                        Кормовой
                        <i></i>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="filter__item">
                  <div class="filter__title">Количество</div>
                  <div class="filter-range">
                    <input type="text" class="js-range-slider" name="my_range" value=""
                      data-type="double"
                      data-min="10"
                      data-max="500"
                      data-from="10"
                      data-to="300"
                      data-hide-min-max="true"
                      data-hide-from-to="true"
                      data-input-values-separator="_"
                    />
                    <div class="filter-range__inputs">
                      <div class="filter-range__input-wrap">
                        <span class="filter-range__label">Минимум</span>
                        <input type="number" 
                        value="10"
                        class="filter-range__input filter-range__input--from visually-hidden">
                        <span class="filter-range__val filter-range__val--from"><span>10</span> т</span>
                      </div>
                      <span class="filter-range__sep"></span>
                      <div class="filter-range__input-wrap">
                        <span class="filter-range__label">Максимум</span>
                        <input type="number" 
                        value="300"
                        class="filter-range__input filter-range__input--to visually-hidden">
                        <span class="filter-range__val filter-range__val--to"><span>300</span> т</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="filter__item">
                  <div class="filter__title">Цена </div>
                  <div class="filter-range">
                    <input type="text" class="js-range-slider" name="my_range" value=""
                      data-type="double"
                      data-min="10"
                      data-max="500"
                      data-from="10"
                      data-to="300"
                      data-hide-min-max="true"
                      data-hide-from-to="true"
                      data-input-values-separator="_"
                    />
                    <div class="filter-range__inputs">
                      <div class="filter-range__input-wrap">
                        <span class="filter-range__label">Минимум</span>
                        <input type="number" 
                        value="10"
                        class="filter-range__input filter-range__input--from visually-hidden">
                        <span class="filter-range__val filter-range__val--from"><span>10</span> ₽</span>
                      </div>
                      <span class="filter-range__sep"></span>
                      <div class="filter-range__input-wrap">
                        <span class="filter-range__label">Максимум</span>
                        <input type="number" 
                        value="300"
                        class="filter-range__input filter-range__input--to visually-hidden">
                        <span class="filter-range__val filter-range__val--to"><span>300</span> ₽</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="filter">
            <div class="filter__inner">
              <div class="filter__list">
                <div class="filter__item">
                  <div class="filter__title">Документы на продукцию</div>
                  <ul class="checkbox-list">
                    <li>
                      <label>
                        <input type="checkbox">
                        ДС
                        <i></i>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox">
                        Анализная карта
                        <i></i>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox">
                        Нет документов
                        <i></i>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="filter__item">
                  <div class="filter__title">Класс</div>
                  <div class="select select--full">
                    <select name="" id="" class="">
                      <option value="">Все классы</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                    <svg>
                      <use :xlink:href="imgPath + 'img/sprites/sprite.svg#arrow-down'"></use>
                    </svg>
                  </div>
                </div>
                <div class="filter__item">
                  <div class="filter__title">Контрагент</div>
                  <ul class="checkbox-list">
                    <li>
                      <label>
                        <input type="checkbox">
                        Компания
                        <i></i>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox">
                        Частое лицо
                        <i></i>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox">
                        Все
                        <i></i>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="filter__item">
                  <div class="filter__title">Гост
                    <label class="switch-slide">
                      <input type="checkbox">
                      <i></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="app-filter__bot">
          <button class="btn3 app-filter__apply">Применить</button>
          <!-- .app-filter__ -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-filter {
  &__head  {
    position: absolute;
    top: 1.8rem;
    left: 1.8rem;
    z-index: 10;
    padding: 1.1rem;
    border-radius: 1.2rem;
    background-color: $white;
    backdrop-filter: blur(12px);
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  &__icon {
    color: $black;
    border: 1px solid $lightgrey;
    padding: 1rem;
    border-radius: 0.75rem;
    font-size: 0;
    svg {
      color: $black;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
  &__fast-filters {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  &__fast-filter {
    min-width: 21.2rem;
  }

  &__modal {
    position: fixed;
    z-index: 120;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    fill: var(--blur-black, rgba(0, 0, 0, 0.20));
    backdrop-filter: blur(8px);
  }

  &__inner {
    margin: auto;
    width: 71rem;
    background-color: $white;
    border-radius: 2rem;
    padding: 3.2rem;
    @include block-shadow2;
  }

  &__top {
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
  }
  &__close {
    width: 2.4rem;
    height: 2.4rem;
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__mid {
    display: flex;
    justify-content: space-between;
    .filter {
      width: calc(50% - 4rem);
    }
  }

  &__mob-mid {
    display: none;
  }

  &__bot {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6rem;
  }

  &__apply {
    min-width: 24rem;
  }

  @include tab {
    &__head  {
      width: 100%;
      top: 0;
      left: 0;
      padding: 1.6rem;
      border-radius: 0px 0px 2rem 2rem;
      background-color: unset;
      backdrop-filter: blur(20px);
    }
    &__icon {
      border: none;
      padding: 1rem;
      border-radius: 0.8rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      gap: 0.4rem;
      background-color: $white;
      svg {
        width: 2rem;
        height: 2rem;
        color: $green;
      }
    }
    &__fast-filters {
      display: none;
    }

    &__modal {
      display: block;
      padding-top: 2rem;
    }

    &__inner {
      margin: 0;
      width: 100%;
      border-radius: 2rem 2rem 0 0;
      padding: 2.4rem;
      @include mob {
        padding: 1.6rem;
      }
    }

    &__top {
      margin-bottom: 2.5rem;
      flex-direction: row-reverse;
      font-size: 1.4rem;
      &::before {
        content: "";
        width: 2rem;
        height: 2rem;
        display: block;
      }
    }
    &__close {
      width: 2rem;
      height: 2rem;
    }

    &__mid {
      display: block;
      .filter {
        width: 100%;
        border-bottom: 1px solid #e6e6e6;        
        margin-bottom: 2.4rem;
        padding-bottom: 2.4rem;
        &:last-child {
          border-bottom: none;        
          margin-bottom: 0;
          padding-bottom: 0;
        }
      }
    }


    &__mob-mid {
      display: block;
    }

    &__switch {
      border-top: 1px solid #e6e6e6; 
      padding-top: 2.4rem;
      margin-bottom: 2.4rem;
    }

    &__train {
      margin-bottom: 2.4rem;
    }

    &__category {
      border-bottom: 1px solid #e6e6e6; 
      padding-bottom: 2.4rem;
      margin-bottom: 2.4rem;
    }

    &__bot {
      z-index: 40;
      position: sticky;
      bottom: 0;
      left: 0;
      width: 100%;
      margin-top: 2rem;
    }

    &__apply {
      min-width: 100%;
    }
  }
}
</style>
