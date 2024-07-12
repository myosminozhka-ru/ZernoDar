export default function () {
  document.getElementById("juridical").addEventListener("change", function () {
    document
      .getElementById("juridicalForm")
      .classList.add("registration__form--active");
    document
      .getElementById("physicalForm")
      .classList.remove("registration__form--active");
  });

  document.getElementById("physical").addEventListener("change", function () {
    document
      .getElementById("physicalForm")
      .classList.add("registration__form--active");
    document
      .getElementById("juridicalForm")
      .classList.remove("registration__form--active");
  });
}
