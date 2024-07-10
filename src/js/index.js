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
