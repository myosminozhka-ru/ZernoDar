<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const imgPath = inject('imgPath')

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="app-item">
    <div class="app-item__inner">
      <div class="app-item__top">
        <div class="app-item__ava">
          <img :src="imgPath + 'img/pshenica.png'" alt="">
        </div>
        <div class="app-item__names">
          <div class="app-item__name">Пшеница 2 класса в Новгородской области</div>
          <div class="app-item__prices">
            <div class="app-item__price">12 000 ₽/тн </div>
            <div class="app-item__torg">
              <span class="tag-torg2">
                  <svg>
                    <use :xlink:href="imgPath + 'img/sprites/sprite.svg#check-mark-circle'"></use>
                  </svg>
                  Торг
              </span>
            </div>
          </div>
        </div>
        <div class="app-item__torg2">
          <div class="app-item__tag tag-user">
            <svg>
              <use :xlink:href="imgPath + 'img/sprites/sprite.svg#true-user'"></use>
            </svg>
            Продавец
          </div>
          <span class="app-item__tag tag-torg tag-torg--bez">
            <svg>
              <use :xlink:href="imgPath + 'img/sprites/sprite.svg#radix-icons_cross-circled'"></use>
            </svg>
            Без торга
          </span>
        </div>
      </div>
      <div class="app-item__mid">
        <div class="app-item__data">
          <ul>
            <li>
              <dl>
                <dt>Класс</dt>
                <dd>12 класс</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>Количество</dt>
                <dd>до 500 т</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>Документы
                  <div class="helptip">
                    <div class="helptip__icon" style="color: #0F582D;">
                      <svg>
                        <use :xlink:href="imgPath + 'img/sprites/sprite.svg#caution-sign-circle'"></use>
                      </svg>
                    </div>
                    <div class="helptip__content"></div>
                  </div>
                </dt>
                <dd>ДС и Анализная карта</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="user-head">
          <div class="user-head__ava">
            <img :src="imgPath + 'img/user-ava.png'" alt="">
          </div>
          <div class="user-head__name">АО "Сельскозозяйственная Маревская Корпорация"</div>
        </div>
        <div class="tag-user">
          <svg>
            <use :xlink:href="imgPath + 'img/sprites/sprite.svg#true-user'"></use>
          </svg>
          Проверенный пользователь
        </div>
        <div class="user-contact">
          <div class="user-contact__item">
            <a href="#" class="user-contact__link">
              <svg>
                <use :xlink:href="imgPath + 'img/sprites/sprite.svg#contact-phone'"></use>
              </svg>
              + 7 000 000 00 00
            </a>
            <div class="user-contact__links">
              <a href="#" class="user-contact__link">
                <img :src="imgPath + 'img/sprites/logos_whatsapp-icon.svg'" alt="">
              </a>
              <a href="#" class="user-contact__link">
                <img :src="imgPath + 'img/sprites/logos_telegram.svg'" alt="">
              </a>
              <a href="#" class="user-contact__link">
                <svg>
                  <use :xlink:href="imgPath + 'img/sprites/sprite.svg#basil_viber-solid'"></use>
                </svg>
              </a>
            </div>
          </div>
          <div class="user-contact__item">
            <span class="user-contact__link">
              <svg>
                <use :xlink:href="imgPath + 'img/sprites/sprite.svg#home'"></use>
              </svg>
              Новгородская область
            </span>
          </div>
        </div>
      </div>
      <div class="app-item__bot">
        <button class="btn9">
          Открыть объявление
        </button>
        <button class="to-favourite to-favourite--sm">
          <svg>
            <use :xlink:href="imgPath + 'img/sprites/sprite.svg#favourite-w'"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-item {
  border: 0.1rem solid $lightgrey;
  border-radius: 1.5rem;
  @include block-shadow2;
  background-color: $white;
  &__top {
    display: flex;
    align-items: center;
    padding: 2.4rem 1.3rem 0;
    margin-bottom: 1.2rem;
  }
  &__ava {
    display: inline-block;
    width: 6.4rem;
    height: 6.4rem;
    flex-shrink: 0;
    margin-right: .8rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__name {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: .8rem;
  }
  &__prices {
    display: flex;
    align-items: center;
  }
  &__price {
    font-size: 2rem;
    font-weight: 500;
    margin-right: 1.6rem;
  }
  &__torg2 {
    display: none;
  }
  &__mid {
    padding: 0 1.3rem 2.4rem;
    .user-head,
    .tag-user {
      margin-bottom: 1.2rem;
    }
  }
  &__data {
    margin-bottom: 1.2rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;
    }
    dl, dt, dd {
      margin: 0;
    }
    dl {
      display: flex;
      align-items: center;
    }
    li {
      padding: 1.6rem 1.6rem;
      border-radius: 1.6rem;
      background-color: $bckgrnd2;
    }

  }
  &__bot {
    border-top: 0.1rem solid $lightgrey;
    padding: 1.8rem 1.3rem 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }
  @include tab {
    border: none;
    border-radius: 1.2rem;
    &__top {
      display: block;
      padding: 1.6rem 1.5rem 0;
      margin-bottom: 1.6rem;
    }
    &__ava {
      display: none;
    }
    &__names {
      margin-bottom: 1.6rem;
    }
    &__name {
      font-size: 1.4rem;
      margin-bottom: 0;
    }
    &__prices {
      margin-right: 1.6rem;
    }
    &__price {
      font-size: 1.8rem;
      margin-right: 0;
    }
    &__torg {
      display: none;
    }
    &__torg2 {
      display: flex;
      gap: 1.6rem;
    }
    &__tag {
      flex: 1;
    }
    &__mid {
      padding: 0 1.6rem 0.8rem;
      .user-head,
      .tag-user,
      .user-contact {
        display: none;
      }
    }
    &__data {
      margin-bottom: 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0;
        margin-bottom: 0;
      }
      li {
        width: 100%;
        padding: 0.8rem 0;
        background-color: transparent;
        border-radius: 0;
      }
      dl, dt, dd {
        margin: 0;
      }
      dl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        font-size: 1.7rem;
        gap: 0.8rem;
      }
      dt, dd {
        display: inline-flex;
        align-items: center;
        svg {
          width: 2rem;
          height: 2rem;
          object-fit: contain;
          margin-left: 0.4rem;
        }
      }
      dd {
        text-align: right;
      }
  
    }
    &__bot {
      border-top: none;
      padding: 0.8rem 0.8rem 1.6rem;
      flex-direction: row-reverse;
      .btn9 {
        flex-grow: 1;
      }
    }
  }
}
</style>
