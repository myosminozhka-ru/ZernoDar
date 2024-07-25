export default function () {
  const securityItems = document.querySelectorAll(".security__item");

  securityItems.forEach((item) => {
    const toggleButton = item.querySelector(".security__toggle");
    const cancelButton = item.querySelector(".security__button-cancel");
    const body = item.querySelector(".security__body");
    const infoSpan = item.querySelector(".security__info");
    const labelMobile = item.querySelector(".security__label.label-mobile");
    const isPassword = item.classList.contains('security__item--password')


    function isMobile() {
      return window.innerWidth < 700;
    }

    toggleButton.addEventListener("click", function () {
      body.style.display = "block";
      toggleButton.style.display = "none";

      if (isPassword) {
        infoSpan.style.display = "none";
      }

      if (
        isPassword &&
        !isMobile()
      ) {
        labelMobile.style.display = "none";
      }
    });

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        body.style.display = "none";
        toggleButton.style.display = "block";

        if (infoSpan && infoSpan.textContent.includes("Обновлен месяц назад")) {
          infoSpan.style.display = "block";
        }

        if (
          isPassword &&
          !isMobile()
        ) {
          labelMobile.style.display = "block";
        }
      });
    }
  });
}
