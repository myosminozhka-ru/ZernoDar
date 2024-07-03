export default function() {
  const swiper = new Swiper('.first-screen__slider', {
    loop: true,
    pagination: {
      el: '.slider-pag',
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
  });
}