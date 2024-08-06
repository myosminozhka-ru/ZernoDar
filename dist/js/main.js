(()=>{"use strict";var e,t={965:(e,t,n)=>{var a=n(570),i=n.n(a);function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==o(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==o(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===o(i)?i:String(i)),a)}var i}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isSearchOpen=!1,this.isDropOpen=!1,this.isNavOpen=!1,this.header=document.querySelector(".header"),this.scrollUp=document.querySelector(".scroll-up"),this.preloader=document.querySelector(".preloader"),this.init()}var t,n;return t=e,n=[{key:"init",value:function(){this.searchHandler(),this.navDropHandler(),this.menuHandler()}},{key:"menuHandler",value:function(){var e=this;i()(".header__burger").click((function(){i()(".header__burger").hasClass("active")?e.close():e.open()}))}},{key:"open",value:function(){this.isNavOpen=!0,i()(".header__burger").addClass("active"),i()(".nav").addClass("open"),i()("body").addClass("lock")}},{key:"close",value:function(){this.isNavOpen=!1,i()(".header__burger").removeClass("active"),i()(".nav").removeClass("open"),i()("body").removeClass("lock")}},{key:"scrollHandler",value:function(){var e=this,t=0;window.addEventListener("scroll",(function(){t<pageYOffset&&pageYOffset>200&&e.scrollUp&&e.scrollUp.classList.add("down"),pageYOffset<e.header.clientHeight-60*e.header.clientHeight/100&&e.scrollUp&&e.scrollUp.classList.remove("down"),t=pageYOffset}))}},{key:"preloaderHandler",value:function(){}},{key:"openSearch",value:function(){this.isSearchOpen=!0,i()(".nav").addClass("hide"),i()(".header-search").addClass("open"),i()(this).addClass("hide"),i()(".drop-search").addClass("open"),i()("body").addClass("lock")}},{key:"closeSearch",value:function(){this.isSearchOpen&&(i()(".nav").removeClass("hide"),i()(".header-search").removeClass("open"),i()(".trig-open-search").removeClass("hide"),i()(".drop-search").removeClass("open"),i()("body").removeClass("lock"),this.isSearchOpen=!1)}},{key:"searchHandler",value:function(){var e=this;i()(".trig-open-search").click(this.openSearch.bind(this)),i()(".trig-close-search").click(this.closeSearch.bind(this)),i()(document).click((function(t){i()(t.target).closest(".header-search").length||i()(t.target).closest(".trig-open-search").length||i()(t.target).closest("[data-modal]").length||i()(t.target).closest("[data-class]").length||i()(t.target).closest(".drop-search__inner").length||e.closeSearch()}))}},{key:"navDropHandler",value:function(){var e=this;i()(".nav__item--supply").click((function(t){t.preventDefault(),i()(".nav__item").removeClass("active"),i()(".nav__item--supply").addClass("active"),e.openNavDrop(".nav-drop--supply")})),i()(".nav__item--demand").click((function(t){t.preventDefault(),i()(".nav__item").removeClass("active"),i()(".nav__item--demand").addClass("active"),e.openNavDrop(".nav-drop--demand")})),i()(document).click((function(t){!e.isDropOpen||i()(t.target).closest(".nav-drop__inner").length||i()(t.target).closest(".nav__item--drop").length||e.closeNavDrop()})),i()(".nav-drop").each((function(e,t){i()(t).find(".nav-drop__arrow").each((function(e,n){i()(n).on("click",(function(){i()(t).find(".nav-drop__title").removeClass("active"),i()(t).find(".nav-drop__block").removeClass("open"),i()(t).find(".nav-drop__title:eq(".concat(e,")")).addClass("active"),i()(t).find(".nav-drop__block:eq(".concat(e,")")).addClass("open")}))})),i()(t).find(".nav-drop__title").each((function(e,n){i()(n).on("mouseover",(function(){i()(t).find(".nav-drop__title").removeClass("active"),i()(t).find(".nav-drop__block").removeClass("open"),i()(t).find(".nav-drop__title:eq(".concat(e,")")).addClass("active"),i()(t).find(".nav-drop__block:eq(".concat(e,")")).addClass("open")}))}))}))}},{key:"openNavDrop",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".nav-drop";this.isDropOpen=!0,i()(".nav-drop").removeClass("open"),i()(e).addClass("open")}},{key:"closeNavDrop",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".nav-drop";this.isDropOpen=!1,i()(e).removeClass("open"),i()(".nav__item").removeClass("active")}}],n&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=!0,o=i()(t).children(".str"),r=o.text();function s(){for(var t=n;t<i()(e).length;t++)i()(e).eq(t).toggleClass("hide")}s();var l=!1;i()(t).click((function(){a&&(r=i()(this).children(".str").text()),a=!a,i()(t).toggleClass("open"),l?o.text(r):o.text("Свернуть"),l=!l,s()}))}function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==c(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==c(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===c(i)?i:String(i)),a)}var i}var u=function(){function e(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.scrollLock=n,this.modal=document.querySelector('[data-modal="'.concat(t,'"]')),this.callbackClose=null,this.init()}var t,n;return t=e,(n=[{key:"init",value:function(){this.modal&&(this.content=this.modal.querySelector(".modal__content"),this.openHendler(),this.closeHendler())}},{key:"open",value:function(){window.lastZIndexModal=window.lastZIndexModal?window.lastZIndexModal+1:150,this.modal&&(this.modal.style["z-index"]=window.lastZIndexModal),this.modal&&this.modal.classList.remove("hide"),this.modal&&this.modal.classList.add("active"),this.scrollLock&&document.body.classList.add("lock")}},{key:"close",value:function(){this.modal&&this.modal.classList.remove("active"),this.modal&&this.modal.classList.add("hide"),this.scrollLock&&document.body.classList.remove("lock"),this.onCloseAction()}},{key:"openHendler",value:function(){var e=this,t=this.name;i()(document).on("click",'[data-class="'.concat(t,'"]'),(function(t){e.open();var n=e.modal.querySelector('[name="ELEMENT_ID"]');n&&(n.value=t.target.dataset.elementId||"")}))}},{key:"closeHendler",value:function(){var e=this;this.modal&&this.modal.addEventListener("click",(function(t){t.target.classList.contains("close-x")&&e.close()})),this.modal&&this.modal.querySelector("button.close-x").addEventListener("click",(function(t){e.close()}))}},{key:"onClose",value:function(e){this.callbackClose=e}},{key:"onCloseAction",value:function(){this.callbackClose&&this.callbackClose()}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function p(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==v(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==v(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===v(i)?i:String(i)),a)}var i}var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nodes=document.querySelectorAll("[data-copy-trigger]"),this.textarea=document.querySelector("#urlCopy"),this.init()}var t,n;return t=e,n=[{key:"init",value:function(){this.textarea&&this.copyHandler()}},{key:"copy",value:function(e){if(e){var t=document.querySelector("[data-copy-text=".concat(e,"]"));this.textarea.innerHTML=t.textContent}else this.textarea.innerHTML=window.location.href;this.textarea.select(),document.execCommand("copy")}},{key:"copyHandler",value:function(){var e=this;this.nodes.forEach((function(t){t.addEventListener("click",(function(){var n=t.getAttribute("data-copy-trigger");e.copy(n),e.alert()}))}))}},{key:"alert",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){alert("Скопировано!")}))}],n&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),h=n(298),m=n.n(h);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function g(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==_(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==_(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===_(i)?i:String(i)),a)}var i}window.rangeInstance={};var y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.parentSelector=n,this.modal(),this.category(),this.resetListener()}var t,n,a;return t=e,a=[{key:"initRange",value:function(e,t){window.ionRangeSlider=m();var n=[];document.querySelectorAll(t+" .filter-range:not(.inited)").forEach((function(e){e.classList.add("inited");var t=e.querySelector(".js-range-slider"),a=e.querySelector(".filter-range__input--from"),o=e.querySelector(".filter-range__input--to"),r=e.querySelector(".filter-range__val--from"),s=e.querySelector(".filter-range__val--to"),l=e.querySelector(".filter-range__val--from span"),c=e.querySelector(".filter-range__val--to span");i()(t).ionRangeSlider({onChange:function(e){a.value=e.from,o.value=e.to,l.textContent=e.from,c.textContent=e.to},onUpdate:function(e){a.value=e.from,o.value=e.to,l.textContent=e.from,c.textContent=e.to}});var d=i()(t).data("ionRangeSlider");n.push({instance:d,resetInputs:function(){a.value=d.options.min,o.value=d.options.max}});var u="visually-hidden";r.addEventListener("click",(function(){r.classList.add(u),a.classList.remove(u),a.focus()})),s.addEventListener("click",(function(){s.classList.add(u),o.classList.remove(u),o.focus()})),a.addEventListener("focus",(function(){r.classList.add(u),a.classList.remove(u)})),o.addEventListener("focus",(function(){s.classList.add(u),o.classList.remove(u)})),a.addEventListener("blur",(function(e){r.classList.remove(u),a.classList.add(u);var t=+e.target.value>=d.options.min;t||(a.value=d.options.min,l.textContent=d.options.min),d.update({from:t?+e.target.value:d.options.min,to:o.value})})),o.addEventListener("blur",(function(e){s.classList.remove(u),o.classList.add(u);var t=+e.target.value<=d.options.max;t||(o.value=d.options.max,c.textContent=d.options.max),d.update({from:a.value,to:t?+e.target.value:d.options.max})}))})),window.rangeInstance[e]=n}}],(n=[{key:"modal",value:function(){i()(".js-open-filter").on("click",(function(){i()(".catalog-sidebar__modal").addClass("open"),i()("body").addClass("lock2")})),i()(".js-close-filter").on("click",(function(){i()(".catalog-sidebar__modal").removeClass("open"),i()("body").removeClass("lock2")})),i()(".js-open-map").on("click",(function(){i()(".map-point").addClass("open")})),i()(".js-close-map").on("click",(function(){i()(".map-point").removeClass("open")})),i()(document).click((function(e){i()(e.target).closest(".js-open-map").length||i()(e.target).closest(".map-point").length||i()(".map-point").removeClass("open")}))}},{key:"category",value:function(){i()(".catalog-wrapper").each((function(e){var t=this;i()(t).find(".filter-list__item").each((function(e){var n=this;i()(this).find(".filter-list__title").on("click",(function(){i()(n).hasClass("open")?(i()(t).find(".filter-list__item").removeClass("hide"),i()(n).removeClass("open")):(i()(t).find(".filter-list__item").toggleClass("hide"),i()(n).toggleClass("hide"),i()(n).toggleClass("open"))}))}))}))}},{key:"resetListener",value:function(){var e=this;i()(".catalog-sidebar, .catalog-head__top").on("submit",(function(e){e.preventDefault()})),i()(".js-reset-filter").on("click",(function(){e.resetFilter()}))}},{key:"resetFilter",value:function(){i()(this.parentSelector+" .catalog-sidebar").trigger("reset"),i()(this.parentSelector+" .catalog-head__top").trigger("reset"),this.resetRange()}},{key:"resetRange",value:function(e){window.rangeInstance[e||this.name].forEach((function(e){e.instance.reset(),e.resetInputs()}))}}])&&g(t.prototype,n),a&&g(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}();n(839),addEventListener("DOMContentLoaded",(function(){var e,t,n,a,o,r,c,d,v,p,h;l(".card-ad-top__list ul li",".card-ad-top__list .card-ad-top__table-more .open-more2",6),l(".card-ad-top__table--harakteristitki tr",".card-ad-top__table--harakteristitki .card-ad-top__table-more .open-more",4),l(".card-ad-description__content ul li",".card-ad-description__more .open-more2",1),l(".catalog-update__top2 .switch-train li",".catalog-update__top2 .btn4",6),l(".edit-about__text-part",".edit-about__more .open-more2",1),l(".contact-requisites__list .contact-requisites__item",".js-contact-requisites-open",7),l(".agreement__content>p",".agreement__more .open-more2",4),e=".article .article__nav .article-nav__list",t=".article .article__nav .open-more2",n=i()(t).children(".str"),a=n.text(),o=i()(e).hasClass("hide"),i()(t).click((function(){i()(t).toggleClass("open"),o?n.text("Свернуть"):n.text(a),o=!o,i()(e).toggleClass("hide")})),function(){if(!i()("#map").length)return!1;ymaps.ready((function(){var e=new ymaps.Map("map",{center:[55.699467,37.625594],zoom:12}),t=new ymaps.control.SearchControl({options:{provider:"yandex#map"}});e.controls.add(t),t.search("Дворцовая площадь, 2"),document.querySelector(".card-ad-map__input input").addEventListener("change",(function(e){console.log(e),t.search("Дворцовая площадь, 2"),t.getResult(0).then((function(e){console.log("Результат "+e)}),(function(e){console.log("Ошибка")}))})),i()(".card-ad-map__input button").click((function(){i()(".card-ad-map__map").toggleClass("open")}))}))}(),i()(".base-tab__item--scroll").on("click",(function(e){e.preventDefault(),i()(".base-tab__item").removeClass("active"),i()(this).addClass("active");var t=i()(this).attr("href").substring(1),n=i()("#"+t);n.length&&n[0].scrollIntoView({behavior:"smooth"})})),i()(".base-tab__item--tab").on("click",(function(e){e.preventDefault(),i()(".base-tab__item").removeClass("active"),i()(this).addClass("active"),i()(".base-tab__block--tab").removeClass("active");var t=i()(this).attr("href").substring(1);i()("#"+t).addClass("active")})),i()(document).on("click"," .review-list__to-answer .review-to-answer",(function(e){var t=e.target,n=i()(this).find(".review-to-answer__open .btn3")[0],a=i()(this).find(".review-to-answer__btns .btn3--transparent")[0],o=i()(this).find(".review-to-answer__content")[0];t===n&&(o.classList.remove("hide"),i()(this).find(".review-to-answer__open").addClass("hide")),t===a&&(o.reset(),o.classList.add("hide"),i()(this).find(".review-to-answer__open").removeClass("hide"))})),i()(document).on("click"," .review-list__answers",(function(e){var t=e.target,n=i()(this).find(".review-list__edit"),a=i()(this).find(".review-to-answer__btns .btn3--transparent")[0],o=i()(this).find(".review-list__content")[0],r=i()(t).closest(n);r&&r.length&&(o.classList.add("hide"),i()(this).find(".review-list__edit-answer").removeClass("hide")),t===a&&(o.classList.remove("hide"),i()(this).find(".review-list__edit-answer").addClass("hide"))})),r=".card-ad-relative",i()(document).on("click",r+" .switch-button__item",(function(e){e.preventDefault(),i()(r+" .switch-button__item").removeClass("active"),i()(this).addClass("active"),i()(r+" .card-ad-relative__table").addClass("hide");var t=i()(this).attr("data-index");i()(r+" .card-ad-relative__table[data-index="+t+"]").removeClass("hide")})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".card-rating-modal__mobile";i()(e+" .card-rating-modal__thead button").on("click",(function(t){t.preventDefault(),i()(e+" .card-rating-modal__thead button").removeClass("active"),i()(this).addClass("active"),i()(e+" .card-rating-modal__list").addClass("hide");var n=i()(this).attr("data-index");i()(e+" .card-rating-modal__list[data-index="+n+"]").removeClass("hide")}))}(),i()(".article-nav__item a").on("click",(function(e){e.preventDefault(),i()(".article-nav__item a").removeClass("active"),i()(this).addClass("active");var t=i()(this).attr("href").substring(1),n=i()("#"+t);n.length&&n[0].scrollIntoView({behavior:"smooth"})})),new Swiper(".main-news__slider",{loop:!1,slidesPerView:"auto",pagination:{type:"progressbar",el:".main-news__pag .slider-pag",bulletClass:"progressbar",bulletActiveClass:"active",clickable:!0}}),new Swiper(".first-screen__slider",{loop:!0,pagination:{el:".slider-pag",bulletClass:"bullet",bulletActiveClass:"active",clickable:!0},navigation:{nextEl:".slider-next",prevEl:".slider-prev"}}),new Swiper(".partners-slider__slider",{loop:!0,slidesPerView:3,loopAdditionalSlides:8,freeMode:!0,grid:{rows:2},breakpoints:{840:{slidesPerView:"auto",grid:{rows:1}}}}),!0===(null==(c=new Swiper(".main-avtg__slider",{loop:!1,slidesPerView:"auto",loopAdditionalSlides:2,pagination:{el:".slider-pag",bulletClass:"bullet",bulletActiveClass:"active",clickable:!0}}))?void 0:c.mounted)&&c.slideNext(),document.querySelectorAll(".security__item").forEach((function(e){var t=e.querySelector(".security__toggle"),n=e.querySelector(".security__button-cancel"),a=e.querySelector(".security__body"),i=e.querySelector(".security__info"),o=e.querySelector(".security__label.label-mobile"),r=e.classList.contains("security__item--password");function s(){return window.innerWidth<700}t.addEventListener("click",(function(){a.style.display="block",t.style.display="none",r&&(i.style.display="none"),r&&!s()&&(o.style.display="none")})),n&&n.addEventListener("click",(function(){a.style.display="none",t.style.display="block",i&&i.textContent.includes("Обновлен месяц назад")&&(i.style.display="block"),r&&!s()&&(o.style.display="block")}))})),d=document.getElementById("juridical"),v=document.getElementById("juridicalForm"),p=document.getElementById("physical"),h=document.getElementById("physicalForm"),d&&d.addEventListener("change",(function(){v&&h&&(v.classList.add("registration__block--active"),h.classList.remove("registration__block--active"))})),p&&p.addEventListener("change",(function(){h&&v&&(h.classList.add("registration__block--active"),v.classList.remove("registration__block--active"))})),function(e){var t=document.querySelectorAll(".phone-input"),n=[];t.forEach((function(e){n.push(IMask(e,{mask:"+{7 }000-000-00-00"}))}))}(),i()(".select--typeorg select").selectmenu({classes:{"ui-selectmenu-button":"ui-selectmenu-button-typeorg","ui-selectmenu-menu":"ui-selectmenu-menu-typeorg"}}),i()(".js-tab-wrapper .js-tab").on("click",(function(e){e.preventDefault(),i()(".js-tab").removeClass("active"),i()(this).addClass("active"),i()(".js-tab-block").removeClass("active");var t=i()(this).attr("href").substring(1);i()("#"+t).addClass("active")})),i()(document).on("click",".drop-search__tab",(function(e){e.preventDefault(),i()(".drop-search__tab").removeClass("active"),i()(this).addClass("active"),i()(".drop-search__block").removeClass("active");var t=i()(this).attr("href").substring(1);i()("#"+t).addClass("active")})),function(){function e(e){return'\n      <div class="dropfile__item active" id="'.concat(e,'">\n        <label class="dropfile__add">\n          <input type="file" name="" id="" accept=".png, .jpg, .jpeg, .pdf" hidden>\n          <svg>\n            <use xlink:href="img/sprites/sprite.svg#plus"></use>\n          </svg>\n        </label>\n        <div class="dropfile__img">\n          <img src="" alt="">\n        </div>\n        <div class="dropfile__delete">\n          <svg>\n            <use xlink:href="img/sprites/sprite.svg#trash"></use>\n          </svg>\n        </div>\n        <div class="dropfile__info">\n          <div class="dropfile__icon">\n            <svg>\n              <use xlink:href="img/sprites/sprite.svg#picture"></use>\n            </svg>\n          </div>\n          <div class="dropfile__name-wrap">\n            <div class="dropfile__name"></div>\n            <div class="dropfile__size"></div>\n          </div>\n        </div>\n      </div>\n    ')}i()(document).on("click"," .edit-contact__item",(function(e){var t=e.target,n=i()(this).find(".edit-contact__change"),a=i()(this).find(".edit-contact__change.js-edit-contact-cancel"),o=i()(this).find(".edit-contact__body"),r=i()(t).closest(".js-edit-contact-change");r&&r.length&&(o.removeClass("hide"),n.addClass("hide"),a.removeClass("hide"));var s=i()(t).closest(".js-edit-contact-cancel");s&&s.length&&(o.addClass("hide"),n.removeClass("hide"),a.addClass("hide"))})),i()(".js-edit-about-open").on("click",(function(e){var t=i()(".edit-about__text"),n=i()(".edit-about__body"),a=i()(".js-edit-about-open"),o=i()(".js-edit-about-cancel"),r=i()(".edit-about__more");t.toggleClass("hide"),n.toggleClass("hide"),a.toggleClass("hide"),o.toggleClass("hide"),r.toggleClass("hide")})),i()(".edit-about__cancel, .js-edit-about-cancel").on("click",(function(e){var t=i()(".edit-about__text"),n=i()(".edit-about__body"),a=i()(".js-edit-about-open"),o=i()(".js-edit-about-cancel"),r=i()(".edit-about__more");t.toggleClass("hide"),n.toggleClass("hide"),a.toggleClass("hide"),o.toggleClass("hide"),r.toggleClass("hide")})),i()(".js-edit-requisites-open").on("click",(function(e){var t=i()(".edit-requisites"),n=i()(".js-edit-requisites-open"),a=i()(".js-edit-requisites-cancel");t.toggleClass("active"),n.toggleClass("hide"),a.toggleClass("hide")})),i()(".js-edit-requisites-cancel").on("click",(function(e){var t=i()(".edit-requisites"),n=i()(".js-edit-requisites-open"),a=i()(".js-edit-requisites-cancel");t.toggleClass("active"),n.toggleClass("hide"),a.toggleClass("hide")})),i()(document).on("change",".dropfile__item.active input",n),i()(document).on("click",".dropfile__item.show .dropfile__delete",(function(e){i()(this).closest(".dropfile__item").remove(),o()})),i()(".veri__link").on("click",a),i()(".veri__subtitle").on("click",(function(e){i()(".veri__inner--draganddrop").removeClass("hide"),i()(".veri__inner--verified").addClass("hide")}));var t=document.querySelector(".veri__inner--draganddrop");function n(t,n){var a=i()(".dropfile__list"),r=t?i()(this).closest(".dropfile__item"):i()(".dropfile__item.active"),s=t?i()(this):i()(".dropfile__item.active input"),l=r.find(".dropfile__img"),c=r.find(".dropfile__img img"),d=r.find(".dropfile__name"),u=r.find(".dropfile__size"),v=Date.now();if(""!==(n?"drop":t.target.value).trim()){var p=n||t.target.files[0];if(p){if(p.type.match("image.*")||"application/pdf"===p.type){r.addClass("show"),r.removeClass("active"),d.text(p.name);var f=(p.size/1024).toFixed(2);u.text(f+" KB"),s.attr("name",v),s.attr("id",v)}if(p.type.match("image.*")){var h=new FileReader;h.onload=function(e){var t=new Image;t.src=e.target.result,t.onload=function(){c.attr("src",e.target.result);var n,a=function(e){var t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.width,t.height=e.height,n.drawImage(e,0,0,e.width,e.height);for(var a=n.getImageData(0,0,e.width,e.height).data,i=0,o=0,r=0,s=0;s<a.length;s+=4)i+=a[s],o+=a[s+1],r+=a[s+2];return{r:i=Math.floor(i/(a.length/4)),g:o=Math.floor(o/(a.length/4)),b:r=Math.floor(r/(a.length/4))}}(t),i=.299*(n=a).r+.587*n.g+.114*n.b<128;d.css("color",i?"white":"black"),u.css("color",i?"white":"black")}},h.readAsDataURL(p),a.append(i()(e("id-"+Date.now())))}else"application/pdf"===p.type?(a.append(i()(e("id-"+v))),l.text("PDF"),r.addClass("pdf"),d.css("color","black"),u.css("color","black")):alert("Пожалуйста, выберите допустимое изображение или PDF-файл.")}o()}}function a(e){i()(".veri__text--greeting").addClass("hide"),i()(".veri__labels").removeClass("hide")}function o(){var e=i()(".js-send-profile-docs");i()(".dropfile__item").length>1?e.attr("disabled",!1):e.attr("disabled",!0)}t&&t.addEventListener("dragover",(function(e){e.preventDefault(),t.classList.add("highlight")})),t&&t.addEventListener("dragleave",(function(e){e.preventDefault(),t.classList.remove("highlight")})),t&&t.addEventListener("drop",(function(e){e.preventDefault(),t.classList.remove("highlight");for(var i=e.dataTransfer.files,o=0;o<i.length;o++)n(null,i[o]);a()})),/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?i()(document).on("click",".dropfile__item.show",(function(){i()(".dropfile__item.show").removeClass("hover"),i()(this).addClass("hover")})):(i()(document).on("mouseenter",".dropfile__item.show",(function(){i()(this).addClass("hover")})),i()(document).on("mouseleave",".dropfile__item.show",(function(){i()(".dropfile__item.show").removeClass("hover")}))),i()(document).click((function(e){i()(e.target).closest(".dropfile__item.show").length||i()(".dropfile__item.show").removeClass("hover")}))}(),function(){if(!i()("#contact-map").length)return!1;ymaps.ready((function(){new ymaps.Map("contact-map",{center:[55.699467,37.625594],zoom:12})}))}(),"true"==localStorage.getItem("cookies")&&i()(".cookies").addClass("hide"),i()(".cookies__btn").on("click",(function(){i()(".cookies").addClass("hide"),localStorage.setItem("cookies",!0)})),window.octo={header:new s,textSellerModal:new u("text-seller"),tabReqModal:new u("tab-req"),ratingModal:new u("rating"),sortCatalogModal:new u("sort-catalog"),sortCompamyModal:new u("sort-compamy"),newsSubsModal:new u("news-subs"),modalReviewComplaint:new u("review-complaint"),Sidebar:y,catalogSidebar:new y("catalogSidebar",".catalog-wrapper"),catalogSidebarRange:y.initRange("catalogSidebar",".catalog-wrapper"),copy:new f}}));var b=document.querySelectorAll(".code-input");b.length>0&&(b.forEach((function(e,t){e.addEventListener("input",(function(){1===e.value.length&&t!==b.length-1&&b[t+1].focus()})),e.addEventListener("keydown",(function(n){"Backspace"===n.key?0===e.value.length&&0!==t?(b[t-1].focus(),b[t-1].value=""):e.value="":1===n.key.length&&/\d/.test(n.key)&&(e.value="")}))})),b[b.length-1].addEventListener("input",(function(){1===b[b.length-1].value.length&&b[b.length-1].blur()})))}},n={};function a(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e].call(o.exports,o,o.exports,a),o.exports}a.m=t,a.amdO={},e=[],a.O=(t,n,i,o)=>{if(!n){var r=1/0;for(d=0;d<e.length;d++){for(var[n,i,o]=e[d],s=!0,l=0;l<n.length;l++)(!1&o||r>=o)&&Object.keys(a.O).every((e=>a.O[e](n[l])))?n.splice(l--,1):(s=!1,o<r&&(r=o));if(s){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,i,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var i,o,[r,s,l]=n,c=0;if(r.some((t=>0!==e[t]))){for(i in s)a.o(s,i)&&(a.m[i]=s[i]);if(l)var d=l(a)}for(t&&t(n);c<r.length;c++)o=r[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=self.webpackChunkgulp_scss_starter=self.webpackChunkgulp_scss_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i=a.O(void 0,[736],(()=>a(965)));i=a.O(i)})();