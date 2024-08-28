addEventListener("DOMContentLoaded", () => {
  $('[data-select="name_44"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    }
  });
  $('[data-select="name_77"]').selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-border",
      "ui-selectmenu-menu": "ui-selectmenu-menu-border"
    }
  });

  window.mapCatalog = {
    modalMapFilter: new Modal("modalMapFilter")
  };
  window.octo.mapRange = window.octo.Sidebar.initRange('mapRange', '.app-filter');


  const swiper = new Swiper('.app-list__swiper', {
    loop: false,
    slidesPerView: 'auto',
    direction: "horizontal",
    freeMode: true,
    mousewheel: {
      enabled: true,
      sensitivity: 0.5,
    },
    breakpoints: {
      100: {
        loop: false,
        slidesPerView: 'auto',
        direction: "horizontal",
        freeMode: true,
        mousewheel: {
          enabled: true,
          sensitivity: 0.5,
        },
      },
      1024: {
        loop: false,
        slidesPerView: 'auto',
        direction: "vertical",
        freeMode: true,
        mousewheel: {
          enabled: true,
          sensitivity: 0.5,
        },
      }
    }
  });
});