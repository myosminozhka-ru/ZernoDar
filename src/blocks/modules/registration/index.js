import phoneMask from "../../../js/import/phoneMask";

export default function signupSwitch() {
  const juridicalElement = document.getElementById("juridical");
  const juridicalForm = document.getElementById("juridicalForm");
  const physicalElement = document.getElementById("physical");
  const physicalForm = document.getElementById("physicalForm");

  if (juridicalElement) {
    juridicalElement.addEventListener("change", function () {
      if (juridicalForm && physicalForm) {
        juridicalForm.classList.add("registration__form--active");
        physicalForm.classList.remove("registration__form--active");
      }
    });
  }

  if (physicalElement) {
    physicalElement.addEventListener("change", function () {
      if (physicalForm && juridicalForm) {
        physicalForm.classList.add("registration__form--active");
        juridicalForm.classList.remove("registration__form--active");
      }
    });
  }

  phoneMask(".phone-input");
}
