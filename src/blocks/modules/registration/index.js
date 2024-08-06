import phoneMask from "../../../js/import/phoneMask";
import $ from "jquery";
import 'jquery-ui-bundle';

export default function signupSwitch() {
  const juridicalElement = document.getElementById("juridical");
  const juridicalForm = document.getElementById("juridicalForm");
  const physicalElement = document.getElementById("physical");
  const physicalForm = document.getElementById("physicalForm");

  if (juridicalElement) {
    juridicalElement.addEventListener("change", function () {
      if (juridicalForm && physicalForm) {
        juridicalForm.classList.add("registration__block--active");
        physicalForm.classList.remove("registration__block--active");
      }
    });
  }

  if (physicalElement) {
    physicalElement.addEventListener("change", function () {
      if (physicalForm && juridicalForm) {
        physicalForm.classList.add("registration__block--active");
        juridicalForm.classList.remove("registration__block--active");
      }
    });
  }

  phoneMask(".phone-input");


  $(".select--typeorg select").selectmenu({
    classes: {
      "ui-selectmenu-button": "ui-selectmenu-button-typeorg",
      "ui-selectmenu-menu": "ui-selectmenu-menu-typeorg"
    }
  });
}
