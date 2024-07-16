export default function () {
  const currentPath = window.location.pathname.replace(/^\/dist/, "");
  const navLinks = document.querySelectorAll(".lk-nav__link");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/^\/dist/, "");
    if (linkPath === currentPath) {
      link.classList.add("lk-nav__link--active");
    }
  });

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

        const oldPasswordWrapper = document.createElement("div");
        oldPasswordWrapper.classList.add("security__body__input-wrapper");
        oldPasswordWrapper.setAttribute("id", "old-pass-wrapper");

        oldPasswordWrapper.innerHTML = `
          <input type="password" class="security__input-field" id="old-pass-input" style="margin-top: -0.6rem"/>
        `;

        securityHeader.appendChild(oldPasswordWrapper);
      } else if (securityHeader.classList.contains("security__header--email")) {
        // Handle email-specific logic if needed
      } else if (securityHeader.classList.contains("security__header--phone")) {
        // Handle phone-specific logic if needed
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

          const oldPasswordWrapper =
            securityHeader.querySelector("#old-pass-wrapper");
          if (oldPasswordWrapper) {
            oldPasswordWrapper.remove();
          }
        } else if (
          securityHeader.classList.contains("security__header--email")
        ) {
          // Revert email-specific logic if needed
        } else if (
          securityHeader.classList.contains("security__header--phone")
        ) {
          // Revert phone-specific logic if needed
        }
      });
    }
  });
}
