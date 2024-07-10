(()=>{"use strict";var e,t={91:(e,t,a)=>{var o=a(570),n=a.n(o);function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,n=function(e,t){if("object"!==r(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var o=a.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===r(n)?n:String(n)),o)}var n}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.header=document.querySelector(".header"),this.scrollUp=document.querySelector(".scroll-up"),this.preloader=document.querySelector(".preloader"),this.init()}var t,a;return t=e,(a=[{key:"init",value:function(){this.toggleHandler()}},{key:"open",value:function(){this.burger.classList.add("active"),this.nav.classList.add("active"),document.body.classList.add("lock")}},{key:"close",value:function(){this.burger.classList.remove("active"),this.nav.classList.remove("active"),document.body.classList.remove("lock")}},{key:"scrollHandler",value:function(){var e=this,t=0;window.addEventListener("scroll",(function(){t<pageYOffset&&pageYOffset>200&&e.scrollUp&&e.scrollUp.classList.add("down"),pageYOffset<e.header.clientHeight-60*e.header.clientHeight/100&&e.scrollUp&&e.scrollUp.classList.remove("down"),t=pageYOffset}))}},{key:"preloaderHandler",value:function(){}},{key:"openSearch",value:function(){n()(".nav").addClass("hide"),n()(".header-search").addClass("open"),n()(this).addClass("hide"),n()(".drop-search").addClass("open"),n()("body").addClass("lock")}},{key:"closeSearch",value:function(){n()(".nav").removeClass("hide"),n()(".header-search").removeClass("open"),n()(".trig-open-search").removeClass("hide"),n()(".drop-search").removeClass("open"),n()("body").removeClass("lock")}},{key:"toggleHandler",value:function(){var e=this;n()(document).click((function(t){n()(t.target).closest(".header-search").length||n()(t.target).closest(".trig-open-search").length||n()(t.target).closest("[data-modal]").length||n()(t.target).closest("[data-class]").length||n()(t.target).closest(".drop-search__inner").length||e.closeSearch()})),n()(".trig-open-search").click(this.openSearch),n()(".trig-close-search").click(this.closeSearch)}}])&&i(t.prototype,a),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=n()(t).children(".str"),r=o.text();function i(){for(var t=a;t<n()(e).length;t++)n()(e).eq(t).toggleClass("hide")}i();var l=!1;n()(t).click((function(){n()(t).toggleClass("open"),l?o.text(r):o.text("Свернуть"),l=!l,i()}))}function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function d(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,n=function(e,t){if("object"!==c(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var o=a.call(e,"string");if("object"!==c(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===c(n)?n:String(n)),o)}var n}var u=function(){function e(t){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.scrollLock=a,this.modal=document.querySelector('[data-modal="'.concat(t,'"]')),this.callbackClose=null,this.init()}var t,a;return t=e,(a=[{key:"init",value:function(){this.modal&&(this.content=this.modal.querySelector(".modal__content"),this.openHendler(),this.closeHendler())}},{key:"open",value:function(){window.lastZIndexModal=window.lastZIndexModal?window.lastZIndexModal+1:150,this.modal&&(this.modal.style["z-index"]=window.lastZIndexModal),this.modal&&this.modal.classList.remove("hide"),this.modal&&this.modal.classList.add("active"),this.scrollLock&&document.body.classList.add("lock")}},{key:"close",value:function(){this.modal&&this.modal.classList.remove("active"),this.modal&&this.modal.classList.add("hide"),this.scrollLock&&document.body.classList.remove("lock"),this.onCloseAction()}},{key:"openHendler",value:function(){var e=this,t=this.name;n()(document).on("click",'[data-class="'.concat(t,'"]'),(function(t){e.open();var a=e.modal.querySelector('[name="ELEMENT_ID"]');a&&(a.value=t.target.dataset.elementId||"")}))}},{key:"closeHendler",value:function(){var e=this;this.modal&&this.modal.addEventListener("click",(function(t){t.target.classList.contains("close-x")&&e.close()})),this.modal&&this.modal.querySelector("button.close-x").addEventListener("click",(function(t){e.close()}))}},{key:"onClose",value:function(e){this.callbackClose=e}},{key:"onCloseAction",value:function(){this.callbackClose&&this.callbackClose()}}])&&d(t.prototype,a),Object.defineProperty(t,"prototype",{writable:!1}),e}(),v=a(298),f=a.n(v);function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function m(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,n=function(e,t){if("object"!==p(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var o=a.call(e,"string");if("object"!==p(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===p(n)?n:String(n)),o)}var n}var h=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initRange(),this.modal(),this.category(),this.resetListener()}var t,a;return t=e,(a=[{key:"initRange",value:function(){window.ionRangeSlider=f();var e=[];document.querySelectorAll(".filter-range").forEach((function(t){var a=t.querySelector(".js-range-slider"),o=t.querySelector(".filter-range__input--from"),r=t.querySelector(".filter-range__input--to"),i=t.querySelector(".filter-range__val--from"),l=t.querySelector(".filter-range__val--to"),s=t.querySelector(".filter-range__val--from span"),c=t.querySelector(".filter-range__val--to span");n()(a).ionRangeSlider({onChange:function(e){o.value=e.from,r.value=e.to,s.textContent=e.from,c.textContent=e.to},onUpdate:function(e){o.value=e.from,r.value=e.to,s.textContent=e.from,c.textContent=e.to}});var d=n()(a).data("ionRangeSlider");e.push({instance:d,resetInputs:function(){o.value=d.options.min,r.value=d.options.max}});var u="visually-hidden";i.addEventListener("click",(function(){i.classList.add(u),o.classList.remove(u),o.focus()})),l.addEventListener("click",(function(){l.classList.add(u),r.classList.remove(u),r.focus()})),o.addEventListener("focus",(function(){i.classList.add(u),o.classList.remove(u)})),r.addEventListener("focus",(function(){l.classList.add(u),r.classList.remove(u)})),o.addEventListener("blur",(function(e){i.classList.remove(u),o.classList.add(u);var t=+e.target.value>=d.options.min;t||(o.value=d.options.min,s.textContent=d.options.min),d.update({from:t?+e.target.value:d.options.min,to:r.value})})),r.addEventListener("blur",(function(e){l.classList.remove(u),r.classList.add(u);var t=+e.target.value<=d.options.max;t||(r.value=d.options.max,c.textContent=d.options.max),d.update({from:o.value,to:t?+e.target.value:d.options.max})}))})),window.rangeInstanceArray=e}},{key:"modal",value:function(){n()(".js-open-filter").on("click",(function(){n()(".catalog-sidebar__modal").addClass("open"),n()("body").addClass("lock2")})),n()(".js-close-filter").on("click",(function(){n()(".catalog-sidebar__modal").removeClass("open"),n()("body").removeClass("lock2")})),n()(".js-open-map").on("click",(function(){n()(".map-point").addClass("open")})),n()(".js-close-map").on("click",(function(){n()(".map-point").removeClass("open")})),n()(document).click((function(e){n()(e.target).closest(".js-open-map").length||n()(e.target).closest(".map-point").length||n()(".map-point").removeClass("open")}))}},{key:"category",value:function(){n()(".catalog-wrapper").each((function(e){var t=this;n()(t).find(".filter-list__item").each((function(e){var a=this;n()(this).find(".filter-list__title").on("click",(function(){n()(a).hasClass("open")?(n()(t).find(".filter-list__item").removeClass("hide"),n()(a).removeClass("open")):(n()(t).find(".filter-list__item").toggleClass("hide"),n()(a).toggleClass("hide"),n()(a).toggleClass("open"))}))}))}))}},{key:"resetListener",value:function(){var e=this;n()(".catalog-sidebar, .catalog-head__top").on("submit",(function(e){e.preventDefault()})),n()(".js-reset-filter").on("click",(function(){e.resetFilter()}))}},{key:"resetFilter",value:function(){n()(".catalog-sidebar").trigger("reset"),n()(".catalog-head__top").trigger("reset"),window.rangeInstanceArray.forEach((function(e){e.instance.reset(),e.resetInputs()}))}}])&&m(t.prototype,a),Object.defineProperty(t,"prototype",{writable:!1}),e}();addEventListener("DOMContentLoaded",(function(){var e,t,a,o,r,i,c;s(".card-ad-top__list ul li",".card-ad-top__list .card-ad-top__table-more .open-more2",6),s(".card-ad-top__table--harakteristitki tr",".card-ad-top__table--harakteristitki .card-ad-top__table-more .open-more",4),s(".card-ad-description__content ul li",".card-ad-description__more .open-more2",1),s(".catalog-update__top2 .switch-train li",".catalog-update__top2 .btn4",6),e=".article .article__nav .article-nav__list",t=".article .article__nav .open-more2",a=n()(t).children(".str"),o=a.text(),r=n()(e).hasClass("hide"),n()(t).click((function(){n()(t).toggleClass("open"),r?a.text("Свернуть"):a.text(o),r=!r,n()(e).toggleClass("hide")})),function(){if(!n()("#map").length)return!1;ymaps.ready((function(){var e=new ymaps.Map("map",{center:[55.699467,37.625594],zoom:12}),t=new ymaps.control.SearchControl({options:{provider:"yandex#map"}});e.controls.add(t),t.search("Дворцовая площадь, 2"),document.querySelector(".card-ad-map__input input").addEventListener("change",(function(e){console.log(e),t.search("Дворцовая площадь, 2"),t.getResult(0).then((function(e){console.log("Результат "+e)}),(function(e){console.log("Ошибка")}))})),n()(".card-ad-map__input button").click((function(){n()(".card-ad-map__map").toggleClass("open")}))}))}(),n()(".base-tab__item--scroll").on("click",(function(e){e.preventDefault(),n()(".base-tab__item").removeClass("active"),n()(this).addClass("active");var t=n()(this).attr("href").substring(1),a=n()("#"+t);a.length&&a[0].scrollIntoView({behavior:"smooth"})})),n()(".base-tab__item--tab").on("click",(function(e){e.preventDefault(),n()(".base-tab__item").removeClass("active"),n()(this).addClass("active"),n()(".base-tab__block--tab").removeClass("active");var t=n()(this).attr("href").substring(1);n()("#"+t).addClass("active")})),i=".card-ad-relative",n()(document).on("click",i+" .switch-button__item",(function(e){e.preventDefault(),n()(i+" .switch-button__item").removeClass("active"),n()(this).addClass("active"),n()(i+" .card-ad-relative__table").addClass("hide");var t=n()(this).attr("data-index");n()(i+" .card-ad-relative__table[data-index="+t+"]").removeClass("hide")})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".card-rating-modal__mobile";n()(e+" .card-rating-modal__thead button").on("click",(function(t){t.preventDefault(),n()(e+" .card-rating-modal__thead button").removeClass("active"),n()(this).addClass("active"),n()(e+" .card-rating-modal__list").addClass("hide");var a=n()(this).attr("data-index");n()(e+" .card-rating-modal__list[data-index="+a+"]").removeClass("hide")}))}(),n()(".article-nav__item a").on("click",(function(e){e.preventDefault(),n()(".article-nav__item a").removeClass("active"),n()(this).addClass("active");var t=n()(this).attr("href").substring(1),a=n()("#"+t);a.length&&a[0].scrollIntoView({behavior:"smooth"})})),new Swiper(".main-news__slider",{loop:!1,slidesPerView:"auto",pagination:{type:"progressbar",el:".main-news__pag .slider-pag",bulletClass:"progressbar",bulletActiveClass:"active",clickable:!0}}),new Swiper(".first-screen__slider",{loop:!0,pagination:{el:".slider-pag",bulletClass:"bullet",bulletActiveClass:"active",clickable:!0},navigation:{nextEl:".slider-next",prevEl:".slider-prev"}}),new Swiper(".partners-slider__slider",{loop:!0,slidesPerView:3,loopAdditionalSlides:8,freeMode:!0,grid:{rows:2},breakpoints:{840:{slidesPerView:"auto",grid:{rows:1}}}}),!0===(null==(c=new Swiper(".main-avtg__slider",{loop:!1,slidesPerView:"auto",loopAdditionalSlides:2,pagination:{el:".slider-pag",bulletClass:"bullet",bulletActiveClass:"active",clickable:!0}}))?void 0:c.mounted)&&c.slideNext(),n()(document).on("click",".main-tab__tab",(function(e){e.preventDefault(),n()(".main-tab__tab").removeClass("active"),n()(this).addClass("active"),n()(".main-tab__block").removeClass("active");var t=n()(this).attr("href").substring(1);n()("#"+t).addClass("active")})),n()(document).on("click",".drop-search__tab",(function(e){e.preventDefault(),n()(".drop-search__tab").removeClass("active"),n()(this).addClass("active"),n()(".drop-search__block").removeClass("active");var t=n()(this).attr("href").substring(1);n()("#"+t).addClass("active")})),window.app={header:new l,textSellerModal:new u("text-seller"),tabReqModal:new u("tab-req"),ratingModal:new u("rating"),sortCatalogModal:new u("sort-catalog"),sortCompamyModal:new u("sort-compamy"),newsSubsModal:new u("news-subs"),sidebar:new h}})),document.addEventListener("DOMContentLoaded",(function(){var e=window.location.pathname;document.querySelectorAll(".lk-nav__link").forEach((function(t){t.href.includes(e)&&t.classList.add("lk-nav__link--active")}))}))}},a={};function o(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e].call(r.exports,r,r.exports,o),r.exports}o.m=t,o.amdO={},e=[],o.O=(t,a,n,r)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,n,r]=e[d],l=!0,s=0;s<a.length;s++)(!1&r||i>=r)&&Object.keys(o.O).every((e=>o.O[e](a[s])))?a.splice(s--,1):(l=!1,r<i&&(i=r));if(l){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,n,r]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,[i,l,s]=a,c=0;if(i.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(s)var d=s(o)}for(t&&t(a);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},a=self.webpackChunkgulp_scss_starter=self.webpackChunkgulp_scss_starter||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=o.O(void 0,[736],(()=>o(91)));n=o.O(n)})();