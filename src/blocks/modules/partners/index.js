export default function() {
  const swiper = new Swiper('.partners-slider__slider', {
    loop: true,
    slidesPerView: 3,
    loopAdditionalSlides: 8,
    freeMode: true,
    grid: {
      rows: 2,
    },
    breakpoints: {
      840: {
        slidesPerView: 'auto',
        grid: {
          rows: 1,
        },
      },
    },
  });
}