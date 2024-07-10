export default function() {
  const swiper = new Swiper('.main-avtg__slider', {
    loop: false,
    slidesPerView: 'auto',
    loopAdditionalSlides: 2,
    pagination: {
      el: '.slider-pag',
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      clickable: true,
    },
  });
  if (swiper?.mounted === true) {
    swiper.slideNext()
  }
}