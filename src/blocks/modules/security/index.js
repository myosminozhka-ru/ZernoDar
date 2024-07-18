export default function () {
  const securityItems = document.querySelectorAll(".security__item");

  securityItems.forEach((item) => {
    const checkbox = item.querySelector(".security__input");
    const toggleButton = item.querySelector(".security__toggle");
    const cancelButton = item.querySelector(".security__button-cancel");
    const body = item.querySelector(".security__body");
    const infoSpan = item.querySelector(".security__info");
    const labelMobile = item.querySelector(".security__label.label-mobile");

    function isMobile() {
      return window.innerWidth < 700;
    }

    toggleButton.addEventListener("click", function () {
      checkbox.checked = true;
      body.style.display = "block";
      toggleButton.style.display = "none";

      if (infoSpan && infoSpan.textContent.includes("Обновлен месяц назад")) {
        infoSpan.style.display = "none";
      }

      if (
        labelMobile &&
        labelMobile.textContent.trim() === "Пароль" &&
        !isMobile()
      ) {
        labelMobile.style.display = "none";
      }
    });

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        checkbox.checked = false;
        body.style.display = "none";
        toggleButton.style.display = "block";

        if (infoSpan && infoSpan.textContent.includes("Обновлен месяц назад")) {
          infoSpan.style.display = "block";
        }

        if (
          labelMobile &&
          labelMobile.textContent.trim() === "Пароль" &&
          !isMobile()
        ) {
          labelMobile.style.display = "block";
        }
      });
    }
  });
}
