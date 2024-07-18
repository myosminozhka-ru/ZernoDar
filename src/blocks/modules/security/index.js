export default function () {
  const securityItems = document.querySelectorAll(".security__item");

  securityItems.forEach((item) => {
    const checkbox = item.querySelector(".security__input");
    const toggleButton = item.querySelector(".security__toggle");
    const cancelButton = item.querySelector(".security__button-cancel");
    const body = item.querySelector(".security__body");
    const infoSpan = item.querySelector(".security__info");
    const securityLabel = item.querySelector(".security__label");
    const securityHeader = item.querySelector(".security__header");

    toggleButton.addEventListener("click", function () {
      checkbox.checked = true;
      body.style.display = "block";
      toggleButton.style.display = "none";

      if (securityHeader.classList.contains("security__header--password")) {
        securityLabel.textContent = "Старый пароль";
        infoSpan.style.display = "none";
        securityHeader.classList.remove("security__header--password");
      }
    });

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        checkbox.checked = false;
        body.style.display = "none";
        toggleButton.style.display = "block";

        if (securityLabel.textContent === "Старый пароль") {
          securityLabel.textContent = "Пароль";
          infoSpan.style.display = "block";
          securityHeader.classList.add("security__header--password");
        }
      });
    }
  });
}
