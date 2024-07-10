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
    const toggleButton = item.querySelector(".security__toggle");
    const cancelButton = item.querySelector(".security__button-cancel");
    const body = item.querySelector(".security__body");

    toggleButton.addEventListener("click", function () {
      checkbox.checked = true;
      body.style.display = "block";
      toggleButton.style.display = "none";
    });

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        checkbox.checked = false;
        body.style.display = "none";
        toggleButton.style.display = "block";
      });
    }
  });
});
