import "./import/modules";

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".lk-nav__link");

  navLinks.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("lk-nav__link--active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const securityItems = document.querySelectorAll(".security__item");

  securityItems.forEach((item) => {
    const checkbox = item.querySelector(".security__input");
    const body = item.querySelector(".security__body");

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        body.style.display = "block";
      } else {
        body.style.display = "none";
      }
    });
  });
});
